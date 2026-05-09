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
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Brain className="text-primary-400" size={24} />
          Recall Session
        </h1>
        <span className="text-sm text-slate-500">
          Problem {currentIndex + 1} of {dueProblems.length}
        </span>
      </div>

      <div className="w-full bg-white/5 h-2 rounded-full mb-12 overflow-hidden">
        <motion.div 
          className="bg-primary-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / dueProblems.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stage + '-' + currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          className="glass p-8 rounded-3xl min-h-[400px] flex flex-col"
        >
          {stage === 1 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                currentProblem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' : 
                currentProblem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'
              }`}>
                {currentProblem.difficulty}
              </span>
              <h2 className="text-3xl font-bold text-white">{currentProblem.title}</h2>
              <div className="flex flex-wrap justify-center gap-2">
                {currentProblem.tags.map(tag => (
                  <span key={tag} className="bg-white/5 px-2 py-1 rounded-md text-xs text-slate-400">#{tag}</span>
                ))}
              </div>
              
              <div className="pt-12 w-full">
                <button
                  onClick={() => setStage(2)}
                  className="w-full bg-primary-600 hover:bg-primary-500 text-white py-4 rounded-2xl font-bold text-lg transition-all"
                >
                  Recall Solution
                </button>
              </div>
            </div>
          )}

          {stage === 2 && (
            <div className="flex-1 flex flex-col space-y-8">
              <div className="text-center">
                <h3 className="text-slate-400 mb-2 font-medium uppercase tracking-wider text-sm">Active Recall</h3>
                <h2 className="text-2xl font-bold text-white">Do you remember the approach?</h2>
              </div>

              <div className="flex-1 flex flex-col justify-center space-y-4">
                <button
                  onClick={() => setStage(3)}
                  className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-500/50 hover:bg-white/10 transition-all group"
                >
                  <span className="text-lg font-medium">Show Notes & Assessment</span>
                  <ChevronRight className="text-slate-500 group-hover:text-primary-400" />
                </button>
                <a
                  href={currentProblem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-primary-500/50 hover:bg-white/10 transition-all group"
                >
                  <span className="text-lg font-medium">Open Original Problem</span>
                  <ExternalLink className="text-slate-500 group-hover:text-primary-400" size={20} />
                </a>
              </div>
            </div>
          )}

          {stage === 3 && (
            <div className="flex-1 flex flex-col space-y-6">
              <div className="space-y-4">
                <h3 className="text-primary-400 font-semibold flex items-center gap-2">
                  <Brain size={20} />
                  My Notes
                </h3>
                <div className="bg-white/5 p-6 rounded-2xl text-slate-300 leading-relaxed border border-white/5">
                  <MarkdownRenderer content={currentProblem.notes} />
                </div>
              </div>

              <div className="pt-8 space-y-4 mt-auto">
                <h4 className="text-center text-sm font-medium text-slate-500 uppercase tracking-widest">Self Assessment</h4>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleAssessment('Fail')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all text-red-400"
                  >
                    <X size={24} />
                    <span className="text-xs font-bold uppercase">Fail</span>
                  </button>
                  <button
                    onClick={() => handleAssessment('Medium')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all text-amber-400"
                  >
                    <AlertCircle size={24} />
                    <span className="text-xs font-bold uppercase">Medium</span>
                  </button>
                  <button
                    onClick={() => handleAssessment('Easy')}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all text-emerald-400"
                  >
                    <Check size={24} />
                    <span className="text-xs font-bold uppercase">Easy</span>
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
