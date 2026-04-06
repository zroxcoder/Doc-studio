import { useState } from 'react';
import { useDoc } from '../contexts/DocContext.jsx';
import { useToast } from '../contexts/ToastContext.jsx';

const FOLDER_COLORS = ['#c8a84b', '#4caf88', '#4a90d9', '#9b7fd4', '#e05a6d', '#f5a623'];

export default function FolderModal({ onClose }) {
    const { createFolder } = useDoc();
    const { addToast } = useToast();
    const [name, setName] = useState('');
    const [color, setColor] = useState(FOLDER_COLORS[0]);

    const handleCreate = async () => {
        if (!name.trim()) return;
        await createFolder(name.trim(), color);
        addToast(`Folder "${name.trim()}" created`, 'success');
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal" style={{ maxWidth: 400 }} role="dialog" aria-modal="true">
                <div className="modal__header">
                    <span className="modal__title">📁 New Folder</span>
                    <button className="btn btn-ghost btn-icon" onClick={onClose}>✕</button>
                </div>
                <div className="modal__body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Folder Name
                        </label>
                        <input
                            autoFocus
                            className="search-input"
                            style={{ width: '100%', padding: '8px 12px', fontSize: '0.9rem' }}
                            placeholder="My Projects"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleCreate()}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Color
                        </label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {FOLDER_COLORS.map(c => (
                                <button
                                    key={c}
                                    onClick={() => setColor(c)}
                                    style={{
                                        width: 28, height: 28, borderRadius: '50%', background: c,
                                        border: color === c ? '2px solid white' : '2px solid transparent',
                                        cursor: 'pointer', transition: 'transform 0.12s ease',
                                        transform: color === c ? 'scale(1.15)' : 'scale(1)',
                                    }}
                                    aria-label={`Select color ${c}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="modal__footer">
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleCreate} disabled={!name.trim()}>
                        Create Folder
                    </button>
                </div>
            </div>
        </div>
    );
}
