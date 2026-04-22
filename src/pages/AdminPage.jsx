import { useState } from 'react'
import GuestManager from '../components/admin/GuestManager'
import ConfirmationsManager from '../components/admin/ConfirmationsManager'
import PhotoManager from '../components/admin/PhotoManager'
import VenueConfig from '../components/admin/VenueConfig'

const ADMIN_PASS = 'MagoAn#02'
const tabs = [
  { id: 'invitados', label: '👥 Invitados' },
  { id: 'confirmaciones', label: '✅ Confirmaciones' },
  { id: 'fotos', label: '📷 Fotos' },
  { id: 'config', label: '⚙️ Configuración' },
]

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [pass, setPass] = useState('')
  const [tab, setTab] = useState('invitados')

  const handleLogin = (e) => {
    e.preventDefault()
    if (pass === ADMIN_PASS) { setAuth(true); setPass('') }
    else alert('❌ Contraseña incorrecta')
  }

  if (!auth) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#6b8fa3' }}>
      <div style={{ background: 'white', padding: '50px', borderRadius: '12px', maxWidth: '400px', width: '100%', margin: '20px' }}>
        <h2 style={{ color: '#1a3a52', marginBottom: '8px', textAlign: 'center', fontFamily: "'Fredoka', sans-serif", fontSize: '2rem' }}>Admin</h2>
        <p style={{ color: '#5a5a5a', textAlign: 'center', marginBottom: '30px' }}>Chanita & Javier</p>
        <form onSubmit={handleLogin}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a3a52' }}>Contraseña</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••"
            style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '16px', marginBottom: '20px', boxSizing: 'border-box' }} />
          <button type="submit" style={{ width: '100%', padding: '14px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f5f3f0' }}>
      {/* Header */}
      <div style={{ background: '#1a3a52', padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: 'white', fontFamily: "'Fredoka', sans-serif", fontSize: '1.8rem', margin: 0 }}>Panel Admin</h1>
          <p style={{ color: '#d4af37', margin: 0, fontSize: '14px' }}>Cumpleaños Chanita & Javier</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <a href="/checkin" target="_blank" style={{ padding: '8px 16px', background: '#d4af37', color: '#1a3a52', borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>
            📱 Check-In
          </a>
          <button onClick={() => setAuth(false)} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
            Salir
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: 'white', borderBottom: '2px solid #e0e0e0', padding: '0 30px', display: 'flex', gap: '0', overflowX: 'auto' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '15px 20px', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', color: tab === t.id ? '#1a3a52' : '#5a5a5a', borderBottom: tab === t.id ? '3px solid #d4af37' : '3px solid transparent', whiteSpace: 'nowrap' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div style={{ padding: '30px', maxWidth: '1100px', margin: '0 auto' }}>
        {tab === 'invitados' && <GuestManager />}
        {tab === 'confirmaciones' && <ConfirmationsManager />}
        {tab === 'fotos' && <PhotoManager />}
        {tab === 'config' && <VenueConfig />}
      </div>
    </div>
  )
}
