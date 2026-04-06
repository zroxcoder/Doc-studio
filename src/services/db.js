// IndexedDB service for storing documents
import { openDB } from 'idb';

const DB_NAME = 'doc-studio-db';
const DB_VERSION = 1;

let dbPromise = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Documents store
        if (!db.objectStoreNames.contains('documents')) {
          const docStore = db.createObjectStore('documents', { keyPath: 'id' });
          docStore.createIndex('updatedAt', 'updatedAt');
          docStore.createIndex('folder', 'folder');
          docStore.createIndex('tags', 'tags', { multiEntry: true });
        }
        // Folders store
        if (!db.objectStoreNames.contains('folders')) {
          db.createObjectStore('folders', { keyPath: 'id' });
        }
        // Version history store
        if (!db.objectStoreNames.contains('versions')) {
          const vStore = db.createObjectStore('versions', { keyPath: 'id', autoIncrement: true });
          vStore.createIndex('docId', 'docId');
        }
      },
    });
  }
  return dbPromise;
}

// --- Documents ---
export async function getAllDocuments() {
  const db = await getDB();
  return db.getAll('documents');
}

export async function getDocument(id) {
  const db = await getDB();
  return db.get('documents', id);
}

export async function saveDocument(doc) {
  const db = await getDB();
  const now = Date.now();
  const toSave = { ...doc, updatedAt: now };
  if (!toSave.createdAt) toSave.createdAt = now;
  await db.put('documents', toSave);
  return toSave;
}

export async function deleteDocument(id) {
  const db = await getDB();
  await db.delete('documents', id);
  // Also delete associated versions
  const tx = db.transaction('versions', 'readwrite');
  const idx = tx.store.index('docId');
  const keys = await idx.getAllKeys(id);
  await Promise.all(keys.map(k => tx.store.delete(k)));
  await tx.done;
}

export async function searchDocuments(query) {
  const docs = await getAllDocuments();
  const q = query.toLowerCase();
  return docs.filter(d =>
    d.title?.toLowerCase().includes(q) ||
    d.content?.toLowerCase().includes(q) ||
    d.tags?.some(t => t.toLowerCase().includes(q))
  );
}

// --- Folders ---
export async function getAllFolders() {
  const db = await getDB();
  return db.getAll('folders');
}

export async function saveFolder(folder) {
  const db = await getDB();
  await db.put('folders', folder);
}

export async function deleteFolder(id) {
  const db = await getDB();
  await db.delete('folders', id);
}

// --- Version History ---
export async function saveVersion(docId, content, title) {
  const db = await getDB();
  await db.add('versions', { docId, content, title, savedAt: Date.now() });
}

export async function getVersions(docId) {
  const db = await getDB();
  const idx = (await getDB()).transaction('versions').store.index('docId');
  return idx.getAll(docId);
}

export async function getVersionsForDoc(docId) {
  const db = await getDB();
  const tx = db.transaction('versions', 'readonly');
  const idx = tx.store.index('docId');
  const results = await idx.getAll(docId);
  return results.sort((a, b) => b.savedAt - a.savedAt).slice(0, 20);
}
