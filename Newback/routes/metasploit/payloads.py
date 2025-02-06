import requests
from flask import Blueprint, request, jsonify

payloads_bp = Blueprint("payloads", __name__)

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

@payloads_bp.route("/metasploit/payloads", methods=["GET"])
def list_payloads():
    """Fetch available Metasploit payloads."""
    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 500

    response = requests.get(f"{MSF_RPC_URL}module/list/payloads", json={"token": token})
    return jsonify(response.json())

@payloads_bp.route("/metasploit/payloads/execute", methods=["POST"])
def execute_payload():
    """Execute a payload with given options."""
    data = request.json
    payload_name = data.get("payload")
    options = data.get("options", {})

    if not payload_name:
        return jsonify({"error": "Payload name is required"}), 400

    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 500

    payload_data = {
        "token": token,
        "module": payload_name,
        "options": options
    }

    response = requests.post(f"{MSF_RPC_URL}module.execute", json=payload_data)
    return jsonify(response.json())
