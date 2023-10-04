from flask import Flask, request, jsonify, current_app, g
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quiz_platform.db'
app.config['JWT_SECRET_KEY'] = 'your_secret_key'

db = SQLAlchemy(app)
jwt = JWTManager(app)

# Define User Roles (for demonstration purposes)


class UserRole:
    STUDENT = 'student'
    TEACHER = 'teacher'


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(50), default=UserRole.STUDENT)
    quizzes_created = db.relationship('Quiz', backref='creator', lazy=True)


class Quiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    questions = db.relationship('Question', backref='quiz', lazy=True)
    creator_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(500), nullable=False)
    question_type = db.Column(db.String(50), nullable=False)
    options = db.relationship('Option', backref='question', lazy=True)
    correct_option_id = db.Column(db.Integer, nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)


class Option(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(
        'question.id'), nullable=False)


# Application context setup
with app.app_context():
    db.create_all()

# User registration


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', UserRole.STUDENT)  # Default role is 'student'

    if role not in [UserRole.STUDENT, UserRole.TEACHER]:
        return jsonify({'message': 'Invalid role'}), 400

    hashed_password = generate_password_hash(password, method='sha256')
    new_user = User(username=username, password=hashed_password, role=role)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Username already exists'}), 400

# User login


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(
            identity={'username': username, 'role': user.role})
        return jsonify({'access_token': access_token, 'role': user.role}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# Create a quiz (for teachers)


@app.route('/quiz/create', methods=['POST'])
@jwt_required()
def create_quiz():
    current_user = get_jwt_identity()

    if current_user['role'] != UserRole.TEACHER:
        return jsonify({'message': 'Unauthorized'}), 403

    data = request.get_json()
    title = data.get('title')
    questions = data.get('questions')

    new_quiz = Quiz(title=title, creator_id=g.user.id)

    for question_data in questions:
        question_text = question_data.get('text')
        question_type = question_data.get('question_type')
        options = question_data.get('options')
        correct_option_id = question_data.get('correct_option_id')

        new_question = Question(
            text=question_text,
            question_type=question_type,
            correct_option_id=correct_option_id,
            quiz=new_quiz
        )

        for option_text in options:
            new_option = Option(text=option_text, question=new_question)
            db.session.add(new_option)

    db.session.add(new_quiz)
    db.session.commit()

    return jsonify({'message': 'Quiz created successfully'}), 201

# Root URL handler


@app.route('/')
def welcome():
    return 'Welcome to the Online Quiz Platform'


if __name__ == '__main__':
    app.run(debug=True)
