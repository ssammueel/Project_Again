import requests
from flask import Blueprint, request, jsonify

msf_rpc_bp = Blueprint("msf_rpc", __name__)

# Metasploit RPC Server Configuration
MSF_RPC_URL = "http://127.0.0.1:55553/api/"
MSF_RPC_USER = "msf"
MSF_RPC_PASS = "yourpassword"

def authenticate():
    """Authenticate with Metasploit RPC and return the session token."""
    response = requests.post(
        f"{MSF_RPC_URL}auth/login",
        json={"username": MSF_RPC_USER, "password": MSF_RPC_PASS}
    )
    return response.json().get("token")

@msf_rpc_bp.route("/metasploit/modules", methods=["GET"])
def list_modules():
    """Fetch available Metasploit modules."""
    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 500

    response = requests.get(f"{MSF_RPC_URL}module/list", json={"token": token})
    return jsonify(response.json())

@msf_rpc_bp.route("/metasploit/execute", methods=["POST"])
def execute_module():
    """Run a specified Metasploit module with options."""
    data = request.json
    module_name = data.get("module")
    options = data.get("options", {})

    if not module_name:
        return jsonify({"error": "Module name is required"}), 400

    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 500

    payload = {
        "token": token,
        "module": module_name,
        "options": options
    }

    response = requests.post(f"{MSF_RPC_URL}module.execute", json=payload)
    return jsonify(response.json())
