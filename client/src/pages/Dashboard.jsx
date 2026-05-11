import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, CheckCircle, Target, Clock, ExternalLink } from 'lucide-react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { stats, fetchStats, dueProblems, fetchDueProblems, problems, fetchProblems } = useStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterDifficulty, setFilterDifficulty] = React.useState('All');

  useEffect(() => {
    fetchStats();
    fetchDueProblems();
    fetchProblems();
  }, []);

  const filteredProblems = problems.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDifficulty = filterDifficulty === 'All' || p.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const statCards = [
    { label: 'Total Problems', value: stats.total, icon: Target, color: 'text-blue-400' },
    { label: 'Due Today', value: stats.dueToday, icon: Clock, color: 'text-amber-400' },
    { label: 'Mastered', value: stats.mastered, icon: CheckCircle, color: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <header className="flex flex-col gap-6 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Hi, <span className="gradient-text">Student</span>
          </h1>
          <p className="text-slate-400 mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Consistency is the key to mastery.
          </p>
        </div>
        
        {stats.dueToday > 0 && (
          <Link
            to="/recall"
            className="flex items-center justify-center gap-3 bg-primary-500 hover:bg-primary-400 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-primary-500/20 transition-all hover:scale-[1.02] active:scale-95 group"
          >
            <Play size={20} fill="currentColor" className="group-hover:translate-x-1 transition-transform" />
            Start Daily Session
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
                className="glass p-5 rounded-2xl flex items-center justify-between group hover:border-primary-500/30 transition-all card-hover"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-3 h-3 rounded-full shadow-[0_0_12px_rgba(0,0,0,0.5)] ${
                    problem.difficulty === 'Easy' ? 'bg-emerald-400 shadow-emerald-400/20' : 
                    problem.difficulty === 'Medium' ? 'bg-amber-400 shadow-amber-400/20' : 'bg-red-400 shadow-red-400/20'
                  }`} />
                  <div>
                    <h3 className="font-semibold text-slate-100 group-hover:text-primary-300 transition-colors">{problem.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                        {problem.platform}
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {problem.tags.join(' • ')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a 
                    href={problem.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Global Search & All Problems */}
      <section className="space-y-6 pt-12 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">All Problems</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search titles or tags..."
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:border-primary-500 outline-none w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none"
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
            >
              <option value="All" className="bg-[#1e293b]">All Difficulties</option>
              <option value="Easy" className="bg-[#1e293b]">Easy</option>
              <option value="Medium" className="bg-[#1e293b]">Medium</option>
              <option value="Hard" className="bg-[#1e293b]">Hard</option>
            </select>
          </div>
        </div>

        <div className="grid gap-3">
          {filteredProblems.length === 0 ? (
            <div className="text-center py-10 text-slate-500 bg-white/2 rounded-2xl border border-dashed border-white/5">
              No problems found matching your criteria.
            </div>
          ) : (
            filteredProblems.map((problem) => (
              <div
                key={problem._id}
                className="glass p-3 px-5 rounded-xl flex items-center justify-between hover:bg-white/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500' : 
                    problem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {problem.difficulty}
                  </span>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200">{problem.title}</h4>
                    <div className="flex gap-2 mt-0.5">
                      {problem.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] text-slate-500">#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="hidden sm:inline">Next: {new Date(problem.nextReviewDate).toLocaleDateString()}</span>
                  <a href={problem.url} target="_blank" rel="noopener noreferrer" className="p-1.5 hover:text-white transition-colors">
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
