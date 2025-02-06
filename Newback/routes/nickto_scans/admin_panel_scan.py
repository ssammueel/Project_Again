import subprocess
from flask import Blueprint, request, jsonify

admin_panel_bp = Blueprint("admin_panel_scan", __name__)

@admin_panel_scan.route("/nikto/admin_panel_scan", methods=["POST"])
def run_admin_panel_scan():
    data = request.json
    target = data.get("target")

    if not target:
        return jsonify({"error": "Target is required"}), 400

    try:
        # Run Nikto with options to scan for admin panels
        result = subprocess.run(
            ["nikto", "-h", target, "-Tuning", "3"],  # '3' targets admin panels
            capture_output=True, text=True
        )
        raw_output = result.stdout

        return jsonify({"scan_result": raw_output})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
