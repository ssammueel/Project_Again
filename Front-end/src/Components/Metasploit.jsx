//exploits

import { useEffect, useState } from "react";

export const Exploits = () => {
    const [module, setModule] = useState("");
    const [target, setTarget] = useState("");
    const [options, setOptions] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        setResult(null);
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/metasploit/exploit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ module, target, options: JSON.parse(options || "{}") }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Exploit error:", error);
            setResult({ error: "Failed to execute exploit" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-gray-200 p-4 rounded">
            <h2 className="text-xl font-bold">Metasploit Exploit</h2>
            <input 
                className="p-2 border rounded w-full my-2 bg-slate-50" 
                type="text" 
                placeholder="Enter Metasploit Module (e.g., exploit/windows/smb/ms17_010)" 
                value={module} 
                onChange={(e) => setModule(e.target.value)} 
            />
            <input 
                className="p-2 border rounded w-full my-2 bg-slate-50" 
                type="text" 
                placeholder="Enter Target IP" 
                value={target} 
                onChange={(e) => setTarget(e.target.value)} 
            />
            <textarea 
                className="p-2 border rounded w-full my-2 bg-slate-50" 
                placeholder='Enter Additional Options as JSON (e.g., {"LPORT":4444})' 
                value={options} 
                onChange={(e) => setOptions(e.target.value)} 
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                {loading ? "Running Exploit..." : "Run Exploit"}
            </button>
            {result && (
                <pre className="mt-4 p-2 bg-white border rounded overflow-auto">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </form>
    );
};

// Scanners 

export const Scanners = () => {
    const [module, setModule] = useState("");
    const [target, setTarget] = useState("");
    const [options, setOptions] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        setResult(null);
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/metasploit/scanner", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ module, target, options: JSON.parse(options || "{}") }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Scan error:", error);
            setResult({ error: "Failed to execute scanner" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-gray-200 p-4 rounded">
            <h2 className="text-xl font-bold">Metasploit Scanners</h2>
            <input 
                className="Scanners bg-slate-50 p-2 border rounded w-full my-2" 
                type="text" 
                placeholder="Enter Scanner Module (e.g., auxiliary/scanner/portscan/tcp)" 
                value={module} 
                onChange={(e) => setModule(e.target.value)} 
            />
            <input 
                className="Scanners bg-slate-50 p-2 border rounded w-full my-2" 
                type="text" 
                placeholder="Enter Target IP" 
                value={target} 
                onChange={(e) => setTarget(e.target.value)} 
            />
            <textarea 
                className="Scanners bg-slate-50 p-2 border rounded w-full my-2" 
                placeholder='Enter Additional Options as JSON (e.g., {"THREADS": 10})' 
                value={options} 
                onChange={(e) => setOptions(e.target.value)} 
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                {loading ? "Running Scan..." : "Run Scan"}
            </button>
            {result && (
                <pre className="mt-4 p-2 bg-white border rounded overflow-auto">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </form>
    );
};

// PostExploitation

export const PostExploitation = () => {
    const [sessionId, setSessionId] = useState("");
    const [module, setModule] = useState("");
    const [options, setOptions] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleExploit = async (e) => {
        e.preventDefault();
        setResult(null);
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/metasploit/post_exploitation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session_id: sessionId, module, options: JSON.parse(options || "{}") }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Exploit error:", error);
            setResult({ error: "Failed to execute post-exploitation module" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleExploit} className="bg-gray-200 p-4 rounded">
            <h2 className="text-xl font-bold">Metasploit Post Exploitation</h2>
            <input 
                className="bg-slate-50 p-2 border rounded w-full my-2" 
                type="text" 
                placeholder="Enter Active Session ID" 
                value={sessionId} 
                onChange={(e) => setSessionId(e.target.value)} 
            />
            <input 
                className="bg-slate-50 p-2 border rounded w-full my-2" 
                type="text" 
                placeholder="Enter Post-Exploitation Module (e.g., post/windows/gather/hashdump)" 
                value={module} 
                onChange={(e) => setModule(e.target.value)} 
            />
            <textarea 
                className="bg-slate-50 p-2 border rounded w-full my-2" 
                placeholder='Enter Additional Options as JSON (e.g., {"VERBOSE": true})' 
                value={options} 
                onChange={(e) => setOptions(e.target.value)} 
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                {loading ? "Executing..." : "Run Post Exploit"}
            </button>
            {result && (
                <pre className="mt-4 p-2 bg-white border rounded overflow-auto">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </form>
    );
};

//persistence

export const Persistence = () => {
    const [sessionId, setSessionId] = useState("");
    const [method, setMethod] = useState("registry");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePersistence = async (e) => {
        e.preventDefault();
        setResult(null);
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/metasploit/persistence", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session_id: sessionId, method }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Persistence error:", error);
            setResult({ error: "Failed to establish persistence" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handlePersistence} className="bg-gray-200 p-4 rounded">
            <h2 className="text-xl font-bold">Metasploit Persistence Setup</h2>
            <input 
                className="bg-slate-50 p-2 border rounded w-full my-2" 
                type="text" 
                placeholder="Enter Active Session ID" 
                value={sessionId} 
                onChange={(e) => setSessionId(e.target.value)} 
            />
            <select 
                className="bg-slate-50 p-2 border rounded w-full my-2"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
            >
                <option value="registry">Registry Persistence (Windows)</option>
                <option value="scheduled_task">Scheduled Task (Windows)</option>
                <option value="startup_folder">Startup Folder (Windows)</option>
                <option value="service">Service Persistence (Windows)</option>
                <option value="ssh_key">SSH Key Persistence (Linux)</option>
            </select>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                {loading ? "Setting up..." : "Enable Persistence"}
            </button>
            {result && (
                <pre className="mt-4 p-2 bg-white border rounded overflow-auto">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </form>
    );
};

//msfrpc

export const MSFRPC = () => {
    const [moduleName, setModuleName] = useState("");
    const [options, setOptions] = useState({});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleExecute = async (e) => {
        e.preventDefault();
        setResult(null);
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/metasploit/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ module: moduleName, options }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Execution error:", error);
            setResult({ error: "Failed to execute module" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleExecute} className="bg-gray-200 p-4 rounded">
            <h2 className="text-xl font-bold">Metasploit RPC Module Execution</h2>
            <input 
                className="bg-slate-50 p-2 border rounded w-full my-2"
                type="text"
                placeholder="Enter Metasploit Module (e.g., exploit/windows/smb/ms17_010)"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                {loading ? "Running..." : "Execute Module"}
            </button>
            {result && (
                <pre className="mt-4 p-2 bg-white border rounded overflow-auto">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </form>
    );
};

//payloads

export const Payloads = () => {
    const [payloads, setPayloads] = useState([]);
    const [selectedPayload, setSelectedPayload] = useState("");
    const [options, setOptions] = useState({});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPayloads = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/metasploit/payloads");
                const data = await response.json();
                setPayloads(data || []);
            } catch (error) {
                console.error("Failed to fetch payloads:", error);
            }
        };

        fetchPayloads();
    }, []);

    const handleExecute = async (e) => {
        e.preventDefault();
        setResult(null);
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/metasploit/payloads/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ payload: selectedPayload, options }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Execution error:", error);
            setResult({ error: "Failed to execute payload" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleExecute} className="bg-gray-200 p-4 rounded">
            <h2 className="text-xl font-bold">Metasploit Payload Execution</h2>
            <select
                className="bg-slate-50 p-2 border rounded w-full my-2"
                value={selectedPayload}
                onChange={(e) => setSelectedPayload(e.target.value)}
            >
                <option value="">Select a Payload</option>
                {payloads.map((payload, index) => (
                    <option key={index} value={payload}>{payload}</option>
                ))}
            </select>
            <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                {loading ? "Executing..." : "Run Payload"}
            </button>
            {result && (
                <pre className="mt-4 p-2 bg-white border rounded overflow-auto">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </form>
    );
};
