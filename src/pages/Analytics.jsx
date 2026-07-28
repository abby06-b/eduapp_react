import React, { useState } from 'react';
import { BarChart3, FileText, BrainCircuit, Users, Award, TrendingUp, Calendar, AlertCircle, HelpCircle } from 'lucide-react';
import './Analytics.css';

export default function Analytics({ notes }) {
  const [hoveredBar, setHoveredBar] = useState(null); // { index, type }
  const [hoveredHeatcell, setHoveredHeatcell] = useState(null); // { day, time }

  // Static chart data (Weekly stats)
  const weeklyData = [
    { day: 'Mon', uploads: 3, hours: 2.1 },
    { day: 'Tue', uploads: 5, hours: 4.3 },
    { day: 'Wed', uploads: 2, hours: 3.5 },
    { day: 'Thu', uploads: 6, hours: 5.2 },
    { day: 'Fri', uploads: 4, hours: 3.8 },
    { day: 'Sat', uploads: 8, hours: 6.5 },
    { day: 'Sun', uploads: 7, hours: 5.8 }
  ];

  // Heatmap data: days vs 5 time periods (Morning, Mid-day, Afternoon, Evening, Night)
  const timePeriods = ['Morning', 'Midday', 'Afternoon', 'Evening', 'Night'];
  const heatmapData = {
    'Mon': [20, 45, 60, 90, 30],
    'Tue': [30, 50, 40, 95, 60],
    'Wed': [10, 40, 75, 80, 45],
    'Thu': [40, 35, 65, 85, 70],
    'Fri': [25, 60, 50, 90, 85],
    'Sat': [15, 30, 90, 95, 50],
    'Sun': [5, 20, 85, 75, 20]
  };

  const getHeatmapColor = (value) => {
    if (value < 20) return 'intensity-1';
    if (value < 45) return 'intensity-2';
    if (value < 70) return 'intensity-3';
    if (value < 90) return 'intensity-4';
    return 'intensity-5';
  };

  return (
    <div className="analytics-container animate-fade-in">
      {/* Page Header */}
      <div className="analytics-header">
        <h1 className="page-title">Platform Analytics</h1>
        <p className="page-subtitle">Track your learning intensity, note management, and cognitive performance indicators.</p>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid-cols-4">
        <div className="glass-card metric-card">
          <div className="metric-header">
            <span className="metric-label">Total Notes</span>
            <FileText size={20} className="text-primary" />
          </div>
          <div className="metric-value-row">
            <h3>{notes.length}</h3>
            <span className="metric-badge positive">+2 this wk</span>
          </div>
          <p className="metric-desc">Staged and indexed notes</p>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-header">
            <span className="metric-label">AI Summaries</span>
            <BrainCircuit size={20} className="text-secondary" />
          </div>
          <div className="metric-value-row">
            <h3>{notes.filter(n => n.status === 'completed').length}</h3>
            <span className="metric-badge positive">100% Synced</span>
          </div>
          <p className="metric-desc">Structured outlines ready</p>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-header">
            <span className="metric-label">Avg. Engagement</span>
            <TrendingUp size={20} className="text-pink" />
          </div>
          <div className="metric-value-row">
            <h3>82.4%</h3>
            <span className="metric-badge positive">+4.2%</span>
          </div>
          <p className="metric-desc">Interaction retention rate</p>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-header">
            <span className="metric-label">Active Study Buddies</span>
            <Users size={20} className="text-cyan" />
          </div>
          <div className="metric-value-row">
            <h3>1,248</h3>
            <span className="metric-badge neutral">Global</span>
          </div>
          <p className="metric-desc">Students learning online</p>
        </div>
      </div>

      {/* Charts Layout (Grid: 1.2fr 0.8fr) */}
      <div className="analytics-charts-grid">
        {/* Weekly Bar Chart */}
        <div className="glass-card chart-card">
          <div className="chart-header-row">
            <div className="chart-title-block">
              <h3>Weekly Activity & Engagement</h3>
              <p>Comparison of notes uploaded vs. study hours per day</p>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color bg-indigo"></span>
                <span>Uploads</span>
              </div>
              <div className="legend-item">
                <span className="legend-color bg-purple"></span>
                <span>Study Hrs</span>
              </div>
            </div>
          </div>

          <div className="svg-chart-container">
            {/* SVG Visual Data Representation */}
            <svg viewBox="0 0 600 300" className="svg-chart">
              {/* Grid Lines */}
              <line x1="40" y1="50" x2="560" y2="50" className="grid-line" />
              <line x1="40" y1="120" x2="560" y2="120" className="grid-line" />
              <line x1="40" y1="190" x2="560" y2="190" className="grid-line" />
              <line x1="40" y1="260" x2="560" y2="260" className="grid-line bold" />

              {/* Y Axis Labels */}
              <text x="25" y="55" className="axis-label">8</text>
              <text x="25" y="125" className="axis-label">5</text>
              <text x="25" y="195" className="axis-label">2</text>
              <text x="25" y="265" className="axis-label">0</text>

              {/* Bars Group */}
              {weeklyData.map((d, index) => {
                const colWidth = 74;
                const startX = 50 + index * colWidth;
                
                // Scale calculations (max value is 8 for uploads, y scale from y=260 to y=50)
                const bar1Height = (d.uploads / 8) * 210;
                const bar2Height = (d.hours / 8) * 210;

                const y1 = 260 - bar1Height;
                const y2 = 260 - bar2Height;

                return (
                  <g key={index} className="bar-group">
                    {/* Bar 1: Uploads (Indigo Gradient) */}
                    <rect
                      x={startX}
                      y={y1}
                      width="18"
                      height={bar1Height}
                      rx="4"
                      className={`chart-bar bar-uploads ${hoveredBar?.index === index && hoveredBar?.type === 'uploads' ? 'active' : ''}`}
                      onMouseEnter={() => setHoveredBar({ index, type: 'uploads', val: d.uploads, day: d.day })}
                      onMouseLeave={() => setHoveredBar(null)}
                    />

                    {/* Bar 2: Hours (Purple Gradient) */}
                    <rect
                      x={startX + 22}
                      y={y2}
                      width="18"
                      height={bar2Height}
                      rx="4"
                      className={`chart-bar bar-hours ${hoveredBar?.index === index && hoveredBar?.type === 'hours' ? 'active' : ''}`}
                      onMouseEnter={() => setHoveredBar({ index, type: 'hours', val: d.hours, day: d.day })}
                      onMouseLeave={() => setHoveredBar(null)}
                    />

                    {/* X Axis label */}
                    <text x={startX + 20} y="282" textAnchor="middle" className="axis-label x-axis-label">{d.day}</text>
                  </g>
                );
              })}
            </svg>

            {/* Custom Chart Tooltip */}
            {hoveredBar && (
              <div 
                className="chart-tooltip" 
                style={{ 
                  left: `${110 + hoveredBar.index * 74}px`,
                  bottom: '80px' 
                }}
              >
                <span className="tooltip-title">{hoveredBar.day}</span>
                <span className="tooltip-value">
                  {hoveredBar.type === 'uploads' 
                    ? `📄 Uploaded: ${hoveredBar.val} notes` 
                    : `⏱️ Study Time: ${hoveredBar.val} hours`}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Engagement Heatmap */}
        <div className="glass-card heatmap-card">
          <div className="chart-header-row">
            <div className="chart-title-block">
              <h3>Engagement Heatmap</h3>
              <p>Active studying density by weekday and time period</p>
            </div>
          </div>

          <div className="heatmap-container">
            <div className="heatmap-header-hours">
              <span className="heatmap-corner-label">Day</span>
              {timePeriods.map(p => (
                <span key={p} className="time-heading">{p}</span>
              ))}
            </div>

            <div className="heatmap-grid">
              {Object.keys(heatmapData).map(day => (
                <div key={day} className="heatmap-row">
                  <span className="day-heading">{day}</span>
                  <div className="cells-row">
                    {heatmapData[day].map((val, pIdx) => {
                      const timeName = timePeriods[pIdx];
                      const isHovered = hoveredHeatcell?.day === day && hoveredHeatcell?.time === timeName;
                      return (
                        <div
                          key={pIdx}
                          className={`heatmap-cell ${getHeatmapColor(val)} ${isHovered ? 'active' : ''}`}
                          onMouseEnter={() => setHoveredHeatcell({ day, time: timeName, value: val })}
                          onMouseLeave={() => setHoveredHeatcell(null)}
                        >
                          <span className="cell-sr-only">{val}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend for Heatmap */}
            <div className="heatmap-legend">
              <span>Less Active</span>
              <div className="legend-cells">
                <div className="heatmap-cell intensity-1" />
                <div className="heatmap-cell intensity-2" />
                <div className="heatmap-cell intensity-3" />
                <div className="heatmap-cell intensity-4" />
                <div className="heatmap-cell intensity-5" />
              </div>
              <span>Highly Active</span>
            </div>

            {/* Heatmap Tooltip */}
            {hoveredHeatcell && (
              <div className="heatmap-tooltip">
                <strong>{hoveredHeatcell.day} ({hoveredHeatcell.time})</strong>
                <p>Intensity score: {hoveredHeatcell.value}/100</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Insights section */}
      <section className="analytics-insights-section glass-card">
        <div className="insight-icon-ring">
          <Award size={24} className="text-secondary" />
        </div>
        <div className="insight-content">
          <h4>AI Performance Insight: "Late Night Peak"</h4>
          <p>Alex, your study sessions show the highest memory recall scores (90%+) when conducted on **Tuesdays and Saturdays between 8:00 PM and 10:00 PM (Evening period)**. The AI suggests prioritizing complex problem-solving sets (e.g. Chemistry synthesis or Advanced Economics) during these high-intensity cycles.</p>
        </div>
      </section>
    </div>
  );
}
