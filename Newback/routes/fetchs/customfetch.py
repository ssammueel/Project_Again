from flask import Blueprint, jsonify, request
from models.user import custom_scans_collection  # Import collection
from datetime import datetime, timedelta
from pymongo import DESCENDING

fetch_custom_scan_bp = Blueprint('fetch_custom_scan', __name__)

@fetch_custom_scan_bp.route('/fetch_custom_scan', methods=['GET'])
def fetch_custom_scan():
    try:
        date = request.args.get("date")
        
        if date:
            try:
                start_date = datetime.strptime(date, "%Y-%m-%d")
                end_date = start_date + timedelta(days=1)
                scans = list(custom_scans_collection.find(
                    {"timestamp": {"$gte": start_date, "$lt": end_date}}
                ).sort("timestamp", DESCENDING))
            except ValueError:
                return jsonify({"error": "Invalid date format, use YYYY-MM-DD"}), 400
        else:
            scans = list(custom_scans_collection.find({}).sort("timestamp", DESCENDING))

        # Convert ObjectId to string and return results
        for scan in scans:
            scan["_id"] = str(scan["_id"])  # Convert ObjectId to string

        return jsonify(scans)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
