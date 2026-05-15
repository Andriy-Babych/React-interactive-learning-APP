import { Award, BadgeCheck, BookMarked, Brain, PenLine } from 'lucide-react';

type AchievementsProps = {
  completedCount: number;
  lessonCount: number;
  solvedQuizCount: number;
  solvedBuilderCount: number;
  notesCount: number;
};

export function Achievements({
  completedCount,
  lessonCount,
  solvedQuizCount,
  solvedBuilderCount,
  notesCount,
}: AchievementsProps) {
  const achievements = [
    {
      label: 'First finish',
      unlocked: completedCount > 0,
      icon: <BadgeCheck size={16} />,
    },
    {
      label: 'Quiz streak',
      unlocked: solvedQuizCount >= Math.min(3, lessonCount),
      icon: <Brain size={16} />,
    },
    {
      label: 'Builder',
      unlocked: solvedBuilderCount >= Math.min(2, lessonCount),
      icon: <Award size={16} />,
    },
    {
      label: 'Note taker',
      unlocked: notesCount >= 2,
      icon: <PenLine size={16} />,
    },
    {
      label: 'Course clear',
      unlocked: completedCount === lessonCount,
      icon: <BookMarked size={16} />,
    },
  ];

  return (
    <section className="achievements" aria-label="Achievements">
      <div className="sidebar-section-title">Achievements</div>
      <div className="achievement-list">
        {achievements.map((achievement) => (
          <div className={`achievement ${achievement.unlocked ? 'is-unlocked' : ''}`} key={achievement.label}>
            {achievement.icon}
            <span>{achievement.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
