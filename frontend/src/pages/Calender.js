import React, { useEffect, useState } from 'react';

const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function Calendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [activities,  setActivities]  = useState([]);
  const [selected,    setSelected]    = useState(null);

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    fetch('http://localhost:8080/api/activities', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    }).then(r => r.json()).then(setActivities).catch(() => {});
  }, []);

  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const getActivitiesForDay = (day) => {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return activities.filter(a => a.date === dateStr);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedActs = selected ? getActivitiesForDay(selected) : [];

  const typeColor = (type) => {
    if (type === 'Academic')  return '#60a5fa';
    if (type === 'Sports')    return '#34d399';
    if (type === 'Cultural')  return '#fbbf24';
    if (type === 'Technical') return '#f472b6';
    return '#a78bfa';
  };

  const monthActivities = activities.filter(a => {
    if (!a.date) return false;
    const d = new Date(a.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div>
          <p className="hero-greeting">Schedule View</p>
          <h1 className="hero-title">📅 Activity Calendar</h1>
        </div>
        <div className="hero-date">
          {MONTHS[month]} {year}
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 320px', gap:'20px', alignItems:'start'}}>

        {/* ── Calendar Grid ── */}
        <div className="glass-card">
          {/* Month nav */}
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px'}}>
            <button onClick={() => setCurrentDate(new Date(year, month-1, 1))}
              style={{background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)', color:'var(--text-primary)', width:'36px', height:'36px', borderRadius:'10px', cursor:'pointer', fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              ‹
            </button>
            <h2 style={{fontSize:'18px', fontWeight:'800'}}>{MONTHS[month]} {year}</h2>
            <button onClick={() => setCurrentDate(new Date(year, month+1, 1))}
              style={{background:'rgba(255,255,255,0.05)', border:'1px solid var(--border)', color:'var(--text-primary)', width:'36px', height:'36px', borderRadius:'10px', cursor:'pointer', fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              ›
            </button>
          </div>

          {/* Day labels */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginBottom:'8px'}}>
            {DAYS.map(d => (
              <div key={d} style={{textAlign:'center', fontSize:'11px', fontWeight:'700',
                color:'var(--text-muted)', padding:'6px 0',
                textTransform:'uppercase', letterSpacing:'0.5px'}}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'4px'}}>
            {cells.map((day, i) => {
              if (!day) return <div key={`e-${i}`} />;
              const acts    = getActivitiesForDay(day);
              const isToday = day === today.getDate() &&
                              month === today.getMonth() &&
                              year  === today.getFullYear();
              const isSel   = day === selected;
              return (
                <div key={day}
                  onClick={() => setSelected(isSel ? null : day)}
                  style={{
                    minHeight:'70px', borderRadius:'10px', padding:'7px 6px',
                    background: isSel   ? 'rgba(59,130,246,0.2)' :
                                isToday ? 'rgba(59,130,246,0.08)' :
                                          'rgba(255,255,255,0.02)',
                    border: isSel   ? '1px solid rgba(59,130,246,0.5)' :
                            isToday ? '1px solid rgba(59,130,246,0.3)' :
                                      '1px solid transparent',
                    cursor:'pointer', transition:'all 0.2s',
                  }}>
                  <div style={{fontSize:'12px', fontWeight: isToday ? '800' : '500',
                    color: isToday ? '#60a5fa' : 'var(--text-secondary)',
                    marginBottom:'3px'}}>
                    {day}
                  </div>
                  {acts.slice(0,2).map(a => (
                    <div key={a.id} style={{
                      fontSize:'9px', fontWeight:'600', padding:'2px 4px',
                      borderRadius:'4px', marginBottom:'2px',
                      background:'rgba(255,255,255,0.06)',
                      color: typeColor(a.type),
                      overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'
                    }}>{a.title}</div>
                  ))}
                  {acts.length > 2 && (
                    <div style={{fontSize:'9px', color:'var(--text-muted)'}}>
                      +{acts.length-2}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Side Panel ── */}
        <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>

          {/* Selected day detail */}
          <div className="glass-card">
            <h3 style={{fontSize:'14px', fontWeight:'700', marginBottom:'14px', color:'var(--text-secondary)'}}>
              {selected
                ? `📅 ${MONTHS[month]} ${selected}, ${year}`
                : '👆 Click a day to view activities'}
            </h3>
            {selected && selectedActs.length === 0 && (
              <div style={{textAlign:'center', padding:'20px', color:'var(--text-muted)', fontSize:'13px'}}>
                No activities on this day
              </div>
            )}
            {selectedActs.map(a => (
              <div key={a.id} style={{
                padding:'12px', background:'rgba(255,255,255,0.03)',
                borderRadius:'10px', marginBottom:'8px',
                borderLeft:`3px solid ${typeColor(a.type)}`
              }}>
                <div style={{fontWeight:'700', fontSize:'13px', marginBottom:'4px', color:'var(--text-primary)'}}>{a.title}</div>
                <div style={{fontSize:'12px', color:'var(--text-muted)'}}>{a.student?.name}</div>
                {a.venue       && <div style={{fontSize:'11px', color:'var(--text-muted)', marginTop:'2px'}}>📍 {a.venue}</div>}
                {a.achievement && <div style={{fontSize:'11px', color:'#fbbf24', marginTop:'4px'}}>🏅 {a.achievement}</div>}
              </div>
            ))}
          </div>

          {/* This month summary */}
          <div className="glass-card">
            <h3 style={{fontSize:'14px', fontWeight:'700', marginBottom:'14px', color:'var(--text-secondary)'}}>
              📊 {MONTHS[month]} Summary
            </h3>
            <div style={{fontSize:'28px', fontWeight:'800', color:'#60a5fa',
              fontFamily:"'JetBrains Mono',monospace", marginBottom:'4px'}}>
              {monthActivities.length}
            </div>
            <div style={{fontSize:'12px', color:'var(--text-muted)', marginBottom:'16px'}}>
              Total activities this month
            </div>
            {['Academic','Sports','Cultural','Technical'].map(type => {
              const count = monthActivities.filter(a => a.type === type).length;
              return (
                <div key={type} style={{display:'flex', justifyContent:'space-between',
                  alignItems:'center', padding:'8px 0',
                  borderBottom:'1px solid var(--border)'}}>
                  <span style={{fontSize:'13px', color:'var(--text-secondary)'}}>{type}</span>
                  <span style={{fontSize:'13px', fontWeight:'700',
                    fontFamily:"'JetBrains Mono',monospace",
                    color: typeColor(type)}}>{count}</span>
                </div>
              );
            })}
          </div>

          {/* Upcoming activities */}
          <div className="glass-card">
            <h3 style={{fontSize:'14px', fontWeight:'700', marginBottom:'14px', color:'var(--text-secondary)'}}>
              🔜 Upcoming
            </h3>
            {activities
              .filter(a => a.date && new Date(a.date) >= today)
              .sort((a,b) => new Date(a.date) - new Date(b.date))
              .slice(0,4)
              .map(a => (
                <div key={a.id} style={{display:'flex', gap:'10px', alignItems:'center',
                  padding:'8px 0', borderBottom:'1px solid var(--border)'}}>
                  <div style={{width:'6px', height:'6px', borderRadius:'50%',
                    background: typeColor(a.type), flexShrink:0,
                    boxShadow:`0 0 6px ${typeColor(a.type)}`}} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:'12px', fontWeight:'600', color:'var(--text-primary)'}}>{a.title}</div>
                    <div style={{fontSize:'11px', color:'var(--text-muted)',
                      fontFamily:"'JetBrains Mono',monospace"}}>{a.date}</div>
                  </div>
                </div>
              ))}
            {activities.filter(a => a.date && new Date(a.date) >= today).length === 0 && (
              <div style={{fontSize:'13px', color:'var(--text-muted)', textAlign:'center', padding:'12px'}}>
                No upcoming activities
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
