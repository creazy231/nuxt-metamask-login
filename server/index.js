import express from 'express';

// Create express instnace
const app = express();

// Require API routes
import users from'./routes/users';

// Import API Routes
app.use(users);

// Export the server middleware
module.exports = {
    path: '/api',
    handler: app
};