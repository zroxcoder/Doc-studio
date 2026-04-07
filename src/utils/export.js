// Export utilities for Doc Studio
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { parseMarkdown } from '../components/MarkdownRenderer.jsx';

// ── Markdown export ────────────────────────────────────────────
export function exportMarkdown(doc) {
    const content = doc.content || '';
    const blob = new Blob([content], { type: 'text/markdown' });
    downloadBlob(blob, `${sanitizeFilename(doc.title)}.md`);
}

// ── Plain text export ──────────────────────────────────────────
export function exportText(doc) {
    // Strip markdown syntax for plain text
    const text = doc.content
        .replace(/#{1,6}\s/g, '')
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/`(.+?)`/g, '$1')
        .replace(/```[\s\S]*?```/g, (m) => m.replace(/```\w*\n?/, '').replace(/```/, ''))
        .replace(/\[(.+?)\]\(.+?\)/g, '$1');

    const blob = new Blob([text], { type: 'text/plain' });
    downloadBlob(blob, `${sanitizeFilename(doc.title)}.txt`);
}

// ── HTML Preview Export ─────────────────────────────────────────
export function exportHTML(doc) {
    const htmlSnippet = parseMarkdown(doc.content || '');
    const title = doc.title || 'Untitled';
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; line-height: 1.6; color: #333; background: #fff; }
  pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
  code { font-family: monospace; background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
  pre code { padding: 0; background: transparent; }
  table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  th { background-color: #f2f2f2; }
  blockquote { border-left: 4px solid #ddd; padding-left: 15px; color: #666; margin-left: 0; }
  img { max-width: 100%; height: auto; }
  ul.task-list { list-style: none; padding-left: 0; }
  .task-list li { display: flex; align-items: start; gap: 8px; margin-bottom: 4px; }
</style>
</head>
<body>
${htmlSnippet}
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    downloadBlob(blob, `${sanitizeFilename(title)}.html`);
}

// ── PDF export ─────────────────────────────────────────────────
export async function exportPDF(doc) {
    const htmlSnippet = parseMarkdown(doc.content || '');
    const container = document.createElement('div');
    // Ensure styles to accurately render pdf canvas representation
    container.innerHTML = `
        <div style="font-family: system-ui, -apple-system, sans-serif; color: #000; background: #fff; width: 800px; padding: 40px; line-height: 1.6;">
            ${htmlSnippet}
        </div>
    `;
    // We must apply scoped styles to the container so canvas picks it up
    const style = document.createElement('style');
    style.innerHTML = `
        #pdf-temp-container pre { background: #f4f4f4; padding: 15px; border-radius: 5px; white-space: pre-wrap; }
        #pdf-temp-container code { font-family: monospace; }
        #pdf-temp-container table { border-collapse: collapse; width: 100%; }
        #pdf-temp-container th, #pdf-temp-container td { border: 1px solid #ddd; padding: 8px; }
        #pdf-temp-container blockquote { border-left: 4px solid #ddd; padding-left: 15px; color: #666; margin-left: 0; }
        #pdf-temp-container img { max-width: 100%; }
    `;
    container.id = 'pdf-temp-container';
    container.appendChild(style);
    
    // It needs to be in the DOM to render
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    document.body.appendChild(container);

    try {
        const canvas = await html2canvas(container.firstElementChild, { 
            scale: 2, 
            useCORS: true, 
            logging: false,
            windowWidth: 800
        });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${sanitizeFilename(doc.title)}.pdf`);
    } catch (err) {
        console.error('PDF export failed:', err);
    } finally {
        document.body.removeChild(container);
    }
}

// ── Import from file ───────────────────────────────────────────
export function importFromFile() {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.md,.txt,.markdown';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return reject(new Error('No file selected'));
            const text = await file.text();
            resolve({
                title: file.name.replace(/\.(md|txt|markdown)$/, ''),
                content: text,
            });
        };
        input.click();
    });
}

// ── Helpers ────────────────────────────────────────────────────
function sanitizeFilename(name) {
    return (name || 'document').replace(/[^a-z0-9_\-\s]/gi, '').trim().replace(/\s+/g, '-') || 'document';
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
