import React, { useState, useEffect } from "react";

export const AggHistory = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedScan, setExpandedScan] = useState(null);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/aggressive_scans");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setScans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  const toggleExpand = (index) => {
    setExpandedScan(expandedScan === index ? null : index);
  };

  if (loading) return <p className="text-center text-blue-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
        Aggressive Scan History
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-gray-700">
              <th className="p-3 border border-gray-300">IP</th>
              <th className="p-3 border border-gray-300">Hostnames</th>
              <th className="p-3 border border-gray-300">Open Ports</th>
              <th className="p-3 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scans.map((scan, index) => {
              const scanResults = scan.scan_results || {};
              
              // Extract hostnames
              const hostnames =
                scanResults.hostnames && scanResults.hostnames.length > 0
                  ? scanResults.hostnames.map((host) => host.name).join(", ")
                  : "Unknown";

              // Extract open ports
              const openPorts =
                scanResults.portused
                  ?.filter((port) => port.state === "open")
                  ?.map((port) => `${port.portid}/${port.proto}`)
                  .join(", ") || "None";

              return (
                <React.Fragment key={index}>
                  <tr className="border border-gray-300 hover:bg-gray-100">
                    <td className="p-3 border border-gray-300 text-gray-800">{scan.ip}</td>
                    <td className="p-3 border border-gray-300 text-gray-800">{hostnames}</td>
                    <td className="p-3 border border-gray-300 text-gray-800">{openPorts}</td>
                    <td className="p-3 border border-gray-300 text-center">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        onClick={() => toggleExpand(index)}
                      >
                        {expandedScan === index ? "Hide Details" : "View Details"}
                      </button>
                    </td>
                  </tr>
                  {expandedScan === index && (
                    <tr className="bg-white border-t">
                      <td colSpan="4" className="p-6 text-gray-800">
                        <h3 className="font-bold text-xl mb-3">Detailed Scan Information</h3>
                        <p><strong>IP Address:</strong> {scan.ip}</p>
                        <p><strong>MAC Address:</strong> {scanResults.addresses?.mac || "N/A"}</p>
                        <p><strong>Hostnames:</strong> {hostnames}</p>
                        <p><strong>Status:</strong> {scanResults.status?.state || "Unknown"}</p>
                        
                        <h4 className="font-bold mt-4 text-lg">Detected Services:</h4>
                        {scanResults.tcp ? (
                          <ul className="list-disc pl-6 text-gray-700">
                            {Object.entries(scanResults.tcp).map(([port, details], i) => (
                              <li key={i} className="mb-2">
                                <strong>Port:</strong> {port}/tcp  
                                <br />
                                <strong>Service:</strong> {details.name || "Unknown"}
                                <br />
                                <strong>Product:</strong> {details.product || "Unknown"}
                                <br />
                                <strong>Version:</strong> {details.version || "N/A"}
                                <br />
                                <strong>Extra Info:</strong> {details.extrainfo || "None"}
                                <br />
                                <strong>CPE:</strong> {details.cpe || "N/A"}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600">No open services detected</p>
                        )}

                        <h4 className="font-bold mt-4 text-lg">Operating System Information:</h4>
                        {scanResults.osmatch ? (
                          <ul className="list-disc pl-6 text-gray-700">
                            {scanResults.osmatch.map((os, i) => (
                              <li key={i}>
                                <strong>OS:</strong> {os.name}  
                                <br />
                                <strong>Accuracy:</strong> {os.accuracy}%
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600">No OS detected</p>
                        )}

                        <h4 className="font-bold mt-4 text-lg">Relevant Scripts:</h4>
                        {scanResults.tcp ? (
                          <ul className="list-disc pl-6 text-gray-700">
                            {Object.entries(scanResults.tcp)
                              .filter(([_, details]) => details.script)
                              .flatMap(([_, details]) =>
                                Object.entries(details.script).map(([scriptId, output], i) => (
                                  <li key={i}>
                                    <strong>{scriptId}:</strong> {output}
                                  </li>
                                ))
                              )}
                          </ul>
                        ) : (
                          <p className="text-gray-600">No scripts detected</p>
                        )}

                        <h4 className="font-bold mt-4 text-lg">Uptime:</h4>
                        {scanResults.uptime ? (
                          <p className="text-gray-700">
                            <strong>Last Boot:</strong> {scanResults.uptime.lastboot}  
                            <br />
                            <strong>Uptime Seconds:</strong> {scanResults.uptime.seconds}
                          </p>
                        ) : (
                          <p className="text-gray-600">Uptime data not available</p>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
