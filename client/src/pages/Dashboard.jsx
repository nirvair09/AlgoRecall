import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, CheckCircle, Target, Clock, ExternalLink } from 'lucide-react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { stats, fetchStats, dueProblems, fetchDueProblems } = useStore();

  useEffect(() => {
    fetchStats();
    fetchDueProblems();
  }, []);

  const statCards = [
    { label: 'Total Problems', value: stats.total, icon: Target, color: 'text-blue-400' },
    { label: 'Due Today', value: stats.dueToday, icon: Clock, color: 'text-amber-400' },
    { label: 'Mastered', value: stats.mastered, icon: CheckCircle, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Daily Dashboard</h1>
          <p className="text-slate-400 mt-1">Consistency is the key to mastery.</p>
        </div>
        
        {stats.dueToday > 0 && (
          <Link
            to="/recall"
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-primary-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Play size={20} fill="currentColor" />
            Start Review Session
          </Link>
        )}
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-6 rounded-2xl flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Due Problems List */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          🔴 Due Today 
          <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">{dueProblems.length}</span>
        </h2>
        
        {dueProblems.length === 0 ? (
          <div className="glass p-12 rounded-2xl text-center">
            <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-emerald-500" size={32} />
            </div>
            <h3 className="text-lg font-medium text-white">All caught up!</h3>
            <p className="text-slate-400 mt-1">No problems due for review today. Keep solving new ones!</p>
            <Link to="/add" className="text-primary-400 hover:underline mt-4 inline-block">Add a new problem</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {dueProblems.map((problem, index) => (
              <motion.div
                key={problem._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass p-4 rounded-xl flex items-center justify-between group hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    problem.difficulty === 'Easy' ? 'bg-emerald-500' : 
                    problem.difficulty === 'Medium' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <h3 className="font-medium text-slate-200">{problem.title}</h3>
                    <p className="text-xs text-slate-500">{problem.platform} • {problem.tags.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a 
                    href={problem.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
