from flask import Blueprint, jsonify, request
from pymongo import DESCENDING
from datetime import datetime, timedelta
from bson import ObjectId
from models.user import outdated_software_nikto_collection as outdated_software_collection

fetch_outdated_software_bp = Blueprint("fetch_outdated_software", __name__)

@fetch_outdated_software_bp.route("/nikto/outdated_software_scans", methods=["GET"])
def get_outdated_scans():
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

        total = outdated_software_collection.count_documents(query)
        scans = list(outdated_software_collection.find(query)
                    .sort("timestamp", DESCENDING)
                    .skip((page - 1) * per_page)
                    .limit(per_page))

        for scan in scans:
            scan["_id"] = str(scan["_id"])
            if isinstance(scan.get("timestamp"), datetime):
                scan["timestamp"] = scan["timestamp"].isoformat()

        return jsonify({
            "scans": scans,
            "total": total,
            "page": page,
            "per_page": per_page
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetch_outdated_software_bp.route("/nikto/outdated_software_scans/<scan_id>", methods=["DELETE"])
def delete_outdated_scan(scan_id):
    try:
        result = outdated_software_collection.delete_one({"_id": ObjectId(scan_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Scan not found"}), 404
        return jsonify({"message": "Scan deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetch_outdated_software_bp.route("/nikto/outdated_software_scans/bulk_delete", methods=["DELETE"])
def bulk_delete_outdated_scans():
    try:
        data = request.get_json()
        if not data or 'scan_ids' not in data:
            return jsonify({"error": "Missing scan_ids in request body"}), 400

        object_ids = [ObjectId(scan_id) for scan_id in data['scan_ids']]
        result = outdated_software_collection.delete_many({"_id": {"$in": object_ids}})
        
        return jsonify({
            "message": f"{result.deleted_count} scans deleted successfully",
            "deleted_count": result.deleted_count
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetch_outdated_software_bp.route("/nikto/outdated_software_scans/unique_targets", methods=["GET"])
def get_unique_outdated_targets():
    try:
        pipeline = [
            {"$group": {"_id": "$target"}},
            {"$sort": {"_id": 1}}
        ]
        unique_targets = [doc["_id"] for doc in outdated_software_collection.aggregate(pipeline)]
        return jsonify(unique_targets), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500