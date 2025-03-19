from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING  # Import DESCENDING for sorting
from datetime import datetime, timedelta
import os

fetchPortScan_bp = Blueprint("fetchPortScan", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
scans_collection = db["scans"]
from bson import ObjectId  # Import ObjectId from bson

@fetchPortScan_bp.route('/scans', methods=['GET'])
def fetchPortScan():
    date = request.args.get("date")
    
    if date:
        try:
            start_date = datetime.strptime(date, "%Y-%m-%d")
            end_date = start_date + timedelta(days=1)
            scans = list(scans_collection.find(
                {"scan_date": {"$gte": start_date, "$lt": end_date}}
            ).sort("scan_date", DESCENDING))
        except ValueError:
            return jsonify({"error": "Invalid date format, use YYYY-MM-DD"}), 400
    else:
        scans = list(scans_collection.find({}).sort("scan_date", DESCENDING))

    # Convert ObjectId to string
    for scan in scans:
        scan["_id"] = str(scan["_id"])  # Convert ObjectId to string

    return jsonify(scans)
