import React, { useState, useEffect } from "react";

export const HeaderHistory = () => {
  const [scans, setScans] = useState([]);
  const [searchTarget, setSearchTarget] = useState("");
  const [targetSuggestions, setTargetSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedScan, setExpandedScan] = useState(null);
  const [selectedScans, setSelectedScans] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0
  });
  const [daysFilter, setDaysFilter] = useState("");

  const API_URL = "http://127.0.0.1:5000/nikto/header_scans";

  useEffect(() => {
    fetchScans();
    fetchUniqueTargets();
  }, [pagination.page, searchTarget, daysFilter]);

  const fetchScans = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_URL}?page=${pagination.page}&per_page=${pagination.perPage}`;
      if (searchTarget) url += `&target=${searchTarget}`;
      if (daysFilter) url += `&days=${daysFilter}`;

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setScans(data.scans);
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

  const fetchUniqueTargets = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/nikto/unique_targets");
      if (!response.ok) throw new Error("Failed to fetch unique targets");
      const data = await response.json();
      setTargetSuggestions(data);
    } catch (error) {
      console.error("Error fetching unique targets:", error);
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchScans();
  };

  const handleClearFilters = () => {
    setSearchTarget("");
    setDaysFilter("");
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchScans();
  };

  const handleDelete = async (scanId) => {
    if (!window.confirm("Are you sure you want to delete this scan?")) return;

    try {
      const response = await fetch(`${API_URL}/${scanId}`, {
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
      const response = await fetch(`${API_URL}/bulk_delete`, {
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
    const headers = ["Timestamp", "Target", "Scan Result"];
    const data = scans.map(scan => [
      new Date(scan.timestamp).toLocaleString(),
      scan.target,
      scan.scan_result.replace(/\n/g, "\\n").replace(/"/g, '""')
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + data.map(row => `"${row.join('","')}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `header-scans-${new Date().toISOString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(scans, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", `header-scans-${new Date().toISOString()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleExpand = (index) => {
    setExpandedScan(expandedScan === index ? null : index);
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Header Scan History</h2>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by Target"
            className="p-2 border border-gray-300 rounded-md w-full bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
            value={searchTarget}
            onChange={(e) => {
              setSearchTarget(e.target.value);
              setShowDropdown(e.target.value !== "");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {showDropdown && targetSuggestions.length > 0 && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-y-auto shadow-lg">
              {targetSuggestions
                .filter(target => target.toLowerCase().includes(searchTarget.toLowerCase()))
                .map((target, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearchTarget(target);
                      setShowDropdown(false);
                      handleSearch();
                    }}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {target}
                  </div>
                ))}
            </div>
          )}
        </div>

        <select
          className="p-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
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
        </select>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={handleSearch}
        >
          Search
        </button>

        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Days Filter Info */}
      {daysFilter && (
        <div className="mb-4 text-sm text-gray-600">
          Showing scans from last {daysFilter} days
        </div>
      )}

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
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
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
                  <th className="border text-lg border-gray-300">Timestamp</th>
                  <th className="border text-lg border-gray-300">Target</th>
                  <th className="border text-lg border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan, index) => (
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
                      <td className="border border-gray-300 text-[17px]">{scan.target}</td>
                      <td className="border border-gray-300 text-[17px] text-center">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() => toggleExpand(index)}
                        >
                          {expandedScan === index ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>
                    {expandedScan === index && (
                      <tr className="bg-gray-50">
                        <td colSpan="4" className="p-4 border">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">Basic Information</h3>
                              <p><strong>Target:</strong> {scan.target}</p>
                              <p><strong>Timestamp:</strong> {new Date(scan.timestamp).toLocaleString()}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-2">Scan Metadata</h3>
                              {/* Add any additional metadata here if available */}
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h3 className="font-semibold text-lg mb-2">Scan Results</h3>
                            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm max-h-96">
                              {scan.scan_result}
                            </pre>
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