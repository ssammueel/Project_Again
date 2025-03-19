import { useState, useEffect } from "react";

export const TracertHistory = () => {
    const [history, setHistory] = useState([]);
    const [date, setDate] = useState("");

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const url = date ? `http://127.0.0.1:5000/api/tfetch?date=${date}` : "http://127.0.0.1:5000/api/tfetch";
        const response = await fetch(url);
        const data = await response.json();
        setHistory(data);
    };

    return (
        <div>
            <h2>Traceroute History</h2>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <button onClick={fetchHistory}>Fetch</button>

            <ul>
                {history.map((scan, index) => (
                    <li key={index}>
                        {scan.timestamp} - {scan.ip}
                        <pre>{JSON.stringify(scan.scan_results, null, 2)}</pre>
                    </li>
                ))}
            </ul>
        </div>
    );
};
