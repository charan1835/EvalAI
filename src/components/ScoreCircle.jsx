import { GRADE_COLORS, gradeColor } from '@/lib/constants';

export default function ScoreCircle({ label, value }) {
  const color = gradeColor(value);
  const radius = 30;
  const circ   = 2 * Math.PI * radius;
  const offset = circ - (value / 10) * circ;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={radius}
          fill="none"
          stroke={GRADE_COLORS[color].ring}
          strokeWidth="6"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        <text x="40" y="37" textAnchor="middle" fill="#f1f5f9" fontSize="14" fontWeight="700">{value}</text>
        <text x="40" y="51" textAnchor="middle" fill="#94a3b8" fontSize="9">/10</text>
      </svg>
      <span className="text-[0.7rem] font-semibold uppercase tracking-widest text-slate-400">{label}</span>
    </div>
  );
}
