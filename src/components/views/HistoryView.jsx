'use client';

import React from 'react';
import { ChevronRight, Brain, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

export default function HistoryView({ history, setCurrentView }) {
  return (
    <div className="animate-fade-up max-w-[1600px] mx-auto pb-24">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter mb-2">Audit Logs</h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Chronological archive of all evaluations</p>
        </div>
        <button onClick={() => setCurrentView('Dashboard')} className="glass-button text-[0.65rem] font-black uppercase tracking-widest px-8 py-3">
          Back to Command Center
        </button>
      </div>

      <div className="space-y-4">
        {history.length > 0 ? history.map((item, i) => (
          item.type === 'quiz'
            ? <QuizEntry key={i} item={item} />
            : <InterviewEntry key={i} item={item} />
        )) : (
          <div className="dashboard-card flex flex-col items-center justify-center p-32 border-dashed border-slate-800 bg-transparent">
            <p className="text-slate-500 font-black uppercase tracking-widest mb-10">No practice history available on record</p>
            <button onClick={() => setCurrentView('Mock Interview')} className="primary-button text-[0.65rem] font-black uppercase tracking-widest px-10">
              Start First Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Interview Entry (existing style) ─────────────────────────────────────────
function InterviewEntry({ item }) {
  return (
    <div className="dashboard-card flex items-center justify-between p-8 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
      <div className="flex items-center gap-8">
        <div className="w-16 h-16 rounded-[2rem] bg-slate-900 border border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
          {item.icon || '📝'}
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-indigo-400 font-black text-[0.6rem] uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{item.topic}</span>
            <span className="text-slate-500 text-[0.6rem] font-black uppercase tracking-widest opacity-60">{item.date}</span>
          </div>
          <h5 className="text-slate-200 font-black group-hover:text-white transition-colors text-lg max-w-2xl">{item.question}</h5>
          <p className="text-slate-500 text-xs mt-2 line-clamp-1 italic font-medium opacity-60">Your Answer: &quot;{item.user_answer}&quot;</p>
        </div>
      </div>
      <div className="flex items-center gap-12">
        <div className="text-right">
          <span className="text-white font-black text-2xl block leading-none">{Number(item.score).toFixed(1)}</span>
          <span className="text-[0.6rem] text-slate-500 font-black uppercase tracking-[0.2em] mt-1 block">Semantic XP</span>
        </div>
        <div className={`w-32 py-3 rounded-2xl text-[0.65rem] font-black uppercase tracking-widest border text-center transition-all ${
          item.status === 'Elite' ? 'bg-indigo-500 text-white border-indigo-400' : 'bg-white/5 border-white/10 text-slate-400'
        }`}>
          {item.status}
        </div>
      </div>
    </div>
  );
}

// ── Quiz Entry (expandable) ───────────────────────────────────────────────────
function QuizEntry({ item }) {
  const pct = item.percentage ?? Math.round((item.score / (item.total || 10)) * 100);
  const details = item.questions_detail || [];

  return (
    <details className="dashboard-card border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group overflow-hidden p-0">
      <summary className="flex items-center justify-between p-8 list-none cursor-pointer">
        <div className="flex items-center gap-8">
          <div className="w-16 h-16 rounded-[2rem] bg-slate-900 border border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            🧠
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="flex items-center gap-1.5 text-violet-400 font-black text-[0.6rem] uppercase tracking-widest bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                <Brain size={10} /> AI Quiz
              </span>
              <span className="text-indigo-400 font-black text-[0.6rem] uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{item.topic}</span>
              <span className="text-slate-500 text-[0.6rem] font-black uppercase tracking-widest opacity-60">{item.date}</span>
            </div>
            <h5 className="text-slate-200 font-black group-hover:text-white transition-colors text-lg">
              {item.score} / {item.total || 10} correct &mdash; {pct}%
            </h5>
            <p className="text-slate-500 text-xs mt-1 font-medium opacity-60">Click to view full question breakdown</p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-right">
            <span className="text-white font-black text-2xl block leading-none">{pct}%</span>
            <span className="text-[0.6rem] text-slate-500 font-black uppercase tracking-[0.2em] mt-1 block">Accuracy</span>
          </div>
          <div className={`w-32 py-3 rounded-2xl text-[0.65rem] font-black uppercase tracking-widest border text-center ${
            item.status === 'Elite' ? 'bg-indigo-500 text-white border-indigo-400' :
            item.status === 'Passed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
            'bg-white/5 border-white/10 text-slate-400'
          }`}>{item.status}</div>
          <ChevronRight size={18} className="text-slate-600 group-open:rotate-90 transition-transform duration-300" />
        </div>
      </summary>

      {/* Expanded Q&A breakdown */}
      {details.length > 0 && (
        <div className="px-8 pb-8 border-t border-white/5">
          <div className="space-y-4 mt-6">
            {details.map((q, idx) => (
              <div key={idx} className={`rounded-2xl p-6 border ${q.is_correct ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-rose-500/5 border-rose-500/10'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${q.is_correct ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                    {q.is_correct
                      ? <CheckCircle size={16} className="text-white" />
                      : <XCircle size={16} className="text-white" />
                    }
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-black text-sm mb-3">{q.question}</p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {q.options && Object.entries(q.options).map(([key, val]) => (
                        <div key={key} className={`px-3 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
                          key === q.correct_answer ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' :
                          key === q.user_answer && !q.is_correct ? 'border-rose-500/30 bg-rose-500/10 text-rose-300' :
                          'border-white/5 bg-white/[0.02] text-slate-500'
                        }`}>
                          <span className="font-black opacity-60">{key}.</span> {val}
                        </div>
                      ))}
                    </div>
                    {!q.is_correct && (
                      <p className="text-xs text-slate-400 mb-1">
                        <span className="text-rose-400 font-black">Your answer:</span> {q.user_answer ? `${q.user_answer}. ${q.options?.[q.user_answer] || ''}` : 'Unanswered'}
                      </p>
                    )}
                    {q.explanation && (
                      <p className="text-xs text-slate-500 italic mt-2 bg-white/5 rounded-xl px-4 py-2 border border-white/5">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </details>
  );
}
