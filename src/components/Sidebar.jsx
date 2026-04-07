import { useState, useRef, useEffect } from 'react';
import { useDoc } from '../contexts/DocContext.jsx';
import { useToast } from '../contexts/ToastContext.jsx';
import { formatRelative } from '../utils/helpers.js';
import { Search, Plus, Folder, FileText, Trash2, Copy, ChevronDown, ChevronRight, Tag } from 'lucide-react';

export default function Sidebar({ onNewDoc, onNewFolder, currentPage, setCurrentPage }) {
    const {
        filteredDocs, folders, activeDocId, search, setSearch,
        activeFolder, setActiveFolder, openDocument, removeDocument, duplicateDocument,
    } = useDoc();
    const { addToast } = useToast();
    const [expandedFolders, setExpandedFolders] = useState({});
    const [contextMenu, setContextMenu] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const close = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setContextMenu(null);
        };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    const toggleFolder = (id) => setExpandedFolders(prev => ({ ...prev, [id]: !prev[id] }));

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!confirm('Delete this document? This cannot be undone.')) return;
        await removeDocument(id);
        addToast('Document deleted', 'info');
        setContextMenu(null);
    };

    const handleDuplicate = async (e, id) => {
        e.stopPropagation();
        await duplicateDocument(id);
        addToast('Document duplicated', 'success');
        setContextMenu(null);
    };

    const handleContextMenu = (e, doc) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, doc });
    };

    const docIcon = (doc) => {
        if (doc.tags?.includes('resume')) return '📋';
        if (doc.tags?.includes('email')) return '✉️';
        if (doc.tags?.includes('readme') || doc.tags?.includes('software')) return '💻';
        return '📄';
    };

    return (
        <aside className="sidebar" aria-label="Document sidebar">
            {/* Header */}
            <div className="sidebar__header">
                <span className="sidebar__title">Documents</span>
                <button className="btn btn-ghost btn-icon btn-sm" onClick={onNewDoc} title="New document (Ctrl+N)">
                    <Plus size={14} />
                </button>
            </div>

            {/* Search */}
            <div className="sidebar__search">
                <div className="search-input-wrap">
                    <Search className="icon" size={13} />
                    <input
                        className="search-input"
                        placeholder="Search documents…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        aria-label="Search documents"
                    />
                </div>
            </div>

            {/* Document list */}
            <div className="sidebar__sections">
                {/* Folders */}
                {folders.length > 0 && (
                    <>
                        <div className="sidebar__section-label">Folders</div>
                        {folders.map(folder => (
                            <div key={folder.id} className="sidebar__folder">
                                <button
                                    className={`sidebar__folder-btn ${activeFolder === folder.id ? 'active' : ''}`}
                                    onClick={() => setActiveFolder(activeFolder === folder.id ? null : folder.id)}
                                >
                                    <span className="folder-dot" style={{ background: folder.color }} />
                                    <Folder size={13} />
                                    <span className="truncate">{folder.name}</span>
                                    {expandedFolders[folder.id] ? <ChevronDown size={12} style={{ marginLeft: 'auto' }} /> : <ChevronRight size={12} style={{ marginLeft: 'auto' }} />}
                                </button>
                            </div>
                        ))}
                    </>
                )}

                {/* All docs label */}
                <div className="sidebar__section-label" style={{ marginTop: folders.length ? 8 : 0 }}>
                    {activeFolder ? folders.find(f => f.id === activeFolder)?.name || 'Folder' : 'All Documents'}
                    {activeFolder && (
                        <button
                            style={{ marginLeft: 6, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.65rem' }}
                            onClick={() => setActiveFolder(null)}
                        >✕ clear</button>
                    )}
                </div>

                <div className="doc-list">
                    {filteredDocs.length === 0 && (
                        <div style={{ padding: '16px 10px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                            {search ? 'No documents match your search.' : 'No documents yet.'}
                        </div>
                    )}
                    {filteredDocs.map(doc => (
                        <div
                            key={doc.id}
                            className={`doc-item ${doc.id === activeDocId ? 'active' : ''}`}
                            onClick={() => openDocument(doc.id)}
                            onContextMenu={e => handleContextMenu(e, doc)}
                            tabIndex={0}
                            role="button"
                            aria-label={`Open ${doc.title}`}
                            onKeyDown={e => e.key === 'Enter' && openDocument(doc.id)}
                        >
                            <span className="doc-item__icon">{docIcon(doc)}</span>
                            <div className="doc-item__info">
                                <div className="doc-item__title">{doc.title || 'Untitled'}</div>
                                <div className="doc-item__meta">{formatRelative(doc.updatedAt)}</div>
                            </div>
                            <div className="doc-item__actions">
                                <button
                                    className="btn btn-ghost btn-icon btn-sm"
                                    onClick={e => handleDuplicate(e, doc.id)}
                                    title="Duplicate"
                                >
                                    <Copy size={11} />
                                </button>
                                <button
                                    className="btn btn-danger btn-icon btn-sm"
                                    onClick={e => handleDelete(e, doc.id)}
                                    title="Delete"
                                >
                                    <Trash2 size={11} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pages Navigation */}
            <div style={{ padding: '12px 16px 4px', display: 'flex', gap: '16px', fontSize: '0.75rem', justifyContent: 'center', borderTop: '1px solid var(--border-subtle)' }}>
               <span 
                   style={{ cursor: 'pointer', fontWeight: 500, color: currentPage === 'about' && !activeDocId ? 'var(--accent-gold)' : 'var(--text-muted)' }} 
                   onClick={() => { setCurrentPage('about'); openDocument(null); }}>About</span>
               <span 
                   style={{ cursor: 'pointer', fontWeight: 500, color: currentPage === 'help' && !activeDocId ? 'var(--accent-gold)' : 'var(--text-muted)' }} 
                   onClick={() => { setCurrentPage('help'); openDocument(null); }}>Help</span>
               <span 
                   style={{ cursor: 'pointer', fontWeight: 500, color: currentPage === 'contact' && !activeDocId ? 'var(--accent-gold)' : 'var(--text-muted)' }} 
                   onClick={() => { setCurrentPage('contact'); openDocument(null); }}>Contact</span>
            </div>

            {/* Footer */}
            <div className="sidebar__footer" style={{ borderTop: 'none' }}>
                <button className="btn btn-secondary btn-sm" onClick={onNewDoc} style={{ flex: 1 }}>
                    <Plus size={12} /> New Doc
                </button>
                <button className="btn btn-ghost btn-sm" onClick={onNewFolder} title="New folder">
                    <Folder size={12} />
                </button>
            </div>

            {/* Context menu */}
            {contextMenu && (
                <div
                    ref={menuRef}
                    className="dropdown__menu"
                    style={{ position: 'fixed', top: contextMenu.y, left: contextMenu.x, zIndex: 2000 }}
                >
                    <button className="dropdown__item" onClick={e => handleDuplicate(e, contextMenu.doc.id)}>
                        <Copy size={13} /> Duplicate
                    </button>
                    <button className="dropdown__item danger" onClick={e => handleDelete(e, contextMenu.doc.id)}>
                        <Trash2 size={13} /> Delete
                    </button>
                </div>
            )}
        </aside>
    );
}
