import subprocess
from flask import Blueprint, request, jsonify

custom_sql = Blueprint("custom_sql", __name__)

@custom_sql.route("/custom_sql", methods=["POST"])
def sqlmap_custom_query():
    """Execute custom SQL queries using SQLMap"""
    data = request.json
    target_url = data.get("target_url")
    sql_query = data.get("sql_query")

    if not target_url or not sql_query:
        return jsonify({"error": "Target URL and SQL query are required"}), 400

    try:
        # SQLMap command to execute a custom SQL query
        command = ["sqlmap", "-u", target_url, "--batch", "--sql-query", sql_query]
        result = subprocess.run(command, capture_output=True, text=True)

        return jsonify({"output": result.stdout})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
