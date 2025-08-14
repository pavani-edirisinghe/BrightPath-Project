import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/style.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const passwordRef = useRef(null); // ✅ Added for toggle
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

 const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTogglePassword = () => {
    const input = passwordRef.current;
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      if (profileImage) {
        formDataToSend.append('profileImage', profileImage);
      }

      const response = await fetch(`${BACKEND_URL}/api/users/register`, {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      alert('Registration successful! Please login.');
      navigate('/login');

    } catch (err) {
      setError(err.message || 'An error occurred during registration');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="image-section">
        <img src="img/student.jpg" alt="Student" />
      </div>

      <div className="form-section">
        <h1>Join BrightPath Today!</h1>
        <div className="auth-buttons">
          <button onClick={() => navigate('/login')}>Login</button>
          <button className="active">Register</button>
        </div>
        <br />

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="profile-upload">
            <div onClick={handleImageClick} className="image-container">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile preview" 
                  className="profile-preview"
                />
              ) : (
                <div className="upload-placeholder">
                  <p>Upload Photo</p>
                </div>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Choose a username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              ref={passwordRef} 
              required
            />
            <span className="toggle-eye" onClick={handleTogglePassword}>👁️</span>
          </div>

          <div className="login-btn-wrapper">
            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
