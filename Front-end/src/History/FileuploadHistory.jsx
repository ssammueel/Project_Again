import React, { useEffect, useState } from "react";

export const FileHistory = () => {
  const [scans, setScans] = useState([]);
  const [filteredScans, setFilteredScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedScan, setExpandedScan] = useState(null);
  const [target, setTarget] = useState("");
  const [ipSuggestions, setIpSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const API_URL = "http://127.0.0.1:5000/api/file_upload_scans";

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
    const value = e.target.value;
    setTarget(value);

    if (value) {
      const filteredIps = [...new Set(scans.map(scan => scan.target).filter(ip => ip.includes(value)))];
      setIpSuggestions(filteredIps);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const applyIpFilter = () => {
    if (target) {
      setFilteredScans(scans.filter(scan => scan.target.includes(target)));
    } else {
      setFilteredScans(scans);
    }
    setShowDropdown(false);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setFilteredScans(filteredScans.filter(scan => scan._id !== id));
    } catch (err) {
      console.error("Error deleting scan:", err);
    }
  };

  const toggleExpand = (index) => {
    setExpandedScan(expandedScan === index ? null : index);
  };

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">File Upload Scan History</h1>

      {/* IP Filtering Input */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Filter by Target IP"
          value={target}
          onChange={handleTargetChange}
          className="p-2 border border-gray-300 rounded-md w-[50%] bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
        />
        {showDropdown && ipSuggestions.length > 0 && (
          <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-y-auto shadow-lg">
            {ipSuggestions.map((ip, index) => (
              <div
                key={index}
                onClick={() => { setTarget(ip); setShowDropdown(false); }}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {ip}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={applyIpFilter}
          className="mt-2 ml-5 w-fit bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
        >
          Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="p-3 border border-gray-300">Timestamp</th>
              <th className="p-3 border border-gray-300">Target</th>
              <th className="p-3 border border-gray-300">Actions</th>
              <th className="p-3 border border-gray-300">Delete</th>
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
                  <td className="p-3 border border-gray-300 text-center">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition" onClick={() => handleDelete(scan._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
                {expandedScan === index && (
                  <tr>
                    <td colSpan="4" className="p-4">
                      <div className="bg-gray-100 p-4 rounded-md shadow-md border border-gray-300">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">🔍 Scan Details</h3>
                        <p className="text-gray-800"><strong>📌 Target:</strong> {scan.target}</p>

                        <h4 className="text-lg font-semibold mt-3 text-gray-900">📄 Raw Output</h4>
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
