import { Check, Clock3 } from 'lucide-react';
import type { Lesson } from '../data/lessons';
import type { LessonActivityStatus } from '../utils/lessonProgress';

type ProgressMapProps = {
  lessons: Lesson[];
  activeLessonId: string;
  completedLessons: string[];
  activityStatuses: Record<string, LessonActivityStatus>;
  onSelectLesson: (lessonId: string) => void;
};

export function ProgressMap({ lessons, activeLessonId, completedLessons, activityStatuses, onSelectLesson }: ProgressMapProps) {
  if (lessons.length === 0) {
    return <div className="empty-lessons">No lessons match your search.</div>;
  }

  return (
    <nav className="progress-map" aria-label="Learning modules">
      {lessons.map((lesson, index) => {
        const isActive = lesson.id === activeLessonId;
        const isCompleted = completedLessons.includes(lesson.id);
        const status = activityStatuses[lesson.id];
        const solvedActivityCount = [status?.challengeSolved, status?.quizSolved, status?.builderSolved].filter(Boolean).length;

        return (
          <button
            className={`module-step ${isActive ? 'is-active' : ''}`}
            type="button"
            key={lesson.id}
            onClick={() => onSelectLesson(lesson.id)}
            aria-pressed={isActive}
          >
            <span className="step-index">{isCompleted ? <Check size={16} /> : index + 1}</span>
            <span className="step-copy">
              <strong>{lesson.title}</strong>
              <small>
                <Clock3 size={14} /> {lesson.duration}
              </small>
              <span className="activity-badges" aria-label={`${solvedActivityCount} of 3 activities solved`}>
                <span className={status?.challengeSolved ? 'is-done' : ''}>Answer</span>
                <span className={status?.quizSolved ? 'is-done' : ''}>Quiz</span>
                <span className={status?.builderSolved ? 'is-done' : ''}>Build</span>
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
