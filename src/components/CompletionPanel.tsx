import { CheckCircle2, CircleDashed, Flag } from 'lucide-react';

type CompletionPanelProps = {
  challengeSolved: boolean;
  quizSolved: boolean;
  builderSolved: boolean;
  isCompleted: boolean;
  onComplete: () => void;
};

export function CompletionPanel({
  challengeSolved,
  quizSolved,
  builderSolved,
  isCompleted,
  onComplete,
}: CompletionPanelProps) {
  const readyToComplete = challengeSolved && quizSolved && builderSolved;

  return (
    <section className="completion-panel" aria-label="Lesson completion">
      <span className="eyebrow">
        <Flag size={16} /> Finish line
      </span>
      <div className="completion-grid">
        <CompletionItem label="Typed challenge" completed={challengeSolved} />
        <CompletionItem label="Quick quiz" completed={quizSolved} />
        <CompletionItem label="Code builder" completed={builderSolved} />
      </div>
      <div className="completion-footer">
        <button type="button" className="primary-action" onClick={onComplete} disabled={!readyToComplete || isCompleted}>
          <CheckCircle2 size={18} /> {isCompleted ? 'Lesson completed' : 'Complete lesson'}
        </button>
        <p>
          {isCompleted
            ? 'This lesson is locked into your progress.'
            : readyToComplete
              ? 'Everything required is done. Add it to your progress.'
              : 'Solve the required activities to complete this lesson.'}
        </p>
      </div>
    </section>
  );
}

type CompletionItemProps = {
  label: string;
  completed: boolean;
};

function CompletionItem({ label, completed }: CompletionItemProps) {
  return (
    <div className={`completion-item ${completed ? 'is-complete' : ''}`}>
      {completed ? <CheckCircle2 size={18} /> : <CircleDashed size={18} />}
      <span>{label}</span>
    </div>
  );
}
