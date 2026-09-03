import React from 'react';

/**
 * Strips raw markdown syntax and renders clean, typography-rich JSX elements.
 * Converts:
 * - **bold** -> <strong>
 * - *italic* -> <em>
 * - `code` -> <code>
 * - Bullet lists -> <ul><li>
 * - Numbered lists -> <ol><li>
 */
export const FormattedText: React.FC<{ content: string; className?: string }> = React.memo(({ content, className = '' }) => {
  if (!content) return null;

  // Split into paragraphs by double newlines or single newlines
  const paragraphs = content.split(/\n\s*\n/);

  return (
    <div className={`space-y-3 leading-relaxed text-slate-700 text-sm ${className}`}>
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        // Check if paragraph is a bullet list
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          const items = trimmed.split('\n').filter(line => line.trim());
          return (
            <ul key={pIdx} className="space-y-1.5 pl-4 list-disc marker:text-blue-600">
              {items.map((item, iIdx) => {
                const cleanItem = item.replace(/^[\*\-•]\s*/, '').trim();
                return (
                  <li key={iIdx} className="text-slate-700 leading-relaxed">
                    {parseInlineMarkdown(cleanItem)}
                  </li>
                );
              })}
            </ul>
          );
        }

        // Check if numbered list (e.g. 1. 2.)
        if (/^\d+\.\s/.test(trimmed)) {
          const items = trimmed.split('\n').filter(line => line.trim());
          return (
            <ol key={pIdx} className="space-y-1.5 pl-5 list-decimal marker:text-blue-600 marker:font-semibold">
              {items.map((item, iIdx) => {
                const cleanItem = item.replace(/^\d+\.\s*/, '').trim();
                return (
                  <li key={iIdx} className="text-slate-700 leading-relaxed">
                    {parseInlineMarkdown(cleanItem)}
                  </li>
                );
              })}
            </ol>
          );
        }

        // Regular paragraph
        return (
          <p key={pIdx} className="leading-relaxed">
            {parseInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
});

/**
 * Parses bold (**text**), italic (*text*), inline code (`code`), and clean text.
 */
function parseInlineMarkdown(text: string): React.ReactNode[] {
  // Regex to match **bold**, *italic*, `code`
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-slate-900">
          {inner}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} className="italic text-slate-800">
          {inner}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs font-semibold text-blue-700 border border-slate-200"
        >
          {inner}
        </code>
      );
    }
    return part;
  });
}
