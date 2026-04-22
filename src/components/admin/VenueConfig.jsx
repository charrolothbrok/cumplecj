import { useState, useEffect } from 'react'
import { configDB } from '../../lib/supabase'

export default function VenueConfig() {
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => { configDB.getAll().then(c => { setConfig(c); setLoading(false) }) }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    await configDB.setMany(config)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Cargando...</p>

  const Campo = ({ label, clave, placeholder }) => (
    <div>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{label}</label>
      <input value={config[clave] || ''} onChange={e => setConfig({ ...config, [clave]: e.target.value })} placeholder={placeholder}
        style={{ width: '100%', padding: '10px 12px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', background: '#faf8f5' }} />
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", margin: 0 }}>Lugares del Evento</h2>
        <button onClick={handleSave} style={{ padding: '10px 25px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          💾 {saved ? '¡Guardado!' : 'Guardar'}
        </button>
      </div>

      <form onSubmit={handleSave}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
          {/* Ceremonia */}
          <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', border: '1px solid #e8dcc8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '28px' }}>⛪</span>
              <h3 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", margin: 0 }}>Ceremonia Religiosa</h3>
            </div>
            <div style={{ display: 'grid', gap: '15px' }}>
              <Campo label="Nombre del Lugar" clave="misa_lugar" placeholder="Iglesia de los Festejos" />
              <Campo label="Dirección" clave="misa_direccion" placeholder="Av. Principal 456, Centro" />
              <Campo label="Hora" clave="misa_hora" placeholder="7:00 AM" />
              <Campo label="Link de Ubicación (Google Maps / Waze)" clave="misa_maps" placeholder="https://maps.app.goo.gl/..." />
              {config.misa_maps && <a href={config.misa_maps} target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#6b8fa3' }}>↗ Verificar link</a>}
            </div>
          </div>

          {/* Recepción */}
          <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', border: '1px solid #e8dcc8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '28px' }}>🎉</span>
              <h3 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", margin: 0 }}>Recepción y Fiesta</h3>
            </div>
            <div style={{ display: 'grid', gap: '15px' }}>
              <Campo label="Nombre del Lugar" clave="salon_nombre" placeholder="Salón Los Girasoles" />
              <Campo label="Dirección" clave="salon_direccion" placeholder="Calle Principal 123, Centro" />
              <Campo label="Hora" clave="salon_hora" placeholder="5:00 PM" />
              <Campo label="Link de Ubicación (Google Maps / Waze)" clave="salon_maps" placeholder="https://maps.app.goo.gl/..." />
              {config.salon_maps && <a href={config.salon_maps} target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#6b8fa3' }}>↗ Verificar link</a>}
            </div>
          </div>
        </div>

        <p style={{ color: '#888', fontSize: '13px', marginTop: '20px' }}>
          📍 ¿Cómo obtener el link de Google Maps? Busca el lugar → clic en "Compartir" → "Copiar enlace".
        </p>
      </form>
    </div>
  )
}
