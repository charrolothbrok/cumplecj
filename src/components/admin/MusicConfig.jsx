import { useState, useEffect } from 'react'
import { configDB, supabase } from '../../lib/supabase'

export default function MusicConfig() {
  const [musicaUrl, setMusicaUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    configDB.getAll().then(cfg => {
      if (cfg.musica_url) { setMusicaUrl(cfg.musica_url); setFileName(cfg.musica_nombre || cfg.musica_url.split('/').pop()) }
    })
  }, [])

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const name = `musica-${Date.now()}.${file.name.split('.').pop()}`
      const { error } = await supabase.storage.from('musica').upload(name, file, { upsert: true })
      if (error) throw error
      const { data: { publicUrl } } = supabase.storage.from('musica').getPublicUrl(name)
      setMusicaUrl(publicUrl)
      setFileName(file.name)
      await configDB.setMany({ musica_url: publicUrl, musica_nombre: file.name })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      alert('Error al subir música. Verifica que el bucket "musica" exista en Supabase Storage.')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('¿Eliminar la música?')) return
    setMusicaUrl('')
    setFileName('')
    await configDB.setMany({ musica_url: '', musica_nombre: '' })
  }

  return (
    <div>
      <h2 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", marginBottom: '5px' }}>🎵 Música de Fondo</h2>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '30px' }}>La música inicia cuando el invitado abre la invitación. Formatos: MP3, M4A, OGG • Máximo 15MB</p>

      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', maxWidth: '600px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        {musicaUrl ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: '#f0ede8', borderRadius: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: '#6b8fa3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🎵</div>
                <div>
                  <p style={{ fontWeight: 700, color: '#1a3a52', margin: 0, fontSize: '14px' }}>{fileName}</p>
                  <p style={{ color: '#6b8fa3', margin: 0, fontSize: '12px' }}>✓ Activa en la invitación</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a href={musicaUrl} target="_blank" rel="noreferrer"
                  style={{ padding: '8px 16px', background: '#6b8fa3', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>
                  ▶ Escuchar
                </a>
                <button onClick={handleDelete}
                  style={{ padding: '8px 10px', background: '#fff1f2', color: '#be123c', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
              </div>
            </div>
            <label style={{ display: 'block', padding: '12px', background: '#fdf8f0', border: '2px dashed #e0d8cc', borderRadius: '8px', textAlign: 'center', cursor: 'pointer', color: '#888', fontSize: '14px' }}>
              <input type="file" accept=".mp3,.m4a,.ogg,.wav" style={{ display: 'none' }} onChange={handleUpload} />
              ⬆️ Reemplazar música
            </label>
          </div>
        ) : (
          <label style={{ display: 'block', border: '2px dashed #d0ccc5', borderRadius: '10px', padding: '40px', textAlign: 'center', cursor: 'pointer', background: '#faf8f5' }}>
            <input type="file" accept=".mp3,.m4a,.ogg,.wav" style={{ display: 'none' }} onChange={handleUpload} />
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🎵</div>
            <p style={{ fontWeight: 700, color: '#555', margin: '0 0 8px' }}>{uploading ? 'Subiendo...' : 'Clic para subir música'}</p>
            <p style={{ color: '#aaa', margin: 0, fontSize: '13px' }}>MP3, M4A, OGG • Máximo 15MB</p>
          </label>
        )}
        {saved && <p style={{ color: '#10b981', fontWeight: 700, textAlign: 'center', marginTop: '15px' }}>✅ ¡Música guardada!</p>}
      </div>
    </div>
  )
}
