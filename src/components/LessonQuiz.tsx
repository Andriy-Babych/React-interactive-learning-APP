import { CircleHelp, CheckCircle2, XCircle } from 'lucide-react';
import type { Lesson } from '../data/lessons';

type LessonQuizProps = {
  lesson: Lesson;
  selectedOption: string;
  onSelectOption: (option: string) => void;
};

export function LessonQuiz({ lesson, selectedOption, onSelectOption }: LessonQuizProps) {
  const isAnswered = selectedOption.length > 0;
  const isCorrect = selectedOption === lesson.quiz.correctOption;

  return (
    <section className="lesson-quiz" aria-label="Lesson quiz">
      <span className="eyebrow">
        <CircleHelp size={16} /> Quick quiz
      </span>
      <h2>{lesson.quiz.question}</h2>

      <div className="quiz-options">
        {lesson.quiz.options.map((option) => {
          const isSelected = selectedOption === option;
          const resultClass = isAnswered && isSelected ? (isCorrect ? 'is-correct' : 'is-wrong') : '';

          return (
            <button
              type="button"
              className={`quiz-option ${isSelected ? 'is-selected' : ''} ${resultClass}`}
              key={option}
              onClick={() => onSelectOption(option)}
            >
              <span>{option}</span>
              {isSelected && isCorrect ? <CheckCircle2 size={18} /> : null}
              {isSelected && !isCorrect ? <XCircle size={18} /> : null}
            </button>
          );
        })}
      </div>

      <p className={`quiz-feedback ${isAnswered && isCorrect ? 'is-success' : ''}`}>
        {isAnswered ? lesson.quiz.explanation : 'Choose an answer to check your understanding.'}
      </p>
    </section>
  );
}
