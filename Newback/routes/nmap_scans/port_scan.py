from flask import Blueprint, request, jsonify
import nmap

scan_bp = Blueprint('scan', __name__)

@scan_bp.route('/scan', methods=['POST'])
def scan_ports():
    data = request.get_json()
    ip = data.get('ip')
    start_port = data.get('startPort')
    end_port = data.get('endPort')

    if not ip or not start_port or not end_port:
        return jsonify({'error': 'Invalid input. IP, startPort, and endPort are required.'}), 400

    try:
        nm = nmap.PortScanner()
        port_range = f"{start_port}-{end_port}"
        print(f"Scanning {ip} on ports {port_range}...")  # Debug log

        # Run the Nmap scan
        scan_result = nm.scan(ip, arguments=f'-p {port_range}')
        print("Scan result:", scan_result)  # Debug log

        open_ports = []
        for host in nm.all_hosts():
            print(f"Host: {host} ({nm[host].state()})")  # Debug log
            for proto in nm[host].all_protocols():
                ports = nm[host][proto].keys()
                for port in ports:
                    print(f"Port {port}: {nm[host][proto][port]['state']}")  # Debug log
                    if nm[host][proto][port]['state'] == 'open':
                        open_ports.append(port)

        return jsonify({'openPorts': open_ports}), 200

    except nmap.PortScannerError as e:
        print(f"Nmap error: {str(e)}")  # Debug log
        return jsonify({'error': f'Nmap error: {str(e)}'}), 500
    except Exception as e:
        print(f"Unexpected error: {str(e)}")  # Debug log
        return jsonify({'error': f'An unexpected error occurred: {str(e)}'}), 500