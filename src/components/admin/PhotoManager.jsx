import { useState, useEffect } from 'react'
import { fotosDB } from '../../lib/supabase'

export default function PhotoManager() {
  const [fotos, setFotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [url, setUrl] = useState('')
  const [descripcion, setDescripcion] = useState('')

  useEffect(() => { load() }, [])
  const load = async () => { setLoading(true); setFotos(await fotosDB.getAll()); setLoading(false) }

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!url) return
    await fotosDB.create({ url, descripcion, orden: fotos.length + 1 })
    setUrl(''); setDescripcion(''); load()
  }

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar foto?')) { await fotosDB.delete(id); load() }
  }

  return (
    <div>
      <div style={{ background: 'white', padding: '25px', borderRadius: '10px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ color: '#1a3a52', marginBottom: '20px', fontFamily: "'Fredoka', sans-serif" }}>📷 Agregar Foto</h3>
        <form onSubmit={handleAdd} style={{ display: 'grid', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, fontSize: '13px', color: '#1a3a52' }}>URL de la imagen *</label>
            <input value={url} onChange={e => setUrl(e.target.value)} required placeholder="https://ejemplo.com/foto.jpg"
              style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, fontSize: '13px', color: '#1a3a52' }}>Descripción</label>
            <input value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción opcional"
              style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', boxSizing: 'border-box' }} />
          </div>
          <p style={{ color: '#5a5a5a', fontSize: '13px', margin: 0 }}>💡 Puedes usar imágenes de Google Fotos, Imgur o cualquier URL pública</p>
          <button type="submit" style={{ padding: '10px 20px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', width: 'fit-content' }}>
            Agregar Foto
          </button>
        </form>
      </div>
      <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ color: '#1a3a52', marginBottom: '20px', fontFamily: "'Fredoka', sans-serif" }}>Galería ({fotos.length} fotos)</h3>
        {loading ? <p>Cargando...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
            {fotos.map(f => (
              <div key={f.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img src={f.url} alt={f.descripcion} style={{ width: '100%', height: '150px', objectFit: 'cover' }} onError={e => { e.target.src = 'https://via.placeholder.com/180x150?text=Error' }} />
                <button onClick={() => handleDelete(f.id)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(198,40,40,0.9)', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px' }}>🗑️</button>
                {f.descripcion && <p style={{ padding: '8px', fontSize: '12px', color: '#5a5a5a', margin: 0, background: 'white' }}>{f.descripcion}</p>}
              </div>
            ))}
            {fotos.length === 0 && <p style={{ color: '#5a5a5a' }}>No hay fotos aún</p>}
          </div>
        )}
      </div>
    </div>
  )
}
