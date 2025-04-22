import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hologramRotation, setHologramRotation] = useState(0);
  const [pulseEffect, setPulseEffect] = useState(false);

  useEffect(() => {
    // Hologram rotation effect
    const rotationInterval = setInterval(() => {
      setHologramRotation(prev => (prev + 1) % 360);
    }, 50);

    // Pulse effect for top ranks
    const pulseInterval = setInterval(() => {
      setPulseEffect(prev => !prev);
    }, 1500);
    
    // Fetch leaderboard data with simulated delay
    setTimeout(() => {
      fetch('https://probable-pancake-5gjp477j9qcqp6-8000.app.github.dev/api/leaderboard/')
        .then(response => response.json())
        .then(data => {
          // Sort by score in descending order
          const sortedData = [...data].sort((a, b) => b.score - a.score);
          setLeaderboard(sortedData);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching leaderboard:', error);
          setLoading(false);
        });
    }, 1200);

    return () => {
      clearInterval(rotationInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  const getScoreColor = (score) => {
    if (score >= 95) return 'var(--neon-green)';
    if (score >= 80) return 'var(--neon-blue)';
    if (score >= 60) return 'var(--neon-yellow)';
    return 'var(--neon-red)';
  };

  const getRankStyle = (index) => {
    if (index === 0) return 'rank-first';
    if (index === 1) return 'rank-second';
    if (index === 2) return 'rank-third';
    return '';
  };

  return (
    <div className="cyber-component">
      <h1 className="text-primary" data-text="Leaderboard">Neural Link Leaderboard</h1>
      
      {loading ? (
        <div className="hologram-loading">
          <div className="hologram-container" style={{ transform: `rotateY(${hologramRotation}deg)` }}>
            <div className="hologram-trophy">🏆</div>
            <div className="hologram-rings">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="hologram-ring" style={{
                  animationDelay: `${i * 0.5}s`,
                  width: `${(i + 1) * 20}px`,
                  height: `${(i + 1) * 20}px`
                }}></div>
              ))}
            </div>
          </div>
          <div className="loading-text">CALCULATING NEURAL PERFORMANCE METRICS</div>
        </div>
      ) : leaderboard.length ? (
        <div className="cyber-leaderboard-container">
          <div className="top-performers">
            {leaderboard.slice(0, 3).map((entry, index) => (
              <div 
                key={entry._id} 
                className={`podium-rank ${getRankStyle(index)} ${index === 0 && pulseEffect ? 'pulse' : ''}`}
              >
                <div className="rank-number">{index + 1}</div>
                <div className="rank-avatar">
                  <div className="avatar-frame">
                    <div className="avatar-content">{(entry.user.username || entry.user || "").substring(0, 1).toUpperCase()}</div>
                  </div>
                </div>
                <div className="rank-name">{entry.user.username || entry.user || "ANONYMOUS"}</div>
                <div className="rank-score" style={{color: getScoreColor(entry.score)}}>
                  {entry.score}
                  <div className="score-bar">
                    <div className="score-fill" style={{
                      width: `${entry.score}%`,
                      backgroundColor: getScoreColor(entry.score)
                    }}></div>
                  </div>
                </div>
                <div className="rank-badge">
                  {index === 0 ? 'PRIME' : index === 1 ? 'ELITE' : 'ENHANCED'}
                </div>
              </div>
            ))}
          </div>
          
          <div className="leaderboard-table-container">
            <div className="cyber-panel">
              <div className="panel-header">
                <span className="panel-title">NEURAL PERFORMANCE INDEX</span>
                <div className="panel-controls">
                  <span className="panel-dot"></span>
                  <span className="panel-dot"></span>
                  <span className="panel-dot"></span>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>User</th>
                      <th>Neural Score</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((entry, index) => (
                      <tr key={entry._id} className={getRankStyle(index)}>
                        <td>
                          <div className="rank-cell">
                            <span className="rank-number">{index + 1}</span>
                            {index < 3 && <span className="rank-medal">
                              {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                            </span>}
                          </div>
                        </td>
                        <td>
                          <span className="username">{entry.user.username || entry.user || "ANONYMOUS"}</span>
                        </td>
                        <td>
                          <div className="score-display">
                            <span className="score-value" style={{color: getScoreColor(entry.score)}}>
                              {entry.score}
                            </span>
                            <div className="score-bar-small">
                              <div className="score-fill-small" style={{
                                width: `${entry.score}%`,
                                backgroundColor: getScoreColor(entry.score)
                              }}></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="user-status">
                            <span className="status-light online"></span>
                            <span className="status-text">{index === 0 ? 'APEX' : index < 3 ? 'PRIME' : index < 10 ? 'AUGMENTED' : 'BASELINE'}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          <div className="cyber-stats">
            <div className="stat-box">
              <div className="stat-title">TOTAL COMPETITORS</div>
              <div className="stat-value">{leaderboard.length}</div>
            </div>
            <div className="stat-box">
              <div className="stat-title">AVG NEURAL SCORE</div>
              <div className="stat-value">
                {Math.round(leaderboard.reduce((acc, curr) => acc + curr.score, 0) / leaderboard.length)}
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-title">PRIME STATUS THRESHOLD</div>
              <div className="stat-value">{leaderboard.length > 0 ? leaderboard[0].score - 5 : '??'}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data">
          <div className="glitch-text">LEADERBOARD MATRIX EMPTY</div>
          <p>No neural performance data available. Awaiting competitor synchronization.</p>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;