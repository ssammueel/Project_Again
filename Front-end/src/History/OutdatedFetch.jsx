import React, { useEffect, useState } from "react";

export const Outdated = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedScan, setExpandedScan] = useState(null);
  const [target, setTarget] = useState("");
  const [ipSuggestions, setIpSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const API_URL = "http://127.0.0.1:5000/nikto/outdated_software_scans";

  const fetchScans = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL(API_URL);
      if (target) url.searchParams.append("target", target);

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch scans");

      setScans(data);
    } catch (err) {
      setError(err.message);
      setScans([]); // Ensure scans reset on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch unique target IPs for dropdown suggestions
  const fetchIpSuggestions = async (query) => {
    if (query.length < 2) return setIpSuggestions([]); // Only search after 2+ characters
    try {
      const response = await fetch(`${API_URL}/unique_targets`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch IPs");

      const filteredIps = data
        .filter((ip) => ip.startsWith(query))
        .slice(0, 5); // Limit dropdown suggestions to 5

      setIpSuggestions(filteredIps);
      setShowDropdown(filteredIps.length > 0);
    } catch (err) {
      console.error("Failed to fetch IP suggestions:", err);
    }
  };

  useEffect(() => {
    fetchScans();
  }, []);

  const toggleExpand = (index) => {
    setExpandedScan(expandedScan === index ? null : index);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Outdated Software Scans
      </h2>

      {/* Filters */}
      <div className="mb-4 flex justify-center space-x-4 relative">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Filter by Target IP"
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
              fetchIpSuggestions(e.target.value);
            }}
            className="p-2 border border-gray-300 rounded-md w-full bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"

          />
          {showDropdown && (
            <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-40 overflow-auto z-10">
              {ipSuggestions.map((ip, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setTarget(ip);
                    setShowDropdown(false);
                  }}
                >
                  {ip}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={fetchScans}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Filter
        </button>
      </div>

      {loading && <p className="text-center text-blue-600">Loading...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="p-3 border border-gray-300">Timestamp</th>
              <th className="p-3 border border-gray-300">Target IP</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scans.length > 0 ? (
              scans.map((scan, index) => (
                <React.Fragment key={scan._id}>
                  <tr className="border border-gray-300 hover:bg-gray-100">
                    <td className="p-3 border border-gray-300 text-gray-800">
                      {new Date(scan.timestamp).toLocaleString()}
                    </td>
                    <td className="p-3 border border-gray-300 text-gray-800">
                      {scan.target}
                    </td>
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
                      <td colSpan="3" className="p-6 text-gray-800">
                        <h3 className="font-bold text-xl mb-3">
                          Detailed Scan Output
                        </h3>
                        <div className="bg-gray-100 p-4 rounded text-sm whitespace-pre-line">
                          {scan.scan_result
                            .split("\n")
                            .map((line, idx) => (
                              <p key={idx}>+ {line.trim()}</p>
                            ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-600">
                  No scans found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
