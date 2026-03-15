import React, { useEffect, useState } from 'react';

function Notifications() {
  const [activities, setActivities] = useState([]);
  const [students,   setStudents]   = useState([]);
  const [read,       setRead]       = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/activities', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).then(r => r.json()).then(setActivities).catch(() => {});
    fetch('http://localhost:8080/api/students', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).then(r => r.json()).then(setStudents).catch(() => {});
  }, []);

  const notifications = [
    ...activities.slice(0, 5).map((a, i) => ({
      id: `a-${a.id}`,
      icon: '🏆',
      title: `New Activity Added`,
      desc: `${a.title} recorded for ${a.student?.name || 'a student'}`,
      time: a.date || 'Recently',
      type: 'activity'
    })),
    ...students.slice(0, 3).map((s, i) => ({
      id: `s-${s.id}`,
      icon: '👨‍🎓',
      title: `New Student Enrolled`,
      desc: `${s.name} joined ${s.department || 'the platform'}`,
      time: 'Recently',
      type: 'student'
    })),
    { id:'sys-1', icon:'🔐', title:'Login Successful', desc:'Admin logged in successfully', time:'Today', type:'system' },
    { id:'sys-2', icon:'✅', title:'System Ready', desc:'All services running normally', time:'Today', type:'system' },
  ];

  const markRead = (id) => setRead(prev => [...prev, id]);
  const markAllRead = () => setRead(notifications.map(n => n.id));
  const unreadCount = notifications.filter(n => !read.includes(n.id)).length;

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div>
          <p className="hero-greeting">System Alerts</p>
          <h1 className="hero-title">🔔 Notifications
            {unreadCount > 0 && <span className="count-badge" style={{background:'rgba(239,68,68,0.15)', color:'#f87171', borderColor:'rgba(239,68,68,0.3)'}}>{unreadCount}</span>}
          </h1>
        </div>
        {unreadCount > 0 && (
          <button className="btn-cancel" onClick={markAllRead}>Mark all as read</button>
        )}
      </div>

      <div className="glass-card">
        <div className="card-header">
          <span className="card-title">All Notifications ({notifications.length})</span>
        </div>
        <div className="notif-list">
          {notifications.map(n => (
            <div key={n.id}
              className={`notif-item ${!read.includes(n.id) ? 'unread' : ''}`}
              onClick={() => markRead(n.id)}>
              <div className="notif-icon">{n.icon}</div>
              <div className="notif-content">
                <div className="notif-title">{n.title}</div>
                <div className="notif-desc">{n.desc}</div>
              </div>
              <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'6px'}}>
                <div className="notif-time">{n.time}</div>
                {!read.includes(n.id) && <div className="notif-dot"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;