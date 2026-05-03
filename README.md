Authentication API

A secure and scalable authentication backend built with Node.js, Express, and MongoDB.
This project provides user authentication and authorization features including registration, login, password reset, JWT protection, and profile image upload.

__________________________________________

Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Reset Functionality
- Authentication Middleware
- Profile Image Upload
- MongoDB Database Integration
- RESTful API Structure
- Environment Variable Configuration

__________________________________________

Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- Multer
- dotenv
- cookie-parser
- Morgan
- Helmet

__________________________________________

Environment Variables

Create a ".env" file in the root directory and add:

PORT=your_port  
MONGO_URI=your_mongodb_connection   
JWT_ACCESS_TOKEN_SECRET=your_secret   
JWT_REFRESH_TOKEN_SECRET=your_secret

__________________________________________

Run the Project

Development mode:

npm run dev

Production mode:

npm start

__________________________________________

API Endpoints

Authentication Routes

Method| Endpoint| Description   
POST| /api/auth/register| Register user   
POST| /api/auth/login| Login user   
POST| /api/auth/refresh| Refresh accessbtoken   
POST| /api/auth/forgot-password| Request password reset   
PUT| /api/auth/reset-password| Reset password   
GET| /api/auth/profile| protected user profile    
PUT| /api/auth/upload-profile-img| Protected upload of profile image   

__________________________________________

File Upload

This project supports profile image upload using Multer.

Uploaded files are stored in:

/uploads

Static access is enabled through:

app.use("/uploads", express.static("uploads"));

__________________________________________

Security Features

- Password hashing using bcrypt
- JWT token authentication
- Protected middleware routes
- Environment variable protection
- HTTP security with Helmet

__________________________________________

Author

Developed by Melaku Belew

---
