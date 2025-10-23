# Alumni Management System - Backend Microservices

A comprehensive Spring Boot microservices architecture for managing alumni networks, built with JWT authentication, MySQL databases, and RESTful APIs.

## Architecture Overview

The system consists of 5 main components:

1. **API Gateway** (Port 8080) - Routes requests and handles JWT authentication
2. **Auth Service** (Port 8081) - User authentication and authorization
3. **Alumni Service** (Port 8082) - Alumni profile management and directory
4. **Event Service** (Port 8083) - Event management and RSVP functionality
5. **Communication Service** (Port 8084) - Messaging, mentorship, and notifications

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Postman (for API testing)

## Database Setup

1. **Install MySQL** and create the required databases:
   \`\`\`sql
   CREATE DATABASE alumni_auth_db;
   CREATE DATABASE alumni_management_db;
   CREATE DATABASE alumni_events_db;
   CREATE DATABASE alumni_communication_db;
   \`\`\`

2. **Run the schema scripts** in order:
   \`\`\`bash
   mysql -u root -p < database/auth-service-schema.sql
   mysql -u root -p < database/alumni-service-schema.sql
   mysql -u root -p < database/event-service-schema.sql
   mysql -u root -p < database/communication-service-schema.sql
   \`\`\`

3. **Insert sample data** (optional):
   \`\`\`bash
   mysql -u root -p < database/sample-data.sql
   \`\`\`

## Running the Services

### Option 1: Run Individual Services

1. **Start API Gateway:**
   \`\`\`bash
   cd api-gateway
   mvn spring-boot:run
   \`\`\`

2. **Start Auth Service:**
   \`\`\`bash
   cd auth-service
   mvn spring-boot:run
   \`\`\`

3. **Start Alumni Service:**
   \`\`\`bash
   cd alumni-service
   mvn spring-boot:run
   \`\`\`

4. **Start Event Service:**
   \`\`\`bash
   cd event-service
   mvn spring-boot:run
   \`\`\`

5. **Start Communication Service:**
   \`\`\`bash
   cd communication-service
   mvn spring-boot:run
   \`\`\`

### Option 2: Build and Run JARs

1. **Build all services:**
   \`\`\`bash
   # In each service directory
   mvn clean package
   \`\`\`

2. **Run the JAR files:**
   \`\`\`bash
   java -jar api-gateway/target/api-gateway-0.0.1-SNAPSHOT.jar
   java -jar auth-service/target/auth-service-0.0.1-SNAPSHOT.jar
   java -jar alumni-service/target/alumni-service-0.0.1-SNAPSHOT.jar
   java -jar event-service/target/event-service-0.0.1-SNAPSHOT.jar
   java -jar communication-service/target/communication-service-0.0.1-SNAPSHOT.jar
   \`\`\`

## API Testing with Postman

1. **Import the Postman collection:**
   - Open Postman
   - Click "Import" and select `postman/Alumni-Management-System.postman_collection.json`

2. **Set up environment variables:**
   - `base_url`: `http://localhost:8080`
   - `auth_token`: (will be set automatically after login)
   - `user_id`: (will be set automatically after login)

3. **Test the APIs:**
   - Start with Authentication → Login User
   - The token will be automatically saved for subsequent requests
   - Test other endpoints in any order

## API Endpoints Overview

### Authentication Service (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /validate` - Validate JWT token

### Alumni Service (`/api/alumni`)
- `POST /profile` - Create alumni profile
- `GET /profile` - Get current user's profile
- `PUT /profile` - Update alumni profile
- `GET /search` - Search alumni with filters
- `GET /all` - Get all alumni
- `GET /mentors` - Get available mentors
- `GET /filters/*` - Get filter options

### Event Service (`/api/events`)
- `POST /` - Create event
- `GET /{id}` - Get event by ID
- `PUT /{id}` - Update event
- `DELETE /{id}` - Delete event
- `GET /search` - Search events with filters
- `GET /upcoming` - Get upcoming events
- `POST /{id}/rsvp` - RSVP to event
- `GET /{id}/rsvps` - Get event RSVPs

### Communication Service (`/api/messages`, `/api/mentorship`, `/api/notifications`)
- **Messages:**
  - `POST /messages` - Send message
  - `GET /messages` - Get user messages
  - `GET /messages/conversation/{userId}` - Get conversation
- **Mentorship:**
  - `POST /mentorship/request` - Send mentorship request
  - `PUT /mentorship/request/{id}/respond` - Respond to request
  - `GET /mentorship/active` - Get active mentorships
- **Notifications:**
  - `GET /notifications` - Get user notifications
  - `PUT /notifications/{id}/read` - Mark as read

## Configuration

### Database Configuration
Update `application.yml` in each service with your MySQL credentials:
\`\`\`yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/database_name
    username: your_username
    password: your_password
\`\`\`

### JWT Configuration
The JWT secret is configured in `application.yml`. For production, use a secure secret:
\`\`\`yaml
jwt:
  secret: your-secure-secret-key-here
  expiration: 86400000  # 24 hours
\`\`\`

## Security Features

- **JWT Authentication:** Stateless authentication with Bearer tokens
- **Password Encryption:** BCrypt hashing for user passwords
- **API Gateway Security:** Centralized authentication and authorization
- **CORS Configuration:** Configured for frontend integration
- **Input Validation:** Comprehensive validation on all endpoints

## Sample Users (from sample data)

| Email | Password | Role | Name |
|-------|----------|------|------|
| admin@university.edu | password123 | ADMIN | Admin User |
| john.doe@email.com | password123 | ALUMNI | John Doe |
| jane.smith@email.com | password123 | ALUMNI | Jane Smith |
| mike.johnson@email.com | password123 | ALUMNI | Mike Johnson |
| sarah.wilson@email.com | password123 | ALUMNI | Sarah Wilson |

## Troubleshooting

### Common Issues

1. **Database Connection Errors:**
   - Verify MySQL is running
   - Check database credentials in `application.yml`
   - Ensure databases exist

2. **Port Conflicts:**
   - Check if ports 8080-8084 are available
   - Modify ports in `application.yml` if needed

3. **JWT Token Issues:**
   - Ensure the same JWT secret is used across all services
   - Check token expiration time

4. **CORS Errors:**
   - Verify CORS configuration in controllers
   - Update allowed origins for your frontend URL

### Logs and Debugging

- Enable debug logging by adding to `application.yml`:
  \`\`\`yaml
  logging:
    level:
      com.alumni: DEBUG
  \`\`\`

## Production Deployment

For production deployment, consider:

1. **Environment Variables:** Use environment variables for sensitive configuration
2. **Database Security:** Use connection pooling and secure credentials
3. **Load Balancing:** Deploy multiple instances behind a load balancer
4. **Monitoring:** Add application monitoring and health checks
5. **SSL/TLS:** Enable HTTPS for secure communication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.
