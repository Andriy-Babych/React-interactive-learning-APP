import type { Lesson } from '../data/lessons';

export type LessonActivityStatus = {
  lessonId: string;
  challengeSolved: boolean;
  quizSolved: boolean;
  builderSolved: boolean;
  hasNotes: boolean;
};

export function isBuilderSolved(lesson: Lesson, blocks: string[]) {
  return blocks.length === lesson.builder.solution.length && blocks.every((block, index) => block === lesson.builder.solution[index]);
}

export function getLessonActivityStatus(
  lesson: Lesson,
  typedAnswer: string,
  quizAnswer: string,
  builtBlocks: string[],
  notes: string,
): LessonActivityStatus {
  return {
    lessonId: lesson.id,
    challengeSolved: typedAnswer.trim().toLowerCase() === lesson.challenge.expectedAnswer.toLowerCase(),
    quizSolved: quizAnswer === lesson.quiz.correctOption,
    builderSolved: isBuilderSolved(lesson, builtBlocks),
    hasNotes: notes.trim().length > 0,
  };
}
