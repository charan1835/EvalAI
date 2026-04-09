'use client';

import React from 'react';

export default function HistoryView({ history, setCurrentView }) {
  return (
    <div className="animate-fade-up max-w-[1600px] mx-auto pb-24">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter mb-2">Audit Logs</h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Chronological archive of all evaluations</p>
        </div>
        <button onClick={() => setCurrentView('Dashboard')} className="glass-button text-[0.65rem] font-black uppercase tracking-widest px-8 py-3">Back to Command Center</button>
      </div>

      <div className="space-y-4">
        {history.length > 0 ? history.map((item, i) => (
          <div key={i} className="dashboard-card flex items-center justify-between p-8 border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 rounded-[2rem] bg-slate-900 border border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-indigo-400 font-black text-[0.6rem] uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{item.topic}</span>
                  <span className="text-slate-500 text-[0.6rem] font-black uppercase tracking-widest opacity-60">{item.date}</span>
                </div>
                <h5 className="text-slate-200 font-black group-hover:text-white transition-colors text-lg max-w-2xl">{item.question}</h5>
                <p className="text-slate-500 text-xs mt-2 line-clamp-1 italic font-medium opacity-60">Your Answer: "{item.user_answer}"</p>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <div className="text-right">
                <span className="text-white font-black text-2xl block leading-none">{item.score.toFixed(1)}</span>
                <span className="text-[0.6rem] text-slate-500 font-black uppercase tracking-[0.2em] mt-1 block">Semantic XP</span>
              </div>
              <div className={`w-32 py-3 rounded-2xl text-[0.65rem] font-black uppercase tracking-widest border text-center transition-all ${item.status === 'Elite' ? 'bg-indigo-500 text-white border-indigo-400' : 'bg-white/5 border-white/10 text-slate-400'
                }`}>
                {item.status}
              </div>
            </div>
          </div>
        )) : (
          <div className="dashboard-card flex flex-col items-center justify-center p-32 border-dashed border-slate-800 bg-transparent">
            <p className="text-slate-500 font-black uppercase tracking-widest mb-10">No practice history available on record</p>
            <button onClick={() => setCurrentView('Mock Interview')} className="primary-button text-[0.65rem] font-black uppercase tracking-widest px-10">Start First Simulation</button>
          </div>
        )}
      </div>
    </div>
  );
}
