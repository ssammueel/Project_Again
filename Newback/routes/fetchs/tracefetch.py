from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta
import os

fetchTraceroute_bp = Blueprint("fetchTraceroute", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
traceroute_collection = db["traceroutedb"]

from bson import ObjectId  

@fetchTraceroute_bp.route('/traceroute_scans', methods=['GET'])
def fetchTracerouteScan():
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
                error_msg = "Invalid date format, use YYYY-MM-DD"
                print(f"[ERROR] {error_msg}")  # ✅ Logs error to terminal
                return jsonify({"error": error_msg}), 400

        if ip:
            query["ip"] = ip

        scans = list(traceroute_collection.find(query).sort("scan_date", DESCENDING))

        if not scans:
            print("[INFO] No traceroute scans found")  # ✅ Logs missing data case
            return jsonify({"message": "No traceroute scans found"}), 404

        # Convert ObjectId to string
        for scan in scans:
            scan["_id"] = str(scan["_id"])

        return jsonify(scans)
    
    except Exception as e:
        print(f"[CRITICAL ERROR] {str(e)}")  # ✅ Logs full exception details
        return jsonify({"error": "Internal server error", "details": str(e)}), 500
