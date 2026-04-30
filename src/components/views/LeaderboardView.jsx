'use client';

import React from 'react';
import { DEMO_LEADERBOARD } from '@/lib/demoData';
import { Trophy, Zap, Target, TrendingUp, TrendingDown, Award } from 'lucide-react';

export default function LeaderboardView({ setCurrentView, user }) {
  const topThree = DEMO_LEADERBOARD.slice(0, 3);
  const rest = DEMO_LEADERBOARD.slice(3);

  const tierColor = (tier) => {
    if (tier === 'FAANG Elite') return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    if (tier === 'Senior Dev')  return 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20';
    if (tier === 'Mid-Level')   return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
  };

  return (
    <div className="animate-fade-up max-w-[1400px] mx-auto pb-24">

      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter mb-2">Global Leaderboard</h2>
          <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em]">Top performers ranked by composite NLP score</p>
        </div>
        <button onClick={() => setCurrentView('Dashboard')} className="glass-button text-[0.65rem] font-black uppercase tracking-widest px-8 py-3">
          Back to Command Center
        </button>
      </div>

      {/* Podium — Top 3 */}
      <div className="grid grid-cols-3 gap-6 mb-12 items-end">
        {/* 2nd */}
        <div className="dashboard-card flex flex-col items-center p-8 border-slate-700/40 bg-white/[0.02] order-1">
          <div className="text-4xl mb-3">🥈</div>
          <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center text-white font-black text-lg mb-3 border border-white/10">
            {topThree[1].avatar}
          </div>
          <h3 className="text-white font-black text-sm mb-1">{topThree[1].name}</h3>
          <p className="text-slate-500 text-[0.6rem] font-black uppercase tracking-widest mb-3">{topThree[1].college}</p>
          <div className="text-2xl font-black text-slate-300 tabular-nums">{topThree[1].score}</div>
          <div className="text-[0.6rem] text-slate-600 font-black uppercase tracking-widest mt-1">Score</div>
        </div>

        {/* 1st */}
        <div className="dashboard-card flex flex-col items-center p-8 bg-gradient-to-b from-amber-500/10 to-transparent border-amber-500/20 shadow-2xl shadow-amber-900/20 order-2 -mt-6">
          <div className="text-5xl mb-3">🏆</div>
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-black text-xl mb-3 shadow-xl shadow-amber-900/40">
            {topThree[0].avatar}
          </div>
          <h3 className="text-white font-black text-base mb-1">{topThree[0].name}</h3>
          <p className="text-slate-500 text-[0.6rem] font-black uppercase tracking-widest mb-3">{topThree[0].college}</p>
          <div className="text-3xl font-black text-amber-400 tabular-nums">{topThree[0].score}</div>
          <div className="text-[0.6rem] text-slate-600 font-black uppercase tracking-widest mt-1">Score</div>
          <div className="mt-3 px-4 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[0.6rem] font-black uppercase tracking-widest">
            {topThree[0].tier}
          </div>
        </div>

        {/* 3rd */}
        <div className="dashboard-card flex flex-col items-center p-8 border-slate-700/40 bg-white/[0.02] order-3">
          <div className="text-4xl mb-3">🥉</div>
          <div className="w-16 h-16 rounded-2xl bg-slate-700 flex items-center justify-center text-white font-black text-lg mb-3 border border-white/10">
            {topThree[2].avatar}
          </div>
          <h3 className="text-white font-black text-sm mb-1">{topThree[2].name}</h3>
          <p className="text-slate-500 text-[0.6rem] font-black uppercase tracking-widest mb-3">{topThree[2].college}</p>
          <div className="text-2xl font-black text-slate-300 tabular-nums">{topThree[2].score}</div>
          <div className="text-[0.6rem] text-slate-600 font-black uppercase tracking-widest mt-1">Score</div>
        </div>
      </div>

      {/* Ranks 4–10 */}
      <div className="dashboard-card border-white/5 bg-white/[0.01] overflow-hidden p-0">
        <div className="grid grid-cols-[48px_1fr_100px_100px_80px_110px_90px] gap-4 px-8 py-4 border-b border-white/5 text-[0.6rem] font-black uppercase tracking-widest text-slate-600">
          <span>#</span>
          <span>Candidate</span>
          <span className="text-right">Score</span>
          <span className="text-right">Sessions</span>
          <span className="text-right">Streak</span>
          <span className="text-center">Top Domain</span>
          <span className="text-right">Trend</span>
        </div>

        {rest.map((p) => (
          <div key={p.rank}
            className="grid grid-cols-[48px_1fr_100px_100px_80px_110px_90px] gap-4 px-8 py-5 border-b border-white/[0.03] hover:bg-white/[0.03] transition-all group items-center">

            {/* Rank */}
            <span className="text-slate-600 font-black text-sm tabular-nums">{p.rank}</span>

            {/* Name + college + tier */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-white font-black text-xs flex-shrink-0 group-hover:scale-110 transition-transform">
                {p.avatar}
              </div>
              <div>
                <p className="text-slate-200 font-black text-sm group-hover:text-white transition-colors">{p.name}</p>
                <p className="text-slate-600 text-[0.6rem] font-bold">{p.college}</p>
              </div>
              <span className={`hidden md:inline-flex text-[0.55rem] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg border ${tierColor(p.tier)}`}>
                {p.tier}
              </span>
            </div>

            {/* Score */}
            <div className="text-right">
              <span className="text-indigo-400 font-black text-lg tabular-nums">{p.score}</span>
            </div>

            {/* Sessions */}
            <div className="text-right text-slate-400 font-black text-sm tabular-nums flex items-center justify-end gap-1.5">
              <Target size={12} className="text-slate-600" /> {p.sessions}
            </div>

            {/* Streak */}
            <div className="text-right text-slate-400 font-black text-sm tabular-nums flex items-center justify-end gap-1.5">
              <Zap size={12} className="text-amber-500" /> {p.streak}d
            </div>

            {/* Domain */}
            <div className="text-center">
              <span className="text-[0.6rem] font-black uppercase tracking-widest text-slate-500 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                {p.domain}
              </span>
            </div>

            {/* Trend */}
            <div className={`text-right font-black text-sm flex items-center justify-end gap-1 ${p.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
              {p.trend.startsWith('+') ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {p.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Your position */}
      <div className="mt-6 dashboard-card border-indigo-500/20 bg-indigo-500/5 p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black text-sm">
            {user?.name?.slice(0, 2).toUpperCase() || 'YU'}
          </div>
          <div>
            <p className="text-white font-black text-sm">{user?.name || 'You'} <span className="text-indigo-400">(You)</span></p>
            <p className="text-slate-500 text-[0.6rem] font-bold uppercase tracking-widest">Complete more sessions to enter the rankings</p>
          </div>
        </div>
        <button onClick={() => setCurrentView('Mock Interview')} className="primary-button text-[0.65rem] px-8 py-3 uppercase tracking-widest flex items-center gap-2">
          <Award size={14} /> Start Climbing
        </button>
      </div>
    </div>
  );
}
