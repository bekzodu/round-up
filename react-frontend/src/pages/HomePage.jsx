import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../style/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-layout">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="main-content">
          {/* Content will go here later */}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
