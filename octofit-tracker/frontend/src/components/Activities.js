import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanLine, setScanLine] = useState(0);
  const [dataStream, setDataStream] = useState([]);

  useEffect(() => {
    // Visual effect for data streaming
    const interval = setInterval(() => {
      setScanLine(prev => (prev + 1) % 100);
      
      if (dataStream.length < 20) {
        const newLine = Array(30).fill(0).map(() => Math.round(Math.random())).join('');
        setDataStream(prev => [...prev, newLine]);
      }
    }, 200);

    // Simulate data loading
    setTimeout(() => {
      fetch('https://probable-pancake-5gjp477j9qcqp6-8000.app.github.dev/api/activities/')
        .then(response => response.json())
        .then(data => {
          setActivities(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching activities:', error);
          setLoading(false);
        });
    }, 1500);

    return () => clearInterval(interval);
  }, [dataStream.length]);

  return (
    <div className="cyber-component">
      <h1 className="text-primary" data-text="Activities">Activities</h1>
      
      {loading ? (
        <div className="cyber-loading">
          <div className="data-stream">
            {dataStream.map((line, i) => (
              <div key={i} className="data-line" style={{opacity: 1 - i/20}}>
                {line}
              </div>
            ))}
          </div>
          <div className="loading-text">
            ACCESSING NEURAL FITNESS DATABASE
            <span className="loading-dot">.</span>
            <span className="loading-dot">.</span>
            <span className="loading-dot">.</span>
          </div>
          <div className="scan-line" style={{top: `${scanLine}%`}}></div>
        </div>
      ) : activities.length ? (
        <div className="cyber-data-section">
          <div className="cyber-panel">
            <div className="panel-header">
              <span className="panel-title">ACTIVITY LOG</span>
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
                    <th>Activity Type</th>
                    <th>Duration</th>
                    <th>User</th>
                    <th>Neural Link</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map(activity => (
                    <tr key={activity._id}>
                      <td>
                        <span className="activity-icon">
                          {activity.activity_type === 'Running' ? '🏃‍♂️' : 
                           activity.activity_type === 'Cycling' ? '🚴‍♂️' : 
                           activity.activity_type === 'Swimming' ? '🏊‍♂️' : 
                           activity.activity_type === 'Crossfit' ? '⚡' : 
                           activity.activity_type === 'Strength' ? '💪' : '🔄'}
                        </span>
                        <span className="activity-type">{activity.activity_type}</span>
                      </td>
                      <td>
                        <div className="cyber-time-display">
                          {activity.duration}
                        </div>
                      </td>
                      <td>
                        {typeof activity.user === 'string' ? 
                          <div className="cyber-badge">USER#{activity.user.substring(0, 5)}</div> : 
                          <div className="cyber-badge">ANONYMOUS</div>
                        }
                      </td>
                      <td>
                        <div className="neural-link-status">
                          <span className="status-light online"></span>
                          <span className="status-text">ACTIVE</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="cyber-stats">
            <div className="stat-box">
              <div className="stat-title">Total Sessions</div>
              <div className="stat-value">{activities.length}</div>
            </div>
            <div className="stat-box">
              <div className="stat-title">Total Duration</div>
              <div className="stat-value">
                {activities.reduce((acc, curr) => {
                  const duration = curr.duration || "00:00:00";
                  const [hours, minutes] = duration.split(':').map(Number);
                  return acc + (hours || 0) * 60 + (minutes || 0);
                }, 0)} min
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-title">Neural Efficiency</div>
              <div className="stat-value">{Math.floor(Math.random() * 20) + 80}%</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data">
          <div className="glitch-text">NO ACTIVITY DATA DETECTED</div>
          <p>Neural link awaiting new input. Please initiate physical activity sequence.</p>
        </div>
      )}
    </div>
  );
}

export default Activities;