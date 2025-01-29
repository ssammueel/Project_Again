from flask import Blueprint, request, jsonify
import nmap

syn_scan_bp = Blueprint('syn_scan', __name__)

def syn_scan(ip):
    try:
        nm = nmap.PortScanner()
        nm.scan(ip, arguments='-sS')  # SYN Stealth Scan
        return nm[ip]
    except Exception as e:
        return f"Error: {e}"

@syn_scan_bp.route('/scan_syn', methods=['POST'])
def syn_scan_route():
    data = request.json
    ip_address = data.get('ip')
    if not ip_address:
        return jsonify({"error": "IP address is required"}), 400
    result = syn_scan(ip_address)
    return jsonify({"ip": ip_address, "syn_scan_results": result})
