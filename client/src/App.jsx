import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import RecallFlow from './pages/RecallFlow';
import AddProblem from './pages/AddProblem';
import Analytics from './pages/Analytics';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';

function App() {
  const { user } = useStore();

  return (
    <Router>
      <div className="min-h-screen bg-background text-slate-200">
        {user && <Navbar />}
        <main className={`container mx-auto px-4 ${user ? 'pb-24 pt-4 md:pb-8 md:pt-8' : 'py-8'}`}>
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/recall" element={user ? <RecallFlow /> : <Navigate to="/login" />} />
            <Route path="/add" element={user ? <AddProblem /> : <Navigate to="/login" />} />
            <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        {user && <MobileNav />}
      </div>
    </Router>
  );
}

export default App;
