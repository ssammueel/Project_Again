import subprocess
import os
from flask import Blueprint, request, jsonify

custom_bruteforce = Blueprint("custom_bruteforce", __name__)

@custom_bruteforce.route("/custom_bruteforce", methods=["POST"])
def custom_attack():
    """Run a custom bruteforce attack using Hydra"""
    data = request.json
    target = data.get("target")
    port = data.get("port")
    protocol = data.get("protocol")
    username_list = data.get("username_list")
    password_list = data.get("password_list")
    extra_options = data.get("extra_options", "")

    if not target or not port or not protocol or not username_list or not password_list:
        return jsonify({"error": "Target, port, protocol, username list, and password list are required"}), 400

    if not os.path.exists(username_list) or not os.path.exists(password_list):
        return jsonify({"error": "Username or password file does not exist"}), 400

    try:
        # Construct the Hydra command
        command = [
            "hydra", "-L", username_list, "-P", password_list,
            f"{target}:{port}", protocol
        ]
        
        if extra_options:
            command += extra_options.split()  # Add extra options if provided
        
        result = subprocess.run(command, capture_output=True, text=True)

        return jsonify({"output": result.stdout})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
