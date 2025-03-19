import React, { useState, useEffect } from "react";

export const Syn_history = () => {
  const [scans, setScans] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async (date = null) => {
    let url = "http://127.0.0.1:5000/api/syn_scans";
    if (date) {
      url += `?date=${date}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setScans(data);
    } catch (error) {
      console.error("Error fetching SYN scans:", error);
    }
  };

  const handleDateChange = async (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);

    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
    await fetchScans(formattedDate);
  };

  return (
    <div className="container mx-auto px-6">
      <h2 className="text-2xl font-bold text-center mb-4">SYN Scan Results</h2>

      <div className="flex justify-center mb-4">
        <input
          type="date"
          className="p-2 rounded-md input w-full font-bold text-white max-w-xs bg-[#090a09]"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white font-semibold text-[17px]">
              <th className="border border-gray-300">IP Address</th>
              <th className="border border-gray-300">Status</th>
              <th className="border border-gray-300">OS Detected</th>
              <th className="border border-gray-300">Open Ports</th>
              <th className="border border-gray-300">Scan Date</th>
            </tr>
          </thead>
          <tbody>
            {scans.length > 0 ? (
              scans.map((scan) => (
                <tr key={scan._id ? scan._id.toString() : scan.ip} className="hover:bg-gray-100">
                  <td className="border border-gray-300">{scan.ip}</td>
                  <td className="border border-gray-300">
                    <span
                      className={`px-2 py-1 rounded ${
                        scan.status === "up" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {scan.status}
                    </span>
                  </td>
                  <td className="border border-gray-300">
                    {scan.scan_results.osmatch.length > 0
                      ? scan.scan_results.osmatch[0].name
                      : "Unknown"}
                  </td>
                  <td className="border border-gray-300">
                    {scan.scan_results.tcp && Object.keys(scan.scan_results.tcp).length > 0 ? (
                      <ul className="list-disc pl-4">
                        {Object.entries(scan.scan_results.tcp).map(([port, details]) => (
                          <li key={port} className="text-gray-700">
                            {port} ({details.name || "unknown service"})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No open ports"
                    )}
                  </td>
                  <td className="border border-gray-300">
                    {new Date(scan.scan_date).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No scans found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
