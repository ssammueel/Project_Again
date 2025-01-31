import subprocess
from flask import Blueprint, request, jsonify

nikto_bp = Blueprint('nikto_scan', __name__)

@nikto_bp.route('/nikto_scan', methods=['POST'])
def nikto_scan():
    data = request.json
    target_url = data.get("url")

    if not target_url:
        return jsonify({"error": "Target URL is required"}), 400

    try:
        # Execute Nikto command
        cmd = ["nikto", "-h", target_url]
        result = subprocess.run(cmd, capture_output=True, text=True)

        return jsonify({"output": result.stdout})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
