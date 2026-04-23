'use client';

import React from 'react';
import { 
  BrainCircuit, Clock, Cpu, Zap, ArrowRight, ShieldCheck 
} from 'lucide-react';

export default function QuizView({ 
  quiz, 
  loading, 
  startQuiz, 
  quizIndex, 
  setQuizIndex, 
  quizAnswers, 
  setQuizAnswers, 
  quizSubmitted, 
  handleQuizSubmit, 
  quizScore, 
  resetQuiz, 
  quizTimer, 
  formatTime 
}) {
  if (!quiz) {
    return (
      <div className="animate-fade-up max-w-[1600px] mx-auto pb-24 px-4">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-400 mb-8 border border-indigo-500/20 shadow-2xl">
            <BrainCircuit size={48} />
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter mb-4">AI Neural Assessment</h2>
          <p className="text-slate-500 max-w-md mb-12 text-lg font-medium leading-relaxed">
            Generate a bespoke 10-question assessment using the Gemini engine. Challenge your architectural precision.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mb-12">
            {['System Design', 'React.js', 'Python', 'Cloud Architecture'].map((topic) => (
              <button 
                key={topic}
                onClick={() => startQuiz(topic)}
                disabled={loading}
                className="glass-button py-4 text-[0.65rem] font-black uppercase tracking-widest hover:border-indigo-500/40"
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="dashboard-card border-white/5 bg-white/[0.01] p-1 w-full max-w-md mb-12">
            <input 
              type="text"
              placeholder="Or enter custom topic (e.g. Kubernetes, Rust)..."
              onKeyDown={(e) => e.key === 'Enter' && startQuiz(e.target.value)}
              className="w-full bg-transparent border-none px-6 py-4 text-white text-sm font-bold placeholder:text-slate-800 outline-none"
            />
          </div>

          {loading && (
            <div className="flex flex-col items-center gap-6 animate-pulse">
              <div className="w-12 h-12 border-t-2 border-indigo-500 rounded-full animate-spin" />
              <p className="text-indigo-400 font-black uppercase tracking-[0.2em] text-[0.6rem]">Synthesizing Intelligence...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (quizSubmitted) {
    return (
      <div className="animate-fade-up max-w-[1600px] mx-auto pb-24 px-4">
        <div className="dashboard-card bg-indigo-600/10 border-indigo-500/20 p-16 text-center shadow-2xl mb-12">
          <h3 className="text-5xl font-black text-white mb-6">Simulation Complete</h3>
          <div className="text-8xl font-black text-indigo-400 mb-8 leading-none">{quizScore}/10</div>
          <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Assessment identified {quizScore >= 8 ? 'Mastery' : quizScore >= 5 ? 'Operational' : 'Critical'} cognitive alignment with {quiz.topic}.
          </p>
          <button onClick={resetQuiz} className="primary-button px-12 py-4 text-xs font-black uppercase tracking-widest">Re-Initialize Portal</button>
        </div>

        <div className="space-y-6">
          {quiz.questions.map((q, idx) => (
            <div key={idx} className={`dashboard-card p-10 border-white/5 ${quizAnswers[idx] === q.answer ? 'bg-emerald-500/5 border-emerald-500/10' : 'bg-rose-500/5 border-rose-500/10'}`}>
              <div className="flex items-center gap-4 mb-4">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${quizAnswers[idx] === q.answer ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                  {idx + 1}
                </span>
                <h4 className="text-white font-bold text-lg">{q.question}</h4>
              </div>
              <div className="pl-12 space-y-4">
                <p className="text-sm">
                  <span className="text-slate-500 font-black uppercase text-[0.6rem] tracking-widest">Your Answer:</span> 
                  <span className={`ml-3 font-bold ${quizAnswers[idx] === q.answer ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {q.options[quizAnswers[idx]] || 'UNANSWERED'}
                  </span>
                </p>
                {quizAnswers[idx] !== q.answer && (
                  <p className="text-sm">
                    <span className="text-slate-500 font-black uppercase text-[0.6rem] tracking-widest">Correct:</span>
                    <span className="ml-3 text-white font-bold">{q.options[q.answer]}</span>
                  </p>
                )}
                <div className="mt-4 p-4 rounded-xl bg-white/5 text-xs text-slate-400 leading-loose italic border border-white/5">
                  {q.explanation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[quizIndex];

  return (
    <div className="animate-fade-up max-w-[1600px] mx-auto pb-24 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div className="flex-1">
          <h2 className="text-4xl font-black text-white tracking-tighter mb-2">Neural Assessment: <span className="text-indigo-400">{quiz.topic}</span></h2>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-indigo-400" />
              <span className="text-white font-black tabular-nums text-sm">{formatTime(quizTimer)}</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div className="flex items-center gap-4 flex-1 max-w-xs">
              <span className="text-slate-500 text-[0.6rem] font-black uppercase tracking-[0.2em] whitespace-nowrap">Sync Progress</span>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-700 shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: `${((quizIndex + 1) / 10) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={resetQuiz} className="glass-button text-[0.65rem] font-black uppercase tracking-widest px-8 py-3 hover:text-rose-400">Abort Mission</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="dashboard-card p-12 bg-white/[0.02] border-white/5 shadow-2xl relative overflow-hidden mb-10 group">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
              <Cpu size={180} className="text-indigo-400" />
            </div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/5 rounded-full blur-[100px]" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="text-indigo-400 font-black text-[0.6rem] uppercase tracking-[0.4em]">Intelligence Matrix {quizIndex + 1}/10</span>
                <div className="hidden md:flex gap-1.5">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                      i === quizIndex ? 'bg-indigo-400 scale-150 shadow-[0_0_5px_rgba(129,140,248,0.8)]' : 
                      quizAnswers[i] ? 'bg-indigo-900' : 'bg-slate-800'
                    }`} />
                  ))}
                </div>
              </div>
              
              <h3 className="text-3xl font-black text-white leading-[1.2] mb-14 tracking-tight min-h-[140px]">{currentQ.question}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(currentQ.options).map(([key, value]) => (
                  <button 
                    key={key}
                    onClick={() => setQuizAnswers({ ...quizAnswers, [quizIndex]: key })}
                    className={`p-7 rounded-[2.5rem] text-left transition-all group relative border-2 ${
                      quizAnswers[quizIndex] === key 
                      ? 'bg-indigo-600/10 border-indigo-500/40 text-white shadow-xl shadow-indigo-600/5' 
                      : 'bg-white/[0.03] border-white/5 text-slate-400 hover:bg-white/[0.05] hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-300 ${
                        quizAnswers[quizIndex] === key 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : 'bg-slate-900 border border-white/5 text-slate-500 group-hover:text-slate-300'
                      }`}>
                        {key}
                      </div>
                      <span className="font-bold text-[0.95rem] leading-snug flex-1">{value}</span>
                      {quizAnswers[quizIndex] === key && (
                        <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button 
              onClick={() => setQuizIndex(prev => Math.max(0, prev - 1))}
              disabled={quizIndex === 0}
              className="glass-button px-10 py-4 text-[0.65rem] font-black uppercase tracking-widest disabled:opacity-20 transition-all active:scale-95"
            >
              Previous Node
            </button>
            
            <div className="flex items-center gap-4">
              {quizIndex < 9 ? (
                <button 
                  onClick={() => setQuizIndex(prev => prev + 1)}
                  className="primary-button pr-10 pl-12 py-4 text-[0.65rem] font-black uppercase tracking-[0.2em] group shadow-indigo-900/20"
                >
                  <span>Next Matrix</span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              ) : (
                <button 
                  onClick={handleQuizSubmit}
                  className="primary-button bg-emerald-600 hover:bg-emerald-500 border-emerald-500/50 shadow-emerald-900/40 px-12 py-4 text-[0.65rem] font-black uppercase tracking-[0.2em] animate-pulse"
                >
                  Synthesize & Submit
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="dashboard-card p-10 border-white/5 bg-slate-900/40">
            <h4 className="text-[0.65rem] font-black text-slate-500 uppercase tracking-[0.3em] mb-8 border-b border-white/5 pb-4">Simulation Metadata</h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">Latency</span>
                <span className="text-[0.6rem] text-indigo-400 font-black tracking-widest uppercase">12ms (Ideal)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">Neural Load</span>
                <span className="text-[0.6rem] text-emerald-400 font-black tracking-widest uppercase">Optimized</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold">Source Engine</span>
                <span className="text-[0.6rem] text-amber-400 font-black tracking-widest uppercase">Gemini 1.5</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card p-10 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20">
            <p className="text-[0.7rem] text-slate-400 font-medium leading-loose italic">
              &quot;Speed and precision are the hallmarks of a senior engineer. This simulation tracks your response time to calibrate your senior-level intuition.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
