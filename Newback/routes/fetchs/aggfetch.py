from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta
import os

fetchAggressive_bp = Blueprint("fetchAggressive", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
aggressive_collection = db["aggressive_scans"]

from bson import ObjectId  

@fetchAggressive_bp.route('/aggressive_scans', methods=['GET'])
def fetchAggressiveScan():
    try:
        date = request.args.get("date")
        ip = request.args.get("ip")

        query = {}
        if date:
            try:
                start_date = datetime.strptime(date, "%Y-%m-%d")
                end_date = start_date + timedelta(days=1)
                query["scan_date"] = {"$gte": start_date, "$lt": end_date}
            except ValueError:
                return jsonify({"error": "Invalid date format, use YYYY-MM-DD"}), 400

        if ip:
            query["ip"] = ip

        scans = list(aggressive_collection.find(query).sort("scan_date", DESCENDING))

        if not scans:
            return jsonify({"message": "No aggressive scans found"}), 404

        # Convert ObjectId to string
        for scan in scans:
            scan["_id"] = str(scan["_id"])

        return jsonify(scans)
    
    except Exception as e:
        print(f"[ERROR] {e}")
        return jsonify({"error": "Internal server error", "details": str(e)}), 500
