import { useState, useEffect } from 'react'
import { fotosDB } from '../../lib/supabase'

function UploadZone({ titulo, subtitulo, tipo, multiple = false, onUpload }) {
  const [uploading, setUploading] = useState(false)
  const [fotos, setFotos] = useState([])

  useEffect(() => { loadFotos() }, [])

  const loadFotos = async () => {
    const data = await fotosDB.getAll(tipo)
    setFotos(data)
  }

  const handleFiles = async (files) => {
    setUploading(true)
    for (const file of files) {
      try {
        const url = await fotosDB.upload(file, tipo)
        await fotosDB.create({ url, tipo, orden: Date.now(), descripcion: file.name })
      } catch (e) {
        alert('Error al subir ' + file.name + '. Verifica que el bucket "fotos" exista en Supabase Storage.')
      }
    }
    await loadFotos()
    if (onUpload) onUpload()
    setUploading(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    if (files.length) handleFiles(multiple ? files : [files[0]])
  }

  const handleDelete = async (id) => {
    await fotosDB.delete(id)
    loadFotos()
  }

  return (
    <div style={{ background: 'white', padding: '25px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
      <h3 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", marginBottom: '5px' }}>{titulo}</h3>
      <p style={{ color: '#888', fontSize: '13px', marginBottom: '20px' }}>{subtitulo}</p>

      <label onDragOver={e => e.preventDefault()} onDrop={handleDrop}
        style={{ display: 'block', border: '2px dashed #d0ccc5', borderRadius: '10px', padding: '30px', textAlign: 'center', cursor: 'pointer', background: '#faf8f5', marginBottom: '15px' }}>
        <input type="file" accept="image/*" multiple={multiple} style={{ display: 'none' }}
          onChange={e => { const files = Array.from(e.target.files); if (files.length) handleFiles(multiple ? files : [files[0]]) }} />
        <div style={{ fontSize: '30px', marginBottom: '10px' }}>⬆️</div>
        <p style={{ color: '#888', margin: 0, fontWeight: 600 }}>{uploading ? 'Subiendo...' : 'Clic o arrastra las fotos aquí'}</p>
        <p style={{ color: '#aaa', margin: '5px 0 0', fontSize: '13px' }}>{multiple ? 'Múltiples fotos' : '1 imagen'} • JPG, PNG, WEBP</p>
      </label>

      {fotos.length > 0 && (
        <>
          <p style={{ color: '#888', fontSize: '13px', marginBottom: '10px' }}>{fotos.length} imagen{fotos.length !== 1 ? 'es' : ''} • Clic en 🗑️ para eliminar</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
            {fotos.map(f => (
              <div key={f.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={f.url} alt="" style={{ width: '100%', height: '100px', objectFit: 'cover' }} />
                <button onClick={() => handleDelete(f.id)}
                  style={{ position: 'absolute', top: '5px', right: '5px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '5px', padding: '3px 8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700 }}>
                  Borrar
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function PhotoManager() {
  return (
    <div>
      <h2 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", marginBottom: '5px' }}>Gestión de Imágenes</h2>
      <p style={{ color: '#f59e0b', fontSize: '13px', marginBottom: '25px' }}>⚠️ Requiere que el bucket "fotos" exista en Supabase Storage con acceso público.</p>
      <UploadZone titulo="🖼️ Galería de Recuerdos" subtitulo='Fotos que aparecen en la galería de la invitación' tipo="galeria" multiple={true} />
      <UploadZone titulo="⛪ Imagen Lugar Ceremonia" subtitulo='Foto del lugar de la misa (aparece en la card de ceremonia)' tipo="ceremonia" multiple={false} />
      <UploadZone titulo="🎉 Imagen Lugar Recepción" subtitulo='Foto del salón de fiestas (aparece en la card de recepción)' tipo="recepcion" multiple={false} />
    </div>
  )
}
