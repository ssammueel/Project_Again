from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta
import os
from bson import ObjectId

firewall_fetch_bp = Blueprint('firewall_fetch', __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
firewall_scans_collection = db["firewall_scans"]

@firewall_fetch_bp.route('/firewall_scans', methods=['GET'])
def get_firewall_scans():
    try:
        ip = request.args.get("ip")
        date = request.args.get("date")
        days = request.args.get("days")  # Add days parameter
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))

        query = {}
        if ip:
            query["ip"] = {"$regex": ip, "$options": "i"}
        if date:
            try:
                start_date = datetime.strptime(date, "%Y-%m-%d")
                end_date = start_date + timedelta(days=1)
                query["scan_date"] = {"$gte": start_date, "$lt": end_date}
            except ValueError:
                return jsonify({"error": "Invalid date format, use YYYY-MM-DD"}), 400
        if days and days.isdigit():  # Add days filter
            days = int(days)
            start_date = datetime.utcnow() - timedelta(days=days)
            query["scan_date"] = {"$gte": start_date}

        total = firewall_scans_collection.count_documents(query)
        scans = list(firewall_scans_collection.find(query)
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


@firewall_fetch_bp.route('/firewall_unique_ips', methods=['GET'])
def get_firewall_unique_ips():
    try:
        unique_ips = firewall_scans_collection.distinct("ip")
        return jsonify(unique_ips), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@firewall_fetch_bp.route('/firewall_scans/<scan_id>', methods=['DELETE'])
def delete_firewall_scan(scan_id):
    try:
        result = firewall_scans_collection.delete_one({"_id": ObjectId(scan_id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Scan not found"}), 404
            
        return jsonify({"message": "Scan deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@firewall_fetch_bp.route('/firewall_scans/bulk_delete', methods=['DELETE'])
def bulk_delete_firewall_scans():
    try:
        data = request.get_json()
        if not data or 'scan_ids' not in data:
            return jsonify({"error": "Missing scan_ids in request body"}), 400

        object_ids = [ObjectId(scan_id) for scan_id in data['scan_ids']]
        result = firewall_scans_collection.delete_many({"_id": {"$in": object_ids}})
        
        return jsonify({
            "message": f"{result.deleted_count} scans deleted successfully",
            "deleted_count": result.deleted_count
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500