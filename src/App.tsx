import { useEffect, useMemo, useState } from 'react';
import { BookOpen, GraduationCap, Layers3, PlayCircle, RotateCcw } from 'lucide-react';
import { Achievements } from './components/Achievements';
import { CheckpointTracker } from './components/CheckpointTracker';
import { CodeBuilder } from './components/CodeBuilder';
import { CodePreview } from './components/CodePreview';
import { ConceptLab } from './components/ConceptLab';
import { CompletionPanel } from './components/CompletionPanel';
import { LessonChallenge } from './components/LessonChallenge';
import { LessonNavigator } from './components/LessonNavigator';
import { LessonNotes } from './components/LessonNotes';
import { LessonQuiz } from './components/LessonQuiz';
import { LessonSearch } from './components/LessonSearch';
import { ProgressMap } from './components/ProgressMap';
import { StudyStats } from './components/StudyStats';
import { lessons } from './data/lessons';
import { useLocalStorage } from './hooks/useLocalStorage';
import { getLessonActivityStatus } from './utils/lessonProgress';

type AnswersByLesson = Record<string, string>;
type QuizAnswersByLesson = Record<string, string>;
type NotesByLesson = Record<string, string>;
type BuiltBlocksByLesson = Record<string, string[]>;
type MasteredCheckpointsByLesson = Record<string, string[]>;

function App() {
  const [activeLessonId, setActiveLessonId] = useLocalStorage<string>('react-lab-active-lesson', 'state');
  const [completedLessons, setCompletedLessons] = useLocalStorage<string[]>('react-lab-completed-lessons', []);
  const [answersByLesson, setAnswersByLesson] = useLocalStorage<AnswersByLesson>('react-lab-answers', {});
  const [quizAnswersByLesson, setQuizAnswersByLesson] = useLocalStorage<QuizAnswersByLesson>('react-lab-quiz-answers', {});
  const [notesByLesson, setNotesByLesson] = useLocalStorage<NotesByLesson>('react-lab-notes', {});
  const [builtBlocksByLesson, setBuiltBlocksByLesson] = useLocalStorage<BuiltBlocksByLesson>('react-lab-built-blocks', {});
  const [masteredCheckpointsByLesson, setMasteredCheckpointsByLesson] = useLocalStorage<MasteredCheckpointsByLesson>(
    'react-lab-mastered-checkpoints',
    {},
  );
  const [lessonSearch, setLessonSearch] = useState('');
  const [count, setCount] = useState(0);

  const activeLesson = useMemo(
    () => lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0],
    [activeLessonId],
  );

  const progress = Math.round((completedLessons.length / lessons.length) * 100);
  const isActiveCompleted = completedLessons.includes(activeLesson.id);
  const activeAnswer = answersByLesson[activeLesson.id] ?? '';
  const activeQuizAnswer = quizAnswersByLesson[activeLesson.id] ?? '';
  const activeNotes = notesByLesson[activeLesson.id] ?? '';
  const activeBuiltBlocks = builtBlocksByLesson[activeLesson.id] ?? [];
  const activeMasteredCheckpoints = masteredCheckpointsByLesson[activeLesson.id] ?? [];
  const activeLessonIndex = lessons.findIndex((lesson) => lesson.id === activeLesson.id);
  const previousLesson = activeLessonIndex > 0 ? lessons[activeLessonIndex - 1] : undefined;
  const nextLesson = activeLessonIndex < lessons.length - 1 ? lessons[activeLessonIndex + 1] : undefined;

  const activityStatuses = useMemo(
    () =>
      Object.fromEntries(
        lessons.map((lesson) => [
          lesson.id,
          getLessonActivityStatus(
            lesson,
            answersByLesson[lesson.id] ?? '',
            quizAnswersByLesson[lesson.id] ?? '',
            builtBlocksByLesson[lesson.id] ?? [],
            notesByLesson[lesson.id] ?? '',
          ),
        ]),
      ),
    [answersByLesson, builtBlocksByLesson, notesByLesson, quizAnswersByLesson],
  );
  const solvedQuizCount = Object.values(activityStatuses).filter((status) => status.quizSolved).length;
  const solvedBuilderCount = Object.values(activityStatuses).filter((status) => status.builderSolved).length;
  const notesCount = Object.values(activityStatuses).filter((status) => status.hasNotes).length;
  const activeStatus = activityStatuses[activeLesson.id];
  const visibleLessons = useMemo(() => {
    const query = lessonSearch.trim().toLowerCase();

    if (!query) {
      return lessons;
    }

    return lessons.filter((lesson) =>
      [lesson.title, lesson.level, lesson.summary, lesson.goal].some((value) => value.toLowerCase().includes(query)),
    );
  }, [lessonSearch]);

  useEffect(() => {
    function handleLessonShortcut(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA';

      if (!event.altKey || isTyping) {
        return;
      }

      if (event.key === 'ArrowLeft' && previousLesson) {
        setActiveLessonId(previousLesson.id);
      }

      if (event.key === 'ArrowRight' && nextLesson) {
        setActiveLessonId(nextLesson.id);
      }
    }

    window.addEventListener('keydown', handleLessonShortcut);
    return () => window.removeEventListener('keydown', handleLessonShortcut);
  }, [nextLesson, previousLesson, setActiveLessonId]);

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

  function updateActiveQuizAnswer(option: string) {
    setQuizAnswersByLesson((currentAnswers) => ({
      ...currentAnswers,
      [activeLesson.id]: option,
    }));
  }

  function updateActiveNotes(notes: string) {
    setNotesByLesson((currentNotes) => ({
      ...currentNotes,
      [activeLesson.id]: notes,
    }));
  }

  function updateActiveBuiltBlocks(blocks: string[]) {
    setBuiltBlocksByLesson((currentBlocks) => ({
      ...currentBlocks,
      [activeLesson.id]: blocks,
    }));
  }

  function toggleActiveCheckpoint(checkpoint: string) {
    setMasteredCheckpointsByLesson((currentCheckpoints) => {
      const lessonCheckpoints = currentCheckpoints[activeLesson.id] ?? [];
      const nextLessonCheckpoints = lessonCheckpoints.includes(checkpoint)
        ? lessonCheckpoints.filter((currentCheckpoint) => currentCheckpoint !== checkpoint)
        : [...lessonCheckpoints, checkpoint];

      return {
        ...currentCheckpoints,
        [activeLesson.id]: nextLessonCheckpoints,
      };
    });
  }

  function resetActiveLesson() {
    setCompletedLessons((currentLessons) => currentLessons.filter((lessonId) => lessonId !== activeLesson.id));
    setAnswersByLesson((currentAnswers) => {
      const nextAnswers = { ...currentAnswers };
      delete nextAnswers[activeLesson.id];
      return nextAnswers;
    });
    setQuizAnswersByLesson((currentAnswers) => {
      const nextAnswers = { ...currentAnswers };
      delete nextAnswers[activeLesson.id];
      return nextAnswers;
    });
    setBuiltBlocksByLesson((currentBlocks) => {
      const nextBlocks = { ...currentBlocks };
      delete nextBlocks[activeLesson.id];
      return nextBlocks;
    });
    setMasteredCheckpointsByLesson((currentCheckpoints) => {
      const nextCheckpoints = { ...currentCheckpoints };
      delete nextCheckpoints[activeLesson.id];
      return nextCheckpoints;
    });
    setCount(0);
  }

  function resetCourse() {
    setCompletedLessons([]);
    setAnswersByLesson({});
    setQuizAnswersByLesson({});
    setNotesByLesson({});
    setBuiltBlocksByLesson({});
    setMasteredCheckpointsByLesson({});
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

        <LessonSearch value={lessonSearch} onChange={setLessonSearch} />

        <ProgressMap
          lessons={visibleLessons}
          activeLessonId={activeLesson.id}
          completedLessons={completedLessons}
          activityStatuses={activityStatuses}
          onSelectLesson={setActiveLessonId}
        />

        <StudyStats
          completedCount={completedLessons.length}
          lessonCount={lessons.length}
          solvedQuizCount={solvedQuizCount}
          notesCount={notesCount}
          solvedBuilderCount={solvedBuilderCount}
        />

        <Achievements
          completedCount={completedLessons.length}
          lessonCount={lessons.length}
          solvedQuizCount={solvedQuizCount}
          solvedBuilderCount={solvedBuilderCount}
          notesCount={notesCount}
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

        <LessonNavigator previousLesson={previousLesson} nextLesson={nextLesson} onSelectLesson={setActiveLessonId} />

        <div className="lesson-grid">
          <section className="lesson-brief">
            <div className="section-title">
              <Layers3 size={18} />
              <h2>Lesson goal</h2>
            </div>
            <p>{activeLesson.goal}</p>
            <CheckpointTracker
              checkpoints={activeLesson.checkpoints}
              masteredCheckpoints={activeMasteredCheckpoints}
              onToggleCheckpoint={toggleActiveCheckpoint}
            />
          </section>

          <ConceptLab
            count={count}
            onIncrement={() => setCount((currentCount) => currentCount + 1)}
            onReset={() => setCount(0)}
          />

          <div id="challenge">
            <LessonChallenge
              lesson={activeLesson}
              answer={activeAnswer}
              isSolved={isActiveCompleted}
              onAnswerChange={updateActiveAnswer}
              onSolved={() => undefined}
              onReset={resetActiveLesson}
            />
          </div>

          <LessonQuiz lesson={activeLesson} selectedOption={activeQuizAnswer} onSelectOption={updateActiveQuizAnswer} />

          <CodeBuilder
            lesson={activeLesson}
            assembledBlocks={activeBuiltBlocks}
            onChange={updateActiveBuiltBlocks}
            onSolved={() => undefined}
          />

          <CompletionPanel
            challengeSolved={activeStatus.challengeSolved}
            quizSolved={activeStatus.quizSolved}
            builderSolved={activeStatus.builderSolved}
            isCompleted={isActiveCompleted}
            onComplete={completeLesson}
          />

          <LessonNotes value={activeNotes} onChange={updateActiveNotes} />

          <CodePreview title={activeLesson.title} code={activeLesson.code} />
        </div>
      </section>
    </main>
  );
}

export default App;
