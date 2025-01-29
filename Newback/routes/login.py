import jwt
import datetime
from flask import Blueprint, request, jsonify, current_app
from models.user import UserCollection

login_bp = Blueprint('login', __name__)

SECRET_KEY = 'Samuel'

@login_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = UserCollection.find_by_email(email)
    if not user:
        return jsonify({"message": "User does not exist"}), 404

    if user['password'] == password:  # Replace this with proper password hashing
        user_data = {
        "name": user["name"],  # Ensure your user model has "name" and "email"
        "email": user["email"]
    }
        token = jwt.encode(
            {'email':user['email'],"exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        SECRET_KEY,
        algorithm="HS256"
        )
        return jsonify(message="Login successful", user=user_data,  token = token), 200

    return jsonify({"message": "Incorrect password"}), 401
