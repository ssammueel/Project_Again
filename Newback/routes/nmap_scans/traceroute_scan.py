from flask import Blueprint, request, jsonify
import nmap
from models.user import TracerouteCollection

traceroute_scan_bp = Blueprint('traceroute_scan', __name__)

def traceroute_scan(ip):
    try:
        nm = nmap.PortScanner()
        nm.scan(ip, arguments='--traceroute')
        result = nm[ip]
        print(f"Traceroute results for {ip}:\n{result}")  # Print results to terminal
        return result
    except Exception as e:
        print(f"Error: {e}")  # Print error to terminal
        return {"error": str(e)}

@traceroute_scan_bp.route('/scan_traceroute', methods=['POST'])
def traceroute_scan_route():
    data = request.json
    ip_address = data.get('ip')
    
    if not ip_address:
        print("Error: IP address is required")  # Debug message
        return jsonify({"error": "IP address is required"}), 400
    
    print(f"Starting traceroute scan for {ip_address}")
    result = traceroute_scan(ip_address)

    if "error" in result:
        return jsonify({"error": result["error"]}), 500  # Return error response

    try:
        TracerouteCollection.save_scan(ip_address, result)
    except Exception as e:
        print(f"Database Error: {e}")  # Print DB error
        return jsonify({"error": "Failed to save scan to database"}), 500

    return jsonify({"ip": ip_address, "traceroute_results": result})
