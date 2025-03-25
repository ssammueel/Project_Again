import React, { useState, useEffect } from "react";

export const FirewallHistory = () => {
  const [scans, setScans] = useState([]);
  const [searchIp, setSearchIp] = useState("");
  const [ipSuggestions, setIpSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedScan, setExpandedScan] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const API_URL = "http://127.0.0.1:5000/api/firewall_scans";

  useEffect(() => {
    fetchScans();
    fetchUniqueIps();
  }, []);

  const fetchScans = async (ip = "", date = "") => {
    setLoading(true);
    setError(null);
    try {
      let url = API_URL;
      const params = new URLSearchParams();
      
      if (ip) params.append("ip", ip);
      if (date) params.append("date", date);
      
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      setScans(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniqueIps = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/firewall_unique_ips");
      if (!response.ok) throw new Error("Failed to fetch unique IPs");
      const data = await response.json();
      setIpSuggestions(data);
    } catch (error) {
      console.error("Error fetching unique IPs:", error);
    }
  };

  const handleSearch = () => {
    fetchScans(searchIp, selectedDate);
  };

  const handleDelete = async (scanId) => {
    if (!window.confirm("Are you sure you want to delete this scan?")) return;

    try {
      const response = await fetch(`${API_URL}/${scanId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete scan");
      
      setScans(scans.filter(scan => scan._id !== scanId));
    } catch (error) {
      console.error("Error deleting scan:", error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    fetchScans(searchIp, e.target.value);
  };

  const toggleExpand = (index) => {
    setExpandedScan(expandedScan === index ? null : index);
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Firewall Scan History</h2>

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
                      fetchScans(ip, selectedDate);
                    }}
                    className="p-2 hover:bg-green-100 cursor-pointer"
                  >
                    {ip}
                  </div>
                ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="p-2 border border-gray-400 rounded-md bg-gray-50 text-gray-900 focus:border-green-500 focus:ring-2 focus:ring-green-300"
          />
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-blue-600 font-semibold">Loading scan results...</p>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : scans.length > 0 ? (
          <table className="table w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-800 text-white font-semibold">
                <th className="border text-lg border-gray-300">Timestamp</th>
                <th className="border text-lg border-gray-300">IP Address</th>
                <th className="border text-lg border-gray-300">Hostnames</th>
                <th className="border text-lg border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan, index) => (
                <React.Fragment key={scan._id}>
                  <tr className="hover:bg-gray-100">
                    <td className="border border-gray-300 text-[17px]">
                      {new Date(scan.scan_date).toLocaleString()}
                    </td>
                    <td className="border border-gray-300 text-[17px]">{scan.ip}</td>
                    <td className="border border-gray-300 text-[17px]">
                      {scan.firewall_scan_results?.hostnames?.length > 0
                        ? scan.firewall_scan_results.hostnames.map(h => h.name).join(", ")
                        : "N/A"}
                    </td>
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
                      <td colSpan="4" className="p-4 border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Address Information</h3>
                            <p><strong>IP:</strong> {scan.ip}</p>
                            <p><strong>MAC:</strong> {scan.firewall_scan_results?.addresses?.mac || "N/A"}</p>
                            <p><strong>Vendor:</strong> {
                              scan.firewall_scan_results?.vendor?.[scan.firewall_scan_results?.addresses?.mac] || "Unknown"
                            }</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">Status</h3>
                            <p><strong>State:</strong> {scan.firewall_scan_results?.status?.state || "Unknown"}</p>
                            <p><strong>Reason:</strong> {scan.firewall_scan_results?.status?.reason || "N/A"}</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h3 className="font-semibold text-lg mb-2">Hostnames</h3>
                          {scan.firewall_scan_results?.hostnames?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {scan.firewall_scan_results.hostnames.map((host, i) => (
                                <div key={i} className="bg-gray-100 p-2 rounded">
                                  <p><strong>Type:</strong> {host.type}</p>
                                  <p><strong>Name:</strong> {host.name}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500">No hostnames found</p>
                          )}
                        </div>

                        <div className="mt-4">
                          <h3 className="font-semibold text-lg mb-2">Open Ports</h3>
                          {scan.firewall_scan_results?.tcp ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                              {Object.entries(scan.firewall_scan_results.tcp).map(([port, details]) => (
                                <div key={port} className="bg-gray-100 p-2 rounded">
                                  <p className="font-medium">Port {port}</p>
                                  <p>Service: {details.name || "Unknown"}</p>
                                  <p className={details.state === "open" ? "text-green-600" : "text-gray-600"}>
                                    Status: {details.state}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500">No open ports detected</p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 font-semibold">No scans found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};