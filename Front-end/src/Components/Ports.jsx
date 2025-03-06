import React, { useState } from 'react';
import { Footer } from './Footer';

// port scan 
export const PtScan = () => {
    const [ipAddress, setIpAddress] = useState('');
    const [startPort, setStartPort] = useState('');
    const [endPort, setEndPort] = useState('');
    const [openPorts, setOpenPorts] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [scanDate, setScanDate] = useState('');
    const [previousScans, setPreviousScans] = useState([]);

    const handleScan = async () => {
        if (!ipAddress || !startPort || !endPort) {
            alert('Please fill in all fields.');
            return;
        }

        setOpenPorts([]);
        setIsScanning(true);

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
        } finally {
            setIsScanning(false);
        }
    };

    const fetchScansByDate = async () => {
        if (!scanDate) {
            alert('Please select a date.');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/api/scans/${scanDate}`);
            const data = await response.json();
            setPreviousScans(data);
        } catch (error) {
            alert('Error fetching previous scans.');
            console.error('Error:', error);
        }
    };

    return (
        <div className='w-[100%]'>
            <h2 className='text-[16px] ml-[20%] mt-[1%] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#272725] to-[#010507]  text-[#ffffff]'>PortScan</h2>

        <div className='w-[100%] flex gap-[5%] mt-[1%]'>
            
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 flex flex-col p-3 gap-3 w-[40%] h-fit">
                <label>IP Address:</label>
                <input className="bg-white p-2 rounded border border-gray-400"  type="text" placeholder="Enter IP address" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />

                <label>Start Port:</label>
                <input className="bg-white p-2 rounded border border-gray-400"  type="text" placeholder="Enter start port" value={startPort} onChange={(e) => setStartPort(e.target.value)} />

                <label>End Port:</label>
                <input className="bg-white p-2 rounded border border-gray-400"  type="text" placeholder="Enter end port" value={endPort} onChange={(e) => setEndPort(e.target.value)} />

                <button className='w-fit p-3 bg-blue-300' disabled={isScanning}>
                    {isScanning ? "Scanning..." : "Scan"}
                </button>
            </form>

            <div className='w-[35%] py-[2%] px-[4%] mt-[-5%] h-[calc(100vh-70px)] overflow-y-auto sticky  shadow-[#464746] shadow-md rounded-md'>
                <h2 className='p-3 font-bold text-[17px] border-l-4 border-red-500 bg-slate-100 rounded-lg'>Open Ports</h2>
                {isScanning ? <p>Scanning in progress...</p> : openPorts.length > 0 ? (
                    openPorts.map((port) => <p key={port}>Port {port} is open</p>)
                ) : (
                    <p>No open ports detected.</p>
                )}
            </div>

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
        <div className="w-full mt-6 min-h-screen flex flex-col">
            <form 
                onSubmit={(e) => { e.preventDefault(); handleScan(); }} 
                className="bg-slate-300 p-3 flex flex-col gap-3 w-[90%] md:w-[90%] shadow-lg rounded-lg"
            >
                <label className="font-semibold">IP Address:</label>
                <input 
                    className="bg-white p-2 rounded border border-gray-400" 
                    type="text" 
                    placeholder="Enter IP" 
                    value={ipAddress} 
                    onChange={(e) => setIpAddress(e.target.value)} 
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-fit">
                    {isScanning ? "Scanning..." : "SYN Stealth Scan"}
                </button>
            </form>
            
            <div className="mt-5 w-[90%] md:w-[90%]">
                <h2 className="font-bold text-lg">SYN Scan Results</h2>
                <div className="bg-gray-200 p-3 rounded shadow-md mt-2 max-h-[300px] overflow-y-auto">
                    {isScanning ? (
                        <p className="text-yellow-600">Scanning in progress...</p>
                    ) : Object.keys(results).length > 0 ? (
                        <pre className="whitespace-pre-wrap break-words">{JSON.stringify(results, null, 2)}</pre>
                    ) : (
                        <p>No results available.</p>
                    )}
                </div>
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
        <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full mt-6 min-h-screen">
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
                    className={`px-4 py-2 rounded ${isScanning ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                    onClick={handleScan}
                    disabled={isScanning}
                >
                    {isScanning ? "Scanning..." : "Run Traceroute"}
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>

            <div className="mt-5">
                <h2 className="font-bold">Traceroute Scan Results</h2>
                <div className="bg-gray-300 p-3 rounded mt-2 max-h-[350px] overflow-y-auto">
                    {isScanning ? (
                        <p className="text-yellow-600">Scanning in progress...</p>
                    ) : Object.keys(results).length > 0 ? (
                        <pre className="whitespace-pre-wrap break-words">{JSON.stringify(results, null, 2)}</pre>
                    ) : (
                        <p>No results available.</p>
                    )}
                </div>
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

// service scan 
export const ServiceScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [services, setServices] = useState({});
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        if (!ipAddress.trim()) {
            alert("Please enter a valid IP address.");
            return;
        }

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
            setServices({ error: "Failed to fetch service scan results." });
        } finally {
            setIsScanning(false);
        }
    };

    const handleClear = () => {
        setIpAddress("");
        setServices({});
    };

    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full mt-6 min-h-screen">
            <h2 className="text-lg font-bold mb-2">Service Scan</h2>

            <input
                className="bg-white p-2 rounded w-full border border-gray-400 mb-2"
                type="text"
                placeholder="Enter IP address"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
            />

            <div className="flex gap-2 mt-2">
                <button
                    className={`px-4 py-2 rounded ${isScanning ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                    onClick={handleScan}
                    disabled={isScanning}
                >
                    {isScanning ? "Scanning..." : "Scan Services"}
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    onClick={handleClear}
                >
                    Clear
                </button>
            </div>

            <div className="mt-5">
                <h2 className="font-bold">Detected Services</h2>
                <div className="bg-gray-300 p-3 rounded mt-2 max-h-[350px] overflow-y-auto">
                    {isScanning ? (
                        <p className="text-yellow-600">Scanning in progress...</p>
                    ) : Object.keys(services).length > 0 ? (
                        <ul>
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
        if (!ipAddress.trim()) {
            alert("Please enter a valid IP address.");
            return;
        }

        setResults({});
        setIsScanning(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/api/scan_aggressive", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
        <div className="bg-gray-200 p-4 rounded-lg shadow-md w-full mt-6 min-h-screen">
            <h2 className="text-lg font-bold mb-2">Aggressive Scan</h2>

            <input
                className="bg-white p-2 rounded w-full border border-gray-400 mb-2"
                type="text"
                placeholder="Enter IP address"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
            />

            <div className="flex gap-2 mt-2">
                <button
                    className={`px-4 py-2 rounded ${isScanning ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"} text-white`}
                    onClick={handleScan}
                    disabled={isScanning}
                >
                    {isScanning ? "Scanning..." : "Run Aggressive Scan"}
                </button>
                <button
                    className="bg-gray hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={handleClear} >
                    Clear
                </button>
            </div>

            <div className="mt-5 w-[90%] md:w-[95%]">
                <h2 className="font-bold text-lg">Aggressive Scan Results</h2>
                <div className="bg-gray-200 p-3 rounded shadow-md mt-2 max-h-[300px] overflow-y-auto">
                    {isScanning ? (
                        <p className="text-yellow-600">Scanning in progress...</p>
                    ) : Object.keys(results).length > 0 ? (
                        <pre className="bg-gray-100 p-3 rounded">{JSON.stringify(results, null, 2)}</pre>
                    ) : (
                        <p>No results available.</p>
                    )}
                </div>
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
        <div className="mt-6 w-full min-h-screen flex flex-col">
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} 
                className="bg-slate-300 p-3 flex flex-col gap-3 w-[100%] md:w-[80%] shadow-lg rounded-lg">
                <label className="font-semibold">IP Address:</label>
                <input className="bg-white p-2 rounded border border-gray-400" type="text" placeholder="Enter IP"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        {isScanning ? "Scanning..." : "Firewall Evasion Scan"}
                    </button>
                    <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={handleClear}>
                        Clear
                    </button>
                </div>
            </form>

            <div className="mt-5 w-[90%] md:w-[95%]">
                <h2 className="font-bold text-lg">Firewall Scan Results</h2>
                <div className="bg-gray-200 p-3 rounded shadow-md mt-2 max-h-[300px] overflow-y-auto">
                    {isScanning ? (
                        <p className="text-yellow-600">Scanning in progress...</p>
                    ) : Object.keys(results).length > 0 ? (
                        <pre className="whitespace-pre-wrap break-words">{JSON.stringify(results, null, 2)}</pre>
                    ) : (
                        <p>No results available.</p>
                    )}
                </div>
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
