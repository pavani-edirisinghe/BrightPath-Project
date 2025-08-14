import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import ProfileDetails from './ProfileDetails';
import AvailableCourses from './AvailableCourses';
import AddCourse from './AddCourse';
import MyCourses from './MyCourses';
import '../../assets/css/dashboard.css';

const Dashboard = () => {
  const { user } = useUser();
  const [activePanel, setActivePanel] = useState('profile');
  
  // Check user type
  const isAdmin = user?.username === 'Admin';

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.username || 'Student'}!</h1>
        {isAdmin && (
          <div className="admin-badge">
            <i className="fas fa-crown"></i> Administrator
          </div>
        )}
      </div>
      
      <div className="dashboard-layout">
        {/* Left Side Panel */}
        <div className="dashboard-sidebar">
          <div className="sidebar-user">
            {user?.profileImage ? (
  <img 
    src={
      user.profileImage.startsWith('http')
        ? user.profileImage
        : `https://brightpathimages.blob.core.windows.net/profile-images/${user.profileImage}`
    } 
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

            <h3>{user?.username || 'User'}</h3>
          </div>
          
          <nav className="sidebar-nav">
            {/* Common options for all users */}
            <button 
              className={`nav-button ${activePanel === 'profile' ? 'active' : ''}`}
              onClick={() => setActivePanel('profile')}
            >
              <i className="fas fa-user"></i> Profile Details
            </button>
            
            <button 
              className={`nav-button ${activePanel === 'courses' ? 'active' : ''}`}
              onClick={() => setActivePanel('courses')}
            >
              <i className="fas fa-book"></i> Available Courses
            </button>
            
            {/* Admin-specific option */}
            {isAdmin ? (
              <button 
                className={`nav-button ${activePanel === 'add-course' ? 'active' : ''}`}
                onClick={() => setActivePanel('add-course')}
              >
                <i className="fas fa-plus-circle"></i> Add Courses
              </button>
            ) : (
              /* Regular user option */
              <button 
                className={`nav-button ${activePanel === 'my-courses' ? 'active' : ''}`}
                onClick={() => setActivePanel('my-courses')}
              >
                <i className="fas fa-graduation-cap"></i> My Courses
              </button>
            )}
            
            {/* Common options for all users */}
            <button className="nav-button">
              <i className="fas fa-cog"></i> Settings
            </button>
            
            <button className="nav-button">
              <i className="fas fa-question-circle"></i> Help
            </button>
          </nav>
        </div>
        
        {/* Main Content Area */}
        <div className="dashboard-main">
          {activePanel === 'profile' && <ProfileDetails />}
          {activePanel === 'courses' && <AvailableCourses />}
          {activePanel === 'add-course' && isAdmin && <AddCourse />}
          {activePanel === 'my-courses' && !isAdmin && <MyCourses />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;