import './style/App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SettingsPage from './pages/SettingsPage';
import AuthenticationPage from './pages/AuthenticationPage';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import MenuPage from './games/MenuPage';
import WelcomePage from './pages/WelcomePage';
import BlockGame from './games/BlockGame';
import BalloonGame from './games/BalloonGame';
import AdminConsolePage from './pages/AdminConsolePage';
import { AdminProvider } from './utils/AdminContext';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Router>
      <AdminProvider>
        <div className="App">
          <Routes>
            <Route 
              path="/login" 
              element={user && !isNewUser ? <Navigate to="/" replace /> : <AuthenticationPage setIsNewUser={setIsNewUser} />} 
            />
            <Route 
              path="/welcome" 
              element={user && isNewUser ? <WelcomePage user={user} setIsNewUser={setIsNewUser} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/settings" 
              element={user ? <SettingsPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/games" 
              element={user ? <MenuPage /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={user && !isNewUser ? <HomePage /> : <Navigate to={isNewUser ? "/welcome" : "/login"} />} 
            />
            <Route 
              path="/block-game" 
              element={user ? <BlockGame /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/balloon-game" 
              element={user ? <BalloonGame /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin" 
              element={user ? <AdminConsolePage /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </AdminProvider>
    </Router>
  );
}

export default App;
