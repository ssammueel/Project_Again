from flask import Blueprint, jsonify, request
from models.user import file_upload_nikto_collection  # Import the correct collection
from bson import ObjectId

fetch_scan_bp = Blueprint("fetch_file_scan", __name__)

@fetch_scan_bp.route("/api/file_upload_scans", methods=["GET"])
def get_file_upload_scans():
    try:
        scans = list(file_upload_nikto_collection.find({}, {"_id": 1, "target": 1, "scan_result": 1, "timestamp": 1}))
        
        # Convert ObjectId to string
        for scan in scans:
            scan["_id"] = str(scan["_id"])
        
        return jsonify(scans)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetch_scan_bp.route("/api/file_upload_scans/<scan_id>", methods=["DELETE"])
def delete_file_upload_scan(scan_id):
    try:
        result = file_upload_nikto_collection.delete_one({"_id": ObjectId(scan_id)})
        if result.deleted_count == 1:
            return jsonify({"message": "Scan deleted successfully"})
        else:
            return jsonify({"error": "Scan not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
