import { useNavigate } from 'react-router-dom';
import { v1 as uuid } from 'uuid';

function Dashboard() {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const id = uuid();
    navigate(`/filetransfer?room=${id}`);
  };

  const handleJoinRoom = () => {
    navigate('/filetransfer');
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#fff'}}>
      <div style={{background:'#fff',padding:'2.5rem 2rem',borderRadius:'10px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',width:'100%',maxWidth:'350px',border:'1px solid #eee',display:'flex',flexDirection:'column',alignItems:'center',gap:'2rem'}}>
        <h2 style={{textAlign:'center',marginBottom:'1.5rem',color:'#222',fontWeight:600}}>Welcome!</h2>
        <button onClick={handleCreateRoom} style={{padding:'0.9rem 1.2rem',borderRadius:'6px',background:'#e84118',color:'#fff',fontWeight:'bold',fontSize:'1.1rem',border:'none',cursor:'pointer',width:'100%'}}>Create Room</button>
        <button onClick={handleJoinRoom} style={{padding:'0.9rem 1.2rem',borderRadius:'6px',background:'#0097e6',color:'#fff',fontWeight:'bold',fontSize:'1.1rem',border:'none',cursor:'pointer',width:'100%'}}>Join Room</button>
      </div>
    </div>
  );
}

export default Dashboard; 