export const DocNmap = () => {
  const nmapCommands = [
    {
      title: "Basic Scan",
      cmd: "nmap 192.168.1.1",
      desc: "Scans 1000 most common ports"
    },
    {
      title: "Specific Port",
      cmd: "nmap -p 80,443 192.168.1.1",
      desc: "Scan only ports 80 and 443"
    },
    {
      title: "Version Detection",
      cmd: "nmap -sV 192.168.1.1",
      desc: "Detects service versions"
    },
    {
      title: "Aggressive Scan",
      cmd: "nmap -A 192.168.1.1",
      desc: "Performs OS detection, version detection, script scanning, and traceroute"
    },
    {
      title: "OS Detection",
      cmd: "nmap -O 192.168.1.1",
      desc: "Detects the operating system of the target"
    },
    {
      title: "Ping Scan",
      cmd: "nmap -sn 192.168.1.1",
      desc: "Checks if the host is up without scanning ports"
    },
    {
      title: "UDP Scan",
      cmd: "nmap -sU 192.168.1.1",
      desc: "Scans for open UDP ports"
    },
    {
      title: "Stealth Scan",
      cmd: "nmap -sS 192.168.1.1",
      desc: "Performs a stealthy SYN scan to avoid detection"
    },
    {
      title: "No DNS Resolution",
      cmd: "nmap -n 192.168.1.1",
      desc: "Disables DNS resolution for faster scanning"
    },
    {
      title: "Scan a Subnet",
      cmd: "nmap 192.168.1.0/24",
      desc: "Scans an entire subnet for live hosts"
    },
    {
      title: "Detect Firewalls",
      cmd: "nmap -sA 192.168.1.1",
      desc: "Determines if a firewall is blocking packets"
    },
    {
      title: "Detect Open Ports Only",
      cmd: "nmap --open 192.168.1.1",
      desc: "Shows only open ports in the scan results"
    },
    {
      title: "Scan with Default Scripts",
      cmd: "nmap -sC 192.168.1.1",
      desc: "Runs default scripts to gather more information"
    },
    {
      title: "Slow Comprehensive Scan",
      cmd: "nmap -p- -sS -sV -O -A 192.168.1.1",
      desc: "Scans all 65,535 ports with detailed information"
    },
    {
      title: "Scan IPv6 Host",
      cmd: "nmap -6 2001:db8::1",
      desc: "Scans an IPv6 address"
    },
    {
      title: "Scan with Spoofed MAC",
      cmd: "nmap --spoof-mac 00:11:22:33:44:55 192.168.1.1",
      desc: "Changes the MAC address for the scan"
    },
    {
      title: "Scan Using TCP Connect",
      cmd: "nmap -sT 192.168.1.1",
      desc: "Uses a full TCP connection scan"
    },
    {
      title: "Scan Without Ping",
      cmd: "nmap -Pn 192.168.1.1",
      desc: "Skips host discovery and scans even if the host does not respond to pings"
    },
    {
      title: "Scan Multiple Targets",
      cmd: "nmap 192.168.1.1 192.168.1.2",
      desc: "Scans multiple IP addresses"
    },
    {
      title: "Scan a Range of IPs",
      cmd: "nmap 192.168.1.1-50",
      desc: "Scans IPs from 192.168.1.1 to 192.168.1.50"
    },
    {
      title: "Scan from a File",
      cmd: "nmap -iL targets.txt",
      desc: "Scans targets listed in a file"
    },
    {
      title: "Exclude Hosts",
      cmd: "nmap 192.168.1.0/24 --exclude 192.168.1.10",
      desc: "Scans the subnet but excludes a specific IP"
    },
    {
      title: "Fast Scan",
      cmd: "nmap -F 192.168.1.1",
      desc: "Scans the top 100 most common ports"
    },
    {
      title: "Scan Only Specific Port Ranges",
      cmd: "nmap -p 20-100 192.168.1.1",
      desc: "Scans ports 20 to 100"
    },
    {
      title: "Scan Without Host Discovery",
      cmd: "nmap -Pn 192.168.1.1",
      desc: "Skips ping checks and scans even offline hosts"
    },
    {
      title: "Scan for Specific Services",
      cmd: "nmap -p 22,80,443 --open 192.168.1.1",
      desc: "Scans only ports 22, 80, and 443 and shows only open ones"
    },
    {
      title: "Intense Scan",
      cmd: "nmap -T4 -A -v 192.168.1.1",
      desc: "Aggressive scan with increased speed and verbosity"
    },
    {
      title: "Evade IDS with Decoy",
      cmd: "nmap -D RND:10 192.168.1.1",
      desc: "Uses random decoy IPs to hide the real scan source"
    },
    {
      title: "Evade IDS with Fragmentation",
      cmd: "nmap -f 192.168.1.1",
      desc: "Uses tiny fragmented packets to bypass detection"
    },
    {
      title: "Use a Specific Source Port",
      cmd: "nmap --source-port 53 192.168.1.1",
      desc: "Scans using port 53 as the source port"
    },
    {
      title: "Detect Web Vulnerabilities",
      cmd: "nmap --script=http-vuln* 192.168.1.1",
      desc: "Runs vulnerability scripts against web services"
    },
    {
      title: "Check for Anonymous FTP Access",
      cmd: "nmap --script=ftp-anon 192.168.1.1",
      desc: "Checks if anonymous FTP access is allowed"
    },
    {
      title: "Check for SMB Vulnerabilities",
      cmd: "nmap --script=smb-vuln* -p 139,445 192.168.1.1",
      desc: "Scans for SMB vulnerabilities on ports 139 and 445"
    },
    {
      title: "Check for Heartbleed",
      cmd: "nmap --script=ssl-heartbleed -p 443 192.168.1.1",
      desc: "Detects Heartbleed vulnerability in SSL"
    },
    {
      title: "Check for SQL Injection",
      cmd: "nmap --script=http-sql-injection 192.168.1.1",
      desc: "Tests web services for SQL injection vulnerabilities"
    },
    {
      title: "Brute Force SSH",
      cmd: "nmap --script=ssh-brute -p 22 192.168.1.1",
      desc: "Attempts SSH login brute force attack"
    },
    {
      title: "DNS Zone Transfer",
      cmd: "nmap --script=dns-zone-transfer -p 53 192.168.1.1",
      desc: "Attempts to retrieve DNS zone information"
    }
    // Add more commands as needed
  ];

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="bg-blue-100 text-blue-800 p-1.5 rounded-md">🛡️</span>
        Nmap Port Scanning Guide
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {nmapCommands.map((item, index) => (
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