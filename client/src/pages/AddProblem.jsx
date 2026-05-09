import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Link as LinkIcon, Tag, FileText, ChevronRight } from 'lucide-react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';

const AddProblem = () => {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    difficulty: 'Medium',
    platform: 'LeetCode',
    notes: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { addProblem, fetchProblemMetadata } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
      await addProblem({ ...formData, tags: tagsArray });
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to add problem');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlBlur = async () => {
    if (!formData.url || !formData.url.startsWith('http')) return;
    
    setIsFetching(true);
    const metadata = await fetchProblemMetadata(formData.url);
    if (metadata) {
      setFormData(prev => ({
        ...prev,
        title: metadata.title || prev.title,
        difficulty: metadata.difficulty || prev.difficulty,
        platform: metadata.platform || prev.platform,
        tags: metadata.tags ? metadata.tags.join(', ') : prev.tags
      }));
    }
    setIsFetching(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white">Add New Problem</h1>
        <p className="text-slate-400 mt-2">Every entry is a step closer to mastery.</p>
      </header>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass p-8 rounded-3xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Problem Title</label>
            <input
              required
              type="text"
              placeholder="e.g. Longest Palindromic Substring"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none transition-all"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">URL</label>
            <div className="relative">
              <LinkIcon className="absolute left-4 top-3.5 text-slate-500" size={18} />
              <input
                required
                type="url"
                placeholder="https://leetcode.com/..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:border-primary-500 outline-none transition-all"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                onBlur={handleUrlBlur}
              />
              {isFetching && (
                <div className="absolute right-4 top-3.5 flex items-center gap-2 text-primary-400 text-xs">
                  <div className="w-4 h-4 border-2 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Fetching...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Difficulty</label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none transition-all"
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            >
              <option value="Easy" className="bg-[#1e293b]">Easy</option>
              <option value="Medium" className="bg-[#1e293b]">Medium</option>
              <option value="Hard" className="bg-[#1e293b]">Hard</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Platform</label>
            <input
              required
              type="text"
              placeholder="LeetCode, Codeforces, etc."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary-500 outline-none transition-all"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Tags (comma separated)</label>
          <div className="relative">
            <Tag className="absolute left-4 top-3.5 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="DP, String, Sliding Window"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:border-primary-500 outline-none transition-all"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-400">Approach & Notes</label>
            <span className="text-[10px] uppercase tracking-wider text-primary-400 bg-primary-400/10 px-2 py-0.5 rounded">Mandatory for V1</span>
          </div>
          <textarea
            required
            rows={6}
            placeholder="Explain the logic, time complexity, and any tricky edge cases..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white focus:border-primary-500 outline-none transition-all resize-none"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-500 disabled:bg-slate-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2"
        >
          {loading ? 'Adding...' : (
            <>
              <Plus size={20} />
              Save Problem to System
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
};

export default AddProblem;
