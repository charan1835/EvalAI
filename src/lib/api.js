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

export async function fetchHistory() {
  const res = await axios.get(`${API_BASE}/history`);
  return res.data.history;
}

export async function requestOTP(email) {
  const res = await axios.post(`${API_BASE}/auth/request-otp`, { email });
  return res.data;
}

export async function verifyOTP(email, otp) {
  const res = await axios.post(`${API_BASE}/auth/verify-otp`, { email, otp });
  return res.data;
}
