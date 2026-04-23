'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Paperclip } from 'lucide-react';

export default function AnswerBox({ value, onChange, onSubmit, loading, disabled }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Keep a ref to the latest onChange to avoid stale closures in speech callbacks
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  // Initialize Speech Recognition only once on mount
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        // Append or set the transcript depending on preference. Here we append with a space.
        if (event.results[event.results.length - 1].isFinal) {
          onChangeRef.current((prev) => (prev ? prev + ' ' + transcript : transcript));
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Failed to start recognition:', err);
      }
    }
  };

  const handleAnalyzeClick = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    onSubmit();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleAnalyzeClick();
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-up">
      <div className="relative group">
        <div className="absolute top-2.5 right-4 z-10 flex gap-2.5 opacity-60 group-focus-within:opacity-100 transition-opacity items-center">
          {isListening && (
            <span className="flex items-center gap-1.5 text-[0.6rem] font-black text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20 animate-pulse">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
              RECORDING LIVE
            </span>
          )}
          <span className="text-[0.6rem] font-bold text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700 uppercase tracking-widest leading-none">⌘ + Enter to Submit</span>
        </div>
        
        <textarea
          id="textarea-answer"
          rows={7}
          className={`w-full bg-slate-900/40 border-2 rounded-3xl p-6 text-slate-200 text-base placeholder:text-slate-600 focus:outline-none transition-all resize-none shadow-inner tracking-normal font-medium leading-relaxed ${
            isListening ? 'border-rose-500/30 ring-4 ring-rose-500/5' : 'border-slate-800 focus:border-indigo-500/50 focus:bg-indigo-500/[0.02]'
          }`}
          placeholder={isListening ? "Listening to your voice..." : "Ex: Start by explaining the core concept, then provide a code snippet if relevant..."}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        
        <div className="absolute -bottom-1 -right-1 -left-1 -top-1 rounded-[1.65rem] border border-white/5 pointer-events-none group-focus-within:border-indigo-500/10 transition-colors" />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3">
          <button className="w-11 h-11 rounded-2xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all border border-slate-700 flex items-center justify-center shadow-lg active:scale-90">
            <Paperclip size={20} />
          </button>
          <button 
            type="button"
            onClick={toggleListening}
            className={`w-11 h-11 rounded-2xl transition-all border flex items-center justify-center shadow-lg active:scale-90 relative ${
              isListening 
                ? 'bg-rose-500 border-rose-400 text-white shadow-rose-900/40 animate-pulse' 
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            {isListening && (
              <span className="absolute inset-0 rounded-2xl bg-rose-500/20 animate-ping" />
            )}
          </button>
        </div>

        <button
          id="btn-evaluate"
          onClick={handleAnalyzeClick}
          disabled={loading || !value?.trim()}
          className="primary-button min-w-[200px] shadow-indigo-600/30 font-extrabold uppercase tracking-widest text-xs"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
              <span>Analyzing...</span>
            </div>
          ) : (
            <><span>🚀</span> Analyze Performance</>
          )}
        </button>
      </div>
    </div>
  );
}
