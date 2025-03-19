import pymongo
import os
from datetime import datetime
import json

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


# users 
class UserCollection:
    @staticmethod
    def create_user(email, password, username):
        user_data = {
            "email": email,
            "password": password,  # Hash the password before storing in real applications
            "username": username,
            "created_at": datetime.utcnow()
        }
        users_collection.insert_one(user_data)

    @staticmethod
    def get_user_by_email(email):
        return users_collection.find_one({"email": email})

    @staticmethod
    def get_all_users():
        return list(users_collection.find({}))

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