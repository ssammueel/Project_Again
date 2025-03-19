import subprocess
from flask import Blueprint, request, jsonify
from datetime import datetime
from models.user import header_nikto_collection  # Import the correct collection

nikto_header_bp = Blueprint("nikto_header_scan", __name__)

@nikto_header_bp.route('/nikto/header_scan', methods=['POST'])
def header_scan():
    data = request.json
    target = data.get("target")

    if not target:
        return jsonify({"error": "Target is required"}), 400

    try:
        # Run Nikto scan focusing on headers
        result = subprocess.run(["nikto", "-h", target, "-T", "2"], capture_output=True, text=True)
        scan_result = result.stdout

        # Store in MongoDB
        scan_data = {
            "target": target,
            "scan_result": scan_result,
            "timestamp": datetime.utcnow()
        }
        header_nikto_collection.insert_one(scan_data)

        return jsonify({"target": target, "scan_result": scan_result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
