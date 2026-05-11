import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Link as LinkIcon, Tag, FileText, ChevronRight, Sparkles } from 'lucide-react';
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
  const [isAIThinking, setIsAIThinking] = useState(false);
  const { addProblem, fetchProblemMetadata, generateAIInsights } = useStore();
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

  const handleAIMode = async () => {
    if (!formData.title) {
      alert('Please enter a problem title or URL first.');
      return;
    }

    setIsAIThinking(true);
    const description = `${formData.title} (${formData.platform})`;
    const insights = await generateAIInsights(description);

    if (insights) {
      const formattedNotes = `### Approach\n${insights.approach}\n\n### Key Insight\n💡 ${insights.keyInsight}\n\n### Common Mistakes\n${insights.commonMistakes.map(m => `- ${m}`).join('\n')}\n\n### Complexity\n- **Time**: ${insights.complexity.split(',')[0] || insights.complexity}\n- **Space**: ${insights.complexity.split(',')[1] || ''}`;
      
      setFormData(prev => ({
        ...prev,
        notes: formattedNotes,
        tags: prev.tags ? `${prev.tags}, ${insights.tags.join(', ')}` : insights.tags.join(', ')
      }));
    }
    setIsAIThinking(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 pb-24 md:pb-12">
      <header className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Add New <span className="gradient-text">Challenge</span>
        </h1>
        <p className="text-slate-400 mt-4 text-lg">Every entry is a step closer to mastery.</p>
      </header>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass p-10 rounded-[3rem] space-y-10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-50" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Problem Title</label>
            <input
              required
              type="text"
              placeholder="e.g. Longest Palindromic Substring"
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white focus:bg-white/[0.05] focus:border-primary-500 outline-none transition-all text-lg placeholder:text-slate-700"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">URL</label>
            <div className="relative group">
              <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
              <input
                required
                type="url"
                placeholder="https://leetcode.com/..."
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-white focus:bg-white/[0.05] focus:border-primary-500 outline-none transition-all text-lg placeholder:text-slate-700"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                onBlur={handleUrlBlur}
              />
              {isFetching && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 text-primary-400">
                  <div className="w-5 h-5 border-2 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Difficulty</label>
            <div className="relative group">
              <select
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white focus:bg-white/[0.05] focus:border-primary-500 outline-none transition-all text-lg appearance-none cursor-pointer"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                <option value="Easy" className="bg-background-lighter">Easy</option>
                <option value="Medium" className="bg-background-lighter">Medium</option>
                <option value="Hard" className="bg-background-lighter">Hard</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-focus-within:text-primary-400">
                <ChevronRight size={20} className="rotate-90" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Platform</label>
            <input
              required
              type="text"
              placeholder="LeetCode, Codeforces, etc."
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white focus:bg-white/[0.05] focus:border-primary-500 outline-none transition-all text-lg placeholder:text-slate-700"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Tags (comma separated)</label>
          <div className="relative group">
            <Tag className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
            <input
              type="text"
              placeholder="DP, String, Sliding Window"
              className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-white focus:bg-white/[0.05] focus:border-primary-500 outline-none transition-all text-lg placeholder:text-slate-700"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">Approach & Notes</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAIMode}
                disabled={isAIThinking}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-400 hover:to-secondary-400 px-5 py-2 rounded-full transition-all shadow-xl shadow-primary-500/20 disabled:opacity-50 active:scale-95 group"
              >
                <Sparkles size={14} className={isAIThinking ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'} />
                {isAIThinking ? 'AI Thinking...' : 'Gemini AI Assistant'}
              </button>
            </div>
          </div>
          <textarea
            required
            rows={8}
            placeholder="Explain the logic, time complexity, and any tricky edge cases..."
            className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] px-8 py-8 text-white focus:bg-white/[0.05] focus:border-primary-500 outline-none transition-all resize-none text-lg leading-relaxed placeholder:text-slate-700 custom-scrollbar"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-400 disabled:bg-slate-800 text-white py-6 rounded-[2rem] font-black text-2xl transition-all shadow-2xl shadow-primary-500/30 flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          {loading ? (
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Plus size={28} />
              <span>Save Challenge</span>
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
};

export default AddProblem;
