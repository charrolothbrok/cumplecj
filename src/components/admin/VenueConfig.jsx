import { useState, useEffect } from 'react'
import { configDB } from '../../lib/supabase'

const campos = [
  { key: 'misa_lugar', label: 'Lugar de la Misa', placeholder: 'Iglesia Central' },
  { key: 'misa_hora', label: 'Hora de la Misa', placeholder: '7:00 AM' },
  { key: 'misa_direccion', label: 'Dirección de la Misa', placeholder: 'Av. Principal 456' },
  { key: 'salon_nombre', label: 'Nombre del Salón', placeholder: 'Salón Los Girasoles' },
  { key: 'salon_direccion', label: 'Dirección del Salón', placeholder: 'Calle Principal 123' },
  { key: 'salon_hora', label: 'Hora de la Recepción', placeholder: '5:00 PM' },
  { key: 'salon_maps', label: 'Link de Google Maps', placeholder: 'https://maps.google.com/...' },
  { key: 'fecha_evento', label: 'Fecha del Evento', placeholder: '8 de Agosto de 2026' },
]

export default function VenueConfig() {
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)

  useEffect(() => { load() }, [])

  const load = async () => {
    setLoading(true)
    const all = await configDB.getAll()
    const obj = {}
    all.forEach(c => { obj[c.clave] = c.valor })
    setConfig(obj)
    setLoading(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    for (const [k, v] of Object.entries(config)) {
      await configDB.set(k, v)
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (loading) return <p>Cargando configuración...</p>

  return (
    <div>
      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ color: '#1a3a52', marginBottom: '25px', fontFamily: "'Fredoka', sans-serif" }}>⚙️ Configuración del Evento</h3>
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {campos.map(c => (
              <div key={c.key}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '13px', color: '#1a3a52' }}>{c.label}</label>
                <input
                  value={config[c.key] || ''}
                  onChange={e => setConfig({ ...config, [c.key]: e.target.value })}
                  placeholder={c.placeholder}
                  style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', boxSizing: 'border-box', fontSize: '14px' }}
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button type="submit" style={{ padding: '12px 30px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '15px' }}>
              💾 Guardar Configuración
            </button>
            {saved && <span style={{ color: '#4caf50', fontWeight: 700 }}>✅ ¡Guardado correctamente!</span>}
          </div>
        </form>
      </div>
    </div>
  )
}
