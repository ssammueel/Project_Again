from flask import Blueprint, request, jsonify
import nmap

vuln_scan_bp = Blueprint('vuln_scan', __name__)

def scan_vulnerabilities(ip):
    try:
        nm = nmap.PortScanner()
        nm.scan(ip, arguments='--script vuln')  # Runs NSE vulnerability scripts
        vulnerabilities = nm[ip].get('hostscript', [])
        return vulnerabilities if vulnerabilities else "No vulnerabilities found"
    except Exception as e:
        return f"Error: {e}"

@vuln_scan_bp.route('/scan_vuln', methods=['POST'])
def vuln_scan():
    data = request.json
    ip_address = data.get('ip')
    if not ip_address:
        return jsonify({"error": "IP address is required"}), 400
    result = scan_vulnerabilities(ip_address)
    return jsonify({"ip": ip_address, "vulnerabilities": result})
