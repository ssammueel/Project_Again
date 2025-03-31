import React, { useState, useEffect } from "react";

export const AggHistory = () => {
  
  const [scans, setScans] = useState([]);
  const [searchIp, setSearchIp] = useState("");
  const [ipSuggestions, setIpSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [daysFilter, setDaysFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedScan, setExpandedScan] = useState(null);
  const [selectedScans, setSelectedScans] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0
  });

  useEffect(() => {
    fetchScans();
    fetchUniqueIps();
  }, [pagination.page, searchIp, daysFilter]);

const fetchScans = async () => {
  setLoading(true);
  setError(null);
  try {
    let url = `http://127.0.0.1:5000/api/aggressive_scans?page=${pagination.page}&per_page=${pagination.perPage}`;
    
    if (searchIp) url += `&ip=${searchIp}`;
    if (daysFilter) url += `&days=${daysFilter}`; // Add days filter

    const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      setScans(data.scans || data);
      setPagination(prev => ({
        ...prev,
        total: data.total || data.length || 0
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniqueIps = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/aggressive_unique_ips");
      if (!response.ok) throw new Error("Failed to fetch unique IPs");
      const data = await response.json();
      setIpSuggestions(data);
    } catch (error) {
      console.error("Error fetching unique IPs:", error);
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchScans();
  };

  const handleDelete = async (scanId) => {
    if (!window.confirm("Are you sure you want to delete this scan?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/aggressive_scans/${scanId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete scan");
      
      setScans(scans.filter(scan => scan._id !== scanId));
      showToast("Scan deleted successfully");
    } catch (error) {
      console.error("Error deleting scan:", error);
      showToast("Error deleting scan");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedScans.length || !window.confirm(`Are you sure you want to delete ${selectedScans.length} scans?`)) return;

    try {
      const response = await fetch("http://127.0.0.1:5000/api/aggressive_scans/bulk_delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scan_ids: selectedScans }),
      });

      if (!response.ok) throw new Error("Failed to delete scans");
      
      setScans(scans.filter(scan => !selectedScans.includes(scan._id)));
      setSelectedScans([]);
      showToast(`${selectedScans.length} scans deleted successfully`);
    } catch (error) {
      console.error("Error deleting scans:", error);
      showToast("Error deleting scans");
    }
  };

  const handleSelectAll = (e) => {
    setSelectedScans(e.target.checked ? scans.map(scan => scan._id) : []);
  };

  const handleSelectScan = (scanId) => {
    setSelectedScans(prev =>
      prev.includes(scanId)
        ? prev.filter(id => id !== scanId)
        : [...prev, scanId]
    );
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const exportToCSV = () => {
    const headers = ["IP Address", "Hostnames", "Open Ports", "OS", "Services"];
    const data = scans.map(scan => {
      const scanResults = scan.scan_results || {};
      const hostnames = scanResults.hostnames?.map(h => h.name).join(", ") || "Unknown";
      const openPorts = scanResults.portused
        ?.filter(port => port.state === "open")
        ?.map(port => `${port.portid}/${port.proto}`)
        .join(", ") || "None";
      const os = scanResults.osmatch?.[0]?.name || "Unknown";
      const services = scanResults.tcp 
        ? Object.entries(scanResults.tcp).map(([port, details]) => 
            `${port}: ${details.name || "Unknown"}`).join("; ") 
        : "None";

      return [scan.ip, hostnames, openPorts, os, services];
    });

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + data.map(row => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `aggressive-scans-${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(scans, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", `aggressive-scans-${new Date().toISOString()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const toggleExpand = (index) => {
    setExpandedScan(expandedScan === index ? null : index);
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Aggressive Scan History</h2>

      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by IP"
            className="p-2 border border-gray-400 rounded-md w-full bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-300"
            value={searchIp}
            onChange={(e) => {
              setSearchIp(e.target.value);
              setShowDropdown(e.target.value !== "");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {showDropdown && ipSuggestions.length > 0 && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-y-auto shadow-lg">
              {ipSuggestions
                .filter(ip => ip.toLowerCase().includes(searchIp.toLowerCase()))
                .map((ip, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearchIp(ip);
                      setShowDropdown(false);
                      handleSearch();
                    }}
                    className="p-2 hover:bg-green-100 cursor-pointer"
                  >
                    {ip}
                  </div>
                ))}
            </div>
          )}
        </div>

        <select
            className="p-2 border border-gray-400 rounded-md bg-gray-50 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-300"
            value={daysFilter}
            onChange={(e) => {
              setDaysFilter(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
          >
            <option value="">All Time</option>
            <option value="1">Last 24 Hours</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            onClick={handleSearch}
          >
            Search
          </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {selectedScans.length > 0 && (
          <button
            onClick={handleBulkDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Delete Selected ({selectedScans.length})
          </button>
        )}
        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Export to CSV
        </button>
        <button
          onClick={exportToJSON}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
        >
          Export to JSON
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-center text-red-600 font-semibold">{error}</p>}

      {/* Scan Results Table */}
      <div className="overflow-x-auto">
        {!loading && scans.length > 0 ? (
          <>
            <table className="table w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-800 text-white font-semibold">
                  <th className="border text-lg border-gray-300 w-10">
                    <input
                      type="checkbox"
                      checked={selectedScans.length === scans.length && scans.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="border text-lg border-gray-300">IP</th>
                  <th className="border text-lg border-gray-300">Hostnames</th>
                  <th className="border text-lg border-gray-300">Open Ports</th>
                  <th className="border text-lg border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan, index) => {
                  const scanResults = scan.scan_results || {};
                  const hostnames = scanResults.hostnames?.map(h => h.name).join(", ") || "Unknown";
                  const openPorts = scanResults.portused
                    ?.filter(port => port.state === "open")
                    ?.map(port => `${port.portid}/${port.proto}`)
                    .join(", ") || "None";

                  return (
                    <React.Fragment key={scan._id}>
                      <tr className="hover:bg-gray-100">
                        <td className="border border-gray-300 text-center">
                          <input
                            type="checkbox"
                            checked={selectedScans.includes(scan._id)}
                            onChange={() => handleSelectScan(scan._id)}
                          />
                        </td>
                        <td className="border border-gray-300 text-[17px]">{scan.ip}</td>
                        <td className="border border-gray-300 text-[17px]">{hostnames}</td>
                        <td className="border border-gray-300 text-[17px]">{openPorts}</td>
                        <td className="border border-gray-300 text-[17px]">
                          <button
                            className="px-3 py-1 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700"
                            onClick={() => toggleExpand(index)}
                          >
                            {expandedScan === index ? "Hide" : "View"}
                          </button>
                          <button
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                            onClick={() => handleDelete(scan._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      {expandedScan === index && (
                        <tr className="bg-gray-50">
                          <td colSpan="5" className="p-6 border">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="font-semibold text-lg mb-3">Host Information</h3>
                                <p><strong>IP Address:</strong> {scan.ip}</p>
                                <p><strong>MAC Address:</strong> {scanResults.addresses?.mac || "N/A"}</p>
                                <p><strong>Hostnames:</strong> {hostnames}</p>
                                <p><strong>Status:</strong> {scanResults.status?.state || "Unknown"}</p>
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg mb-3">Operating System</h3>
                                {scanResults.osmatch ? (
                                  scanResults.osmatch.map((os, i) => (
                                    <div key={i} className="mb-2">
                                      <p><strong>OS:</strong> {os.name}</p>
                                      <p><strong>Accuracy:</strong> {os.accuracy}%</p>
                                      {os.osclass && (
                                        <p><strong>Type:</strong> {os.osclass.type} ({os.osclass.vendor})</p>
                                      )}
                                    </div>
                                  ))
                                ) : (
                                  <p className="text-gray-500">No OS detected</p>
                                )}
                              </div>
                            </div>

                            <div className="mt-6">
                              <h3 className="font-semibold text-lg mb-3">Detected Services</h3>
                              {scanResults.tcp ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {Object.entries(scanResults.tcp).map(([port, details]) => (
                                    <div key={port} className="bg-gray-100 p-3 rounded-lg">
                                      <h4 className="font-medium text-blue-700">Port {port}</h4>
                                      <p><strong>Service:</strong> {details.name || "Unknown"}</p>
                                      <p><strong>State:</strong> 
                                        <span className={details.state === "open" ? "text-green-600" : "text-gray-600"}>
                                          {details.state}
                                        </span>
                                      </p>
                                      {details.product && <p><strong>Product:</strong> {details.product}</p>}
                                      {details.version && <p><strong>Version:</strong> {details.version}</p>}
                                      {details.extrainfo && <p><strong>Extra Info:</strong> {details.extrainfo}</p>}
                                      {details.cpe && <p><strong>CPE:</strong> {details.cpe}</p>}
                                      
                                      {details.script && (
                                        <div className="mt-2">
                                          <h5 className="font-medium">Script Results:</h5>
                                          <ul className="list-disc pl-5 text-sm">
                                            {Object.entries(details.script).map(([scriptId, output]) => (
                                              <li key={scriptId}>
                                                <strong>{scriptId}:</strong> {output}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500">No services detected</p>
                              )}
                            </div>

                            <div className="mt-6">
                              <h3 className="font-semibold text-lg mb-3">Uptime Information</h3>
                              {scanResults.uptime ? (
                                <div className="bg-gray-100 p-3 rounded-lg">
                                  <p><strong>Last Boot:</strong> {scanResults.uptime.lastboot}</p>
                                  <p><strong>Uptime Seconds:</strong> {scanResults.uptime.seconds}</p>
                                </div>
                              ) : (
                                <p className="text-gray-500">Uptime information not available</p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
              <div>
                Showing {(pagination.page - 1) * pagination.perPage + 1} to{' '}
                {Math.min(pagination.page * pagination.perPage, pagination.total)} of {pagination.total} scans
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                  disabled={pagination.page === 1}
                  className={`px-4 py-2 rounded-md ${pagination.page === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {pagination.page} of {Math.ceil(pagination.total / pagination.perPage)}
                </span>
                <button
                  onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                  disabled={pagination.page * pagination.perPage >= pagination.total}
                  className={`px-4 py-2 rounded-md ${pagination.page * pagination.perPage >= pagination.total ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700 text-white'}`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : !loading && (
          <div className="text-center py-12">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No scans found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg animate-fade-in-out">
          {toast.message}
        </div>
      )}
    </div>
  );
};