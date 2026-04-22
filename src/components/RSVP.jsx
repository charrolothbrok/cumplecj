import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function RSVP() {
  const [form, setForm] = useState({ nombre: '', telefono: '', num_personas: 1, asistira: true, restriccion_alimentaria: '', mensaje: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { error: err } = await supabase.from('confirmaciones').insert([{
        nombre: form.nombre,
        telefono: form.telefono,
        num_personas: form.num_personas,
        asistira: form.asistira,
        restriccion_alimentaria: form.restriccion_alimentaria || null,
        mensaje: form.mensaje || null
      }])
      if (err) throw err
      setSent(true)
    } catch (err) {
      console.error(err)
      setError('Ocurrió un error. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) return (
    <section style={{ padding: '80px 20px', background: 'white', textAlign: 'center' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', background: '#f5f3f0', padding: '50px', borderRadius: '12px' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
        <h2 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", marginBottom: '15px' }}>¡Gracias {form.nombre}!</h2>
        <p style={{ color: '#5a5a5a' }}>Tu confirmación fue recibida. ¡Nos vemos el 8 de Agosto!</p>
      </div>
    </section>
  )

  return (
    <section style={{ padding: '80px 20px', background: 'white' }} id="rsvp">
      <div style={{ maxWidth: '550px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", textAlign: 'center', marginBottom: '15px' }}>
          Confirma tu Asistencia
        </h2>
        <p style={{ color: '#5a5a5a', textAlign: 'center', marginBottom: '40px' }}>
          Ayúdanos a preparar una noche inolvidable
        </p>
        <form onSubmit={handleSubmit} style={{ background: '#f5f3f0', padding: '40px', borderRadius: '12px', borderTop: '4px solid #d4af37' }}>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a3a52', fontSize: '14px' }}>Tu Nombre *</label>
            <input type="text" required value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Juan García"
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', background: 'white' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a3a52', fontSize: '14px' }}>Tu Teléfono</label>
            <input type="tel" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} placeholder="+52 614 123 4567"
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', background: 'white' }} />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a3a52', fontSize: '14px' }}>¿Cuántas personas asistirán? *</label>
            <select value={form.num_personas} onChange={e => setForm({ ...form, num_personas: parseInt(e.target.value) })}
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', background: 'white' }}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} persona{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a3a52', fontSize: '14px' }}>¿Asistirás?</label>
            <div style={{ display: 'flex', gap: '12px' }}>
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
            <input type="text" value={form.restriccion_alimentaria} onChange={e => setForm({ ...form, restriccion_alimentaria: e.target.value })} placeholder="Vegetariano, sin gluten, etc."
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', background: 'white' }} />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a3a52', fontSize: '14px' }}>Mensaje para los cumpleañeros</label>
            <textarea value={form.mensaje} onChange={e => setForm({ ...form, mensaje: e.target.value })} placeholder="¡Muchas felicidades! Espero..." rows={3}
              style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', background: 'white', resize: 'vertical' }} />
          </div>

          {error && <p style={{ color: '#ef4444', marginBottom: '15px', fontSize: '14px', fontWeight: 600 }}>{error}</p>}

          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '16px', background: loading ? '#9ca3af' : '#1a3a52', color: '#d4af37', border: 'none', borderRadius: '50px', fontFamily: "'Fredoka', sans-serif", fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {loading ? 'Enviando...' : '✓ Confirmar Asistencia'}
          </button>
        </form>
      </div>
    </section>
  )
}
