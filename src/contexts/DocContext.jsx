import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
    getAllDocuments, saveDocument, deleteDocument, getAllFolders, saveFolder, deleteFolder,
    saveVersion, getVersionsForDoc,
} from '../services/db.js';
import { getPrefs, setPref } from '../services/prefs.js';
import { generateId } from '../utils/helpers.js';

const DocCtx = createContext(null);

export function DocProvider({ children }) {
    const [documents, setDocuments] = useState([]);
    const [folders, setFolders] = useState([]);
    const [activeDocId, setActiveDocId] = useState(null);
    const [saving, setSaving] = useState(false); // 'saving' | 'saved' | false
    const [search, setSearch] = useState('');
    const [activeFolder, setActiveFolder] = useState(null);
    const [loading, setLoading] = useState(true);

    const saveTimerRef = useRef(null);
    const versionTimerRef = useRef(null);

    // Load all data on mount
    useEffect(() => {
        async function load() {
            const [docs, flds] = await Promise.all([getAllDocuments(), getAllFolders()]);
            setDocuments(docs);
            setFolders(flds);
            const prefs = getPrefs();
            if (prefs.lastOpenDocId && docs.find(d => d.id === prefs.lastOpenDocId)) {
                setActiveDocId(prefs.lastOpenDocId);
            }
            setLoading(false);
        }
        load();
    }, []);

    const activeDoc = documents.find(d => d.id === activeDocId) || null;

    // Create a new document
    const createDocument = useCallback(async ({ title = 'Untitled', content = '', folder = null, tags = [] } = {}) => {
        const doc = {
            id: generateId(),
            title,
            content,
            folder,
            tags,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        const saved = await saveDocument(doc);
        setDocuments(prev => [saved, ...prev]);
        setActiveDocId(saved.id);
        setPref('lastOpenDocId', saved.id);
        return saved;
    }, []);

    // Update document (with auto-save debounce)
    const updateDocument = useCallback(async (updates) => {
        if (!activeDocId) return;
        const merged = { ...activeDoc, ...updates, id: activeDocId };

        // Optimistic UI update
        setDocuments(prev => prev.map(d => d.id === activeDocId ? { ...d, ...updates } : d));

        // Debounced save to IndexedDB
        setSaving('saving');
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(async () => {
            await saveDocument(merged);
            setSaving('saved');
            setTimeout(() => setSaving(false), 1500);
        }, 1200);

        // Debounced version snapshot every 30s
        clearTimeout(versionTimerRef.current);
        versionTimerRef.current = setTimeout(async () => {
            if (updates.content != null) {
                await saveVersion(activeDocId, merged.content, merged.title);
            }
        }, 30000);
    }, [activeDocId, activeDoc]);

    const openDocument = useCallback((id) => {
        setActiveDocId(id);
        setPref('lastOpenDocId', id);
    }, []);

    const removeDocument = useCallback(async (id) => {
        await deleteDocument(id);
        setDocuments(prev => prev.filter(d => d.id !== id));
        if (activeDocId === id) {
            setActiveDocId(null);
            setPref('lastOpenDocId', null);
        }
    }, [activeDocId]);

    const duplicateDocument = useCallback(async (id) => {
        const doc = documents.find(d => d.id === id);
        if (!doc) return;
        await createDocument({ ...doc, title: `${doc.title} (copy)`, id: undefined });
    }, [documents, createDocument]);

    // Folders
    const createFolder = useCallback(async (name, color = '#c8a84b') => {
        const folder = { id: generateId(), name, color, createdAt: Date.now() };
        await saveFolder(folder);
        setFolders(prev => [...prev, folder]);
        return folder;
    }, []);

    const removeFolder = useCallback(async (id) => {
        await deleteFolder(id);
        setFolders(prev => prev.filter(f => f.id !== id));
        // Move docs out of folder
        const affectedDocs = documents.filter(d => d.folder === id);
        await Promise.all(affectedDocs.map(d => saveDocument({ ...d, folder: null })));
        setDocuments(prev => prev.map(d => d.folder === id ? { ...d, folder: null } : d));
    }, [documents]);

    // Versions
    const getVersions = useCallback((docId) => getVersionsForDoc(docId), []);

    const restoreVersion = useCallback(async (docId, content) => {
        const doc = documents.find(d => d.id === docId);
        if (!doc) return;
        const updated = { ...doc, content };
        setDocuments(prev => prev.map(d => d.id === docId ? updated : d));
        await saveDocument(updated);
    }, [documents]);

    // Filtered documents
    const filteredDocs = documents.filter(d => {
        const matchSearch = !search ||
            d.title?.toLowerCase().includes(search.toLowerCase()) ||
            d.content?.toLowerCase().includes(search.toLowerCase()) ||
            d.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()));
        const matchFolder = activeFolder === null || d.folder === activeFolder;
        return matchSearch && matchFolder;
    }).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));

    return (
        <DocCtx.Provider value={{
            documents, filteredDocs, folders, activeDocId, activeDoc,
            saving, search, setSearch, activeFolder, setActiveFolder, loading,
            createDocument, updateDocument, openDocument, removeDocument, duplicateDocument,
            createFolder, removeFolder, getVersions, restoreVersion,
        }}>
            {children}
        </DocCtx.Provider>
    );
}

export function useDoc() {
    return useContext(DocCtx);
}
