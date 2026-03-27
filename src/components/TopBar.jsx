'use client';

import { Search, Bell, Inbox, ChevronRight } from 'lucide-react';
import { useView } from '@/context/ViewContext';

export default function TopBar() {
  const { currentView } = useView();

  return (
    <header className="h-24 bg-[#080c17]/30 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-12 sticky top-0 z-40">
      <div className="flex flex-col">
        <div className="flex items-center gap-2.5 text-slate-500 text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-1">
           <span className="opacity-60">Platform</span>
           <ChevronRight size={10} className="text-slate-600" />
           <span className="text-indigo-400">{currentView}</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tighter -mt-1.5 leading-tight">
          {currentView === 'Dashboard' ? 'Performance Summary' : 'Mock Session'} <span className="text-indigo-400">{currentView === 'Dashboard' ? 'Analytics' : 'Environment'}</span>
        </h1>
      </div>

      <div className="flex items-center gap-10">
        <div className="relative group">
           <div className="w-72 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center px-5 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500/50">
             <Search size={16} className="text-slate-500 group-focus-within:text-white transition-colors" />
             <input 
              type="text" 
              placeholder="Search concepts or history..." 
              className="bg-transparent border-none outline-none text-sm text-slate-200 ml-3 w-full placeholder-slate-600 font-medium" 
             />
           </div>
        </div>

        <div className="flex items-center gap-6">
           <button className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all group overflow-hidden active:scale-95 shadow-lg shadow-black/20">
             <Bell size={20} className="group-hover:animate-shake transition-all" />
             <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#080c17] shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
           </button>
           <button className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all overflow-hidden active:scale-95 shadow-lg shadow-black/20">
             <Inbox size={20} />
           </button>
        </div>
      </div>
    </header>
  );
}
