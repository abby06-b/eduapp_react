import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import JsonToMp4 from './pages/JsonToMp4';
import Analytics from './pages/Analytics';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import { generateStudyData } from './utils/studyGenerator';
import './App.css';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('edulearn_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState('home');
  const [notes, setNotes] = useState([
    { 
      id: '1', 
      name: 'Machine_Learning_Lec1.pdf', 
      size: '2.4 MB', 
      timestamp: '2 hours ago', 
      status: 'completed',
      ...generateStudyData('Machine_Learning_Lec1.pdf'),
      date: new Date(Date.now() - 7200000).toISOString()
    },
    { 
      id: '2', 
      name: 'Organic_Chemistry_Hydrocarbons.docx', 
      size: '1.8 MB', 
      timestamp: '1 day ago', 
      status: 'completed',
      ...generateStudyData('Organic_Chemistry_Hydrocarbons.docx'),
      date: new Date(Date.now() - 86400000).toISOString()
    },
    { 
      id: '3', 
      name: 'Macroeconomics_Inflation_Notes.pdf', 
      size: '4.1 MB', 
      timestamp: '3 days ago', 
      status: 'completed',
      ...generateStudyData('Macroeconomics_Inflation_Notes.pdf'),
      date: new Date(Date.now() - 259200000).toISOString()
    }
  ]);

  // Sync notes/reels from PostgreSQL database backend on mount
  useEffect(() => {
    fetch('https://edureel-backend-o33b.onrender.com/api/reels')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch reels from DB');
        return res.json();
      })
      .then(dbNotes => {
        if (dbNotes && dbNotes.length > 0) {
          const formattedDbNotes = dbNotes.map(n => ({
            id: String(n.id),
            dbId: n.id,
            reelId: n.id,
            name: n.title || n.filename,
            size: 'Database file',
            timestamp: 'From DB',
            status: 'completed',
            ...generateStudyData(n.title || n.filename),
            date: new Date().toISOString()
          }));
          setNotes(prev => {
            const existingIds = new Set(prev.map(item => item.id));
            const newItems = formattedDbNotes.filter(item => !existingIds.has(item.id));
            return [...newItems, ...prev];
          });
        }
      })
      .catch(err => {
        console.log('Database reels sync notice:', err.message);
      });
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('edulearn_user');
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home notes={notes} setActiveTab={setActiveTab} />;
      case 'upload':
        return <Upload notes={notes} setNotes={setNotes} />;
      case 'json-to-mp4':
        return <JsonToMp4 setNotes={setNotes} />;
      case 'analytics':
        return <Analytics notes={notes} />;
      case 'leaderboard':
        return <Leaderboard />;
      default:
        return <Home notes={notes} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* Decorative Grid Watermark Background */}
      <div className="grid-bg-pattern" />

      {/* SVG Gradients for Custom SVG Charts (Injected once here to be used globally) */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <linearGradient id="uploadsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary-light)" />
            <stop offset="100%" stopColor="var(--primary)" />
          </linearGradient>
          <linearGradient id="hoursGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--secondary-light)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Navigation Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={handleLogout} />

      {/* Main Content Area */}
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}
