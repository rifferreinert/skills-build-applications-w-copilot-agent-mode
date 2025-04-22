import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTeam, setActiveTeam] = useState(null);
  const [synapseLines, setSynapseLines] = useState([]);

  useEffect(() => {
    // Generate random synapse connection lines for neural network visualization
    const generateSynapseLines = () => {
      const lines = [];
      for (let i = 0; i < 20; i++) {
        lines.push({
          x1: Math.random() * 100,
          y1: Math.random() * 100,
          x2: Math.random() * 100,
          y2: Math.random() * 100,
          opacity: Math.random() * 0.5 + 0.2,
          duration: Math.random() * 4 + 1
        });
      }
      return lines;
    };

    setSynapseLines(generateSynapseLines());

    // Fetch teams data with simulated delay for cyberpunk effect
    setTimeout(() => {
      fetch('https://probable-pancake-5gjp477j9qcqp6-8000.app.github.dev/api/teams/')
        .then(response => response.json())
        .then(data => {
          // Enhance the data with cyberpunk elements
          const enhancedData = data.map(team => ({
            ...team,
            synergyLevel: Math.floor(Math.random() * 100),
            neuralDensity: Math.floor(Math.random() * 100) + 50,
            linkStrength: Math.floor(Math.random() * 5) + 1,
            teamCode: `TM-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
          }));
          setTeams(enhancedData);
          setLoading(false);
          if (enhancedData.length > 0) {
            setActiveTeam(enhancedData[0]);
          }
        })
        .catch(error => {
          console.error('Error fetching teams:', error);
          setLoading(false);
        });
    }, 1800);

    // Regenerate synapse lines periodically
    const intervalId = setInterval(() => {
      setSynapseLines(generateSynapseLines());
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Calculate synapse connection points based on team's neural density
  const getSynapsePoints = (team) => {
    if (!team) return [];
    
    const points = [];
    const numPoints = Math.floor(team.neuralDensity / 10);
    
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 5 + 2,
        pulseDelay: i * 0.2
      });
    }
    
    return points;
  };

  return (
    <div className="cyber-component">
      <h1 className="text-primary" data-text="Neural Collectives">Neural Collectives</h1>
      
      {loading ? (
        <div className="cyber-loading">
          <div className="neural-network-loading">
            <div className="neural-container">
              {synapseLines.map((line, i) => (
                <svg key={i} className="synapse-line" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  opacity: line.opacity,
                  animation: `pulse ${line.duration}s infinite`
                }}>
                  <line 
                    x1={`${line.x1}%`} 
                    y1={`${line.y1}%`} 
                    x2={`${line.x2}%`} 
                    y2={`${line.y2}%`} 
                    style={{
                      stroke: 'var(--neon-blue)',
                      strokeWidth: '1px'
                    }} 
                  />
                </svg>
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <div 
                  key={i}
                  className="synapse-node"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="loading-text">
            SYNCHRONIZING NEURAL COLLECTIVES
            <span className="loading-dot">.</span>
            <span className="loading-dot">.</span>
            <span className="loading-dot">.</span>
          </div>
        </div>
      ) : teams.length ? (
        <div className="cyber-teams-container">
          <div className="cyber-grid teams-grid">
            {teams.map(team => (
              <div 
                key={team._id || team.id} 
                className={`cyber-grid-item team-card ${activeTeam && team._id === activeTeam._id ? 'team-active' : ''}`}
                onClick={() => setActiveTeam(team)}
              >
                <div className="team-card-header">
                  <h3>{team.name}</h3>
                  <div className="team-code">{team.teamCode}</div>
                </div>
                <div className="team-metrics">
                  <div className="metric-item">
                    <div className="metric-label">MEMBERS</div>
                    <div className="metric-value">{team.members ? team.members.length : 0}</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">SYNERGY</div>
                    <div className="metric-value">{team.synergyLevel}%</div>
                  </div>
                  <div className="metric-item">
                    <div className="metric-label">NEURAL DENSITY</div>
                    <div className="metric-value">{team.neuralDensity}</div>
                  </div>
                </div>
                <div className="team-link-strength">
                  <div className="link-label">LINK STRENGTH</div>
                  <div className="link-indicators">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`link-dot ${i < team.linkStrength ? 'active' : ''}`}
                      ></span>
                    ))}
                  </div>
                </div>
                <div className="mini-neural-map">
                  {[...Array(10)].map((_, i) => {
                    const randomX = Math.random() * 100;
                    const randomY = Math.random() * 100;
                    return (
                      <div 
                        key={i} 
                        className="mini-node"
                        style={{
                          left: `${randomX}%`,
                          top: `${randomY}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      ></div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {activeTeam && (
            <div className="team-detail-panel">
              <div className="detail-header">
                <h2>{activeTeam.name}</h2>
                <div className="detail-id">ID: {activeTeam.teamCode}</div>
              </div>
              
              <div className="neural-connection-display">
                <div className="neural-map">
                  {getSynapsePoints(activeTeam).map((point, i) => (
                    <div 
                      key={i}
                      className="neural-point"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        width: `${point.size}px`,
                        height: `${point.size}px`,
                        animationDelay: `${point.pulseDelay}s`
                      }}
                    ></div>
                  ))}
                  
                  {synapseLines.slice(0, 10).map((line, i) => (
                    <svg key={i} className="synapse-line detail-synapse">
                      <line 
                        x1={`${line.x1}%`} 
                        y1={`${line.y1}%`} 
                        x2={`${line.x2}%`} 
                        y2={`${line.y2}%`} 
                      />
                    </svg>
                  ))}
                </div>
                <div className="neural-stats">
                  <div className="stat-item">
                    <div className="stat-label">Cognitive Sync</div>
                    <div className="stat-value">{activeTeam.synergyLevel}%</div>
                    <div className="stat-bar">
                      <div className="stat-fill" style={{ width: `${activeTeam.synergyLevel}%` }}></div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Neural Density</div>
                    <div className="stat-value">{activeTeam.neuralDensity}</div>
                    <div className="stat-bar">
                      <div className="stat-fill" style={{ width: `${(activeTeam.neuralDensity / 150) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-label">Link Stability</div>
                    <div className="stat-value">{activeTeam.linkStrength * 20}%</div>
                    <div className="stat-bar">
                      <div className="stat-fill" style={{ width: `${activeTeam.linkStrength * 20}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="team-members-panel">
                <div className="panel-header">SYNCHRONIZED MEMBERS</div>
                <div className="members-container">
                  {/* Placeholder for actual team members data */}
                  {Array.from({ length: Math.max(1, activeTeam.members ? activeTeam.members.length : 0) }).map((_, i) => (
                    <div key={i} className="member-item">
                      <div className="member-avatar">{String.fromCharCode(65 + i)}</div>
                      <div className="member-details">
                        <div className="member-name">User_{Math.random().toString(36).substring(2, 7)}</div>
                        <div className="member-role">Neural {i === 0 ? 'Lead' : 'Member'}</div>
                      </div>
                      <div className="member-status">
                        <span className="status-indicator online"></span>
                        SYNCED
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="no-data">
          <div className="glitch-text">NO NEURAL COLLECTIVES FOUND</div>
          <p>Neural network awaiting collective formation. Initialize team sync protocol to continue.</p>
        </div>
      )}
    </div>
  );
}

export default Teams;