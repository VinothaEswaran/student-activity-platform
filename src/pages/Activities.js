import React, { useEffect, useState } from 'react';
import api from '../api/api';

const EMPTY = { title:'', type:'', description:'', date:'', venue:'', achievement:'', certificateUrl:'', studentId:'' };
const TYPE_COLOR = { Academic:'blue', Sports:'green', Cultural:'orange', Technical:'pink' };
const getColor = t => TYPE_COLOR[t] || 'cyan';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [students,   setStudents]   = useState([]);
  const [form,       setForm]       = useState(EMPTY);
  const [showForm,   setShowForm]   = useState(false);
  const [typeFilter, setTypeFilter] = useState('');
  const [search,     setSearch]     = useState('');
  const [loading,    setLoading]    = useState(false);

  const load = () => {
    api.get('/activities').then(setActivities).catch(()=>{});
  };
  useEffect(() => {
    load();
    api.get('/students').then(setStudents).catch(()=>{});
  }, []);

  const handleSave = () => {
    if (!form.title||!form.type||!form.studentId) { alert('Title, Type and Student required!'); return; }
    setLoading(true);
    api.post('/activities', {...form, studentId:parseInt(form.studentId)})
      .then(()=>{ setForm(EMPTY); setShowForm(false); setLoading(false); load(); })
      .catch(e=>{ alert('Error: '+e.message); setLoading(false); });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete?')) return;
    api.delete(`/activities/${id}`).then(()=>load()).catch(()=>{});
  };

  const filtered = activities.filter(a => {
    const q = search.toLowerCase();
    const matchSearch = !q || a.title?.toLowerCase().includes(q) || a.student?.name?.toLowerCase().includes(q);
    const matchType   = !typeFilter || a.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div>
          <p className="hero-greeting">All Records</p>
          <h1 className="hero-title">Activities <span className="count-badge">{activities.length}</span></h1>
        </div>
        <button className="add-button" onClick={()=>setShowForm(!showForm)}>+ Add Activity</button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <span className="search-box-icon">🔍</span>
          <input className="search-input-new" placeholder="Search activities..."
            value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div className="act-type-filter">
          {['','Academic','Sports','Cultural','Technical'].map(t=>(
            <button key={t} className={`filter-chip ${typeFilter===t?'active':''}`}
              onClick={()=>setTypeFilter(t)}>{t||'All Types'}</button>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="form-panel">
          <div className="form-panel-hdr">
            <span className="form-panel-title">➕ Add New Activity</span>
            <button className="form-close-btn" onClick={()=>setShowForm(false)}>✕</button>
          </div>
          <div className="form-grid-new">
            <div className="field"><label>Title *</label>
              <input placeholder="Activity title" value={form.title}
                onChange={e=>setForm({...form,title:e.target.value})} /></div>
            <div className="field"><label>Type *</label>
              <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
                <option value="">Select Type</option>
                {['Academic','Sports','Cultural','Technical'].map(t=><option key={t}>{t}</option>)}
              </select></div>
            <div className="field"><label>Student *</label>
              <select value={form.studentId} onChange={e=>setForm({...form,studentId:e.target.value})}>
                <option value="">Select Student</option>
                {students.map(s=><option key={s.id} value={s.id}>{s.name} ({s.rollNumber})</option>)}
              </select></div>
            <div className="field"><label>Date</label>
              <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} /></div>
            <div className="field"><label>Venue</label>
              <input placeholder="e.g. College Auditorium" value={form.venue}
                onChange={e=>setForm({...form,venue:e.target.value})} /></div>
            <div className="field"><label>Achievement</label>
              <input placeholder="e.g. 1st Place" value={form.achievement}
                onChange={e=>setForm({...form,achievement:e.target.value})} /></div>
            <div className="field full-width"><label>Description</label>
              <textarea placeholder="Brief description..." value={form.description}
                onChange={e=>setForm({...form,description:e.target.value})} /></div>
            <div className="field full-width"><label>Certificate URL</label>
              <input placeholder="https://..." value={form.certificateUrl}
                onChange={e=>setForm({...form,certificateUrl:e.target.value})} /></div>
          </div>
          <div className="form-footer">
            <button className="btn-save" onClick={handleSave} disabled={loading}>
              {loading?'Saving...':'✓ Save Activity'}</button>
            <button className="btn-cancel" onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="page-empty">
          <div className="pe-icon">🏆</div>
          <h3>{search||typeFilter?'No Results Found':'No Activities Yet'}</h3>
          <p>{search||typeFilter?'Try a different filter':'Click + Add Activity to get started'}</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table-new">
            <thead><tr>
              <th>#</th><th>Title</th><th>Type</th><th>Student</th>
              <th>Date</th><th>Venue</th><th>Achievement</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((a,i)=>(
                <tr key={a.id}>
                  <td className="td-num">{i+1}</td>
                  <td style={{fontWeight:600,color:'var(--text-primary)'}}>{a.title}</td>
                  <td><span className={`a-type-tag tag-${getColor(a.type)}`}>{a.type}</span></td>
                  <td><div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                    <div className="s-avatar" style={{width:'28px',height:'28px',fontSize:'11px',borderRadius:'7px'}}>
                      {a.student?.name?.charAt(0)}</div>
                    <span style={{fontSize:'13px'}}>{a.student?.name}</span>
                  </div></td>
                  <td style={{fontFamily:"'JetBrains Mono',monospace",fontSize:'12px'}}>{a.date}</td>
                  <td style={{fontSize:'13px'}}>{a.venue}</td>
                  <td>{a.achievement&&<span style={{color:'#fbbf24',fontSize:'12px',fontWeight:600}}>🏅 {a.achievement}</span>}</td>
                  <td><button className="btn-del-sm" onClick={()=>handleDelete(a.id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;