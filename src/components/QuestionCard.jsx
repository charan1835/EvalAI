'use client';

import AnswerBox from './AnswerBox';
import ResultPanel from './ResultPanel';

export default function QuestionCard({ 
  question, meta, reference,
  userAnswer, setUserAnswer, 
  onSubmit, evaluating, result 
}) {
  return (
    <div className="flex flex-col gap-8 md:gap-10 animate-fade-up">
      {/* Question Card */}
      <div className="dashboard-card border-indigo-500/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-700" />
        
        <div className="flex items-start justify-between mb-8 gap-6">
           <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50">
                  {meta?.company || 'Interview Question'}
                </span>
                <span className="text-[0.65rem] font-bold text-indigo-400 uppercase tracking-widest px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  {meta?.difficulty || 'Medium'}
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-white leading-tight tracking-tight">
                {question}
              </h2>
           </div>
           
           <div className="w-14 h-14 bg-indigo-600/15 rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-indigo-900/40 border border-indigo-500/20 flex-shrink-0">
             ❓
           </div>
        </div>

        <AnswerBox
          value={userAnswer}
          onChange={setUserAnswer}
          onSubmit={onSubmit}
          loading={evaluating}
          disabled={evaluating}
        />
      </div>

      {/* Result Card (appears only when results are back) */}
      {result && (
        <div id="results-anchor" className="animate-fade-up">
          <ResultPanel result={result} reference={reference} />
        </div>
      )}
    </div>
  );
}
