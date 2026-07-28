import React, { useState } from 'react';
import { Home, UploadCloud, BarChart3, Trophy, GraduationCap, Sparkles, Menu, X, User, ShieldAlert } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'upload', label: 'Upload Notes', icon: UploadCloud },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-logo">
          <GraduationCap className="logo-icon-mobile" />
          <span>EduLearn <span className="logo-accent">AI</span></span>
        </div>
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Container */}
      <aside className={`sidebar-container ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-glow-wrapper">
            <GraduationCap className="logo-icon" />
            <Sparkles className="logo-sparkle" size={14} />
          </div>
          <div className="logo-text">
            <h2>EduLearn <span className="logo-accent">AI</span></h2>
            <p>Intellectual Hub</p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="sidebar-nav">
          <ul className="nav-list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    onClick={() => handleTabClick(item.id)}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon size={20} className="nav-icon" />
                    <span>{item.label}</span>
                    {isActive && <div className="active-dot" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer User Widget */}
        <div className="sidebar-footer">
          <div className="user-profile-card">
            <div className="user-avatar">
              <User size={18} />
              <div className="avatar-badge" />
            </div>
            <div className="user-info">
              <h4 className="user-name">Alex Johnson</h4>
              <p className="user-role">Pro Scholar</p>
            </div>
          </div>
          <div className="level-bar-container">
            <div className="level-info">
              <span>LVL 12</span>
              <span>85% to Lvl 13</span>
            </div>
            <div className="level-progress-bg">
              <div className="level-progress-bar" style={{ width: '85%' }} />
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile Sidebar Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
}
