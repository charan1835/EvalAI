'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
import { fetchQuestion, submitEvaluation, fetchCategories } from '@/lib/api';

export function useEvalAI() {
  const [categories, setCategories]   = useState(DEFAULT_CATEGORIES);
  const [category,   setCategory]     = useState('All');
  const [question,   setQuestion]     = useState(null);
  const [meta,       setMeta]         = useState(null);
  const [reference,  setReference]    = useState('');
  const [userAnswer, setUserAnswer]   = useState('');
  const [result,     setResult]       = useState(null);
  const [loading,    setLoading]      = useState(false);
  const [evaluating, setEvaluating]   = useState(false);
  const [error,      setError]        = useState('');

  // Fetch categories from backend on mount (update pills if backend has more)
  useEffect(() => {
    fetchCategories()
      .then(cats => setCategories(['All', ...cats]))
      .catch(() => {}); // silently fall back to DEFAULT_CATEGORIES
  }, []);

  async function getQuestion() {
    setLoading(true);
    setError('');
    setResult(null);
    setUserAnswer('');
    setReference('');
    setQuestion(null);
    setMeta(null);
    try {
      const data = await fetchQuestion(category);
      setQuestion(data.question);
      setReference(data.answer);
      setMeta({ category: data.category, difficulty: data.difficulty });
    } catch {
      setError('⚠️ Could not connect to the backend. Make sure FastAPI is running on port 8000.');
    } finally {
      setLoading(false);
    }
  }

  async function evaluate() {
    if (!userAnswer.trim()) return;
    setEvaluating(true);
    setError('');
    try {
      const data = await submitEvaluation(reference, userAnswer);
      setResult(data);
    } catch {
      setError('⚠️ Evaluation failed. Please try again.');
    } finally {
      setEvaluating(false);
    }
  }

  return {
    // State
    categories, category, setCategory,
    question, meta, reference,
    userAnswer, setUserAnswer,
    result, loading, evaluating, error,
    // Actions
    getQuestion, evaluate,
  };
}
