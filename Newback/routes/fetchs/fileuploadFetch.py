from flask import Blueprint, jsonify, request
from models.user import file_upload_nikto_collection
from bson import ObjectId
from pymongo import DESCENDING

fetch_scan_bp = Blueprint("fetch_file_scan", __name__)

@fetch_scan_bp.route("/api/file_upload_scans", methods=["GET"])
def get_file_upload_scans():
    try:
        target = request.args.get("target")
        
        query = {}
        if target:
            query["target"] = {"$regex": f"^{target}", "$options": "i"}

        scans = list(file_upload_nikto_collection.find(query).sort("timestamp", DESCENDING))
        
        for scan in scans:
            scan["_id"] = str(scan["_id"])
        
        return jsonify(scans)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetch_scan_bp.route("/api/file_upload_scans/unique_targets", methods=["GET"])
def get_unique_targets():
    try:
        query = request.args.get("query", "")
        regex_pattern = f"^{query}" if query else ""
        
        unique_ips = file_upload_nikto_collection.distinct(
            "target", 
            {"target": {"$regex": regex_pattern, "$options": "i"}}
        )
        return jsonify(unique_ips)
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