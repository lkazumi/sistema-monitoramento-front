// src/components/SystemMonitor.js

import React, { useState, useEffect } from 'react';
import systemsData from '../api/systems.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SystemMonitor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const SystemMonitor = () => {
  const [systems, setSystems] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setSystems(systemsData.systems);

    const intervalId = setInterval(() => {
      setSystems(systemsData.systems);
    }, 5000);

    document.body.classList.toggle('dark-mode', isDarkMode);

    return () => {
      clearInterval(intervalId);
    };
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getBackgroundColor = (status) => {
    return status === 'active' ? 'bg-success' : 'bg-danger';
  };

  return (
    <div className={`container mt-5 ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="toggle-dark-mode" onClick={toggleDarkMode}>
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
      </div>
      <h1 className="mb-4">Monitoramento em Tempo Real</h1>
      <div className="row">
        {systems.map((system) => (
          <div key={system.id} className="col-md-4 mb-4">
            <div className={`card ${getBackgroundColor(system.status)}`}>
              <div
                className={`card-body ${
                  isDarkMode ? 'text-dark' : 'text-light'
                }`}
              >
                <h5 className="card-title">{system.name}</h5>
                <p>Status: {system.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemMonitor;
