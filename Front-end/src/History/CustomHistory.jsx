import React, { useEffect, useState } from "react";

export const CustomHistory = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedScan, setExpandedScan] = useState(null);

  const API_URL = "http://127.0.0.1:5000/api/fetch_custom_scan";

  useEffect(() => {
    const fetchScans = async () => {
      try {
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

    fetchScans();
  }, []);

  const toggleExpand = (index) => {
    setExpandedScan(expandedScan === index ? null : index);
  };

  const extractIP = (command) => {
    const ipMatch = command.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/);
    return ipMatch ? ipMatch[0] : "Unknown";
  };

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Custom Scan History
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="p-3 border border-gray-300">Timestamp</th>
              <th className="p-3 border border-gray-300">IP Address</th>
              <th className="p-3 border border-gray-300">Command</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan, index) => (
              <React.Fragment key={index}>
                <tr className="border border-gray-300 hover:bg-gray-100">
                  <td className="p-3 border border-gray-300 text-gray-800">{scan.timestamp}</td>
                  <td className="p-3 border border-gray-300 text-gray-800">{extractIP(scan.command)}</td>
                  <td className="p-3 border border-gray-300 text-gray-800">{scan.command}</td>
                  <td className="p-3 border border-gray-300 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedScan === index ? "Hide Details" : "View Details"}
                    </button>
                  </td>
                </tr>
                {expandedScan === index && (
                  <tr className="bg-white border-t">
                    <td colSpan="4" className="p-6 text-gray-800">
                      <h3 className="font-bold text-xl mb-3">Detailed Scan Output</h3>
                      <pre className="overflow-x-auto bg-gray-100 p-4 rounded text-sm">
                        {scan.output}
                      </pre>
                    </td>
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
