// Central place for API_BASE, categories, color maps, and helper fns

export const API_BASE = 'http://localhost:8000';

export const DEFAULT_CATEGORIES = [
  'All',
  'Algorithms',
  'Artificial Intelligence',
  'Cloud Computing',
  'Cybersecurity',
  'Data Structures',
  'Databases',
  'General Programming',
  'Networking',
  'Operating Systems',
  'Software Engineering',
  'System Design',
  'Web Development',
];

export const DIFF_STYLE = {
  Easy:   'text-emerald-400 bg-emerald-500/10 border border-emerald-500/25',
  Medium: 'text-amber-400  bg-amber-500/10  border border-amber-500/25',
  Hard:   'text-red-400    bg-red-500/10    border border-red-500/25',
};

export const GRADE_COLORS = {
  green:  {
    ring: '#10b981',
    text: 'text-emerald-400',
    bg:   'bg-emerald-500/10',
    border: 'border-emerald-500/25',
  },
  yellow: {
    ring: '#f59e0b',
    text: 'text-amber-400',
    bg:   'bg-amber-500/10',
    border: 'border-amber-500/25',
  },
  red: {
    ring: '#ef4444',
    text: 'text-red-400',
    bg:   'bg-red-500/10',
    border: 'border-red-500/25',
  },
};

export const gradeColor = (score) =>
  score >= 7 ? 'green' : score >= 4 ? 'yellow' : 'red';

export const feedbackHint = (score) => {
  if (score >= 7) return 'Excellent grasp of the concept!';
  if (score >= 5) return 'Good attempt — review the keywords you missed.';
  if (score >= 3) return 'Partial understanding — compare with the reference.';
  return 'Keep practising — study the reference answer carefully.';
};

export const feedbackEmoji = (score) => {
  if (score >= 7) return '🌟';
  if (score >= 5) return '📚';
  if (score >= 3) return '💡';
  return '❌';
};
