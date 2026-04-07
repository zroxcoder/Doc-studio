// Simple but effective markdown renderer
// Converts markdown text to JSX elements

export default function MarkdownRenderer({ content }) {
    const html = parseMarkdown(content || '');
    return (
        <div
            className="editor-preview"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

export function parseMarkdown(md) {
    let html = md
        // Escape HTML entities (security)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Fenced code blocks (must come before inline)
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre><code class="lang-${lang}">${code.trimEnd()}</code></pre>`;
    });

    // Table handling
    html = html.replace(/(\|.+\|\n)(\|[-:| ]+\|\n)((?:\|.+\|\n?)*)/g, (match) => {
        const rows = match.trim().split('\n');
        const header = rows[0];
        const body = rows.slice(2);
        const toRow = (row, tag) =>
            '<tr>' + row.split('|').filter((_, i, a) => i > 0 && i < a.length - 1)
                .map(cell => `<${tag}>${inlineFormat(cell.trim())}</${tag}>`).join('') + '</tr>';
        return `<table><thead>${toRow(header, 'th')}</thead><tbody>${body.map(r => toRow(r, 'td')).join('')}</tbody></table>`;
    });

    // Process line by line
    const lines = html.split('\n');
    const result = [];
    let i = 0;
    let inList = false;
    let listType = null;

    const closeList = () => {
        if (inList) {
            result.push(`</${listType}>`);
            inList = false;
            listType = null;
        }
    };

    while (i < lines.length) {
        const line = lines[i];

        // Headings
        if (/^###### /.test(line)) { closeList(); result.push(`<h6>${inlineFormat(line.slice(7))}</h6>`); }
        else if (/^##### /.test(line)) { closeList(); result.push(`<h5>${inlineFormat(line.slice(6))}</h5>`); }
        else if (/^#### /.test(line)) { closeList(); result.push(`<h4>${inlineFormat(line.slice(5))}</h4>`); }
        else if (/^### /.test(line)) { closeList(); result.push(`<h3>${inlineFormat(line.slice(4))}</h3>`); }
        else if (/^## /.test(line)) { closeList(); result.push(`<h2>${inlineFormat(line.slice(3))}</h2>`); }
        else if (/^# /.test(line)) { closeList(); result.push(`<h1>${inlineFormat(line.slice(2))}</h1>`); }
        // HR
        else if (/^---+$/.test(line.trim())) { closeList(); result.push('<hr />'); }
        // Blockquote
        else if (/^> /.test(line)) { closeList(); result.push(`<blockquote>${inlineFormat(line.slice(2))}</blockquote>`); }
        // Unordered list
        else if (/^- /.test(line) || /^\* /.test(line)) {
            if (!inList || listType !== 'ul') { closeList(); result.push('<ul style="list-style-type: disc; padding-left: 20px;">'); inList = true; listType = 'ul'; }
            let itemText = line.slice(2);
            if (itemText.startsWith('[ ] ')) {
                itemText = `<input type="checkbox" disabled /> ${itemText.slice(4)}`;
            } else if (itemText.startsWith('[x] ') || itemText.startsWith('[X] ')) {
                itemText = `<input type="checkbox" disabled checked /> ${itemText.slice(4)}`;
            }
            result.push(`<li>${inlineFormat(itemText)}</li>`);
        }
        // Ordered list
        else if (/^\d+\. /.test(line)) {
            if (!inList || listType !== 'ol') { closeList(); result.push('<ol>'); inList = true; listType = 'ol'; }
            result.push(`<li>${inlineFormat(line.replace(/^\d+\. /, ''))}</li>`);
        }
        // Already processed block elements (pre, table)
        else if (line.startsWith('<pre>') || line.startsWith('<table>')) {
            closeList();
            result.push(line);
        }
        // Empty line
        else if (line.trim() === '') {
            closeList();
            result.push('<br />');
        }
        // Paragraph
        else {
            closeList();
            result.push(`<p>${inlineFormat(line)}</p>`);
        }

        i++;
    }

    closeList();
    return result.join('\n');
}

function inlineFormat(text) {
    return text
        // Bold+italic
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        // Bold
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Image
        .replace(/!\[(.*?)\]\((.+?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%;" />')
        // Link
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
        // Strikethrough
        .replace(/~~(.+?)~~/g, '<del>$1</del>');
}
