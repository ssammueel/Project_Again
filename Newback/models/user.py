import pymongo
import os
from datetime import datetime
import json
from werkzeug.security import generate_password_hash, check_password_hash

client = pymongo.MongoClient(os.getenv("DATABASE_URL"))  # Fetch from .env
db = client['NCBA']

users_collection = db['users']  
scans_collection = db['scans']  
syn_scans_collection = db['syn_scans']
traceroute_collection = db['traceroutedb']
firewall_scans_collection = db['firewall_scans'] 
aggressive_scans_collection = db['aggressive_scans']
custom_scans_collection = db['custom_scans']

nikto_scans_collection = db["nikto_scans"]
header_nikto_collection = db["HeaderNikto"]
file_upload_nikto_collection = db["FileUploadNikto"]
outdated_software_nikto_collection = db["OutdatedSoftwareNikto"]


class UserCollection:
    @staticmethod
    def create_user(email, password, username):
        hashed_password = generate_password_hash(password)
        user_data = {
            "email": email,
            "password": hashed_password,
            "username": username,
            "created_at": datetime.utcnow(),
            "password_history": [hashed_password],  # Initialize with first password
            "password_changed_at": datetime.utcnow()
        }
        users_collection.insert_one(user_data)

    @staticmethod
    def get_user_by_email(email):
        return users_collection.find_one({"email": {"$regex": f"^{email}$", "$options": "i"}})

    @staticmethod
    def get_all_users():
        return list(users_collection.find({}))

    @staticmethod
    def update_password(email, new_password):
        # First get current password to add to history
        user = users_collection.find_one({"email": {"$regex": f"^{email}$", "$options": "i"}})
        
        if user:
            users_collection.update_one(
                {"email": {"$regex": f"^{email}$", "$options": "i"}},
                {"$set": {
                    "password": new_password,
                    "password_changed_at": datetime.utcnow()
                },
                "$push": {
                    "password_history": {
                        "$each": [user['password']],  # Add current password to history
                        "$slice": -5  # Keep only last 5 passwords
                    }
                }}
            )

    @staticmethod
    def add_to_password_history(email, hashed_password):
        """Store previous passwords to prevent reuse"""
        users_collection.update_one(
            {"email": {"$regex": f"^{email}$", "$options": "i"}},
            {"$push": {
                "password_history": {
                    "$each": [hashed_password],
                    "$slice": -5  # Keep last 5 passwords
                }
            }}
        )

    @staticmethod
    def is_password_in_history(email, new_password):
        """Check if password was used before"""
        user = users_collection.find_one(
            {"email": {"$regex": f"^{email}$", "$options": "i"}},
            {"password_history": 1}
        )
        if user and 'password_history' in user:
            return any(check_password_hash(ph, new_password) for ph in user['password_history'])
        return False

    @staticmethod
    def get_password_history(email):
        """Get list of previous passwords (hashed)"""
        user = users_collection.find_one(
            {"email": {"$regex": f"^{email}$", "$options": "i"}},
            {"password_history": 1}
        )
        return user.get('password_history', []) if user else []

    @staticmethod
    def update_user_profile(email, update_data):
        """Update user profile information"""
        users_collection.update_one(
            {"email": {"$regex": f"^{email}$", "$options": "i"}},
            {"$set": update_data}
        )


# open port 
class ScanCollection:
    @staticmethod
    def save_scan(ip, start_port, end_port, open_ports):
        scan_data = {
            "ip": ip,
            "start_port": start_port,
            "end_port": end_port,
            "open_ports": open_ports,
            "scan_date": datetime.utcnow() 
        }
        scans_collection.insert_one(scan_data)

# syn scan 
class SynScanCollection:
    @staticmethod
    def save_scan(ip, scan_data):
        formatted_data = json.loads(json.dumps(scan_data, default=str))  # Convert all data to strings
        syn_scans_collection.insert_one({
            "ip": ip,
            "scan_results": formatted_data,
            "scan_date": datetime.utcnow()
        })

# tracerouter 
class TracerouteCollection:
    @staticmethod
    def save_scan(ip, traceroute_data):
        formatted_data = json.loads(json.dumps(traceroute_data, default=str))  # Ensures keys are strings

        traceroute_collection.insert_one({
            "ip": ip,
            "traceroute_data": formatted_data,  # Now with string keys
            "scan_date": datetime.utcnow()
        })

# firewall 
class FirewallScanCollection:
    @staticmethod
    def save_scan(ip, scan_data):
        formatted_data = json.loads(json.dumps(scan_data, default=str)) 
        firewall_scans_collection.insert_one({
            "ip": ip,
            "firewall_scan_results": formatted_data,
            "scan_date": datetime.utcnow()
        })

# aggerigasive 
class AggressiveScanCollection:
    @staticmethod
    def save_scan(ip, scan_data):
        formatted_data = json.loads(json.dumps(scan_data, default=str))  # Convert all data to strings
        aggressive_scans_collection.insert_one({
            "ip": ip,
            "scan_results": formatted_data,
            "scan_date": datetime.utcnow()
        })

# custom 
class CustomScanCollection:
    @staticmethod
    def save_scan(command, output):
        custom_scans_collection.insert_one({
            "command": command,
            "output": output,
            "timestamp": datetime.utcnow()
        })