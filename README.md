# React_Java_Fullstack

# Group Activity Organizer

A full-stack web application that allows users to create, manage, and join group activities. Built with React for the frontend and Java/Spring Boot for the backend, with MySQL as the database.

## Features

- User authentication (login/registration)
- Create and manage activities/events
- Set minimum and maximum participants for activities
- Search and browse available activities
- Join activities as a participant
- Track user participation points
- User profiles with contact information

## Technologies Used

### Frontend
- React
- React Router for navigation
- Context API for state management
- Bootstrap for styling

### Backend
- Java
- Spring Boot
- Spring Security with JWT authentication
- MySQL database

## Database Schema

The application uses a MySQL database with the following tables:

1. `user` - Stores user credentials and roles
2. `activity` - Stores activity details (name, description, location, date/time, participant limits)
3. `point` - Tracks user points and activity completion status
4. `contact` - Stores user contact information (name, email, location)

See the full SQL schema in the repository.

## API Endpoints

### Authentication Controller (`/authenticate`)
- `POST /` - Authenticate user and return JWT token
- `POST /register` - Register new user account

### Activity Controller (`/api/activity`)
- `GET /` - Get all activities
- `GET /{activityId}` - Get activity by ID
- `GET /user/{userId}` - Get activities for specific user
- `GET /participants/{activityId}` - Get participants for an activity
- `POST /` - Create new activity
- `POST /user/{userId}/{activityId}` - Add user to activity
- `PUT /{activityId}` - Update activity
- `PUT /participants/{activityId}/{userId}` - Confirm participant completion
- `DELETE /{activityId}` - Delete activity
- `DELETE /user/{userId}/{activityId}` - Remove user from activity
- `DELETE /user/{userId}` - Remove all user activities

## Setup Instructions

### Prerequisites
- Java JDK 11+
- Node.js 14+
- MySQL 8.0+

### Backend Setup
1. Create MySQL database using the provided schema
2. Configure database connection in `application.properties`
3. Build and run the Spring Boot application

### Frontend Setup
1. Install dependencies: `npm install`
2. Configure API base URL if needed
3. Start development server: `npm start`

## Sample Data

The database includes sample users and activities:
- Users: "frigiid", "loneWolf", "guardians"
- Activities: soccer, basketball, football

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

[MIT License](LICENSE)