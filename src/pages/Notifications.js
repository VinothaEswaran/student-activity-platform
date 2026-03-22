import React, { useState } from 'react';

const INITIAL = [
  { id:1, type:'success', icon:'✅', title:'Welcome to SAP Portal',      msg:'You have successfully logged in to Student Activity Platform.',  time:'Just now',    read:false },
  { id:2, type:'info',    icon:'📊', title:'Dashboard Ready',            msg:'Your dashboard is loaded with latest data.',                     time:'1 min ago',   read:false },
  { id:3, type:'warning', icon:'⚠️', title:'Complete Student Profiles',  msg:'Some students are missing email or phone details.',              time:'5 mins ago',  read:false },
  { id:4, type:'success', icon:'🏆', title:'Activity System Active',     msg:'You can now add and track student activities.',                  time:'10 mins ago', read:false },
  { id:5, type:'info',    icon:'📅', title:'Calendar Feature Enabled',   msg:'Check the calendar to view activities by date.',                 time:'1 hour ago',  read:true  },
  { id:6, type:'success', icon:'🎓', title:'JWT Authentication Active',  msg:'Your session is secured with JWT token.',                        time:'2 hours ago', read:true  },
  { id:7, type:'info',    icon:'🔐', title:'Security Notice',            msg:'Your password is encrypted with BCrypt.',                        time:'Yesterday',   read:true  },
  { id:8, type:'warning', icon:'💾', title:'Backup Reminder',            msg:'Consider exporting your student data regularly.',                time:'2 days ago',  read:true  },
];

const STYLE = {
  success: { bg:'rgba(16,185,129,0.08)',  border:'rgba(16,185,129,0.25)', dot:'#34d399' },
  info:    { bg:'rgba(59,130,246,0.08)',  border:'rgba(59,130,246,0.25)', dot:'#60a5fa' },
  warning: { bg:'rgba(245,158,11,0.08)', border:'rgba(245,158,11,0.25)', dot:'#fbbf24' },
  error:   { bg:'rgba(239,68,68,0.08)',  border:'rgba(239,68,68,0.25)',  dot:'#f87171' },
};

function Notifications() {
  const [notifs, setNotifs] = useState(INITIAL);
  const [filter, setFilter] = useState('all');

  const unread = notifs.filter(n => !n.read).length;

  const markRead    = (id) => setNotifs(notifs.map(n => n.id===id ? {...n, read:true} : n));
  const markAllRead = ()   => setNotifs(notifs.map(n => ({...n, read:true})));
  const deleteNotif = (id) => setNotifs(notifs.filter(n => n.id !== id));
  const clearAll    = ()   => setNotifs([]);

  const filtered = notifs.filter(n =>
    filter === 'unread' ? !n.read :
    filter === 'read'   ?  n.read : true
  );

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div>
          <p className="hero-greeting">System Alerts</p>
          <h1 className="hero-title">
            🔔 Notifications
            {unread > 0 && (
              <span className="count-badge" style={{fontSize:'14px', marginLeft:'10px'}}>
                {unread}
              </span>
            )}
          </h1>
        </div>
        <div style={{display:'flex', gap:'10px'}}>
          {unread > 0 && (
            <button className="add-button" onClick={markAllRead}
              style={{background:'rgba(16,185,129,0.2)', border:'1px solid rgba(16,185,129,0.4)',
                boxShadow:'none', color:'#34d399'}}>
              ✓ Mark All Read
            </button>
          )}
          {notifs.length > 0 && (
            <button className="add-button" onClick={clearAll}
              style={{background:'rgba(239,68,68,0.15)', border:'1px solid rgba(239,68,68,0.3)',
                boxShadow:'none', color:'#f87171'}}>
              🗑 Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="toolbar">
        {[
          { key:'all',    label:`All (${notifs.length})` },
          { key:'unread', label:`Unread (${unread})` },
          { key:'read',   label:`Read (${notifs.length - unread})` },
        ].map(f => (
          <button key={f.key}
            className={`filter-chip ${filter===f.key ? 'active' : ''}`}
            onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="page-empty">
          <div className="pe-icon">🔔</div>
          <h3>No Notifications</h3>
          <p>You're all caught up!</p>
        </div>
      ) : (
        <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
          {filtered.map(n => {
            const s = STYLE[n.type] || STYLE.info;
            return (
              <div key={n.id} onClick={() => markRead(n.id)}
                style={{
                  background: n.read ? 'var(--bg-card)' : s.bg,
                  border: `1px solid ${n.read ? 'var(--border)' : s.border}`,
                  borderRadius:'14px', padding:'18px 20px',
                  display:'flex', alignItems:'center', gap:'16px',
                  cursor:'pointer', transition:'all 0.2s',
                  opacity: n.read ? 0.65 : 1,
                }}>

                {/* Icon */}
                <div style={{
                  width:'48px', height:'48px', borderRadius:'13px', flexShrink:0,
                  background: s.bg, border:`1px solid ${s.border}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'22px'
                }}>{n.icon}</div>

                {/* Text */}
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px'}}>
                    <span style={{fontSize:'14px', fontWeight:'700', color:'var(--text-primary)'}}>{n.title}</span>
                    {!n.read && (
                      <span style={{width:'7px', height:'7px', borderRadius:'50%',
                        background: s.dot, boxShadow:`0 0 6px ${s.dot}`,
                        flexShrink:0, display:'inline-block'}} />
                    )}
                  </div>
                  <p style={{fontSize:'13px', color:'var(--text-secondary)', margin:'0 0 4px'}}>{n.msg}</p>
                  <span style={{fontSize:'11px', color:'var(--text-muted)',
                    fontFamily:"'JetBrains Mono',monospace"}}>{n.time}</span>
                </div>

                {/* Delete btn */}
                <button
                  onClick={e => { e.stopPropagation(); deleteNotif(n.id); }}
                  style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.2)',
                    color:'#f87171', cursor:'pointer', fontSize:'13px', padding:'5px 10px',
                    borderRadius:'8px', fontFamily:'Outfit,sans-serif', transition:'all 0.2s',
                    flexShrink:0}}>
                  ✕
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Notifications;