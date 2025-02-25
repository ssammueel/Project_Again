from flask import Blueprint, request, jsonify
import nmap

# Create a Blueprint for service scanning
service_scan_bp = Blueprint('service_scan', __name__)

def scan_service_versions(ip):
    try:
        nm = nmap.PortScanner()

        # Improved scan options: 
        # -sV (service version detection), -Pn (skip ping), -T4 (aggressive timing), -p- (scan all ports)
        nm.scan(ip, arguments='-sV -Pn -T4 -p-')

        # Check if host is up
        if ip not in nm.all_hosts():
            return {"error": "Host is unreachable or does not exist."}

        services = {}
        for proto in nm[ip].all_protocols():
            ports = nm[ip][proto].keys()
            for port in ports:
                service = nm[ip][proto][port].get('name', 'unknown')
                version = nm[ip][proto][port].get('version', 'unknown')
                services[port] = {
                    "service": service if service else "Unknown",
                    "version": version if version else "Unknown"
                }

        # Debugging output: raw Nmap scan results (remove in production)
        print(nm[ip])

        return services if services else {"message": "No services detected."}
    except Exception as e:
        return {"error": str(e)}

# Define the API route
@service_scan_bp.route('/scan_services', methods=['POST'])
def service_version_scan():
    data = request.json
    ip_address = data.get('ip')

    if not ip_address:
        return jsonify({"error": "IP address is required"}), 400

    result = scan_service_versions(ip_address)
    return jsonify({"ip": ip_address, "services": result})
