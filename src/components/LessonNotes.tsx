import { NotebookPen } from 'lucide-react';

type LessonNotesProps = {
  value: string;
  onChange: (value: string) => void;
};

export function LessonNotes({ value, onChange }: LessonNotesProps) {
  return (
    <section className="lesson-notes" aria-label="Lesson notes">
      <span className="eyebrow">
        <NotebookPen size={16} /> Notes
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write one thing you want to remember from this lesson."
      />
    </section>
  );
}
