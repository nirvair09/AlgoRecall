import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, ExternalLink, Brain, Check, X, AlertCircle } from 'lucide-react';
import useStore from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import MarkdownRenderer from '../components/MarkdownRenderer';

const RecallFlow = () => {
  const { dueProblems, fetchDueProblems, updateRecall, loading } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState(1); // 1: Prompt, 2: Assessment, 3: Result/Review
  const navigate = useNavigate();

  useEffect(() => {
    fetchDueProblems();
  }, []);

  const currentProblem = dueProblems[currentIndex];

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div></div>;

  if (dueProblems.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="bg-emerald-500/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="text-emerald-500" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-white">Session Complete!</h2>
        <p className="text-slate-400 mt-2 mb-8">You've reviewed all problems due for today.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold w-full"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleAssessment = (status) => {
    updateRecall(currentProblem._id, status);
    if (currentIndex < dueProblems.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setStage(1);
    } else {
      // Last problem done
      fetchDueProblems(); // This will trigger the "Session Complete" view
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4 pb-20 md:pb-8">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            <div className="p-2 bg-primary-500 rounded-xl shadow-lg shadow-primary-500/20">
              <Brain className="text-white" size={20} />
            </div>
            <span className="gradient-text">Recall</span> Session
          </h1>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            {currentIndex + 1} / {dueProblems.length}
          </span>
          <p className="text-[10px] text-slate-600 font-bold uppercase mt-1">Remaining</p>
        </div>
      </div>

      <div className="w-full bg-white/5 h-1.5 rounded-full mb-10 overflow-hidden backdrop-blur-sm">
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / dueProblems.length) * 100}%` }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stage + '-' + currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="glass p-10 rounded-[3rem] min-h-[450px] flex flex-col shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />

          {stage === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${currentProblem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    currentProblem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                  {currentProblem.difficulty}
                </span>
                <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 text-slate-500 border border-white/5">
                  {currentProblem.platform}
                </span>
              </div>

              <h2 className="text-4xl font-black text-white leading-tight tracking-tight">{currentProblem.title}</h2>

              <div className="flex flex-wrap justify-center gap-2">
                {currentProblem.tags.map(tag => (
                  <span key={tag} className="bg-white/5 px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-500 border border-white/5 uppercase tracking-tighter">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-12 w-full">
                <button
                  onClick={() => setStage(2)}
                  className="w-full bg-primary-500 hover:bg-primary-400 text-white py-5 rounded-[2rem] font-black text-xl transition-all shadow-xl shadow-primary-500/20 active:scale-95 flex items-center justify-center gap-3 group"
                >
                  <span>Ready to Recall</span>
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {stage === 2 && (
            <div className="flex-1 flex flex-col space-y-10">
              <div className="text-center">
                <p className="text-primary-400 font-black uppercase tracking-[0.2em] text-[10px] mb-4">Phase 2: Active Recall</p>
                <h2 className="text-3xl font-black text-white tracking-tight leading-tight">Visualize the approach in your mind.</h2>
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-5">
                <button
                  onClick={() => setStage(3)}
                  className="flex items-center justify-between p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-primary-500/30 hover:bg-white/[0.06] transition-all group"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-xl font-bold text-white">Reveal Notes</span>
                    <span className="text-xs text-slate-500 mt-1">Check your solution & assess</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChevronRight className="text-primary-400" size={24} />
                  </div>
                </button>

                <a
                  href={currentProblem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:border-secondary-500/30 hover:bg-white/[0.06] transition-all group"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-xl font-bold text-white">Original Problem</span>
                    <span className="text-xs text-slate-500 mt-1 text-left">Open on {currentProblem.platform}</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-secondary-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ExternalLink className="text-secondary-400" size={20} />
                  </div>
                </a>
              </div>
            </div>
          )}

          {stage === 3 && (
            <div className="flex-1 flex flex-col space-y-8">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-primary-400 font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                    <Brain size={16} />
                    Solution Notes
                  </h3>
                </div>
                <div className="bg-white/[0.02] p-8 rounded-[2rem] text-slate-300 leading-relaxed border border-white/5 max-h-[300px] overflow-y-auto custom-scrollbar prose prose-invert">
                  <MarkdownRenderer content={currentProblem.notes} />
                </div>
              </div>

              <div className="pt-6 space-y-6 mt-auto">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/5" />
                  <h4 className="text-xs font-black text-slate-600 uppercase tracking-[0.3em]">How did you do?</h4>
                  <div className="h-px flex-1 bg-white/5" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleAssessment('Fail')}
                    className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <X size={24} className="text-red-400" />
                    </div>
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Forgot</span>
                  </button>
                  <button
                    onClick={() => handleAssessment('Medium')}
                    className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <AlertCircle size={24} className="text-amber-400" />
                    </div>
                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Partial</span>
                  </button>
                  <button
                    onClick={() => handleAssessment('Easy')}
                    className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Check size={24} className="text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Mastered</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {stage > 1 && (
        <button
          onClick={() => setStage(stage - 1)}
          className="mt-6 flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm"
        >
          <ChevronLeft size={16} />
          Go Back
        </button>
      )}
    </div>
  );
};

export default RecallFlow;
