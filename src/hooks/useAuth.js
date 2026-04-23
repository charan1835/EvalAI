'use client';

import { useState, useEffect, useCallback } from 'react';
import { requestOTP, verifyOTP } from '@/lib/api';

export function useAuth() {
  const [user, setUser]         = useState(null);
  const [loading, setLoading]   = useState(true);   // initial session check
  const [signingIn, setSigningIn] = useState(false); // OTP request / verify in-flight
  const [authError, setAuthError] = useState('');
  const [step, setStep]         = useState('email'); // 'email' | 'otp'
  const [email, setEmail]       = useState('');
  const [otp, setOtp]           = useState('');

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('evalai_user');
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setLoading(false);
  }, []);

  const handleRequestOTP = useCallback(async (e) => {
    e?.preventDefault();
    if (!email.trim()) { setAuthError('Please enter a valid email.'); return; }
    setSigningIn(true);
    setAuthError('');
    try {
      await requestOTP(email.trim().toLowerCase());
      setStep('otp');
    } catch (err) {
      setAuthError(err?.response?.data?.detail || 'Failed to send code. Check your email and try again.');
    } finally {
      setSigningIn(false);
    }
  }, [email]);

  const handleVerifyOTP = useCallback(async (e) => {
    e?.preventDefault();
    if (!otp.trim()) { setAuthError('Please enter the 6-digit code.'); return; }
    setSigningIn(true);
    setAuthError('');
    try {
      const data = await verifyOTP(email.trim().toLowerCase(), otp.trim());
      const userData = { ...data.user, token: data.token };
      localStorage.setItem('evalai_user', JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      setAuthError(err?.response?.data?.detail || 'Invalid or expired code. Please try again.');
    } finally {
      setSigningIn(false);
    }
  }, [email, otp]);

  const handleGuestLogin = useCallback(() => {
    const guest = { email: 'guest@evalai.com', name: 'Guest', tier: 'Free Tier', token: 'guest' };
    localStorage.setItem('evalai_user', JSON.stringify(guest));
    setUser(guest);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('evalai_user');
    setUser(null);
    setStep('email');
    setEmail('');
    setOtp('');
    setAuthError('');
  }, []);

  return {
    user, loading, signingIn, authError,
    step, setStep,
    email, setEmail,
    otp, setOtp,
    handleRequestOTP, handleVerifyOTP, handleGuestLogin,
    logout,
  };
}
