import { useState } from "react";

export const GeneralScan = () => {
    const [target, setTarget] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false); // Track scan progress

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult(""); // Clear previous results
        setLoading(true);  // Show loading indicator

        try {
            const response = await fetch("http://127.0.0.1:5000/nikto/general_scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target }),
            });
            const data = await response.json();
            setScanResult(data.scan_result || data.error);
        } catch (error) {
            console.error("Scan error:", error);
            setScanResult("Error running scan");
        } finally {
            setLoading(false); // Hide loading indicator after scan
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">Nikto General Scan</label>
            <input 
                className="bg-white p-2 rounded border mt-2" 
                type="text"
                placeholder="Enter Target URL or IP"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            />
            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Scanning..." : "Run Scan"} {/* Change button text while loading */}
            </button>

            {/* Show loading indicator */}
            {loading && <p className="mt-3 text-yellow-600">Scanning in progress...</p>}

            {/* Show scan results only when not loading */}
            {!loading && scanResult && (
                <pre className="mt-4 p-3 bg-white border rounded overflow-auto whitespace-pre-wrap break-words max-w-full">
                    {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                </pre>
            )}
        </form>
    );
};


// ssl 


export const SSLScan = () => {
    const [target, setTarget] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false); // Track scan progress

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult(""); // Clear previous results
        setLoading(true);  // Show loading indicator

        try {
            const response = await fetch("http://127.0.0.1:5000/ssl/scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target }),
            });
            const data = await response.json();
            setScanResult(data.scan_result || data.error);
        } catch (error) {
            console.error("Scan error:", error);
            setScanResult("Error running scan");
        } finally {
            setLoading(false); // Hide loading indicator after scan
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">SSL Scan</label>
            <input 
                className="bg-white p-2 rounded border mt-2" 
                type="text"
                placeholder="Enter Target URL or IP"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            />
            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Scanning..." : "Run Scan"} {/* Change button text while loading */}
            </button>

            {/* Show loading indicator */}
            {loading && <p className="mt-3 text-yellow-600">Scanning in progress...</p>}

            {/* Show scan results only when not loading */}
            {!loading && scanResult && (
                <pre className="mt-4 p-3 bg-white border rounded overflow-auto whitespace-pre-wrap break-words max-w-full">
                    {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                </pre>
            )}
        </form>
    );
};

// header scan

export const HeaderScan = () => {
    const [target, setTarget] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false); // Track scan progress

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult(""); // Clear previous results
        setLoading(true);  // Show loading indicator

        try {
            const response = await fetch("http://127.0.0.1:5000/nikto/header_scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target }),
            });
            const data = await response.json();
            setScanResult(data.scan_result || data.error);
        } catch (error) {
            console.error("Scan error:", error);
            setScanResult("Error running scan");
        } finally {
            setLoading(false); // Hide loading indicator after scan
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">Nikto Header Scan</label>
            <input 
                className="bg-white p-2 rounded border mt-2" 
                type="text"
                placeholder="Enter Target URL or IP"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            />
            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Scanning..." : "Run Scan"} {/* Change button text while loading */}
            </button>

            {/* Show loading indicator */}
            {loading && <p className="mt-3 text-yellow-600">Scanning in progress...</p>}

            {/* Show scan results only when not loading */}
            {!loading && scanResult && (
                <pre className="mt-4 p-3 bg-white border rounded overflow-auto whitespace-pre-wrap break-words max-w-full">
                    {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                </pre>
            )}
        </form>
    );
};


// testing 

export const NiktoScan  = () => {
   

    return (
        <>
            <h1>samuel mumo</h1>
        </>
    );
};