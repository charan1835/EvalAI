export default function Header() {
  return (
    <header className="flex flex-col items-center text-center gap-2">
      <div className="flex items-center gap-2.5 text-5xl font-extrabold tracking-tight">
        <span style={{ filter: 'drop-shadow(0 0 14px rgba(99,102,241,0.9))' }}>⚡</span>
        <span>Eval<span className="text-indigo-400">AI</span></span>
      </div>
      <p className="text-sm text-slate-400 tracking-wide">AI-Powered NLP Interview Evaluator</p>
      <div className="flex flex-wrap justify-center gap-2 mt-1">
        {['Sentence Transformers', 'Cosine Similarity', 'Keyword NLP'].map((t) => (
          <span
            key={t}
            className="text-[0.68rem] font-semibold px-3 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 tracking-wide"
          >
            {t}
          </span>
        ))}
      </div>
    </header>
  );
}
