from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta
import os
from bson import ObjectId

header_fetch_bp = Blueprint("header_fetch", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
header_nikto_collection = db["HeaderNikto"]

@header_fetch_bp.route("/nikto/header_scans", methods=["GET"])
def fetch_header_scans():
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

        total = header_nikto_collection.count_documents(query)
        scans = list(header_nikto_collection.find(query)
                    .sort("timestamp", DESCENDING)
                    .skip((page - 1) * per_page)
                    .limit(per_page))

        for scan in scans:
            scan["_id"] = str(scan["_id"])
            scan["timestamp"] = scan["timestamp"].isoformat()

        return jsonify({
            "scans": scans,
            "total": total,
            "page": page,
            "per_page": per_page
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@header_fetch_bp.route("/nikto/header_scan/<scan_id>", methods=["DELETE"])
def delete_header_scan(scan_id):
    try:
        result = header_nikto_collection.delete_one({"_id": ObjectId(scan_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Scan not found"}), 404
        return jsonify({"message": "Scan deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@header_fetch_bp.route("/nikto/header_scan/bulk_delete", methods=["DELETE"])
def bulk_delete_header_scans():
    try:
        data = request.get_json()
        if not data or 'scan_ids' not in data:
            return jsonify({"error": "Missing scan_ids in request body"}), 400

        object_ids = [ObjectId(scan_id) for scan_id in data['scan_ids']]
        result = header_nikto_collection.delete_many({"_id": {"$in": object_ids}})
        
        return jsonify({
            "message": f"{result.deleted_count} scans deleted successfully",
            "deleted_count": result.deleted_count
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@header_fetch_bp.route("/nikto/unique_targets", methods=["GET"])
def get_unique_targets():
    try:
        pipeline = [
            {"$group": {"_id": "$target"}},
            {"$sort": {"_id": 1}}
        ]
        unique_targets = [doc["_id"] for doc in header_nikto_collection.aggregate(pipeline)]
        return jsonify(unique_targets), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500