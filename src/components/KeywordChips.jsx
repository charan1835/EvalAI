'use client';

export default function KeywordChips({ matched = [], missed = [] }) {
  return (
    <div className="flex flex-col gap-8 w-full animate-fade-up">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h5 className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest pl-1">Matched Precision Keywords</h5>
          <span className="text-[0.65rem] font-mono text-emerald-400 font-bold bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/20">{matched.length} Matched</span>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {matched.length > 0 ? (
            matched.map((kw, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-500/5 group hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-default flex items-center gap-1.5"
              >
                <span className="text-emerald-500/60 drop-shadow">✔</span> {kw}
              </span>
            ))
          ) : (
            <span className="text-slate-600 text-[0.8rem] italic pl-1">No technical keywords were matched.</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h5 className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest pl-1">Missed Concept Keywords</h5>
          <span className="text-[0.65rem] font-mono text-rose-400 font-bold bg-rose-500/5 px-2 py-0.5 rounded border border-rose-500/20">{missed.length} Missed</span>
        </div>
        <div className="flex flex-wrap gap-2.5 opacity-80 group hover:opacity-100 transition-opacity">
          {missed.length > 0 ? (
            missed.map((kw, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full bg-rose-500/5 border border-rose-500/15 text-rose-300/70 text-xs font-medium hover:bg-rose-500/15 hover:border-rose-500/30 hover:text-rose-200 transition-all cursor-default flex items-center gap-1.5"
              >
                 <span className="text-rose-500/50">✘</span> {kw}
              </span>
            ))
          ) : (
            <span className="text-emerald-500/80 text-[0.8rem] font-bold pl-1 animate-pulse">Perfect technical coverage!</span>
          )}
        </div>
      </div>
    </div>
  );
}
