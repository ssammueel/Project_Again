import React, { useState, useEffect } from "react";

export const PortRst = () => {
  const [scans, setScans] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchScans();
  }, []); //call the function when the component mounts

  const fetchScans = async (date = null) => {
    let url = "http://127.0.0.1:5000/api/scans";
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
      console.error("Error fetching scans:", error);
    }
  };

  const handleDateChange = async (event) => {
    const selectedDate = event.target.value;
    if (!selectedDate) return;

    setSelectedDate(selectedDate);

    // Ensure the date is in YYYY-MM-DD format
    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];
    
    // Fetch scans for selected date
    await fetchScans(formattedDate);
  };

  return (
    <div className="container mx-auto px  -6">
      <h2 className="text-2xl font-bold text-center mb-4">Port Scan Results</h2>

      <div className="flex justify-center mb-4">
        <input type="date" className="p-2 rounded-md input w-full font-bold text-white max-w-xs bg-[#090a09]" value={selectedDate}
          onChange={handleDateChange} />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white font-semibold text-[17px]">
              <th className="border border-gray-300">IP Address</th>
              <th className="border border-gray-300">Start Port</th>
              <th className="border border-gray-300">End Port</th>
              <th className="border border-gray-300">Open Ports</th>
              <th className="border border-gray-300]">Scan Date</th>
            </tr>
          </thead>
          <tbody>
            {scans.length > 0 ? (
              scans.map((scan) => (
                <tr key={scan._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300">{scan.ip}</td>
                  <td className="border border-gray-300">{scan.start_port}</td>
                  <td className="border border-gray-300">{scan.end_port}</td>
                  <td className="border border-gray-300">{scan.open_ports.join(", ")}</td>
                  <td className="border border-gray-300">{new Date(scan.scan_date).toLocaleString()}</td>
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
