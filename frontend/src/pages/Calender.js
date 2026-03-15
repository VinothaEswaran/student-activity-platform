import React, { useEffect, useState } from 'react';

function Calendar() {
  const [activities, setActivities] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/activities', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    }).then(r => r.json()).then(setActivities).catch(() => {});
  }, []);

  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthNames = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const firstDay   = new Date(year, month, 1).getDay();
  const daysInMonth= new Date(year, month + 1, 0).getDate();
  const today      = new Date();

  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    return activities.filter(a => a.date === dateStr);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const TYPE_COLOR = { Academic:'blue', Sports:'green', Cultural:'orange', Technical:'pink' };

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div>
          <p className="hero-greeting">Schedule View</p>
          <h1 className="hero-title">📅 Activity Calendar</h1>
        </div>
      </div>

      <div className="glass-card">
        <div className="card-header">
          <button className="btn-cancel" style={{padding:'6px 14px'}}
            onClick={() => setCurrentDate(new Date(year, month-1, 1))}>← Prev</button>
          <span className="card-title" style={{fontSize:'18px'}}>
            {monthNames[month]} {year}
          </span>
          <button className="btn-cancel" style={{padding:'6px 14px'}}
            onClick={() => setCurrentDate(new Date(year, month+1, 1))}>Next →</button>
        </div>

        <div className="calendar-grid">
          {dayNames.map(d => (
            <div key={d} className="cal-day-header">{d}</div>
          ))}
          {cells.map((day, i) => {
            if (!day) return <div key={`e-${i}`} className="cal-day empty"></div>;
            const events  = getEventsForDay(day);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            return (
              <div key={day}
                className={`cal-day ${events.length > 0 ? 'has-event' : ''} ${isToday ? 'today' : ''}`}
                onClick={() => setSelected(events.length > 0 ? {day, events} : null)}>
                <span>{day}</span>
                {events.length > 0 && <div className="cal-event-dot"></div>}
              </div>
            );
          })}
        </div>
      </div>

      {selected && (
        <div className="glass-card" style={{marginTop:'20px'}}>
          <div className="card-header">
            <span className="card-title">📋 Events on {monthNames[month]} {selected.day}, {year}</span>
            <button className="form-close-btn" onClick={() => setSelected(null)}>✕</button>
          </div>
          {selected.events.map(a => (
            <div key={a.id} className="a-row" style={{background:'var(--bg-dark)', borderRadius:'10px', marginBottom:'8px', padding:'14px'}}>
              <div className={`a-dot d-${TYPE_COLOR[a.type]||'blue'}`}></div>
              <div style={{flex:1}}>
                <div className="a-title">{a.title}</div>
                <div className="a-student">{a.student?.name} • {a.venue}</div>
              </div>
              <div className={`a-type-tag tag-${TYPE_COLOR[a.type]||'blue'}`}>{a.type}</div>
            </div>
          ))}
        </div>
      )}

      <div className="glass-card" style={{marginTop:'20px'}}>
        <div className="card-header">
          <span className="card-title">📋 Upcoming Activities</span>
        </div>
        {activities.filter(a => a.date && new Date(a.date) >= today)
          .sort((a,b) => new Date(a.date) - new Date(b.date))
          .slice(0, 8)
          .map(a => (
            <div key={a.id} className="a-row" style={{marginBottom:'4px'}}>
              <div className={`a-dot d-${TYPE_COLOR[a.type]||'blue'}`}></div>
              <div style={{flex:1}}>
                <div className="a-title">{a.title}</div>
                <div className="a-student">{a.student?.name}</div>
              </div>
              <div style={{fontFamily:"'JetBrains Mono',monospace", fontSize:'12px', color:'var(--text-muted)'}}>{a.date}</div>
              <div className={`a-type-tag tag-${TYPE_COLOR[a.type]||'blue'}`} style={{marginLeft:'8px'}}>{a.type}</div>
            </div>
          ))}
        {activities.filter(a => a.date && new Date(a.date) >= today).length === 0 && (
          <div className="empty-state"><div className="e-icon">📅</div><p>No upcoming activities</p></div>
        )}
      </div>
    </div>
  );
}

export default Calendar;