from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta
import os
from bson import ObjectId

fetch_custom_scan_bp = Blueprint('fetch_custom_scan', __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
custom_scans_collection = db["custom_scans"]

@fetch_custom_scan_bp.route('/fetch_custom_scan', methods=['GET'])
def fetch_custom_scan():
    try:
        ip = request.args.get("ip")
        date = request.args.get("date")
        days = request.args.get("days")  # Add days parameter
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))

        query = {}
        if ip:
            query["command"] = {"$regex": ip, "$options": "i"}
        if date:
            try:
                start_date = datetime.strptime(date, "%Y-%m-%d")
                end_date = start_date + timedelta(days=1)
                query["timestamp"] = {"$gte": start_date, "$lt": end_date}
            except ValueError:
                return jsonify({"error": "Invalid date format, use YYYY-MM-DD"}), 400
        if days and days.isdigit():  # Add days filter
            days = int(days)
            start_date = datetime.utcnow() - timedelta(days=days)
            query["timestamp"] = {"$gte": start_date}

        total = custom_scans_collection.count_documents(query)
        scans = list(custom_scans_collection.find(query)
                    .sort("timestamp", DESCENDING)
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
    
@fetch_custom_scan_bp.route('/fetch_custom_scan/<scan_id>', methods=['DELETE'])
def delete_custom_scan(scan_id):
    try:
        result = custom_scans_collection.delete_one({"_id": ObjectId(scan_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Scan not found"}), 404
        return jsonify({"message": "Scan deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetch_custom_scan_bp.route('/fetch_custom_scan/bulk_delete', methods=['DELETE'])
def bulk_delete_custom_scans():
    try:
        data = request.get_json()
        if not data or 'scan_ids' not in data:
            return jsonify({"error": "Missing scan_ids in request body"}), 400

        object_ids = [ObjectId(scan_id) for scan_id in data['scan_ids']]
        result = custom_scans_collection.delete_many({"_id": {"$in": object_ids}})
        
        return jsonify({
            "message": f"{result.deleted_count} scans deleted successfully",
            "deleted_count": result.deleted_count
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetch_custom_scan_bp.route('/custom_unique_ips', methods=['GET'])
def get_custom_unique_ips():
    try:
        # Extract IPs from commands using aggregation
        pipeline = [
            {
                "$project": {
                    "ip": {
                        "$regexFind": {
                            "input": "$command",
                            "regex": "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b"
                        }
                    }
                }
            },
            {
                "$match": {
                    "ip": {"$ne": None}
                }
            },
            {
                "$group": {
                    "_id": "$ip.match"
                }
            }
        ]
        
        unique_ips = [doc["_id"] for doc in custom_scans_collection.aggregate(pipeline)]
        return jsonify(unique_ips), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500