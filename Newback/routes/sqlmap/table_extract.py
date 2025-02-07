import subprocess
from flask import Blueprint, request, jsonify

table_extract = Blueprint("table_extract", __name__)

@table_extract.route("/table_extract", methods=["POST"])
def sqlmap_table_extract():
    """Run SQLMap to extract table names from a database"""
    data = request.json
    target_url = data.get("target_url")
    db_name = data.get("db_name")

    if not target_url or not db_name:
        return jsonify({"error": "Target URL and Database Name are required"}), 400

    try:
        # SQLMap command to enumerate tables in a given database
        command = ["sqlmap", "-u", target_url, "--batch", "-D", db_name, "--tables"]
        result = subprocess.run(command, capture_output=True, text=True)

        return jsonify({"output": result.stdout})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
