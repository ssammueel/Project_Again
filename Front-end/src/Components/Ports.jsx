import React, { useState } from 'react';
import { Footer } from './Footer';

export const PtScan = () => {
    const [ipAddress, setIpAddress] = useState('');
    const [startPort, setStartPort] = useState('');
    const [endPort, setEndPort] = useState('');
    const [openPorts, setOpenPorts] = useState([]);

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

                <button className="btn btn-accent w-fit px-5 mt-4" id="scan">
                    Scan
                </button>
            </form>
            <div className="mt-5">
                <h2 className="font-bold">Open Ports</h2>
                {openPorts.length > 0 ? (
                    openPorts.map((port) => <p key={port}>Port {port} is open</p>)
                ) : (
                    <p>No open ports detected.</p>
                )}
            </div>
        </>
    );
};

export const Detectos = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [detectedOs, setDetectedOs] = useState("")
    const handleScan = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/detect_os', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ip: ipAddress }),
            });
    
            if (response.ok) {
                const result = await response.json();
                setDetectedOs(result.detected_os); 
            } else {
                setDetectedOs("Error detecting OS"); 
            }
        } catch (error) {
            console.error('Error detecting OS:', error);
            setDetectedOs("Error detecting OS"); 
        }
    };
    
    return (
        <div>
        <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 flex flex-col p-3 gap-3 w-[100%] h-fit">
            <label>IP Address:</label>
            <input
                className="bg-white p-2 indent-3 outline-none rounded-btn"
                type="text"
                placeholder="Enter IP address"
                id="ipenter"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
            />
            <button type="submit" className="btn btn-accent w-fit px-5 mt-4" id="scan">
                Scan
            </button>
        </form>

<div className="mt-5">
<h2 className="font-bold">Detected OS</h2>
{detectedOs ? (
    <p>Detected OS for IP {ipAddress}: {detectedOs}</p>
) : (
    <p>No OS detected yet.</p>
)}
</div>
</div>
    );
};

export const TcpScan = () =>{

    return(
        <>
        <div className="text-xl p-20">this is the tcp scan</div>
        </>
    )

}

export const ServiceScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [services, setServices] = useState({});

    const handleScan = async () => {
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
        }
    };

    return (
        <div className='p-20'>
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3 gap-3 w-full">
                <label>IP Address:</label>
                <input
                    className="bg-white p-2 rounded"
                    type="text"
                    placeholder="Enter IP address"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                />
                <button type="submit" className="btn btn-primary mt-2">Scan Services</button>
            </form>
            <div>
                <h2>Services</h2>
                <ul>
                    {Object.keys(services).length > 0 ? Object.entries(services).map(([port, info]) => (
                        <li key={port}>Port {port}: {info}</li>
                    )) : <p>No services detected.</p>}
                </ul>
            </div>
        </div>
    );
};

export const SubnetScan = () => {
    const [subnet, setSubnet] = useState("");
    const [liveHosts, setLiveHosts] = useState([]);

    const handleScan = async () => {
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
        }
    };

    return (
        <div className='p-20'>
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3 gap-3 w-full">
                <label>Subnet:</label>
                <input
                    className="bg-white p-2 rounded"
                    type="text"
                    placeholder="Enter Subnet (e.g., 192.168.1.0/24)"
                    value={subnet}
                    onChange={(e) => setSubnet(e.target.value)}
                />
                <button type="submit" className="btn btn-primary mt-2">Scan Subnet</button>
            </form>
            <div>
                <h2>Live Hosts</h2>
                <ul>
                    {liveHosts.length > 0 ? liveHosts.map((host) => <li key={host}>{host}</li>) : <p>No live hosts detected.</p>}
                </ul>
            </div>
        </div>
    );
};

export const VulnScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [vulns, setVulns] = useState([]);

    const handleScan = async () => {
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
        }
    };

    return (
        <div className='p-20'>
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3">
                <label>IP Address:</label>
                <input className="bg-white p-2 rounded" type="text" placeholder="Enter IP" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />
                <button type="submit" className="btn btn-primary mt-2">Scan Vulnerabilities</button>
            </form>
            <div>
                <h2>Vulnerabilities</h2>
                <ul>{vulns.length > 0 ? vulns.map((vuln, index) => <li key={index}>{vuln}</li>) : <p>No vulnerabilities found.</p>}</ul>
            </div>
        </div>
    );
};

export const AggressiveScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [results, setResults] = useState({});

    const handleScan = async () => {
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
            setResults({});
        }
    };

    return (
        <div className='p-20'>
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3">
                <label>IP Address:</label>
                <input className="bg-white p-2 rounded" type="text" placeholder="Enter IP" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />
                <button type="submit" className="btn btn-primary mt-2">Aggressive Scan</button>
            </form>
            <div>
                <h2>Aggressive Scan Results</h2>
                <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
        </div>
    );
};

export const FirewallScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [results, setResults] = useState({});

    const handleScan = async () => {
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
            setResults({});
        }
    };

    return (
        <div className='h-fit '>
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3">
                <label>IP Address:</label>
                <input className="bg-white p-2 rounded" type="text" placeholder="Enter IP" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />
                <button type="submit" className="btn btn-primary mt-2">Firewall Evasion Scan</button>
            </form>
            <div className='flex-grow bg-[rgb(174,187,221)] overflow-y-auto max-h-[450px]'>
                <h2>Firewall Scan Results</h2>
                <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
            
        </div>
    );
};


export const UdpScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [results, setResults] = useState({});

    const handleScan = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/scan_udp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ip: ipAddress }),
            });
            const result = await response.json();
            setResults(result.udp_scan_results || {});
        } catch (error) {
            console.error("Error scanning UDP ports:", error);
            setResults({});
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3">
                <label>IP Address:</label>
                <input className="bg-white p-2 rounded" type="text" placeholder="Enter IP" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />
                <button type="submit" className="btn btn-primary mt-2">UDP Scan</button>
            </form>
            <div>
                <h2>UDP Scan Results</h2>
                <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
        </div>
    );
};

export const SynScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [results, setResults] = useState({});

    const handleScan = async () => {
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
            setResults({});
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3">
                <label>IP Address:</label>
                <input className="bg-white p-2 rounded" type="text" placeholder="Enter IP" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />
                <button type="submit" className="btn btn-primary mt-2">SYN Stealth Scan</button>
            </form>
            <div>
                <h2>SYN Scan Results</h2>
                <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
        </div>
    );
};


export const TracerouteScan = () => {
    const [ipAddress, setIpAddress] = useState("");
    const [results, setResults] = useState({});

    const handleScan = async () => {
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
            setResults({});
        }
    };

    return (
        <div>
            <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 p-3">
                <label>IP Address:</label>
                <input className="bg-white p-2 rounded" type="text" placeholder="Enter IP" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />
                <button type="submit" className="btn btn-primary mt-2">Traceroute Scan</button>
            </form>
            <div>
                <h2>Traceroute Scan Results</h2>
                <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
        </div>
    );
};


export const CustomScan = () => {
    const [customCommand, setCustomCommand] = useState("");
    const [results, setResults] = useState("");

    const handleScan = async () => {
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
        }
    };

    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md h-fit">
            <h2 className="text-lg font-bold mb-2">Custom Nmap Scan</h2>
            <input 
                className="bg-white p-2 rounded w-full border border-gray-400 mb-2"
                type="text" 
                placeholder="Enter custom Nmap command (e.g., -p 80,443 192.168.1.1)" 
                value={customCommand} 
                onChange={(e) => setCustomCommand(e.target.value)}
            />
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded" 
                onClick={handleScan}
            >
                Run Scan
            </button>
            <div className="mt-4">
                <h3 className="font-bold">Scan Output:</h3>
                <pre className="bg-white p-2 border ">{results}</pre>
            </div>
        </div>
    );
};

