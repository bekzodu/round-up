import React from 'react';
import '../style/Sidebar.css';
import { FaGamepad, FaCog, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <button className="sidebar-button">
          <FaGamepad className="sidebar-icon" />
          <span>Games</span>
        </button>
        <button className="sidebar-button">
          <FaCog className="sidebar-icon" />
          <span>Settings</span>
        </button>
        <button className="sidebar-button logout">
          <FaSignOutAlt className="sidebar-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 