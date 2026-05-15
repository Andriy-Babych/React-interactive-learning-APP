import { useMemo, useState } from 'react';
import { BookOpen, GraduationCap, Layers3, PlayCircle, RotateCcw } from 'lucide-react';
import { CodePreview } from './components/CodePreview';
import { ConceptLab } from './components/ConceptLab';
import { LessonChallenge } from './components/LessonChallenge';
import { ProgressMap } from './components/ProgressMap';
import { lessons } from './data/lessons';
import { useLocalStorage } from './hooks/useLocalStorage';

type AnswersByLesson = Record<string, string>;

function App() {
  const [activeLessonId, setActiveLessonId] = useLocalStorage<string>('react-lab-active-lesson', 'state');
  const [completedLessons, setCompletedLessons] = useLocalStorage<string[]>('react-lab-completed-lessons', []);
  const [answersByLesson, setAnswersByLesson] = useLocalStorage<AnswersByLesson>('react-lab-answers', {});
  const [count, setCount] = useState(0);

  const activeLesson = useMemo(
    () => lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0],
    [activeLessonId],
  );

  const progress = Math.round((completedLessons.length / lessons.length) * 100);
  const isActiveCompleted = completedLessons.includes(activeLesson.id);
  const activeAnswer = answersByLesson[activeLesson.id] ?? '';

  function completeLesson() {
    setCompletedLessons((currentLessons) =>
      currentLessons.includes(activeLesson.id) ? currentLessons : [...currentLessons, activeLesson.id],
    );
  }

  function updateActiveAnswer(answer: string) {
    setAnswersByLesson((currentAnswers) => ({
      ...currentAnswers,
      [activeLesson.id]: answer,
    }));
  }

  function resetActiveLesson() {
    setCompletedLessons((currentLessons) => currentLessons.filter((lessonId) => lessonId !== activeLesson.id));
    setAnswersByLesson((currentAnswers) => {
      const nextAnswers = { ...currentAnswers };
      delete nextAnswers[activeLesson.id];
      return nextAnswers;
    });
    setCount(0);
  }

  function resetCourse() {
    setCompletedLessons([]);
    setAnswersByLesson({});
    setCount(0);
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
          <button type="button" className="sidebar-action" onClick={resetCourse}>
            <RotateCcw size={16} /> Reset course
          </button>
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
          <a className="primary-action" href="#challenge">
            <PlayCircle size={18} /> Start exercise
          </a>
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

          <div id="challenge">
            <LessonChallenge
              lesson={activeLesson}
              answer={activeAnswer}
              isSolved={isActiveCompleted}
              onAnswerChange={updateActiveAnswer}
              onSolved={completeLesson}
              onReset={resetActiveLesson}
            />
          </div>

          <CodePreview title={activeLesson.title} code={activeLesson.code} />
        </div>
      </section>
    </main>
  );
}

export default App;
