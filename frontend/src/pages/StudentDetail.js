import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EMPTY_ACT = { title:'', type:'', description:'', date:'', venue:'', achievement:'', certificateUrl:'' };
const TYPE_COLOR = { Academic:'ac-blue', Sports:'ac-green', Cultural:'ac-orange', Technical:'ac-pink' };
const TAG_COLOR  = { Academic:'tag-blue', Sports:'tag-green', Cultural:'tag-orange', Technical:'tag-pink' };

function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student,    setStudent]    = useState(null);
  const [activities, setActivities] = useState([]);
  const [form,       setForm]       = useState(EMPTY_ACT);
  const [showForm,   setShowForm]   = useState(false);
  const [loading,    setLoading]    = useState(false);

  const loadActs = () => {
    fetch(`http://localhost:8080/api/activities/student/${id}`).then(r=>r.json()).then(setActivities).catch(()=>{});
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/students/${id}`).then(r=>r.json()).then(setStudent).catch(()=>{});
    loadActs();
  }, [id]);

  const handleSave = () => {
    if (!form.title||!form.type) { alert('Title and Type required!'); return; }
    setLoading(true);
    fetch('http://localhost:8080/api/activities', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({...form, studentId:parseInt(id)})
    })
    .then(r=>r.json())
    .then(()=>{ setForm(EMPTY_ACT); setShowForm(false); setLoading(false); loadActs(); })
    .catch(e=>{ alert('Error: '+e.message); setLoading(false); });
  };

  const handleDeleteAct = (actId) => {
    if (!window.confirm('Delete this activity?')) return;
    fetch(`http://localhost:8080/api/activities/${actId}`,{method:'DELETE'}).then(()=>loadActs()).catch(()=>{});
  };

  if (!student) return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'300px',color:'var(--text-muted)'}}>
      Loading...
    </div>
  );

  return (
    <div className="fade-in">
      <button className="back-btn" onClick={()=>navigate('/students')}>← Back to Students</button>

      <div className="profile-card">
        <div className="profile-avatar-lg">{student.name?.charAt(0)}</div>
        <div className="profile-info">
          <div className="profile-name">{student.name}</div>
          <div className="profile-meta">
            <span className="profile-meta-item">📋 {student.rollNumber}</span>
            {student.email && <span className="profile-meta-item">✉️ {student.email}</span>}
            {student.phone && <span className="profile-meta-item">📞 {student.phone}</span>}
          </div>
          <div className="profile-tags">
            {student.department && <span className="profile-tag t-dept">{student.department}</span>}
            {student.year       && <span className="profile-tag t-year">{student.year}</span>}
            <span className="profile-tag t-year">{activities.length} Activities</span>
          </div>
        </div>
      </div>

      <div className="activities-section-title">
        <span>🏆 Activities ({activities.length})</span>
        <button className="add-button" onClick={()=>setShowForm(!showForm)}>+ Add Activity</button>
      </div>

      {showForm && (
        <div className="form-panel">
          <div className="form-panel-hdr">
            <span className="form-panel-title">➕ Add Activity for {student.name}</span>
            <button className="form-close-btn" onClick={()=>setShowForm(false)}>✕</button>
          </div>
          <div className="form-grid-new">
            <div className="field">
              <label>Title *</label>
              <input placeholder="Activity title" value={form.title}
                onChange={e=>setForm({...form,title:e.target.value})} />
            </div>
            <div className="field">
              <label>Type *</label>
              <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                <option value="">Select Type</option>
                {['Academic','Sports','Cultural','Technical'].map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Date</label>
              <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
            </div>
            <div className="field">
              <label>Venue</label>
              <input placeholder="Location" value={form.venue}
                onChange={e=>setForm({...form,venue:e.target.value})} />
            </div>
            <div className="field">
              <label>Achievement</label>
              <input placeholder="e.g. 1st Place" value={form.achievement}
                onChange={e=>setForm({...form,achievement:e.target.value})} />
            </div>
            <div className="field">
              <label>Certificate URL</label>
              <input placeholder="https://..." value={form.certificateUrl}
                onChange={e=>setForm({...form,certificateUrl:e.target.value})} />
            </div>
            <div className="field full-width">
              <label>Description</label>
              <textarea placeholder="Brief description..." value={form.description}
                onChange={e=>setForm({...form,description:e.target.value})} />
            </div>
          </div>
          <div className="form-footer">
            <button className="btn-save" onClick={handleSave} disabled={loading}>
              {loading?'Saving...':'✓ Save Activity'}
            </button>
            <button className="btn-cancel" onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {activities.length === 0 ? (
        <div className="page-empty">
          <div className="pe-icon">🏆</div>
          <h3>No Activities Yet</h3>
          <p>Click + Add Activity to add one for {student.name}</p>
        </div>
      ) : (
        <div className="activity-cards-grid">
          {activities.map(a=>(
            <div key={a.id} className={`act-card ${TYPE_COLOR[a.type]||'ac-blue'}`}>
              <div className="act-card-top">
                <span className={`a-type-tag ${TAG_COLOR[a.type]||'tag-blue'}`}>{a.type}</span>
                <button className="btn-del-sm" onClick={()=>handleDeleteAct(a.id)}>🗑️</button>
              </div>
              <div className="act-card-title">{a.title}</div>
              {a.description && <div className="act-card-desc">{a.description}</div>}
              <div className="act-card-meta">
                {a.date  && <span>📅 {a.date}</span>}
                {a.venue && <span>📍 {a.venue}</span>}
              </div>
              {a.achievement && <div className="act-achieve">🏅 {a.achievement}</div>}
              {a.certificateUrl && (
                <a href={a.certificateUrl} target="_blank" rel="noreferrer"
                  style={{display:'block',marginTop:'10px',fontSize:'12px',color:'#60a5fa'}}>
                  🔗 View Certificate
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentDetail;