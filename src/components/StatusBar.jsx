import { wordCount, charCount, estimateReadTime, formatRelative } from '../utils/helpers.js';

export default function StatusBar({ content, doc }) {
    const wc = wordCount(content);
    const rt = estimateReadTime(content);

    return (
        <div className="status-bar" role="status" aria-label="Document statistics">
            <span className="status-bar__item">
                📄 {doc?.title || 'Untitled'}
            </span>
            <span className="status-bar__sep">·</span>
            <span className="status-bar__item">{wc} words</span>
            <span className="status-bar__sep">·</span>
            <span className="status-bar__item">{charCount(content)} chars</span>
            <span className="status-bar__sep">·</span>
            <span className="status-bar__item">{rt}</span>
            {doc?.updatedAt && (
                <>
                    <span className="status-bar__sep">·</span>
                    <span className="status-bar__item">saved {formatRelative(doc.updatedAt)}</span>
                </>
            )}
            {doc?.tags?.length > 0 && (
                <>
                    <span className="status-bar__sep">·</span>
                    <span className="status-bar__item">{doc.tags.join(', ')}</span>
                </>
            )}
        </div>
    );
}
