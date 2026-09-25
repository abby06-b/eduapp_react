import React, { useState } from 'react';
import { GraduationCap, Sparkles, Lock, User, Eye, EyeOff, LogIn, AlertCircle, ShieldCheck, Zap } from 'lucide-react';
import './Login.css';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      // Current static authentication check: username: test123, password: test123
      if (username.trim() === 'test123' && password === 'test123') {
        const userData = { username: 'test123', name: 'Test Scholar', role: 'Pro Scholar', loginTime: new Date().toISOString() };
        localStorage.setItem('edulearn_user', JSON.stringify(userData));
        setIsLoading(false);
        if (onLoginSuccess) onLoginSuccess(userData);
      } else {
        setIsLoading(false);
        setErrorMsg('Invalid username or password. Use username: test123 & password: test123');
      }
    }, 600);
  };

  const handleFillDemoCredentials = () => {
    setUsername('test123');
    setPassword('test123');
    setErrorMsg('');
  };

  return (
    <div className="login-page-container">
      {/* Dynamic Animated Background Orbs */}
      <div className="login-bg-glow orb-1" />
      <div className="login-bg-glow orb-2" />
      <div className="login-grid-pattern" />

      <div className="login-card glass-card animate-fade-in">
        {/* Card Header & Brand Logo */}
        <div className="login-header">
          <div className="login-brand-logo">
            <div className="logo-icon-wrapper">
              <GraduationCap className="brand-icon" size={32} />
              <Sparkles className="sparkle-accent" size={16} />
            </div>
            <h1 className="brand-name">
              EduLearn <span className="brand-accent">AI</span>
            </h1>
          </div>
          <p className="login-tagline">Intellectual Study Hub & AI Concept Video Synthesizer</p>
        </div>

        {/* Credentials Notice Pill */}
        <div className="demo-credentials-banner" onClick={handleFillDemoCredentials} title="Click to auto-fill test credentials">
          <div className="banner-left">
            <ShieldCheck size={18} className="text-emerald" />
            <div>
              <span className="banner-title">Demo Credentials Ready</span>
              <span className="banner-sub">User: <strong>test123</strong> • Pass: <strong>test123</strong></span>
            </div>
          </div>
          <button type="button" className="btn-auto-fill">
            <Zap size={14} /> Auto-fill
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="login-error-alert animate-fade-in">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Field */}
          <div className="form-group">
            <label className="form-label">Username</label>
            <div className="input-input-wrapper">
              <User size={18} className="field-icon" />
              <input
                type="text"
                className="form-input"
                placeholder="Enter username (test123)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-input-wrapper">
              <Lock size={18} className="field-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter password (test123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Login Button */}
          <button type="submit" className="btn-primary login-submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="spinner-icon" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <LogIn size={20} />
                <span>Log In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Login Footer Notice */}
        <div className="login-footer-text">
          <span>Protected by EduLearn AI Authentication Engine</span>
        </div>
      </div>
    </div>
  );
}
