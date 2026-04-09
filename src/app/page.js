'use client';

import { useState, useEffect } from 'react';
import { useEvalAI } from '@/hooks/useEvalAI';
import { useView } from '@/context/ViewContext';
import { useAuth } from '@/hooks/useAuth';
import CategoryFilter from '@/components/CategoryFilter';
import QuestionCard from '@/components/QuestionCard';
import {
   Sparkles, ArrowRight, Clock, Target, Award, Zap, Library, Info,
   ChevronRight, Calendar, Star, Search, Filter, BookOpen, LayoutGrid, List,
   Trophy, Settings, ShieldCheck, Cpu, Mail, Lock, Loader2, Fingerprint
} from 'lucide-react';

export default function Home() {
   const { currentView, setCurrentView } = useView();
   const { user, loading: authLoading, authError, login, verify, logout } = useAuth();
   const {
      categories, category, setCategory,
      question, meta, reference,
      userAnswer, setUserAnswer,
      result, history, loading, evaluating, error,
      getQuestion, evaluate,
   } = useEvalAI();

   // Login State
   const [email, setEmail] = useState('');
   const [otp, setOtp] = useState('');
   const [step, setStep] = useState('email'); // 'email' or 'otp'
   const [signingIn, setSigningIn] = useState(false);

   const handleRequestOTP = async (e) => {
      e.preventDefault();
      setSigningIn(true);
      const success = await login(email);
      if (success) setStep('otp');
      setSigningIn(false);
   };

   const handleVerifyOTP = async (e) => {
      e.preventDefault();
      setSigningIn(true);
      await verify(email, otp);
      setSigningIn(false);
   };

   // --- VIEW: Loading ---
   if (authLoading) {
      return (
         <div className="h-screen w-full flex flex-col items-center justify-center bg-[#020617]">
            <div className="relative">
               <div className="w-24 h-24 rounded-full border-t-2 border-indigo-500 animate-spin" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-indigo-400 animate-pulse" size={32} />
               </div>
            </div>
            <p className="mt-8 text-slate-500 font-black uppercase tracking-[0.3em] text-[0.6rem] animate-pulse">Syncing Neural Core</p>
         </div>
      );
   }

   // --- VIEW: Login ---
   if (!user) {
      return (
         <div className="h-screen w-full flex items-center justify-center bg-[#020617] relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700" />

            <div className="w-full max-w-md p-10 relative z-10 animate-fade-up">
               <div className="flex flex-col items-center mb-12">
                  <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-3xl shadow-2xl shadow-indigo-600/40 border border-indigo-400/20 mb-6">
                     E
                  </div>
                  <h1 className="text-4xl font-black text-white tracking-tighter mb-2">Eval<span className="text-indigo-400">AI</span></h1>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[0.65rem] opacity-70">Expert Intelligence Portal</p>
               </div>

               <div className="dashboard-card p-10 bg-white/[0.02] border-white/5 backdrop-blur-xl shadow-2xl">
                  <div className="mb-8">
                     <h2 className="text-2xl font-black text-white tracking-tight mb-1">
                        {step === 'email' ? 'Welcome Back' : 'Verify Identity'}
                     </h2>
                     <p className="text-slate-500 text-sm font-medium">
                        {step === 'email' ? 'Enter your credentials to access simulation.' : `We've sent a code to your secure terminal.`}
                     </p>
                  </div>

                  {authError && (
                     <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs font-bold mb-6 flex items-center gap-3 animate-shake">
                        <Info size={14} /> {authError}
                     </div>
                  )}

                  <form onSubmit={step === 'email' ? handleRequestOTP : handleVerifyOTP} className="space-y-6">
                     <div>
                        <label className="block text-[0.6rem] font-black text-slate-500 uppercase tracking-widest mb-2.5 ml-1">
                           {step === 'email' ? 'Email Address' : '6-Digit Security Code'}
                        </label>
                        <div className="relative group">
                           <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                              {step === 'email' ? <Mail size={18} /> : <Fingerprint size={18} />}
                           </div>
                           <input
                              type={step === 'email' ? "email" : "text"}
                              placeholder={step === 'email' ? "charan@evalai.com" : "••••••"}
                              value={step === 'email' ? email : otp}
                              onChange={(e) => step === 'email' ? setEmail(e.target.value) : setOtp(e.target.value)}
                              required
                              className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-5 text-white font-bold placeholder:text-slate-700 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                           />
                        </div>
                     </div>

                     <button
                        type="submit"
                        disabled={signingIn}
                        className="primary-button w-full justify-center py-4 text-xs uppercase tracking-[0.2em] font-black group"
                     >
                        {signingIn ? (
                           <Loader2 className="animate-spin" size={18} />
                        ) : (
                           <>
                              <span>{step === 'email' ? 'Request Neural Code' : 'Verify & Enter'}</span>
                              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                           </>
                        )}
                     </button>

                     {step === 'otp' && (
                        <button
                           type="button"
                           onClick={() => setStep('email')}
                           className="w-full text-center text-slate-500 hover:text-indigo-400 transition-colors text-[0.65rem] font-black uppercase tracking-widest mt-4"
                        >
                           Use Different Email
                        </button>
                     )}
                  </form>
               </div>

               <p className="text-center mt-12 text-slate-600 text-[0.6rem] font-black uppercase tracking-widest leading-relaxed">
                  Enterprise Grade Security<br />
                  <span className="opacity-50">Authorized Personnel Only</span>
               </p>
            </div>
         </div>
      );
   }

   // --- THE LOGGED-IN APPLICATION ---

   // --- VIEW: Dashboard ---
   if (currentView === 'Dashboard') {
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
               {[
                  { label: 'Total Sessions', value: history.length.toString(), icon: <Award className="text-white" />, color: 'bg-indigo-500', shadow: 'shadow-indigo-500/20' },
                  { label: 'Avg score', value: history.length > 0 ? (history.reduce((acc, h) => acc + h.score, 0) / history.length).toFixed(1) : '0.0', icon: <Target className="text-white" />, color: 'bg-emerald-500', shadow: 'shadow-emerald-500/20' },
                  { label: 'Domains', value: new Set(history.map(h => h.topic)).size.toString(), icon: <Zap className="text-white" />, color: 'bg-amber-500', shadow: 'shadow-amber-500/20' },
                  { label: 'Last Active', value: history.length > 0 ? history[0].date?.split(' ')[0] : 'Never', icon: <Clock className="text-white" />, color: 'bg-slate-500', shadow: 'shadow-slate-500/20' },
               ].map((stat) => (
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

   // --- VIEW: Practice History ---
   if (currentView === 'Practice History') {
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

   if (currentView === 'Questions Bank' || currentView === 'Leaderboard' || currentView === 'Settings') {
      return (
         <div className="animate-fade-up max-w-[1600px] mx-auto pb-24">
            <div className="dashboard-card flex flex-col items-center justify-center p-20 min-h-[400px]">
               <h2 className="text-4xl font-black text-white mb-4">{currentView}</h2>
               <p className="text-slate-500 mb-8 max-w-sm text-center">Syncing with secure server for real-time {currentView.toLowerCase()} updates...</p>
               <button onClick={() => setCurrentView('Dashboard')} className="primary-button uppercase tracking-widest text-xs">Return to Command Center</button>
            </div>
         </div>
      );
   }

   // --- VIEW: Mock Interview (The standard interactive view) ---
   return (
      <div className="flex flex-col gap-10 animate-fade-up max-w-[1600px] mx-auto pb-24">
         {/* Welcome Header for Interview */}
         <div className="flex items-center justify-between mb-4 px-2">
            <div>
               <h2 className="text-3xl font-black text-white tracking-tighter">Simulation Lab</h2>
               <p className="text-slate-500 text-[0.65rem] font-black uppercase tracking-widest">Active Operator: {user.name}</p>
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
                        <p className="italic font-medium leading-relaxed">Prioritize systemic "Trade-off" analysis in your answers.</p>
                     </li>
                     <li className="flex gap-4">
                        <span className="text-indigo-500 font-black bg-indigo-500/10 w-5 h-5 flex items-center justify-center rounded-md flex-shrink-0">2</span>
                        <p className="italic font-medium leading-relaxed">Voice recognition tracks technical vocabulary density.</p>
                     </li>
                     <li className="flex gap-4">
                        <span className="text-indigo-500 font-black bg-indigo-500/10 w-5 h-5 flex items-center justify-center rounded-md flex-shrink-0">3</span>
                        <p className="italic font-medium leading-relaxed">Stay concise. FAANG answers target the 120-word sweet spot.</p>
                     </li>
                  </ul>
               </div>
            </div>

         </div>
      </div>
   );
}
