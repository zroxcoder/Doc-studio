import { useState } from 'react';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '../data/templates.js';

export default function TemplateGallery({ onSelect, onClose }) {
    const [activeCategory, setActiveCategory] = useState('software');

    const templates = TEMPLATES.filter(t => t.category === activeCategory);

    return (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
            <div className="modal" role="dialog" aria-modal="true" aria-label="Template gallery">
                <div className="modal__header">
                    <span className="modal__title">📁 Template Gallery</span>
                    <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close">✕</button>
                </div>

                <div className="modal__body">
                    {/* Category tabs */}
                    <div className="tab-list" role="tablist">
                        {TEMPLATE_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                                role="tab"
                                aria-selected={activeCategory === cat.id}
                            >
                                {cat.icon} {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Templates grid */}
                    <div className="template-grid">
                        {templates.map(t => (
                            <button
                                key={t.id}
                                className="template-card"
                                onClick={() => onSelect(t)}
                                tabIndex={0}
                                aria-label={`Use template: ${t.title}`}
                            >
                                <span className="template-card__icon">{t.icon}</span>
                                <span className="template-card__title">{t.title}</span>
                                <span className="template-card__desc">{t.description}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="modal__footer">
                    <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}
