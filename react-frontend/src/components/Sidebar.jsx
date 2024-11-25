import React, { useState } from 'react';
import '../style/Sidebar.css';
import { FaGamepad, FaCog, FaSignOutAlt, FaChevronLeft } from 'react-icons/fa';
import { logOut } from '../firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  const toggleSidebar = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleButtonClick = (e, callback) => {
    e.stopPropagation();
    callback();
  };

  const handleConfirmLogout = async () => {
    try {
      const { error } = await logOut();
      if (error) {
        toast.error('Logout failed. Please try again.', {
          theme: "dark"
        });
      } else {
        toast.error('Logged out successfully.', {
          theme: "dark",
          style: {
            backgroundColor: '#1a1f25',
            color: '#ff4444'
          },
          progressStyle: {
            background: '#ff4444'
          }
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred', {
        theme: "dark"
      });
    }
    setShowConfirmation(false);
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <ToastContainer />
      <div className="sidebar-content">
        <button className="toggle-button" onClick={toggleSidebar}>
          <FaChevronLeft className={`toggle-icon ${!isExpanded ? 'rotated' : ''}`} />
        </button>
        <button className="sidebar-button" onClick={(e) => handleButtonClick(e, () => handleNavigation('/games'))}>
          <FaGamepad className="sidebar-icon" />
          {isExpanded && <span>Games</span>}
        </button>
        <button className="sidebar-button" onClick={(e) => handleButtonClick(e, () => handleNavigation('/settings'))}>
          <FaCog className="sidebar-icon" />
          {isExpanded && <span>Settings</span>}
        </button>
        <button className="sidebar-button logout" onClick={(e) => handleButtonClick(e, handleLogoutClick)}>
          <FaSignOutAlt className="sidebar-icon" />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>

      {showConfirmation && (
        <div className="logout-confirmation">
          <div className="logout-confirmation-content">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="logout-confirmation-buttons">
              <button onClick={handleConfirmLogout} className="confirm-btn">Yes, Logout</button>
              <button onClick={handleCancelLogout} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar; 