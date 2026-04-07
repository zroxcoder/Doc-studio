import { useState, useRef, useEffect } from 'react';
import { useDoc } from '../contexts/DocContext.jsx';
import { useToast } from '../contexts/ToastContext.jsx';
import { wordCount, charCount } from '../utils/helpers.js';
import { exportMarkdown, exportText, exportPDF, exportHTML, importFromFile } from '../utils/export.js';
import {
    Bold, Italic, Code, Heading1, Heading2, Heading3,
    List, ListOrdered, Quote, Minus, Table,
    Download, Upload, Clock, Eye, Edit3, MoreHorizontal,
    CheckSquare, Link, Image
} from 'lucide-react';

export default function EditorToolbar({ mode, onModeChange, content }) {
    const { activeDoc, updateDocument } = useDoc();
    const { addToast } = useToast();
    const [exportOpen, setExportOpen] = useState(false);
    const exportRef = useRef(null);

    useEffect(() => {
        const close = (e) => {
            if (exportRef.current && !exportRef.current.contains(e.target)) setExportOpen(false);
        };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    const triggerInputEvent = (ta, newValue, selectionStart, selectionEnd) => {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
        nativeInputValueSetter.call(ta, newValue);
        ta.dispatchEvent(new Event('input', { bubbles: true }));
        requestAnimationFrame(() => {
            ta.focus();
            if (selectionStart !== undefined) {
                ta.setSelectionRange(selectionStart, selectionEnd ?? selectionStart);
            }
        });
    };

    const insert = (prefix, suffix = '') => {
        const ta = document.getElementById('main-editor');
        if (!ta) return;
        const { selectionStart: s, selectionEnd: e } = ta;
        const selected = ta.value.slice(s, e);
        const newText = ta.value.slice(0, s) + prefix + selected + suffix + ta.value.slice(e);
        triggerInputEvent(ta, newText, s + prefix.length, s + prefix.length + selected.length);
    };

    const insertLine = (prefix) => {
        const ta = document.getElementById('main-editor');
        if (!ta) return;
        const s = ta.value.slice(0, ta.selectionStart).lastIndexOf('\n') + 1;
        const e = ta.selectionEnd;
        const lineEnd = ta.value.indexOf('\n', e);
        const end = lineEnd === -1 ? ta.value.length : lineEnd;
        const line = ta.value.slice(s, end);
        const newLine = line.startsWith(prefix) ? line.slice(prefix.length) : prefix + line;
        const newText = ta.value.slice(0, s) + newLine + ta.value.slice(end);
        triggerInputEvent(ta, newText);
    };

    const insertAtCursor = (text) => {
        const ta = document.getElementById('main-editor');
        if (!ta) return;
        const s = ta.selectionStart;
        const newText = ta.value.slice(0, s) + text + ta.value.slice(s);
        triggerInputEvent(ta, newText, s + text.length);
    };

    const handleExport = async (type) => {
        if (!activeDoc) return;
        setExportOpen(false);
        try {
            if (type === 'md') exportMarkdown(activeDoc);
            else if (type === 'txt') exportText(activeDoc);
            else if (type === 'pdf') exportPDF(activeDoc);
            else if (type === 'html') exportHTML(activeDoc);
            addToast(`Exported as ${type.toUpperCase()}`, 'success');
        } catch (err) {
            addToast('Export failed', 'error');
        }
    };

    const handleImport = async () => {
        try {
            const imported = await importFromFile();
            updateDocument({ title: imported.title, content: imported.content });
            addToast('File imported successfully', 'success');
        } catch {
            addToast('Import cancelled or failed', 'info');
        }
    };

    const wc = wordCount(content);
    const cc = charCount(content);

    return (
        <div className="editor-toolbar" role="toolbar" aria-label="Editor formatting toolbar">
            {/* Heading controls */}
            <button className="toolbar-btn" onClick={() => insertLine('# ')} title="Heading 1">
                <Heading1 size={14} />
            </button>
            <button className="toolbar-btn" onClick={() => insertLine('## ')} title="Heading 2">
                <Heading2 size={14} />
            </button>
            <button className="toolbar-btn" onClick={() => insertLine('### ')} title="Heading 3">
                <Heading3 size={14} />
            </button>

            <div className="toolbar-divider" />

            {/* Inline formatting */}
            <button className="toolbar-btn" onClick={() => insert('**', '**')} title="Bold (Ctrl+B)">
                <Bold size={14} />
            </button>
            <button className="toolbar-btn" onClick={() => insert('*', '*')} title="Italic (Ctrl+I)">
                <Italic size={14} />
            </button>
            <button className="toolbar-btn" onClick={() => insert('`', '`')} title="Inline code">
                <Code size={14} />
            </button>

            <div className="toolbar-divider" />

            {/* Lists */}
            <button className="toolbar-btn" onClick={() => insertLine('- ')} title="Bullet list">
                <List size={14} />
            </button>
            <button className="toolbar-btn" onClick={() => insertLine('1. ')} title="Numbered list">
                <ListOrdered size={14} />
            </button>
            <button className="toolbar-btn" onClick={() => insertLine('- [ ] ')} title="Checklist">
                <CheckSquare size={14} />
            </button>
            <button className="toolbar-btn" onClick={() => insertLine('> ')} title="Blockquote">
                <Quote size={14} />
            </button>
            <button className="toolbar-btn" onClick={() => insertLine('---')} title="Horizontal rule">
                <Minus size={14} />
            </button>

            <div className="toolbar-divider" />

            {/* Links and Media */}
            <button className="toolbar-btn" onClick={() => insert('[', '](url)')} title="Insert link">
                <Link size={14} />
            </button>
            <button className="toolbar-btn" onClick={() => insert('![', '](image-url)')} title="Insert image">
                <Image size={14} />
            </button>

            <div className="toolbar-divider" />

            {/* Block inserts */}
            <button
                className="toolbar-btn"
                title="Code block"
                onClick={() => insertAtCursor('\n```\n\n```\n')}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}
            >
                {'</>'}
            </button>
            <button
                className="toolbar-btn"
                title="Insert table"
                onClick={() => insertAtCursor('\n| Column 1 | Column 2 |\n|----------|----------|\n| Cell     | Cell     |\n')}
            >
                <Table size={14} />
            </button>

            {/* Right-side controls */}
            <div className="toolbar-right">
                <span className="word-count">{wc} words · {cc} chars</span>

                <div className="toolbar-divider" />

                {/* View mode toggle */}
                <button
                    className={`toolbar-btn ${mode === 'edit' ? 'active' : ''}`}
                    onClick={() => onModeChange('edit')}
                    title="Edit mode"
                >
                    <Edit3 size={13} /> Edit
                </button>
                <button
                    className={`toolbar-btn ${mode === 'preview' ? 'active' : ''}`}
                    onClick={() => onModeChange('preview')}
                    title="Preview mode"
                >
                    <Eye size={13} /> Preview
                </button>

                <div className="toolbar-divider" />

                {/* Import */}
                <button className="toolbar-btn" onClick={handleImport} title="Import file">
                    <Upload size={13} />
                </button>

                {/* Export dropdown */}
                <div className="dropdown" ref={exportRef}>
                    <button
                        className="toolbar-btn"
                        onClick={() => setExportOpen(v => !v)}
                        title="Export"
                    >
                        <Download size={13} /> Export
                    </button>
                    {exportOpen && (
                        <div className="dropdown__menu" style={{ right: 0, minWidth: 140 }}>
                            <button className="dropdown__item" onClick={() => handleExport('md')}>📄 Markdown (.md)</button>
                            <button className="dropdown__item" onClick={() => handleExport('txt')}>📝 Plain Text (.txt)</button>
                            <button className="dropdown__item" onClick={() => handleExport('html')}>🌐 HTML Preview (.html)</button>
                            <button className="dropdown__item" onClick={() => handleExport('pdf')}>🖨️ PDF Preview (.pdf)</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
