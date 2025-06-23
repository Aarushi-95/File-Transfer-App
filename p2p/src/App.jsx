import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateRoom from './routes/CreateRoom'
import Room from './routes/Room'
import Login from './routes/Login'
import Signup from './routes/Signup'
import FileTransfer from './routes/FileTransfer'
import Dashboard from './routes/Dashboard'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/room/:roomID' element={<Room />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/filetransfer' element={<FileTransfer />} />
      </Routes>
    </BrowserRouter>
   
  )
}

export default App
