
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import '../../assets/css/style.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const passwordRef = useRef(null);

const handleTogglePassword = () => {
  const input = passwordRef.current;
  if (input.type === 'password') {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setIsLoading(true);
      
      // Send login data to Spring Boot backend
      const response = await fetch(`${BACKEND_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store authentication token
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update user context
      login(data.user);
      // Redirect to dashboard
      navigate('/dashboard');
      
    } catch (err) {
      setError(err.message || 'An error occurred during login');
      console.error('Login error:', err);
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
        <h1>Welcome to BrightPath..!</h1>
        <div className="auth-buttons">
          <button className="active">Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
        <br />
        <p className="description">
          <br />
          Begin your journey with us — explore courses, unlock new skills, and grow with a vibrant learning community.
        </p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            placeholder="Enter your username" 
            value={loginData.username}
            onChange={handleChange}
            required 
          />
          
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
  type="password"
  id="password"
  name="password"
  placeholder="Enter your password"
  value={loginData.password}
  onChange={handleChange}
  required
  ref={passwordRef}
/>

            <span className="toggle-eye" onClick={handleTogglePassword}>
              👁️
              </span>

          </div>
          
          <div className="options">
            <label>
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)} 
              /> 
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          
          <div className="login-btn-wrapper">
            <button 
              type="submit" 
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;