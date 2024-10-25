// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import { useAuth } from './context/AuthContext';
import NotFound from './pages/Not-Found';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              } />
              <Route path="/leaderboard" element={
                <PrivateRoute>
                  <Leaderboard />
                </PrivateRoute>
              } />
            <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;