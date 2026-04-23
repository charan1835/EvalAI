'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

/**
 * AppShell wraps the app chrome (Sidebar + TopBar).
 * It reads the session from localStorage directly so it can decide
 * whether to render the full layout or just the bare children
 * (which will be the full-screen LoginView).
 */
export default function AppShell({ children }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        const saved = localStorage.getItem('evalai_user');
        setIsAuthed(!!saved);
      } catch {
        setIsAuthed(false);
      }
    };

    check();
    setMounted(true);

    // Listen for storage events so logout/login in another tab is reflected
    window.addEventListener('storage', check);
    // Poll every 500ms to pick up login/logout triggered in same tab
    const interval = setInterval(check, 500);

    return () => {
      window.removeEventListener('storage', check);
      clearInterval(interval);
    };
  }, []);

  // Before mount, render children bare (avoids SSR mismatch)
  if (!mounted) {
    return <>{children}</>;
  }

  if (!isAuthed) {
    // Full-screen login — no sidebar/topbar
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-68 min-h-screen relative flex flex-col overflow-x-hidden">
        <TopBar />
        <div className="flex-1 px-8 py-10 no-scrollbar overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
