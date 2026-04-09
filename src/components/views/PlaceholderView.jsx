'use client';

import React from 'react';

export default function PlaceholderView({ currentView, setCurrentView }) {
  return (
    <div className="animate-fade-up max-w-[1600px] mx-auto pb-24">
      <div className="dashboard-card flex flex-col items-center justify-center p-20 min-h-[400px]">
        <h2 className="text-4xl font-black text-white mb-4">{currentView}</h2>
        <p className="text-slate-500 mb-8 max-w-sm text-center">Syncing with secure server for real-time {currentView?.toLowerCase()} updates...</p>
        <button onClick={() => setCurrentView('Dashboard')} className="primary-button uppercase tracking-widest text-xs">Return to Command Center</button>
      </div>
    </div>
  );
}
