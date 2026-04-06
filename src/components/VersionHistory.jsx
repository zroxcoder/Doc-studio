import { useState, useEffect } from 'react';
import { useDoc } from '../contexts/DocContext.jsx';
import { useToast } from '../contexts/ToastContext.jsx';
import { formatDate } from '../utils/helpers.js';

export default function VersionHistory({ onClose }) {
    const { activeDoc, getVersions, restoreVersion } = useDoc();
    const { addToast } = useToast();
    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!activeDoc) return;
        getVersions(activeDoc.id).then(v => {
            setVersions(v);
            setLoading(false);
        });
    }, [activeDoc, getVersions]);

    const handleRestore = async (v) => {
        if (!confirm(`Restore this version from ${new Date(v.savedAt).toLocaleString()}?`)) return;
        await restoreVersion(activeDoc.id, v.content);
        addToast('Version restored', 'success');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal" style={{ maxWidth: 520 }} role="dialog" aria-modal="true">
                <div className="modal__header">
                    <span className="modal__title">🕐 Version History</span>
                    <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
                </div>
                <div className="modal__body">
                    {loading ? (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '24px' }}>Loading versions…</p>
                    ) : versions.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🕐</div>
                            <p>No version history yet.</p>
                            <p style={{ fontSize: '0.78rem', marginTop: '6px' }}>Versions are saved automatically every 30 seconds while editing.</p>
                        </div>
                    ) : (
                        <div className="version-list">
                            {versions.map((v, idx) => (
                                <div key={v.id} className="version-item">
                                    <div>
                                        <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                                            {idx === 0 ? '🔵 Most Recent' : `Version ${versions.length - idx}`}
                                        </div>
                                        <div className="version-item__time">
                                            {new Date(v.savedAt).toLocaleString()}
                                        </div>
                                    </div>
                                    <button className="btn btn-secondary btn-sm" onClick={() => handleRestore(v)}>
                                        Restore
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="modal__footer">
                    <button className="btn btn-ghost" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
