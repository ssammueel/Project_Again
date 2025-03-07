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

            <div className='w-[50%] py-[2%] px-[4%] mt-[-5%] h-[calc(100vh-70px)] overflow-y-auto sticky  shadow-[#464746] shadow-md rounded-md'>
                <h2 className='p-3 font-bold text-[17px] border-l-4 mb-4 border-red-500 bg-slate-100 rounded-lg'>Open Ports</h2>
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
            alert("Scan failed. Please try again.");
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className='w-[100%]'>
            <h2 className='text-[16px] ml-[20%] mt-[1%] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#272725] to-[#010507] text-[#ffffff]'>SYN Scan</h2>

            <div className='w-[100%] flex gap-[5%] mt-[1%]'>
                
                <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 flex flex-col p-3 gap-3 w-[40%] h-fit">
                    <label>IP Address:</label>
                    <input className="bg-white p-2 rounded border border-gray-400" type="text" placeholder="Enter IP address" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />

                    <button className='w-fit p-3 bg-blue-300' disabled={isScanning}>
                        {isScanning ? "Scanning..." : "Start SYN Scan"}
                    </button>
                </form>

                <div className='w-[50%] py-[2%] px-[4%] mt-[-5%] h-[calc(100vh-70px)] overflow-y-auto sticky shadow-[#464746] shadow-md rounded-md'>
                    <h2 className='p-3 font-bold text-[17px] border-l-4 border-[#ee9228] mb-4 bg-slate-100 rounded-lg'>SYN Scan Results</h2>
                    {isScanning ? <p>Scanning in progress...</p> : Object.keys(results).length > 0 ? (
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
            alert("Failed to fetch traceroute results.");
        } finally {
            setIsScanning(false);
        }
    };

    const handleClear = () => {
        setIpAddress("");
        setResults({});
    };

    return (
        <div className='w-[100%]'>
            <h2 className='text-[16px] ml-[20%] mt-[1%] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#272725] to-[#010507] text-[#ffffff]'>Traceroute Scan</h2>

            <div className='w-[100%] flex gap-[5%] mt-[1%]'>
                
                <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 flex flex-col p-3 gap-3 w-[40%] h-fit">
                    <label>IP Address:</label>
                    <input className="bg-white p-2 rounded border border-gray-400" type="text" placeholder="Enter IP address" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />

                    <div className="flex gap-2">
                        <button className='w-fit p-3 bg-blue-300' disabled={isScanning}>
                            {isScanning ? "Scanning..." : "Run Traceroute"}
                        </button>
                        <button type="button" className="w-fit p-3 bg-gray-400 hover:bg-gray-500" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </form>

                <div className='w-[50%] py-[2%] px-[4%] mt-[-5%] h-[calc(100vh-70px)] overflow-y-auto sticky shadow-[#464746] shadow-md rounded-md'>
                    <h2 className='p-3 font-bold text-[17px] border-l-4 border-red-500 bg-slate-100 mb-4 rounded-lg'>Traceroute Scan Results</h2>
                    {isScanning ? <p>Scanning in progress...</p> : Object.keys(results).length > 0 ? (
                        <pre className="whitespace-pre-wrap break-words">{JSON.stringify(results, null, 2)}</pre>
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
        if (!ipAddress.trim()) {
            alert("Please enter a valid IP address.");
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
            alert("Failed to fetch scan results.");
        } finally {
            setIsScanning(false);
        }
    };

    const handleClear = () => {
        setIpAddress("");
        setResults({});
    };

    return (
        <div className='w-[100%]'>
            <h2 className='text-[16px] ml-[20%] mt-[1%] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-[#272725] to-[#010507] text-[#ffffff]'>Firewall Evasion Scan</h2>

            <div className='w-[100%] flex gap-[5%] mt-[1%]'>
                
                <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className="bg-slate-300 flex rounded-lg flex-col p-3 gap-3 w-[40%] h-fit">
                    <label>IP Address:</label>
                    <input className="bg-white p-2 rounded border border-gray-400" type="text" placeholder="Enter IP address" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />

                    <div className="flex gap-2">
                        <button className='rounded-lg w-fit p-3 bg-blue-300' disabled={isScanning}>
                            {isScanning ? "Scanning..." : "Run Firewall Scan"}
                        </button>
                        <button type="button" className="w-fit p-3 bg-gray-400 hover:bg-gray-500" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </form>

                <div className='w-[50%] py-[2%] px-[4%] mt-[-5%] h-[calc(100vh-70px)] overflow-y-auto sticky shadow-[#464746] shadow-md rounded-md'>
                    <h2 className='p-3 font-bold text-[17px] border-l-4 border-[#28d0ee] mb-4 bg-slate-100 rounded-lg'>Firewall Scan Results</h2>
                    {isScanning ? <p>Scanning in progress...</p> : Object.keys(results).length > 0 ? (
                        <pre className="whitespace-pre-wrap break-words">{JSON.stringify(results, null, 2)}</pre>
                    ) : (
                        <p>No results available.</p>
                    )}
                </div>

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
            alert("Failed to fetch scan results.");
        } finally {
            setIsScanning(false);
        }
    };

    const handleClear = () => {
        setIpAddress("");
        setResults({});
    };

    return (
        <div className="w-[100%] ">
            <h2 className="text-[16px] ml-[20%] mt-[1%] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-red-600 to-red-800 text-white">
                Aggressive Scan
            </h2>

            <div className="w-[100%] flex gap-[5%] mt-[1%]">
                
                <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} className=" w-[40%] bg-slate-300 flex flex-col p-3 gap-3 h-fit">
                    <label className="font-semibold">IP Address:</label>
                    <input 
                        className="bg-white p-2 rounded border border-gray-400"
                        type="text" 
                        placeholder="Enter IP address" 
                        value={ipAddress} 
                        onChange={(e) => setIpAddress(e.target.value)} 
                    />

                    <div className="flex gap-2">
                        <button type="submit" className="w-fit p-3 bg-red-500 text-white rounded hover:bg-red-600" disabled={isScanning}>
                            {isScanning ? "Scanning..." : "Run Aggressive Scan"}
                        </button>
                        <button type="button" className="w-fit p-3 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </form>

                <div className="w-[50%]  py-[2%] px-[4%] mt-[-5%] h-[calc(100vh-70px)] overflow-y-auto sticky shadow-[#464746] shadow-md rounded-md">
                    <h2 className="p-3 font-bold mb-4 text-[17px] border-l-4 border-red-500 bg-slate-100 rounded-lg">
                        Aggressive Scan Results
                    </h2>
                    {isScanning ? <p>Scanning in progress...</p> : Object.keys(results).length > 0 ? (
                        <pre>{JSON.stringify(results, null, 2)}</pre>
                    ) : (
                        <p>No results available.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

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
            const response = await fetch("http://127.0.0.1:5000/api/scan_custom", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ command: customCommand }),
            });

            const result = await response.json();
            setResults(result.output || "No output received.");
        } catch (error) {
            console.error("Error executing custom scan:", error);
            alert("Error executing scan.");
        } finally {
            setIsScanning(false);
        }
    };

    const handleClear = () => {
        setCustomCommand("");
        setResults("");
    };

    return (
        <div className="w-[100%]">
            <h2 className="text-[16px] ml-[20%] mt-[1%] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                Custom Nmap Scan
            </h2>

            <div className="w-[100%] flex gap-[5%] mt-[1%]">
                
                <form onSubmit={(e) => { e.preventDefault(); handleScan(); }} 
                    className="bg-slate-300 flex flex-col p-3 gap-3 w-[40%] h-fit">
                    <label className="font-semibold">Custom Command:</label>
                    <input 
                        className="bg-white p-2 rounded border border-gray-400"
                        type="text" 
                        placeholder="Enter Nmap command (e.g., -p 80,443 192.168.1.1)" 
                        value={customCommand} 
                        onChange={(e) => setCustomCommand(e.target.value)} 
                    />

                    <div className="flex gap-2">
                        <button type="submit" className="w-fit p-3 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={isScanning}>
                            {isScanning ? "Scanning..." : "Run Scan"}
                        </button>
                        <button type="button" className="w-fit p-3 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </form>

                <div className="w-[50%] py-[2%] px-[4%] mt-[-5%] h-[calc(100vh-70px)] overflow-y-auto sticky shadow-[#464746] shadow-md rounded-md">
                    <h2 className="p-3 font-bold text-[17px] border-l-4 mb-4 border-blue-500 bg-slate-100 rounded-lg">
                        Scan Results
                    </h2>
                    {isScanning ? <p>Scanning in progress...</p> : results ? (
                        <pre>{results}</pre>
                    ) : (
                        <p>No results available.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

