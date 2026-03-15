import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Admin';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-search-wrap">
        <span className="nav-search-icon">🔍</span>
        <input className="nav-search" placeholder="Search Dashboard..." />
      </div>
      <div className="nav-spacer" />
      <div className="nav-icons">
        <button className="nav-icon-btn" title="Notifications">🔔</button>
        <button className="nav-icon-btn" title="Messages">✉️</button>
        <div className="nav-user">
          <div className="nav-avatar">{username.charAt(0).toUpperCase()}</div>
          <span className="nav-username">{username}</span>
        </div>
        <button className="nav-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;