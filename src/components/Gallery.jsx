import { useState, useEffect } from 'react'
import { fotosDB } from '../lib/supabase'

const DEFAULTS = [
  { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400', descripcion: 'Celebración' },
  { url: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=400', descripcion: 'Familia' },
  { url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400', descripcion: 'Cumpleaños' },
]

export default function Gallery() {
  const [fotos, setFotos] = useState([])
  const [sel, setSel] = useState(null)

  useEffect(() => {
    fotosDB.getAll().then(d => setFotos(d.length > 0 ? d : DEFAULTS))
  }, [])

  return (
    <section style={{ padding: '80px 20px', background: 'white' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", textAlign: 'center', marginBottom: '15px' }}>Galería de Recuerdos</h2>
      <p style={{ color: '#5a5a5a', textAlign: 'center', marginBottom: '50px' }}>Momentos preciosos que compartiremos juntos</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', maxWidth: '1100px', margin: '0 auto' }}>
        {fotos.map((f, i) => (
          <div key={i} onClick={() => setSel(f)} style={{ borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
            <img src={f.url} alt={f.descripcion} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
          </div>
        ))}
      </div>
      {sel && (
        <div onClick={() => setSel(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <img src={sel.url} alt={sel.descripcion} style={{ maxWidth: '90%', maxHeight: '90vh', borderRadius: '8px' }} />
        </div>
      )}
    </section>
  )
}
