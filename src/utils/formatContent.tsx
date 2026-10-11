import React from 'react';
import { useLanguage } from '../i18n/LocaleContext';
import { translate } from '../i18n/translate';

/**
 * Strips raw markdown syntax and renders clean, typography-rich JSX elements.
 * Converts:
 * - **bold** -> <strong>
 * - *italic* -> <em>
 * - `code` -> <code>
 * - `$formula$` / `$$formula$$` -> readable formula text
 * - Bullet lists -> <ul><li>
 * - Numbered lists -> <ol><li>
 */
export const FormattedText: React.FC<{ content: string; className?: string }> = React.memo(({ content: originalContent, className = '' }) => {
  const { language } = useLanguage();
  const content = translate(originalContent, language);
  if (!content) return null;

  // Split into paragraphs by double newlines or single newlines
  const paragraphs = content.split(/\n\s*\n/);

  return (
    <div className={`space-y-3 leading-relaxed text-[var(--foreground)] text-sm ${className}`}>
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        const tableLines = trimmed.split('\n').filter(line => line.trim());
        if (tableLines.length >= 2 && tableLines.some(line => isTableRow(line))) {
          const table = parseMarkdownTable(tableLines);
          if (table) {
            return (
              <div key={pIdx} className="overflow-x-auto rounded-xl border border-[var(--border)]">
                {table.title && (
                  <h6 className="border-b border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-sm font-medium text-[var(--foreground)]">
                    {parseInlineMarkdown(table.title)}
                  </h6>
                )}
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-[var(--surface-muted)] text-[var(--foreground)]">
                    <tr>
                      {table.headers.map((header, index) => (
                        <th key={index} className="border-b border-[var(--border)] px-3 py-2.5 font-medium">
                          {parseInlineMarkdown(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] bg-[var(--surface)]">
                    {table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex} className="align-top even:bg-[var(--surface-muted)]">
                        {table.headers.map((_, cellIndex) => (
                          <td key={cellIndex} className="border-r border-[var(--border)] px-3 py-2.5 leading-relaxed text-[var(--foreground)] last:border-r-0">
                            {parseInlineMarkdown(row[cellIndex] || '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }

        // Render markdown headings instead of exposing the # markers.
        const headingMatch = trimmed.match(/^#{1,4}\s+(.+)$/);
        if (headingMatch) {
          return (
            <h6 key={pIdx} className="pt-1 text-sm font-medium text-[var(--foreground)]">
              {parseInlineMarkdown(headingMatch[1])}
            </h6>
          );
        }

        // Check if paragraph is a bullet list
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          const items = trimmed.split('\n').filter(line => line.trim());
          return (
            <ul key={pIdx} className="space-y-1.5 pl-4 list-disc marker:text-[var(--text-secondary)]">
              {items.map((item, iIdx) => {
                const cleanItem = item.replace(/^[\*\-•]\s*/, '').trim();
                return (
                  <li key={iIdx} className="text-[var(--foreground)] leading-relaxed">
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
            <ol key={pIdx} className="space-y-1.5 pl-5 list-decimal marker:text-[var(--text-secondary)] marker:font-medium">
              {items.map((item, iIdx) => {
                const cleanItem = item.replace(/^\d+\.\s*/, '').trim();
                return (
                  <li key={iIdx} className="text-[var(--foreground)] leading-relaxed">
                    {parseInlineMarkdown(cleanItem)}
                  </li>
                );
              })}
            </ol>
          );
        }

        // Standalone display formula
        if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
          return (
            <div
              key={pIdx}
              className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3 text-center font-mono text-sm font-medium text-[var(--foreground)] whitespace-pre-wrap"
            >
              {renderMathText(trimmed.slice(2, -2), true)}
            </div>
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
  // Match formulas before markdown so LaTeX commands never leak into the UI.
  const regex = /(\$\$[\s\S]*?\$\$|\$[^$\n]+\$|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      return (
        <span key={index} className="mx-1 inline-block align-middle font-mono font-medium text-[var(--foreground)] whitespace-pre-wrap">
          {renderMathText(part.slice(2, -2), true)}
        </span>
      );
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      return (
        <code key={index} className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs font-medium text-[var(--foreground)]">
          {renderMathText(part.slice(1, -1))}
        </code>
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-medium text-[var(--foreground)]">
          {inner}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} className="italic text-[var(--foreground)]">
          {inner}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className="rounded bg-[var(--surface-muted)] px-1.5 py-0.5 font-mono text-xs font-medium text-[var(--foreground)] border border-[var(--border)]"
        >
          {inner}
        </code>
      );
    }
    return part;
  });
}

/**
 * Converts the small LaTeX subset used by the course content into readable text.
 * This intentionally stays dependency-free; it is a presentation cleanup, not a
 * mathematical typesetting engine.
 */
function renderMathText(value: string, display = false): string {
  let text = value
    .replace(/\\begin\{(?:matrix|cases|aligned)\}/g, '')
    .replace(/\\end\{(?:matrix|cases|aligned)\}/g, '')
    .replace(/\\(?:mathbf|mathrm|mathit|textbf|textit)\{([^{}]*)\}/g, '$1')
    .replace(/\\text\{([^{}]*)\}/g, '$1')
    .replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '($1 / $2)')
    .replace(/\\xrightarrow\{([^{}]*)\}/g, ' — $1 → ')
    .replace(/\\(?:longrightarrow|rightarrow)/g, ' → ')
    .replace(/\\(?:leftrightarrow|longleftrightarrow)/g, ' ↔ ')
    .replace(/\\mapsto/g, ' ↦ ')
    .replace(/\\implies/g, ' ⇒ ')
    .replace(/\\times/g, ' × ')
    .replace(/\\cdot/g, ' · ')
    .replace(/\\pm/g, ' ± ')
    .replace(/\\neq/g, ' ≠ ')
    .replace(/\\leq/g, ' ≤ ')
    .replace(/\\geq/g, ' ≥ ')
    .replace(/\\gg/g, ' ≫ ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\textstyle|\\displaystyle/g, '')
    .replace(/\\\\/g, display ? '\n' : '  ')
    .replace(/&/g, '   ')
    .replace(/\^\{([^{}]*)\}/g, '^$1')
    .replace(/_\{([^{}]*)\}/g, '_$1')
    .replace(/[{}]/g, '')
    .replace(/\\([\\$%_#])/g, '$1')
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/[ ]*\n[ ]*/g, '\n')
    .trim();

  return text;
}

function isTableRow(line: string): boolean {
  return /^\s*\|?.+\|.+\|?\s*$/.test(line);
}

function parseMarkdownTable(lines: string[]): {
  title?: string;
  headers: string[];
  rows: string[][];
} | null {
  const firstTableLine = lines.findIndex(isTableRow);
  if (firstTableLine < 0 || !lines[firstTableLine + 1] || !isTableRow(lines[firstTableLine + 1])) {
    return null;
  }

  const splitRow = (line: string) =>
    line
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map(cell => cell.trim());

  const headers = splitRow(lines[firstTableLine]);
  const separator = splitRow(lines[firstTableLine + 1]);
  if (!headers.length || separator.length !== headers.length || !separator.every(cell => /^:?-{3,}:?$/.test(cell))) {
    return null;
  }

  const rows = lines
    .slice(firstTableLine + 2)
    .filter(isTableRow)
    .map(splitRow)
    .map(row => headers.map((_, index) => row[index] || ''));

  return {
    title: firstTableLine > 0 ? lines.slice(0, firstTableLine).join(' ').replace(/^#{1,4}\s+/, '').trim() : undefined,
    headers,
    rows,
  };
}

export const ReadableFormula: React.FC<{ formula: string }> = React.memo(({ formula }) => (
  <div className="whitespace-pre-wrap">{renderMathText(formula, true)}</div>
));
