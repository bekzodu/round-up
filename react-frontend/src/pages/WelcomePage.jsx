import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/WelcomePage.css';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const WelcomePage = ({ user, setIsNewUser }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleFinish = async () => {
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: user.email,
        points: 1000,
        createdAt: new Date()
      });
      
      setIsNewUser(false);
      navigate('/');
    } catch (error) {
      setError('Error creating profile. Please try again.');
    }
  };

  return (
    <div className="welcome-container">
      <AnimatePresence mode='wait'>
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="welcome-content"
          >
            <h1>Welcome to RoundUp!</h1>
            <p>A place where you can not only have fun but maybe earn some money if you're lucky enough!</p>
            <button className="next-btn" onClick={() => setStep(2)}>Next</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="welcome-content"
          >
            <h2>Here's a bonus for creating an account</h2>
            <div className="points-display">1,000 pts</div>
            <p>for free!</p>
            <button className="next-btn" onClick={() => setStep(3)}>Next</button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="welcome-content"
          >
            <h2>Create a unique username!</h2>
            {error && <div className="error-message">{error}</div>}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="username-input"
            />
            <button className="finish-btn" onClick={handleFinish}>Finish</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomePage;