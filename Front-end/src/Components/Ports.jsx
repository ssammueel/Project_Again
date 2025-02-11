import React, { useState } from 'react';
import { Footer } from './Footer';

// port scan 
export const PtScan = () => {
    const [ipAddress, setIpAddress] = useState('');
    const [startPort, setStartPort] = useState('');
    const [endPort, setEndPort] = useState('');
    const [openPorts, setOpenPorts] = useState([]);
    const[isScanning, setIsScanning] = useState(false)

    const handleKeyDown = (e, nextInput) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleScan = async () => {
        if (!ipAddress || !startPort || !endPort) {
            alert('Please fill in all fields.');
            return;
        }
        setOpenPorts([]) // this is to clear the previous ports
        setIsScanning(true) 

        try {
            const response = await fetch('http://127.0.0.1:5000/api/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ip: ipAddress,
                    startPort: parseInt(startPort),
                    endPort: parseInt(endPort),
                }),
            });

            const data = await response.json();
            setOpenPorts(data.openPorts || []);
            
        } catch (error) {
            alert('Error scanning ports. Please check your connection and input.');
            console.error('Error:', error);
        }finally{
            setIsScanning(false)
        }
    };

    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 flex flex-col p-3 gap-3 w-[45%] h-fit">
                
                <label>IP Address:</label>
                <input className="bg-white p-2 indent-3 outline-none rounded-btn" type="text" placeholder="Enter IP address"
                    id="ipenter" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, document.getElementById('startport'))}
                />

                <label>Start Port:</label>
                <input
                    className="bg-white p-2 indent-3 outline-none rounded-btn"
                    type="text"
                    placeholder="Enter start port"
                    id="startport"
                    value={startPort}
                    onChange={(e) => setStartPort(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, document.getElementById('endport'))}
                />

                <label>End Port:</label>
                <input
                    className="bg-white p-2 indent-3 outline-none rounded-btn"
                    type="text"
                    placeholder="Enter end port"
                    id="endport"
                    value={endPort}
                    onChange={(e) => setEndPort(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, document.getElementById('scan'))}
                />

                <button className="btn btn-accent w-fit px-5 mt-4" id="scan" disabled={isScanning} >
                {isScanning ? "Scanning..." : "Scan"}
                </button>
            </form>
            <div className="mt-5">
    <h2 className="font-bold">Open Ports</h2>
    {isScanning ? (
        <p className="text-yellow-600">Scanning in progress...</p>
    ) : openPorts.length > 0 ? (
        openPorts.map((port) => <p key={port}>Port {port} is open</p>)
    ) : (
        <p>No open ports detected.</p>
    )}
</div>

        </>
    );
};

// udp scan 
export const UdpScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [results, setResults] = useState({});
    const [isScanning, setIsScanning] = useState(false); // Track scan progress

    const handleScan = async () => {
        if (!ipAddress) {
            alert("Please enter an IP address.");
            return;
        }

        setResults({}); // Clear previous results
        setIsScanning(true); // Show scanning state

        try {
            const response = await fetch("http://127.0.0.1:5000/api/scan_udp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ip: ipAddress }),
            });

            const result = await response.json();
            setResults(result.udp_scan_results || {});
        } catch (error) {
            console.error("Error scanning UDP ports:", error);
            setResults({});
        } finally {
            setIsScanning(false); // Hide scanning state
        }
    };

    return (
        <div className='pt-7 w-[100%]'>
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3 flex flex-col gap-4 w-[70%]">
                <label>IP Address:</label>
                <input 
                    className="bg-white p-2 rounded" 
                    type="text" 
                    placeholder="Enter IP" 
                    value={ipAddress} 
                    onChange={(e) => setIpAddress(e.target.value)} 
                />
                <button type="submit" className="btn w-fit btn-primary mt-2" disabled={isScanning}>
                    {isScanning ? "Scanning..." : "UDP Scan"}
                </button>
            </form>

            <div className="mt-5">
                <h2>UDP Scan Results</h2>
                {isScanning ? (
                    <p className="text-yellow-600">Scanning in progress...</p>
                ) : Object.keys(results).length > 0 ? (
                    <pre>{JSON.stringify(results, null, 2)}</pre>
                ) : (
                    <p>No results available.</p>
                )}
            </div>
        </div>
    );
};

//sysscan
export const SynScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [results, setResults] = useState({});
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        if (!ipAddress) {
            alert("Please enter an IP address.");
            return;
        }

        // Clear previous results and show scanning message
        setResults({});
        setIsScanning(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/scan_syn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip: ipAddress }),
            });
            const result = await response.json();
            setResults(result.syn_scan_results || {});
        } catch (error) {
            console.error("Error scanning SYN ports:", error);
            setResults({ error: "Scan failed. Please try again." });
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className='w-[100%] mt-6'>
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3 w-[70%] flex flex-col gap-4 rounded-lg shadow">
                <label>IP Address:</label>
                <input 
                    className="bg-white p-2 rounded" 
                    type="text" 
                    placeholder="Enter IP" 
                    value={ipAddress} 
                    onChange={(e) => setIpAddress(e.target.value)} 
                />
                <button type="submit" className="btn btn-primary mt-2 w-fit">
                    {isScanning ? "Scanning..." : "SYN Stealth Scan"}
                </button>
            </form>
            
            <div className="mt-5">
                <h2>syn_Scan Results</h2>
                {isScanning ? (
                    <p className="text-yellow-600">Scanning in progress...</p>
                ) : Object.keys(results).length > 0 ? (
                    <pre>{JSON.stringify(results, null, 2)}</pre>
                ) : (
                    <p>No results available.</p>
                )}
            </div>
        </div>
    );
};

// traceroute scan 
export const TracerouteScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [results, setResults] = useState({});
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        if (!ipAddress.trim()) {
            alert("Please enter a valid IP address.");
            return;
        }

        setResults({});
        setIsScanning(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/scan_traceroute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip: ipAddress }),
            });

            const result = await response.json();
            setResults(result.traceroute_results || {});
        } catch (error) {
            console.error("Error scanning traceroute:", error);
            setResults({ error: "Failed to fetch traceroute results." });
        } finally {
            setIsScanning(false);
        }
    };

    const handleClear = () => {
        setIpAddress("");
        setResults({});
    };

    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-6 w-[90%]">
            <h2 className="text-lg font-bold mb-2">Traceroute Scan</h2>
            <input
                className="bg-white p-2 rounded w-full border border-gray-400 mb-2"
                type="text"
                placeholder="Enter IP address"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleScan}
                    disabled={isScanning}
                >
                    {isScanning ? "Scanning..." : "Run Traceroute"}
                </button>
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>

            <div className="mt-5">
                <h2 className="font-bold">Traceroute Scan Results</h2>
                {isScanning ? (
                    <p className="text-yellow-600">Scanning in progress...</p>
                ) : Object.keys(results).length > 0 ? (
                    <pre className="bg-gray-300 p-3 rounded">{JSON.stringify(results, null, 2)}</pre>
                ) : (
                    <p>No results available.</p>
                )}
            </div>
        </div>
    );
};

// detect os 
export const Detectos = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [detectedOs, setDetectedOs] = useState("");
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        if (!ipAddress) {
            alert("Please enter an IP address.");
            return;
        }

        // Clear previous results and show scanning message
        setDetectedOs("");
        setIsScanning(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/detect_os', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip: ipAddress }),
            });

            if (response.ok) {
                const result = await response.json();
                setDetectedOs(result.detected_os || "OS not detected.");
            } else {
                setDetectedOs("Error detecting OS");
            }
        } catch (error) {
            console.error("Error detecting OS:", error);
            setDetectedOs("Error detecting OS");
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className='w-[100%] mt-6'>
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 flex flex-col p-3 gap-3 h-fit w-[90%]">
                <label>IP Address:</label>
                <input
                    className="bg-white p-2 indent-3 outline-none rounded-btn"
                    type="text"
                    placeholder="Enter IP address"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                />
                <button type="submit" className="btn btn-accent w-fit px-5 mt-4">
                    {isScanning ? "Scanning..." : "Scan"}
                </button>
            </form>

            <div className="mt-5">
                <h2 className="font-bold">Detected OS</h2>
                {isScanning ? (
                    <p>Scanning in progress...</p>
                ) : detectedOs ? (
                    <p>Detected OS for IP {ipAddress}: {detectedOs}</p>
                ) : (
                    <p>No OS detected yet.</p>
                )}
            </div>
        </div>
    );
};

//service scan
export const ServiceScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [services, setServices] = useState({});
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        if (!ipAddress) {
            alert("Please enter an IP address.");
            return;
        }

        // Clear previous results and show scanning message
        setServices({});
        setIsScanning(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/scan_services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip: ipAddress }),
            });

            const result = await response.json();
            setServices(result.services || {});
        } catch (error) {
            console.error("Error scanning services:", error);
            setServices({});
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="mt-6 w-[100%]">
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3 gap-3 w-[90%] flex flex-col gap-3">
                <label>IP Address:</label>
                <input
                    className="bg-white p-2 rounded"
                    type="text"
                    placeholder="Enter IP address"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                />
                <button type="submit" className="btn w-fit btn-primary mt-2">
                    {isScanning ? "Scanning..." : "Scan Services"}
                </button>
            </form>

            <div className="mt-5">
                <h2 className="font-bold ">Detected Services</h2>
                {isScanning ? (
                    <p>Scanning...</p>
                ) : Object.keys(services).length > 0 ? (
                    <ul className="bg-gray-200 p-3 rounded">
                        {Object.entries(services).map(([port, info]) => (
                            <li key={port} className="border-b py-2">
                                <strong>Port {port}:</strong> {info.name || "Unknown"} ({info.state})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No services detected.</p>
                )}
            </div>
        </div>
    );
};

//subnet scan
export const SubnetScan = () => {
    const [subnet, setSubnet] = useState("");
    const [liveHosts, setLiveHosts] = useState([]);
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        if (!subnet) {
            alert("Please enter a subnet.");
            return;
        }

        // Clear previous results and show scanning message
        setLiveHosts([]);
        setIsScanning(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/scan_subnet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subnet }),
            });

            const result = await response.json();
            setLiveHosts(result.live_hosts || []);
        } catch (error) {
            console.error("Error scanning subnet:", error);
            setLiveHosts([]);
        } finally {
            setIsScanning(false);
        }
    };

    const handleClear = () => {
        setSubnet("");
        setLiveHosts([]);
    };

    return (
        <div className="mt-6 w-[100%]">
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3 gap-3 w-[90%] flex flex-col gap-3">
                <label>Subnet:</label>
                <input
                    className="bg-white p-2 rounded"
                    type="text"
                    placeholder="Enter Subnet (e.g., 192.168.1.0/24)"
                    value={subnet}
                    onChange={(e) => setSubnet(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                    <button type="submit" className="btn btn-primary">
                        {isScanning ? "Scanning..." : "Scan Subnet"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleClear}>
                        Clear
                    </button>
                </div>
            </form>

            <div className="mt-5">
                <h2 className="font-bold">Live Hosts</h2>
                {isScanning ? (
                    <p>Scanning...</p>
                ) : liveHosts.length > 0 ? (
                    <ul className="bg-gray-200 p-3 rounded">
                        {liveHosts.map((host) => (
                            <li key={host} className="border-b py-2">{host}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No live hosts detected.</p>
                )}
            </div>
        </div>
    );
};

// vulnscan 
export const VulnScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [vulns, setVulns] = useState([]);
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        if (!ipAddress) {
            alert("Please enter an IP address.");
            return;
        }

        // Clear previous results and show scanning indicator
        setVulns([]);
        setIsScanning(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/scan_vuln', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip: ipAddress }),
            });

            const result = await response.json();
            setVulns(result.vulnerabilities || []);
        } catch (error) {
            console.error("Error scanning vulnerabilities:", error);
            setVulns([]);
        } finally {
            setIsScanning(false);
        }
    };

    const handleClear = () => {
        setIpAddress("");
        setVulns([]);
    };

    return (
        <div className="mt-5 w-[100%]">
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3 w-[90%] flex flex-col gap-3">
                <label>IP Address:</label>
                <input
                    className="bg-white p-2 rounded"
                    type="text"
                    placeholder="Enter IP"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                    <button type="submit" className="btn btn-primary">
                        {isScanning ? "Scanning..." : "Scan Vulnerabilities"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleClear}>
                        Clear
                    </button>
                </div>
            </form>

            <div className="mt-5">
                <h2 className="font-bold">Vulnerability Scan Results</h2>
                {isScanning ? (
                    <p className="text-yellow-600">Scanning in progress...</p>
                ) : vulns.length > 0 ? (
                    <ul className="bg-gray-200 p-3 rounded">
                        {vulns.map((vuln, index) => (
                            <li key={index} className="border-b py-2">
                                {vuln}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No vulnerabilities detected.</p>
                )}
            </div>
        </div>
    );
};

// aggregasive scan 
export const AggressiveScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [results, setResults] = useState({});
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        if (!ipAddress) {
            alert("Please enter an IP address.");
            return;
        }

        setResults({});
        setIsScanning(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/scan_aggressive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip: ipAddress }),
            });

            const result = await response.json();
            setResults(result.scan_results || {});
        } catch (error) {
            console.error("Error scanning aggressively:", error);
            setResults({ error: "Failed to fetch scan results." });
        } finally {
            setIsScanning(false);
        }
    };

    const handleClear = () => {
        setIpAddress("");
        setResults({});
    };

    return (
        <div className="mt-6 w-[100%]">
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3 w-[90%] flex flex-col gap-3">
                <label>IP Address:</label>
                <input
                    className="bg-white p-2 rounded"
                    type="text"
                    placeholder="Enter IP"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                    <button type="submit" className="btn btn-primary">
                        {isScanning ? "Scanning..." : "Aggressive Scan"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleClear}>
                        Clear
                    </button>
                </div>
            </form>

            <div className="mt-5">
                <h2 className="font-bold">Aggressive Scan Results</h2>
                {isScanning ? (
                    <p className="text-yellow-600">Scanning in progress...</p>
                ) : Object.keys(results).length > 0 ? (
                    <pre className="bg-gray-200 p-3 rounded">{JSON.stringify(results, null, 2)}</pre>
                ) : (
                    <p>No results available.</p>
                )}
            </div>
        </div>
    );
};

// firewall scan 
export const FirewallScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [results, setResults] = useState({});
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        if (!ipAddress) {
            alert("Please enter an IP address.");
            return;
        }

        setResults({});
        setIsScanning(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/scan_firewall', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip: ipAddress }),
            });

            const result = await response.json();
            setResults(result.firewall_scan_results || {});
        } catch (error) {
            console.error("Error scanning firewall:", error);
            setResults({ error: "Failed to fetch scan results." });
        } finally {
            setIsScanning(false);
        }
    };

    const handleClear = () => {
        setIpAddress("");
        setResults({});
    };

    return (
        <div className="mt-6 w-[100%]">
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3 flex flex-col gap-3">
                <label>IP Address:</label>
                <input
                    className="bg-white p-2 rounded"
                    type="text"
                    placeholder="Enter IP"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                    <button type="submit" className="btn btn-primary">
                        {isScanning ? "Scanning..." : "Firewall Evasion Scan"}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleClear}>
                        Clear
                    </button>
                </div>
            </form>

            <div className="mt-5">
                <h2 className="font-bold">Firewall Scan Results</h2>
                {isScanning ? (
                    <p className="text-yellow-600">Scanning in progress...</p>
                ) : Object.keys(results).length > 0 ? (
                    <pre className="bg-gray-200 p-3 rounded">{JSON.stringify(results, null, 2)}</pre>
                ) : (
                    <p>No results available.</p>
                )}
            </div>
        </div>
    );
};

// custom scan 
 export const CustomScan = () => {

    const [customCommand, setCustomCommand] = useState("");
    const [results, setResults] = useState("");
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        if (!customCommand.trim()) {
            alert("Please enter a valid Nmap command.");
            return;
        }

        setResults("");
        setIsScanning(true);

        try {
            const response = await fetch('http://127.0.0.1:5000/api/scan_custom', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ command: customCommand }),
            });

            const result = await response.json();
            setResults(result.output || "No output received.");
        } catch (error) {
            console.error("Error executing custom scan:", error);
            setResults("Error executing scan.");
        } finally {
            setIsScanning(false);
        }
    };

    const handleClear = () => {
        setCustomCommand("");
        setResults("");
    };

    return (
        <div className='mt-6 w-[100%]'>
        <div className="bg-gray-200 p-3  w-[90%] flex flex-col gap-2">
            <h2 className="text-lg font-bold mb-2">Custom Nmap Scan</h2>
            <input 
                className="bg-white p-2 rounded w-full border border-gray-400 mb-2"
                type="text" 
                placeholder="Enter custom Nmap command (e.g., -p 80,443 192.168.1.1)" 
                value={customCommand} 
                onChange={(e) => setCustomCommand(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded" 
                    onClick={handleScan}
                    disabled={isScanning}
                >
                    {isScanning ? "Scanning..." : "Run Scan"}
                </button>
                <button 
                    className="bg-gray-500 text-white px-4 py-2 rounded" 
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>

            <div className="mt-6">
                <h2 className="font-bold">Scan Results</h2>
                {isScanning ? (
                    <p className="text-yellow-600">Scanning in progress...</p>
                ) : results ? (
                    <pre className="bg-gray-300 p-3 rounded">{results}</pre>
                ) : (
                    <p>No results available.</p>
                )}
            </div>
            </div>
        </div>
    );
};

// free tcp 
export const TcpScan = () =>{

    return(
        <>
        <div className="text-xl p-20">this is the tcp scan</div>
        </>
    )

}
