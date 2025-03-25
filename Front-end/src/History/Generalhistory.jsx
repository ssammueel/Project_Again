import React, { useEffect, useState } from "react";

export const Generalhistory = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedScan, setExpandedScan] = useState(null);
  const [target, setTarget] = useState("");
  const [filteredScans, setFilteredScans] = useState([]);

  const API_URL = "http://127.0.0.1:5000/nikto/general_scans";

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

  const deleteScan = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this scan?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/nikto/general_scan/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      setScans(scans.filter(scan => scan._id !== id));
      setFilteredScans(filteredScans.filter(scan => scan._id !== id));
    } catch (err) {
      alert("Error deleting scan: " + err.message);
    }
  };

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  // Function to extract key details from Nikto output
const extractDetail = (rawOutput, keyword) => {
  const regex = new RegExp(`\\+ ${keyword}:\\s*(.+)`, 'i');
  const match = rawOutput.match(regex);
  return match ? match[1] : "N/A";
};

// Function to extract vulnerabilities and issues
const extractVulnerabilities = (rawOutput) => {
  return rawOutput
    .split("\n")
    .filter(line => line.startsWith("+ /") || line.startsWith("+ OPTIONS") || line.includes("CVE-"))
    .map(line => line.replace("+ ", ""));
};

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">🔍 Nikto General Scan History</h1>

      {/* Target Filtering Input */}
            {/* Target Filtering Input */}
            <div className="mb-4 flex gap-2">
        <div className="relative w-[50%]">
          <input
            type="text"
            placeholder="Filter by Target IP"
            value={target}
            onChange={handleTargetChange}
            className="p-2 border border-gray-300 rounded-md w-full bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
          />
          {/* Suggestion Dropdown */}
          {/* Suggestion Dropdown */}
{target && (
  <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 shadow-md max-h-40 overflow-y-auto z-10">
    {[...new Set(scans.map(scan => scan.target))] // Extract unique targets
      .filter(ip => ip.includes(target))
      .slice(0, 5) // Limit to 5 suggestions
      .map((ip, index) => (
        <li
          key={index}
          onClick={() => setTarget(ip)}
          className="p-2 hover:bg-blue-100 cursor-pointer"
        >
          {ip}
        </li>
      ))}
  </ul>
)}

        </div>

        <button
          onClick={() => setFilteredScans(scans.filter(scan => scan.target.includes(target)))}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
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
            <th className="p-3 border border-gray-300">View Details</th>  {/* New Column */}
            <th className="p-3 border border-gray-300">Delete</th>        {/* New Column */}
          </tr>
        </thead>

        <tbody>
            {filteredScans.map((scan, index) => (
              <React.Fragment key={scan._id}>
                <tr className="border border-gray-300 hover:bg-gray-100">
                  <td className="p-3 border border-gray-300">{new Date(scan.timestamp).toLocaleString()}</td>
                  <td className="p-3 border border-gray-300">{scan.target}</td>

                  {/* View Details Column */}
                  <td className="p-3 border border-gray-300 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition" onClick={() => toggleExpand(index)}>
                      {expandedScan === index ? "Hide Details" : "View Details"}
                    </button>
                  </td>

                  {/* Delete Column */}
                  <td className="p-3 border border-gray-300 text-center">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition" onClick={() => deleteScan(scan._id)}>
                      Delete
                    </button>
                  </td>
                </tr>

                {expandedScan === index && (
                  <tr>
                    <td colSpan="4" className="p-4">
                      <div className="bg-gray-100 p-4 rounded-md shadow-md border border-gray-300">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">📄 Scan Details</h3>
                        <p className="text-gray-800"><strong>📌 Target:</strong> {scan.target}</p>

                        <h4 className="text-lg font-semibold mt-3 text-gray-900">📝 Raw Output</h4>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-300">
  {/* Basic Info */}
  <h4 className="text-lg font-semibold text-gray-900 mb-2">📌 Target Information</h4>
  <ul className="list-disc pl-5 text-gray-800">
    <li><strong>Target IP:</strong> {scan.target}</li>
    <li><strong>Server:</strong> {extractDetail(scan.scan_result, 'Server')}</li>
    <li><strong>Port:</strong> {extractDetail(scan.scan_result, 'Target Port')}</li>
    <li><strong>Start Time:</strong> {extractDetail(scan.scan_result, 'Start Time')}</li>
  </ul>

  {/* Issues Found */}
  <h4 className="text-lg font-semibold text-orange-500 mt-4">🔍 Security Issues</h4>
<ol className="list-decimal text-m pl-5 text-[#030101]">
  {extractVulnerabilities(scan.scan_result).map((issue, index) => (
    <li key={index} className="bg-[#ada7a7] p-2 rounded-md my-1 border-l-4 border-orange-400">
      {issue}
    </li>
  ))}
</ol>

  {/* Scan Summary */}
  <h4 className="text-lg font-semibold text-gray-900 mt-4">📊 Scan Summary</h4>
  <ul className="list-disc pl-5 text-gray-800">
    <li><strong>Requests Sent:</strong> {extractDetail(scan.scan_result, 'requests')}</li>
    <li><strong>Errors:</strong> {extractDetail(scan.scan_result, 'error(s)')}</li>
    <li><strong>End Time:</strong> {extractDetail(scan.scan_result, 'End Time')}</li>
  </ul>
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
