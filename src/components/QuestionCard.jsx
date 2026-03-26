import { DIFF_STYLE } from '@/lib/constants';
import AnswerBox from './AnswerBox';
import ResultPanel from './ResultPanel';

export default function QuestionCard({
  question, meta,
  userAnswer, setUserAnswer,
  onSubmit, evaluating,
  result, reference,
}) {
  return (
    <div className="bg-[#0e1525] border border-white/[0.07] rounded-2xl p-7 flex flex-col gap-6 shadow-[0_6px_48px_rgba(0,0,0,0.35)] animate-fade-up">

      {/* Card Header */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[0.7rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
          Question
        </span>
        {meta && (
          <>
            <span className="text-[0.76rem] text-slate-500 font-medium">{meta.category}</span>
            <span className={`text-[0.7rem] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full ${DIFF_STYLE[meta.difficulty] ?? ''}`}>
              {meta.difficulty}
            </span>
          </>
        )}
      </div>

      {/* Question Text */}
      <p className="text-[1.05rem] font-medium leading-relaxed text-slate-100">{question}</p>

      {/* Answer Box */}
      <AnswerBox
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        onSubmit={onSubmit}
        evaluating={evaluating}
      />

      {/* NLP Result */}
      {result && (
        <ResultPanel result={result} reference={reference} />
      )}
    </div>
  );
}
