from flask import Blueprint, request, jsonify
import nmap

os_scan_bp = Blueprint('os_scan', __name__)
def detect_os(ip):
    try:
        # Initialize the Nmap PortScanner
        nm = nmap.PortScanner()

        # Perform an OS detection scan
        nm.scan(ip, arguments='-O')

        # Check if the scan was successful
        if ip in nm.all_hosts() and 'osclass' in nm[ip]:
            os_info = nm[ip]['osclass']
            if os_info:
                # Extract OS family (e.g., Windows, Linux)
                os_family = os_info[0].get('osfamily', 'Unknown OS')
                return os_family
        return "No OS information available"
    except Exception as e:
        return f"Error: {e}"
