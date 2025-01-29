from flask import Blueprint, request, jsonify
import nmap

aggressive_scan_bp = Blueprint('aggressive_scan', __name__)

def aggressive_scan(ip):
    try:
        nm = nmap.PortScanner()
        nm.scan(ip, arguments='-A')  # Aggressive scan mode
        return nm[ip]
    except Exception as e:
        return f"Error: {e}"

@aggressive_scan_bp.route('/scan_aggressive', methods=['POST'])
def aggressive_scan_route():
    data = request.json
    ip_address = data.get('ip')
    if not ip_address:
        return jsonify({"error": "IP address is required"}), 400
    result = aggressive_scan(ip_address)
    return jsonify({"ip": ip_address, "scan_results": result})
