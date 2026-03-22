import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const EMPTY = { name:'', rollNumber:'', department:'', year:'', email:'', phone:'' };

function Students() {
  const [students,   setStudents]   = useState([]);
  const [form,       setForm]       = useState(EMPTY);
  const [showForm,   setShowForm]   = useState(false);
  const [search,     setSearch]     = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [loading,    setLoading]    = useState(false);
  const navigate = useNavigate();

  const load = () => {
    api.get('/students').then(setStudents).catch(()=>{});
  };
  useEffect(() => { load(); }, []);

  const handleSave = () => {
    if (!form.name || !form.rollNumber) { alert('Name and Roll Number required!'); return; }
    setLoading(true);
    api.post('/students', form)
      .then(() => { setForm(EMPTY); setShowForm(false); setLoading(false); load(); })
      .catch(e => { alert('Error: '+e.message); setLoading(false); });
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this student?')) return;
    api.delete(`/students/${id}`).then(()=>load()).catch(()=>{});
  };

  const depts = [...new Set(students.map(s=>s.department).filter(Boolean))];
  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.name?.toLowerCase().includes(q) || s.rollNumber?.toLowerCase().includes(q);
    const matchDept   = !deptFilter || s.department === deptFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div>
          <p className="hero-greeting">Manage Records</p>
          <h1 className="hero-title">Students <span className="count-badge">{students.length}</span></h1>
        </div>
        <button className="add-button" onClick={()=>setShowForm(!showForm)}>+ Add Student</button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <span className="search-box-icon">🔍</span>
          <input className="search-input-new" placeholder="Search students..."
            value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          <button className={`filter-chip ${!deptFilter?'active':''}`} onClick={()=>setDeptFilter('')}>All</button>
          {depts.map(d=>(
            <button key={d} className={`filter-chip ${deptFilter===d?'active':''}`}
              onClick={()=>setDeptFilter(d)}>{d}</button>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="form-panel">
          <div className="form-panel-hdr">
            <span className="form-panel-title">➕ Add New Student</span>
            <button className="form-close-btn" onClick={()=>setShowForm(false)}>✕</button>
          </div>
          <div className="form-grid-new">
            <div className="field"><label>Full Name *</label>
              <input placeholder="e.g. John Doe" value={form.name}
                onChange={e=>setForm({...form,name:e.target.value})} /></div>
            <div className="field"><label>Roll Number *</label>
              <input placeholder="e.g. 2021CSE001" value={form.rollNumber}
                onChange={e=>setForm({...form,rollNumber:e.target.value})} /></div>
            <div className="field"><label>Department</label>
              <select value={form.department} onChange={e=>setForm({...form,department:e.target.value})}>
                <option value="">Select Department</option>
                {['CSE','ECE','EEE','MECH','CIVIL','IT','MBA','MCA'].map(d=><option key={d}>{d}</option>)}
              </select></div>
            <div className="field"><label>Year</label>
              <select value={form.year} onChange={e=>setForm({...form,year:e.target.value})}>
                <option value="">Select Year</option>
                {['1st Year','2nd Year','3rd Year','4th Year'].map(y=><option key={y}>{y}</option>)}
              </select></div>
            <div className="field"><label>Email</label>
              <input type="email" placeholder="student@college.edu" value={form.email}
                onChange={e=>setForm({...form,email:e.target.value})} /></div>
            <div className="field"><label>Phone</label>
              <input placeholder="10-digit number" value={form.phone}
                onChange={e=>setForm({...form,phone:e.target.value})} /></div>
          </div>
          <div className="form-footer">
            <button className="btn-save" onClick={handleSave} disabled={loading}>
              {loading?'Saving...':'✓ Save Student'}</button>
            <button className="btn-cancel" onClick={()=>setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="page-empty">
          <div className="pe-icon">👨‍🎓</div>
          <h3>{search||deptFilter?'No Results Found':'No Students Yet'}</h3>
          <p>{search||deptFilter?'Try a different search':'Click + Add Student to get started'}</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table-new">
            <thead><tr>
              <th>#</th><th>Student</th><th>Roll Number</th>
              <th>Department</th><th>Year</th><th>Contact</th><th>Actions</th>
            </tr></thead>
            <tbody>
              {filtered.map((s,i)=>(
                <tr key={s.id}>
                  <td className="td-num">{i+1}</td>
                  <td><div className="td-student">
                    <div className="s-avatar">{s.name?.charAt(0)}</div>
                    <button className="td-name-btn" onClick={()=>navigate(`/students/${s.id}`)}>{s.name}</button>
                  </div></td>
                  <td><span className="roll-pill">{s.rollNumber}</span></td>
                  <td><span className="dept-pill">{s.department}</span></td>
                  <td style={{color:'var(--text-secondary)',fontSize:'13px'}}>{s.year}</td>
                  <td><div className="td-email">{s.email}</div>
                    <div className="td-phone">{s.phone}</div></td>
                  <td><div className="action-group">
                    <button className="btn-view-sm" onClick={()=>navigate(`/students/${s.id}`)}>View</button>
                    <button className="btn-del-sm" onClick={()=>handleDelete(s.id)}>Del</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Students;