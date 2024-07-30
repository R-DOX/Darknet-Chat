const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const ACCESS_KEY = process.env.ACCESS_KEY;  // Access the key from the .env file

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('New user connected');

    // Handle login event
    socket.on('login', (data) => {
        const { username, key } = data;
        console.log(`Received key: ${key}`);  // Debug log
        console.log(`Stored key: ${ACCESS_KEY}`);  // Debug log

        if (key === ACCESS_KEY) {
            socket.emit('loginSuccess', { username });
            console.log(`${username} logged in successfully.`);
        } else {
            socket.emit('loginFailed', 'Invalid access key');
            console.log(`Failed login attempt with key: ${key}`);
        }
    });

    // Handle chat message event
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
