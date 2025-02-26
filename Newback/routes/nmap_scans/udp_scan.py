from flask import Blueprint, request, jsonify
import nmap
from models.user import ScanCollection

udp_scan_bp = Blueprint('udp_scan', __name__)

def udp_scan(ip):
    try:
        nm = nmap.PortScanner()
        nm.scan(ip, arguments='-sU')
        open_ports = []

        if ip in nm.all_hosts():
            for proto in nm[ip].all_protocols():
                for port, data in nm[ip][proto].items():
                    if data['state'] == 'open':
                        open_ports.append(port)

        return open_ports
    except Exception as e:
        return f"Error: {e}"

@udp_scan_bp.route('/scan_udp', methods=['POST'])
def udp_scan_route():
    data = request.json
    ip_address = data.get('ip')
    if not ip_address:
        return jsonify({"error": "IP address is required"}), 400
    result = udp_scan(ip_address)
    return jsonify({"ip": ip_address, "udp_scan_results": result})

