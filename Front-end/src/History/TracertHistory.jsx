import React, { useState, useEffect } from "react";

export const TracertHistory = () => {
  const [scans, setScans] = useState([]);
  const [searchIp, setSearchIp] = useState(""); // Search input value
  const [ipSuggestions, setIpSuggestions] = useState([]); // Unique IP suggestions
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    fetchScans();
    fetchUniqueIps(); // Fetch unique IPs for suggestions
  }, []);

  const fetchScans = async (ip = "") => {
    setLoading(true);
    setError(null);

    let url = "http://127.0.0.1:5000/api/traceroute_scans";
    if (ip) {
      url += `?ip=${ip}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setScans(data);
    } catch (error) {
      setError("Failed to load scan results.");
      console.error("Error fetching scans:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniqueIps = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/traceroute_unique_ips");
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
    fetchScans(searchIp);
  };

  const handleDelete = async (scanId) => {
    if (!window.confirm("Are you sure you want to delete this scan?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/traceroute_scans/${scanId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete scan.");
      }

      setScans(scans.filter(scan => scan._id !== scanId));
    } catch (error) {
      console.error("Error deleting scan:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-6">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Traceroute Scan Results</h2>

      <div className="flex items-center mb-4">
        <div className="relative w-[50%]">
          <input
            type="text"
            placeholder="Search by IP"
            className="p-2 border border-gray-400 rounded-md w-full bg-gray-50 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-300"
            value={searchIp}
            onChange={(e) => {
              setSearchIp(e.target.value);
              setShowDropdown(e.target.value !== "");
            }}
          />
          {showDropdown && ipSuggestions.length > 0 && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-full mt-1 max-h-40 overflow-y-auto shadow-lg">
              {ipSuggestions
                .filter(ip => ip.startsWith(searchIp))
                .map((ip, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearchIp(ip);
                      setShowDropdown(false);
                      fetchScans(ip);
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
          className="ml-3 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          onClick={handleSearch}
        >
          Search
        </button>
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
                <th className="border text-lg border-gray-300">IP Address</th>
                <th className="border text-lg border-gray-300">MAC Address</th>
                <th className="border text-lg border-gray-300">Scan Date</th>
                <th className="border text-lg border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan, index) => {
                const isExpanded = expandedRow === index;
                const macAddress = scan.traceroute_data?.addresses?.mac || "Unknown";
                const scanDate = new Date(scan.scan_date).toLocaleString();

                return (
                  <React.Fragment key={scan._id}>
                    <tr className="hover:bg-gray-100">
                      <td className="border border-gray-300 text-[17px]">{scan.ip}</td>
                      <td className="border border-gray-300 text-[17px]">{macAddress}</td>
                      <td className="border border-gray-300 text-[17px]">{scanDate}</td>
                      <td className="border border-gray-300 text-[17px]">
                        <button
                          className="px-3 py-1 bg-blue-600 text-white rounded-md mr-2 hover:bg-blue-700"
                          onClick={() => setExpandedRow(isExpanded ? null : index)}
                        >
                          {isExpanded ? "Hide" : "View"}
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                          onClick={() => handleDelete(scan._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-gray-50">
                        <td colSpan="4" className="p-4 border">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-semibold text-lg mb-2">Address Information</h3>
                              <p><strong>IPv4:</strong> {scan.traceroute_data?.addresses?.ipv4 || "Unknown"}</p>
                              <p><strong>MAC:</strong> {macAddress}</p>
                              <p><strong>Vendor:</strong> {scan.traceroute_data?.vendor?.[macAddress] || "Unknown"}</p>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-2">Status</h3>
                              <p><strong>State:</strong> {scan.traceroute_data?.status?.state || "Unknown"}</p>
                              <p><strong>Reason:</strong> {scan.traceroute_data?.status?.reason || "N/A"}</p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h3 className="font-semibold text-lg mb-2">Open Ports & Services</h3>
                            {scan.traceroute_data?.tcp ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {Object.entries(scan.traceroute_data.tcp).map(([port, details]) => (
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
                              <p className="text-gray-500">No open ports detected.</p>
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
        ) : (
          <p className="text-center text-gray-500 font-semibold">No scans found.</p>
        )}
      </div>
    </div>
  );
};