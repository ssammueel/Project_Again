import subprocess
from flask import Blueprint, request, jsonify

db_enum = Blueprint("db_enum", __name__)

@db_enum.route("/db_enum", methods=["POST"])
def sqlmap_db_enum():
    """Run a database enumeration scan using SQLMap"""
    data = request.json
    target_url = data.get("target_url")

    if not target_url:
        return jsonify({"error": "Target URL is required"}), 400

    try:
        # SQLMap command to enumerate database names
        command = ["sqlmap", "-u", target_url, "--batch", "--dbs"]
        result = subprocess.run(command, capture_output=True, text=True)

        return jsonify({"output": result.stdout})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
