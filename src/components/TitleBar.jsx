import { useState, useRef } from 'react';
import { useDoc } from '../contexts/DocContext.jsx';
import { Menu, Clock, PanelLeft } from 'lucide-react';

export default function TitleBar({ sidebarOpen, onToggleSidebar, onVersionHistory, onGoHome }) {
    const { activeDoc, saving, updateDocument, openDocument } = useDoc();
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);

    const handleTitleBlur = (e) => {
        const newTitle = e.target.value.trim() || 'Untitled';
        updateDocument({ title: newTitle });
        setEditing(false);
    };

    const handleTitleKeyDown = (e) => {
        if (e.key === 'Enter') e.target.blur();
        if (e.key === 'Escape') { setEditing(false); }
    };

    return (
        <div className="titlebar">
            {/* Logo */}
            <div 
                className="titlebar__logo" 
                onClick={() => { openDocument(null); if (onGoHome) onGoHome(); }} 
                style={{ cursor: 'pointer' }} 
                title="Back to Dashboard"
            >
                <svg width="22" height="22" viewBox="0 0 32 32" className="titlebar__logo-icon">
                    <rect width="32" height="32" rx="3" fill="#c8a84b" />
                    <rect x="6" y="5" width="14" height="18" rx="1" fill="#0e0e1a" />
                    <rect x="8" y="8" width="10" height="1.5" rx="0.5" fill="#c8a84b" />
                    <rect x="8" y="12" width="8" height="1.5" rx="0.5" fill="#c8a84b" />
                    <rect x="8" y="16" width="6" height="1.5" rx="0.5" fill="#c8a84b" />
                    <rect x="18" y="17" width="8" height="8" rx="1" fill="#4a90d9" />
                    <text x="19.5" y="24" fontSize="6" fill="white" fontFamily="monospace" fontWeight="bold">D</text>
                </svg>
                DOC STUDIO
            </div>

            {/* Sidebar toggle */}
            <button
                className="btn btn-ghost btn-icon"
                onClick={onToggleSidebar}
                title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
                aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
            >
                <PanelLeft size={16} />
            </button>

            {/* Document title */}
            <div className="titlebar__doc-title">
                {activeDoc ? (
                    editing ? (
                        <input
                            ref={inputRef}
                            className="titlebar__doc-title-input"
                            defaultValue={activeDoc.title || 'Untitled'}
                            onBlur={handleTitleBlur}
                            onKeyDown={handleTitleKeyDown}
                            autoFocus
                            aria-label="Document title"
                        />
                    ) : (
                        <span
                            onClick={() => setEditing(true)}
                            style={{ cursor: 'text', padding: '3px 6px', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}
                            title="Click to rename"
                        >
                            {activeDoc.title || 'Untitled'}
                        </span>
                    )
                ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>No document open</span>
                )}

                {/* Save indicator */}
                {saving && (
                    <span className={`titlebar__save-indicator ${saving}`}>
                        {saving === 'saving' ? '⟳ saving…' : '✓ saved'}
                    </span>
                )}
            </div>

            {/* Actions */}
            <div className="titlebar__actions">
                {activeDoc && (
                    <button
                        className="btn btn-ghost btn-icon"
                        onClick={onVersionHistory}
                        title="Version history"
                        aria-label="Version history"
                    >
                        <Clock size={15} />
                    </button>
                )}
            </div>
        </div>
    );
}
