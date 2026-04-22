import { useState, useEffect } from 'react'
import { confirmacionesDB } from '../../lib/supabase'

export default function ConfirmationsManager() {
  const [confs, setConfs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { load() }, [])
  const load = async () => { setLoading(true); setConfs(await confirmacionesDB.getAll()); setLoading(false) }

  const asisten = confs.filter(c => c.asistira)
  const noAsisten = confs.filter(c => !c.asistira)
  const totalPersonas = asisten.reduce((s, c) => s + (c.num_personas || 0), 0)

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        {[
          { label: 'Total Respuestas', val: confs.length, color: '#6b8fa3' },
          { label: 'Confirmaron Sí', val: asisten.length, color: '#4caf50' },
          { label: 'No Asisten', val: noAsisten.length, color: '#f44336' },
          { label: 'Total Personas', val: totalPersonas, color: '#d4af37' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: `3px solid ${s.color}`, textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: s.color, margin: 0 }}>{s.val}</p>
            <p style={{ fontSize: '12px', color: '#5a5a5a', margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ color: '#1a3a52', marginBottom: '20px', fontFamily: "'Fredoka', sans-serif" }}>Confirmaciones Recibidas</h3>
        {loading ? <p style={{ textAlign: 'center' }}>Cargando...</p> : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {confs.map(c => (
              <div key={c.id} style={{ padding: '20px', border: `2px solid ${c.asistira ? '#c8e6c9' : '#ffcdd2'}`, borderRadius: '10px', background: c.asistira ? '#f1f8e9' : '#fff5f5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <p style={{ fontWeight: 700, color: '#1a3a52', margin: '0 0 5px 0' }}>{c.nombre}</p>
                    <p style={{ color: '#5a5a5a', fontSize: '14px', margin: 0 }}>{c.telefono} • {c.num_personas} persona(s)</p>
                  </div>
                  <span style={{ background: c.asistira ? '#4caf50' : '#f44336', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, height: 'fit-content' }}>
                    {c.asistira ? '✅ Asiste' : '❌ No asiste'}
                  </span>
                </div>
                {c.restriccion_alimentaria && <p style={{ marginTop: '10px', fontSize: '13px', color: '#5a5a5a' }}>🍽️ {c.restriccion_alimentaria}</p>}
                {c.mensaje && <p style={{ marginTop: '10px', fontSize: '14px', color: '#1a3a52', fontStyle: 'italic', padding: '10px', background: 'rgba(0,0,0,0.03)', borderRadius: '6px' }}>"{c.mensaje}"</p>}
                <p style={{ marginTop: '8px', fontSize: '12px', color: '#999', margin: '10px 0 0' }}>{new Date(c.created_at).toLocaleDateString('es-MX')}</p>
              </div>
            ))}
            {confs.length === 0 && <p style={{ textAlign: 'center', color: '#5a5a5a', padding: '30px' }}>Sin confirmaciones aún</p>}
          </div>
        )}
      </div>
    </div>
  )
}
