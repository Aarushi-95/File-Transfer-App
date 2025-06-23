const express = require('express')
const http = require('http')
const app = express()
const path = require('path')
const server = http.createServer(app)
const socket = require('socket.io')
const cors = require('cors')

// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// Middleware for JSON parsing
app.use(express.json())

// In-memory user storage
const users = {} // { username: password }

// Signup route
app.post('/signup', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' })
    }
    if (users[username]) {
        return res.status(409).json({ message: 'User already exists' })
    }
    users[username] = password
    res.status(201).json({ message: 'Signup successful' })
})

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' })
    }
    if (users[username] !== password) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }
    res.status(200).json({ message: 'Login successful' })
})

const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
})

// Socket.io file transfer logic
io.on('connection', (socket) => {
    // When a client wants to send a file
    socket.on('send-file', ({ fileName, fileBuffer, roomId }) => {
        // Broadcast the file to all users in the room except the sender
        socket.to(roomId).emit('receive-file', {
            fileName,
            fileBuffer,
            from: socket.id
        })
    })

    // Join a room (for direct file transfer)
    socket.on('join-room', (roomId) => {
        socket.join(roomId)
        socket.emit('joined-room', roomId)
    })

    socket.on('disconnect', () => {
        // Handle disconnect if needed
    })
})

server.listen(5000, () => {
    console.log('App is listening on port 5000')
})