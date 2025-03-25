import React, { useEffect, useState } from "react";

export const HeaderHistory = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedScan, setExpandedScan] = useState(null);
  const [target, setTarget] = useState("");
  const [filteredScans, setFilteredScans] = useState([]);

  const API_URL = "http://127.0.0.1:5000/nikto/header_scans";

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
      setFilteredScans(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTargetChange = (e) => {
    setTarget(e.target.value);
    if (e.target.value) {
      setFilteredScans(scans.filter(scan => scan.target.includes(e.target.value)));
    } else {
      setFilteredScans(scans);
    }
  };

  const toggleExpand = (index) => {
    setExpandedScan(expandedScan === index ? null : index);
  };

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">🔍 Nikto Header Scan History</h1>

      {/* Target Filtering Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by Target IP"
          value={target}
          onChange={handleTargetChange}
          className="p-2 border border-gray-300 rounded-md w-[50%] bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="p-3 border border-gray-300">Timestamp</th>
              <th className="p-3 border border-gray-300">Target</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredScans.map((scan, index) => (
              <React.Fragment key={scan._id}>
                <tr className="border border-gray-300 hover:bg-gray-100">
                  <td className="p-3 border border-gray-300">{new Date(scan.timestamp).toLocaleString()}</td>
                  <td className="p-3 border border-gray-300">{scan.target}</td>
                  <td className="p-3 border border-gray-300 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" onClick={() => toggleExpand(index)}>
                      {expandedScan === index ? "Hide Details" : "View Details"}
                    </button>
                  </td>
                </tr>
                {expandedScan === index && (
                  <tr>
                    <td colSpan="3" className="p-4">
                      <div className="bg-gray-100 p-4 rounded-md shadow-md border border-gray-300">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">📄 Scan Details</h3>
                        <p className="text-gray-800"><strong>📌 Target:</strong> {scan.target}</p>

                        <h4 className="text-lg font-semibold mt-3 text-gray-900">📝 Raw Output</h4>
                        <div className="bg-gray-50 text-gray-800 p-3 rounded-md overflow-x-auto border border-gray-300 text-m whitespace-pre-wrap">
                          {scan.scan_result}
                        </div>
                      </div>
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
