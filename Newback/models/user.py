import pymongo
import os
from datetime import datetime, timedelta

client = pymongo.MongoClient(os.getenv("DATABASE_URL"))  # Fetch from .env
db = client['NCBA']  # Ensure your database name is correct

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
class ScanCollection:
    @staticmethod
    def save_scan(ip, start_port, end_port, open_ports):
        
        scan_data = {
            "ip": ip,
            "start_port": start_port,
            "end_port": end_port,
            "open_ports": open_ports,
            "scan_date": datetime.utcnow()  # Store timestamp in UTC
        }
        scans_collection.insert_one(scan_data)

    @staticmethod
    def get_scans_by_date(date):
        start = datetime.strptime(date, "%Y-%m-%d")
        start_utc = start - timedelta(hours=3)
        end_utc = start_utc.replace(hour=23, minute=59, second=59)
        
        return list(scans_collection.find({"scan_date": {"$gte": start_utc, "$lte": end_utc}}))