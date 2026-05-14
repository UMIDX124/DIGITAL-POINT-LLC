'use client';

type Props = {
  suggestions: string[];
  onPick: (text: string) => void;
};

export function SuggestedFollowups({ suggestions, onPick }: Props) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="cosmo-followups" role="group" aria-label="Suggested follow-ups">
      {suggestions.slice(0, 3).map((s, i) => (
        <button
          key={`${i}-${s}`}
          type="button"
          onClick={() => onPick(s)}
          className="cosmo-followups__chip"
        >
          {s}
        </button>
      ))}
    </div>
  );
}

export default SuggestedFollowups;
