import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut, PlusCircle, LayoutDashboard, BarChart3 } from 'lucide-react';
import useStore from '../store/useStore';

const Navbar = () => {
  const { logout, user } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass hidden md:block sticky top-0 z-50 border-b border-white/5 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary-500 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary-500/20">
            <Brain className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold gradient-text">AlgoRecall</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-primary-400 transition-colors font-medium">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/add" className="flex items-center gap-2 text-slate-300 hover:text-primary-400 transition-colors font-medium">
            <PlusCircle size={20} />
            <span>Add Problem</span>
          </Link>
          <Link to="/analytics" className="flex items-center gap-2 text-slate-300 hover:text-primary-400 transition-colors font-medium">
            <BarChart3 size={20} />
            <span>Analytics</span>
          </Link>
          
          <div className="h-6 w-px bg-white/5 mx-2" />
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-slate-200">{user?.name}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Pro Student</span>
            </div>
            <button
              onClick={handleLogout}
              className="p-2.5 hover:bg-red-500/10 rounded-xl text-slate-400 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
