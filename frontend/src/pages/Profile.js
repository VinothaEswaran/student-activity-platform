import React, { useState } from 'react';

function Profile() {
  const username = localStorage.getItem('username') || 'admin';
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    fullName: 'Administrator',
    email: 'admin@college.edu',
    phone: '9876543210',
    college: 'Government College of Technology',
    department: 'Admin Office',
    role: 'System Administrator'
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div>
          <p className="hero-greeting">Account Settings</p>
          <h1 className="hero-title">👤 My Profile</h1>
        </div>
      </div>

      <div className="profile-page-card">
        <div className="profile-big-avatar">
          {username.charAt(0).toUpperCase()}
        </div>
        <h2 style={{fontSize:'22px', fontWeight:'800'}}>{form.fullName}</h2>
        <p style={{color:'var(--text-muted)', fontSize:'14px', marginTop:'4px'}}>
          {form.role} • {form.college}
        </p>
        <div style={{display:'flex', gap:'8px', marginTop:'12px'}}>
          <span className="dept-pill">{form.department}</span>
          <span style={{background:'rgba(16,185,129,0.15)', border:'1px solid rgba(16,185,129,0.3)', color:'#34d399', fontSize:'12px', fontWeight:'600', padding:'4px 12px', borderRadius:'8px'}}>
            ✓ Active
          </span>
        </div>
      </div>

      <div className="glass-card">
        <div className="card-header">
          <span className="card-title">✏️ Edit Profile</span>
        </div>
        <div className="form-grid-new">
          <div className="field"><label>Full Name</label>
            <input value={form.fullName} onChange={e => setForm({...form, fullName:e.target.value})} /></div>
          <div className="field"><label>Email</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} /></div>
          <div className="field"><label>Phone</label>
            <input value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} /></div>
          <div className="field"><label>College</label>
            <input value={form.college} onChange={e => setForm({...form, college:e.target.value})} /></div>
          <div className="field"><label>Department</label>
            <input value={form.department} onChange={e => setForm({...form, department:e.target.value})} /></div>
          <div className="field"><label>Role</label>
            <input value={form.role} onChange={e => setForm({...form, role:e.target.value})} /></div>
        </div>
        <div className="form-footer" style={{marginTop:'16px'}}>
          <button className="btn-save" onClick={handleSave}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="glass-card" style={{marginTop:'20px'}}>
        <div className="card-header">
          <span className="card-title">🔐 Change Password</span>
        </div>
        <div className="form-grid-new">
          <div className="field"><label>Current Password</label>
            <input type="password" placeholder="••••••••" /></div>
          <div className="field"><label>New Password</label>
            <input type="password" placeholder="••••••••" /></div>
          <div className="field"><label>Confirm New Password</label>
            <input type="password" placeholder="••••••••" /></div>
        </div>
        <div className="form-footer" style={{marginTop:'16px'}}>
          <button className="btn-save">Update Password</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;