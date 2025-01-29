from flask import Blueprint, request, jsonify
import nmap

firewall_scan_bp = Blueprint('firewall_scan', __name__)

def firewall_bypass_scan(ip):
    try:
        nm = nmap.PortScanner()
        nm.scan(ip, arguments='-f -D RND:10')  # Fragment packets & use random decoys
        return nm[ip]
    except Exception as e:
        return f"Error: {e}"

@firewall_scan_bp.route('/scan_firewall', methods=['POST'])
def firewall_scan():
    data = request.json
    ip_address = data.get('ip')
    if not ip_address:
        return jsonify({"error": "IP address is required"}), 400
    result = firewall_bypass_scan(ip_address)
    return jsonify({"ip": ip_address, "firewall_scan_results": result})
