import { Trophy } from 'lucide-react';

export default function ScoreBox({ label, score, maxScore }) {
  return (
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3">
      <Trophy className="text-orange-500 shrink-0" size={22} />
      <div>
        <div className="text-xs text-orange-600 font-medium uppercase tracking-wide">{label}</div>
        <div className="text-2xl font-bold text-orange-700">
          {score}
          {maxScore !== undefined && <span className="text-base font-normal text-orange-400"> / {maxScore}</span>}
        </div>
      </div>
    </div>
  );
}
