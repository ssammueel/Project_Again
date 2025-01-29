import React, { useState } from 'react';

export const Os_detect = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    if (!ipAddress) {
      alert('Please enter an IP address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/scan/nmap ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ip: ipAddress }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        alert('Error performing scan. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please check the console for details.');
    }
  };

  return (
    <div className="bg-slate-300 flex flex-col p-3 gap-3 w-[45%] h-fit">
      <h2>Operating System Details</h2>
      <label>IP Address:</label>
      <input
        className="bg-white p-2 indent-3 outline-none rounded-btn"
        type="text"
        placeholder="Enter IP address"
        value={ipAddress}
        onChange={(e) => setIpAddress(e.target.value)}
      />
      <button className="btn btn-accent w-fit px-5 mt-4" onClick={handleScan}>
        Scan
      </button>

      {result && (
        <div className="mt-4">
          <h3>Scan Results:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
