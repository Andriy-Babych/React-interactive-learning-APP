import { Copy, TerminalSquare } from 'lucide-react';

export function CodePreview({ title, code }) {
  async function copyCode() {
    await navigator.clipboard.writeText(code);
  }

  return (
    <section className="code-preview" aria-label="Code example">
      <header className="panel-header">
        <span>
          <TerminalSquare size={18} /> Lesson code
        </span>
        <button className="icon-button" type="button" onClick={copyCode} aria-label="Copy code">
          <Copy size={18} />
        </button>
      </header>
      <div className="code-title">{title}</div>
      <pre>
        <code>{code}</code>
      </pre>
    </section>
  );
}
