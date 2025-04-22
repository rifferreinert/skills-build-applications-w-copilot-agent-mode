import React, { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [dataMatrix, setDataMatrix] = useState([]);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    // Generate data matrix for loading effect
    const generateMatrix = () => {
      const matrix = [];
      for (let i = 0; i < 15; i++) {
        matrix.push(Array.from({length: 40}, () => Math.floor(Math.random() * 2)));
      }
      return matrix;
    };

    setDataMatrix(generateMatrix());

    // Animation phase for cyberpunk effects
    const phaseInterval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 3);
    }, 500);

    // Fetch workouts data with cyberpunk loading delay
    setTimeout(() => {
      fetch('https://probable-pancake-5gjp477j9qcqp6-8000.app.github.dev/api/workouts/')
        .then(response => response.json())
        .then(data => {
          // Enhanced data with cyberpunk workout attributes
          const enhancedData = data.map(workout => ({
            ...workout,
            neuralLoad: Math.floor(Math.random() * 100),
            augmentationLevel: Math.floor(Math.random() * 5) + 1,
            neurexEfficiency: Math.floor(Math.random() * 30) + 70,
            biometricSignature: [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase(),
            syntheticStrain: Math.floor(Math.random() * 10) + 1
          }));
          setWorkouts(enhancedData);
          setLoading(false);
          if (enhancedData.length > 0) {
            setSelectedWorkout(enhancedData[0]);
          }
        })
        .catch(error => {
          console.error('Error fetching workouts:', error);
          setLoading(false);
        });
    }, 2500);

    return () => clearInterval(phaseInterval);
  }, []);

  // Generate effect for biometric pattern visualization
  const getBiometricPattern = (signature) => {
    if (!signature) return [];
    
    // Convert hex signature to pattern points
    const pattern = [];
    for (let i = 0; i < signature.length - 1; i += 2) {
      const hex = signature.substring(i, i + 2);
      const value = parseInt(hex, 16);
      pattern.push({
        x: (i / signature.length) * 100,
        y: (value / 255) * 100,
        intensity: (value % 16) / 16
      });
    }
    
    return pattern;
  };

  return (
    <div className="cyber-component">
      <h1 className="text-primary" data-text="Neural Training Protocols">Neural Training Protocols</h1>
      
      {loading ? (
        <div className="cyber-loading">
          <div className="matrix-container">
            <div className="data-matrix">
              {dataMatrix.map((row, i) => (
                <div key={i} className="matrix-row">
                  {row.map((cell, j) => (
                    <span 
                      key={j} 
                      className={`matrix-cell ${cell === 1 ? 'active' : ''} ${(i + j) % 3 === animationPhase ? 'pulse' : ''}`}
                    >
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="loading-overlay">
              <div className="loading-circle">
                <div className="circle-segment" style={{transform: `rotate(${animationPhase * 120}deg)`}}></div>
              </div>
              <div className="loading-text">
                COMPILING NEURAL TRAINING PROTOCOLS
              </div>
            </div>
          </div>
        </div>
      ) : workouts.length ? (
        <div className="cyber-workouts-container">
          <div className="workouts-grid">
            {workouts.map(workout => (
              <div 
                key={workout._id || workout.id} 
                className={`workout-card ${selectedWorkout && workout._id === selectedWorkout._id ? 'selected' : ''}`}
                onClick={() => setSelectedWorkout(workout)}
              >
                <div className="workout-header">
                  <div className="workout-name">{workout.name}</div>
                  <div className="workout-badge">N-LVL {workout.augmentationLevel}</div>
                </div>
                
                <div className="workout-metrics">
                  <div className="metric">
                    <div className="metric-label">NEURAL LOAD</div>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill" 
                        style={{
                          width: `${workout.neuralLoad}%`,
                          backgroundColor: workout.neuralLoad > 80 ? 'var(--neon-red)' : 
                                          workout.neuralLoad > 50 ? 'var(--neon-yellow)' : 
                                          'var(--neon-green)'
                        }}
                      ></div>
                    </div>
                    <div className="metric-value">{workout.neuralLoad}%</div>
                  </div>
                  
                  <div className="workout-signature">
                    <div className="signature-label">BIOMETRIC SYNC</div>
                    <div className="signature-code">#{workout.biometricSignature}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {selectedWorkout && (
            <div className="workout-detail">
              <div className="detail-header">
                <h2>{selectedWorkout.name}</h2>
                <div className="protocol-id">PROTOCOL #{selectedWorkout.biometricSignature.substring(0, 6)}</div>
              </div>
              
              <div className="bio-signature-display">
                <div className="display-header">NEURAL STRAIN MAPPING</div>
                <div className="signature-visual">
                  <svg className="signature-graph" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polyline 
                      points={getBiometricPattern(selectedWorkout.biometricSignature)
                        .map(point => `${point.x},${point.y}`).join(' ')}
                      className="signature-line"
                    />
                    
                    {getBiometricPattern(selectedWorkout.biometricSignature).map((point, i) => (
                      <circle 
                        key={i}
                        cx={point.x}
                        cy={point.y}
                        r={1 + point.intensity * 2}
                        className="signature-point"
                        style={{
                          animation: `pulse ${1 + point.intensity}s infinite`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </svg>
                </div>
              </div>
              
              <div className="workout-description">
                <div className="description-header">PROTOCOL DETAILS</div>
                <div className="description-content">
                  {selectedWorkout.description || "A neural-optimized training protocol designed to enhance both physical performance and neural connectivity. This regimen adjusts to your augmentation level and biometric signature for maximum efficiency."}
                </div>
              </div>
              
              <div className="workout-parameters">
                <div className="parameter">
                  <div className="parameter-name">NEURAL LOAD</div>
                  <div className="parameter-value">{selectedWorkout.neuralLoad}%</div>
                </div>
                <div className="parameter">
                  <div className="parameter-name">AUGMENTATION REQUIRED</div>
                  <div className="parameter-value">LEVEL {selectedWorkout.augmentationLevel}</div>
                </div>
                <div className="parameter">
                  <div className="parameter-name">NEUREX EFFICIENCY</div>
                  <div className="parameter-value">{selectedWorkout.neurexEfficiency}%</div>
                </div>
                <div className="parameter">
                  <div className="parameter-name">SYNTHETIC STRAIN</div>
                  <div className="parameter-value">
                    <div className="strain-level">
                      {Array.from({length: 10}).map((_, i) => (
                        <span 
                          key={i} 
                          className={`strain-node ${i < selectedWorkout.syntheticStrain ? 'active' : ''}`}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="protocol-segments">
                <div className="segment-header">PROTOCOL SEGMENTS</div>
                <div className="segments-list">
                  {Array.from({length: 3 + Math.floor(Math.random() * 3)}).map((_, i) => (
                    <div key={i} className="protocol-segment">
                      <div className="segment-header">
                        <div className="segment-name">SEGMENT {i+1}: {['NEURAL CALIBRATION', 'SYNTH INTENSITY', 'REPS MATRIX', 'RECOVERY SYNC', 'PEAK OUTPUT'][i % 5]}</div>
                        <div className="segment-duration">{5 + Math.floor(Math.random() * 15)} MINUTES</div>
                      </div>
                      <div className="segment-metrics">
                        <div className="segment-intensity">
                          INT: {Math.floor(Math.random() * 50) + 50}%
                        </div>
                        <div className="segment-strain">
                          STRAIN: {Math.floor(Math.random() * 10) + 1}/10
                        </div>
                        <div className="segment-sync">
                          SYNC REQUIRED: {Math.random() > 0.5 ? 'YES' : 'NO'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="workout-actions">
                <button className="cyber-button">INITIATE PROTOCOL</button>
                <button className="cyber-button secondary">NEURAL CALIBRATION</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="no-data">
          <div className="glitch-text">NO PROTOCOLS FOUND</div>
          <p>Neural training database empty. Initialize new training protocols to continue.</p>
        </div>
      )}
    </div>
  );
}

export default Workouts;