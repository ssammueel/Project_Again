import React from "react";
import { Link } from "react-router-dom";

export const Ex_tools = () => {
  return (
    <div className="p-6 font-sans text-black bg-white bg-opacity-90 rounded-lg shadow-lg w-[60%] mx-auto mb-4">
      {/* Main Title */}
      <div className="text-[24px] font-bold mb-4">Function Expected</div>

      {/* Nmap Sections Inside the Tools Used Container */}
      <div className="p-3 font-sans text-black bg-[#edf2f4] bg-opacity-90 rounded-lg shadow-2xl w-[100%] mb-4">
        <div className="text-[20px] font-bold mb-4">🔍 Port Scanning</div>
        <p>Port scanning is a technique used to discover open ports and services on a target system or network. By systematically probing a range of ports, an analyst can determine which ones are accepting connections, revealing potential entry points or vulnerabilities. Different scanning methods exist, each with its own advantages—some are stealthy and evade detection, while others are more aggressive for faster results. The process helps in assessing security posture, identifying misconfigurations, or detecting unauthorized services. Properly conducted, it serves as a critical step in network reconnaissance, providing insights into active hosts, running applications, and potential attack surfaces. However, it must be performed ethically and with proper authorization to avoid legal and operational risks.
        </p>
        <p className="text-blue-800 link-hover ">stay updated</p>
      </div>

      <div className="p-3 font-sans text-black bg-[#edf2f4] bg-opacity-90 rounded-lg shadow-2xl w-[100%] mb-4">
        <div className="text-[20px] font-bold mb-4">💀 Aggigasive Scan</div>
        <p>An aggressive port scan will rapidly probe your system for open ports and services, generating noticeable network activity. Unlike stealthy scans, this method is fast and thorough, often triggering security alerts due to its high volume of connection attempts. It will actively identify running services, their versions, and possibly even the operating system, providing a detailed snapshot of exposed entry points. Expect increased network traffic and potential log entries as the scan aggressively tests multiple ports in quick succession. This approach is useful for quickly uncovering vulnerabilities but is easily detected by intrusion detection systems (IDS) and firewalls. If you're monitoring network security, you’ll likely see this scan in your logs.
        </p>
        <p className="text-[#961818]  mt-2 font-arial ">#No to insecurity</p>
      </div>

      <div className="p-3 font-sans text-black bg-[#edf2f4] bg-opacity-90 rounded-lg shadow-2xl w-[100%] mb-4">
        <div className="text-[20px] font-bold mb-4">🛑 Custom Scripting</div>
        <p>A custom script scan allows you to define your own set of rules and probes for port scanning, tailoring the process to your specific needs. Instead of relying on predefined methods, you can input custom commands that dictate how ports are checked, which services are interrogated, and what level of aggression or stealth is applied. This flexibility lets you focus on particular vulnerabilities, bypass certain filters, or optimize speed and detection based on the target environment.When running a custom scan, expect precise control over probe types, timing, and target selection, but also be aware that poorly configured scans may produce incomplete results or trigger security alerts. Since the behavior depends entirely on your input, the scan’s impact—whether noisy and fast or slow and evasive—will vary accordingly. If you're monitoring the system, you may see unusual traffic patterns based on the custom parameters used. Always ensure proper authorization before executing such scans to avoid unintended disruptions
        </p>
        <p className="text-[#961818]  mt-2 font-arial ">#No to insecurity</p>
      </div>

      <div className="p-3 font-sans text-black bg-[#edf2f4] bg-opacity-90 rounded-lg shadow-2xl w-[100%] mb-4">
        <div className="text-[20px] font-bold mb-4">📡 outdated software detection </div>
        <p>This system includes an outdated software detection feature that scans web servers and applications for known vulnerabilities in older versions of software. It checks for end-of-life (EOL) programs, unpatched services, and insecure configurations that could expose your system to exploits. The scan compares detected software versions against databases of known vulnerabilities, flagging anything outdated or unsupported. Since attackers often target old software with public exploits, this feature helps you identify weak points before they can be abused. Note that this is a passive detection tool—it won’t exploit flaws but will alert you to upgrade or patch vulnerable services. Expect visible log entries if the scan runs, as it actively probes web apps for version information. Use this to stay ahead of potential security risks.
        </p>
        <p className="text-[#961818]  mt-2 font-arial ">#No to insecurity</p>
      </div>

      <div className="p-3 font-sans text-black bg-[#edf2f4] bg-opacity-90 rounded-lg shadow-2xl w-[100%]">
        <div className="text-[20px] font-bold mb-4">🔓 Others</div>
        <p>This system includes comprehensive security scanning capabilities to help identify potential vulnerabilities across your network and web applications. The outdated software detection feature scans for end-of-life (EOL) programs, unpatched services, and insecure configurations that could expose your system to known exploits. Additionally, the traceroute scan maps network pathways, revealing hidden hops or unexpected routing behavior that could indicate misconfigurations or malicious redirections. The firewall scan probes for open ports, weak rule sets, and misconfigured access controls that might leave your system exposed. For web applications, the header scan examines HTTP responses for insecure settings, verbose error leaks, and missing security headers that could aid attackers. Combined with Nikto-based web vulnerability scanning, which checks for dangerous default files, outdated server software, and common web flaws, this suite provides a multi-layered approach to uncovering risks before they can be exploited. These scans generate detailed logs, so expect visible activity—use them to harden your defenses and stay ahead of threats.
        </p>
        <p className="text-[#961818]  mt-2 font-arial ">#No to insecurity</p>
      </div>
    </div>
  );
};