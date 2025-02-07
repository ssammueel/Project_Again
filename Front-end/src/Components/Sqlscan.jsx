import { useState } from "react";

// basic scan 
export const BasicScan = () => {
    const [targetUrl, setTargetUrl] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult(""); 
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/sqlmap/basic_scan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target_url: targetUrl }),
            });

            const data = await response.json();
            setScanResult(data.output || data.error);
        } catch (error) {
            console.error("Scan error:", error);
            setScanResult("Error running SQL injection scan.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">SQLMap Basic Scan</label>
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Target URL"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
            />
            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Scanning..." : "Start Scan"}
            </button>

            {loading && <p className="mt-3 text-yellow-600">Scanning in progress...</p>}

            {!loading && scanResult && (
                <pre className="mt-4 p-3 bg-white border rounded overflow-auto whitespace-pre-wrap break-words max-w-full">
                    {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                </pre>
            )}
        </form>
    );
};

// dbenum 
export const DbEnum = () => {
    const [targetUrl, setTargetUrl] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult("");
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/sqlmap/db_enum", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target_url: targetUrl }),
            });

            const data = await response.json();
            setScanResult(data.output || data.error);
        } catch (error) {
            console.error("Scan error:", error);
            setScanResult("Error running database enumeration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">SQLMap Database Enumeration</label>
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Target URL"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
            />
            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Scanning..." : "Start Scan"}
            </button>

            {loading && <p className="mt-3 text-yellow-600">Scanning in progress...</p>}

            {!loading && scanResult && (
                <pre className="mt-4 p-3 bg-white border rounded overflow-auto whitespace-pre-wrap break-words max-w-full">
                    {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                </pre>
            )}
        </form>
    );
};

// table extract 
export const TableExtract = () => {
    const [targetUrl, setTargetUrl] = useState("");
    const [dbName, setDbName] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult("");
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/sqlmap/table_extract", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target_url: targetUrl, db_name: dbName }),
            });

            const data = await response.json();
            setScanResult(data.output || data.error);
        } catch (error) {
            console.error("Scan error:", error);
            setScanResult("Error extracting tables.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">SQLMap Table Extraction</label>
            
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Target URL"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
            />

            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Database Name"
                value={dbName}
                onChange={(e) => setDbName(e.target.value)}
            />

            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Extracting..." : "Extract Tables"}
            </button>

            {loading && <p className="mt-3 text-yellow-600">Extraction in progress...</p>}

            {!loading && scanResult && (
                <pre className="mt-4 p-3 bg-white border rounded overflow-auto whitespace-pre-wrap break-words max-w-full">
                    {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                </pre>
            )}
        </form>
    );
};

// custom scan 
export const CustomSQL = () => {
    const [targetUrl, setTargetUrl] = useState("");
    const [sqlQuery, setSqlQuery] = useState("");
    const [queryResult, setQueryResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleQuery = async (e) => {
        e.preventDefault();
        setQueryResult("");
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/sqlmap/custom_sql", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target_url: targetUrl, sql_query: sqlQuery }),
            });

            const data = await response.json();
            setQueryResult(data.output || data.error);
        } catch (error) {
            console.error("Query execution error:", error);
            setQueryResult("Error executing query.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleQuery} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">SQLMap Custom Query</label>
            
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Target URL"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
            />

            <textarea
                className="bg-white p-2 rounded border mt-2"
                placeholder="Enter Custom SQL Query"
                value={sqlQuery}
                onChange={(e) => setSqlQuery(e.target.value)}
                rows={4}
            />

            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Executing..." : "Run SQL Query"}
            </button>

            {loading && <p className="mt-3 text-yellow-600">Query execution in progress...</p>}

            {!loading && queryResult && (
                <pre className="mt-4 p-3 bg-white border rounded overflow-auto whitespace-pre-wrap break-words max-w-full">
                    {typeof queryResult === "string" ? queryResult : JSON.stringify(queryResult, null, 2)}
                </pre>
            )}
        </form>
    );
};
