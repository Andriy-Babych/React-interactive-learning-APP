import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Lesson } from '../data/lessons';

type LessonNavigatorProps = {
  previousLesson?: Lesson;
  nextLesson?: Lesson;
  onSelectLesson: (lessonId: string) => void;
};

export function LessonNavigator({ previousLesson, nextLesson, onSelectLesson }: LessonNavigatorProps) {
  return (
    <div className="lesson-navigator" aria-label="Lesson navigation">
      <button
        type="button"
        className="secondary-action"
        onClick={() => previousLesson && onSelectLesson(previousLesson.id)}
        disabled={!previousLesson}
      >
        <ArrowLeft size={18} /> Previous
      </button>
      <button
        type="button"
        className="primary-action"
        onClick={() => nextLesson && onSelectLesson(nextLesson.id)}
        disabled={!nextLesson}
      >
        Next <ArrowRight size={18} />
      </button>
    </div>
  );
}
