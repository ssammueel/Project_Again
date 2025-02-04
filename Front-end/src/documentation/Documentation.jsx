import React from 'react'

export const Documentation = () => {
    
  return (
    <div className='p-20 bg-slate-50 text-2xl text-sky-600'>
      
        Documentation
        <p className='text-black'> Edit
nmap -p 80,443,8080,8443 10.0.1.11
📌 Checks if a web server is running.

🔹 7. Scan UDP Ports
Scans for open UDP ports.

bash
Copy
Edit
sudo nmap -sU -p 53,161,123 10.0.1.11
📌 Useful for checking DNS (53), SNMP (161), and NTP (123).

🔹 8. Scan for Vulnerabilities (Nmap Scripts - NSE)
Runs vulnerability scripts using NSE.

bash
Copy
Edit
nmap --script=vuln 10.0.1.11
📌 Finds known vulnerabilities (like CVEs) on the target system.

🔹 9. Aggressive Scan (OS + Services + Scripts)
A comprehensive scan using multiple techniques.

bash
Copy
Edit
sudo nmap -A 10.0.1.11
📌 Gathers maximum information but is noisy (easily detected).

🔹 10. Stealth Scan (Avoid Detection)
Uses SYN scan to stay undetected by firewalls.

bash
Copy
Edit
sudo nmap -sS 10.0.1.11
📌 Commonly used in penetration testing for stealth reconnaissance.</p>

    </div>
    
  )
}
