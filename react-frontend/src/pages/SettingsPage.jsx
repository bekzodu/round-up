import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../style/SettingsPage.css';
import ProfilePicture from '../components/ProfilePicture';
import { auth } from '../firebase/auth';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const SettingsPage = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      } catch (error) {
        toast.error('Failed to fetch user data', { theme: 'dark' });
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) {
      fetchUsername();
    }
  }, []);

  return (
    <div className="settings-layout">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <main className="settings-content">
          <div className="settings-container">
            <h1>Account Settings</h1>
            
            <section className="settings-section">
              <ProfilePicture 
                currentPhotoURL={auth.currentUser?.photoURL}
                onPhotoUpdate={async (photoURL) => {
                  try {
                    await updateProfile(auth.currentUser, { photoURL });
                  } catch (error) {
                    toast.error('Failed to update profile. Please try again.', { theme: 'dark' });
                  }
                }}
              />
              <h2>Profile Information</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Username</label>
                  <input 
                    type="text" 
                    value={loading ? 'Loading...' : username}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    value={auth.currentUser?.email || ''}
                    disabled 
                  />
                </div>
              </div>
            </section>

            <section className="settings-section">
              <h2>Security</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>
                <button className="save-btn">Update Password</button>
              </div>
            </section>

            <section className="settings-section">
              <h2>Preferences</h2>
              <div className="settings-form">
                <div className="form-group checkbox">
                  <input type="checkbox" id="emailNotifications" />
                  <label htmlFor="emailNotifications">Email Notifications</label>
                </div>
                <div className="form-group checkbox">
                  <input type="checkbox" id="darkMode" />
                  <label htmlFor="darkMode">Dark Mode</label>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
