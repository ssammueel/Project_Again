import pymongo
import os
from datetime import datetime

client = pymongo.MongoClient(os.getenv("DATABASE_URL"))  # Fetch from .env
db = client['NCBA']

# Collections
users_collection = db['users']  
scans_collection = db['scans']  # Collection for storing scan results

# User management
class UserCollection:
    @staticmethod
    def create_user(email, password, username):
        """
        Save a new user in the database.
        """
        user_data = {
            "email": email,
            "password": password,  # Hash the password before storing in real applications
            "username": username,
            "created_at": datetime.utcnow()
        }
        users_collection.insert_one(user_data)

    @staticmethod
    def get_user_by_email(email):
        """
        Fetch a user by their email.
        """
        return users_collection.find_one({"email": email})

    @staticmethod
    def get_all_users():
        """
        Fetch all users.
        """
        return list(users_collection.find({}))

# Scan results management
from datetime import datetime

class ScanCollection:
    @staticmethod
    def save_scan(ip, start_port, end_port, open_ports):
        scan_data = {
            "ip": ip,
            "start_port": start_port,
            "end_port": end_port,
            "open_ports": open_ports,
            "scan_date": datetime.utcnow()  # Store as MongoDB Date object
        }
        scans_collection.insert_one(scan_data)