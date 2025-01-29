from flask import Blueprint, request, jsonify
import nmap

subnet_scan_bp = Blueprint('subnet_scan', __name__)

def scan_subnet(ip):
    try:
        nm = nmap.PortScanner()
        nm.scan(ip, arguments='-sn')  # Ping scan to detect live hosts
        live_hosts = nm.all_hosts()
        return live_hosts
    except Exception as e:
        return f"Error: {e}"

@subnet_scan_bp.route('/scan_subnet', methods=['POST'])
def subnet_scan():
    data = request.json
    subnet = data.get('subnet')
    if not subnet:
        return jsonify({"error": "Subnet is required"}), 400
    result = scan_subnet(subnet)
    return jsonify({"subnet": subnet, "live_hosts": result})
