import { useState, useEffect, useCallback } from 'react';
import { useDoc } from './contexts/DocContext.jsx';
import { useToast } from './contexts/ToastContext.jsx';
import TitleBar from './components/TitleBar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Editor from './components/Editor.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import TemplateGallery from './components/TemplateGallery.jsx';
import VersionHistory from './components/VersionHistory.jsx';
import FolderModal from './components/FolderModal.jsx';

export default function App() {
  const { activeDoc, activeDocId, createDocument, loading } = useDoc();
  const { addToast } = useToast();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [showNewFolder, setShowNewFolder] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey)) {
        if (e.key === 'n') {
          e.preventDefault();
          handleNewDoc();
        }
        if (e.key === '\\') {
          e.preventDefault();
          setSidebarOpen(v => !v);
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleNewDoc = useCallback(async () => {
    await createDocument({ title: 'Untitled Document', content: '# Untitled Document\n\n' });
  }, [createDocument]);

  const handleTemplateSelect = useCallback(async (template) => {
    setShowTemplates(false);
    await createDocument({
      title: template.title,
      content: template.content,
      tags: [template.category],
    });
    addToast(`Created from template: ${template.title}`, 'success');
  }, [createDocument, addToast]);

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', flexDirection: 'column', gap: '16px',
        fontFamily: 'var(--font-retro)', color: 'var(--accent-gold)', fontSize: '2rem',
      }}>
        <div>DOC STUDIO</div>
        <div style={{ fontSize: '0.9rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          Loading…
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Subtle retro scanlines */}
      <div className="retro-overlay" aria-hidden="true" />

      {/* Title bar */}
      <TitleBar
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(v => !v)}
        onVersionHistory={() => setShowVersions(true)}
      />

      {/* Main layout */}
      <div className="app-layout">
        {/* Sidebar */}
        {sidebarOpen && (
          <Sidebar
            onNewDoc={handleNewDoc}
            onNewFolder={() => setShowNewFolder(true)}
          />
        )}

        {/* Content area */}
        {activeDocId && activeDoc ? (
          <Editor />
        ) : (
          <div className="main-content">
            <WelcomeScreen
              onNewDoc={handleNewDoc}
              onOpenTemplates={() => setShowTemplates(true)}
            />
          </div>
        )}
      </div>

      {/* Modals */}
      {showTemplates && (
        <TemplateGallery
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}
      {showVersions && activeDoc && (
        <VersionHistory onClose={() => setShowVersions(false)} />
      )}
      {showNewFolder && (
        <FolderModal onClose={() => setShowNewFolder(false)} />
      )}
    </>
  );
}
