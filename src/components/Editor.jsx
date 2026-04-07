import { useState, useCallback, useEffect, useRef } from 'react';
import { useDoc } from '../contexts/DocContext.jsx';
import EditorToolbar from './EditorToolbar.jsx';
import MarkdownRenderer from './MarkdownRenderer.jsx';
import StatusBar from './StatusBar.jsx';
import { debounce } from '../utils/helpers.js';

export default function Editor() {
    const { activeDoc, updateDocument } = useDoc();
    const [mode, setMode] = useState('edit'); // 'edit' | 'preview'
    const taRef = useRef(null);

    // Keep textarea synced when active doc changes
    useEffect(() => {
        if (taRef.current && activeDoc) {
            taRef.current.value = activeDoc.content || '';
        }
        setMode('edit');
    }, [activeDoc?.id]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handler = (e) => {
            if (!activeDoc) return;
            if ((e.ctrlKey || e.metaKey)) {
                if (e.key === 'b') { e.preventDefault(); boldSelection(); }
                if (e.key === 'i') { e.preventDefault(); italicSelection(); }
                if (e.key === 'p') { e.preventDefault(); setMode(m => m === 'edit' ? 'preview' : 'edit'); }
            }
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [activeDoc]);

    const updateNativeTextarea = (ta, newText) => {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
        nativeInputValueSetter.call(ta, newText);
        ta.dispatchEvent(new Event('input', { bubbles: true }));
    };

    const boldSelection = () => {
        const ta = document.getElementById('main-editor');
        if (!ta) return;
        const { selectionStart: s, selectionEnd: e } = ta;
        const selected = ta.value.slice(s, e);
        updateNativeTextarea(ta, ta.value.slice(0, s) + '**' + selected + '**' + ta.value.slice(e));
        requestAnimationFrame(() => ta.setSelectionRange(s + 2, s + 2 + selected.length));
    };

    const italicSelection = () => {
        const ta = document.getElementById('main-editor');
        if (!ta) return;
        const { selectionStart: s, selectionEnd: e } = ta;
        const selected = ta.value.slice(s, e);
        updateNativeTextarea(ta, ta.value.slice(0, s) + '*' + selected + '*' + ta.value.slice(e));
        requestAnimationFrame(() => ta.setSelectionRange(s + 1, s + 1 + selected.length));
    };

    const handleChange = useCallback((e) => {
        updateDocument({ content: e.target.value });
    }, [updateDocument]);

    // Tab-key support in the editor
    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const ta = e.target;
            const s = ta.selectionStart;
            const newValue = ta.value.slice(0, s) + '  ' + ta.value.slice(s);
            // Update via DOM to avoid React batching issues
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
            nativeInputValueSetter.call(ta, newValue);
            ta.dispatchEvent(new Event('input', { bubbles: true }));
            ta.setSelectionRange(s + 2, s + 2);
        }
    };

    if (!activeDoc) return null;

    const content = activeDoc.content || '';

    return (
        <div className="main-content">
            <EditorToolbar mode={mode} onModeChange={setMode} content={content} />

            <div className="editor-container">
                <div className="editor-page">
                    {mode === 'edit' ? (
                        <textarea
                            id="main-editor"
                            ref={taRef}
                            className="editor-textarea"
                            defaultValue={content}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Start writing…"
                            spellCheck
                            aria-label="Document editor"
                            aria-multiline="true"
                        />
                    ) : (
                        <div className="animate-fade-in">
                            <MarkdownRenderer content={content} />
                        </div>
                    )}
                </div>
            </div>

            <StatusBar content={content} doc={activeDoc} />
        </div>
    );
}
