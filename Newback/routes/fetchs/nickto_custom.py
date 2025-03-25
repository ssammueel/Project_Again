from flask import Blueprint, jsonify, request
from models.user import nikto_scans_collection  # Import the correct collection
from bson import ObjectId

custom_nikto_fetch_bp = Blueprint("custom_nikto_fetch", __name__)

# Fetch all general Nikto scans
@custom_nikto_fetch_bp.route("/nikto/general_scans", methods=["GET"])
def fetch_general_scans():
    try:
        scans = list(nikto_scans_collection.find({}, {"_id": 1, "target": 1, "scan_result": 1, "timestamp": 1}))

        # Convert ObjectId to string and format timestamp
        for scan in scans:
            scan["_id"] = str(scan["_id"])
            scan["timestamp"] = scan["timestamp"].isoformat()

        return jsonify(scans)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Delete a scan by ID
@custom_nikto_fetch_bp.route("/nikto/general_scan/<scan_id>", methods=["DELETE"])
def delete_general_scan(scan_id):
    try:
        result = nikto_scans_collection.delete_one({"_id": ObjectId(scan_id)})

        if result.deleted_count == 0:
            return jsonify({"error": "Scan not found"}), 404

        return jsonify({"message": "Scan deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
