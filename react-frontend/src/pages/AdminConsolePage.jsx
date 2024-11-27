import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { isAdminUser } from '../utils/adminUtils';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useAdmin } from '../utils/AdminContext';

const AdminConsolePage = () => {
  const isAdmin = useAdmin();

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
            {/* Add admin features here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminConsolePage; 