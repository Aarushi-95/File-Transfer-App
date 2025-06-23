import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('username', username)
        navigate('/dashboard')
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Network error')
    }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#fff'}}>
      <div style={{background:'#fff',padding:'2.5rem 2rem',borderRadius:'10px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',width:'100%',maxWidth:'340px',border:'1px solid #eee'}}>
        <h2 style={{textAlign:'center',marginBottom:'1.5rem',color:'#222',fontWeight:600}}>Login</h2>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={{padding:'0.7rem',borderRadius:'5px',border:'1px solid #ccc',fontSize:'1rem',background:'#fff',color:'#222'}} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{padding:'0.7rem',borderRadius:'5px',border:'1px solid #ccc',fontSize:'1rem',background:'#fff',color:'#222'}} />
          <button type="submit" style={{padding:'0.7rem',borderRadius:'5px',background:'#e84118',color:'#fff',fontWeight:'bold',fontSize:'1rem',border:'none',cursor:'pointer',marginTop:'0.5rem'}}>Login</button>
        </form>
        {error && <p style={{color:'#e84118',marginTop:'1rem',textAlign:'center'}}>{error}</p>}
        <p style={{marginTop:'1.5rem',textAlign:'center',fontSize:'0.95rem'}}>Don't have an account? <a href="/signup" style={{color:'#0097e6',textDecoration:'none'}}>Sign up</a></p>
      </div>
    </div>
  )
}

export default Login 