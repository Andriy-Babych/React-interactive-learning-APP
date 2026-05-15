import { useMemo, useState } from 'react';
import { BookOpen, GraduationCap, Layers3, PlayCircle } from 'lucide-react';
import { CodePreview } from './components/CodePreview.jsx';
import { ConceptLab } from './components/ConceptLab.jsx';
import { ProgressMap } from './components/ProgressMap.jsx';
import { lessons } from './data/lessons.js';

function App() {
  const [activeLessonId, setActiveLessonId] = useState('state');
  const [completedLessons, setCompletedLessons] = useState(['jsx']);
  const [count, setCount] = useState(0);

  const activeLesson = useMemo(
    () => lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0],
    [activeLessonId],
  );

  const progress = Math.round((completedLessons.length / lessons.length) * 100);
  const isActiveCompleted = completedLessons.includes(activeLesson.id);

  function completeLesson() {
    setCompletedLessons((currentLessons) =>
      currentLessons.includes(activeLesson.id) ? currentLessons : [...currentLessons, activeLesson.id],
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-mark" aria-label="React Interactive Learning">
          <GraduationCap size={24} />
          <span>React Lab</span>
        </div>

        <div className="progress-summary">
          <span>Course progress</span>
          <strong>{progress}%</strong>
          <div className="progress-track" aria-hidden="true">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>

        <ProgressMap
          lessons={lessons}
          activeLessonId={activeLesson.id}
          completedLessons={completedLessons}
          onSelectLesson={setActiveLessonId}
        />
      </aside>

      <section className="workspace">
        <header className="workspace-header">
          <div>
            <span className="eyebrow">
              <BookOpen size={16} /> {activeLesson.level}
            </span>
            <h1>{activeLesson.title}</h1>
            <p>{activeLesson.summary}</p>
          </div>
          <button type="button" className="primary-action">
            <PlayCircle size={18} /> Start exercise
          </button>
        </header>

        <div className="lesson-grid">
          <section className="lesson-brief">
            <div className="section-title">
              <Layers3 size={18} />
              <h2>Lesson goal</h2>
            </div>
            <p>{activeLesson.goal}</p>
            <ul className="checkpoint-list">
              {activeLesson.checkpoints.map((checkpoint) => (
                <li key={checkpoint}>{checkpoint}</li>
              ))}
            </ul>
          </section>

          <ConceptLab
            count={count}
            onIncrement={() => setCount((currentCount) => currentCount + 1)}
            onReset={() => setCount(0)}
            completed={isActiveCompleted}
            onComplete={completeLesson}
          />

          <CodePreview title={activeLesson.title} code={activeLesson.code} />
        </div>
      </section>
    </main>
  );
}

export default App;
