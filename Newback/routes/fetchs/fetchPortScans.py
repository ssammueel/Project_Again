from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING  # Import DESCENDING for sorting
from datetime import datetime, timedelta
import os

fetchPortScan_bp = Blueprint("fetchPortScan", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
scans_collection = db["scans"]

@fetchPortScan_bp.route('/scans', methods=['GET'])
def fetchPortScan():
    date = request.args.get("date")
    
    if date:
        try:
            start_date = datetime.strptime(date, "%Y-%m-%d")
            end_date = start_date + timedelta(days=1)
            scans = list(scans_collection.find(
                {"scan_date": {"$gte": start_date, "$lt": end_date}}, {"_id": 0}
            ).sort("scan_date", DESCENDING))  # 🔹 Sort by newest scans first
        except ValueError:
            return jsonify({"error": "Invalid date format, use YYYY-MM-DD"}), 400
    else:
        # Fetch all scans if no date is provided, sorted by newest first
        scans = list(scans_collection.find({}, {"_id": 0}).sort("scan_date", DESCENDING))  # 🔹 Sorting added

    return jsonify(scans)
from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING  # Import DESCENDING for sorting
from datetime import datetime, timedelta
import os

fetchPortScan_bp = Blueprint("fetchPortScan", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
scans_collection = db["scans"]

@fetchPortScan_bp.route('/scans', methods=['GET'])
def fetchPortScan():
    date = request.args.get("date")
    
    if date:
        try:
            start_date = datetime.strptime(date, "%Y-%m-%d")
            end_date = start_date + timedelta(days=1)
            scans = list(scans_collection.find(
                {"scan_date": {"$gte": start_date, "$lt": end_date}}, {"_id": 0}
            ).sort("scan_date", DESCENDING))  # 🔹 Sort by newest scans first
        except ValueError:
            return jsonify({"error": "Invalid date format, use YYYY-MM-DD"}), 400
    else:
        # Fetch all scans if no date is provided, sorted by newest first
        scans = list(scans_collection.find({}, {"_id": 0}).sort("scan_date", DESCENDING))  # 🔹 Sorting added

    return jsonify(scans)
