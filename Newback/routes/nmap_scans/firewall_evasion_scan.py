from flask import Blueprint, request, jsonify
import nmap
from models.user import FirewallScanCollection

firewall_scan_bp = Blueprint('firewall_scan', __name__)

def firewall_bypass_scan(ip):
    try:
        nm = nmap.PortScanner()
        nm.scan(ip, arguments='-f -D RND:10') 
        result = nm[ip]
        
        return result
        
    except Exception as e:
        print(f"Error: {e}") 
        return {"error": str(e)}

@firewall_scan_bp.route('/scan_firewall', methods=['POST'])
def firewall_scan():
    data = request.json
    ip_address = data.get('ip')

    if not ip_address:
        return jsonify({"error": "IP address is required"}), 400
    
    print(f"Starting firewall bypass scan for {ip_address}")
    result = firewall_bypass_scan(ip_address)

    if "error" in result:
        return jsonify({"error": result["error"]}), 500 
    
    try:
        FirewallScanCollection.save_scan(ip_address, result)
    except Exception as e:
        print(f"Database Error: {e}") 
        return jsonify({"error": "Failed to save scan to database"}), 500

    return jsonify({"ip": ip_address, "firewall_scan_results": result})
