import React, { useState } from 'react'

export const ScanResults = () => {
    const [date, setDate] = useState("");
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchScans = async () => {
    if (!date) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/scans/${date}`);
      const data = await response.json();
      setScans(data);
    } catch (err) {
      setError("Failed to fetch scan results.");
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Scan Results</h1>
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          className="p-2 border rounded-md shadow-sm bg-slate-300"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={fetchScans}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Fetch Results
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {scans.length > 0 ? (
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3">IP Address</th>
                <th className="p-3">Start Port</th>
                <th className="p-3">End Port</th>
                <th className="p-3">Open Ports</th>
                <th className="p-3">Scan Date</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="p-3 text-center">{scan.ip}</td>
                  <td className="p-3 text-center">{scan.start_port}</td>
                  <td className="p-3 text-center">{scan.end_port}</td>
                  <td className="p-3 text-center">{scan.open_ports.join(", ") || "None"}</td>
                  <td className="p-3 text-center">{new Date(scan.scan_date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-4 text-gray-600">No scan results available for this date.</p>
      )}
    </div>
  
  )
}
