import subprocess
import shlex
from flask import Blueprint, request, jsonify

nkt_custom_bp = Blueprint("nkt_custom_scan", __name__)

@nkt_custom_bp.route("/nikto/nkt_custom", methods=["POST"])
def run_custom_scan():
    data = request.json
    target = data.get("target")
    options = data.get("options", "").strip()  # Trim spaces

    if not target:
        return jsonify({"error": "Target is required"}), 400

    try:
        # Construct the Nikto command securely
        command = ["nikto", "-h", target]

        if options:
            try:
                command.extend(shlex.split(options))  # Securely parse options
            except ValueError:
                return jsonify({"error": "Invalid options format"}), 400

        # Run the command with a timeout
        result = subprocess.run(command, capture_output=True, text=True, timeout=300)
        raw_output = result.stdout.strip()

        if result.returncode != 0:
            return jsonify({"error": result.stderr.strip()}), 500

        return jsonify({"target": target, "scan_result": raw_output})

    except FileNotFoundError:
        return jsonify({"error": "Nikto is not installed or not found"}), 500
    except subprocess.TimeoutExpired:
        return jsonify({"error": "Scan timed out"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500
