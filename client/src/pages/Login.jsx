import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Brain } from 'lucide-react';
import axios from 'axios';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      setUser(res.data, res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-primary-500 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary-500/30 rotate-12 hover:rotate-0 transition-transform duration-500"
        >
          <Brain className="text-white" size={40} />
        </motion.div>
        <h1 className="text-4xl font-black text-white tracking-tight">Welcome <span className="gradient-text">Back</span></h1>
        <p className="text-slate-400 mt-3 text-lg">Your focus starts here.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-50" />
        
        <form onSubmit={handleLogin} className="space-y-8">
          {error && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-sm font-medium flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              {error}
            </motion.div>
          )}

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
              <input
                required
                type="email"
                placeholder="name@example.com"
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-white focus:bg-white/[0.05] focus:border-primary-500 outline-none transition-all text-lg placeholder:text-slate-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary-400 transition-colors" size={20} />
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-white focus:bg-white/[0.05] focus:border-primary-500 outline-none transition-all text-lg placeholder:text-slate-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-400 disabled:bg-slate-800 text-white py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary-500/20 active:scale-95"
          >
            {loading ? 'Logging in...' : (
              <>
                <span>Sign In</span>
                <LogIn size={22} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-white/5 pt-8">
          <p className="text-slate-500 font-medium">
            New here?{' '}
            <Link to="/register" className="text-primary-400 hover:text-primary-300 underline underline-offset-4 decoration-2">Create Account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
