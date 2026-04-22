import { useState } from 'react'
import GuestManager from '../components/admin/GuestManager'
import PhotoManager from '../components/admin/PhotoManager'
import VenueConfig from '../components/admin/VenueConfig'
import GiftManager from '../components/admin/GiftManager'
import MusicConfig from '../components/admin/MusicConfig'

const PASS = 'MagoAn#02'
const TABS = [
  { id: 'invitados', label: '👥 Invitados' },
  { id: 'imagenes', label: '🖼️ Imágenes' },
  { id: 'lugares', label: '📍 Lugares' },
  { id: 'regalos', label: '🎁 Regalos' },
  { id: 'musica', label: '🎵 Música' },
]

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState('')
  const [tab, setTab] = useState('invitados')

  const handleLogin = (e) => {
    e.preventDefault()
    if (pass === PASS) { setAuth(true); setPass('') }
    else alert('❌ Contraseña incorrecta')
  }

  if (!auth) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#6b8fa3', padding: '20px' }}>
      <div style={{ background: 'white', padding: '50px 40px', borderRadius: '16px', maxWidth: '380px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <h2 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", fontSize: '2rem', textAlign: 'center', margin: '0 0 5px' }}>Panel de Admin</h2>
        <p style={{ color: '#6b8fa3', textAlign: 'center', marginBottom: '35px', fontSize: '14px' }}>Chanita & Javier • 8 Agosto 2026</p>
        <form onSubmit={handleLogin}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a3a52', fontSize: '14px' }}>Contraseña</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" autoFocus
            style={{ width: '100%', padding: '13px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '16px', marginBottom: '20px', boxSizing: 'border-box', outline: 'none' }} />
          <button type="submit" style={{ width: '100%', padding: '14px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f0ede8' }}>
      {/* Header */}
      <div style={{ background: '#6b8fa3', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'white', fontFamily: "'Fredoka', sans-serif", fontSize: '1.4rem', margin: 0 }}>Panel de Administración</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '13px' }}>Chanita & Javier • 8 Agosto 2026</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="/scanner" target="_blank" style={{ padding: '8px 16px', background: '#d4af37', color: '#1a3a52', borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '13px' }}>
            📱 Scanner
          </a>
          <button onClick={() => setAuth(false)} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
            ↪ Salir
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: 'white', borderBottom: '1px solid #e0e0e0', padding: '0 20px', display: 'flex', gap: '0', overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '14px 20px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', color: tab === t.id ? '#1a3a52' : '#888', borderBottom: `3px solid ${tab === t.id ? '#6b8fa3' : 'transparent'}`, whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {tab === 'invitados' && <GuestManager />}
        {tab === 'imagenes' && <PhotoManager />}
        {tab === 'lugares' && <VenueConfig />}
        {tab === 'regalos' && <GiftManager />}
        {tab === 'musica' && <MusicConfig />}
      </div>
    </div>
  )
}
