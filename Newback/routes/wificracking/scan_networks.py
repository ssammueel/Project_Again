import subprocess
from flask import Blueprint, jsonify, request

scan_networks = Blueprint("scan_networks", __name__)

@scan_networks.route("/scan_networks", methods=["POST"])
def wifi_scan():
    """Scan for available Wi-Fi networks"""
    data = request.json
    interface = data.get("interface")  # User selects Wi-Fi adapter

    if not interface:
        return jsonify({"error": "Wi-Fi interface is required"}), 400

    try:
        # Run airodump-ng to scan for networks
        command = ["airodump-ng", interface, "--output-format", "csv", "-w", "/tmp/wifi_scan"]
        subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        # Parse scan results from CSV file
        networks = parse_scan_results("/tmp/wifi_scan-01.csv")

        return jsonify({"networks": networks})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def parse_scan_results(file_path):
    """Extracts Wi-Fi networks from airodump-ng CSV output"""
    networks = []
    try:
        with open(file_path, "r") as file:
            lines = file.readlines()

            for line in lines[2:]:  # Skip headers
                parts = line.strip().split(",")
                if len(parts) > 5:
                    networks.append({
                        "bssid": parts[0].strip(),
                        "power": parts[8].strip(),
                        "channel": parts[3].strip(),
                        "encryption": parts[5].strip(),
                        "essid": parts[13].strip(),
                    })
    except FileNotFoundError:
        return [{"error": "Scan file not found. Make sure your Wi-Fi adapter is in monitor mode."}]
    
    return networks
