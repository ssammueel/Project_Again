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
  const [selectedScans, setSelectedScans] = useState([]);

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

  const fetchIpSuggestions = async (query) => {
    if (query.length < 2) {
      setIpSuggestions([]);
      setShowDropdown(false);
      return;
    }
    try {
      const response = await fetch(`${API_URL}/unique_targets?query=${query}`);
      const data = await response.json();
      setIpSuggestions(data.slice(0, 5)); // Limit to 5 suggestions
      setShowDropdown(data.length > 0);
    } catch (err) {
      console.error("Failed to fetch IP suggestions:", err);
    }
  };

  const handleTargetChange = (e) => {
    const value = e.target.value;
    setTarget(value);
    fetchIpSuggestions(value);
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
    if (!window.confirm("Are you sure you want to delete this scan?")) return;
    
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete scan");
      
      setFilteredScans(filteredScans.filter(scan => scan._id !== id));
      setSelectedScans(selectedScans.filter(scanId => scanId !== id));
      alert("Scan deleted successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSelectScan = (scanId) => {
    setSelectedScans(prev => 
      prev.includes(scanId) 
        ? prev.filter(id => id !== scanId) 
        : [...prev, scanId]
    );
  };

  const exportScans = (format) => {
    if (selectedScans.length === 0) {
      alert("Please select at least one scan to export");
      return;
    }

    const selectedData = filteredScans.filter(scan => selectedScans.includes(scan._id));
    
    if (format === "json") {
      const dataStr = JSON.stringify(selectedData, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `file_upload_scans_${new Date().toISOString()}.json`;
      link.click();
    } else if (format === "csv") {
      const headers = ["Timestamp", "Target IP", "Scan Result"];
      const rows = selectedData.map(scan => [
        new Date(scan.timestamp).toISOString(),
        scan.target,
        scan.scan_result.replace(/\n/g, "\\n")
      ]);
      
      let csvContent = headers.join(",") + "\n";
      rows.forEach(row => {
        csvContent += row.map(field => `"${field}"`).join(",") + "\n";
      });
      
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `file_upload_scans_${new Date().toISOString()}.csv`;
      link.click();
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

      {/* Filters and Export */}
      <div className="mb-4 flex flex-wrap justify-center gap-4">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Filter by Target IP"
            value={target}
            onChange={handleTargetChange}
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
        
        <div className="flex gap-2">
          <button
            onClick={applyIpFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Filter
          </button>
          
          <button
            onClick={() => exportScans("json")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Export JSON
          </button>
          
          <button
            onClick={() => exportScans("csv")}
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="p-3 border border-gray-300 w-8">
                <input 
                  type="checkbox" 
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedScans(filteredScans.map(scan => scan._id));
                    } else {
                      setSelectedScans([]);
                    }
                  }}
                  checked={selectedScans.length === filteredScans.length && filteredScans.length > 0}
                />
              </th>
              <th className="p-3 border border-gray-300">Timestamp</th>
              <th className="p-3 border border-gray-300">Target</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredScans.length > 0 ? (
              filteredScans.map((scan, index) => (
                <React.Fragment key={scan._id}>
                  <tr className="border border-gray-300 hover:bg-gray-100">
                    <td className="p-3 border border-gray-300 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedScans.includes(scan._id)}
                        onChange={() => handleSelectScan(scan._id)}
                      />
                    </td>
                    <td className="p-3 border border-gray-300">{new Date(scan.timestamp).toLocaleString()}</td>
                    <td className="p-3 border border-gray-300">{scan.target}</td>
                    <td className="p-3 border border-gray-300 text-center space-x-2">
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition text-sm"
                        onClick={() => toggleExpand(index)}
                      >
                        {expandedScan === index ? "Hide" : "View"}
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition text-sm"
                        onClick={() => handleDelete(scan._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedScan === index && (
                    <tr className="bg-white border-t">
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-600">
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