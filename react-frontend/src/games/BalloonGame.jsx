import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../style/BalloonGame.css';

const generatePopThreshold = () => {
  const r = Math.random();

  if (r < 0.25) {
    // Range 1–10 (25% chance)
    return Math.floor(Math.random() * 10) + 1;
  } else if (r < 0.60) {
    // Range 11–30 (35% chance)
    return Math.floor(Math.random() * 20) + 11;
  } else if (r < 0.85) {
    // Range 31–50 (25% chance)
    return Math.floor(Math.random() * 20) + 31;
  } else {
    // Range 51–100 (15% chance)
    return Math.floor(Math.random() * 50) + 51;
  }
};

const BalloonGame = () => {
  const [score, setScore] = useState(0);
  const [size, setSize] = useState(20);
  const [isInflating, setIsInflating] = useState(false);
  const [isPopped, setIsPopped] = useState(false);
  const [popThreshold, setPopThreshold] = useState(generatePopThreshold());
  const [nearMissMessage, setNearMissMessage] = useState('');
  const inflationInterval = useRef(null);

  useEffect(() => {
    if (isInflating && !isPopped) {
      inflationInterval.current = setInterval(() => {
        setSize(prevSize => {
          const newSize = prevSize + 1;
          const newScore = Math.floor(newSize - 20);
          setScore(newScore);
          
          if (newScore >= popThreshold) {
            setIsPopped(true);
            setIsInflating(false);
            clearInterval(inflationInterval.current);
          }
          return newSize;
        });
      }, 100);
    } else if (!isInflating && !isPopped) {
      // Check for near miss when player stops inflating
      const difference = Math.abs(score - popThreshold);
      if (difference <= 3) {
        setNearMissMessage(`You were just ${difference} points away from popping!`);
      }
    }

    return () => clearInterval(inflationInterval.current);
  }, [isInflating, isPopped, popThreshold, score]);

  const handleMouseDown = (e) => {
    if (e.button === 0 && !isPopped) {
      setIsInflating(true);
    }
  };

  const handleMouseUp = () => {
    setIsInflating(false);
  };

  const resetGame = () => {
    setSize(20);
    setScore(0);
    setIsPopped(false);
    setIsInflating(false);
    setNearMissMessage('');
    setPopThreshold(generatePopThreshold());
  };

  return (
    <div className="game-layout">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="game-content">
          <div className="balloon-game-container">
            <h1>Balloon Game</h1>
            <div className="game-info">
              <p>Current Score: {score}</p>
              {isPopped && <p className="pop-message">POPPED at score {score}!</p>}
              {!isPopped && nearMissMessage && <p className="near-miss-message">{nearMissMessage}</p>}
            </div>
            <div className="balloon-interaction-area"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div 
                className={`balloon ${isPopped ? 'popped' : ''} ${isInflating ? 'inflating' : ''}`}
                style={{ 
                  transform: `scale(${size / 50})`,
                  backgroundColor: `hsl(203, 89%, ${40 + (size/2)}%)`,
                  '--scale': `${size / 50}`
                }}
              >
                <div className="balloon-shine"></div>
              </div>
            </div>
            {isPopped && (
              <button className="reset-button" onClick={resetGame}>
                Try Again
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BalloonGame;
