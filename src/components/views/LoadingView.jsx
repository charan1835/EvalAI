'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function LoadingView() {
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
