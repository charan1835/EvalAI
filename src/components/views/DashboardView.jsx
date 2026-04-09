'use client';

import React from 'react';
import { 
  Award, Target, Zap, Clock, Sparkles, ShieldCheck, ArrowRight, Calendar, Cpu, Lock
} from 'lucide-react';

export default function DashboardView({ 
  user, 
  history, 
  setCurrentView, 
  logout 
}) {
  const stats = [
    { label: 'Total Sessions', value: history.length.toString(), icon: <Award className="text-white" />, color: 'bg-indigo-500', shadow: 'shadow-indigo-500/20' },
    { label: 'Avg score', value: history.length > 0 ? (history.reduce((acc, h) => acc + h.score, 0) / history.length).toFixed(1) : '0.0', icon: <Target className="text-white" />, color: 'bg-emerald-500', shadow: 'shadow-emerald-500/20' },
    { label: 'Domains', value: new Set(history.map(h => h.topic)).size.toString(), icon: <Zap className="text-white" />, color: 'bg-amber-500', shadow: 'shadow-amber-500/20' },
    { label: 'Last Active', value: history.length > 0 ? history[0].date?.split(' ')[0] : 'Never', icon: <Clock className="text-white" />, color: 'bg-slate-500', shadow: 'shadow-slate-500/20' },
  ];

  return (
    <div className="flex flex-col gap-10 animate-fade-up max-w-[1600px] mx-auto pb-24">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-1">Commander <span className="text-indigo-400">{user.name}</span></h1>
          <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">Neural Sync Status: 100% Optimized</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={logout} className="glass-button text-[0.65rem] font-black uppercase tracking-widest px-6 py-2.5 flex items-center gap-2 hover:text-rose-400 border-rose-500/0 hover:border-rose-500/20 transition-all">
            <Lock size={14} /> End Session
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {stats.map((stat) => (
          <div key={stat.label} className={`dashboard-card group hover:translate-y-[-6px] active:scale-[0.98] cursor-default border-white/5 bg-white/[0.02] shadow-2xl ${stat.shadow}`}>
            <div className="flex items-center justify-between mb-5">
              <div className={`w-11 h-11 rounded-2xl ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500`}>
                {stat.icon}
              </div>
              <div className="bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                <span className="text-slate-500 text-[0.6rem] font-black uppercase tracking-widest">+12%</span>
              </div>
            </div>
            <p className="text-slate-500 text-[0.65rem] font-black uppercase tracking-[0.2em] mb-1.5">{stat.label}</p>
            <h3 className="text-3xl font-black text-white tracking-tighter tabular-nums">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-10">
          <div className="dashboard-card p-12 bg-gradient-to-br from-indigo-600/10 to-transparent border-indigo-500/20 relative overflow-hidden group min-h-[340px] flex flex-col justify-center shadow-2xl shadow-indigo-900/10">
            <div className="absolute -top-10 -right-10 p-10 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
              <Sparkles size={240} className="text-indigo-400" />
            </div>
            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-2 text-indigo-400 font-black text-[0.65rem] uppercase tracking-[0.3em] mb-4">
                <ShieldCheck size={14} /> AI-Powered Performance Engine
              </div>
              <h2 className="text-5xl font-black text-white mb-6 tracking-tighter leading-[1.1]">Elevate your <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">technical</span> presence.</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">Experience the next generation of mock interviews with semantic evaluation and real-time guidance.</p>
              <button onClick={() => setCurrentView('Mock Interview')} className="primary-button group px-10 py-4 text-sm uppercase tracking-widest">
                <span>Enter Simulation</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          <div className="dashboard-card border-white/5 bg-white/[0.01]">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h4 className="text-2xl font-black text-white tracking-tigher mb-1">Recent Intelligence Logs</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Your behavior and score history</p>
              </div>
              <button onClick={() => setCurrentView('Practice History')} className="glass-button text-[0.65rem] font-black uppercase tracking-widest px-5 py-2.5">Full Audit History</button>
            </div>
            <div className="space-y-4">
              {history.length > 0 ? history.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-indigo-500/20 transition-all cursor-pointer group">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <div className="max-w-[400px]">
                      <h5 className="text-slate-100 font-black group-hover:text-indigo-400 transition-colors uppercase tracking-tight text-sm truncate">{item.topic}: {item.question}</h5>
                      <p className="text-slate-500 text-[0.65rem] font-black uppercase tracking-widest mt-1 opacity-70">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <span className="text-indigo-400 font-black text-xl block leading-none">{item.score.toFixed(1)}</span>
                      <span className="text-[0.55rem] text-slate-600 font-black uppercase tracking-[0.2em] mt-1 block">Rating</span>
                    </div>
                    <div className={`px-5 py-2 rounded-2xl text-[0.65rem] font-black uppercase tracking-widest border transition-all ${item.status === 'Elite' ? 'bg-indigo-500 shadow-xl shadow-indigo-600/20 text-white border-indigo-400' : 'bg-white/5 border-white/10 text-slate-400 group-hover:text-slate-200'
                      }`}>
                      {item.status}
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10 text-slate-600 font-black uppercase tracking-widest text-xs">No logs found. Start a simulation!</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="dashboard-card bg-slate-900/40 border-slate-800 p-8">
            <h4 className="text-lg font-black text-white mb-8 flex items-center gap-3 border-b border-white/5 pb-4"><Calendar size={18} className="text-indigo-400" />Objective Monitor</h4>
            <div className="space-y-8">
              <div className="relative pl-8 border-l-2 border-indigo-500/40 py-1">
                <span className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
                <h5 className="text-sm font-black text-slate-200 mb-1">Session: Cloud Partitioning</h5>
                <p className="text-slate-500 text-[0.65rem] font-bold uppercase tracking-widest">Recommended Intensity</p>
              </div>
              <div className="relative pl-8 border-l-2 border-slate-800 py-1">
                <h5 className="text-sm font-black text-slate-200 opacity-40">Complete 8 React Sessions</h5>
                <p className="text-slate-500 text-[0.65rem] font-bold uppercase tracking-widest opacity-40">Next Achievement Tier</p>
              </div>
            </div>
          </div>

          <div className="dashboard-card p-10 bg-gradient-to-br from-indigo-500 to-indigo-700 border-none shadow-2xl shadow-indigo-900/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12 group-hover:scale-125 transition-transform duration-1000">
              <Award size={140} className="text-white" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white mb-4 tracking-tighter leading-tight">Join Elite Membership</h3>
              <p className="text-white/70 text-sm mb-8 leading-relaxed font-medium">Unlock deep neural analysis and FAANG reference architectures for every session.</p>
              <button className="w-full py-4 rounded-2xl bg-white text-indigo-600 font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-slate-50 transition-all active:scale-95">
                Upgrade Intelligence
              </button>
            </div>
          </div>

          <div className="dashboard-card border-white/5 bg-white/[0.01] p-8">
            <h4 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><Cpu size={14} /> System Health</h4>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-400">NLP Engine v1.2</span>
              <span className="text-[0.6rem] text-emerald-400 font-black uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Database Connection</span>
              <span className="text-[0.6rem] text-indigo-400 font-black uppercase tracking-widest">MongoDB Atlas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
