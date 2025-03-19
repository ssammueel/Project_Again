from flask import Blueprint, request, jsonify
import subprocess
from models.user import CustomScanCollection  # Import model

custom_scan_bp = Blueprint('custom_scan', __name__)

@custom_scan_bp.route('/scan_custom', methods=['POST'])
def custom_scan():
    data = request.json
    command = data.get('command')

    if not command:
        return jsonify({"error": "Command is required"}), 400

    try:
        # Prevent dangerous commands
        forbidden_cmds = ["rm", "shutdown", "reboot", "mkfs", "dd", "format"]
        if any(cmd in command for cmd in forbidden_cmds):
            return jsonify({"error": "Forbidden command detected!"}), 400

        # Execute the Nmap command safely
        process = subprocess.run(["nmap"] + command.split(), capture_output=True, text=True)
        output = process.stdout if process.stdout else process.stderr

        # Save scan results in MongoDB
        CustomScanCollection.save_scan(command, output)

        return jsonify({"command": command, "output": output})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
