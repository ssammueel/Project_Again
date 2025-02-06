from flask import Blueprint, request, jsonify
import subprocess

general_scan_bp = Blueprint('general_scan', __name__)

@general_scan_bp.route('/nikto/general_scan', methods=['POST'])
def general_scan():
    data = request.json
    target = data.get('target')

    if not target:
        return jsonify({"error": "Target URL/IP is required"}), 400

    try:
        # Run Nikto scan
        command = f"nikto -h {target}"
        process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = process.communicate()

        if error:
            return jsonify({"error": error.decode()}), 500

        return jsonify({"target": target, "scan_result": output.decode()})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
