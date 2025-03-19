import subprocess
from flask import Blueprint, request, jsonify
from datetime import datetime
from models.user import file_upload_nikto_collection  # Import the correct collection

upload_scan_bp = Blueprint("file_upload_scan", __name__)

@upload_scan_bp.route("/nikto/file_upload_scan", methods=["POST"])
def run_file_upload_scan():
    data = request.json
    target = data.get("target")

    if not target:
        return jsonify({"error": "Target is required"}), 400

    try:
        # Run Nikto scan for file upload vulnerabilities
        result = subprocess.run(
            ["nikto", "-h", target, "-Tuning", "4"],  # '4' targets file upload issues
            capture_output=True, text=True
        )
        raw_output = result.stdout.strip()  # Remove leading/trailing spaces

        # Ensure data is JSON serializable
        scan_data = {
            "target": target,
            "scan_result": raw_output,
            "timestamp": datetime.utcnow().isoformat()  # Convert datetime to a string
        }
        file_upload_nikto_collection.insert_one(scan_data)

        return jsonify({"message": "Scan saved successfully", "target": target, "scan_result": raw_output})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
