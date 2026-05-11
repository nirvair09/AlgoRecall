import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, BarChart3, Brain } from 'lucide-react';

const MobileNav = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="glass flex items-center justify-around py-3 rounded-2xl shadow-2xl border border-white/5">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-primary-400 scale-110' : 'text-slate-400'}`
          }
        >
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>

        <NavLink 
          to="/add" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-primary-400 scale-110' : 'text-slate-400'}`
          }
        >
          <PlusCircle size={24} />
          <span className="text-[10px] font-medium">Add</span>
        </NavLink>

        <div className="relative -top-6">
          <NavLink 
            to="/recall" 
            className="flex items-center justify-center w-14 h-14 bg-primary-500 rounded-full shadow-lg shadow-primary-500/30 text-white active:scale-95 transition-transform"
          >
            <Brain size={28} />
          </NavLink>
        </div>

        <NavLink 
          to="/analytics" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-primary-400 scale-110' : 'text-slate-400'}`
          }
        >
          <BarChart3 size={24} />
          <span className="text-[10px] font-medium">Stats</span>
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-primary-400 scale-110' : 'text-slate-400'}`
          }
        >
          <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center border border-primary-500/30">
            <span className="text-[10px] font-bold text-primary-400">R</span>
          </div>
          <span className="text-[10px] font-medium">Profile</span>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileNav;
