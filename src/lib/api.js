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
