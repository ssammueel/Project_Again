export const DocHydra = () => {
  const niktoCommands = [
    {
        title: "Basic Scan",
        cmd: "nikto -h http://192.168.1.1",
        desc: "Performs a basic scan on the target web server"
    },
    {
        title: "SSL Scan",
        cmd: "nikto -h https://192.168.1.1",
        desc: "Scans an HTTPS website for vulnerabilities"
    },
    {
        title: "Scan Specific Port",
        cmd: "nikto -h 192.168.1.1 -p 8080",
        desc: "Scans a web server running on a custom port"
    },
    {
        title: "Use Proxy",
        cmd: "nikto -h 192.168.1.1 -useproxy http://proxy:8080",
        desc: "Runs the scan through a proxy server"
    },
    {
        title: "Verbose Mode",
        cmd: "nikto -h 192.168.1.1 -Display V",
        desc: "Provides detailed output during the scan"
    },
    {
        title: "Save Report (HTML)",
        cmd: "nikto -h 192.168.1.1 -o report.html -Format htm",
        desc: "Saves the scan results in an HTML file"
    },
    {
        title: "Save Report (CSV)",
        cmd: "nikto -h 192.168.1.1 -o report.csv -Format csv",
        desc: "Saves the scan results in a CSV file"
    },
    {
        title: "Scan with Specific Plugins",
        cmd: "nikto -h 192.168.1.1 -Plugins testplugins",
        desc: "Runs the scan with specific Nikto plugins"
    },
    {
        title: "Scan for Specific Vulnerabilities",
        cmd: "nikto -h 192.168.1.1 -Tuning 9",
        desc: "Focuses the scan on known vulnerabilities"
    },
    {
        title: "Evade IDS with User-Agent Spoofing",
        cmd: "nikto -h 192.168.1.1 -UserAgent 'Mozilla/5.0'",
        desc: "Changes the user-agent to evade detection"
    },
    {
        title: "Ignore SSL Certificate Warnings",
        cmd: "nikto -h https://192.168.1.1 -nossl",
        desc: "Skips SSL certificate checks during scanning"
    },
    {
        title: "Set Custom Timeout",
        cmd: "nikto -h 192.168.1.1 -timeout 10",
        desc: "Sets a timeout for each request (in seconds)"
    },
    {
        title: "Scan Multiple Hosts",
        cmd: "nikto -h hosts.txt",
        desc: "Scans multiple targets listed in a file"
    },
    {
        title: "Test Only a Specific URL",
        cmd: "nikto -h 192.168.1.1 -url /admin",
        desc: "Scans only a specific directory or page"
    }
];

return (
    <div className="p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 p-1.5 rounded-md">🌐</span>
            Nikto Web Scanner Guide
        </h2>
        
        <div className="grid gap-4">
            {niktoCommands.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <h3 className="font-medium text-gray-800 mb-1.5">{item.title}</h3>
                    <code className="block bg-gray-200/80 p-1.5 rounded text-sm mb-1.5 overflow-x-auto">
                        {item.cmd}
                    </code>
                    <p className="text-xs md:text-sm text-gray-600">{item.desc}</p>
                </div>
            ))}
        </div>
    </div>
);
};
