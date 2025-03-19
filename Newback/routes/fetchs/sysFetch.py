from flask import Blueprint, jsonify, request
from pymongo import MongoClient, DESCENDING
from datetime import datetime, timedelta
import os

fetchSynScan_bp = Blueprint("fetchSynScan", __name__)

client = MongoClient(os.getenv("DATABASE_URL"))
db = client["NCBA"]
syn_scans_collection = db["syn_scans"]

@fetchSynScan_bp.route('/syn_scans', methods=['GET'])
def fetchSynScan():
    date = request.args.get("date")

    if date:
        try:
            start_date = datetime.strptime(date, "%Y-%m-%d")
            end_date = start_date + timedelta(days=1)
            scans = list(syn_scans_collection.find(
                {"scan_date": {"$gte": start_date, "$lt": end_date}}
            ).sort("scan_date", DESCENDING))
        except ValueError:
            return jsonify({"error": "Invalid date format, use YYYY-MM-DD"}), 400
    else:
        scans = list(syn_scans_collection.find({}).sort("scan_date", DESCENDING))

    formatted_scans = []
    for scan in scans:
        
        open_ports = []
        if "tcp" in scan.get("scan_data", {}):
            for port, details in scan["scan_data"]["tcp"].items():
                if details.get("state") == "open":
                    open_ports.append({
                        "port": port,
                        "service": details.get("name", "Unknown"),
                    })

        formatted_scans.append({
            "ip": scan["ip"],
            "status": scan["scan_data"].get("status", {}).get("state", "unknown"),
            "os": scan["scan_data"].get("osmatch", [{}])[0].get("name", "Unknown"),
            "open_ports": open_ports,
            "scan_date": scan["scan_date"].isoformat(),
        })

    return jsonify(formatted_scans)
