import { BarChart3, FileText, Target, Trophy } from 'lucide-react';
import type { ReactNode } from 'react';

type StudyStatsProps = {
  completedCount: number;
  lessonCount: number;
  solvedQuizCount: number;
  notesCount: number;
  solvedBuilderCount: number;
};

export function StudyStats({
  completedCount,
  lessonCount,
  solvedQuizCount,
  notesCount,
  solvedBuilderCount,
}: StudyStatsProps) {
  return (
    <section className="study-stats" aria-label="Study statistics">
      <StatItem icon={<Trophy size={16} />} label="Completed" value={`${completedCount}/${lessonCount}`} />
      <StatItem icon={<Target size={16} />} label="Quizzes" value={`${solvedQuizCount}/${lessonCount}`} />
      <StatItem icon={<BarChart3 size={16} />} label="Builders" value={`${solvedBuilderCount}/${lessonCount}`} />
      <StatItem icon={<FileText size={16} />} label="Notes" value={notesCount.toString()} />
    </section>
  );
}

type StatItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function StatItem({ icon, label, value }: StatItemProps) {
  return (
    <div className="stat-item">
      <span>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}
