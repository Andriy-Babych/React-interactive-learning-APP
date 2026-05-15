import { RotateCcw, Sparkles } from 'lucide-react';

type ConceptLabProps = {
  count: number;
  onIncrement: () => void;
  onReset: () => void;
  completed: boolean;
  onComplete: () => void;
};

export function ConceptLab({ count, onIncrement, onReset, completed, onComplete }: ConceptLabProps) {
  const message =
    count === 0
      ? 'Click the button and React will update the UI from state.'
      : `State is now ${count}. The UI changed without manual DOM work.`;

  return (
    <section className="concept-lab" aria-label="Interactive exercise">
      <div className="lab-copy">
        <span className="eyebrow">
          <Sparkles size={16} /> Live exercise
        </span>
        <h2>Feel how useState works</h2>
        <p>{message}</p>
      </div>

      <div className="counter-surface">
        <div className="counter-value">{count}</div>
        <div className="counter-actions">
          <button type="button" className="primary-action" onClick={onIncrement}>
            Change state
          </button>
          <button type="button" className="icon-button" onClick={onReset} aria-label="Reset counter">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <button type="button" className="complete-action" onClick={onComplete}>
        {completed ? 'Lesson completed' : 'Mark lesson complete'}
      </button>
    </section>
  );
}
