import './style/App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SettingsPage from './pages/SettingsPage';
import AuthenticationPage from './pages/AuthenticationPage';
import { auth } from './firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import MenuPage from './games/MenuPage';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" replace /> : <AuthenticationPage />} 
          />
          <Route 
            path="/settings" 
            element={user ? <SettingsPage /> : <Navigate to="/login" replace state={{ from: '/settings' }} />} 
          />
          <Route 
            path="/games" 
            element={user ? <MenuPage /> : <Navigate to="/login" replace state={{ from: '/games' }} />} 
          />
          <Route 
            path="/" 
            element={user ? <HomePage /> : <Navigate to="/login" replace state={{ from: '/' }} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
