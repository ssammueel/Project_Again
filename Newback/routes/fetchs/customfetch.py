from flask import Blueprint, jsonify
from models.user import custom_scans_collection  # Import collection

fetch_custom_scan_bp = Blueprint('fetch_custom_scan', __name__)

@fetch_custom_scan_bp.route('/fetch_custom_scan', methods=['GET'])
def fetch_custom_scan():
    try:
        # Retrieve all custom scans from the database
        scans = list(custom_scans_collection.find({}, {"_id": 0}))  # Exclude `_id` from results
        return jsonify(scans)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
