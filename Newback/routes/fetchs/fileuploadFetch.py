from flask import Blueprint, jsonify, request
from pymongo import DESCENDING
from datetime import datetime, timedelta
from bson import ObjectId
from models.user import file_upload_nikto_collection

fetch_scan_bp = Blueprint("fetch_file_scan", __name__)

@fetch_scan_bp.route("/api/file_upload_scans", methods=["GET"])
def get_file_upload_scans():
    try:
        target = request.args.get("target")
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))

        query = {}
        if target:
            query["target"] = {"$regex": target, "$options": "i"}

        days = request.args.get("days")
        if days and days.isdigit():
            days = int(days)
            start_date = datetime.utcnow() - timedelta(days=days)
            query["timestamp"] = {"$gte": start_date}

        total = file_upload_nikto_collection.count_documents(query)
        scans = list(file_upload_nikto_collection.find(query)
                    .sort("timestamp", DESCENDING)
                    .skip((page - 1) * per_page)
                    .limit(per_page))

        for scan in scans:
            scan["_id"] = str(scan["_id"])
            # Convert timestamp to ISO format only if it's a datetime object
            if isinstance(scan["timestamp"], datetime):
                scan["timestamp"] = scan["timestamp"].isoformat()
            elif isinstance(scan["timestamp"], str):
                # If it's already a string, leave it as is
                pass
            else:
                # Handle other cases if needed
                scan["timestamp"] = str(scan["timestamp"])

        return jsonify({
            "scans": scans,
            "total": total,
            "page": page,
            "per_page": per_page
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@fetch_scan_bp.route("/api/file_upload_scans/<scan_id>", methods=["DELETE"])
def delete_file_upload_scan(scan_id):
    try:
        result = file_upload_nikto_collection.delete_one({"_id": ObjectId(scan_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Scan not found"}), 404
        return jsonify({"message": "Scan deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetch_scan_bp.route("/api/file_upload_scans/bulk_delete", methods=["DELETE"])
def bulk_delete_file_upload_scans():
    try:
        data = request.get_json()
        if not data or 'scan_ids' not in data:
            return jsonify({"error": "Missing scan_ids in request body"}), 400

        object_ids = [ObjectId(scan_id) for scan_id in data['scan_ids']]
        result = file_upload_nikto_collection.delete_many({"_id": {"$in": object_ids}})
        
        return jsonify({
            "message": f"{result.deleted_count} scans deleted successfully",
            "deleted_count": result.deleted_count
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetch_scan_bp.route("/api/file_upload_scans/unique_targets", methods=["GET"])
def get_unique_targets():
    try:
        pipeline = [
            {"$group": {"_id": "$target"}},
            {"$sort": {"_id": 1}}
        ]
        unique_targets = [doc["_id"] for doc in file_upload_nikto_collection.aggregate(pipeline)]
        return jsonify(unique_targets), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500