import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../style/MenuPage.css';

const MenuPage = () => {
  const [activeTab, setActiveTab] = useState('solo');

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
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenuPage;
