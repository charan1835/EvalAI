'use client';

import { 
  LayoutDashboard, 
  Tv2, 
  History, 
  Library, 
  Trophy, 
  Settings, 
  LogOut,
  User
} from 'lucide-react';
import { useView } from '@/context/ViewContext';

export default function Sidebar() {
  const { currentView, setCurrentView } = useView();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Mock Interview', icon: <Tv2 size={20} /> },
    { name: 'Practice History', icon: <History size={20} /> },
    { name: 'Questions Bank', icon: <Library size={20} /> },
    { name: 'Leaderboard', icon: <Trophy size={20} /> },
    { name: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleMenuClick = (name) => {
    // For now, only Dashboard and Mock Interview are functional
    if (name === 'Dashboard' || name === 'Mock Interview') {
      setCurrentView(name);
    } else {
      alert(`${name} view is currently in development!`);
    }
  };

  return (
    <aside className="w-68 h-screen bg-[#0f172a] border-r border-[#1e293b] flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-600/30 border border-indigo-500/20">
          E
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">Eval<span className="text-indigo-400">AI</span></span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
        <div className="text-[0.65rem] font-black text-slate-500 uppercase tracking-[0.2em] px-5 mb-5 opacity-60">General Menu</div>
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleMenuClick(item.name)}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group border-2 ${
              currentView === item.name 
                ? 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20 shadow-lg shadow-indigo-600/5' 
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border-transparent'
            }`}
          >
            <span className={`transition-transform duration-300 ${currentView === item.name ? 'scale-110 opacity-100' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110'}`}>
               {item.icon}
            </span>
            <span className="font-bold text-[0.85rem]">{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="p-5 mt-auto">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-6 relative overflow-hidden group shadow-2xl shadow-indigo-900/30 cursor-pointer" onClick={() => setCurrentView('Mock Interview')}>
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
           <p className="text-white/60 text-[0.6rem] font-black uppercase tracking-[0.15em] mb-1">Weekly Goal</p>
           <h4 className="text-white font-black text-lg mb-3 tracking-tight">17 / 20 Done</h4>
           <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden mb-3 border border-white/5">
             <div className="h-full bg-white w-[85%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all duration-1000" />
           </div>
           <p className="text-white/80 text-[0.7rem] font-medium leading-tight">You're in the top 5% of users this week!</p>
        </div>
      </div>

      <div className="p-6 border-t border-[#1e293b] flex items-center gap-3.5 bg-slate-900/20 backdrop-blur">
        <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-black shadow-inner">
           <User size={20} />
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-[0.8rem] font-black text-white leading-tight">Charan Sai</span>
          <span className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest">Premium Elite</span>
        </div>
        <button className="p-2 text-slate-500 hover:text-rose-400 transition-colors">
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
