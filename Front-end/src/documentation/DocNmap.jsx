import React from 'react'

export const DocNmap = () => {
  return (
    <div>
      <div className="bg-white p-6 shadow-md rounded-lg flex flex-col gap-5">
        <h2 className="text-2xl font-semibold text-sky-600 mb-4">Nmap</h2>
        
        {/* Nmap Port States */}
        <div className="p-4 border-l-4 border-purple-500 bg-slate-100 rounded-lg">
          <h3 className="text-xl font-semibold">🔹 Nmap Port States</h3>
          <ul className="mt-2 text-gray-700 list-disc pl-5">
            <li><strong>Open:</strong> A service is actively listening on this port.</li>
            <li><strong>Closed:</strong> The port is reachable but no service is listening.</li>
            <li><strong>Filtered:</strong> Firewall or filtering prevents determining state.</li>
            <li><strong>Unfiltered:</strong> The port is reachable but state is unknown.</li>
            <li><strong>Open|Filtered:</strong> Could be open or filtered; no response received.</li>
            <li><strong>Closed|Filtered:</strong> Could be closed or filtered; uncertain state.</li>
          </ul>
        </div>

        {/* Specific Port */}
        <div className="p-4 border-l-4 border-sky-500 bg-slate-100 rounded-lg">
          <h3 className="text-xl font-semibold">🔹 Specific Port</h3>
          <p className="mt-2 text-gray-700">
            To scan a specific port:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -p [port] [target IP]</code>
          </p>
        </div>

        {/* Range of Ports */}
        <div className="p-4 border-l-4 border-green-500 bg-slate-100 rounded-lg">
          <h3 className="text-xl font-semibold">🔹 Range of Ports</h3>
          <p className="mt-2 text-gray-700">
            To scan a range of ports:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -p [start_port]-[end_port] [target IP]</code>
          </p>
        </div>

        {/* All Ports */}
        <div className="p-4 border-l-4 border-green-500 bg-slate-100 rounded-lg">
          <h3 className="text-xl font-semibold">🔹 All Ports</h3>
          <p className="mt-2 text-gray-700">
            To scan all ports (1-65535):
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -p- [target IP]</code>
          </p>
        </div>
      </div>
    </div>
  )
}
