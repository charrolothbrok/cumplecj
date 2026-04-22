import { useState, useEffect, useRef } from 'react'
import { invitadosDB } from '../lib/supabase'

export default function ScannerPage() {
  const [invitados, setInvitados] = useState([])
  const [buscar, setBuscar] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [loading, setLoading] = useState(true)
  const [scanning, setScanning] = useState(false)
  const [resultado, setResultado] = useState(null)
  const intervalRef = useRef(null)
  const scannerRef = useRef(null)
  const html5QrcodeRef = useRef(null)

  useEffect(() => {
    load()
    intervalRef.current = setInterval(load, 15000)
    return () => {
      clearInterval(intervalRef.current)
      stopScanner()
    }
  }, [])

  const load = async () => {
    const data = await invitadosDB.getAll()
    setInvitados(data)
    setLoading(false)
  }

  const startScanner = async () => {
    setScanning(true)
    setResultado(null)
    try {
      const { Html5Qrcode } = await import('html5-qrcode')
      html5QrcodeRef.current = new Html5Qrcode('qr-reader')
      await html5QrcodeRef.current.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        async (decodedText) => {
          await stopScanner()
          const token = decodedText.includes('token=') ? decodedText.split('token=')[1] : decodedText.trim().toUpperCase()
          await processToken(token)
        },
        () => {}
      )
    } catch (e) {
      setScanning(false)
      alert('No se pudo acceder a la cámara. Usa el ingreso manual.')
    }
  }

  const stopScanner = async () => {
    if (html5QrcodeRef.current) {
      try { await html5QrcodeRef.current.stop() } catch {}
      html5QrcodeRef.current = null
    }
    setScanning(false)
  }

  const processToken = async (token) => {
    const data = await invitadosDB.checkIn(token)
    if (data && data.length > 0) {
      setResultado({ ok: true, invitado: data[0] })
    } else {
      setResultado({ ok: false, msg: 'Token no encontrado o ya fue registrado' })
    }
    load()
    setTimeout(() => setResultado(null), 5000)
  }

  const handleManual = async () => {
    const token = prompt('Ingresa el token del invitado:')
    if (token) await processToken(token.trim().toUpperCase())
  }

  const handleUndo = async (id) => {
    await invitadosDB.undoCheckIn(id)
    load()
  }

  const llegaron = invitados.filter(i => i.checked_in)
  const pendientes = invitados.filter(i => !i.checked_in)
  const totalPersonas = llegaron.reduce((s, i) => s + (i.num_pases || 0), 0)
  const pct = invitados.length > 0 ? Math.round((llegaron.length / invitados.length) * 100) : 0

  const filtrados = invitados.filter(i => {
    const match = i.nombre?.toLowerCase().includes(buscar.toLowerCase()) || i.familia?.toLowerCase().includes(buscar.toLowerCase())
    if (!match) return false
    if (filtro === '✓ Llegaron') return i.checked_in
    if (filtro === '✗ Pendientes') return !i.checked_in
    return true
  })

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a href="/admin" style={{ color: '#6b8fa3', textDecoration: 'none', fontSize: '22px', fontWeight: 700 }}>←</a>
          <div>
            <h1 style={{ fontFamily: "'Fredoka', sans-serif", fontSize: '1.5rem', margin: 0 }}>Control de Acceso 📋</h1>
            <p style={{ color: '#64748b', margin: 0, fontSize: '13px' }}>{new Date().toLocaleTimeString('es-MX')} · {new Date().toLocaleDateString('es-MX')}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={scanning ? stopScanner : startScanner}
            style={{ padding: '10px 18px', background: scanning ? '#ef4444' : '#6b8fa3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>
            {scanning ? '⏹️ Detener' : '📷 Escanear QR'}
          </button>
          <button onClick={handleManual} style={{ padding: '10px 16px', background: '#1e293b', color: 'white', border: '1px solid #334155', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '14px' }}>
            ⌨️ Token
          </button>
          <button onClick={load} style={{ padding: '10px 14px', background: '#1e293b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px' }}>🔄</button>
        </div>
      </div>

      {/* Scanner de cámara */}
      {scanning && (
        <div style={{ marginBottom: '20px', background: '#1e293b', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
          <div id="qr-reader" style={{ maxWidth: '400px', margin: '0 auto' }} />
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '10px' }}>Apunta la cámara al código QR del invitado</p>
        </div>
      )}

      {/* Resultado check-in */}
      {resultado && (
        <div style={{ marginBottom: '20px', padding: '20px', borderRadius: '12px', background: resultado.ok ? '#064e3b' : '#7f1d1d', textAlign: 'center', fontSize: '16px', fontWeight: 700 }}>
          {resultado.ok ? (
            <>
              <p style={{ margin: '0 0 5px', fontSize: '24px' }}>✅ ¡Bienvenido!</p>
              <p style={{ margin: '0 0 3px' }}>{resultado.invitado.nombre}</p>
              <p style={{ color: '#6ee7b7', margin: 0, fontSize: '14px' }}>{resultado.invitado.num_pases} pase(s) autorizados</p>
            </>
          ) : (
            <p style={{ margin: 0 }}>❌ {resultado.msg}</p>
          )}
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
        {[
          { label: 'Total familias', val: invitados.length },
          { label: 'Ya llegaron', val: llegaron.length, color: '#10b981' },
          { label: 'Pendientes', val: pendientes.length, color: '#f59e0b' },
          { label: 'Personas hoy', val: totalPersonas, color: '#6b8fa3' },
        ].map(s => (
          <div key={s.label} style={{ background: '#1e293b', padding: '14px', borderRadius: '10px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: s.color || 'white', margin: 0, fontFamily: "'Fredoka', sans-serif" }}>{s.val}</p>
            <p style={{ color: '#64748b', fontSize: '11px', margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Barra progreso */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ color: '#64748b', fontSize: '13px' }}>Asistencia</span>
          <span style={{ color: '#10b981', fontWeight: 700 }}>{pct}%</span>
        </div>
        <div style={{ height: '8px', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: '#10b981', transition: 'width 0.5s' }} />
        </div>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <input value={buscar} onChange={e => setBuscar(e.target.value)} placeholder="🔍 Buscar nombre o familia..."
          style={{ flex: 1, minWidth: '200px', padding: '10px 14px', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: 'white', fontSize: '14px', outline: 'none' }} />
        {['Todos', '✓ Llegaron', '✗ Pendientes'].map(f => (
          <button key={f} onClick={() => setFiltro(f)}
            style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', background: filtro === f ? '#6b8fa3' : '#1e293b', color: filtro === f ? 'white' : '#64748b' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Lista */}
      {loading ? <p style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>Cargando...</p> : (
        <div style={{ display: 'grid', gap: '8px' }}>
          {filtrados.map(inv => (
            <div key={inv.id} style={{ background: '#1e293b', borderRadius: '10px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: `4px solid ${inv.checked_in ? '#10b981' : '#334155'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '22px' }}>{inv.checked_in ? '✅' : '⏳'}</span>
                <div>
                  <p style={{ fontWeight: 700, color: 'white', margin: 0 }}>{inv.nombre}</p>
                  {inv.checked_in && <p style={{ color: '#10b981', margin: 0, fontSize: '12px' }}>✓ Entró a las {inv.checked_in_at ? new Date(inv.checked_in_at).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : ''}</p>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ background: '#334155', color: '#94a3b8', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 700 }}>{inv.num_pases} pases</span>
                {inv.checked_in && (
                  <button onClick={() => handleUndo(inv.id)} style={{ padding: '5px 12px', background: '#7f1d1d', color: '#fca5a5', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>
                    Deshacer
                  </button>
                )}
              </div>
            </div>
          ))}
          {filtrados.length === 0 && <p style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>No se encontraron invitados</p>}
        </div>
      )}

      <p style={{ textAlign: 'center', color: '#334155', fontSize: '12px', marginTop: '20px' }}>
        Hora en zona horaria México · Auto-actualiza cada 15 segundos
      </p>
    </div>
  )
}
