from flask import Blueprint, request, jsonify
from models.user import UserCollection

register_bp = Blueprint('register', __name__)

@register_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirm')

    if not all([name, email, password, confirm_password]):
        return jsonify({"message": "All fields are required"}), 400

    if password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    if UserCollection.find_by_email(email):
        return jsonify({"message": "User already exists"}), 409

    UserCollection.insert_user(name, email, password)
    return jsonify({"message": "User registered successfully"}), 201
