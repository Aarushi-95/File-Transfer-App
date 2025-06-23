import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { useLocation, useNavigate } from 'react-router-dom'

const socket = io('http://localhost:5000')

function FileTransfer() {
  const [room, setRoom] = useState('')
  const [joined, setJoined] = useState(false)
  const [file, setFile] = useState(null)
  const [receivedFile, setReceivedFile] = useState(null)
  const [receivedFileName, setReceivedFileName] = useState('')
  const [sending, setSending] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef()
  const location = useLocation()
  const navigate = useNavigate()

  // Restrict access to logged-in users only
  useEffect(() => {
    const username = localStorage.getItem('username')
    if (!username) {
      navigate('/login')
    }
  }, [navigate])

  // Helper to get query params
  function getQueryParam(name) {
    return new URLSearchParams(location.search).get(name)
  }

  useEffect(() => {
    socket.on('joined-room', (roomId) => {
      setJoined(true)
    })
    socket.on('receive-file', ({ fileName, fileBuffer, from }) => {
      setReceivedFileName(fileName)
      setReceivedFile(fileBuffer)
    })
    return () => {
      socket.off('joined-room')
      socket.off('receive-file')
    }
  }, [])

  // Auto-join room if room param is present
  useEffect(() => {
    const roomParam = getQueryParam('room')
    if (roomParam && !joined) {
      setRoom(roomParam)
      socket.emit('join-room', roomParam)
    }
    // eslint-disable-next-line
  }, [location.search])

  const joinRoom = () => {
    if (room) {
      socket.emit('join-room', room)
    }
  }

  const sendFile = () => {
    if (file && room) {
      const reader = new FileReader()
      reader.onload = function(e) {
        const arrayBuffer = e.target.result
        setSending(true)
        setProgress(0)
        // Simulate progress for demo (since socket.io sends all at once)
        let fakeProgress = 0
        const interval = setInterval(() => {
          fakeProgress += 10
          setProgress(Math.min(fakeProgress, 100))
          if (fakeProgress >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setSending(false)
              setProgress(0)
            }, 500)
          }
        }, 50)
        socket.emit('send-file', {
          fileName: file.name,
          fileBuffer: arrayBuffer,
          roomId: room
        })
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const downloadReceivedFile = () => {
    if (receivedFile) {
      const blob = new Blob([new Uint8Array(receivedFile)])
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = receivedFileName
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#fff'}}>
      <div style={{background:'#fff',padding:'2.5rem 2rem',borderRadius:'10px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',width:'100%',maxWidth:'400px',border:'1px solid #eee'}}>
        <h2 style={{textAlign:'center',marginBottom:'1.2rem',color:'#222',fontWeight:600}}>File Transfer</h2>
        {!joined ? (
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            <input type="text" placeholder="Room ID" value={room} onChange={e => setRoom(e.target.value)} style={{padding:'0.7rem',borderRadius:'5px',border:'1px solid #ccc',fontSize:'1rem',background:'#fff',color:'#222'}} />
            <button onClick={joinRoom} style={{padding:'0.7rem',borderRadius:'5px',background:'#0097e6',color:'#fff',fontWeight:'bold',fontSize:'1rem',border:'none',cursor:'pointer'}}>Join Room</button>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
            <p style={{textAlign:'center',margin:'0 0 0.5rem 0',color:'#222'}}>Joined room: <span style={{color:'#e84118'}}>{room}</span></p>
            <input type="file" ref={fileInputRef} onChange={e => setFile(e.target.files[0])} style={{padding:'0.7rem',borderRadius:'5px',border:'1px solid #ccc',background:'#fff',color:'#222'}} disabled={sending} />
            <button onClick={sendFile} style={{padding:'0.7rem',borderRadius:'5px',background:'#e84118',color:'#fff',fontWeight:'bold',fontSize:'1rem',border:'none',cursor:'pointer'}} disabled={sending}>Send File</button>
            {sending && (
              <div style={{marginTop:'0.5rem'}}>
                <div style={{height:'8px',width:'100%',background:'#eee',borderRadius:'4px',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${progress}%`,background:'#0097e6',transition:'width 0.2s'}}></div>
                </div>
                <div style={{textAlign:'center',fontSize:'0.95rem',marginTop:'0.3rem',color:'#0097e6'}}>{progress}%</div>
              </div>
            )}
          </div>
        )}
        {receivedFile && (
          <div style={{marginTop:'1.5rem',textAlign:'center'}}>
            <p style={{marginBottom:'0.5rem',color:'#222'}}>Received file: <span style={{color:'#0097e6'}}>{receivedFileName}</span></p>
            <button onClick={downloadReceivedFile} style={{padding:'0.7rem',borderRadius:'5px',background:'#0097e6',color:'#fff',fontWeight:'bold',fontSize:'1rem',border:'none',cursor:'pointer'}}>Download</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileTransfer 