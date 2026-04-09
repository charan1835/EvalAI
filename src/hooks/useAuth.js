'use client';

import { useState, useEffect } from 'react';
import { requestOTP, verifyOTP } from '@/lib/api';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check local storage for existing session on mount
    const savedUser = localStorage.getItem('evalai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email) => {
    setAuthError(null);
    try {
      await requestOTP(email);
      return true;
    } catch (err) {
      setAuthError(err.response?.data?.detail || 'Failed to send OTP. Please try again.');
      return false;
    }
  };

  const verify = async (email, otp) => {
    setAuthError(null);
    try {
      const data = await verifyOTP(email, otp);
      if (data.status === 'success') {
        const userData = { ...data.user, token: data.token };
        setUser(userData);
        localStorage.setItem('evalai_user', JSON.stringify(userData));
        return true;
      }
    } catch (err) {
      setAuthError(err.response?.data?.detail || 'Invalid OTP. Please check and try again.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('evalai_user');
  };

  return { user, loading, authError, login, verify, logout, setAuthError };
}
