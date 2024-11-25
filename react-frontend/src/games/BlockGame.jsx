import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../style/BlockGame.css';

const BlockGame = () => {
  const [correctBlock, setCorrectBlock] = useState(Math.random() < 0.5 ? 0 : 1);
  const [selectedBlock, setSelectedBlock] = useState(null);

  const handleBlockClick = (blockIndex) => {
    setSelectedBlock(blockIndex);
    setTimeout(() => {
      setSelectedBlock(null);
      setCorrectBlock(Math.random() < 0.5 ? 0 : 1);
    }, 1000);
  };

  return (
    <div className="game-layout">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="game-content">
          <div className="game-container">
            <h1>Block Guess</h1>
            <div className="blocks-container">
              <div 
                className={`block ${selectedBlock === 0 ? 
                  (correctBlock === 0 ? 'correct' : 'incorrect') : ''}`}
                onClick={() => handleBlockClick(0)}
              />
              <div 
                className={`block ${selectedBlock === 1 ? 
                  (correctBlock === 1 ? 'correct' : 'incorrect') : ''}`}
                onClick={() => handleBlockClick(1)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlockGame;
