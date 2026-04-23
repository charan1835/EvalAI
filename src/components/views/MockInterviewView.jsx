'use client';

import React from 'react';
import { 
  Library, Target, ChevronRight, Zap, Info 
} from 'lucide-react';
import CategoryFilter from '@/components/CategoryFilter';
import QuestionCard from '@/components/QuestionCard';

export default function MockInterviewView({ 
  user, 
  categories, 
  category, 
  setCategory, 
  question, 
  meta, 
  reference, 
  userAnswer, 
  setUserAnswer, 
  getQuestion, 
  evaluate, 
  evaluating, 
  result, 
  loading, 
  error 
}) {
  return (
    <div className="flex flex-col gap-10 animate-fade-up max-w-[1600px] mx-auto pb-24">
      {/* Welcome Header for Interview */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter">Simulation Lab</h2>
          <p className="text-slate-500 text-[0.65rem] font-black uppercase tracking-widest">Active Operator: {user?.name}</p>
        </div>
      </div>

      {/* Horizontal Category Pill Bar */}
      <div className="dashboard-card py-7 px-10 border-white/5 bg-white/[0.02] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
        <CategoryFilter
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
        {/* Main Content Area */}
        <div className="xl:col-span-8 flex flex-col gap-10">
          {error && (
            <div className="bg-red-500/10 border border-red-500/25 text-red-300 px-8 py-6 rounded-[2rem] text-sm leading-relaxed flex items-center gap-5 animate-shake shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-2xl shadow-inner">⚠️</div>
              <div>
                <p className="font-black uppercase tracking-widest text-xs mb-1">System Error</p>
                <span className="font-medium text-red-200/80">{error}</span>
              </div>
            </div>
          )}

          {question ? (
            <div className="animate-fade-up">
              <QuestionCard
                question={question}
                meta={meta}
                reference={reference}
                userAnswer={userAnswer}
                setUserAnswer={setUserAnswer}
                onSubmit={evaluate}
                evaluating={evaluating}
                result={result}
              />
            </div>
          ) : (
            <div className="dashboard-card flex-1 flex flex-col items-center justify-center text-center p-24 border-dashed border-slate-800 h-[600px] bg-white/[0.01]">
              <div className="w-28 h-28 bg-indigo-500/10 rounded-[2.5rem] flex items-center justify-center text-6xl mb-10 text-indigo-400 border border-indigo-500/20 animate-float shadow-2xl shadow-indigo-600/10">
                💬
              </div>
              <h3 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase tracking-[0.1em]">Ready for Simulation?</h3>
              <p className="text-slate-500 max-w-sm mb-12 text-xl leading-relaxed font-medium">
                Your target domain is currently set to <span className="text-indigo-400 font-bold">{category}</span>. Prepare for a high-intensity session.
              </p>
              <button
                onClick={getQuestion}
                disabled={loading}
                className="primary-button text-xs gap-5 px-16 py-5 uppercase tracking-[0.2em]"
              >
                {loading ? <span className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <><Library size={22} /><span>Initiate Session</span></>}
              </button>
            </div>
          )}
        </div>

        {/* Right Action Center */}
        <div className="xl:col-span-4 space-y-10 sticky top-32">
          <div className="dashboard-card bg-white/[0.03] border-white/5 p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl opacity-50" />

            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="text-xl font-black text-white tracking-tight leading-none mb-1">Session Controller</h4>
                <p className="text-[0.6rem] text-slate-500 font-black uppercase tracking-widest">NLP Control Panel</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-10">
              <p className="text-slate-500 text-[0.65rem] font-black uppercase tracking-[0.2em] pl-1 leading-none">Simulation Context</p>
              <div className="bg-slate-900/60 p-5 rounded-3xl border border-white/5 flex items-center justify-between group cursor-pointer hover:border-indigo-500/30 transition-all">
                <span className="text-white font-black text-sm capitalize">{category} Role</span>
                <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <ChevronRight size={14} className="text-indigo-400" />
                </div>
              </div>
            </div>

            <button
              id="btn-get-question"
              onClick={getQuestion}
              disabled={loading}
              className="primary-button w-full justify-center py-5 text-xs uppercase tracking-[0.2em] mb-8 font-black flex items-center gap-3 active:scale-95 transition-all shadow-indigo-600/40"
            >
              {loading
                ? <span className="w-6 h-6 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                : <><Target size={20} className="drop-shadow-lg" /> Get Next Scenario</>
              }
            </button>

            <div className="flex items-start gap-4 bg-indigo-600/5 p-5 rounded-3xl border border-indigo-500/10 group">
              <div className="bg-indigo-500/10 p-2.5 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform">
                <Info size={18} />
              </div>
              <p className="text-[0.7rem] text-slate-400 font-medium leading-relaxed">
                The semantic engine is actively mapped to <span className="text-indigo-300 font-bold">{category}</span> logic. Accuracy is elevated for this specific domain.
              </p>
            </div>
          </div>

          <div className="dashboard-card py-10 px-8 border-white/5 bg-transparent">
            <h4 className="text-[0.6rem] font-black tracking-[0.3em] mb-8 text-slate-500 uppercase px-1 border-b border-white/5 pb-4">Executive Memo</h4>
            <ul className="text-[0.75rem] text-slate-400 space-y-6">
              <li className="flex gap-4">
                <span className="text-indigo-500 font-black bg-indigo-500/10 w-5 h-5 flex items-center justify-center rounded-md flex-shrink-0">1</span>
                <p className="italic font-medium leading-relaxed">Prioritize systemic &quot;Trade-off&quot; analysis in your answers.</p>
              </li>
              <li className="flex gap-4">
                <span className="text-indigo-500 font-black bg-indigo-500/10 w-5 h-5 flex items-center justify-center rounded-md flex-shrink-0">2</span>
                <p className="italic font-medium leading-relaxed">Articulate &quot;Scalability&quot; vectors when designing components.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
