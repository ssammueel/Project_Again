import React, { useEffect, useState } from "react";

export const Syn_history = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedScan, setExpandedScan] = useState(null);

  const API_URL = "http://127.0.0.1:5000/api/syn_scans";

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setScans(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (index) => {
    setExpandedScan(expandedScan === index ? null : index);
  };

  const formatDetails = (scan) => {
    const ip = scan.ip || "Unknown";
    const mac = scan.scan_results?.addresses?.mac || "N/A";
    const vendor = scan.scan_results?.vendor?.[mac] || "Unknown Vendor";
    const os = scan.scan_results?.osmatch?.[0]?.name || "Unknown OS";
    const osAccuracy = scan.scan_results?.osmatch?.[0]?.accuracy || "N/A";
    const uptimeSeconds = scan.scan_results?.uptime?.seconds || "Unknown";
    const lastBoot = scan.scan_results?.uptime?.lastboot || "Unknown";
    
    const openPorts = Object.entries(scan.scan_results?.tcp || {})
      .filter(([_, details]) => details.state === "open")
      .map(([port, details]) => `${port} (${details.name})`);

    return (
      <div className="bg-gray-100 p-4 rounded">
        <p><strong>🔹 IP Address:</strong> {ip}</p>
        <p><strong>🔹 MAC Address:</strong> {mac} (Vendor: {vendor})</p>
        <p><strong>🔹 OS Detected:</strong> {os} (Accuracy: {osAccuracy}%)</p>
        <p><strong>🔹 Open Ports:</strong> {openPorts.length > 0 ? openPorts.join(", ") : "None"}</p>
        <p><strong>🔹 System Uptime:</strong> {Math.floor(uptimeSeconds / 60)} minutes</p>
        <p><strong>🔹 Last Boot Time:</strong> {lastBoot}</p>
      </div>
    );
  };

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">SYN Scan History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="p-3 border border-gray-300">Timestamp</th>
              <th className="p-3 border border-gray-300">IP Address</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan, index) => (
              <React.Fragment key={index}>
                <tr className="border border-gray-300 hover:bg-gray-100">
                  <td className="p-3 border border-gray-300">{new Date(scan.timestamp).toLocaleString()}</td>
                  <td className="p-3 border border-gray-300">{scan.ip}</td>
                  <td className="p-3 border border-gray-300 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" onClick={() => toggleExpand(index)}>
                      {expandedScan === index ? "Hide Details" : "View Details"}
                    </button>
                  </td>
                </tr>
                {expandedScan === index && (
                  <tr>
                    <td colSpan="3" className="p-4">{formatDetails(scan)}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
