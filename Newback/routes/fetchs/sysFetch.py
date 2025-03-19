from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING  # Import DESCENDING for sorting
from datetime import datetime, timedelta
import os

fetchSynScan_bp = Blueprint("fetchSynScan", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
syn_scans_collection = db['syn_scans']

from bson import ObjectId  # Import ObjectId from bson

@fetchSynScan_bp.route('/syn_scans', methods=['GET'])
def fetchSynScan():
    date = request.args.get("date")
    
    if date:
        try:
            start_date = datetime.strptime(date, "%Y-%m-%d")
            end_date = start_date + timedelta(days=1)
            scans = list(syn_scans_collection.find(
                {"timestamp": {"$gte": start_date, "$lt": end_date}}
            ).sort("timestamp", DESCENDING))
        except ValueError:
            return jsonify({"error": "Invalid date format, use YYYY-MM-DD"}), 400
    else:
        scans = list(syn_scans_collection.find({}).sort("timestamp", DESCENDING))

    # Convert ObjectId to string
    for scan in scans:
        scan["_id"] = str(scan["_id"])  # Convert ObjectId to string

    return jsonify(scans)
