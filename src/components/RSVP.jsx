import { useState } from 'react'
import { confirmacionesDB } from '../lib/supabase'

export default function RSVP() {
  const [form, setForm] = useState({ nombre: '', telefono: '', num_personas: 1, asistira: true, restriccion_alimentaria: '', mensaje: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await confirmacionesDB.create(form)
    setSent(true)
    setLoading(false)
  }

  if (sent) return (
    <section style={{ padding: '80px 20px', background: 'white', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', background: '#f5f3f0', padding: '50px', borderRadius: '12px' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
        <h2 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", marginBottom: '15px' }}>¡Gracias!</h2>
        <p style={{ color: '#5a5a5a' }}>Tu confirmación fue recibida. ¡Nos vemos el 8 de Agosto!</p>
      </div>
    </section>
  )

  return (
    <section style={{ padding: '80px 20px', background: 'white' }}>
      <div style={{ maxWidth: '550px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", textAlign: 'center', marginBottom: '15px' }}>Confirma tu Asistencia</h2>
        <p style={{ color: '#5a5a5a', textAlign: 'center', marginBottom: '40px' }}>Ayúdanos a preparar una noche inolvidable</p>
        <form onSubmit={handleSubmit} style={{ background: '#f5f3f0', padding: '40px', borderRadius: '12px', borderTop: '4px solid #d4af37' }}>
          {[
            { label: 'Tu Nombre *', key: 'nombre', type: 'text', placeholder: 'Juan García', required: true },
            { label: 'Tu Teléfono', key: 'telefono', type: 'tel', placeholder: '+52 614 123 4567', required: false },
          ].map(f => (
            <div key={f.key} style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a3a52', fontSize: '14px' }}>{f.label}</label>
              <input type={f.type} required={f.required} placeholder={f.placeholder} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', background: 'white' }} />
            </div>
          ))}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a3a52', fontSize: '14px' }}>¿Cuántas personas asistirán? *</label>
            <select value={form.num_personas} onChange={e => setForm({ ...form, num_personas: parseInt(e.target.value) })}
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', background: 'white' }}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} persona{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a3a52', fontSize: '14px' }}>¿Asistirás?</label>
            <div style={{ display: 'flex', gap: '15px' }}>
              {[{ val: true, label: '✅ Sí, asistiré' }, { val: false, label: '❌ No puedo asistir' }].map(opt => (
                <button key={String(opt.val)} type="button" onClick={() => setForm({ ...form, asistira: opt.val })}
                  style={{ flex: 1, padding: '10px', border: `2px solid ${form.asistira === opt.val ? '#6b8fa3' : '#e0e0e0'}`, borderRadius: '6px', background: form.asistira === opt.val ? '#6b8fa3' : 'white', color: form.asistira === opt.val ? 'white' : '#5a5a5a', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a3a52', fontSize: '14px' }}>Restricciones Alimentarias</label>
            <input type="text" placeholder="Vegetariano, sin gluten, etc." value={form.restriccion_alimentaria} onChange={e => setForm({ ...form, restriccion_alimentaria: e.target.value })}
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', background: 'white' }} />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a3a52', fontSize: '14px' }}>Mensaje para los cumpleañeros</label>
            <textarea placeholder="¡Muchas felicidades! Espero..." value={form.mensaje} onChange={e => setForm({ ...form, mensaje: e.target.value })}
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', background: 'white', minHeight: '100px', resize: 'vertical' }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', background: '#1a3a52', color: '#d4af37', border: 'none', borderRadius: '50px', fontFamily: "'Fredoka', sans-serif", fontWeight: 700, cursor: 'pointer', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {loading ? 'Enviando...' : '✓ Confirmar Asistencia'}
          </button>
        </form>
      </div>
    </section>
  )
}
