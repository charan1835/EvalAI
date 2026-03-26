export default function AnswerBox({ userAnswer, setUserAnswer, onSubmit, evaluating }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="user-answer"
          className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-500"
        >
          Your Answer
        </label>
        <span className="text-[0.7rem] text-slate-500 tabular-nums">{userAnswer.length} chars</span>
      </div>

      <textarea
        id="user-answer"
        rows={5}
        disabled={evaluating}
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full bg-white/[0.035] border border-white/[0.07] rounded-lg text-slate-100 text-[0.93rem]
          leading-relaxed px-4 py-3 outline-none resize-y placeholder:text-slate-600
          focus:border-indigo-500 focus:bg-indigo-500/[0.04] disabled:opacity-40 transition-colors"
      />

      <button
        id="btn-submit-answer"
        onClick={onSubmit}
        disabled={evaluating || !userAnswer.trim()}
        className="self-end flex items-center gap-2 px-7 py-2.5 rounded-full
          bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-sm
          shadow-[0_4px_18px_rgba(99,102,241,0.3)]
          hover:-translate-y-0.5 hover:shadow-[0_8px_26px_rgba(99,102,241,0.45)]
          disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer
          min-w-[160px] justify-center"
      >
        {evaluating
          ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          : '🧠 Analyse Answer'}
      </button>
    </div>
  );
}
