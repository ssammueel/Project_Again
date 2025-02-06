import subprocess
from flask import Blueprint, request, jsonify

nickto_custom_bp = Blueprint("custom_scan", __name__)

@nickto_custom_bp.route("/nikto/custom_scan", methods=["POST"])
def run_custom_scan():
    data = request.json
    target = data.get("target")
    options = data.get("options", "")  # Custom options

    if not target:
        return jsonify({"error": "Target is required"}), 400

    try:
        # Construct the Nikto command
        command = ["nikto", "-h", target]
        
        # If custom options exist, split and add them
        if options:
            command.extend(options.split())

        # Run Nikto with custom options
        result = subprocess.run(command, capture_output=True, text=True)
        raw_output = result.stdout

        return jsonify({"scan_result": raw_output})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
