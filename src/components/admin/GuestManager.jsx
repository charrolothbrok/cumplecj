import { useState, useEffect } from 'react'
import { invitadosDB } from '../../lib/supabase'

const FILTROS = ['Todos', 'Sin enviar', 'Enviadas', 'Llegaron']

export default function GuestManager() {
  const [invitados, setInvitados] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ nombre: '', familia: '', num_pases: 1, lado: 'ambos', telefono: '' })
  const [editId, setEditId] = useState(null)
  const [buscar, setBuscar] = useState('')
  const [filtro, setFiltro] = useState('Todos')

  useEffect(() => { load() }, [])
  const load = async () => { setLoading(true); setInvitados(await invitadosDB.getAll()); setLoading(false) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editId) { await invitadosDB.update(editId, form); setEditId(null) }
    else { await invitadosDB.create(form) }
    setForm({ nombre: '', familia: '', num_pases: 1, lado: 'ambos', telefono: '' })
    load()
  }

  const handleDelete = async (id) => { if (confirm('¿Eliminar?')) { await invitadosDB.delete(id); load() } }
  const handleEdit = (i) => { setEditId(i.id); setForm({ nombre: i.nombre, familia: i.familia || '', num_pases: i.num_pases, lado: i.lado || 'ambos', telefono: i.telefono || '' }) }
  const handleMarcarEnviada = async (id) => { await invitadosDB.marcarEnviada(id); load() }

  const handleWA = async (inv) => {
    await invitadosDB.marcarEnviada(inv.id)
    const msg = `¡Hola ${inv.nombre}! 🎉\n\nTe invitamos a celebrar el cumpleaños de *Chanita & Javier*.\n\n📅 8 de Agosto de 2026\n🕐 5:00 PM\n\nTu invitación personal: https://cumplecj.vercel.app\n\n¡Te esperamos con mucho cariño! 💚`
    const tel = inv.telefono ? inv.telefono.replace(/\D/g, '') : ''
    window.open(`https://wa.me/${tel}?text=${encodeURIComponent(msg)}`, '_blank')
    load()
  }

  const handleQR = (inv) => {
    const url = `https://cumplecj.vercel.app/checkin?token=${inv.token}`
    window.open(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`, '_blank')
  }

  const filtrados = invitados.filter(i => {
    const matchBuscar = i.nombre?.toLowerCase().includes(buscar.toLowerCase()) || i.familia?.toLowerCase().includes(buscar.toLowerCase())
    if (!matchBuscar) return false
    if (filtro === 'Sin enviar') return !i.invitacion_enviada
    if (filtro === 'Enviadas') return i.invitacion_enviada
    if (filtro === 'Llegaron') return i.checked_in
    return true
  })

  const stats = {
    total: invitados.length,
    pases: invitados.reduce((s, i) => s + (i.num_pases || 0), 0),
    enviadas: invitados.filter(i => i.invitacion_enviada).length,
    sinEnviar: invitados.filter(i => !i.invitacion_enviada).length,
    llegaron: invitados.filter(i => i.checked_in).length
  }

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '25px' }}>
        {[
          { label: 'Total', val: stats.total },
          { label: 'Total pases', val: stats.pases },
          { label: 'Enviadas', val: stats.enviadas, color: '#6b8fa3' },
          { label: 'Sin enviar', val: stats.sinEnviar, color: '#f59e0b' },
          { label: '✓ Llegaron', val: stats.llegaron, color: '#10b981' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', padding: '16px', borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: s.color || '#1a3a52', margin: 0, fontFamily: "'Fredoka', sans-serif" }}>{s.val}</p>
            <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Formulario agregar */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <p style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', fontWeight: 600 }}>
          {editId ? 'EDITAR INVITADO' : 'AGREGAR MANUALMENTE'}
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', alignItems: 'end' }}>
          <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required placeholder="Nombre / Familia *"
            style={{ padding: '10px 12px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }} />
          <input value={form.familia} onChange={e => setForm({ ...form, familia: e.target.value })} placeholder="Referencia"
            style={{ padding: '10px 12px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }} />
          <input value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} placeholder="Teléfono"
            style={{ padding: '10px 12px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }} />
          <select value={form.lado} onChange={e => setForm({ ...form, lado: e.target.value })}
            style={{ padding: '10px 12px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }}>
            <option value="ambos">Ambos</option>
            <option value="javier">Javier</option>
            <option value="chanita">Chanita</option>
          </select>
          <select value={form.num_pases} onChange={e => setForm({ ...form, num_pases: parseInt(e.target.value) })}
            style={{ padding: '10px 12px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }}>
            {[1,2,3,4,5,6,8,10].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button type="submit" style={{ flex: 1, padding: '10px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}>
              {editId ? 'Actualizar' : '+ Agregar'}
            </button>
            {editId && <button type="button" onClick={() => { setEditId(null); setForm({ nombre: '', familia: '', num_pases: 1, lado: 'ambos', telefono: '' }) }}
              style={{ padding: '10px 14px', background: '#f0ede8', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>✕</button>}
          </div>
        </form>
      </div>

      {/* Filtros y búsqueda */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input value={buscar} onChange={e => setBuscar(e.target.value)} placeholder="🔍 Buscar..."
          style={{ padding: '8px 14px', border: '1px solid #e0e0e0', borderRadius: '20px', fontSize: '14px', minWidth: '200px' }} />
        {FILTROS.map(f => (
          <button key={f} onClick={() => setFiltro(f)}
            style={{ padding: '7px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', background: filtro === f ? '#6b8fa3' : '#e0e0e0', color: filtro === f ? 'white' : '#555' }}>
            {f} ({f === 'Todos' ? invitados.length : f === 'Sin enviar' ? stats.sinEnviar : f === 'Enviadas' ? stats.enviadas : stats.llegaron})
          </button>
        ))}
      </div>

      {/* Lista */}
      {loading ? <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Cargando...</p> : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {filtrados.map(inv => (
            <div key={inv.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderLeft: `4px solid ${inv.checked_in ? '#10b981' : inv.invitacion_enviada ? '#6b8fa3' : '#e0e0e0'}` }}>
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: inv.checked_in ? '#d1fae5' : '#f0ede8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                    {inv.checked_in ? '✅' : '👤'}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#1a3a52', margin: 0, fontSize: '15px' }}>{inv.nombre}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                      <span style={{ background: '#f0ede8', color: '#888', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>{inv.num_pases} pase{inv.num_pases !== 1 ? 's' : ''}</span>
                      {inv.invitacion_enviada && <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>✓ Enviada</span>}
                      {inv.checked_in && <span style={{ background: '#d1fae5', color: '#065f46', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>✓ Llegó {inv.checked_in_at ? new Date(inv.checked_in_at).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : ''}</span>}
                      {inv.confirmaciones?.length > 0 && <span style={{ background: '#fce7f3', color: '#9d174d', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>✓ RSVP</span>}
                      {inv.telefono && <span style={{ color: '#888', fontSize: '12px' }}>📱 {inv.telefono}</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {!inv.invitacion_enviada && (
                    <button onClick={() => handleMarcarEnviada(inv.id)}
                      style={{ padding: '6px 12px', background: '#e8f4e8', color: '#2d7d2d', border: '1px solid #c8e6c9', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                      ✓ Enviada
                    </button>
                  )}
                  <button onClick={() => handleQR(inv)}
                    style={{ padding: '6px 12px', background: '#f0ede8', color: '#1a3a52', border: '1px solid #e0e0e0', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    QR
                  </button>
                  <button onClick={() => handleWA(inv)}
                    style={{ padding: '6px 12px', background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    WA
                  </button>
                  <button onClick={() => handleEdit(inv)}
                    style={{ padding: '6px 12px', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(inv.id)}
                    style={{ padding: '6px 10px', background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                    🗑️
                  </button>
                </div>
              </div>
              {/* RSVP details */}
              {inv.confirmaciones?.length > 0 && inv.confirmaciones.map(c => (
                <div key={c.id} style={{ padding: '12px 20px', background: '#fdf8f0', borderTop: '1px solid #f0ede8' }}>
                  {c.restriccion_alimentaria && <p style={{ fontSize: '13px', color: '#888', margin: '0 0 4px' }}>🍽️ <strong>Restricción:</strong> {c.restriccion_alimentaria}</p>}
                  {c.mensaje && <p style={{ fontSize: '13px', color: '#555', margin: 0, fontStyle: 'italic' }}>"{c.mensaje}"</p>}
                </div>
              ))}
            </div>
          ))}
          {filtrados.length === 0 && <p style={{ textAlign: 'center', color: '#888', padding: '40px' }}>No se encontraron invitados</p>}
        </div>
      )}
    </div>
  )
}
