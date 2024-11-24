import React from 'react';
import '../style/Sidebar.css';
import { FaGamepad, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { logOut } from '../firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
  const handleLogout = async () => {
    try {
      const { error } = await logOut();
      if (error) {
        toast.error('Logout failed. Please try again.', {
          theme: "dark"
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred', {
        theme: "dark"
      });
    }
  };

  return (
    <div className="sidebar">
      <ToastContainer />
      <div className="sidebar-content">
        <button className="sidebar-button">
          <FaGamepad className="sidebar-icon" />
          <span>Games</span>
        </button>
        <button className="sidebar-button">
          <FaCog className="sidebar-icon" />
          <span>Settings</span>
        </button>
        <button className="sidebar-button logout" onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 