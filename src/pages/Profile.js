import React, { useState } from 'react';

function Profile() {
  const username = localStorage.getItem('username') || 'admin';
  const [saved,   setSaved]   = useState(false);
  const [pwSaved, setPwSaved] = useState(false);
  const [pwError, setPwError] = useState('');

  const [form, setForm] = useState({
    fullName:    'Administrator',
    username:    username,
    email:       'admin@sap.edu',
    phone:       '',
    institution: 'My College',
    department:  'Administration',
  });

  const [pw, setPw] = useState({
    current: '', newPw: '', confirm: ''
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePwChange = () => {
    setPwError('');
    if (!pw.current || !pw.newPw || !pw.confirm) {
      setPwError('All fields are required'); return;
    }
    if (pw.newPw !== pw.confirm) {
      setPwError('New passwords do not match'); return;
    }
    if (pw.newPw.length < 6) {
      setPwError('Password must be at least 6 characters'); return;
    }
    setPwSaved(true);
    setPw({ current:'', newPw:'', confirm:'' });
    setTimeout(() => setPwSaved(false), 3000);
  };

  const infoItems = [
    { icon:'🎓', label:'Institution', value: form.institution },
    { icon:'🏢', label:'Department',  value: form.department  },
    { icon:'✉️', label:'Email',       value: form.email       },
    { icon:'📞', label:'Phone',       value: form.phone || '—' },
  ];

  return (
    <div className="fade-in">
      <div className="page-hero">
        <div>
          <p className="hero-greeting">Account Settings</p>
          <h1 className="hero-title">👤 My Profile</h1>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:'20px', alignItems:'start'}}>

        {/* ── Left Panel ── */}
        <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>

          {/* Avatar card */}
          <div className="glass-card" style={{textAlign:'center', padding:'32px 20px'}}>
            <div style={{
              width:'86px', height:'86px', borderRadius:'22px',
              background:'linear-gradient(135deg,var(--blue),var(--purple))',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'38px', fontWeight:'800', margin:'0 auto 16px',
              boxShadow:'0 0 28px var(--blue-glow)'
            }}>{username.charAt(0).toUpperCase()}</div>

            <h2 style={{fontSize:'18px', fontWeight:'800', marginBottom:'4px'}}>{form.fullName}</h2>
            <p style={{fontSize:'12px', color:'var(--text-muted)', marginBottom:'14px'}}>{form.email}</p>

            <div style={{display:'inline-flex', alignItems:'center', gap:'6px',
              background:'rgba(16,185,129,0.12)', border:'1px solid rgba(16,185,129,0.3)',
              color:'#34d399', fontSize:'12px', fontWeight:'700',
              padding:'5px 14px', borderRadius:'20px'}}>
              <span style={{width:'6px', height:'6px', borderRadius:'50%',
                background:'#34d399', display:'inline-block'}} />
              Online
            </div>

            <div style={{marginTop:'18px', paddingTop:'18px', borderTop:'1px solid var(--border)'}}>
              {infoItems.map((item, i) => (
                <div key={i} style={{display:'flex', alignItems:'center', gap:'8px',
                  padding:'7px 0', borderBottom: i < infoItems.length-1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  textAlign:'left'}}>
                  <span style={{fontSize:'14px', flexShrink:0}}>{item.icon}</span>
                  <div>
                    <div style={{fontSize:'10px', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.5px'}}>{item.label}</div>
                    <div style={{fontSize:'12px', color:'var(--text-secondary)', fontWeight:'500'}}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Role badge */}
          <div className="glass-card" style={{textAlign:'center', padding:'20px'}}>
            <div style={{fontSize:'32px', marginBottom:'8px'}}>🔐</div>
            <div style={{fontSize:'11px', color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'6px'}}>Current Role</div>
            <div style={{
              display:'inline-block',
              background:'rgba(59,130,246,0.15)', border:'1px solid rgba(59,130,246,0.35)',
              color:'#60a5fa', fontSize:'13px', fontWeight:'800',
              padding:'6px 18px', borderRadius:'10px', letterSpacing:'1px'
            }}>ADMINISTRATOR</div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>

          {/* Edit profile form */}
          <div className="glass-card">
            <div style={{display:'flex', alignItems:'center',
              justifyContent:'space-between', marginBottom:'22px'}}>
              <h3 style={{fontSize:'16px', fontWeight:'700'}}>✏️ Edit Profile</h3>
              {saved && (
                <span style={{color:'#34d399', fontSize:'13px', fontWeight:'600',
                  background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.3)',
                  padding:'4px 12px', borderRadius:'8px'}}>
                  ✓ Saved!
                </span>
              )}
            </div>
            <div className="form-grid-new">
              <div className="field">
                <label>Full Name</label>
                <input value={form.fullName} placeholder="Your full name"
                  onChange={e => setForm({...form, fullName:e.target.value})} />
              </div>
              <div className="field">
                <label>Username (cannot change)</label>
                <input value={form.username} disabled
                  style={{opacity:0.4, cursor:'not-allowed'}} />
              </div>
              <div className="field">
                <label>Email Address</label>
                <input type="email" value={form.email} placeholder="admin@college.edu"
                  onChange={e => setForm({...form, email:e.target.value})} />
              </div>
              <div className="field">
                <label>Phone Number</label>
                <input value={form.phone} placeholder="Your phone number"
                  onChange={e => setForm({...form, phone:e.target.value})} />
              </div>
              <div className="field">
                <label>Institution Name</label>
                <input value={form.institution} placeholder="Your college name"
                  onChange={e => setForm({...form, institution:e.target.value})} />
              </div>
              <div className="field">
                <label>Department</label>
                <input value={form.department} placeholder="Your department"
                  onChange={e => setForm({...form, department:e.target.value})} />
              </div>
            </div>
            <div className="form-footer">
              <button className="btn-save" onClick={handleSave}>💾 Save Changes</button>
            </div>
          </div>

          {/* Change password */}
          <div className="glass-card">
            <div style={{display:'flex', alignItems:'center',
              justifyContent:'space-between', marginBottom:'22px'}}>
              <h3 style={{fontSize:'16px', fontWeight:'700'}}>🔒 Change Password</h3>
              {pwSaved && (
                <span style={{color:'#34d399', fontSize:'13px', fontWeight:'600',
                  background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.3)',
                  padding:'4px 12px', borderRadius:'8px'}}>
                  ✓ Password Updated!
                </span>
              )}
            </div>

            {pwError && (
              <div style={{background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)',
                color:'#f87171', borderRadius:'10px', padding:'10px 14px',
                fontSize:'13px', marginBottom:'16px'}}>
                ⚠️ {pwError}
              </div>
            )}

            <div className="form-grid-new">
              <div className="field full-width">
                <label>Current Password</label>
                <input type="password" value={pw.current}
                  placeholder="Enter current password"
                  onChange={e => setPw({...pw, current:e.target.value})} />
              </div>
              <div className="field">
                <label>New Password</label>
                <input type="password" value={pw.newPw}
                  placeholder="Min. 6 characters"
                  onChange={e => setPw({...pw, newPw:e.target.value})} />
              </div>
              <div className="field">
                <label>Confirm New Password</label>
                <input type="password" value={pw.confirm}
                  placeholder="Repeat new password"
                  onChange={e => setPw({...pw, confirm:e.target.value})} />
              </div>
            </div>
            <div className="form-footer">
              <button className="btn-save" onClick={handlePwChange}>🔑 Update Password</button>
            </div>
          </div>

          {/* Session info */}
          <div className="glass-card">
            <h3 style={{fontSize:'15px', fontWeight:'700', marginBottom:'16px'}}>🖥️ Session Info</h3>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px'}}>
              {[
                { label:'Logged in as', value: username },
                { label:'Role',         value: 'ADMIN' },
                { label:'Session',      value: 'Active ✅' },
                { label:'Auth',         value: 'JWT Token' },
              ].map((item, i) => (
                <div key={i} style={{background:'rgba(255,255,255,0.03)',
                  border:'1px solid var(--border)', borderRadius:'10px', padding:'12px'}}>
                  <div style={{fontSize:'11px', color:'var(--text-muted)',
                    textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'4px'}}>
                    {item.label}
                  </div>
                  <div style={{fontSize:'13px', fontWeight:'600', color:'var(--text-secondary)',
                    fontFamily:"'JetBrains Mono',monospace"}}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;