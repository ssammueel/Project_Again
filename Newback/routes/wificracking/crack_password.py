import subprocess
import os
from flask import Blueprint, jsonify, request

crack_password = Blueprint("crack_password", __name__)

@crack_password.route("/crack_password", methods=["POST"])
def crack():
    """Crack Wi-Fi password using Aircrack-ng"""
    data = request.json
    handshake_file = data.get("handshake_file")  # Path to the .cap file
    wordlist = data.get("wordlist")  # Path to the wordlist file

    if not handshake_file or not wordlist:
        return jsonify({"error": "Handshake file and wordlist are required"}), 400

    if not os.path.exists(handshake_file):
        return jsonify({"error": f"Handshake file not found: {handshake_file}"}), 400

    if not os.path.exists(wordlist):
        return jsonify({"error": f"Wordlist file not found: {wordlist}"}), 400

    try:
        # Run Aircrack-ng to crack the Wi-Fi password
        crack_cmd = [
            "aircrack-ng",
            "-w", wordlist,
            "-b", handshake_file
        ]
        result = subprocess.run(crack_cmd, capture_output=True, text=True)

        # Extract password from the result
        output = result.stdout
        password_line = next((line for line in output.split("\n") if "KEY FOUND" in line), None)
        password = password_line.split(":")[-1].strip() if password_line else "Password not found"

        return jsonify({"message": "Cracking complete", "password": password})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
