import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const ProfileDetails = () => {
  const { user, updateLocalUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        password: '',
      });
      setPreviewUrl(null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file || !user) return;

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append('profileImage', file);

   axios
  .put(`${BACKEND_URL}/api/users/${user.id}/profile-image`, uploadData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  .then((response) => {
    const newImageUrl = response.data.imageUrl;
    if (newImageUrl) {
      const freshUrl = `${newImageUrl}?t=${Date.now()}`;
      updateLocalUser({ profileImage: freshUrl }); // ✅ updates everywhere
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  })
      .catch((error) => {
        console.error('Image upload failed:', error);
        alert('Failed to upload profile image.');
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  const getDisplayUrl = () => {
    if (previewUrl) return previewUrl;
    if (!user?.profileImage) return null;
    return user.profileImage;
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!user) return <p>Loading user data...</p>;

  const displayUrl = getDisplayUrl();

  return (
    <div className="profile-details">
      <h2>Profile Details</h2>
      <div className="profile-section">
        <div className="profile-image-container">
          {displayUrl ? (
            <img
              src={displayUrl}
              alt="Profile"
              className="profile-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/img/default-profile.png';
              }}
            />
          ) : (
            <div className="profile-placeholder">
              <i className="fas fa-user-circle"></i>
            </div>
          )}

          <input
            type="file"
            id="photo-upload"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
            disabled={isUploading}
          />
          <label
            htmlFor="photo-upload"
            className={`change-photo-btn ${isUploading ? 'uploading' : ''}`}
          >
            {isUploading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <>
                <i className="fas fa-camera"></i> Change Photo
              </>
            )}
          </label>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <label>Username:</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            ) : (
              <div className="info-value">{user.username || 'N/A'}</div>
            )}
          </div>

          <div className="info-row">
            <label>Email:</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            ) : (
              <div className="info-value">{user.email || 'N/A'}</div>
            )}
          </div>

          <div className="info-row">
            <label>Password:</label>
            {isEditing ? (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
            ) : (
              <div className="info-value">
                ••••••••
                <button
                  className="change-password-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Change Password
                </button>
              </div>
            )}
          </div>

          <div className="info-actions">
            {isEditing ? (
              <>
                <button className="save-profile-btn" onClick={() => setIsEditing(false)}>
                  Save
                </button>
                <button
                  className="cancel-profile-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      username: user.username || '',
                      email: user.email || '',
                      password: '',
                    });
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className="edit-profile-btn" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
