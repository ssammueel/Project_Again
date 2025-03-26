import React from "react";
import { Link } from "react-router-dom";

export const Ex_tools = () => {
  return (
    <div className="p-6 font-sans text-black bg-white bg-opacity-90 rounded-lg shadow-lg w-[60%] mx-auto mb-4">
      {/* Main Title */}
      <div className="text-[24px] font-bold mb-4">Tools Used</div>

      {/* Nmap Sections Inside the Tools Used Container */}
      <div className="p-3 font-sans text-black bg-[#edf2f4] bg-opacity-90 rounded-lg shadow-2xl w-[100%] mb-4">
        <div className="text-[20px] font-bold mb-4">🔍 Nmap Scans</div>
        <p>Want to see your network the way hackers do? Nmap is the ultimate reconnaissance tool used to map out networks, detect live hosts, open ports, running services, and even operating systems. It’s essential for ethical hackers and security analysts to assess network security and uncover potential vulnerabilities before attackers do. Whether you're scanning a small system or an enterprise-level network, Nmap provides deep insights with various scanning techniques like SYN, UDP, and OS fingerprinting.
        </p>
        <Link to='d' className="text-blue-800 link-hover ">Read More</Link>
      </div>

      <div className="p-3 font-sans text-black bg-[#edf2f4] bg-opacity-90 rounded-lg shadow-2xl w-[100%] mb-4">
        <div className="text-[20px] font-bold mb-4">💀 Metasploit</div>
        <p>The Metasploit Framework is the most powerful penetration testing platform available. Used by ethical hackers, security researchers, and even malicious attackers, Metasploit allows you to launch real-world exploits, test for system vulnerabilities, and even craft custom attack payloads. With an extensive database of pre-built exploits, you can simulate cyberattacks and identify weak points in your infrastructure before a real attacker does. If youre serious about ethical hacking, Metasploit is a must-have tool!
        </p>
        <Link to='d' className="text-blue-800 link-hover ">Read More</Link>
      </div>

      <div className="p-3 font-sans text-black bg-[#edf2f4] bg-opacity-90 rounded-lg shadow-2xl w-[100%] mb-4">
        <div className="text-[20px] font-bold mb-4">🛑 SQL Vulnerability</div>
        <p>Your database holds sensitive information, but is it truly secure? SQL injection is one of the most dangerous cyber threats, allowing attackers to manipulate poorly structured database queries to gain unauthorized access. Tools like SQLmap automate the process of detecting and exploiting SQL vulnerabilities, revealing weaknesses that could lead to data leaks, credential theft, and full database takeovers. If your web application isn't protected against SQL injection, its only a matter of time before its exploited!
        </p>
        <Link to='d' className="text-blue-800 link-hover ">Read More</Link>
      </div>

      <div className="p-3 font-sans text-black bg-[#edf2f4] bg-opacity-90 rounded-lg shadow-2xl w-[100%] mb-4">
        <div className="text-[20px] font-bold mb-4">📡 Wi-Fi Cracking </div>
        <p>Wireless networks are convenient but can also be a hackers playground if not properly secured. Tools like Aircrack-ng analyze Wi-Fi security, crack weak passwords, and test encryption protocols to ensure your network isn’t an easy target. Whether you're auditing your own wireless security or learning about common Wi-Fi attack methods, cracking tools help uncover vulnerabilities in WEP, WPA, and WPA2 encryption. If your Wi-Fi isnt properly secured, its at risk!
        </p>
        <Link to='d' className="text-blue-800 link-hover ">Read More</Link>
      </div>

      <div className="p-3 font-sans text-black bg-[#edf2f4] bg-opacity-90 rounded-lg shadow-2xl w-[100%]">
        <div className="text-[20px] font-bold mb-4">🔓 Hydra</div>
        <p>Weak passwords are an open door for hackers, and Hydra is designed to prove it. This high-speed brute-force attack tool systematically tests multiple username-password combinations across various login protocols like SSH, FTP, RDP, and web forms. Security professionals use Hydra to identify weak authentication mechanisms before cybercriminals can exploit them. If your system relies on poor passwords, Hydra will break through—fast!
        </p>
        <Link to='d' className="text-blue-800 link-hover ">Read More</Link>
      </div>
    </div>
  );
};