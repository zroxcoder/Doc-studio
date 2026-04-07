import React from 'react';

export function AboutPage() {
    return (
        <div className="welcome-screen">
            <h1 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '2.5rem' }}>About Doc Studio</h1>
            <div style={{ maxWidth: '600px', textAlign: 'left', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                <p style={{ marginBottom: '1rem' }}>
                    Welcome to <strong>Doc Studio</strong>, your premier retro-modern writing environment. Designed to be distraction-free and aesthetically pleasing, it combines the charm of vintage interfaces with the power of modern web technologies.
                </p>
                
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', marginTop: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>✨ Why Doc Studio?</h3>
                <p style={{ marginBottom: '1rem' }}>
                    In a world of cluttered editors and cloud-dependent apps, Doc Studio offers a refreshing alternative: a focused, offline-first workspace that respects your privacy and your workflow.
                </p>

                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', marginTop: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>🚀 What You Can Do</h3>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li><strong>Write in Markdown:</strong> Create beautifully formatted documents using intuitive Markdown syntax with live preview.</li>
                    <li><strong>Stay Organized:</strong> Group documents into interactive folders with drag-and-drop support for effortless project management.</li>
                    <li><strong>Work Offline:</strong> No internet? No problem. All your data stays securely on your local machine via IndexedDB.</li>
                    <li><strong>Export Anywhere:</strong> Share your work instantly by exporting to Markdown, PDF, or Plain Text formats.</li>
                    <li><strong>Auto-Save Peace of Mind:</strong> Never lose progress—Doc Studio saves your work automatically as you type.</li>
                    <li><strong>Privacy First:</strong> Your documents never leave your browser unless you explicitly export them.</li>
                </ul>

                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', marginTop: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>🎯 Perfect For</h3>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li>Developers drafting technical documentation or README files</li>
                    <li>Writers crafting essays, stories, or blog posts</li>
                    <li>Students organizing notes and research</li>
                    <li>Professionals creating resumes, proposals, or meeting notes</li>
                    <li>Anyone who values a clean, focused writing experience</li>
                </ul>

                <p style={{ marginTop: '1.5rem', fontStyle: 'italic', color: 'var(--accent-gold)' }}>
                    "The best tool is the one that disappears—letting your ideas take center stage."
                </p>
            </div>
        </div>
    );
}

export function HelpPage() {
    return (
        <div className="welcome-screen" style={{ overflowY: 'auto' }}>
            <h1 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '2.5rem' }}>Help & Navigation</h1>
            <div style={{ maxWidth: '600px', textAlign: 'left', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                <p style={{ marginBottom: '1rem' }}>
                    Welcome to your Doc Studio quick-start guide! Below you'll find everything you need to write, organize, and export with confidence.
                </p>

                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>⚡ Getting Started (30 Seconds)</h3>
                <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li>Press <code>Ctrl + N</code> to create a new document</li>
                    <li>Start typing—your work auto-saves instantly</li>
                    <li>Use <code>Ctrl + \</code> to toggle the sidebar and organize files</li>
                    <li>Click the <strong>Export</strong> button (📤) to share your work</li>
                </ol>

                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>⌨️ Keyboard Shortcuts</h3>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li><code>Ctrl + N</code> : Create a new document</li>
                    <li><code>Ctrl + \</code> : Toggle sidebar visibility</li>
                    <li><code>Ctrl + B</code> : Toggle <strong>bold</strong> formatting</li>
                    <li><code>Ctrl + I</code> : Toggle <em>italic</em> formatting</li>
                    <li><code>Ctrl + K</code> : Insert a link</li>
                    <li><code>Ctrl + Shift + C</code> : Copy document as Markdown</li>
                    <li><code>Ctrl + S</code> : Trigger manual save (auto-save is always on)</li>
                </ul>

                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>📝 Markdown Quick Reference</h3>
                <p style={{ marginBottom: '0.5rem' }}><strong>Headings:</strong> <code># H1</code>, <code>## H2</code>, <code>### H3</code></p>
                <p style={{ marginBottom: '0.5rem' }}><strong>Emphasis:</strong> <code>**bold**</code>, <code>*italic*</code>, <code>~~strikethrough~~</code></p>
                <p style={{ marginBottom: '0.5rem' }}><strong>Lists:</strong> <code>- Item</code> (unordered), <code>1. Item</code> (ordered)</p>
                <p style={{ marginBottom: '0.5rem' }}><strong>Links:</strong> <code>[text](https://example.com)</code></p>
                <p style={{ marginBottom: '0.5rem' }}><strong>Code:</strong> <code>`inline`</code> or <code>``` blocks ```</code></p>
                <p style={{ marginBottom: '1rem' }}><strong>Tip:</strong> Use the editor toolbar buttons for one-click Markdown insertion!</p>

                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>📁 Organizing Your Work</h3>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li><strong>Create folders:</strong> Click the "+" icon in the sidebar to group related documents</li>
                    <li><strong>Drag & drop:</strong> Reorder documents or move them between folders effortlessly</li>
                    <li><strong>Rename:</strong> Double-click any document or folder name to edit it</li>
                    <li><strong>Delete:</strong> Right-click → Delete (or press <code>Delete</code> key when selected)</li>
                </ul>

                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>💾 Data & Exporting</h3>
                <p style={{ marginBottom: '1rem' }}>
                    Your documents are stored locally in your browser using <strong>IndexedDB</strong>—no servers, no tracking. To share or backup:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li>Click the <strong>Export</strong> button (📤) in the editor toolbar</li>
                    <li>Choose your format: <strong>PDF</strong> (print-ready), <strong>Markdown</strong> (editable), or <strong>Plain Text</strong></li>
                    <li>For backups: Export as Markdown and store in your preferred cloud service or external drive</li>
                </ul>

                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>❓ Troubleshooting</h3>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li><strong>Can't find my document?</strong> Check the sidebar—use the search bar to filter by name</li>
                    <li><strong>Export not working?</strong> Ensure pop-ups aren't blocked in your browser settings</li>
                    <li><strong>Lost data after clearing browser?</strong> IndexedDB is cleared with browser data—regularly export important work</li>
                    <li><strong>Keyboard shortcuts not responding?</strong> Make sure the editor area is focused (click inside the document first)</li>
                </ul>

                <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--accent-gold)' }}>
                    💡 <strong>Pro Tip:</strong> Press <code>Ctrl + /</code> anytime to reopen this Help guide!
                </p>
            </div>
        </div>
    );
}

export function ContactPage() {
    return (
        <div className="welcome-screen">
            <h1 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '2.5rem' }}>Contact Us</h1>
            <div style={{ maxWidth: '600px', textAlign: 'left', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                <p style={{ marginBottom: '1rem' }}>
                    Have suggestions, feature requests, or just want to report a bug? We'd love to hear from you. 
                </p>
                <p style={{ marginBottom: '1rem' }}>
                    Doc Studio is continuously evolving, and user feedback forms the core of our updates. Your voice directly shapes the future of the app.
                </p>

                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', marginTop: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>📬 How to Reach Us</h3>
                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
                    <p style={{ marginBottom: '0.75rem' }}><strong>✉️ Email Support:</strong><br/>
                        <a href="mailto:ayushrauniyar@gmail.com" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>ayushrauniyar@gmail.com</a><br/>
                        <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>Best for: Bug reports, account questions, detailed feedback</span>
                    </p>
                    
                </div>

                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>📋 When Reporting a Bug</h3>
                <p style={{ marginBottom: '0.5rem' }}>Help us fix issues faster by including:</p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li>Your browser and version (e.g., Chrome 120, Firefox 121)</li>
                    <li>Operating system (Windows, macOS, Linux)</li>
                    <li>Steps to reproduce the issue</li>
                    <li>Screenshots or error messages (if applicable)</li>
                </ul>

                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>💡 Suggesting a Feature</h3>
                <p style={{ marginBottom: '1rem' }}>
                    We prioritize features that align with Doc Studio's core values: simplicity, privacy, and focus. When suggesting:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li>Describe the problem you're trying to solve</li>
                    <li>Explain how the feature would improve your workflow</li>
                    <li>Consider if it fits the "distraction-free" philosophy</li>
                </ul>

                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>🌐 Community & Resources</h3>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li><a href="#" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Documentation</a> – In-depth guides and tutorials</li>
                    <li><a href="#" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Markdown Cheat Sheet</a> – Quick reference for formatting</li>
                    <li><a href="#" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Changelog</a> – See what's new in each update</li>
                </ul>

                <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', textAlign: 'center', fontStyle: 'italic' }}>
                    We typically respond within 24-48 hours. Thank you for choosing Doc Studio—happy writing! ✍️
                </p>
            </div>
        </div>
    );
}