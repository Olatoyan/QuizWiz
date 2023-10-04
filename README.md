# QuizWiz

## Overview

The QuizWiz is a Flask-based web application that allows users to create, take, and manage quizzes. It's designed to facilitate remote learning scenarios where teachers can create quizzes, and students can take them online.

## Features

- User Registration: Users can register with different roles (student or teacher).
- User Login: Registered users can log in and obtain access tokens for authentication.
- Quiz Creation: Teachers can create quizzes with various question types, including multiple-choice and true/false.
- Quiz Taking: Students can take quizzes with automatic scoring.
- User Roles: Differentiate between students and teachers with role-based access control.
- Data Security: Passwords are hashed for security, and access tokens are used for authentication.
- Error Handling: Proper error messages and status codes are returned for API requests.

## Running the Application

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/QuizWiz.git
   ```

2. Navigate to the project directory:

   ```bash
   cd QuizWiz
   ```

3. Install the required dependencies (Flask, Flask-JWT-Extended, Flask-SQLAlchemy):

   ```bash
   pip install Flask Flask-JWT-Extended Flask-SQLAlchemy
   ```

4. Run the application:

   ```bash
   python app.py
   ```

The application will start, and you can access it at [http://localhost:5000/](http://localhost:5000/).

## API Endpoints

- `POST /register`: Register a new user.
- `POST /login`: Log in and obtain an access token.
- `POST /quiz/create`: Create a new quiz (requires teacher role and authentication).

## Testing the Endpoints

You can test the API endpoints using tools like Postman or by writing unit tests using testing frameworks like `unittest`, `pytest`, or `nose`. Refer to the documentation for detailed instructions on testing each endpoint.

## Contributing

If you'd like to contribute to this project, please fork the repository, make your changes, and submit a pull request.
