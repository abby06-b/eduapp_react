import React, { useState } from 'react';
import { Sparkles, FileText, UploadCloud, Play, BarChart3, Clock, CheckCircle2, AlertCircle, ArrowRight, BrainCircuit, X, Check } from 'lucide-react';
import './Home.css';

export default function Home({ notes, setActiveTab }) {
  const [activeModal, setActiveModal] = useState(null); // 'summary' | 'quiz' | null
  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const getProcessingStatus = () => {
    const processing = notes.filter(n => n.status === 'processing').length;
    if (processing > 0) return `${processing} processing...`;
    return 'Idle (Synced)';
  };

  const handleOpenAction = (action) => {
    setActiveModal(action);
    setSelectedNoteId(notes[0]?.id || '');
    setQuizSubmitted(false);
    setAnswers({});
    setQuizScore(null);
  };

  const handleSelectNote = (e) => {
    setSelectedNoteId(e.target.value);
    setQuizSubmitted(false);
    setAnswers({});
    setQuizScore(null);
  };

  const handleAnswerSelect = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setAnswers({
      ...answers,
      [qIdx]: optIdx
    });
  };

  const handleSubmitQuiz = (questions) => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const selectedNote = notes.find(n => n.id === selectedNoteId);
  const selectedQuiz = selectedNote?.quiz || [
    { q: "What is the primary topic of the uploaded study document?", a: ["AI Integration in Learning", "Advanced Data Structures", "Introduction to Systems", "Overview of Core Principles"], correct: 0 },
    { q: "How can AI tools optimize standard reading strategies?", a: ["By creating concise study outlines", "By replacing physical books entirely", "By disabling human analysis", "By reducing core test scores"], correct: 0 }
  ];

  return (
    <div className="home-container animate-fade-in">
      {/* Page Header */}
      <div className="home-header">
        <h1 className="page-title">Welcome back, Alex! 👋</h1>
        <p className="page-subtitle">Here is what's happening with your educational space today.</p>
      </div>

      {/* Hero Welcome Banner */}
      <div className="welcome-banner">
        <div className="banner-content">
          <span className="banner-badge">
            <Sparkles size={14} /> AI Engine Active
          </span>
          <h2>Boost your learning speed by 3x with EduLearn AI</h2>
          <p>Upload your lecture notes, seminar slides, or readings. Our AI automatically extracts core concepts, structures summaries, and builds interactive study quizzes in seconds.</p>
          <button className="btn-primary" onClick={() => setActiveTab('upload')}>
            Upload New Notes <ArrowRight size={16} />
          </button>
        </div>
        <div className="banner-graphic">
          <div className="graphic-circle main-circle">
            <BrainCircuit size={48} className="brain-glow" />
          </div>
          <div className="graphic-circle ring-1"></div>
          <div className="graphic-circle ring-2"></div>
        </div>
      </div>

      {/* Dashboard Overview Cards */}
      <section className="overview-section">
        <h2 className="section-title"><Sparkles size={20} className="purple-glow" /> Dashboard Overview</h2>
        <div className="grid-cols-4">
          <div className="glass-card stat-card">
            <span className="stat-label">Notes Uploaded</span>
            <div className="stat-value-row">
              <span className="stat-value">{notes.length}</span>
              <span className="stat-trend positive">+12% wk</span>
            </div>
            <div className="stat-indicator-bar"><div className="fill" style={{ width: '70%' }}></div></div>
          </div>

          <div className="glass-card stat-card">
            <span className="stat-label">AI Processing Status</span>
            <div className="stat-value-row">
              <span className="stat-value text-small">{getProcessingStatus()}</span>
            </div>
            <div className="stat-status-badge">
              <span className={`status-dot ${getProcessingStatus() === 'Idle (Synced)' ? 'idle' : 'processing'}`}></span>
              <span>System Online</span>
            </div>
          </div>

          <div className="glass-card stat-card">
            <span className="stat-label">Learning Progress</span>
            <div className="stat-value-row">
              <span className="stat-value">78%</span>
              <span className="stat-trend neutral">Avg score</span>
            </div>
            <div className="stat-indicator-bar"><div className="fill purple" style={{ width: '78%' }}></div></div>
          </div>

          <div className="glass-card stat-card">
            <span className="stat-label">Weekly Activity</span>
            <div className="stat-value-row">
              <span className="stat-value">4.2 hrs</span>
              <span className="stat-trend positive">+0.8h today</span>
            </div>
            <div className="activity-sparkline">
              <div className="spark-bar" style={{ height: '30%' }}></div>
              <div className="spark-bar" style={{ height: '50%' }}></div>
              <div className="spark-bar" style={{ height: '40%' }}></div>
              <div className="spark-bar" style={{ height: '70%' }}></div>
              <div className="spark-bar active" style={{ height: '90%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Grid */}
      <section className="actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="grid-cols-4">
          <button className="glass-card action-card" onClick={() => setActiveTab('upload')}>
            <div className="action-icon-wrapper bg-blue">
              <UploadCloud size={20} />
            </div>
            <h3>Upload Notes</h3>
            <p>Add PDF, DOCX, or text notes to scan</p>
          </button>

          <button className="glass-card action-card" onClick={() => handleOpenAction('summary')}>
            <div className="action-icon-wrapper bg-purple">
              <FileText size={20} />
            </div>
            <h3>Generate AI Summary</h3>
            <p>Synthesize chapters into smart briefs</p>
          </button>

          <button className="glass-card action-card" onClick={() => handleOpenAction('quiz')}>
            <div className="action-icon-wrapper bg-pink">
              <BrainCircuit size={20} />
            </div>
            <h3>Create Quiz</h3>
            <p>Generate interactive test questions</p>
          </button>

          <button className="glass-card action-card" onClick={() => setActiveTab('analytics')}>
            <div className="action-icon-wrapper bg-cyan">
              <BarChart3 size={20} />
            </div>
            <h3>View Analytics</h3>
            <p>Explore your study statistics</p>
          </button>
        </div>
      </section>

      {/* Recent Uploads & Study Log */}
      <section className="recent-section">
        <div className="recent-header-row">
          <h2 className="section-title"><Clock size={20} /> Recent Uploads</h2>
          <button className="btn-secondary btn-small" onClick={() => setActiveTab('upload')}>View All Notes</button>
        </div>
        
        <div className="glass-card recent-list-card">
          {notes.length === 0 ? (
            <div className="empty-recent">
              <UploadCloud size={36} className="text-light" />
              <p>No notes uploaded yet. Start by uploading one!</p>
            </div>
          ) : (
            <div className="recent-list">
              {notes.slice(0, 3).map((note) => (
                <div key={note.id} className="recent-item">
                  <div className="recent-item-info">
                    <div className="recent-item-icon">
                      <FileText size={18} />
                    </div>
                    <div className="recent-text">
                      <h4>{note.name}</h4>
                      <p>{note.size} • Uploaded {note.timestamp}</p>
                    </div>
                  </div>
                  <div className="recent-item-actions">
                    <span className={`status-tag ${note.status}`}>
                      {note.status === 'completed' ? (
                        <>
                          <CheckCircle2 size={12} /> Ready
                        </>
                      ) : (
                        <>
                          <span className="dot-blink" /> Analyzing
                        </>
                      )}
                    </span>
                    <button className="btn-secondary btn-icon-only" title="View Summary" onClick={() => { setSelectedNoteId(note.id); handleOpenAction('summary'); }}>
                      <FileText size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* AI Summary Modal */}
      {activeModal === 'summary' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-card glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-title">
                <BrainCircuit className="text-purple" size={24} />
                <h3>AI Document Summarizer</h3>
              </div>
              <button className="modal-close" onClick={() => setActiveModal(null)}><X size={18} /></button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="note-select">Select a study document to summarize:</label>
                <select id="note-select" value={selectedNoteId} onChange={handleSelectNote}>
                  {notes.map(n => (
                    <option key={n.id} value={n.id}>{n.name}</option>
                  ))}
                </select>
              </div>

              {selectedNote ? (
                <div className="summary-result-box">
                  <div className="summary-result-header">
                    <h4>AI Summary: {selectedNote.name}</h4>
                    <span className="summary-date">Generated just now</span>
                  </div>
                  <div className="summary-result-content">
                    <p className="summary-highlight">{selectedNote.summary || 'Extracting primary notes content and compiling structural concepts...'}</p>
                    {selectedNote.bullets && selectedNote.bullets.length > 0 ? (
                      <ul>
                        {selectedNote.bullets.map((bullet, idx) => {
                          const splitIdx = bullet.indexOf(':');
                          if (splitIdx !== -1) {
                            const title = bullet.substring(0, splitIdx + 1);
                            const body = bullet.substring(splitIdx + 1);
                            return (
                              <li key={idx}><strong>{title}</strong>{body}</li>
                            );
                          }
                          return <li key={idx}>{bullet}</li>;
                        })}
                      </ul>
                    ) : (
                      <ul>
                        <li><strong>Core Principle:</strong> High-efficiency content categorization structures information into core knowledge pillars.</li>
                        <li><strong>Key Takeaway 1:</strong> Systemic organization decreases recall load by up to 40% during exams.</li>
                        <li><strong>Key Takeaway 2:</strong> Re-evaluating summaries via active testing solidifies synaptic links in long-term memory.</li>
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                <p className="no-docs-message">Please upload notes first to generate summaries.</p>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setActiveModal(null)}>Close</button>
              <button className="btn-primary" onClick={() => alert('Summary saved to notebook!')} disabled={!selectedNote}>
                Save to Notebook
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Modal */}
      {activeModal === 'quiz' && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="modal-card glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-title">
                <BrainCircuit className="text-pink" size={24} />
                <h3>AI Active Recall Quiz</h3>
              </div>
              <button className="modal-close" onClick={() => setActiveModal(null)}><X size={18} /></button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="quiz-note-select">Choose document source for quiz:</label>
                <select id="quiz-note-select" value={selectedNoteId} onChange={handleSelectNote}>
                  {notes.map(n => (
                    <option key={n.id} value={n.id}>{n.name}</option>
                  ))}
                </select>
              </div>

              {selectedNote ? (
                <div className="quiz-content-area">
                  <p className="quiz-intro-text">Answer the questions below generated from <strong>{selectedNote.name}</strong>.</p>
                  
                  <div className="quiz-questions-list">
                    {selectedQuiz.map((item, qIdx) => (
                      <div key={qIdx} className="quiz-question-item">
                        <p className="question-text">{qIdx + 1}. {item.q}</p>
                        <div className="quiz-options">
                          {item.a.map((opt, optIdx) => {
                            const isSelected = answers[qIdx] === optIdx;
                            const isCorrect = item.correct === optIdx;
                            let optionClass = 'quiz-option';
                            if (isSelected) optionClass += ' selected';
                            if (quizSubmitted) {
                              if (isCorrect) optionClass += ' correct';
                              else if (isSelected) optionClass += ' incorrect';
                            }
                            return (
                              <button
                                key={optIdx}
                                className={optionClass}
                                onClick={() => handleAnswerSelect(qIdx, optIdx)}
                                disabled={quizSubmitted}
                              >
                                <span className="option-letter">{String.fromCharCode(65 + optIdx)}</span>
                                <span className="option-val">{opt}</span>
                                {quizSubmitted && isCorrect && <Check size={14} className="correct-check" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {quizSubmitted && (
                    <div className="quiz-results-banner">
                      <div className="result-score-box">
                        <span className="result-number">{quizScore} / {selectedQuiz.length}</span>
                        <span className="result-label">Correct Answers</span>
                      </div>
                      <div className="result-message">
                        {quizScore === selectedQuiz.length ? (
                          <p>🏆 <strong>Perfect Score!</strong> Excellent comprehension of this material!</p>
                        ) : quizScore > 0 ? (
                          <p>👍 <strong>Nice Effort!</strong> Keep studying to lock in all details.</p>
                        ) : (
                          <p>📚 <strong>Review Needed.</strong> Read through the summary again before retrying.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="no-docs-message">Please upload notes first to build a quiz.</p>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setActiveModal(null)}>Cancel</button>
              {!quizSubmitted ? (
                <button
                  className="btn-primary"
                  onClick={() => handleSubmitQuiz(selectedQuiz)}
                  disabled={!selectedNote || Object.keys(answers).length < selectedQuiz.length}
                >
                  Submit Answers
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={() => {
                    setQuizSubmitted(false);
                    setAnswers({});
                    setQuizScore(null);
                  }}
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
