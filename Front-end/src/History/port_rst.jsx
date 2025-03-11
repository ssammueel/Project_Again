import React, { useState, useEffect } from "react";

export const PortRst = () => {
  const [scans, setScans] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = (date = null) => {
    let url = "http://127.0.0.1:5000/api/scans"; // Default fetch all scans

    if (date) {
        url += `?date=${date}`;
    }

    console.log("🔍 Fetching from:", url);

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log("✅ Scans received:", data);
            setScans(data); // Ensure this updates your UI
        })
        .catch((error) => console.error("Error fetching scans:", error));
};

const handleDateChange = (event) => {
    let selectedDate = event.target.value; // Raw date from input
    console.log("Raw selected date:", selectedDate);

    // Ensure it's in YYYY-MM-DD format
    if (!selectedDate) {
        console.error("No date selected!");
        return;
    }

    let formattedDate = new Date(selectedDate).toISOString().split("T")[0]; // Converts to YYYY-MM-DD
    console.log("Formatted date sent to backend:", formattedDate);

    fetchScans(formattedDate);
};


  const filteredScans = selectedDate
    ? scans.filter((scan) => scan.scan_date.startsWith(selectedDate))
    : scans;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Port Scan Results</h2>

      {/* Date Filter */}
      <div className="flex justify-center mb-4">
        <input
          type="date"
          className="input input-bordered w-full max-w-xs"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th>IP Address</th>
              <th>Start Port</th>
              <th>End Port</th>
              <th>Open Ports</th>
              <th>Scan Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredScans.length > 0 ? (
              filteredScans.map((scan) => (
                <tr key={scan._id} className="hover:bg-gray-100">
                  <td>{scan.ip}</td>
                  <td>{scan.start_port}</td>
                  <td>{scan.end_port}</td>
                  <td>{scan.open_ports.join(", ")}</td>
                  <td>{new Date(scan.scan_date).toLocaleString()}</td>
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
