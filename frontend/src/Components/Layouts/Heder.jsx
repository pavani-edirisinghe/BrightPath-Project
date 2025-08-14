import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import '../../assets/css/style.css';

function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-light shadow p-0">
      <NavLink
        to="/"
        className="navbar-brand d-flex align-items-center px-4 px-lg-5"
      >
        <h2 className="m-0 text-primary">
          <i className="fa fa-lightbulb me-3" />
          BrightPath
        </h2>
      </NavLink>

      <button
        className="navbar-toggler me-4 text-white border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <i className="fas fa-bars" />
      </button>

      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-item nav-link active' : 'nav-item nav-link'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive ? 'nav-item nav-link active' : 'nav-item nav-link'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) =>
              isActive ? 'nav-item nav-link active' : 'nav-item nav-link'
            }
          >
            Courses
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'nav-item nav-link active' : 'nav-item nav-link'
            }
          >
            Contact Us
          </NavLink>
          
          {/* Conditional rendering based on login status */}
          {user ? (
            <div className="nav-item dropdown">
              <a 
                href="#" 
                className="nav-link dropdown-toggle d-flex align-items-center" 
                id="userDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                {user.profileImage ? (
  <img
    src={
      user.profileImage.startsWith('http')
        ? user.profileImage
        : `https://brightpathimages.blob.core.windows.net/profile-images/${user.profileImage}`
    }
    alt="Profile"
    className="rounded-circle me-2"
    style={{ width: '30px', height: '30px', objectFit: 'cover' }}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = '/img/default-profile.png';
    }}
  />
) : (
  <i className="fas fa-user-circle me-2"></i>
)}

                <span className="d-none d-md-inline">{user.username}</span>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li>
                  <NavLink to="/dashboard" className="dropdown-item">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? 'nav-item nav-link active' : 'nav-item nav-link'
              }
            >
              Login
            </NavLink>
          )}
          

          <div className="d-flex align-items-center ms-lg-3">
            <a
              className="btn btn-sm-square btn-light text-primary me-2"
              href="#"
              style={{ height: 30 }}
            >
              <i className="fab fa-facebook-f" style={{ fontSize: 16 }} />
            </a>
            <a
              className="btn btn-sm-square btn-light text-primary"
              href="#"
              style={{ height: 30 }}
            >
              <i className="fab fa-linkedin-in" style={{ fontSize: 16 }} />
            </a>
            <a href="contact.html" className="nav-item nav-link"></a>
            <a href="contact.html" className="nav-item nav-link"></a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;