export default function CategoryFilter({ categories, category, setCategory }) {
  return (
    <section className="flex flex-col gap-3">
      <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-500">Category</p>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-[0.82rem] font-medium border transition-all duration-200 cursor-pointer
              ${category === cat
                ? 'bg-indigo-500 border-indigo-500 text-white shadow-[0_0_14px_rgba(99,102,241,0.4)]'
                : 'bg-[#0e1525] border-white/[0.07] text-slate-400 hover:border-indigo-500 hover:text-slate-100'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}
