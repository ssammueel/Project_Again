import { useState } from "react";

// scannetworks 
export const ScanNetworks = () => {
    const [interfaceName, setInterfaceName] = useState("");
    const [scanResults, setScanResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResults([]);
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/aircrack/scan_networks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ interface: interfaceName }),
            });

            const data = await response.json();
            setScanResults(data.networks || []);
        } catch (error) {
            console.error("Error scanning networks:", error);
            setScanResults([{ error: "Failed to scan networks." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">Wi-Fi Network Scanner</label>
            
            <input
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Wi-Fi Interface (e.g., wlan0mon)"
                value={interfaceName}
                onChange={(e) => setInterfaceName(e.target.value)}
            />

            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Scanning..." : "Start Scan"}
            </button>

            {loading && <p className="mt-3 text-yellow-600">Scanning in progress...</p>}

            {!loading && scanResults.length > 0 && (
                <div className="mt-4 p-3 bg-white border rounded">
                    <h2 className="font-bold">Scan Results</h2>
                    {scanResults.map((network, index) => (
                        <pre key={index} className="p-2 border-b">{JSON.stringify(network, null, 2)}</pre>
                    ))}
                </div>
            )}
        </form>
    );
};

// handshake 
export const CaptureHandshake = () => {
    const [interfaceName, setInterfaceName] = useState("");
    const [bssid, setBssid] = useState("");
    const [channel, setChannel] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCapture = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/aircrack/capture_handshake", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ interface: interfaceName, bssid, channel }),
            });

            const data = await response.json();
            setMessage(data.message || data.error);
        } catch (error) {
            console.error("Error capturing handshake:", error);
            setMessage("Failed to start handshake capture.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleCapture} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">Wi-Fi Handshake Capture</label>

            <input
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Wi-Fi Interface (e.g., wlan0mon)"
                value={interfaceName}
                onChange={(e) => setInterfaceName(e.target.value)}
            />
            <input
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Target BSSID"
                value={bssid}
                onChange={(e) => setBssid(e.target.value)}
            />
            <input
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Channel"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
            />

            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Capturing..." : "Start Capture"}
            </button>

            {loading && <p className="mt-3 text-yellow-600">Waiting for handshake...</p>}

            {!loading && message && (
                <div className="mt-4 p-3 bg-white border rounded">
                    <h2 className="font-bold">Status</h2>
                    <pre className="p-2 border-b">{message}</pre>
                </div>
            )}
        </form>
    );
};

// crack password 
export const CrackPassword = () => {
    const [handshakeFile, setHandshakeFile] = useState("");
    const [wordlist, setWordlist] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCrack = async (e) => {
        e.preventDefault();
        setPassword("");
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/aircrack/crack_password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ handshake_file: handshakeFile, wordlist }),
            });

            const data = await response.json();
            setPassword(data.password || data.error);
        } catch (error) {
            console.error("Error cracking password:", error);
            setPassword("Failed to crack password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleCrack} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">Wi-Fi Password Cracking</label>

            <input
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Handshake File Path"
                value={handshakeFile}
                onChange={(e) => setHandshakeFile(e.target.value)}
            />
            <input
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Wordlist Path"
                value={wordlist}
                onChange={(e) => setWordlist(e.target.value)}
            />

            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Cracking..." : "Start Cracking"}
            </button>

            {loading && <p className="mt-3 text-yellow-600">Cracking password, please wait...</p>}

            {!loading && password && (
                <div className="mt-4 p-3 bg-white border rounded">
                    <h2 className="font-bold">Result</h2>
                    <pre className="p-2 border-b">{password}</pre>
                </div>
            )}
        </form>
    );
};

// DeauthAttack 
export const DeauthAttack = () => {
    const [interfaceName, setInterfaceName] = useState("");
    const [targetMac, setTargetMac] = useState("");
    const [bssid, setBssid] = useState("");
    const [packets, setPackets] = useState(10);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDeauth = async (e) => {
        e.preventDefault();
        setResult("");
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/aircrack/deauth_attack", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ interface: interfaceName, target_mac: targetMac, bssid, packets }),
            });

            const data = await response.json();
            setResult(data.message || data.error);
        } catch (error) {
            console.error("Error sending deauth attack:", error);
            setResult("Failed to send deauth attack.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleDeauth} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">Wi-Fi Deauth Attack</label>

            <input
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Monitor Mode Interface (e.g., wlan0mon)"
                value={interfaceName}
                onChange={(e) => setInterfaceName(e.target.value)}
            />
            <input
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Target MAC Address"
                value={targetMac}
                onChange={(e) => setTargetMac(e.target.value)}
            />
            <input
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Wi-Fi Router BSSID"
                value={bssid}
                onChange={(e) => setBssid(e.target.value)}
            />
            <input
                className="bg-white p-2 rounded border mt-2"
                type="number"
                placeholder="Number of Packets (Default: 10)"
                value={packets}
                onChange={(e) => setPackets(e.target.value)}
            />

            <button type="submit" className="mt-3 p-2 bg-red-600 w-fit text-white rounded">
                {loading ? "Attacking..." : "Start Attack"}
            </button>

            {loading && <p className="mt-3 text-yellow-600">Sending deauth packets...</p>}

            {!loading && result && (
                <div className="mt-4 p-3 bg-white border rounded">
                    <h2 className="font-bold">Attack Result</h2>
                    <pre className="p-2 border-b">{result}</pre>
                </div>
            )}
        </form>
    );
};
