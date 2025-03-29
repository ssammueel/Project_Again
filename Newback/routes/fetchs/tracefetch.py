from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta
import os
from bson import ObjectId

fetchTraceroute_bp = Blueprint("fetchTraceroute", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
traceroute_collection = db["traceroutedb"]

@fetchTraceroute_bp.route('/traceroute_scans', methods=['GET'])
def fetchTracerouteScan():
    try:
        ip = request.args.get("ip")
        days = request.args.get("days")
        start_date = request.args.get("start_date")
        end_date = request.args.get("end_date")
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))

        query = {}
        
        # IP filter
        if ip:
            query["ip"] = {"$regex": ip, "$options": "i"}
        
        # Date range filter
        date_query = {}
        if days and days.isdigit():
            days = int(days)
            start_date = datetime.utcnow() - timedelta(days=days)
            date_query["$gte"] = start_date
        elif start_date and end_date:
            try:
                start_date = datetime.strptime(start_date, "%Y-%m-%d")
                end_date = datetime.strptime(end_date, "%Y-%m-%d")
                date_query["$gte"] = start_date
                date_query["$lte"] = end_date + timedelta(days=1)  # Include entire end day
            except ValueError:
                return jsonify({"error": "Invalid date format. Use YYYY-MM-DD"}), 400
        
        if date_query:
            query["scan_date"] = date_query

        total = traceroute_collection.count_documents(query)
        scans = list(traceroute_collection.find(query)
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

@fetchTraceroute_bp.route('/traceroute_scans/<scan_id>', methods=['DELETE'])
def delete_traceroute_scan(scan_id):
    try:
        result = traceroute_collection.delete_one({"_id": ObjectId(scan_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Scan not found"}), 404
        return jsonify({"message": "Scan deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetchTraceroute_bp.route('/traceroute_scans/bulk_delete', methods=['DELETE'])
def bulk_delete_traceroute_scans():
    try:
        data = request.get_json()
        if not data or 'scan_ids' not in data:
            return jsonify({"error": "Missing scan_ids in request body"}), 400

        object_ids = [ObjectId(scan_id) for scan_id in data['scan_ids']]
        result = traceroute_collection.delete_many({"_id": {"$in": object_ids}})
        
        return jsonify({
            "message": f"{result.deleted_count} scans deleted successfully",
            "deleted_count": result.deleted_count
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetchTraceroute_bp.route('/traceroute_unique_ips', methods=['GET'])
def get_unique_ips():
    try:
        unique_ips = traceroute_collection.distinct("ip")
        return jsonify(unique_ips), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500