import subprocess
from flask import Blueprint, request, jsonify

basic_scan = Blueprint("basic_scan", __name__)

@basic_scan.route("/basic_scan", methods=["POST"])
def sqlmap_basic_scan():
    """Run a basic SQL injection scan using SQLMap"""
    data = request.json
    target_url = data.get("target_url")

    if not target_url:
        return jsonify({"error": "Target URL is required"}), 400

    try:
        # Run SQLMap with basic options
        command = ["sqlmap", "-u", target_url, "--batch", "--crawl=1", "--risk=1", "--level=1"]
        result = subprocess.run(command, capture_output=True, text=True)

        return jsonify({"output": result.stdout})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
