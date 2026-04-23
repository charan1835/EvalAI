import axios from 'axios';
import { API_BASE } from './constants';

export async function fetchQuestion(category) {
  const params = category !== 'All' ? { category } : {};
  const res = await axios.get(`${API_BASE}/question`, { params });
  return res.data;
}

export async function submitEvaluation(reference, userAnswer) {
  const res = await axios.post(`${API_BASE}/evaluate`, {
    reference,
    user_answer: userAnswer,
  });
  return res.data;
}

export async function fetchCategories() {
  const res = await axios.get(`${API_BASE}/categories`);
  return res.data.categories;
}

export async function saveHistory(historyEntry) {
  const res = await axios.post(`${API_BASE}/history`, historyEntry);
  return res.data;
}

export async function saveQuizHistory({ topic, score, total, questions, quizAnswers }) {
  const percentage = Math.round((score / total) * 100);
  const status = percentage >= 80 ? 'Elite' : percentage >= 60 ? 'Passed' : 'Review Needed';

  const questions_detail = questions.map((q, i) => ({
    question: q.question,
    options: q.options,
    user_answer: quizAnswers[i] ?? null,
    correct_answer: q.answer,
    is_correct: quizAnswers[i] === q.answer,
    explanation: q.explanation,
  }));

  const entry = {
    type: 'quiz',
    topic,
    score,
    total,
    percentage,
    status,
    icon: '🧠',
    questions_detail,
  };

  const res = await axios.post(`${API_BASE}/history`, entry);
  return res.data;
}

export async function fetchHistory() {
  try {
    const res = await axios.get(`${API_BASE}/history`);
    return res.data.history;
  } catch (err) {
    console.error("AXIOS_FETCH_HISTORY_ERROR:", err.message);
    throw err;
  }
}

export async function fetchAllQuestions() {
  const res = await axios.get(`${API_BASE}/questions/all`);
  return res.data.questions;
}

export async function generateAIQuiz(topic) {
  const res = await axios.get(`${API_BASE}/quiz/generate`, { params: { topic } });
  return res.data;
}

// --- Auth ---
export async function requestOTP(email) {
  const res = await axios.post(`${API_BASE}/auth/request-otp`, { email });
  return res.data;
}

export async function verifyOTP(email, otp) {
  const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
  return res.data;
}
