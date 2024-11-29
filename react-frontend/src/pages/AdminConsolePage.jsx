import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAdmin } from '../utils/AdminContext';
import { Navigate } from 'react-router-dom';
import { FaUsers, FaGamepad, FaChartLine, FaCog } from 'react-icons/fa';
import '../style/AdminConsolePage.css';
import { fetchAdminStats } from '../utils/statsUtils';

const AdminConsolePage = () => {
  const isAdmin = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPoints: 0,
    newUsers: 0,
    userGrowth: 0,
    pointsGrowth: 0
  });

  useEffect(() => {
    const loadStats = async () => {
      const fetchedStats = await fetchAdminStats();
      if (fetchedStats) {
        setStats(fetchedStats);
      }
    };
    loadStats();
  }, []);

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-layout">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="admin-content">
          <div className="admin-container">
            <h1>Admin Console</h1>
            
            <div className="admin-tabs-container">
              <div className="admin-tabs">
                <button 
                  className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <FaChartLine className="tab-icon" />
                  Overview
                </button>
                <button 
                  className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
                  onClick={() => setActiveTab('users')}
                >
                  <FaUsers className="tab-icon" />
                  Users
                </button>
                <button 
                  className={`admin-tab ${activeTab === 'games' ? 'active' : ''}`}
                  onClick={() => setActiveTab('games')}
                >
                  <FaGamepad className="tab-icon" />
                  Games
                </button>
                <button 
                  className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <FaCog className="tab-icon" />
                  Settings
                </button>
              </div>
            </div>

            <div className="admin-stats-grid">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p className="stat-number">{stats.totalUsers}</p>
                <p className={`stat-change ${stats.newUsers > 0 ? 'positive' : 'neutral'}`}>
                  {stats.newUsers > 0 ? '+' : ''}{stats.newUsers} this week
                </p>
              </div>
              <div className="stat-card">
                <h3>Market Cap</h3>
                <p className="stat-number">{stats.totalPoints.toLocaleString()} pts</p>
                <p className={`stat-change ${stats.pointsGrowth > 0 ? 'positive' : stats.pointsGrowth < 0 ? 'negative' : 'neutral'}`}>
                  {stats.pointsGrowth > 0 ? '+' : ''}{stats.pointsGrowth.toFixed(1)}% this week
                </p>
              </div>
              <div className="stat-card">
                <h3>New Users</h3>
                <p className="stat-number">{stats.newUsers}</p>
                <p className="stat-change neutral">This week</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminConsolePage; 