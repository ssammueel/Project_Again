import pymongo
import os

client = pymongo.MongoClient(os.getenv("DATABASE_URL"))  # Fetch from .env
db = client['NCBA']
users_collection = db['users']

class UserCollection:
    @staticmethod
    def find_by_email(email):
        return users_collection.find_one({"email": email})

    @staticmethod
    def insert_user(name, email, password):
        users_collection.insert_one({"name": name, "email": email, "password": password})
