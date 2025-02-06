import subprocess
from flask import Blueprint, request, jsonify

upload_scan_bp = Blueprint("file_upload_scan", __name__)

@file_upload_scan.route("/nikto/file_upload_scan", methods=["POST"])
def run_file_upload_scan():
    data = request.json
    target = data.get("target")

    if not target:
        return jsonify({"error": "Target is required"}), 400

    try:
        # Run Nikto with options to scan for file upload vulnerabilities
        result = subprocess.run(
            ["nikto", "-h", target, "-Tuning", "4"],  # '4' targets file upload issues
            capture_output=True, text=True
        )
        raw_output = result.stdout

        return jsonify({"scan_result": raw_output})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
