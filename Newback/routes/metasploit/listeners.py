import requests
from flask import Blueprint, request, jsonify

listeners_bp = Blueprint("listener_bp", __name__)

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

@listeners_bp.route("/metasploit/listener", methods=["GET"])
def list_listeners():
    """Fetch active listeners."""
    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 500

    response = requests.get(f"{MSF_RPC_URL}job/list", json={"token": token})
    return jsonify(response.json())

@listeners_bp.route("/metasploit/listener/start", methods=["POST"])
def start_listener():
    """Start a new listener."""
    data = request.json
    payload = data.get("payload")
    lhost = data.get("lhost")
    lport = data.get("lport")

    if not payload or not lhost or not lport:
        return jsonify({"error": "Payload, LHOST, and LPORT are required"}), 400

    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 500

    payload_data = {
        "token": token,
        "module": "exploit/multi/handler",
        "options": {
            "PAYLOAD": payload,
            "LHOST": lhost,
            "LPORT": lport,
            "ExitOnSession": False
        }
    }

    response = requests.post(f"{MSF_RPC_URL}module.execute", json=payload_data)
    return jsonify(response.json())

@listeners_bp.route("/metasploit/listener/stop", methods=["POST"])
def stop_listener():
    """Stop a listener by job ID."""
    data = request.json
    job_id = data.get("job_id")

    if not job_id:
        return jsonify({"error": "Job ID is required"}), 400

    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 500

    response = requests.post(f"{MSF_RPC_URL}job.stop", json={"token": token, "job_id": job_id})
    return jsonify(response.json())
