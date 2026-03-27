'use client';

export default function ScoreCircle({ label, value = 0, icon }) {
  const percentage = Math.round(value);
  const stroke = 180;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colorClass = percentage >= 80 ? 'stroke-emerald-400 shadow-emerald-500/10' : 
                     percentage >= 50 ? 'stroke-indigo-400 shadow-indigo-500/10' : 
                     'stroke-rose-400 shadow-rose-500/10';

  const bgBorder = percentage >= 80 ? 'border-emerald-500/20 bg-emerald-500/5' : 
                   percentage >= 50 ? 'border-indigo-500/20 bg-indigo-500/5' : 
                   'border-rose-500/20 bg-rose-500/5';

  return (
    <div className={`dashboard-card flex flex-col items-center justify-center p-8 border-2 transition-all duration-700 ${bgBorder}`}>
      <div className="relative w-32 h-32 flex items-center justify-center group">
        <svg className="w-full h-full -rotate-90 filter drop-shadow-[0_0_8px_rgba(99,102,241,0.2)]">
          <circle
            cx="64"
            cy="64"
            r="60"
            className="stroke-slate-800/40 fill-none"
            strokeWidth="8"
          />
          <circle
            cx="64"
            cy="64"
            r="60"
            className={`fill-none circle-progress ${colorClass}`}
            strokeWidth="8"
            strokeDasharray={377}
            strokeDashoffset={377 - (percentage / 100) * 377}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <span className="text-3xl font-black text-white tracking-tighter">{percentage}<span className="text-xs text-slate-500 ml-0.5">%</span></span>
          {icon && <div className="mt-0.5 opacity-60">{icon}</div>}
        </div>
      </div>
      <p className="mt-6 text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500 text-center leading-tight">
        {label}
      </p>
    </div>
  );
}
