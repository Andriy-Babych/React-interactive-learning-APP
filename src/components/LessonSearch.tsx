import { Search, X } from 'lucide-react';

type LessonSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function LessonSearch({ value, onChange }: LessonSearchProps) {
  return (
    <label className="lesson-search">
      <span>
        <Search size={16} /> Search lessons
      </span>
      <div className="search-field">
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="State, effects, lists..." />
        {value ? (
          <button type="button" onClick={() => onChange('')} aria-label="Clear lesson search">
            <X size={16} />
          </button>
        ) : null}
      </div>
    </label>
  );
}
