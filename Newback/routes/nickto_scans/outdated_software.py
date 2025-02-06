import subprocess
from flask import Blueprint, request, jsonify

nikto_outdated_bp = Blueprint("nikto_outdated_software", __name__)

@nikto_outdated_bp.route('/nikto/outdated_software_scan', methods=['POST'])
def outdated_software_scan():
    data = request.json
    target = data.get("target")

    if not target:
        return jsonify({"error": "Target is required"}), 400

    try:
        # Run Nikto with normal scan and extract outdated software info
        result = subprocess.run(["nikto", "-h", target], capture_output=True, text=True)
        raw_output = result.stdout

        # Extract lines related to outdated software
        outdated_lines = [
            line for line in raw_output.split("\n") if "outdated" in line.lower() or "vulnerable" in line.lower()
        ]
        outdated_summary = "\n".join(outdated_lines) if outdated_lines else "No outdated software detected."

        return jsonify({"scan_result": outdated_summary})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
