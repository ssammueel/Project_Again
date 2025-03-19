from datetime import datetime
from flask import Blueprint, request, jsonify
import nmap
import json
from models.user import syn_scans_collection

syn_scan_bp = Blueprint('syn_scan', __name__)

def syn_scan(ip):
    try:
        nm = nmap.PortScanner()
        nm.scan(ip, arguments='-sS -O')

        if ip not in nm.all_hosts():
            return {"error": "Host not found"}

        
        scan_data = {
            "addresses": nm[ip].get("addresses", {}),
            "vendor": nm[ip].get("vendor", {}),
            "status": nm[ip].get("status", {}),
            "uptime": nm[ip].get("uptime", {}),
            "tcp": nm[ip].get("tcp", {}),
            "portused": nm[ip].get("portused", []),
            "osmatch": nm[ip].get("osmatch", []),
            "osclass": nm[ip].get("osclass", [])
        }

        return scan_data

    except Exception as e:
        return {"error": str(e)}

@syn_scan_bp.route('/scan_syn', methods=['POST'])
def syn_scan_route():
    data = request.get_json()
    ip_address = data.get('ip')

    if not ip_address:
        return jsonify({"error": "IP address is required"}), 400

    scan_result = syn_scan(ip_address)

    if "error" in scan_result:
        return jsonify({"error": scan_result["error"]}), 500

    scan_result_str_keys = json.loads(json.dumps(scan_result))

    syn_scans_collection.insert_one({
        "ip": ip_address,
        "timestamp": datetime.utcnow(),
        "scan_results": scan_result_str_keys
    })

    return jsonify({
        "ip": ip_address,
        "syn_scan_results": scan_result_str_keys  # Send full scan details
    }), 200
