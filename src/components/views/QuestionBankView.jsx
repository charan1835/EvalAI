'use client';

import React from 'react';
import { 
  Search, ChevronRight, ShieldCheck 
} from 'lucide-react';

export default function QuestionBankView({ 
  allQuestions, 
  loading, 
  bankSearch, 
  setBankSearch, 
  setCurrentView 
}) {
  // Filter questions by search
  const filteredQuestions = allQuestions.filter(q => 
     (q?.question?.toLowerCase()?.includes(bankSearch.toLowerCase())) || 
     (q?.category?.toLowerCase()?.includes(bankSearch.toLowerCase()))
  );

  // Group questions by category
  const grouped = filteredQuestions.reduce((acc, q) => {
     if (!acc[q.category]) acc[q.category] = [];
     acc[q.category].push(q);
     return acc;
  }, {});

  return (
    <div className="animate-fade-up max-w-[1600px] mx-auto pb-24 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter mb-2">Internal Intelligence Bank</h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">Authorized Access to all reference architectures</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search Intelligence Log..."
              value={bankSearch}
              onChange={(e) => setBankSearch(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-white text-xs font-bold placeholder:text-slate-700 focus:border-indigo-500/50 outline-none transition-all"
            />
          </div>
          <button onClick={() => setCurrentView('Dashboard')} className="glass-button text-[0.65rem] font-black uppercase tracking-widest px-8 py-3 whitespace-nowrap">Exit Bank</button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="w-16 h-16 border-t-2 border-indigo-500 rounded-full animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[0.6rem]">Decrypting Database...</p>
        </div>
      ) : Object.keys(grouped).length > 0 ? (
        <div className="space-y-16">
          {Object.entries(grouped).map(([cat, qs]) => (
            <div key={cat} className="animate-fade-up">
              <div className="flex items-center gap-6 mb-8 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-black text-xs border border-indigo-500/20 group-hover:scale-110 transition-transform">
                  {cat.slice(0, 1)}
                </div>
                <h3 className="text-white font-black text-lg tracking-tighter uppercase">{cat}</h3>
                <div className="h-px bg-slate-800 flex-1 opacity-50" />
                <span className="text-[0.6rem] text-slate-600 font-black uppercase tracking-widest">{qs.length} Records</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {qs.map((q, idx) => (
                  <details key={idx} className="dashboard-card group bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-indigo-500/20 transition-all cursor-pointer overflow-hidden p-0">
                    <summary className="flex items-start justify-between gap-6 p-8 list-none">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <span className={`text-[0.55rem] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${
                            q.difficulty === 'Easy' ? 'text-emerald-400 border-emerald-500/10 bg-emerald-500/5' :
                            q.difficulty === 'Medium' ? 'text-amber-400 border-amber-500/10 bg-amber-500/5' :
                            'text-rose-400 border-rose-500/10 bg-rose-500/5'
                          }`}>{q.difficulty}</span>
                          <div className="w-1 h-1 rounded-full bg-slate-800" />
                          <span className="text-slate-600 text-[0.6rem] font-black uppercase tracking-widest">ARC-{cat.slice(0, 2).toUpperCase()}-{idx + 101}</span>
                        </div>
                        <h4 className="text-white font-black text-sm leading-relaxed tracking-tight group-hover:text-indigo-400 transition-colors uppercase">{q.question}</h4>
                      </div>
                      <div className="mt-8 bg-white/5 p-2 rounded-xl group-hover:bg-indigo-500/10 transition-colors">
                        <ChevronRight size={18} className="text-slate-600 group-open:rotate-90 group-hover:text-indigo-400 transition-all duration-300" />
                      </div>
                    </summary>
                    <div className="px-8 pb-8 animate-fade-up">
                      <div className="h-px bg-white/5 mb-8" />
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-indigo-400 text-[0.6rem] font-black uppercase tracking-[0.25em] flex items-center gap-2">
                          <ShieldCheck size={14} /> Expert Intelligence Core
                        </p>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(q.answer);
                          }}
                          className="text-[0.55rem] text-slate-500 font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2"
                        >
                          Copy Buffer
                        </button>
                      </div>
                      <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 text-slate-400 text-sm leading-loose font-medium italic relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500/20 rounded-l-3xl" />
                        {q.answer}
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="dashboard-card py-40 border-dashed border-slate-800 bg-transparent flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-slate-800 mb-8 border border-white/5">
            <Search size={32} />
          </div>
          <h3 className="text-2xl font-black text-slate-700 tracking-tight uppercase mb-2">Empty Search Result</h3>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[0.65rem] max-w-xs">No records matching your search criteria were found in the intelligence bank.</p>
          <button onClick={() => setBankSearch('')} className="mt-10 text-indigo-400 font-black text-[0.65rem] uppercase tracking-widest hover:underline">Clear Search Vectors</button>
        </div>
      )}
    </div>
  );
}
