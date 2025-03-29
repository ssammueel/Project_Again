from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta
import os
from bson import ObjectId

fetchSynScan_bp = Blueprint("fetchSynScan", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
syn_scans_collection = db['syn_scans']

@fetchSynScan_bp.route('/syn_scans', methods=['GET'])
def fetchSynScan():
    try:
        ip = request.args.get("ip")
        days = request.args.get("days")
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))

        query = {}
        if ip:
            query["ip"] = ip  # Exact match now instead of regex
        
        if days and days.isdigit():
            days = int(days)
            start_date = datetime.utcnow() - timedelta(days=days)
            query["timestamp"] = {"$gte": start_date}

        total = syn_scans_collection.count_documents(query)
        scans = list(syn_scans_collection.find(query)
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

@fetchSynScan_bp.route('/syn_scans/<scan_id>', methods=['DELETE'])
def delete_syn_scan(scan_id):
    try:
        result = syn_scans_collection.delete_one({"_id": ObjectId(scan_id)})
        if result.deleted_count == 1:
            return jsonify({"message": "Scan deleted successfully"}), 200
        else:
            return jsonify({"error": "Scan not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetchSynScan_bp.route('/syn_scans/bulk_delete', methods=['DELETE'])
def bulk_delete_syn_scans():
    try:
        data = request.get_json()
        if not data or 'scan_ids' not in data:
            return jsonify({"error": "Missing scan_ids in request body"}), 400

        object_ids = [ObjectId(scan_id) for scan_id in data['scan_ids']]
        result = syn_scans_collection.delete_many({"_id": {"$in": object_ids}})
        
        return jsonify({
            "message": f"{result.deleted_count} scans deleted successfully",
            "deleted_count": result.deleted_count
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetchSynScan_bp.route('/syn_scans/unique_ips', methods=['GET'])
def get_unique_syn_ips():
    try:
        unique_ips = syn_scans_collection.distinct("ip")
        return jsonify(unique_ips), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500