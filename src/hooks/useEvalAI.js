'use client';

import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
import { DEMO_HISTORY, DEMO_QUESTIONS } from '@/lib/demoData';
import { 
  fetchQuestion, submitEvaluation, fetchCategories, saveHistory, fetchHistory, 
  fetchAllQuestions, generateAIQuiz 
} from '@/lib/api';

export function useEvalAI() {
  const [categories, setCategories]   = useState(DEFAULT_CATEGORIES);
  const [category,   setCategory]     = useState('All');
  const [question,   setQuestion]     = useState(null);
  const [meta,       setMeta]         = useState(null);
  const [reference,  setReference]    = useState('');
  const [userAnswer, setUserAnswer]   = useState('');
  const [result,     setResult]       = useState(null);
  const [history,    setHistory]      = useState([]);
  const [loading,    setLoading]      = useState(false);
  const [evaluating, setEvaluating]   = useState(false);
  const [error,      setError]        = useState('');
  const [allQuestions, setAllQuestions] = useState([]);
  const [bankLoading,  setBankLoading]  = useState(false);
  const [bankError,    setBankError]    = useState('');
  const [quiz,         setQuiz]         = useState(null);

  // Pre-fetch everything on mount so views are ready immediately
  useEffect(() => {
    fetchCategories()
      .then(cats => setCategories(['All', ...cats]))
      .catch(() => {});
    
    getHistory();
    getAllQuestions(); // pre-load question bank in background
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getHistory() {
    try {
      const data = await fetchHistory();
      // If DB is disconnected or empty, show demo data so dashboard looks populated
      setHistory(data && data.length > 0 ? data : DEMO_HISTORY);
    } catch (err) {
      console.error("Failed to fetch history — using demo data:", err);
      setHistory(DEMO_HISTORY);
    }
  }

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
      setError('⚠️ Could not connect to the backend. Make sure the API is reachable.');
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
      
      // Auto-save to history
      const historyEntry = {
        topic: meta?.category || 'General',
        question: question,
        user_answer: userAnswer,
        score: parseFloat(data.score || 0),
        status: data.score > 8 ? 'Elite' : data.score > 6 ? 'Passed' : 'Review Needed',
        icon: '📝'
      };
      
      await saveHistory(historyEntry);
      getHistory(); // Refresh local history
    } catch (err) {
      console.error("Evaluation failed:", err);
      setError('⚠️ Evaluation failed. Please try again.');
    } finally {
      setEvaluating(false);
    }
  }

  // Dedicated loading/error state for Questions Bank (isolated from shared loading)
  const getAllQuestions = useCallback(async () => {
    setBankLoading(true);
    setBankError('');
    try {
      const data = await fetchAllQuestions();
      // Fall back to demo questions if backend returns nothing
      setAllQuestions(data && data.length > 0 ? data : DEMO_QUESTIONS);
    } catch (err) {
      console.error('Failed to fetch all questions — using demo data:', err);
      setAllQuestions(DEMO_QUESTIONS);
      // Don't set bankError so the demo data renders cleanly
    } finally {
      setBankLoading(false);
    }
  }, []);

  const startQuiz = useCallback(async (topic) => {
    setLoading(true);
    setError('');
    setQuiz(null);
    try {
      const data = await generateAIQuiz(topic);
      // data is the full response: { status, topic, questions }
      if (!data || !Array.isArray(data.questions)) {
        setError('⚠️ Quiz generation returned invalid data. Please try again.');
        return;
      }
      // Store the full object so quiz.topic and quiz.questions both work
      setQuiz({ topic: data.topic, questions: data.questions });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(detail || '⚠️ AI Quiz generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categories, category, setCategory,
    question, meta, reference,
    userAnswer, setUserAnswer,
    result, history, loading, evaluating, error,
    getQuestion, evaluate, getHistory, getAllQuestions, allQuestions,
    bankLoading, bankError,
    startQuiz, quiz, setQuiz
  };
}
