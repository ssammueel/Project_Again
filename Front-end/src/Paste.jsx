import React, { useState } from 'react';

const PortScanner = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [startPort, setStartPort] = useState('');
  const [endPort, setEndPort] = useState('');
  const [result, setResult] = useState([]);

  const handleScan = async () => {
    if (!ipAddress || !startPort || !endPort) {
      alert('Please fill in all fields.');
      return;
    }
    const response = await fetch('http://127.0.0.1:5000/api/scan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ip: ipAddress,
        startPort: parseInt(startPort),
        endPort: parseInt(endPort),
      }),
    });

    const data = await response.json();
    setResult(data.openPorts || []);
  };

  return (
    <div>
      <h1>Port Scanner</h1>
      <div>
        <label>IP Address:</label>
        <input
          type="text"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
        />
      </div>
      <div>
        <label>Start Port:</label>
        <input
          type="number"
          value={startPort}
          onChange={(e) => setStartPort(e.target.value)}
        />
      </div>
      <div>
        <label>End Port:</label>
        <input
          type="number"
          value={endPort}
          onChange={(e) => setEndPort(e.target.value)}
        />
      </div>
      <button onClick={handleScan}>Scan</button>
      <div>
        <h2>Open Ports</h2>
        {result.length > 0 ? (
          result.map((port) => <p key={port}>Port {port} is open</p>)
        ) : (
          <p>No open ports detected.</p>
        )}
      </div>
    </div>
  );
};

export default PortScanner;
