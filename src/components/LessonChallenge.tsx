import { CheckCircle2, Lightbulb, RotateCcw } from 'lucide-react';
import type { Lesson } from '../data/lessons';

type LessonChallengeProps = {
  lesson: Lesson;
  answer: string;
  isSolved: boolean;
  onAnswerChange: (answer: string) => void;
  onSolved: () => void;
  onReset: () => void;
};

export function LessonChallenge({
  lesson,
  answer,
  isSolved,
  onAnswerChange,
  onSolved,
  onReset,
}: LessonChallengeProps) {
  const normalizedAnswer = answer.trim().toLowerCase();
  const expectedAnswer = lesson.challenge.expectedAnswer.toLowerCase();
  const hasAnswer = normalizedAnswer.length > 0;
  const isCorrect = normalizedAnswer === expectedAnswer;

  function checkAnswer() {
    if (isCorrect) {
      onSolved();
    }
  }

  return (
    <section className="lesson-challenge" aria-label="Lesson challenge">
      <header className="challenge-header">
        <span className="eyebrow">
          <Lightbulb size={16} /> Challenge
        </span>
        <button type="button" className="icon-button" onClick={onReset} aria-label="Reset challenge">
          <RotateCcw size={18} />
        </button>
      </header>

      <div className="challenge-body">
        <h2>{lesson.challenge.prompt}</h2>
        <label className="answer-field">
          <span>Answer</span>
          <input
            value={answer}
            onChange={(event) => onAnswerChange(event.target.value)}
            placeholder={lesson.challenge.placeholder}
          />
        </label>
        <p className="challenge-hint">{lesson.challenge.hint}</p>
      </div>

      <footer className="challenge-footer">
        <button type="button" className="primary-action" onClick={checkAnswer} disabled={!hasAnswer || isSolved}>
          <CheckCircle2 size={18} /> Check answer
        </button>
        <span className={`challenge-result ${isSolved ? 'is-success' : ''}`}>
          {isSolved ? lesson.challenge.successMessage : hasAnswer && !isCorrect ? 'Not quite yet.' : 'Solve it to complete this lesson.'}
        </span>
      </footer>
    </section>
  );
}
