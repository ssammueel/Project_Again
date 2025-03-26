from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from models.user import UserCollection
import jwt
from functools import wraps
import re
import datetime

change_password_bp = Blueprint('change_password', __name__)
SECRET_KEY = 'your-secret-key-here'  # Same as login.py

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"message": "Token is missing"}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            request.current_user = data  # Store decoded token data in request
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Token is invalid"}), 401
        return f(*args, **kwargs)
    return decorated

def is_password_strong(password):
    """Check if password meets strength requirements"""
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if not re.search(r"[A-Z]", password):
        return False, "Password must contain at least one uppercase letter"
    if not re.search(r"[a-z]", password):
        return False, "Password must contain at least one lowercase letter"
    if not re.search(r"[0-9]", password):
        return False, "Password must contain at least one number"
    if not re.search(r"[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]", password):
        return False, "Password must contain at least one special character"
    if re.search(r"(.)\1{2,}", password):  # Check for repeating characters
        return False, "Password contains too many repeating characters"
    return True, "Password is strong"

@change_password_bp.route('/change-password', methods=['POST'])
@token_required
def change_password():
    data = request.get_json()
    email = data.get('email')
    current_password = data.get('current_password')
    new_password = data.get('new_password')

    # Validate input
    if not all([email, current_password, new_password]):
        return jsonify({"message": "All fields are required"}), 400

    # Verify email matches token
    if email != request.current_user.get('email'):
        return jsonify({"message": "Unauthorized access"}), 403

    # Check password strength
    is_strong, message = is_password_strong(new_password)
    if not is_strong:
        return jsonify({"message": message}), 400

    # Check password history (add this to your UserCollection if needed)
    if UserCollection.is_password_in_history(email, new_password):
        return jsonify({"message": "Cannot use a previously used password"}), 400

    # Get user and verify current password
    user = UserCollection.get_user_by_email(email)
    if not user:
        return jsonify({"message": "User not found"}), 404

    if not check_password_hash(user['password'], current_password):
        return jsonify({"message": "Current password is incorrect"}), 401

    if current_password == new_password:
        return jsonify({"message": "New password must be different from current password"}), 400

    # Update password
    hashed_password = generate_password_hash(new_password)
    UserCollection.update_password(email, hashed_password)
    
    # Add to password history (implement this in your UserCollection)
    UserCollection.add_to_password_history(email, hashed_password)
    
    # Generate new token with updated expiration
    new_token = jwt.encode(
        {
            'email': user['email'],
            'username': user.get('username'),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        },
        SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "message": "Password updated successfully",
        "token": new_token,
        "user": {
            "email": user['email'],
            "username": user.get('username')
        }
    }), 200