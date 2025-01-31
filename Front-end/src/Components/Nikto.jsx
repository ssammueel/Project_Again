import { useState } from "react";

export const NiktoScan = () => {
    const [url, setUrl] = useState("");
    const [scanResult, setScanResult] = useState("");

    const handleScan = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:5000/api/nikto_scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            setScanResult(data.output || data.error);
        } catch (error) {
            console.error("Error running scan:", error);
            setScanResult("Error running scan");
        }
    };

    return (
        <div className="bg-slate-300 p-5 h-fit flex flex-col w-[70%]">
            <h2 className="text-xl font-bold">Nikto Web Server Scan</h2>
            <form onSubmit={handleScan} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Enter target URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="bg-white p-2 rounded w-[100%]"
                />
                <button type="submit" className="btn btn-primary mt-2 w-fit">Run Scan</button>
            </form>

            {scanResult && (
                <div className="mt-5 bg-white p-3 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold">Scan Results:</h3>
                    <pre className="whitespace-pre-wrap">{scanResult}</pre>
                </div>
            )}
        </div>
    );
};
