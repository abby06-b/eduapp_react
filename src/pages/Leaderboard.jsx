import React, { useState } from 'react';
import { Trophy, Search, Star, Medal, Sparkles, Filter } from 'lucide-react';
import './Leaderboard.css';

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState('');

  // Top 3 students (Podium styling)
  const podiumStudents = [
    { rank: 2, name: 'Alex Johnson (You)', score: '4,590 XP', badgeName: 'Silver Scholar', color: 'silver', avatar: 'AJ', badges: ['Upload King', 'Streaker'] },
    { rank: 1, name: 'Emma Watson', score: '4,820 XP', badgeName: 'Gold Champion', color: 'gold', avatar: 'EW', badges: ['Super Scholar', 'Quiz Whiz', 'Streak Maker'] },
    { rank: 3, name: 'Liam Davies', score: '4,410 XP', badgeName: 'Bronze Warrior', color: 'bronze', avatar: 'LD', badges: ['Active Learner', 'Night Owl'] },
  ];

  // Full rankings list (starting from Rank 1 down)
  const allRankings = [
    { rank: 1, name: 'Emma Watson', score: 4820, avatar: 'EW', badges: ['Super Scholar', 'Quiz Whiz', 'Streak Maker'], role: 'Gold' },
    { rank: 2, name: 'Alex Johnson (You)', score: 4590, avatar: 'AJ', badges: ['Upload King', 'Streaker'], role: 'Silver' },
    { rank: 3, name: 'Liam Davies', score: 4410, avatar: 'LD', badges: ['Active Learner', 'Night Owl'], role: 'Bronze' },
    { rank: 4, name: 'Sophia Martinez', score: 4120, avatar: 'SM', badges: ['Concept King'], role: 'Scholar' },
    { rank: 5, name: 'Jackson Carter', score: 3980, avatar: 'JC', badges: ['Tenacious'], role: 'Scholar' },
    { rank: 6, name: 'Olivia Taylor', score: 3850, avatar: 'OT', badges: ['Double XP'], role: 'Scholar' },
    { rank: 7, name: 'Mason White', score: 3600, avatar: 'MW', badges: ['Note Miner'], role: 'Scholar' },
    { rank: 8, name: 'Isabella Miller', score: 3420, avatar: 'IM', badges: ['Fast Track'], role: 'Scholar' }
  ];

  // Sort podium students for render: 2nd, 1st, 3rd (Classic visual podium order)
  const sortedPodium = [podiumStudents[0], podiumStudents[1], podiumStudents[2]];

  const filteredRankings = allRankings.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="leaderboard-container animate-fade-in">
      {/* Page Header */}
      <div className="leaderboard-header">
        <h1 className="page-title">Class Leaderboard</h1>
        <p className="page-subtitle">Compete with your peers, complete assignments, upload notes, and earn study XP badges.</p>
      </div>

      {/* Top 3 Visual Podium Section */}
      <div className="podium-section">
        {sortedPodium.map((student) => (
          <div key={student.rank} className={`podium-card glass-card podium-${student.color}`}>
            <div className="podium-rank-badge">
              {student.rank === 1 && <Medal className="rank-icon gold-color" size={24} />}
              {student.rank === 2 && <Medal className="rank-icon silver-color" size={24} />}
              {student.rank === 3 && <Medal className="rank-icon bronze-color" size={24} />}
              <span>Rank {student.rank}</span>
            </div>

            <div className={`podium-avatar-wrapper avatar-${student.color}`}>
              <div className="podium-avatar">
                <span>{student.avatar}</span>
              </div>
              {student.rank === 1 && <Sparkles size={16} className="avatar-star-sparkle" />}
            </div>

            <div className="podium-info">
              <h3>{student.name}</h3>
              <span className="podium-score">{student.score}</span>
              <span className={`role-badge badge-${student.color}`}>{student.badgeName}</span>
            </div>

            <div className="podium-badges">
              {student.badges.map((b, idx) => (
                <span key={idx} className="micro-badge">{b}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="glass-card rankings-table-card">
        {/* Search & Filter Row */}
        <div className="table-search-row">
          <h2 className="section-title"><Trophy size={20} className="text-secondary" /> Overall Rankings</h2>
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search classmates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="table-scroll-container">
          <table className="rankings-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student</th>
                <th>Score</th>
                <th>Earned Badges</th>
              </tr>
            </thead>
            <tbody>
              {filteredRankings.length === 0 ? (
                <tr>
                  <td colSpan="4" className="empty-table-cell">No classmates found matching "{searchQuery}"</td>
                </tr>
              ) : (
                filteredRankings.map((student) => {
                  let rowClass = 'table-row';
                  if (student.name.includes('(You)')) rowClass += ' highlight-row';
                  
                  return (
                    <tr key={student.rank} className={rowClass}>
                      <td className="rank-column">
                        {student.rank <= 3 ? (
                          <div className={`table-medal-circle medal-${student.role.toLowerCase()}`}>
                            {student.rank}
                          </div>
                        ) : (
                          <span className="plain-rank">{student.rank}</span>
                        )}
                      </td>
                      <td className="student-column">
                        <div className="student-cell-info">
                          <div className={`table-avatar avatar-sm avatar-${student.rank <= 3 ? student.role.toLowerCase() : 'standard'}`}>
                            {student.avatar}
                          </div>
                          <span className="student-name">{student.name}</span>
                        </div>
                      </td>
                      <td className="score-column">
                        <span className="student-score-xp">{student.score.toLocaleString()} XP</span>
                      </td>
                      <td className="badges-column">
                        <div className="badges-list">
                          {student.badges.map((b, idx) => (
                            <span key={idx} className="table-micro-badge">{b}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
