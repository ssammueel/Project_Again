import React, { useEffect, useState } from "react";

export const Syn_history = () => {
  const [scans, setScans] = useState([]);
  const [filteredScans, setFilteredScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedScan, setExpandedScan] = useState(null);
  const [searchIp, setSearchIp] = useState("");
  const [ipSuggestions, setIpSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedScans, setSelectedScans] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0
  });

  const API_URL = "http://127.0.0.1:5000/api/syn_scans";

  useEffect(() => {
    fetchScans();
    fetchUniqueIps();
  }, [pagination.page, searchIp]);

  const fetchScans = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `${API_URL}?page=${pagination.page}&per_page=${pagination.perPage}&ip=${searchIp}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setScans(data.scans);
      setFilteredScans(data.scans);
      setPagination(prev => ({
        ...prev,
        total: data.total
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniqueIps = async () => {
    try {
      const response = await fetch(`${API_URL}/unique_ips`);
      const data = await response.json();
      setIpSuggestions(data);
    } catch (err) {
      console.error("Error fetching unique IPs:", err);
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchScans();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this scan?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setFilteredScans(filteredScans.filter(scan => scan._id !== id));
      showToast("Scan deleted successfully");
    } catch (err) {
      console.error("Error deleting scan:", err);
      showToast("Error deleting scan");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedScans.length || !window.confirm(`Are you sure you want to delete ${selectedScans.length} scans?`)) return;

    try {
      const response = await fetch(`${API_URL}/bulk_delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scan_ids: selectedScans }),
      });

      if (!response.ok) throw new Error("Failed to delete scans");
      
      setFilteredScans(filteredScans.filter(scan => !selectedScans.includes(scan._id)));
      setSelectedScans([]);
      showToast(`${selectedScans.length} scans deleted successfully`);
    } catch (err) {
      console.error("Error deleting scans:", err);
      showToast("Error deleting scans");
    }
  };

  const handleSelectAll = (e) => {
    setSelectedScans(e.target.checked ? filteredScans.map(scan => scan._id) : []);
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
    const headers = ["IP Address", "Timestamp", "MAC Address", "Status", "OS Detected"];
    const data = filteredScans.map(scan => [
      scan.ip,
      new Date(scan.timestamp).toLocaleString(),
      scan.scan_results?.addresses?.mac || "N/A",
      `${scan.scan_results?.status?.state} (${scan.scan_results?.status?.reason})`,
      scan.scan_results?.osmatch?.[0]?.name || "Unknown"
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + data.map(row => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `syn-scans-${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(filteredScans, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", `syn-scans-${new Date().toISOString()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleExpand = (index) => {
    setExpandedScan(expandedScan === index ? null : index);
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">SYN Scan History</h2>

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
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Action Buttons */}
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
        {!loading && filteredScans.length > 0 ? (
          <>
            <table className="table w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-800 text-white font-semibold">
                  <th className="border text-lg border-gray-300 w-10">
                    <input
                      type="checkbox"
                      checked={selectedScans.length === filteredScans.length && filteredScans.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="border text-lg border-gray-300">Timestamp</th>
                  <th className="border text-lg border-gray-300">IP Address</th>
                  <th className="border text-lg border-gray-300">Actions</th>
                  <th className="border text-lg border-gray-300">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredScans.map((scan, index) => (
                  <React.Fragment key={scan._id}>
                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 text-center">
                        <input
                          type="checkbox"
                          checked={selectedScans.includes(scan._id)}
                          onChange={() => handleSelectScan(scan._id)}
                        />
                      </td>
                      <td className="border border-gray-300 text-[17px]">
                        {new Date(scan.timestamp).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 text-[17px]">{scan.ip}</td>
                      <td className="border border-gray-300 text-[17px] text-center">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() => toggleExpand(index)}
                        >
                          {expandedScan === index ? "Hide" : "View"}
                        </button>
                      </td>
                      <td className="border border-gray-300 text-[17px] text-center">
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
                        <td colSpan="5" className="p-4 border">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">Host Information</h3>
                              <p><strong>IP:</strong> {scan.ip}</p>
                              <p><strong>MAC:</strong> {scan.scan_results?.addresses?.mac || "N/A"}</p>
                              <p><strong>Status:</strong> {scan.scan_results?.status?.state} ({scan.scan_results?.status?.reason})</p>
                              <p><strong>OS Detected:</strong> {scan.scan_results?.osmatch?.[0]?.name || "Unknown"}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-2">Network Details</h3>
                              {scan.scan_results?.uptime && (
                                <>
                                  <p><strong>Last Boot:</strong> {scan.scan_results.uptime.lastboot}</p>
                                  <p><strong>Uptime:</strong> {scan.scan_results.uptime.seconds} seconds</p>
                                </>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h3 className="font-semibold text-lg mb-2">Port Details</h3>
                            {scan.scan_results?.tcp ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {Object.entries(scan.scan_results.tcp).map(([port, details]) => (
                                  <div key={port} className="bg-gray-100 p-2 rounded">
                                    <p className="font-medium">Port {port}</p>
                                    <p><strong>State:</strong> <span className={details.state === "open" ? "text-green-600" : "text-gray-600"}>{details.state}</span></p>
                                    <p><strong>Service:</strong> {details.name || "Unknown"}</p>
                                    {details.product && <p><strong>Product:</strong> {details.product}</p>}
                                    {details.version && <p><strong>Version:</strong> {details.version}</p>}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500">No port information available</p>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
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