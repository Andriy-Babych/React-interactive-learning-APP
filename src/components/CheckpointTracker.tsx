import { CheckSquare, Square } from 'lucide-react';

type CheckpointTrackerProps = {
  checkpoints: string[];
  masteredCheckpoints: string[];
  onToggleCheckpoint: (checkpoint: string) => void;
};

export function CheckpointTracker({ checkpoints, masteredCheckpoints, onToggleCheckpoint }: CheckpointTrackerProps) {
  return (
    <div className="checkpoint-tracker" aria-label="Checkpoint tracker">
      {checkpoints.map((checkpoint) => {
        const isMastered = masteredCheckpoints.includes(checkpoint);

        return (
          <button
            type="button"
            className={`checkpoint-item ${isMastered ? 'is-mastered' : ''}`}
            key={checkpoint}
            onClick={() => onToggleCheckpoint(checkpoint)}
            aria-pressed={isMastered}
          >
            {isMastered ? <CheckSquare size={18} /> : <Square size={18} />}
            <span>{checkpoint}</span>
          </button>
        );
      })}
    </div>
  );
}
