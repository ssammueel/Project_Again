from flask import Blueprint, jsonify
from models.user import header_nikto_collection  # Import the correct collection

header_fetch_bp = Blueprint("header_fetch", __name__)

@header_fetch_bp.route("/nikto/header_scans", methods=["GET"])
def fetch_header_scans():
    try:
        scans = list(header_nikto_collection.find({}, {"_id": 1, "target": 1, "scan_result": 1, "timestamp": 1}))

        # Convert ObjectId to string for JSON serialization
        for scan in scans:
            scan["_id"] = str(scan["_id"])
            scan["timestamp"] = scan["timestamp"].isoformat()

        return jsonify(scans)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
