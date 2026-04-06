// Export utilities for Doc Studio
import jsPDF from 'jspdf';

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

// ── PDF export ─────────────────────────────────────────────────
export function exportPDF(doc) {
    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 60;
    const maxWidth = pageWidth - margin * 2;
    let y = margin;

    const lines = (doc.content || '').split('\n');

    pdf.setFont('helvetica');

    for (const line of lines) {
        if (y > pdf.internal.pageSize.getHeight() - margin) {
            pdf.addPage();
            y = margin;
        }

        if (line.startsWith('# ')) {
            pdf.setFontSize(22);
            pdf.setFont('helvetica', 'bold');
            const text = line.replace(/^# /, '');
            pdf.text(text, margin, y);
            y += 30;
        } else if (line.startsWith('## ')) {
            pdf.setFontSize(16);
            pdf.setFont('helvetica', 'bold');
            const text = line.replace(/^## /, '');
            pdf.text(text, margin, y);
            y += 22;
        } else if (line.startsWith('### ')) {
            pdf.setFontSize(13);
            pdf.setFont('helvetica', 'bold');
            const text = line.replace(/^### /, '');
            pdf.text(text, margin, y);
            y += 18;
        } else if (line.startsWith('---')) {
            pdf.setDrawColor(180, 180, 180);
            pdf.line(margin, y, pageWidth - margin, y);
            y += 12;
        } else if (line.trim() === '') {
            y += 8;
        } else {
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            // Handle bold via **text**
            const cleaned = line.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1').replace(/`(.+?)`/g, '$1');
            const wrapped = pdf.splitTextToSize(cleaned, maxWidth);
            pdf.text(wrapped, margin, y);
            y += wrapped.length * 14 + 2;
        }
    }

    pdf.save(`${sanitizeFilename(doc.title)}.pdf`);
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
