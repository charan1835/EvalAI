'use client';

import React from 'react';
import { Mail, Fingerprint, Loader2, Info, ArrowRight } from 'lucide-react';

export default function LoginView({ 
  step, 
  email, 
  setEmail, 
  otp, 
  setOtp, 
  authError, 
  signingIn, 
  handleRequestOTP, 
  handleVerifyOTP, 
  handleGuestLogin,
  setStep 
}) {
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

          {step === 'email' && (
            <div className="mt-6 pt-6 border-t border-white/5">
              <button
                type="button"
                onClick={handleGuestLogin}
                disabled={signingIn}
                className="w-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-slate-300 hover:text-white rounded-2xl py-3 px-5 text-[0.65rem] uppercase tracking-[0.15em] font-black transition-all outline-none focus:ring-4 focus:ring-slate-600/20"
              >
                {signingIn ? (
                  <Loader2 className="animate-spin mx-auto" size={16} />
                ) : (
                  'Continue as Guest'
                )}
              </button>
              <p className="text-center mt-3 text-slate-600 text-[0.6rem] font-medium">
                Limited access • No email required
              </p>
            </div>
          )}
        </div>

        <p className="text-center mt-12 text-slate-600 text-[0.6rem] font-black uppercase tracking-widest leading-relaxed">
          Enterprise Grade Security<br />
          <span className="opacity-50">Authorized Personnel Only</span>
        </p>
      </div>
    </div>
  );
}
