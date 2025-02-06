import subprocess
from flask import Blueprint, request, jsonify

nikto_header_bp = Blueprint("nikto_header_scan", __name__)

@nikto_header_bp.route('/nikto/header_scan', methods=['POST'])
def header_scan():
    data = request.json
    target = data.get("target")

    if not target:
        return jsonify({"error": "Target is required"}), 400

    try:
        # Run Nikto with options focused on headers (-T 2 limits testing to headers)
        result = subprocess.run(["nikto", "-h", target, "-T", "2"], capture_output=True, text=True)
        return jsonify({"scan_result": result.stdout})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
