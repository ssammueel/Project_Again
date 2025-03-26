import jwt
import datetime
from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from models.user import UserCollection

login_bp = Blueprint('login', __name__)

SECRET_KEY = 'your-secret-key-here'  # Change this to a strong secret

@login_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = UserCollection.get_user_by_email(email)
    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

    if not check_password_hash(user['password'], password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode(
        {
            'email': user['email'],
            'username': user['username'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "username": user['username'],
            "email": user['email']
        }
    }), 200