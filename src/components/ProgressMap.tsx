import { Check, Clock3 } from 'lucide-react';
import type { Lesson } from '../data/lessons';

type ProgressMapProps = {
  lessons: Lesson[];
  activeLessonId: string;
  completedLessons: string[];
  onSelectLesson: (lessonId: string) => void;
};

export function ProgressMap({ lessons, activeLessonId, completedLessons, onSelectLesson }: ProgressMapProps) {
  return (
    <nav className="progress-map" aria-label="Learning modules">
      {lessons.map((lesson, index) => {
        const isActive = lesson.id === activeLessonId;
        const isCompleted = completedLessons.includes(lesson.id);

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
            </span>
          </button>
        );
      })}
    </nav>
  );
}
