import { useState } from 'react'
import { invitadosDB } from '../lib/supabase'

export default function CheckInPage() {
  const [token, setToken] = useState('')
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCheckIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResultado(null)
    try {
      const data = await invitadosDB.checkIn(token)
      if (data && data.length > 0) {
        setResultado({ ok: true, invitado: data[0] })
      } else {
        setResultado({ ok: false, msg: 'Token no encontrado o ya registrado' })
      }
    } catch {
      setResultado({ ok: false, msg: 'Error al registrar entrada' })
    } finally {
      setLoading(false)
      setToken('')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1a3a52', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', padding: '50px', borderRadius: '12px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", marginBottom: '10px' }}>Check-In</h1>
        <p style={{ color: '#5a5a5a', marginBottom: '30px' }}>Cumpleaños Chanita & Javier</p>
        <form onSubmit={handleCheckIn}>
          <input
            type="text"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="Token del invitado"
            required
            style={{ width: '100%', padding: '12px', border: '2px solid #d4af37', borderRadius: '6px', fontSize: '16px', marginBottom: '15px', boxSizing: 'border-box' }}
          />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Registrando...' : 'Registrar Entrada'}
          </button>
        </form>
        {resultado && (
          <div style={{ marginTop: '20px', padding: '20px', borderRadius: '8px', background: resultado.ok ? '#e8f5e9' : '#ffebee' }}>
            {resultado.ok ? (
              <>
                <p style={{ color: '#2e7d32', fontWeight: 700, fontSize: '18px' }}>✅ ¡Bienvenido!</p>
                <p style={{ color: '#2e7d32' }}>{resultado.invitado.nombre}</p>
                <p style={{ color: '#5a5a5a', fontSize: '14px' }}>{resultado.invitado.num_pases} pase(s)</p>
              </>
            ) : (
              <p style={{ color: '#c62828', fontWeight: 700 }}>❌ {resultado.msg}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
