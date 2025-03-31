from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta
import os
from bson import ObjectId

fetchAggressive_bp = Blueprint("fetchAggressive", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
aggressive_collection = db["aggressive_scans"]

@fetchAggressive_bp.route('/aggressive_scans', methods=['GET'])
def fetchAggressiveScan():
    try:
        ip = request.args.get("ip")
        days = request.args.get("days")  # Add days parameter
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))

        query = {}
        if ip:
            query["ip"] = {"$regex": ip, "$options": "i"}
        if days and days.isdigit():
            days = int(days)
            start_date = datetime.utcnow() - timedelta(days=days)
            query["scan_date"] = {"$gte": start_date}

        total = aggressive_collection.count_documents(query)
        scans = list(aggressive_collection.find(query)
                    .sort("scan_date", DESCENDING)
                    .skip((page - 1) * per_page)
                    .limit(per_page))

        for scan in scans:
            scan["_id"] = str(scan["_id"])

        return jsonify({
            "scans": scans,
            "total": total,
            "page": page,
            "per_page": per_page
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetchAggressive_bp.route('/aggressive_scans/<scan_id>', methods=['DELETE'])
def delete_aggressive_scan(scan_id):
    try:
        result = aggressive_collection.delete_one({"_id": ObjectId(scan_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Scan not found"}), 404
        return jsonify({"message": "Scan deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetchAggressive_bp.route('/aggressive_scans/bulk_delete', methods=['DELETE'])
def bulk_delete_aggressive_scans():
    try:
        data = request.get_json()
        if not data or 'scan_ids' not in data:
            return jsonify({"error": "Missing scan_ids in request body"}), 400

        object_ids = [ObjectId(scan_id) for scan_id in data['scan_ids']]
        result = aggressive_collection.delete_many({"_id": {"$in": object_ids}})
        
        return jsonify({
            "message": f"{result.deleted_count} scans deleted successfully",
            "deleted_count": result.deleted_count
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetchAggressive_bp.route('/aggressive_unique_ips', methods=['GET'])
def get_aggressive_unique_ips():
    try:
        unique_ips = aggressive_collection.distinct("ip")
        return jsonify(unique_ips), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500