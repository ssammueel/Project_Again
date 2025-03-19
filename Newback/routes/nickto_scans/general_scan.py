from flask import Blueprint, request, jsonify
import subprocess
from datetime import datetime
from models.user import nikto_scans_collection  # Import correct MongoDB model

general_scan_bp = Blueprint('general_scan', __name__)

@general_scan_bp.route('/nikto/general_scan', methods=['POST'])
def general_scan():
    data = request.json
    target = data.get('target')

    if not target:
        return jsonify({"error": "Target URL/IP is required"}), 400

    try:
        # Run Nikto scan
        command = f"nikto -h {target}"
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = process.communicate()

        if error and error.decode().strip():
            return jsonify({"error": error.decode()}), 500

        scan_result = output.decode()

        # Structure the scan data properly
        scan_data = {
            "target": target,
            "scan_result": scan_result,
            "timestamp": datetime.utcnow()  # Store timestamp in UTC
        }

        # Insert into MongoDB and get the inserted ID
        inserted_doc = nikto_scans_collection.insert_one(scan_data)
        scan_data["_id"] = str(inserted_doc.inserted_id)  # Convert ObjectId to string

        return jsonify(scan_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
