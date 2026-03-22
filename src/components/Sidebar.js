import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const links = [
  { path:'/dashboard',     icon:'📊', label:'Dashboard'     },
  { path:'/students',      icon:'👨‍🎓', label:'Students'      },
  { path:'/activities',    icon:'🏆', label:'Activities'    },
  { path:'/calendar',      icon:'📅', label:'Calendar'      },
  { path:'/notifications', icon:'🔔', label:'Notifications' },
  { path:'/profile',       icon:'👤', label:'My Profile'    },
];

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <svg width="22" height="22" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa"/>
                <stop offset="100%" stopColor="#a78bfa"/>
              </linearGradient>
            </defs>
            <polygon points="50,10 90,30 50,50 10,30" fill="url(#sg)"/>
            <rect x="46" y="50" width="8" height="16" fill="#60a5fa" rx="2"/>
            <ellipse cx="50" cy="66" rx="14" ry="5" fill="#3b82f6"/>
            <rect x="36" y="62" width="28" height="8" fill="#2563eb" rx="2"/>
            <ellipse cx="50" cy="70" rx="14" ry="5" fill="#1d4ed8"/>
            <line x1="90" y1="30" x2="90" y2="50" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="90" cy="54" r="4" fill="#fbbf24"/>
            <line x1="88" y1="54" x2="85" y2="63" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
            <line x1="90" y1="56" x2="90" y2="65" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
            <line x1="92" y1="54" x2="95" y2="63" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="brand-text">
          <div className="brand-name">SAP Portal</div>
          <div className="brand-sub">Activity Records</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section-label">Main Menu</div>
        {links.map(l => (
          <div key={l.path}
            className={`nav-link ${location.pathname === l.path ? 'active' : ''}`}
            onClick={() => navigate(l.path)}>
            <span className="nav-icon">{l.icon}</span>
            <span className="nav-label">{l.label}</span>
          </div>
        ))}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-footer-card">
          <div className="sf-title">Student Activity Platform</div>
          <div className="sf-sub">v2.0 • All rights reserved</div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;