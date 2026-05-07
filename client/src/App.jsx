import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useStore from './store/useStore';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import RecallFlow from './pages/RecallFlow';
import AddProblem from './pages/AddProblem';
import Navbar from './components/Navbar';

function App() {
  const { user } = useStore();

  return (
    <Router>
      <div className="min-h-screen bg-[#0f172a] text-slate-200">
        {user && <Navbar />}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
            
            <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/recall" element={user ? <RecallFlow /> : <Navigate to="/login" />} />
            <Route path="/add" element={user ? <AddProblem /> : <Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
