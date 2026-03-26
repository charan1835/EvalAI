export default function KeywordChips({ matched = [], missed = [] }) {
  return (
    <div className="flex flex-col gap-4">
      {matched.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[0.76rem] font-semibold text-slate-400">
            ✅ Keywords Matched ({matched.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {matched.map((kw) => (
              <span
                key={kw}
                className="text-[0.76rem] font-medium px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:scale-105 transition-transform"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {missed.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[0.76rem] font-semibold text-slate-400">
            ❌ Keywords Missed ({missed.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {missed.map((kw) => (
              <span
                key={kw}
                className="text-[0.76rem] font-medium px-3 py-1 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 hover:scale-105 transition-transform"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
