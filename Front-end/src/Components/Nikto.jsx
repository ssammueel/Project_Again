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

//Outetad software 
export const OutdatedSoftwareScan = () => {
    const [target, setTarget] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false); // Track scan progress

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult(""); // Clear previous results
        setLoading(true);  // Show loading indicator

        try {
            const response = await fetch("http://127.0.0.1:5000/nikto/outdated_software_scan", {
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
            <label className="font-bold">Nikto Outdated Software Scan</label>
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


// file upload 
export const FileUploadScan = () => {
    const [target, setTarget] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false); // Track scan progress

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult(""); // Clear previous results
        setLoading(true);  // Show loading indicator

        try {
            const response = await fetch("http://127.0.0.1:5000/nikto/file_upload_scan", {
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
            <label className="font-bold">Nikto File Upload Scan</label>
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

//admin pannel
export const AdminPanelScan = () => {
    const [target, setTarget] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false); // Track scan progress

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult(""); // Clear previous results
        setLoading(true);  // Show loading indicator

        try {
            const response = await fetch("http://127.0.0.1:5000/nikto/admin_panel_scan", {
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
            <label className="font-bold">Nikto Admin Panel Scan</label>
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

// custom scan 
export const CustomScanNt = () => {
    const [target, setTarget] = useState("");
    const [options, setOptions] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false); 

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult("");
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/nikto/nkt_custom", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target, options }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || `HTTP error! Status: ${response.status}`);
            }

            setScanResult(data.scan_result || "No response from server.");
        } catch (error) {
            console.error("Scan error:", error);
            setScanResult("Error running scan: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">Nikto Custom Scan</label>
            <input 
                className="bg-white p-2 rounded border mt-2" 
                type="text"
                placeholder="Enter Target URL or IP"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
            />
            <input 
                className="bg-white p-2 rounded border mt-2" 
                type="text"
                placeholder="Enter Nikto Options (e.g., -Tuning 4)"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
            />
            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded" disabled={loading}>
                {loading ? "Scanning..." : "Run Custom Scan"}
            </button>

            {loading && <p className="mt-3 text-yellow-600">Scanning in progress...</p>}

            {!loading && scanResult && (
                <pre className="mt-4 p-3 bg-white border rounded overflow-auto whitespace-pre-wrap break-words max-w-full">
                    {typeof scanResult === "object" ? JSON.stringify(scanResult, null, 2) : scanResult}
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