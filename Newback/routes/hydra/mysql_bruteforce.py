import subprocess
import os
from flask import Blueprint, request, jsonify

mysql_bruteforce = Blueprint("mysql_bruteforce", __name__)

@mysql_bruteforce.route("/mysql_bruteforce", methods=["POST"])
def mysql_attack():
    """Run MySQL Bruteforce using Hydra"""
    data = request.json
    target = data.get("target")
    username_list = data.get("username_list")
    password_list = data.get("password_list")

    if not target or not username_list or not password_list:
        return jsonify({"error": "Target, username list, and password list are required"}), 400

    if not os.path.exists(username_list) or not os.path.exists(password_list):
        return jsonify({"error": "Username or password file does not exist"}), 400

    try:
        # Run Hydra command for MySQL
        command = [
            "hydra", "-L", username_list, "-P", password_list,
            target, "mysql"
        ]
        result = subprocess.run(command, capture_output=True, text=True)

        return jsonify({"output": result.stdout})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
