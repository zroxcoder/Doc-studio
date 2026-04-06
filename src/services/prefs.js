// LocalStorage service for lightweight preferences
const PREFS_KEY = 'doc-studio-prefs';

const defaults = {
    theme: 'retro-dark',
    fontSize: 16,
    sidebarOpen: true,
    lastOpenDocId: null,
    editorFont: 'inter',
    lineHeight: 1.7,
    autoSaveInterval: 2000,
};

export function getPrefs() {
    try {
        const raw = localStorage.getItem(PREFS_KEY);
        return raw ? { ...defaults, ...JSON.parse(raw) } : { ...defaults };
    } catch {
        return { ...defaults };
    }
}

export function setPref(key, value) {
    const prefs = getPrefs();
    prefs[key] = value;
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export function setPrefs(updates) {
    const prefs = getPrefs();
    Object.assign(prefs, updates);
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}
