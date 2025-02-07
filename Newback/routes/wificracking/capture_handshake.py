import subprocess
import os
from flask import Blueprint, jsonify, request

capture_handshake = Blueprint("capture_handshake", __name__)

@capture_handshake.route("/capture_handshake", methods=["POST"])
def capture():
    """Capture WPA/WPA2 handshake"""
    data = request.json
    interface = data.get("interface")  # Monitor mode interface
    bssid = data.get("bssid")  # Target BSSID
    channel = data.get("channel")  # Wi-Fi Channel

    if not interface or not bssid or not channel:
        return jsonify({"error": "Interface, BSSID, and channel are required"}), 400

    try:
        output_path = f"/tmp/handshake_{bssid}.cap"

        # Set interface to correct channel
        subprocess.run(["iwconfig", interface, "channel", str(channel)], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        # Start airodump-ng to capture handshake
        airodump_cmd = [
            "airodump-ng",
            "--bssid", bssid,
            "-c", str(channel),
            "--output-format", "pcap",
            "-w", output_path,
            interface
        ]
        subprocess.Popen(airodump_cmd)

        return jsonify({"message": "Capturing handshake, wait for a client to connect", "file": output_path})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

