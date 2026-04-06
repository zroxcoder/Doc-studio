// Utility helpers
export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function formatDate(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatRelative(ts) {
    if (!ts) return '';
    const diff = Date.now() - ts;
    const min = Math.floor(diff / 60000);
    if (min < 1) return 'just now';
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const days = Math.floor(hr / 24);
    if (days < 7) return `${days}d ago`;
    return formatDate(ts);
}

export function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

export function wordCount(text) {
    return (text || '').trim().split(/\s+/).filter(Boolean).length;
}

export function charCount(text) {
    return (text || '').length;
}

export function estimateReadTime(text) {
    const words = wordCount(text);
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
}
