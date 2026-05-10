import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const useStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  problems: [],
  dueProblems: [],
  stats: { total: 0, mastered: 0, dueToday: 0 },
  loading: false,

  setUser: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, problems: [], dueProblems: [], stats: { total: 0, mastered: 0, dueToday: 0 } });
  },

  fetchProblems: async () => {
    try {
      const { token } = get();
      set({ loading: true });
      const res = await axios.get(`${API_URL}/problems`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ problems: res.data, loading: false });
    } catch (error) {
      console.error('Error fetching problems:', error);
      set({ loading: false });
    }
  },

  fetchStats: async () => {
    try {
      const { token } = get();
      const res = await axios.get(`${API_URL}/problems/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ stats: res.data });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  },

  fetchDueProblems: async () => {
    try {
      const { token } = get();
      set({ loading: true });
      const res = await axios.get(`${API_URL}/problems/due`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ dueProblems: res.data, loading: false });
    } catch (error) {
      console.error('Error fetching due problems:', error);
      set({ loading: false });
    }
  },

  addProblem: async (problemData) => {
    try {
      const { token } = get();
      await axios.post(`${API_URL}/problems`, problemData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      get().fetchStats();
    } catch (error) {
      console.error('Error adding problem:', error);
      throw error;
    }
  },

  updateRecall: async (problemId, status) => {
    try {
      const { token } = get();
      await axios.put(`${API_URL}/problems/${problemId}/recall`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      get().fetchDueProblems();
      get().fetchStats();
    } catch (error) {
      console.error('Error updating recall:', error);
    }
  },

  fetchProblemMetadata: async (url) => {
    try {
      const { token } = get();
      const res = await axios.get(`${API_URL}/problems/fetch-metadata?url=${encodeURIComponent(url)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.error('Error fetching metadata:', error);
      return null;
    }
  },

  fetchAnalytics: async () => {
    try {
      const { token } = get();
      const res = await axios.get(`${API_URL}/problems/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return null;
    }
  },

  generateAIInsights: async (description) => {
    try {
      const { token } = get();
      const res = await axios.post(`${API_URL}/problems/generate-ai-insights`, { description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      console.error('Error generating AI insights:', error);
      return null;
    }
  },
}));

export default useStore;
