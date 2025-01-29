# routes/payload_generator.py
from flask import Blueprint, request, jsonify

payload_gen_bp = Blueprint('payload_gen', __name__)

@payload_gen_bp.route('/generate_payload', methods=['POST'])
def generate_payload():
    data = request.json
    target_ip = data.get("ip")
    port = data.get("port")

    if not target_ip or not port:
        return jsonify({"error": "IP and port are required"}), 400
    
    # Basic payload example (for demonstration)
    payload = f"reverse_shell_payload_for {target_ip}:{port}"
    return jsonify({"payload": payload})
