import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../style/MenuPage.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useAdmin } from '../utils/AdminContext';

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState('solo');
  const isAdmin = useAdmin();
  const navigate = useNavigate();

  const handleGameAccess = (game) => {
    if (isAdmin) {
      navigate(`/${game}`);
      return;
    }
    // Regular user access logic here
  };

  return (
    <div className="menu-layout">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="menu-content">
          <div className="menu-container">
            <h1>Games</h1>
            <div className="tabs-container">
              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'solo' ? 'active' : ''}`}
                  onClick={() => setActiveTab('solo')}
                >
                  Solo
                </button>
                <button 
                  className={`tab ${activeTab === 'multiplayer' ? 'active' : ''}`}
                  onClick={() => setActiveTab('multiplayer')}
                >
                  Multiplayer
                </button>
                <button 
                  className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming
                </button>
              </div>
            </div>
            
            <div className="games-grid">
              <div className="game-card">
                <img src="/assets/block-game.png" alt="Block Guess Game" className="game-image" />
                <h3>Block Guess</h3>
                <button className="join-btn" onClick={() => handleGameAccess('block-game')}>Play</button>
              </div>
              <div className="game-card">
                <img src="/assets/balloon-game.png" alt="Balloon Game" className="game-image" />
                <h3>Balloon Game</h3>
                <button className="join-btn" onClick={() => handleGameAccess('balloon-game')}>Play</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenuPage;
