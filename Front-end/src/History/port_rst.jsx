import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { saveAs } from 'file-saver';

export const PortRst = () => {
  const [scans, setScans] = useState([]);
  const [customDays, setCustomDays] = useState("");
  const [searchIp, setSearchIp] = useState("");
  const [ipSuggestions, setIpSuggestions] = useState([]);
  const [daysFilter, setDaysFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
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
  }, [pagination.page]);

  const fetchScans = async (ip = "", days = "") => {
    setLoading(true);
    setError(null);
  
    let url = `http://127.0.0.1:5000/api/scans?page=${pagination.page}&per_page=${pagination.perPage}`;
    if (ip) {
      url += `&ip=${ip}`;
    }
    if (daysFilter) {
      url += `&days=${daysFilter}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setScans(data.scans);
      setPagination(prev => ({
        ...prev,
        total: data.total
      }));
    } catch (error) {
      setError("Failed to load scan results.");
      console.error("Error fetching scans:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniqueIps = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/unique_ips");
      if (!response.ok) {
        throw new Error("Failed to fetch unique IPs");
      }
      const data = await response.json();
      setIpSuggestions(data);
    } catch (error) {
      console.error("Error fetching unique IPs:", error);
    }
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    const days = daysFilter === 'custom' ? customDays : daysFilter;
    fetchScans(searchIp, days);
  };

  const handleDelete = async (scanId) => {
    if (!window.confirm("Are you sure you want to delete this scan?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/scans/${scanId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete scan.");
      }

      setScans(scans.filter(scan => scan._id !== scanId));
      showToast("Scan deleted successfully");
      if (scans.length === 1 && pagination.page > 1) {
        setPagination(prev => ({ ...prev, page: prev.page - 1 }));
      }
    } catch (error) {
      console.error("Error deleting scan:", error);
      showToast("Error deleting scan");
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedScans.length || !window.confirm(`Are you sure you want to delete ${selectedScans.length} scans?`)) return;

    try {
      const response = await fetch("http://127.0.0.1:5000/api/scans/bulk_delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scan_ids: selectedScans }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete scans.");
      }

      setScans(scans.filter(scan => !selectedScans.includes(scan._id)));
      setSelectedScans([]);
      showToast(`${selectedScans.length} scans deleted successfully`);
    } catch (error) {
      console.error("Error deleting scans:", error);
      showToast("Error deleting scans");
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedScans(scans.map(scan => scan._id));
    } else {
      setSelectedScans([]);
    }
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
    const headers = [
      { label: "IP Address", key: "ip" },
      { label: "Start Port", key: "start_port" },
      { label: "End Port", key: "end_port" },
      { label: "Open Ports", key: "open_ports" },
      { label: "Scan Date", key: "scan_date" }
    ];

    const data = scans.map(scan => ({
      ...scan,
      open_ports: scan.open_ports.join(", "),
      scan_date: new Date(scan.scan_date).toLocaleString()
    }));

    return (
      <CSVLink
        data={data}
        headers={headers}
        filename={`port-scans-${new Date().toISOString()}.csv`}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Export to CSV
      </CSVLink>
    );
  };

  const exportToJSON = () => {
    const data = JSON.stringify(scans, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    saveAs(blob, `port-scans-${new Date().toISOString()}.json`);
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Port Scan Results</h2>

      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <input type="text" placeholder="Search by IP" className="p-2 border border-gray-400 rounded-md w-full bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-300"
            value={searchIp} onChange={(e) => {
              setSearchIp(e.target.value);
              setShowDropdown(e.target.value !== "");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}/>

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
    if (e.target.value !== 'custom') {
      setDaysFilter(e.target.value);
    } else {
      setDaysFilter('custom');
    }
  }}
>
  <option value="">All Time</option>
  <option value="1">Last 24 Hours</option>
  <option value="7">Last 7 Days</option>
  <option value="30">Last 30 Days</option>
  <option value="90">Last 90 Days</option>
  <option value="custom">Custom Days</option>
</select>

{daysFilter === 'custom' && (
  <input
    type="number"
    placeholder="Enter days"
    className="p-2 border border-gray-400 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-300"
    value={customDays}
    onChange={(e) => setCustomDays(e.target.value)}
    min="1"
  />
)}
  
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
        {exportToCSV()}
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
                  <th className="border text-lg border-gray-300">IP Address</th>
                  <th className="border text-lg border-gray-300">Start Port</th>
                  <th className="border text-lg border-gray-300">End Port</th>
                  <th className="border text-lg border-gray-300">Open Ports</th>
                  <th className="border text-lg border-gray-300">Scan Date</th>
                  <th className="border text-lg border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan) => (
                  <tr key={scan._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 text-center">
                      <input
                        type="checkbox"
                        checked={selectedScans.includes(scan._id)}
                        onChange={() => handleSelectScan(scan._id)}
                      />
                    </td>
                    <td className="border border-gray-300 text-[17px]">{scan.ip}</td>
                    <td className="border border-gray-300 text-[17px]">{scan.start_port}</td>
                    <td className="border border-gray-300 text-[17px]">{scan.end_port}</td>
                    <td className="border border-gray-300 text-[17px]">{scan.open_ports.join(", ")}</td>
                    <td className="border border-gray-300 text-[17px]">{new Date(scan.scan_date).toLocaleString()}</td>
                    <td className="border border-gray-300 text-[17px]">
                      <button
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                        onClick={() => handleDelete(scan._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
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
  );}