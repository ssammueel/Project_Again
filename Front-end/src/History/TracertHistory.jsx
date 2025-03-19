import { useState, useEffect } from "react";

export const TracertHistory = () => {
  const [scans, setScans] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async (date = "") => {
    try {
      let url = "http://127.0.0.1:5000/api/traceroute_scans";
      if (date) {
        const formattedDate = new Date(date).toISOString().split("T")[0];
        url += `?date=${formattedDate}`;
      }
  
      const response = await fetch(url);
      const responseBody = await response.text(); // Get raw response body
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - Response: ${responseBody}`);
      }
  
      const data = JSON.parse(responseBody); // Parse only if no error
      setScans(data);
      console.log("Fetched Data:", data); // ✅ Check in console
    } catch (error) {
      console.error("Error fetching scans:", error);
    }
  };
  

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Traceroute Scan History</h1>

      {/* Date Picker */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="date"
          className="border bg-slate-300 p-2 rounded-md"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button
          onClick={() => fetchScans(selectedDate)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Filter
        </button>
      </div>

      {/* Scan Results Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">IP Address</th>
              <th className="border p-2 text-left">MAC Address</th>
              <th className="border p-2 text-left">Detected Services</th>
              <th className="border p-2 text-left">Scan Date</th>
            </tr>
          </thead>
          <tbody>
            {scans.length > 0 ? (
              scans.map((scan, index) => {
                let macAddress = "Unknown";
                let detectedPorts = "No open ports";

                if (typeof scan.traceroute_data === "object") {
                  macAddress =
                    scan.traceroute_data?.addresses?.mac || "Unknown";

                  detectedPorts = scan.traceroute_data?.tcp
                    ? Object.entries(scan.traceroute_data.tcp)
                        .map(
                          ([port, details]) =>
                            `Port: ${port} (${details.name}) - ${details.state}`
                        )
                        .join(", ")
                    : "No open ports";
                }

                return (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="border p-2">{scan.ip}</td>
                    <td className="border p-2">{macAddress}</td>
                    <td className="border p-2">{detectedPorts}</td>
                    <td className="border p-2">
                      {new Date(scan.scan_date).toLocaleString()}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
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
