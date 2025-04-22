import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './cyberpunk.css'; // Import the cyberpunk styles
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Random glitch effect
    const glitchTimer = setInterval(() => {
      const shouldGlitch = Math.random() < 0.1;
      if (shouldGlitch) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 200 + Math.random() * 500);
      }
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(glitchTimer);
    };
  }, []);

  return (
    <Router>
      <div className={`App ${glitching ? 'glitching' : ''}`}>
        <header className="App-header">
          <div className="App-header-left">
            <img src="/octofitapp-small.png" alt="OctoFit Logo" className="App-logo" />
          </div>
          <div className="App-header-title">
            <h1 data-text="OctoFit Tracker">OctoFit Tracker</h1>
            <div className="subtitle">NEXGEN FITNESS QUANTIFICATION SYSTEM</div>
          </div>
          <div className="App-header-right">
            <div className="cyber-time">{currentTime.toLocaleTimeString()}</div>
            <div className="system-status">
              <span className="status-indicator online"></span>
              SYSTEM ONLINE
            </div>
          </div>
        </header>

        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">OCTO:NET</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    <span className="nav-icon">⚡</span> Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    <span className="nav-icon">🏆</span> Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    <span className="nav-icon">👥</span> Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    <span className="nav-icon">👤</span> Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    <span className="nav-icon">💪</span> Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="content-container">
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="close"></span>
              <span className="minimize"></span>
              <span className="maximize"></span>
            </div>
            <div className="terminal-title">octofit-sys:~$ fitness.monitor --active</div>
          </div>

          <div className="battery-level">
            <div className="battery-level-fill"></div>
          </div>

          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={
              <div className="home-container">
                <h1 className="text-primary" data-text="OctoFit Tracker">Welcome to OctoFit Tracker</h1>
                <div className="cyber-grid">
                  <div className="cyber-grid-item">
                    <h3>Neural Link Status</h3>
                    <div className="cyber-badge">ACTIVE</div>
                    <p>Biometric monitoring online.</p>
                  </div>
                  <div className="cyber-grid-item">
                    <h3>Fitness Protocol</h3>
                    <div className="cyber-badge">OPTIMIZING</div>
                    <p>Adjusting for maximum performance.</p>
                  </div>
                  <div className="cyber-grid-item">
                    <h3>Network Status</h3>
                    <div className="cyber-badge">SECURE</div>
                    <p>End-to-end encrypted data transfer.</p>
                  </div>
                </div>
                <p className="lead">Track your fitness metrics, join virtual teams, and compete on the global leaderboard through our neural-enhanced biometric tracking system.</p>
                
                <div className="terminal-section">
                  <div className="terminal-header">
                    <div className="terminal-controls">
                      <span className="close"></span>
                      <span className="minimize"></span>
                      <span className="maximize"></span>
                    </div>
                    <div className="terminal-title">octofit@system:~$</div>
                  </div>
                  <div className="terminal-content">
                    <p>> Initializing OctoFit systems...</p>
                    <p>> Biometric sensors connected</p>
                    <p>> Neural link established</p>
                    <p>> Welcome, user. Your fitness journey awaits.</p>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
        
        <div className="status-bar">
          <span>SYS.VER 2.5.7</span>
          <span>UPTIME: {Math.floor(Math.random() * 30) + 10}d:16h:43m:12s</span>
          <span className="status-ping">PING: {Math.floor(Math.random() * 20) + 10}ms</span>
        </div>
      </div>
    </Router>
  );
}

export default App;
