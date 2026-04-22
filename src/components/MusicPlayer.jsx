import { useState } from 'react'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 999 }}>
      <button onClick={() => setPlaying(!playing)}
        style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#d4af37', border: 'none', fontSize: '20px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(212,175,55,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {playing ? '⏸️' : '▶️'}
      </button>
    </div>
  )
}
