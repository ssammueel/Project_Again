import subprocess
from flask import Blueprint, request, jsonify

ssl_scan_bp = Blueprint("ssl_scan", __name__)

@ssl_scan_bp.route('/ssl/scan', methods=['POST'])
def ssl_scan():
    data = request.json
    target = data.get("target")

    if not target:
        return jsonify({"error": "Target is required"}), 400

    try:
        # Run SSLScan and capture output
        result = subprocess.run(["sslscan", "--no-color", target], capture_output=True, text=True)
        return jsonify({"scan_result": result.stdout})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
