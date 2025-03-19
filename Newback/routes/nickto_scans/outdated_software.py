import subprocess
from flask import Blueprint, request, jsonify
from datetime import datetime
from models.user import outdated_software_nikto_collection  # Import the correct collection

nikto_outdated_bp = Blueprint("nikto_outdated_software", __name__)

@nikto_outdated_bp.route('/nikto/outdated_software_scan', methods=['POST'])
def outdated_software_scan():
    data = request.json
    target = data.get("target")

    if not target:
        return jsonify({"error": "Target is required"}), 400

    try:
        # Run Nikto scan
        result = subprocess.run(["nikto", "-h", target], capture_output=True, text=True)
        raw_output = result.stdout

        # Extract lines related to outdated software
        outdated_lines = [
            line for line in raw_output.split("\n") if "outdated" in line.lower() or "vulnerable" in line.lower()
        ]
        outdated_summary = "\n".join(outdated_lines) if outdated_lines else "No outdated software detected."

        # Store in MongoDB
        scan_data = {
            "target": target,
            "scan_result": outdated_summary,
            "timestamp": datetime.utcnow().isoformat()  # Store timestamp in a serializable format
        }
        outdated_software_nikto_collection.insert_one(scan_data)

        return jsonify({"message": "Scan saved successfully", "scan_result": outdated_summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
