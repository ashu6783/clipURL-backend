# ClipURL Backend -(Decoit Digital Assignment)

This is the backend for the ClipURL application, a URL shortening service with analytics. It is deployed on Render at `https://clipurl-backend.onrender.com`.

## Features
- **URL Shortening**: Create short URLs with optional custom aliases and expiration dates.
- **Redirection**: Redirect short URLs to their original destinations.
- **Analytics**: Track clicks with device type and IP information.
- **Authentication**: JWT-based user authentication.

## Tech Stack
- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **MongoDB**: Database for storing links and users.
- **Mongoose**: ODM for MongoDB.
- **Dependencies**: `bcryptjs`, `jsonwebtoken`, `valid-url`, `nanoid`, `ua-parser-js`, `cors`, `dotenv`.

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud, e.g., MongoDB Atlas)
- Render account for deployment

## Setup Instructions

### Local Development
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd server

2. **Install Dependencies**
   ```bash
    npm install

1. **Configure Environment Variables: Create a .env file in the server/ directory:**:
   ```bash
    MONGODB_URI=mongodb://localhost:27017/clipurl
    JWT_SECRET=your_secret_key_here
    PORT=5000
   
2. **Start the server**
   ```bash
    npm start
   
**Backend has been eployed on render standalone due to fallback issues **
