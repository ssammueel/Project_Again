from flask import Blueprint, request, jsonify
import nmap
from models.user import AggressiveScanCollection  # Import the new model

aggressive_scan_bp = Blueprint('aggressive_scan', __name__)

def aggressive_scan(ip):
    try:
        nm = nmap.PortScanner()
        nm.scan(ip, arguments='-A')  # Aggressive scan mode
        result = nm[ip]
        print(f"Aggressive scan results for {ip}:\n{result}")  # Print to terminal
        return result
    except Exception as e:
        print(f"Error: {e}")  # Print error
        return {"error": str(e)}

@aggressive_scan_bp.route('/scan_aggressive', methods=['POST'])
def aggressive_scan_route():
    data = request.json
    ip_address = data.get('ip')

    if not ip_address:
        return jsonify({"error": "IP address is required"}), 400
    
    print(f"Starting aggressive scan for {ip_address}")
    result = aggressive_scan(ip_address)

    if "error" in result:
        return jsonify({"error": result["error"]}), 500  # Return error response

    try:
        AggressiveScanCollection.save_scan(ip_address, result)
    except Exception as e:
        print(f"Database Error: {e}")
        return jsonify({"error": "Failed to save scan to database"}), 500

    return jsonify({"ip": ip_address, "scan_results": result})
