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
        <div className="p-4 border-l-4 border-purple-500 bg-slate-100 rounded-lg">
          <h3 className="text-xl font-semibold">🔹 All Ports</h3>
          <p className="mt-2 text-gray-700">
            To scan all ports (1-65535):
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -p- [target IP]</code>
          </p>
        </div>

        <div className="p-4 border-l-4 border-blue-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🖥️ OS Detection</h3>
          <p className="mt-2 text-gray-700">
            Detect the operating system of a target:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -O [target IP]</code>
          </p>
        </div>

        {/* Service Version Detection */}
        <div className="p-4 border-l-4 border-yellow-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🔍 Service Version Detection</h3>
          <p className="mt-2 text-gray-700">
            Identify service versions running on open ports:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -sV [target IP]</code>
          </p>
        </div>

        {/* Aggressive Scan */}
        <div className="p-4 border-l-4 border-red-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">⚡ Aggressive Scan</h3>
          <p className="mt-2 text-gray-700">
            Perform an aggressive scan (OS detection, version detection, script scanning):
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -A [target IP]</code>
          </p>
        </div>

        {/* Stealth Scan */}
        <div className="p-4 border-l-4 border-purple-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🕵️ Stealth Scan</h3>
          <p className="mt-2 text-gray-700">
            Conduct a stealth scan using SYN packets:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -sS [target IP]</code>
          </p>
        </div>

        {/* UDP Scan */}
        <div className="p-4 border-l-4 border-green-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">📡 UDP Scan</h3>
          <p className="mt-2 text-gray-700">
            Scan for open UDP ports:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -sU [target IP]</code>
          </p>
        </div>

        {/* Script Scanning */}
        <div className="p-4 border-l-4 border-teal-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">📜 Script Scanning</h3>
          <p className="mt-2 text-gray-700">
            Use built-in scripts to scan vulnerabilities:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap --script=vuln [target IP]</code>
          </p>
        </div>

        {/* Scan a Subnet */}
        <div className="p-4 border-l-4 border-orange-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🌐 Scan a Subnet</h3>
          <p className="mt-2 text-gray-700">
            Scan an entire subnet for live hosts:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap [target subnet]/24</code>
          </p>
        </div>

        {/* Scan Multiple Targets */}
        <div className="p-4 border-l-4 border-pink-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">📌 Scan Multiple Targets</h3>
          <p className="mt-2 text-gray-700">
            Scan multiple hosts in one command:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap [target1] [target2]</code>
          </p>
        </div>

        {/* Output Scan Results */}
        <div className="p-4 border-l-4 border-indigo-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">📄 Output Scan Results</h3>
          <p className="mt-2 text-gray-700">
            Save scan results to a file:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -oN output.txt [target IP]</code>
          </p>
        </div>

        {/* Fast Scan */}
        <div className="p-4 border-l-4 border-blue-400 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">⚡ Fast Scan</h3>
          <p className="mt-2 text-gray-700">
            Scan the 100 most common ports quickly:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -F [target IP]</code>
          </p>
        </div>

        {/* Detect Firewalls and IDS */}
        <div className="p-4 border-l-4 border-red-400 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🚧 Detect Firewalls/IDS</h3>
          <p className="mt-2 text-gray-700">
            Detect if a firewall or Intrusion Detection System (IDS) is present:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -sA [target IP]</code>
          </p>
        </div>

        {/* Evading Firewalls */}
        <div className="p-4 border-l-4 border-purple-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🕵️ Evading Firewalls</h3>
          <p className="mt-2 text-gray-700">
            Fragment packets to bypass firewalls:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -f [target IP]</code>
          </p>
        </div>

        {/* Scan with Custom Timing */}
        <div className="p-4 border-l-4 border-green-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">⏳ Scan with Custom Timing</h3>
          <p className="mt-2 text-gray-700">
            Adjust scan speed (0 = slow, 5 = fast):
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -T[0-5] [target IP]</code>
          </p>
        </div>

        {/* Scan with Spoofed MAC Address */}
        <div className="p-4 border-l-4 border-teal-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🎭 Spoof MAC Address</h3>
          <p className="mt-2 text-gray-700">
            Change the source MAC address for scanning:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap --spoof-mac [MAC] [target IP]</code>
          </p>
        </div>

        {/* DNS Brute Force */}
        <div className="p-4 border-l-4 border-orange-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🌐 DNS Brute Force</h3>
          <p className="mt-2 text-gray-700">
            Enumerate subdomains via DNS brute force:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap --script dns-brute [target domain]</code>
          </p>
        </div>

        {/* Scan using Decoy IPs */}
        <div className="p-4 border-l-4 border-pink-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🕶️ Scan Using Decoys</h3>
          <p className="mt-2 text-gray-700">
            Mask real IP with decoys to evade detection:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -D RND:5 [target IP]</code>
          </p>
        </div>

        {/* TCP Connect Scan */}
        <div className="p-4 border-l-4 border-indigo-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🔌 TCP Connect Scan</h3>
          <p className="mt-2 text-gray-700">
            Perform a full TCP connection scan:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -sT [target IP]</code>
          </p>
        </div>

        {/* Null Scan */}
        <div className="p-4 border-l-4 border-gray-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🚫 Null Scan</h3>
          <p className="mt-2 text-gray-700">
            Scan without setting any TCP flags (stealthy):
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -sN [target IP]</code>
          </p>
        </div>

        {/* Xmas Scan */}
        <div className="p-4 border-l-4 border-red-600 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🎄 Xmas Scan</h3>
          <p className="mt-2 text-gray-700">
            Set FIN, PSH, and URG flags to check for open ports:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -sX [target IP]</code>
          </p>
        </div>

        {/* FIN Scan */}
        <div className="p-4 border-l-4 border-yellow-600 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🛑 FIN Scan</h3>
          <p className="mt-2 text-gray-700">
            Send FIN flag to detect open ports:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -sF [target IP]</code>
          </p>
        </div>

        {/* Scan for Specific Vulnerabilities */}
        <div className="p-4 border-l-4 border-lime-600 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🛡️ Scan for Vulnerabilities</h3>
          <p className="mt-2 text-gray-700">
            Check for known vulnerabilities using NSE scripts:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap --script vuln [target IP]</code>
          </p>
        </div>

        {/* Traceroute Scan */}
        <div className="p-4 border-l-4 border-cyan-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🔀 Traceroute</h3>
          <p className="mt-2 text-gray-700">
            Map the network path to the target:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap --traceroute [target IP]</code>
          </p>
        </div>

        {/* Scan for IPv6 Hosts */}
        <div className="p-4 border-l-4 border-emerald-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">🟢 IPv6 Scan</h3>
          <p className="mt-2 text-gray-700">
            Scan an IPv6 address:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -6 [target IPv6]</code>
          </p>
        </div>

        {/* Scan Hosts from a File */}
        <div className="p-4 border-l-4 border-violet-500 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">📂 Scan from a File</h3>
          <p className="mt-2 text-gray-700">
            Scan multiple hosts from a file:
            <br />
            <code className="bg-gray-200 p-1 rounded">nmap -iL hosts.txt</code>
          </p>
        </div>

      </div>
    </div>
  )
}
