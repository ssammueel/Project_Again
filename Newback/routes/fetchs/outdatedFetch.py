from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta
import os
from bson.objectid import ObjectId

fetch_outdated_software_bp = Blueprint("fetch_outdated_software", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
outdated_software_nikto_collection = db["OutdatedSoftwareNikto"]

@fetch_outdated_software_bp.route('/nikto/outdated_software_scans', methods=['GET'])
def fetch_outdated_software_scans():
    try:
        date = request.args.get("date")
        target = request.args.get("target")

        query = {}
        if date:
            try:
                start_date = datetime.strptime(date, "%Y-%m-%d")
                end_date = start_date + timedelta(days=1)
                query["timestamp"] = {"$gte": start_date, "$lt": end_date}
            except ValueError:
                return jsonify({"error": "Invalid date format, use YYYY-MM-DD"}), 400

        if target:
            query["target"] = {"$regex": f"^{target}", "$options": "i"}

        scans = list(outdated_software_nikto_collection.find(query).sort("timestamp", DESCENDING))

        for scan in scans:
            scan["_id"] = str(scan["_id"])

        return jsonify(scans)
    
    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

@fetch_outdated_software_bp.route('/nikto/outdated_software_scans/unique_targets', methods=['GET'])
def get_unique_targets():
    try:
        query = request.args.get("query", "")
        regex_pattern = f"^{query}" if query else ""
        
        unique_ips = outdated_software_nikto_collection.distinct(
            "target", 
            {"target": {"$regex": regex_pattern, "$options": "i"}}
        )
        return jsonify(unique_ips)
    except Exception as e:
        return jsonify({"error": "Failed to fetch unique targets", "details": str(e)}), 500

@fetch_outdated_software_bp.route('/nikto/outdated_software_scans/<scan_id>', methods=['DELETE'])
def delete_scan(scan_id):
    try:
        result = outdated_software_nikto_collection.delete_one({"_id": ObjectId(scan_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Scan not found"}), 404
        return jsonify({"message": "Scan deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": "Failed to delete scan", "details": str(e)}), 500