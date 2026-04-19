'use client';

export function useAuth() {
  // Return a mock user object for compatibility
  const user = {
    email: 'user@evalai.com',
    name: 'User',
    tier: 'Basic'
  };
  
  return { 
    user, 
    loading: false, 
    authError: null, 
    logout: () => {} 
  };
}
