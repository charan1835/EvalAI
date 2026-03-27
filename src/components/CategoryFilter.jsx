'use client';

export default function CategoryFilter({ categories, category, setCategory }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between px-2">
         <label className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest leading-none">Filter Domain</label>
         <span className="text-[0.6rem] text-indigo-400 font-bold bg-indigo-500/5 px-2 py-0.5 rounded border border-indigo-500/20">{categories.length} Categories</span>
      </div>
      
      {/* Container for scrolling */}
      <div className="relative w-full overflow-hidden">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap flex items-center gap-2.5 px-6 py-3 rounded-2xl transition-all duration-300 border-2 text-xs font-black group relative  ${
                category === cat
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20'
                  : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10 hover:text-slate-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-transform group-hover:scale-150 ${
                category === cat ? 'bg-white' : 'bg-slate-700'
              }`} />
              <span className="capitalize font-bold">{cat}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
