import { CheckCircle2, Hammer, RotateCcw, X } from 'lucide-react';
import type { Lesson } from '../data/lessons';

type CodeBuilderProps = {
  lesson: Lesson;
  assembledBlocks: string[];
  onChange: (blocks: string[]) => void;
  onSolved: () => void;
};

export function CodeBuilder({ lesson, assembledBlocks, onChange, onSolved }: CodeBuilderProps) {
  const isSolved = arraysMatch(assembledBlocks, lesson.builder.solution);
  const hasBlocks = assembledBlocks.length > 0;
  const availableBlocks = lesson.builder.blocks.filter((block) => !assembledBlocks.includes(block));

  function addBlock(block: string) {
    onChange([...assembledBlocks, block]);
  }

  function removeBlock(blockIndex: number) {
    onChange(assembledBlocks.filter((_, index) => index !== blockIndex));
  }

  function checkSolution() {
    if (isSolved) {
      onSolved();
    }
  }

  return (
    <section className="code-builder" aria-label="Code builder">
      <header className="builder-header">
        <span className="eyebrow">
          <Hammer size={16} /> Build it
        </span>
        <button type="button" className="icon-button" onClick={() => onChange([])} aria-label="Reset code builder">
          <RotateCcw size={18} />
        </button>
      </header>

      <div className="builder-copy">
        <h2>{lesson.builder.prompt}</h2>
        <p>Click blocks in the correct order. Remove a block if you want to try again.</p>
      </div>

      <div className="builder-layout">
        <div className="block-bank" aria-label="Available code blocks">
          {availableBlocks.map((block) => (
            <button type="button" className="code-block-choice" key={block} onClick={() => addBlock(block)}>
              <code>{block}</code>
            </button>
          ))}
        </div>

        <div className="assembled-code" aria-label="Assembled code">
          {hasBlocks ? (
            assembledBlocks.map((block, index) => (
              <button type="button" className="assembled-line" key={`${block}-${index}`} onClick={() => removeBlock(index)}>
                <code>{block}</code>
                <X size={16} />
              </button>
            ))
          ) : (
            <div className="empty-builder">Your code will appear here.</div>
          )}
        </div>
      </div>

      <footer className="builder-footer">
        <button type="button" className="primary-action" onClick={checkSolution} disabled={!hasBlocks || !isSolved}>
          <CheckCircle2 size={18} /> Check order
        </button>
        <span className={`builder-result ${isSolved ? 'is-success' : ''}`}>
          {isSolved ? lesson.builder.successMessage : 'Keep arranging the blocks until the code reads correctly.'}
        </span>
      </footer>
    </section>
  );
}

function arraysMatch(left: string[], right: string[]) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}
