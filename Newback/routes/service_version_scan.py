from flask import Blueprint, request, jsonify
import nmap

service_scan_bp = Blueprint('service_scan', __name__)

def scan_service_versions(ip):
    try:
        nm = nmap.PortScanner()
        nm.scan(ip, arguments='-sV')  # Service version detection
        services = {}
        for proto in nm[ip].all_protocols():
            ports = nm[ip][proto].keys()
            for port in ports:
                service = nm[ip][proto][port].get('name', 'unknown')
                version = nm[ip][proto][port].get('version', 'unknown')
                services[port] = f"{service} {version}"
        return services
    except Exception as e:
        return f"Error: {e}"

@service_scan_bp.route('/scan_services', methods=['POST'])
def service_version_scan():
    data = request.json
    ip_address = data.get('ip')
    if not ip_address:
        return jsonify({"error": "IP address is required"}), 400
    result = scan_service_versions(ip_address)
    return jsonify({"ip": ip_address, "services": result})
