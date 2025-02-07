import { useState } from "react";

// sshb
export const SSHBruteforce = () => {
    const [target, setTarget] = useState("");
    const [usernameList, setUsernameList] = useState("");
    const [passwordList, setPasswordList] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult(""); 
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/hydra/ssh_bruteforce", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target, username_list: usernameList, password_list: passwordList }),
            });

            const data = await response.json();
            setScanResult(data.output || data.error);
        } catch (error) {
            console.error("Scan error:", error);
            setScanResult("Error running SSH bruteforce attack.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">SSH Bruteforce Attack</label>
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Target IP"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            />
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Path to Username List"
                value={usernameList}
                onChange={(e) => setUsernameList(e.target.value)}
            />
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Path to Password List"
                value={passwordList}
                onChange={(e) => setPasswordList(e.target.value)}
            />
            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Running..." : "Start Bruteforce"}
            </button>

            {loading && <p className="mt-3 text-yellow-600">Bruteforce in progress...</p>}

            {!loading && scanResult && (
                <pre className="mt-4 p-3 bg-white border rounded overflow-auto whitespace-pre-wrap break-words max-w-full">
                    {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                </pre>
            )}
        </form>
    );
};

// ftp 
export const FTPBruteforce = () => {
    const [target, setTarget] = useState("");
    const [usernameList, setUsernameList] = useState("");
    const [passwordList, setPasswordList] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult(""); 
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/hydra/ftp_bruteforce", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target, username_list: usernameList, password_list: passwordList }),
            });

            const data = await response.json();
            setScanResult(data.output || data.error);
        } catch (error) {
            console.error("Scan error:", error);
            setScanResult("Error running FTP bruteforce attack.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">FTP Bruteforce Attack</label>
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Target IP"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            />
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Path to Username List"
                value={usernameList}
                onChange={(e) => setUsernameList(e.target.value)}
            />
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Path to Password List"
                value={passwordList}
                onChange={(e) => setPasswordList(e.target.value)}
            />
            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Running..." : "Start Bruteforce"}
            </button>

            {loading && <p className="mt-3 text-yellow-600">Bruteforce in progress...</p>}

            {!loading && scanResult && (
                <pre className="mt-4 p-3 bg-white border rounded overflow-auto whitespace-pre-wrap break-words max-w-full">
                    {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                </pre>
            )}
        </form>
    );
};

// msqlbrutefoce 

export const MySQLBruteforce = () => {
    const [target, setTarget] = useState("");
    const [usernameList, setUsernameList] = useState("");
    const [passwordList, setPasswordList] = useState("");
    const [scanResult, setScanResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleScan = async (e) => {
        e.preventDefault();
        setScanResult(""); 
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/hydra/mysql_bruteforce", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ target, username_list: usernameList, password_list: passwordList }),
            });

            const data = await response.json();
            setScanResult(data.output || data.error);
        } catch (error) {
            console.error("Scan error:", error);
            setScanResult("Error running MySQL bruteforce attack.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleScan} className="bg-slate-300 mt-10 p-3 flex flex-col w-[100%]">
            <label className="font-bold">MySQL Bruteforce Attack</label>
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Enter Target IP"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
            />
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Path to Username List"
                value={usernameList}
                onChange={(e) => setUsernameList(e.target.value)}
            />
            <input 
                className="bg-white p-2 rounded border mt-2"
                type="text"
                placeholder="Path to Password List"
                value={passwordList}
                onChange={(e) => setPasswordList(e.target.value)}
            />
            <button type="submit" className="mt-3 p-2 bg-blue-600 w-fit text-white rounded">
                {loading ? "Running..." : "Start Bruteforce"}
            </button>

            {loading && <p className="mt-3 text-yellow-600">Bruteforce in progress...</p>}

            {!loading && scanResult && (
                <pre className="mt-4 p-3 bg-white border rounded overflow-auto whitespace-pre-wrap break-words max-w-full">
                    {typeof scanResult === "string" ? scanResult : JSON.stringify(scanResult, null, 2)}
                </pre>
            )}
        </form>
    );
};
