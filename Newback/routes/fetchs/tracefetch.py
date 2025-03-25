from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta
import os

fetchTraceroute_bp = Blueprint("fetchTraceroute", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
traceroute_collection = db["traceroutedb"]

@fetchTraceroute_bp.route('/traceroute_scans', methods=['GET'])
def fetchTracerouteScan():
    try:
        ip = request.args.get("ip")
        
        query = {}
        if ip:
            query["ip"] = ip

        scans = list(traceroute_collection.find(query).sort("scan_date", DESCENDING))

        if not scans:
            return jsonify({"message": "No traceroute scans found"}), 404

        # Convert ObjectId to string
        for scan in scans:
            scan["_id"] = str(scan["_id"])

        return jsonify(scans)
    
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@fetchTraceroute_bp.route('/traceroute_unique_ips', methods=['GET'])
def get_unique_ips():
    try:
        unique_ips = traceroute_collection.distinct("ip")
        return jsonify(unique_ips)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@fetchTraceroute_bp.route('/traceroute_scans/<scan_id>', methods=['DELETE'])
def delete_traceroute_scan(scan_id):
    try:
        from bson import ObjectId
        
        result = traceroute_collection.delete_one({"_id": ObjectId(scan_id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Scan not found"}), 404
            
        return jsonify({"message": "Scan deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500