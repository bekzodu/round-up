import React, { useState, useRef } from 'react';
import { FaCamera, FaTrash } from 'react-icons/fa';
import '../style/ProfilePicture.css';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth } from '../firebase/auth';
import { updateProfile } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';

const defaultAvatar = '/assets/default-avatar.png';

const ProfilePicture = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [photoURL, setPhotoURL] = useState(auth.currentUser?.photoURL || defaultAvatar);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB', { theme: 'dark' });
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please use JPG, PNG, GIF, or WebP', { theme: 'dark' });
      return;
    }

    try {
      const storageRef = ref(storage, `profile-pictures/${auth.currentUser.uid}`);
      await uploadBytes(storageRef, file);
      const newPhotoURL = await getDownloadURL(storageRef);
      
      await updateProfile(auth.currentUser, { photoURL: newPhotoURL });
      setPhotoURL(newPhotoURL);
      
      toast.success('Profile picture updated successfully!', { theme: 'dark' });
    } catch (error) {
      toast.error('Failed to upload image. Please try again.', { theme: 'dark' });
      console.error('Upload error:', error);
    }
  };

  const handleImageError = () => {
    setPhotoURL(defaultAvatar);
  };

  const handleDeletePhoto = async () => {
    try {
      const storageRef = ref(storage, `profile-pictures/${auth.currentUser.uid}`);
      await deleteObject(storageRef);
      await updateProfile(auth.currentUser, { photoURL: null });
      setPhotoURL(defaultAvatar);
      setShowDeleteConfirm(false);
      toast.success('Profile picture deleted successfully!', { theme: 'dark' });
    } catch (error) {
      toast.error('Failed to delete profile picture.', { theme: 'dark' });
      console.error('Delete error:', error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        style={{ top: '70px' }}
      />
      <div 
        className="profile-picture-container"
        onMouseEnter={(e) => {
          if (!e.target.closest('.delete-photo-btn')) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img 
          src={photoURL} 
          alt="Profile" 
          className="profile-picture"
          onError={handleImageError}
        />
        {isHovered && (
          <div className="upload-overlay" onClick={() => fileInputRef.current?.click()}>
            <FaCamera className="camera-icon" />
            <span>Upload Photo</span>
          </div>
        )}
        {photoURL !== defaultAvatar && (
          <button 
            className="delete-photo-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteConfirm(true);
            }}
          >
            <FaTrash />
          </button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/jpeg,image/png,image/gif,image/webp"
          style={{ display: 'none' }}
        />
      </div>
      {showDeleteConfirm && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-content">
            <h3>Delete Profile Picture</h3>
            <p>Are you sure you want to delete your profile picture?</p>
            <div className="delete-confirmation-buttons">
              <button className="confirm-delete-btn" onClick={handleDeletePhoto}>
                Delete
              </button>
              <button className="cancel-delete-btn" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePicture;