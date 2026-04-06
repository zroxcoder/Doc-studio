import { useDoc } from '../contexts/DocContext.jsx';
import { TEMPLATES } from '../data/templates.js';

export default function WelcomeScreen({ onNewDoc, onOpenTemplates }) {
    const { createDocument } = useDoc();

    const featuredTemplates = [
        TEMPLATES.find(t => t.id === 'readme'),
        TEMPLATES.find(t => t.id === 'resume-modern'),
        TEMPLATES.find(t => t.id === 'email-formal'),
        TEMPLATES.find(t => t.id === 'meeting-notes'),
        TEMPLATES.find(t => t.id === 'api-docs'),
        TEMPLATES.find(t => t.id === 'blank'),
    ].filter(Boolean);

    const handleTemplate = async (template) => {
        await createDocument({
            title: template.title,
            content: template.content,
            tags: [template.category],
        });
    };

    return (
        <div className="welcome-screen">
            {/* Retro logo */}
            <div className="welcome-screen__logo">
                DOC<br />STUDIO
            </div>

            <p className="welcome-screen__tagline">
                Professional documents, the retro way.
                <br />
                <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Fast · Offline · Open</span>
            </p>

            {/* Actions */}
            <div className="welcome-actions">
                <button className="btn btn-primary" onClick={onNewDoc} style={{ fontSize: '0.9rem', padding: '10px 20px' }}>
                    ✏️ New Document
                </button>
                <button className="btn btn-secondary" onClick={onOpenTemplates} style={{ fontSize: '0.9rem', padding: '10px 20px' }}>
                    📁 Browse Templates
                </button>
            </div>

            {/* Quick templates */}
            <div className="welcome-templates">
                <div className="welcome-templates__title">Quick Start</div>
                <div className="template-grid">
                    {featuredTemplates.map(t => (
                        <button
                            key={t.id}
                            className="template-card"
                            onClick={() => handleTemplate(t)}
                            aria-label={`Create ${t.title}`}
                        >
                            <span className="template-card__icon">{t.icon}</span>
                            <span className="template-card__title">{t.title}</span>
                            <span className="template-card__desc">{t.description}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer hint */}
            <p style={{ marginTop: '32px', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                All documents stored locally in your browser. No account needed. ✦
            </p>
        </div>
    );
}
