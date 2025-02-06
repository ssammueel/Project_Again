import json
import requests
from flask import Blueprint, request, jsonify

sploit_scanners_bp = Blueprint("scanners", __name__)

# Metasploit RPC API Configuration
MSF_RPC_URL = "http://127.0.0.1:55553/api/"
MSF_RPC_USER = "msf"
MSF_RPC_PASS = "yourpassword"

def authenticate():
    """Authenticate with Metasploit RPC and get the token."""
    response = requests.post(
        f"{MSF_RPC_URL}auth/login",
        json={"username": MSF_RPC_USER, "password": MSF_RPC_PASS}
    )
    return response.json().get("token")

@sploit_scanners_bp.route("/metasploit/scanner", methods=["POST"])
def run_scanner():
    data = request.json
    module = data.get("module")
    target = data.get("target")
    options = data.get("options", {})

    if not module or not target:
        return jsonify({"error": "Module and Target are required"}), 400

    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 500

    # Set target and options
    scanner_data = {
        "token": token,
        "module": module,
        "options": {"RHOSTS": target, **options}
    }

    # Run the scanner
    response = requests.post(f"{MSF_RPC_URL}module.execute", json=scanner_data)
    return jsonify(response.json())
