import React from 'react';

export function AboutPage() {
    return (
        <div className="welcome-screen">
            <h1 style={{ color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '2.5rem' }}>About Doc Studio</h1>
            <div style={{ maxWidth: '600px', textAlign: 'left', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                <p style={{ marginBottom: '1rem' }}>
                    Welcome to <strong>Doc Studio</strong>, your premier retro-modern writing environment. Designed to be distraction-free and aesthetically pleasing, it combines the charm of vintage interfaces with the power of modern web technologies.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                    With Doc Studio, you can:
                </p>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li>Create beautifully formatted documents using Markdown.</li>
                    <li>Organize your work into interactive folders.</li>
                    <li>Easily backup and restore documents.</li>
                    <li>Export your masterpieces directly to Markdown, PDF, or Plain Text.</li>
                    <li>Write completely offline—your data stays private on your local machine.</li>
                </ul>
                <p>
                    Whether drafting software documentation, sketching up a resume, or just capturing your daily thoughts, Doc Studio keeps you focused on what truly matters: writing.
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
                    Need help navigating Doc Studio? Here's a brief guide to get you up and running quickly:
                </p>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>Keyboard Shortcuts</h3>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li><code>Ctrl + N</code> : Create a new document.</li>
                    <li><code>Ctrl + \</code> : Toggle the sidebar.</li>
                    <li><code>Ctrl + B</code> : Bold text.</li>
                    <li><code>Ctrl + I</code> : Italic text.</li>
                </ul>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>Markdown Support</h3>
                <p style={{ marginBottom: '1rem' }}>
                    Doc Studio provides full Markdown support. You can use standard formatting such as <code># Heading</code>, <code>**Bold**</code>, or <code>- List items</code>. Use the editor toolbar for quick injections of these properties.
                </p>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.2rem' }}>Data & Exporting</h3>
                <p>
                    Your data is stored safely in your browser via IndexedDB. To share your work, simply use the <strong>Export</strong> feature located at the far right of the editor toolbar to generate PDFs, TXT, or MD files. Don't worry about saving—Doc Studio auto-saves for you!
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
                    Doc Studio is continuously evolving, and user feedback forms the core of our updates. Feel free to reach out to our team using the following methods:
                </p>
                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <p><strong>Email:</strong> <a href="mailto:support@zroxcoder.com">support@zroxcoder.com</a></p>
                    <p style={{ marginTop: '0.5rem' }}><strong>GitHub:</strong> <a href="https://github.com/zroxcoder/Doc-studio" target="_blank" rel="noreferrer">zroxcoder/Doc-studio</a></p>
                    <p style={{ marginTop: '0.5rem' }}><strong>Twitter / X:</strong> <a href="#" target="_blank" rel="noreferrer">@DocStudioApp</a></p>
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                    We typically respond within 24-48 hours. Thank you for choosing Doc Studio!
                </p>
            </div>
        </div>
    );
}
