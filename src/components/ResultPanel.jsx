'use client';

import ScoreCircle from './ScoreCircle';
import CoverageBar from './CoverageBar';
import KeywordChips from './KeywordChips';
import { GRADE_COLORS, gradeColor, feedbackEmoji } from '@/lib/constants';
import { Award, Target, Beaker, Quote, AlertTriangle, Lightbulb, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

export default function ResultPanel({ result = {}, reference }) {
  const score = (result.score ?? 0) * 10; // Convert 0-10 to 0-100
  const metrics = result.metrics || {};
  const analysis = result.analysis || {};
  
  // Adjusted gradeColor for 0-100 scale
  const grade = score >= 70 ? 'green' : score >= 40 ? 'yellow' : 'red';
  const colors = GRADE_COLORS[grade];

  return (
    <div className="flex flex-col gap-10 animate-fade-up">
      
      {/* 🚩 Behavioral Flags - Re-designed as small alerts */}
      {analysis.behavioral_flags?.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {analysis.behavioral_flags.map((flag, idx) => (
            <div key={idx} className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[0.7rem] font-bold uppercase tracking-wider animate-pulse">
              <AlertTriangle size={14} />
              {flag}
            </div>
          ))}
        </div>
      )}

      {/* Global Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <ScoreCircle 
          label="Strategic Quality" 
          value={score} 
          icon={<Award className="w-4 h-4 text-indigo-400" />}
        />
        <ScoreCircle 
          label="Semantic Precision" 
          value={metrics.semantic_similarity * 10} 
          icon={<Target className="w-4 h-4 text-emerald-400" />}
        />
        <ScoreCircle 
          label="Technical Relevancy" 
          value={metrics.keyword_relevance * 10} 
          icon={<Beaker className="w-4 h-4 text-amber-400" />}
        />
      </div>

      {/* AI Assessment Main Panel */}
      <div className={`dashboard-card p-10 relative overflow-hidden group border-2 ${colors.border}`}>
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
           <Quote size={120} className="text-white" />
        </div>
        
        <div className="flex flex-col md:flex-row items-start gap-8 z-10 relative">
          <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-5xl shadow-2xl border border-white/5">
            {feedbackEmoji(score / 10)}
          </div>
          <div className="flex-1">
             <h3 className={`text-2xl font-black mb-3 tracking-tight ${colors.text}`}>Expert Assessment</h3>
             <p className="text-slate-100 text-lg leading-relaxed font-medium mb-6">{analysis.feedback}</p>
             
             {analysis.pro_tip && (
               <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-5 border border-white/5">
                 <div className="w-11 h-11 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                    <Lightbulb size={22} />
                 </div>
                 <p className="text-sm text-slate-300 italic">
                   <span className="text-indigo-400 font-bold uppercase tracking-widest text-[0.65rem] block mb-0.5">Career Tip</span>
                   {analysis.pro_tip}
                 </p>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Comparative Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
         {/* AI Solution */}
         <div className="dashboard-card p-8 bg-gradient-to-br from-indigo-500/5 to-transparent border-indigo-500/20">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles size={18} className="text-indigo-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-widest">Master Reference Answer</h4>
            </div>
            <div className="bg-slate-950/50 rounded-2xl p-6 border border-white/5 italic">
               <p className="text-slate-300 text-[0.95rem] leading-relaxed">
                 "{analysis.perfect_answer}"
               </p>
            </div>
         </div>

         {/* Conceptual Deep Dive */}
         <div className="dashboard-card p-8 bg-slate-900/30">
            <div className="flex items-center gap-3 mb-6">
              <Target size={18} className="text-emerald-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-widest">Theoretical Breakdown</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              {analysis.explanation}
            </p>
            <div className="space-y-3">
               <h5 className="text-[0.6rem] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <CheckCircle2 size={12} /> Optimization Steps
               </h5>
               {analysis.improvement_points?.map((point, idx) => (
                 <div key={idx} className="flex items-center gap-3 text-xs text-slate-300 group">
                    <ChevronRight size={14} className="text-indigo-500 group-hover:translate-x-1 transition-transform" />
                    {point}
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Technical Diagnostics */}
      <div className="dashboard-card p-10 border-dashed border-slate-800 bg-transparent">
         <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                  <Zap size={22} />
               </div>
               <div>
                  <h4 className="text-white text-lg font-bold">Technical Precision</h4>
                  <p className="text-slate-500 text-xs">Vocabulary density and conceptual mapping</p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                  <span className="text-[0.65rem] text-slate-500 block uppercase font-bold tracking-widest mb-0.5">Word Count</span>
                  <span className="text-white font-bold">{metrics.word_count} tokens</span>
               </div>
            </div>
         </div>

         <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Coverage Efficiency</span>
               <span className="text-xs font-bold text-indigo-400">{Math.round(metrics.coverage_percentage)}%</span>
            </div>
            <CoverageBar pct={metrics.coverage_percentage} />
         </div>

         <KeywordChips
           matched={analysis.matched_keywords}
           missed={analysis.missed_keywords}
         />
      </div>

    </div>
  );
}
