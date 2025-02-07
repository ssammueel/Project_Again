import requests
from flask import Blueprint, request, jsonify

auxiliary_bp = Blueprint("auxiliary", __name__)

# MSF RPC Configurations
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

@auxiliary_bp.route("/metasploit/auxiliary", methods=["GET"])
def list_auxiliary():
    """Fetch available auxiliary modules."""
    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 500

    response = requests.get(f"{MSF_RPC_URL}module/list/auxiliary", json={"token": token})
    return jsonify(response.json())

@auxiliary_bp.route("/metasploit/auxiliary/execute", methods=["POST"])
def execute_auxiliary():
    """Run an auxiliary scan with given options."""
    data = request.json
    module_name = data.get("module")
    options = data.get("options", {})

    if not module_name:
        return jsonify({"error": "Module name is required"}), 400

    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 500

    module_data = {
        "token": token,
        "module": module_name,
        "options": options
    }

    response = requests.post(f"{MSF_RPC_URL}module.execute", json=module_data)
    return jsonify(response.json())
