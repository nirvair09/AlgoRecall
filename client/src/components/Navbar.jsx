import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Brain, LogOut, PlusCircle, LayoutDashboard } from 'lucide-react';
import useStore from '../store/useStore';

const Navbar = () => {
  const { logout, user } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary-500 p-2 rounded-lg group-hover:rotate-12 transition-transform">
            <Brain className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold gradient-text">AlgoRecall</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
            <LayoutDashboard size={20} />
            <span className="hidden md:inline">Dashboard</span>
          </Link>
          <Link to="/add" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
            <PlusCircle size={20} />
            <span className="hidden md:inline">Add Problem</span>
          </Link>
          
          <div className="h-6 w-px bg-white/10 mx-2" />
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400 hidden sm:inline">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-red-400 transition-all"
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
