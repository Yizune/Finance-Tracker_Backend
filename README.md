**Finance Tracker Backend API**

This repository contains only the backend (API/server) for the Finance Tracker application.

Follow these steps:

```powershell
# 1. Clone the repository
git clone <YOUR_GIT_URL>
cd <repo-folder>

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env file in the config folder with your MongoDB connection string:
# mongo=your_mongodb_connection_string

# 4. Start the server
npm start
```

This project is built with:

- Express.js
- Node.js
- MongoDB
- Mongoose

**Note:** The frontend is now a separate repository. This backend does not serve any static files or frontend assets.
