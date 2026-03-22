import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const TYPE_COLOR = { Academic:'blue', Sports:'green', Cultural:'orange', Technical:'pink' };
const getColor = t => TYPE_COLOR[t] || 'cyan';

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents:0, totalActivities:0,
    academicActivities:0, sportsActivities:0,
    culturalActivities:0, technicalActivities:0
  });
  const [students,   setStudents]   = useState([]);
  const [activities, setActivities] = useState([]);
  const username = localStorage.getItem('username') || 'Admin';
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/dashboard/stats').then(setStats).catch(()=>{});
    api.get('/students').then(d => setStudents(d.slice(0,5))).catch(()=>{});
    api.get('/activities').then(d => setActivities(d.slice(0,5))).catch(()=>{});
  }, []);

  const statCards = [
    { label:'Total Students',   value:stats.totalStudents,       icon:'👨‍🎓', color:'blue'   },
    { label:'Total Activities', value:stats.totalActivities,     icon:'🏆',  color:'purple' },
    { label:'Academic',         value:stats.academicActivities,  icon:'📚',  color:'cyan'   },
    { label:'Sports',           value:stats.sportsActivities,    icon:'⚽',  color:'green'  },
    { label:'Cultural',         value:stats.culturalActivities,  icon:'🎭',  color:'orange' },
    { label:'Technical',        value:stats.technicalActivities, icon:'💻',  color:'pink'   },
  ];

  const breakdown = [
    { label:'Academic', value:stats.academicActivities,  fill:'f-blue',   pct: stats.totalActivities>0?(stats.academicActivities/stats.totalActivities)*100:0 },
    { label:'Sports',   value:stats.sportsActivities,    fill:'f-green',  pct: stats.totalActivities>0?(stats.sportsActivities/stats.totalActivities)*100:0   },
    { label:'Cultural', value:stats.culturalActivities,  fill:'f-orange', pct: stats.totalActivities>0?(stats.culturalActivities/stats.totalActivities)*100:0 },
    { label:'Technical',value:stats.technicalActivities, fill:'f-pink',   pct: stats.totalActivities>0?(stats.technicalActivities/stats.totalActivities)*100:0},
  ];

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div>
          <p className="hero-greeting">Hello {username}, welcome back! 👋</p>
          <h1 className="hero-title">Dashboard Overview</h1>
        </div>
        <div className="hero-date">
          {new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map((c,i) => (
          <div key={i} className={`stat-card c-${c.color}`}>
            <div className="stat-icon">{c.icon}</div>
            <div className="stat-body">
              <div className="stat-val">{c.value}</div>
              <div className="stat-lbl">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dash-grid">
        <div className="glass-card">
          <div className="card-header">
            <span className="card-title">👨‍🎓 Recent Students</span>
            <button className="card-action" onClick={()=>navigate('/students')}>View All →</button>
          </div>
          {students.length === 0 ? (
            <div className="empty-state"><div className="e-icon">👨‍🎓</div><p>No students yet</p></div>
          ) : students.map(s => (
            <div key={s.id} className="s-row" onClick={()=>navigate(`/students/${s.id}`)}>
              <div className="s-avatar">{s.name?.charAt(0)}</div>
              <div>
                <div className="s-name">{s.name}</div>
                <div className="s-dept">{s.department} • {s.year}</div>
              </div>
              <div className="s-roll">{s.rollNumber}</div>
            </div>
          ))}
        </div>

        <div className="glass-card">
          <div className="card-header">
            <span className="card-title">🏆 Recent Activities</span>
            <button className="card-action" onClick={()=>navigate('/activities')}>View All →</button>
          </div>
          {activities.length === 0 ? (
            <div className="empty-state"><div className="e-icon">🏆</div><p>No activities yet</p></div>
          ) : activities.map(a => (
            <div key={a.id} className="a-row">
              <div className={`a-dot d-${getColor(a.type)}`}></div>
              <div style={{flex:1}}>
                <div className="a-title">{a.title}</div>
                <div className="a-student">{a.student?.name}</div>
              </div>
              <div className={`a-type-tag tag-${getColor(a.type)}`}>{a.type}</div>
            </div>
          ))}
        </div>

        <div className="glass-card" style={{gridColumn:'1 / -1'}}>
          <div className="card-header">
            <span className="card-title">📊 Activity Breakdown</span>
            <span style={{fontSize:'13px',color:'var(--text-muted)'}}>Total: {stats.totalActivities}</span>
          </div>
          <div className="breakdown">
            {breakdown.map((b,i) => (
              <div key={i}>
                <div className="bk-label">
                  <span className="bk-name">{b.label}</span>
                  <span className="bk-count">{b.value} activities</span>
                </div>
                <div className="bk-bar">
                  <div className={`bk-fill ${b.fill}`} style={{width:`${b.pct}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;