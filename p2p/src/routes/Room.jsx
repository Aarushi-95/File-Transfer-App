import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function Room() {
    const { roomID } = useParams();

    useEffect(() => {
        if (roomID) {
            socket.emit('join-room', roomID);
        }
    }, [roomID]);

    return (
        <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#fff'}}>
          <div style={{background:'#fff',padding:'2.5rem 2rem',borderRadius:'10px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',width:'100%',maxWidth:'400px',border:'1px solid #eee'}}>
            <h2 style={{textAlign:'center',marginBottom:'1.2rem',color:'#222',fontWeight:600}}>Room</h2>
            {roomID && (
              <div style={{marginBottom:'1.5rem',textAlign:'center'}}>
                <span style={{fontWeight:500}}>Room ID:</span>
                <div style={{fontFamily:'monospace',marginTop:'0.3rem',wordBreak:'break-all',color:'#0097e6',fontSize:'1.1rem'}}>{roomID}</div>
              </div>
            )}
          </div>
        </div>
    );
}

export default Room;