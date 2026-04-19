'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_CATEGORIES } from '@/lib/constants';
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
  const [quiz,         setQuiz]         = useState(null);

  // Fetch categories and initial history from backend
  useEffect(() => {
    fetchCategories()
      .then(cats => setCategories(['All', ...cats]))
      .catch(() => {});
    
    getHistory();
  }, []);

  async function getHistory() {
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
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
      setError('⚠️ Could not connect to the backend. Make sure FastAPI is running on port 8080.');
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

  async function getAllQuestions() {
    setLoading(true);
    try {
      const data = await fetchAllQuestions();
      setAllQuestions(data);
    } catch (err) {
      console.error("Failed to fetch all questions:", err);
    } finally {
      setLoading(false);
    }
  }

  async function startQuiz(topic) {
    setLoading(true);
    setError('');
    setQuiz(null);
    try {
      const data = await generateAIQuiz(topic);
      setQuiz(data);
    } catch (err) {
      setError('⚠️ AI Quiz generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return {
    categories, category, setCategory,
    question, meta, reference,
    userAnswer, setUserAnswer,
    result, history, loading, evaluating, error,
    getQuestion, evaluate, getHistory, getAllQuestions, allQuestions,
    startQuiz, quiz, setQuiz
  };
}
