import './style/App.css';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import AuthenticationPage from './pages/AuthenticationPage';
import { auth } from './firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {user ? <HomePage /> : <AuthenticationPage />}
    </div>
  );
}

export default App;
