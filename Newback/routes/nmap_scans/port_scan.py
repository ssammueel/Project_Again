from flask import Blueprint, request, jsonify
import nmap
from models.user import ScanCollection  # Correct import

scan_bp = Blueprint('scan', __name__)

@scan_bp.route('/scan', methods=['POST'])
def scan_ports():
    data = request.get_json()

    ip = data.get('ip')
    start_port = data.get('startPort')
    end_port = data.get('endPort')

    if not ip or not start_port or not end_port:
        return jsonify({'message':"Please fill all the fields"})
        

    try:
        nm = nmap.PortScanner()
        port_range = f"{start_port}-{end_port}"
        print(f"Scanning {ip} on ports {port_range}...")

        scan_result = nm.scan(ip, arguments=f'-p {port_range}')
        print("Scan result:", scan_result)

        open_ports = []
        for host in nm.all_hosts():
            print(f"Host: {host} ({nm[host].state()})")
            for proto in nm[host].all_protocols():
                ports = nm[host][proto].keys()
                for port in ports:
                    print(f"Port {port}: {nm[host][proto][port]['state']}")
                    if nm[host][proto][port]['state'] == 'open':
                        open_ports.append(port)

        # Save scan result in database
        ScanCollection.save_scan(ip, start_port, end_port, open_ports)

        return jsonify({'openPorts': open_ports}), 200

    except nmap.PortScannerError as e:
        print(f"Nmap error: {str(e)}")  # Debug log
        return jsonify({'error': f'Nmap error: {str(e)}'}), 500
    except Exception as e:
        print(f"Unexpected error: {str(e)}")  # Debug log
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500

@scan_bp.route("/scans/<date>", methods=["GET"])  # Fix route definition
def get_scans(date):
    scans = ScanCollection.get_scans_by_date(date)
    return jsonify(scans)
