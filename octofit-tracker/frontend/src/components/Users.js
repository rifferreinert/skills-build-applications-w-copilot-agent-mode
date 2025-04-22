import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    // Simulate neural scanning progress
    const scanInterval = setInterval(() => {
      if (scanProgress < 100) {
        setScanProgress(prev => {
          const increment = Math.floor(Math.random() * 5) + 1;
          return Math.min(prev + increment, 100);
        });
      } else {
        clearInterval(scanInterval);
      }
    }, 100);

    // Fetch users data with cyberpunk effect delay
    setTimeout(() => {
      fetch('https://probable-pancake-5gjp477j9qcqp6-8000.app.github.dev/api/users/')
        .then(response => response.json())
        .then(data => {
          // Add cyberpunk attributes to each user
          const enhancedUsers = data.map(user => ({
            ...user,
            neuralLevel: Math.floor(Math.random() * 10) + 1,
            augmentations: Math.floor(Math.random() * 5),
            syncStatus: Math.random() > 0.2 ? 'CONNECTED' : 'OFFLINE',
            accessLevel: ['CIVILIAN', 'ENHANCED', 'PRIME', 'ADMIN'][Math.floor(Math.random() * 4)],
            lastSync: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString()
          }));
          setUsers(enhancedUsers);
          setLoading(false);
          if (enhancedUsers.length > 0) {
            setSelectedUser(enhancedUsers[0]);
          }
        })
        .catch(error => {
          console.error('Error fetching users:', error);
          setLoading(false);
        });
    }, 2000);

    return () => clearInterval(scanInterval);
  }, [scanProgress]);

  const augmentationTypes = [
    'Neural Enhancer',
    'Synaptic Accelerator',
    'Cognitive Amplifier',
    'Muscle Optimizer',
    'Cardio Enhancer'
  ];

  const getRandomAugmentations = (count) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      const randIndex = Math.floor(Math.random() * augmentationTypes.length);
      result.push({
        name: augmentationTypes[randIndex],
        level: Math.floor(Math.random() * 5) + 1,
        efficiency: Math.floor(Math.random() * 30) + 70
      });
    }
    return result;
  };

  const getAugmentationIcon = (augName) => {
    if (augName.includes('Neural')) return '🧠';
    if (augName.includes('Synaptic')) return '⚡';
    if (augName.includes('Cognitive')) return '💭';
    if (augName.includes('Muscle')) return '💪';
    if (augName.includes('Cardio')) return '❤️';
    return '🔧';
  };

  return (
    <div className="cyber-component">
      <h1 className="text-primary" data-text="Neural Users">Neural Users</h1>
      
      {loading ? (
        <div className="cyber-loading">
          <div className="scan-container">
            <div className="scan-progress-bar">
              <div 
                className="scan-progress-fill" 
                style={{width: `${scanProgress}%`}}
              ></div>
            </div>
            <div className="scan-text">
              NEURAL NETWORK SCAN: {scanProgress}% COMPLETE
            </div>
            <div className="scan-details">
              IDENTIFYING CONNECTED USERS...
              <div className="scan-log">
                {scanProgress > 20 && <div className="log-entry">{'>'} Initializing user database connection</div>}
                {scanProgress > 40 && <div className="log-entry">{'>'} Scanning biometric signatures</div>}
                {scanProgress > 60 && <div className="log-entry">{'>'} Authenticating neural links</div>}
                {scanProgress > 80 && <div className="log-entry">{'>'} Verifying user augmentation profiles</div>}
                {scanProgress === 100 && <div className="log-entry success">{'>'} User data access granted</div>}
              </div>
            </div>
          </div>
        </div>
      ) : users.length ? (
        <div className="cyber-users-grid">
          <div className="users-list-panel">
            <div className="panel-header">
              <span className="panel-title">REGISTERED USERS</span>
              <div className="panel-stats">
                <span>{users.length} IDENTIFIED</span>
                <span>{users.filter(u => u.syncStatus === 'CONNECTED').length} CONNECTED</span>
              </div>
            </div>
            
            <div className="users-table-container">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Username</th>
                      <th>Neural Level</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr 
                        key={user._id || user.id} 
                        className={`user-row ${selectedUser && (user._id === selectedUser._id) ? 'selected' : ''} ${user.syncStatus === 'OFFLINE' ? 'offline' : ''}`}
                        onClick={() => setSelectedUser(user)}
                      >
                        <td>
                          <div className="user-id">#{(user._id || user.id || "").toString().substring(0, 5)}</div>
                        </td>
                        <td>
                          <div className="user-name">
                            <span className="access-badge" data-level={user.accessLevel}></span>
                            {user.username}
                          </div>
                        </td>
                        <td>
                          <div className="neural-level">
                            {[...Array(10)].map((_, i) => (
                              <span 
                                key={i} 
                                className={`level-dot ${i < user.neuralLevel ? 'active' : ''}`}
                              ></span>
                            ))}
                          </div>
                        </td>
                        <td>
                          <div className={`status-indicator ${user.syncStatus.toLowerCase()}`}>
                            {user.syncStatus}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {selectedUser && (
            <div className="user-detail-panel">
              <div className="detail-header">
                <div className="user-avatar">{selectedUser.username.charAt(0).toUpperCase()}</div>
                <div className="user-titles">
                  <h2 className="username">{selectedUser.username}</h2>
                  <div className="user-email">{selectedUser.email}</div>
                  <div className="user-access">
                    <span className="access-level">{selectedUser.accessLevel}</span>
                    <span className="neural-badge">LEVEL {selectedUser.neuralLevel}</span>
                  </div>
                </div>
                <div className="sync-status">
                  <div className="status-label">NEURAL SYNC</div>
                  <div className={`sync-indicator ${selectedUser.syncStatus.toLowerCase()}`}>
                    <span className="status-dot"></span>
                    {selectedUser.syncStatus}
                  </div>
                  <div className="last-sync">LAST: {new Date(selectedUser.lastSync).toLocaleTimeString()}</div>
                </div>
              </div>
              
              <div className="neural-profile">
                <h3>NEURAL PROFILE</h3>
                <div className="brain-scan">
                  <div className="scan-overlay">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i}
                        className="brain-node"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          opacity: Math.random() * 0.7 + 0.3
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="scan-metrics">
                    <div className="metric">
                      <div className="metric-name">NEURAL DENSITY</div>
                      <div className="metric-value">{70 + selectedUser.neuralLevel * 3}%</div>
                    </div>
                    <div className="metric">
                      <div className="metric-name">SYNC QUALITY</div>
                      <div className="metric-value">{selectedUser.syncStatus === 'CONNECTED' ? '98%' : 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="augmentations-panel">
                <h3>AUGMENTATIONS ({selectedUser.augmentations})</h3>
                <div className="augmentations-list">
                  {getRandomAugmentations(selectedUser.augmentations).map((aug, idx) => (
                    <div key={idx} className="augmentation-item">
                      <div className="aug-icon">{getAugmentationIcon(aug.name)}</div>
                      <div className="aug-details">
                        <div className="aug-name">{aug.name}</div>
                        <div className="aug-level">
                          <span className="level-label">LVL {aug.level}</span>
                          <div className="level-bar">
                            <div 
                              className="level-fill" 
                              style={{width: `${aug.level * 20}%`}}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="aug-efficiency">{aug.efficiency}%</div>
                    </div>
                  ))}
                  {selectedUser.augmentations === 0 && (
                    <div className="no-augmentations">
                      NO AUGMENTATIONS DETECTED
                    </div>
                  )}
                </div>
              </div>
              
              <div className="user-actions">
                <button className="cyber-button">NEURAL SYNC</button>
                <button className="cyber-button secondary">AUGMENTATION STATUS</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="no-data">
          <div className="glitch-text">NO USERS DETECTED</div>
          <p>Neural network cannot locate connected users. Initiate new user registration protocol.</p>
        </div>
      )}
    </div>
  );
}

export default Users;