import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }
    setLoading(true);
    setError('');

    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(res => {
      if (!res.ok) throw new Error('Invalid credentials');
      return res.json();
    })
    .then(data => {
      localStorage.setItem('token',    data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('role',     data.role);
      navigate('/dashboard');
    })
    .catch(err => {
      setError(err.message || 'Login failed');
      setLoading(false);
    });
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-left-bg"></div>
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
        <div className="login-left-inner">
          <div className="login-logo">🎓</div>
          <h1 className="login-brand-name">Student Activity<br/>Platform</h1>
          <p className="login-brand-sub">Centralized Digital Records System</p>
          <div className="login-float-cards">
            <div className="lfc"><span>📊</span> Track Student Activities</div>
            <div className="lfc"><span>🏆</span> Record Achievements</div>
            <div className="lfc"><span>📋</span> Manage Records Easily</div>
          </div>
          <div className="login-welcome">
            <h2>Welcome Back!</h2>
            <p>Login to manage your student<br/>activity records</p>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-box fade-in">
          <p className="lf-pre">Login to</p>
          <h1 className="lf-title">SAP Portal</h1>
          <p className="lf-sub">Enter your credentials to continue</p>

          {error && <div className="lf-error">⚠️ {error}</div>}

          <div className="lf-field">
            <label>Username</label>
            <div className="lf-input-wrap">
              <span className="lf-input-icon">👤</span>
              <input className="lf-input" placeholder="Enter username"
                value={username} onChange={e => setUsername(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleLogin()} />
            </div>
          </div>

          <div className="lf-field">
            <label>Password</label>
            <div className="lf-input-wrap">
              <span className="lf-input-icon">🔒</span>
              <input type="password" className="lf-input"
                placeholder="Enter password"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleLogin()} />
            </div>
          </div>

          <button className="lf-submit" onClick={handleLogin} disabled={loading}>
            {loading
              ? <><div className="lf-spinner"></div> Logging in...</>
              : '🚀 Login'}
          </button>

          <p className="lf-footer">
            Centralized Digital Platform for<br/>
            Comprehensive Student Activity Records
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;