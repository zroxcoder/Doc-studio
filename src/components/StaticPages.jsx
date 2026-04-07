import React from 'react';

/* ─────────────────────────────────────────────
   Shared internal components
───────────────────────────────────────────── */

const SectionHeading = ({ children }) => (
  <h3 style={{
    color: 'var(--text-primary)',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginBottom: '0.75rem',
    marginTop: '2rem',
    paddingBottom: '0.4rem',
    borderBottom: '1px solid var(--border-color)',
    opacity: 0.85,
  }}>
    {children}
  </h3>
);

const Badge = ({ children }) => (
  <span style={{
    display: 'inline-block',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--accent-gold)',
    background: 'rgba(var(--accent-gold-rgb, 200,160,80), 0.08)',
    border: '1px solid rgba(var(--accent-gold-rgb, 200,160,80), 0.25)',
    borderRadius: '2px',
    padding: '0.15rem 0.5rem',
    marginRight: '0.4rem',
    verticalAlign: 'middle',
  }}>
    {children}
  </span>
);

const KeyboardKey = ({ children }) => (
  <kbd style={{
    display: 'inline-block',
    padding: '0.1rem 0.45rem',
    fontSize: '0.78rem',
    fontFamily: 'monospace',
    lineHeight: 1.6,
    color: 'var(--text-primary)',
    background: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderBottomWidth: '2px',
    borderRadius: '3px',
    whiteSpace: 'nowrap',
  }}>
    {children}
  </kbd>
);

const pageWrap = {
  maxWidth: '640px',
  textAlign: 'left',
  lineHeight: '1.75',
  color: 'var(--text-secondary)',
};

const para = { marginBottom: '1rem' };

/* ─────────────────────────────────────────────
   About Page
───────────────────────────────────────────── */

export function AboutPage() {
  return (
    <div className="welcome-screen">

      {/* Header block */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{
          fontSize: '0.68rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent-gold)',
          marginBottom: '0.5rem',
          fontWeight: 600,
          opacity: 0.8,
        }}>
          Writing Environment
        </p>
        <h1 style={{
          color: 'var(--text-primary)',
          fontSize: '2.8rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: 0,
        }}>
          Doc Studio
        </h1>
        <p style={{
          marginTop: '0.6rem',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          opacity: 0.7,
          fontStyle: 'italic',
          letterSpacing: '0.01em',
        }}>
          A focused, privacy-first workspace for serious writers.
        </p>
      </div>

      <div style={pageWrap}>

        <p style={para}>
          Doc Studio is a retro-modern writing environment built for clarity and concentration.
          It combines the warmth of classic interfaces with the capability of modern web technologies,
          offering a workspace where your thoughts remain the priority — not the tool.
        </p>

        <SectionHeading>Philosophy</SectionHeading>
        <p style={para}>
          Most writing software competes for your attention. Doc Studio does the opposite.
          It is deliberately minimal, offline-first, and built without telemetry, accounts,
          or subscriptions. Every design decision traces back to a single question: does this
          help the writer focus?
        </p>

        <SectionHeading>Core Capabilities</SectionHeading>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {[
            { label: 'Markdown Editor', desc: 'Write with intuitive syntax and see a live formatted preview side-by-side.' },
            { label: 'Document Folders', desc: 'Group related files into collapsible folders with full drag-and-drop reordering.' },
            { label: 'Offline Storage', desc: 'All data is persisted locally via IndexedDB — no network required, ever.' },
            { label: 'Flexible Export', desc: 'Publish to Markdown, PDF, or Plain Text with a single click.' },
            { label: 'Auto-Save', desc: 'Every keystroke is captured automatically. Manual saves are never needed.' },
            { label: 'Zero Tracking', desc: 'Your content never leaves the browser unless you explicitly export it.' },
          ].map(({ label, desc }) => (
            <div key={label} style={{
              padding: '0.9rem 1rem',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
            }}>
              <p style={{
                margin: '0 0 0.3rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '0.02em',
              }}>
                {label}
              </p>
              <p style={{ margin: 0, fontSize: '0.82rem', lineHeight: 1.55, color: 'var(--text-secondary)', opacity: 0.85 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        <SectionHeading>Designed For</SectionHeading>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
          {[
            'Technical Documentation', 'Long-form Writing', 'Academic Notes',
            'Project Proposals', 'Resume Drafting', 'Daily Journaling',
            'Meeting Notes', 'Blog Authoring',
          ].map(tag => <Badge key={tag}>{tag}</Badge>)}
        </div>

        <blockquote style={{
          margin: '2rem 0 0',
          padding: '1rem 1.25rem',
          borderLeft: '3px solid var(--accent-gold)',
          background: 'var(--bg-tertiary)',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0',
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.65,
        }}>
          "The best tool is the one that disappears — letting your ideas take center stage."
        </blockquote>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Help Page
───────────────────────────────────────────── */

export function HelpPage() {
  const shortcuts = [
    { keys: ['Ctrl', 'N'],        action: 'Create a new document' },
    { keys: ['Ctrl', '\\'],       action: 'Toggle sidebar visibility' },
    { keys: ['Ctrl', 'B'],        action: 'Apply bold formatting' },
    { keys: ['Ctrl', 'I'],        action: 'Apply italic formatting' },
    { keys: ['Ctrl', 'K'],        action: 'Insert a hyperlink' },
    { keys: ['Ctrl', 'Shift', 'C'], action: 'Copy document as Markdown' },
    { keys: ['Ctrl', 'S'],        action: 'Trigger manual save' },
    { keys: ['Ctrl', '/'],        action: 'Open this Help guide' },
  ];

  const markdownRef = [
    { syntax: '# H1  /  ## H2  /  ### H3', desc: 'Section headings' },
    { syntax: '**bold**  /  *italic*',       desc: 'Inline emphasis' },
    { syntax: '~~strikethrough~~',           desc: 'Struck-through text' },
    { syntax: '- Item  /  1. Item',          desc: 'Unordered and ordered lists' },
    { syntax: '[text](https://url.com)',     desc: 'Inline hyperlink' },
    { syntax: '`code`  /  ``` block ```',   desc: 'Inline and fenced code' },
    { syntax: '> Quote',                    desc: 'Blockquote' },
    { syntax: '---',                        desc: 'Horizontal rule' },
  ];

  return (
    <div className="welcome-screen" style={{ overflowY: 'auto' }}>

      <div style={{ marginBottom: '2rem' }}>
        <p style={{
          fontSize: '0.68rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent-gold)',
          marginBottom: '0.5rem',
          fontWeight: 600,
          opacity: 0.8,
        }}>
          Documentation
        </p>
        <h1 style={{
          color: 'var(--text-primary)',
          fontSize: '2.8rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: 0,
        }}>
          Help &amp; Navigation
        </h1>
        <p style={{
          marginTop: '0.6rem',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          opacity: 0.7,
          fontStyle: 'italic',
        }}>
          Everything you need to write, organize, and export with confidence.
        </p>
      </div>

      <div style={pageWrap}>

        {/* Quick Start */}
        <SectionHeading>Quick Start</SectionHeading>
        <div style={{
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          marginBottom: '1.25rem',
        }}>
          {[
            ['Step 1', 'Press Ctrl + N to create your first document.'],
            ['Step 2', 'Begin writing — your work is saved automatically on every keystroke.'],
            ['Step 3', 'Use Ctrl + \\ to open the sidebar and organize your files into folders.'],
            ['Step 4', 'Click the Export button in the toolbar to share or back up your work.'],
          ].map(([step, text], i) => (
            <div key={step} style={{
              display: 'flex',
              gap: '0.9rem',
              alignItems: 'flex-start',
              paddingBottom: i < 3 ? '0.75rem' : 0,
              marginBottom: i < 3 ? '0.75rem' : 0,
              borderBottom: i < 3 ? '1px solid var(--border-color)' : 'none',
            }}>
              <span style={{
                flexShrink: 0,
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-gold)',
                paddingTop: '0.15rem',
                minWidth: '42px',
              }}>
                {step}
              </span>
              <span style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Keyboard Shortcuts */}
        <SectionHeading>Keyboard Shortcuts</SectionHeading>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.85rem',
          marginBottom: '1.25rem',
        }}>
          <thead>
            <tr>
              <th style={{
                textAlign: 'left', paddingBottom: '0.5rem', paddingRight: '1.5rem',
                fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--text-secondary)', opacity: 0.55, fontWeight: 600,
                borderBottom: '1px solid var(--border-color)',
              }}>
                Shortcut
              </th>
              <th style={{
                textAlign: 'left', paddingBottom: '0.5rem',
                fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--text-secondary)', opacity: 0.55, fontWeight: 600,
                borderBottom: '1px solid var(--border-color)',
              }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {shortcuts.map(({ keys, action }) => (
              <tr key={action}>
                <td style={{ padding: '0.5rem 1.5rem 0.5rem 0', whiteSpace: 'nowrap', borderBottom: '1px solid var(--border-color)', opacity: 0.9 }}>
                  {keys.map((k, i) => (
                    <React.Fragment key={k}>
                      {i > 0 && <span style={{ margin: '0 0.2rem', opacity: 0.4, fontSize: '0.75rem' }}>+</span>}
                      <KeyboardKey>{k}</KeyboardKey>
                    </React.Fragment>
                  ))}
                </td>
                <td style={{ padding: '0.5rem 0', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', lineHeight: 1.5 }}>
                  {action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Markdown Reference */}
        <SectionHeading>Markdown Reference</SectionHeading>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.85rem',
          marginBottom: '1.25rem',
        }}>
          <thead>
            <tr>
              <th style={{
                textAlign: 'left', paddingBottom: '0.5rem', paddingRight: '1.5rem',
                fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--text-secondary)', opacity: 0.55, fontWeight: 600,
                borderBottom: '1px solid var(--border-color)',
              }}>Syntax</th>
              <th style={{
                textAlign: 'left', paddingBottom: '0.5rem',
                fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--text-secondary)', opacity: 0.55, fontWeight: 600,
                borderBottom: '1px solid var(--border-color)',
              }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {markdownRef.map(({ syntax, desc }) => (
              <tr key={syntax}>
                <td style={{ padding: '0.5rem 1.5rem 0.5rem 0', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-primary)', opacity: 0.85, whiteSpace: 'nowrap' }}>
                  {syntax}
                </td>
                <td style={{ padding: '0.5rem 0', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', lineHeight: 1.5 }}>
                  {desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Organizing */}
        <SectionHeading>Organizing Your Workspace</SectionHeading>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.25rem' }}>
          {[
            ['Create folders', 'Click the "+" icon in the sidebar to group related documents under a named folder.'],
            ['Reorder items', 'Drag and drop any document or folder to rearrange your workspace.'],
            ['Rename', 'Double-click any document or folder name to rename it inline.'],
            ['Delete', 'Right-click an item and select Delete, or press the Delete key while it is selected.'],
          ].map(([term, def]) => (
            <li key={term} style={{ marginBottom: '0.6rem', fontSize: '0.88rem', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text-primary)' }}>{term}:</strong>{' '}
              <span style={{ color: 'var(--text-secondary)' }}>{def}</span>
            </li>
          ))}
        </ul>

        {/* Data & Export */}
        <SectionHeading>Data Storage &amp; Export</SectionHeading>
        <p style={{ ...para, fontSize: '0.88rem' }}>
          All documents are stored locally in your browser via <strong style={{ color: 'var(--text-primary)' }}>IndexedDB</strong>.
          No data is transmitted to any server. To back up or share your work:
        </p>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.25rem' }}>
          {[
            'Click the Export button in the editor toolbar.',
            'Select a format — PDF for print-ready output, Markdown for editable source, or Plain Text for portability.',
            'For long-term backups, export as Markdown and store in your cloud storage or external drive of choice.',
          ].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              {item}
            </li>
          ))}
        </ul>

        {/* Troubleshooting */}
        <SectionHeading>Troubleshooting</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {[
            ['I cannot find my document.', 'Check the sidebar and use the search bar to filter documents by name.'],
            ['Export is not working.', 'Ensure pop-up blockers are disabled for this page in your browser settings.'],
            ['I lost data after clearing my browser.', 'IndexedDB is purged when browser data is cleared. Export important documents regularly.'],
            ['Keyboard shortcuts are not responding.', 'Click inside the editor area to focus it first, then retry the shortcut.'],
          ].map(([q, a]) => (
            <div key={q} style={{
              padding: '0.8rem 1rem',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
            }}>
              <p style={{ margin: '0 0 0.3rem', fontSize: '0.83rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {q}
              </p>
              <p style={{ margin: 0, fontSize: '0.83rem', lineHeight: 1.55, color: 'var(--text-secondary)', opacity: 0.9 }}>
                {a}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          padding: '0.85rem 1.1rem',
          background: 'var(--bg-tertiary)',
          borderLeft: '3px solid var(--accent-gold)',
          borderRadius: '0 var(--radius-md) var(--radius-md) 0',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}>
          <strong style={{ color: 'var(--text-primary)' }}>Pro Tip:</strong>{' '}
          Press <KeyboardKey>Ctrl</KeyboardKey> + <KeyboardKey>/</KeyboardKey> from anywhere in the app to reopen this guide instantly.
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Contact Page
───────────────────────────────────────────── */

export function ContactPage() {
  return (
    <div className="welcome-screen">

      <div style={{ marginBottom: '2rem' }}>
        <p style={{
          fontSize: '0.68rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--accent-gold)',
          marginBottom: '0.5rem',
          fontWeight: 600,
          opacity: 0.8,
        }}>
          Support &amp; Feedback
        </p>
        <h1 style={{
          color: 'var(--text-primary)',
          fontSize: '2.8rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          margin: 0,
        }}>
          Contact Us
        </h1>
        <p style={{
          marginTop: '0.6rem',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          opacity: 0.7,
          fontStyle: 'italic',
        }}>
          We read every message and typically respond within 24–48 hours.
        </p>
      </div>

      <div style={pageWrap}>

        <p style={{ ...para, fontSize: '0.9rem' }}>
          Doc Studio is continuously refined based on user feedback. Whether you have encountered
          a bug, have a feature request, or simply want to share how the app fits your workflow,
          your input directly shapes the direction of this project.
        </p>

        {/* Contact card */}
        <SectionHeading>Email Support</SectionHeading>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1.1rem 1.25rem',
          marginBottom: '1.25rem',
        }}>
          <div>
            <p style={{ margin: '0 0 0.2rem', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', opacity: 0.5, fontWeight: 600 }}>
              Primary Contact
            </p>
            <a
              href="mailto:ayushrauniyar@gmail.com"
              style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600 }}
            >
              ayushrauniyar@gmail.com
            </a>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
              Bug reports, feature requests, general inquiries
            </p>
          </div>
          <a
            href="mailto:ayushrauniyar@gmail.com"
            style={{
              flexShrink: 0,
              padding: '0.5rem 1rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--accent-gold)',
              background: 'transparent',
              border: '1px solid var(--accent-gold)',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              transition: 'background 0.15s ease',
            }}
          >
            Compose
          </a>
        </div>

        {/* Bug reporting */}
        <SectionHeading>Reporting a Bug</SectionHeading>
        <p style={{ ...para, fontSize: '0.88rem' }}>
          Detailed reports allow us to reproduce and resolve issues significantly faster.
          Please include the following when submitting a bug:
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.6rem',
          marginBottom: '1.25rem',
        }}>
          {[
            ['Browser & Version', 'e.g. Chrome 124, Firefox 126, Safari 17'],
            ['Operating System', 'e.g. Windows 11, macOS Sonoma, Ubuntu 24'],
            ['Steps to Reproduce', 'A numbered sequence of actions that trigger the issue'],
            ['Expected vs. Actual', 'What you expected to happen versus what occurred'],
            ['Screenshots / Errors', 'Any console errors or visual evidence of the problem'],
            ['Frequency', 'Does it happen consistently or intermittently?'],
          ].map(([title, hint]) => (
            <div key={title} style={{
              padding: '0.75rem 0.9rem',
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
            }}>
              <p style={{ margin: '0 0 0.2rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {title}
              </p>
              <p style={{ margin: 0, fontSize: '0.78rem', lineHeight: 1.5, color: 'var(--text-secondary)', opacity: 0.8 }}>
                {hint}
              </p>
            </div>
          ))}
        </div>

        {/* Feature requests */}
        <SectionHeading>Suggesting a Feature</SectionHeading>
        <p style={{ ...para, fontSize: '0.88rem' }}>
          Doc Studio prioritizes features that reinforce its core values: simplicity, privacy,
          and concentration. When proposing an enhancement, the most useful submissions address:
        </p>
        <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.25rem' }}>
          {[
            'The specific problem or friction point you are encountering.',
            'How the proposed feature resolves it and improves your workflow.',
            'Whether the addition aligns with a distraction-free writing philosophy.',
          ].map((item, i) => (
            <li key={i} style={{ marginBottom: '0.5rem', fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              {item}
            </li>
          ))}
        </ul>

        {/* Resources */}
        <SectionHeading>Resources</SectionHeading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[
            ['Documentation', 'In-depth guides, workflows, and advanced usage tips'],
            ['Markdown Cheat Sheet', 'Quick reference for all supported Markdown syntax'],
            ['Changelog', 'Release notes and feature history across all versions'],
          ].map(([label, desc]) => (
            <a
              key={label}
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                transition: 'border-color 0.15s',
              }}
            >
              <div>
                <p style={{ margin: '0 0 0.15rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-gold)' }}>
                  {label}
                </p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-secondary)', opacity: 0.75 }}>
                  {desc}
                </p>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.35, marginLeft: '1rem' }}>
                &rarr;
              </span>
            </a>
          ))}
        </div>

        <p style={{
          fontSize: '0.82rem',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          opacity: 0.55,
          fontStyle: 'italic',
          marginTop: '1.5rem',
          letterSpacing: '0.01em',
        }}>
          Thank you for using Doc Studio. Happy writing.
        </p>

      </div>
    </div>
  );
}