# File Transfer App

A real-time file transfer application built with React, Node.js, Express.js, and Socket.IO.

## Features

- User signup and login
- Dashboard with:
  - Room creation (generates unique Room ID)
  - Join room using Room ID
- Real-time file transfer between users
- Progress bar shown during file transfer
- Receiver can download the transferred file

## Tech Stack

- Frontend: React.js
- Backend: Node.js + Express.js
- Real-time Communication: Socket.IO
- Authentication: Custom login/signup

## Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/File-Transfer-App.git

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install

# Start the server
cd ../server && npm start

# Start the client
cd ../client && npm run dev
