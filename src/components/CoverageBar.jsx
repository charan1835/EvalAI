export default function CoverageBar({ pct }) {
  const barColor =
    pct >= 70 ? '#10b981' : pct >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="bg-[#131d30] border border-white/[0.07] rounded-xl p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-slate-300">🔑 Keyword Coverage</span>
        <span className="text-sm font-bold text-slate-100">{pct}%</span>
      </div>
      <div className="h-2 bg-white/[0.07] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: barColor,
            transition: 'width 0.9s cubic-bezier(.22,.61,.36,1)',
          }}
        />
      </div>
    </div>
  );
}
