from flask import Blueprint, request, jsonify
import nmap

traceroute_scan_bp = Blueprint('traceroute_scan', __name__)

def traceroute_scan(ip):
    try:
        nm = nmap.PortScanner()
        nm.scan(ip, arguments='--traceroute')
        return nm[ip]
    except Exception as e:
        return f"Error: {e}"

@traceroute_scan_bp.route('/scan_traceroute', methods=['POST'])
def traceroute_scan_route():
    data = request.json
    ip_address = data.get('ip')
    if not ip_address:
        return jsonify({"error": "IP address is required"}), 400
    result = traceroute_scan(ip_address)
    return jsonify({"ip": ip_address, "traceroute_results": result})
