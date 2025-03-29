import { useState } from "react";

export const GeneralScan = () => {
    const [target, setTarget] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult("");
        setLoading(true);

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
            setLoading(false);
        }
    };

    const handleClear = () => {
        setTarget("");
        setScanResult("");
    };

    return (
        <div className="w-[100%]">
            <h2 className="text-[16px] ml-[20%] mt-[1%] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-green-600 to-green-800 text-white">
                General Scan
            </h2>

            <div className="w-[100%] flex gap-[5%] mt-[1%]">
                
                <form onSubmit={handleScan} className="w-[40%] bg-slate-300 flex flex-col p-3 gap-3 h-fit">
                    <label className="font-semibold">Target URL or IP:</label>
                    <input 
                        className="bg-white p-2 rounded border border-gray-400"
                        type="text" 
                        placeholder="Enter target URL or IP" 
                        value={target} 
                        onChange={(e) => setTarget(e.target.value)} 
                    />

                    <div className="flex gap-2">
                        <button type="submit" className="w-fit p-3 bg-green-500 text-white rounded hover:bg-green-600" disabled={loading}>
                            {loading ? "Scanning..." : "Run Scan"}
                        </button>
                        <button type="button" className="w-fit p-3 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </form>

                <div className="w-[50%] py-[2%] px-[4%] mt-[-5%] h-[calc(100vh-70px)] overflow-y-auto sticky shadow-[#464746] shadow-md rounded-md">
                    <h2 className="p-3 font-bold mb-4 text-[17px] border-l-4 border-green-500 bg-slate-100 rounded-lg">
                        Scan Results
                    </h2>
                    {loading ? (
                        <p className="text-yellow-600">Scanning in progress...</p>
                    ) : scanResult ? (
                        <pre className="bg-white p-3 border rounded whitespace-pre-wrap break-words max-w-full">
                            {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                        </pre>
                    ) : (
                        <p>No results available.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

// header scan
export const HeaderScan = () => {
    const [target, setTarget] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false); 

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult(""); 
        setLoading(true);  

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
            setLoading(false);
        }
    };

    const handleClear = () => {
        setTarget("");
        setScanResult("");
    };

    return (
        <div className="w-[100%]">
            <h2 className="text-[16px] ml-[20%] mt-[1%] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                Header Scan
            </h2>

            <div className="w-[100%] flex gap-[5%] mt-[1%]">
                
                <form onSubmit={handleScan} className="w-[40%] bg-slate-300 flex flex-col p-3 gap-3 h-fit">
                    <label className="font-semibold">Target URL or IP:</label>
                    <input 
                        className="bg-white p-2 rounded border border-gray-400"
                        type="text" 
                        placeholder="Enter target URL or IP" 
                        value={target} 
                        onChange={(e) => setTarget(e.target.value)} 
                    />

                    <div className="flex gap-2">
                        <button type="submit" className="w-fit p-3 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={loading}>
                            {loading ? "Scanning..." : "Run Scan"}
                        </button>
                        <button type="button" className="w-fit p-3 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </form>

                <div className="w-[50%] py-[2%] px-[4%] mt-[-5%] h-[calc(100vh-70px)] overflow-y-auto sticky shadow-[#464746] shadow-md rounded-md">
                    <h2 className="p-3 font-bold mb-4 text-[17px] border-l-4 border-blue-500 bg-slate-100 rounded-lg">
                        Scan Results
                    </h2>
                    {loading ? (
                        <p className="text-yellow-600">Scanning in progress...</p>
                    ) : scanResult ? (
                        <pre className="bg-white p-3 border rounded whitespace-pre-wrap break-words max-w-full">
                            {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                        </pre>
                    ) : (
                        <p>No results available.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

//Outetad software 
export const OutdatedSoftwareScan = () => {
    const [target, setTarget] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult("");
        setLoading(true);

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
            setLoading(false);
        }
    };

    const handleClear = () => {
        setTarget("");
        setScanResult("");
    };

    return (
        <div className="w-[100%]">
            <h2 className="text-[16px] ml-[12%] mt-[1%] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-purple-600 to-purple-800 text-white">
                Outdated Software Scan
            </h2>

            <div className="w-[100%] flex gap-[5%] mt-[1%]">
                
                <form onSubmit={handleScan} className="w-[40%] bg-slate-300 flex flex-col p-3 gap-3 h-fit">
                    <label className="font-semibold">Target URL or IP:</label>
                    <input 
                        className="bg-white p-2 rounded border border-gray-400"
                        type="text" 
                        placeholder="Enter target URL or IP" 
                        value={target} 
                        onChange={(e) => setTarget(e.target.value)} 
                    />

                    <div className="flex gap-2">
                        <button type="submit" className="w-fit p-3 bg-purple-500 text-white rounded hover:bg-purple-600" disabled={loading}>
                            {loading ? "Scanning..." : "Run Scan"}
                        </button>
                        <button type="button" className="w-fit p-3 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </form>

                <div className="w-[50%] py-[2%] px-[4%] mt-[-5%] h-[calc(100vh-70px)] overflow-y-auto sticky shadow-[#464746] shadow-md rounded-md">
                    <h2 className="p-3 font-bold mb-4 text-[17px] border-l-4 border-purple-500 bg-slate-100 rounded-lg">
                        Scan Results
                    </h2>
                    {loading ? (
                        <p className="text-yellow-600">Scanning in progress...</p>
                    ) : scanResult ? (
                        <pre className="bg-white p-3 border rounded whitespace-pre-wrap break-words max-w-full">
                            {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                        </pre>
                    ) : (
                        <p>No results available.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

// file upload 
export const FileUploadScan = () => {
    const [target, setTarget] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult("");
        setLoading(true);

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
            setLoading(false);
        }
    };

    const handleClear = () => {
        setTarget("");
        setScanResult("");
    };

    return (
        <div className="w-[100%]">
            <h2 className="text-[16px] ml-[15%] mt-[1%] px-4 rounded-lg py-2 w-fit font-bold font-mono bg-gradient-to-r from-red-600 to-red-800 text-white">
                deFile Upload Scan
            </h2>

            <div className="w-[100%] flex gap-[5%] mt-[1%]">
                
                <form onSubmit={handleScan} className="w-[40%] bg-slate-300 flex flex-col p-3 gap-3 h-fit">
                    <label className="font-semibold">Target URL or IP:</label>
                    <input 
                        className="bg-white p-2 rounded border border-gray-400"
                        type="text" 
                        placeholder="Enter target URL or IP" 
                        value={target} 
                        onChange={(e) => setTarget(e.target.value)} 
                    />

                    <div className="flex gap-2">
                        <button type="submit" className="w-fit p-3 bg-red-500 text-white rounded hover:bg-red-600" disabled={loading}>
                            {loading ? "Scanning..." : "Run Scan"}
                        </button>
                        <button type="button" className="w-fit p-3 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </form>

                <div className="w-[50%] py-[2%] px-[4%] mt-[-5%] h-[calc(100vh-70px)] overflow-y-auto sticky shadow-[#464746] shadow-md rounded-md">
                    <h2 className="p-3 font-bold mb-4 text-[17px] border-l-4 border-red-500 bg-slate-100 rounded-lg">
                        Scan Results
                    </h2>
                    {loading ? (
                        <p className="text-yellow-600">Scanning in progress...</p>
                    ) : scanResult ? (
                        <pre className="bg-white p-3 border rounded whitespace-pre-wrap break-words max-w-full">
                            {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                        </pre>
                    ) : (
                        <p>No results available.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

