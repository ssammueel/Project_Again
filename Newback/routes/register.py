from flask import Blueprint, request, jsonify
from models.user import UserCollection
import re  # for regular expressions

register_bp = Blueprint('register', __name__)

def is_password_strong(password):
    """
    Check if password meets strength requirements:
    - At least 8 characters long
    - Contains at least one uppercase letter
    - Contains at least one lowercase letter
    - Contains at least one digit
    - Contains at least one special character
    """
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter"
    
    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter"
    
    if not re.search(r"[0-9]", password):
        return False, "Password must contain at least one digit"
    
    if not re.search(r"[ !@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]", password):
        return False, "Password must contain at least one special character"
    
    return True, "Password is strong"

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

    is_strong, message = is_password_strong(password)
    if not is_strong:
        return jsonify({"message": message}), 400

    if UserCollection.get_user_by_email(email):
        return jsonify({"message": "User already exists"}), 409


    UserCollection.create_user(email, password, name)
    return jsonify({"message": "User registered successfully"}), 201