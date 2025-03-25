from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING
import os
from bson import ObjectId
from datetime import datetime
import json
from bson.json_util import dumps

fetchPortScan_bp = Blueprint("fetchPortScan", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
scans_collection = db["scans"]

@fetchPortScan_bp.route('/scans', methods=['GET'])
def fetchPortScan():
    try:
        ip = request.args.get("ip")
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 10))

        query = {}
        if ip:
            query["ip"] = ip

        total = scans_collection.count_documents(query)
        scans = list(scans_collection.find(query)
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

@fetchPortScan_bp.route('/scans/<scan_id>', methods=['DELETE'])
def delete_scan(scan_id):
    try:
        result = scans_collection.delete_one({"_id": ObjectId(scan_id)})
        if result.deleted_count == 1:
            return jsonify({"message": "Scan deleted successfully"}), 200
        else:
            return jsonify({"error": "Scan not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetchPortScan_bp.route('/scans/bulk_delete', methods=['DELETE'])
def bulk_delete_scans():
    try:
        data = request.get_json()
        if not data or 'scan_ids' not in data:
            return jsonify({"error": "Missing scan_ids in request body"}), 400

        object_ids = [ObjectId(scan_id) for scan_id in data['scan_ids']]
        result = scans_collection.delete_many({"_id": {"$in": object_ids}})
        
        return jsonify({
            "message": f"{result.deleted_count} scans deleted successfully",
            "deleted_count": result.deleted_count
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetchPortScan_bp.route('/unique_ips', methods=['GET'])
def get_unique_ips():
    try:
        unique_ips = scans_collection.distinct("ip")
        return jsonify(unique_ips), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetchPortScan_bp.route('/scans/export/json', methods=['GET'])
def export_to_json():
    try:
        ip = request.args.get("ip")
        query = {}
        if ip:
            query["ip"] = ip

        scans = list(scans_collection.find(query).sort("scan_date", DESCENDING))
        return jsonify(scans), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500