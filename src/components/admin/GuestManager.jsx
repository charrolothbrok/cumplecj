import { useState, useEffect, useRef } from 'react'
import { invitadosDB } from '../../lib/supabase'
import QRCode from 'qrcode'

const FILTROS = ['Todos', 'Sin enviar', 'Enviadas', 'Llegaron']

function QRModal({ inv, onClose }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const url = `https://cumplecj.vercel.app/checkin?token=${inv.token}`
    QRCode.toCanvas(canvasRef.current, url, { width: 200, margin: 2, color: { dark: '#1a3a52', light: '#ffffff' } })
  }, [inv])

  const handlePrint = () => {
    const canvas = canvasRef.current
    const win = window.open('', '_blank')
    win.document.write(`
      <!DOCTYPE html><html><head><title>Pase - ${inv.nombre}</title>
      <style>
        body { font-family: 'Georgia', serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f0ede8; }
        .pase { background: white; width: 340px; padding: 30px; border-radius: 16px; text-align: center; box-shadow: 0 8px 30px rgba(0,0,0,0.15); border: 1px solid #e0ddd8; }
        h1 { font-size: 22px; color: #1a3a52; margin: 0 0 5px; }
        .fecha { color: #6b8fa3; font-size: 14px; margin-bottom: 20px; }
        .nombre { font-size: 20px; font-weight: bold; color: #1a3a52; margin: 15px 0 5px; }
        .pases { color: #d4af37; font-weight: bold; font-size: 15px; margin-bottom: 15px; letter-spacing: 2px; }
        .footer { color: #aaa; font-size: 11px; margin-top: 15px; }
        .divider { height: 1px; background: #e0ddd8; margin: 15px 0; }
        img { border-radius: 8px; }
      </style></head><body>
      <div class="pase">
        <h1>Chanita & Javier</h1>
        <p class="fecha">8 · Agosto · 2026</p>
        <div class="divider"></div>
        <p class="nombre">${inv.nombre}</p>
        <p class="pases">${inv.num_pases} PASE${inv.num_pases !== 1 ? 'S' : ''}</p>
        <img src="${canvas.toDataURL()}" width="180" height="180" />
        <div class="divider"></div>
        <p class="footer">Presenta este código a la entrada</p>
        <p class="footer">Pase personal e intransferible</p>
      </div>
      <script>window.onload = function(){ window.print() }</script>
      </body></html>`)
    win.document.close()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '380px', width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <h2 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", fontSize: '1.8rem', margin: '0 0 5px' }}>Chanita & Javier</h2>
        <p style={{ color: '#6b8fa3', fontSize: '14px', margin: '0 0 20px' }}>8 · Agosto · 2026</p>
        <div style={{ height: '1px', background: '#e0ddd8', margin: '0 0 15px' }} />
        <p style={{ fontSize: '18px', fontWeight: 700, color: '#1a3a52', margin: '0 0 5px' }}>{inv.nombre}</p>
        <p style={{ color: '#d4af37', fontWeight: 700, letterSpacing: '2px', marginBottom: '15px' }}>{inv.num_pases} PASE{inv.num_pases !== 1 ? 'S' : ''}</p>
        <canvas ref={canvasRef} style={{ borderRadius: '8px', border: '1px solid #e0ddd8' }} />
        <div style={{ height: '1px', background: '#e0ddd8', margin: '15px 0 10px' }} />
        <p style={{ color: '#aaa', fontSize: '12px', margin: '0 0 3px' }}>Presenta este código a la entrada</p>
        <p style={{ color: '#aaa', fontSize: '12px', margin: '0 0 20px' }}>Pase personal e intransferible</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handlePrint} style={{ flex: 1, padding: '12px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
            🖨️ Imprimir / Guardar
          </button>
          <button onClick={onClose} style={{ padding: '12px 16px', background: '#f0ede8', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

function EditModal({ inv, onClose, onSave }) {
  const [form, setForm] = useState({ nombre: inv.nombre, familia: inv.familia || '', telefono: inv.telefono || '', num_pases: inv.num_pases, lado: inv.lado || 'ambos' })

  const handleSave = async () => {
    await invitadosDB.update(inv.id, form)
    onSave()
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <h2 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", margin: 0 }}>Editar</h2>
          <button onClick={onClose} style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'none', background: '#f0ede8', cursor: 'pointer', fontSize: '16px' }}>✕</button>
        </div>
        {[{ label: 'NOMBRE *', key: 'nombre', required: true }, { label: 'REFERENCIA', key: 'familia' }, { label: 'TELÉFONO', key: 'telefono' }].map(f => (
          <div key={f.key} style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{f.label}</label>
            <input value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} required={f.required}
              style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
        ))}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>¿INVITADO DE...?</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[{ v: 'ambos', l: '👥 Ambos' }, { v: 'javier', l: '👨 Javier' }, { v: 'chanita', l: '👵 Chanita' }].map(o => (
              <button key={o.v} type="button" onClick={() => setForm({ ...form, lado: o.v })}
                style={{ flex: 1, padding: '9px 6px', border: `2px solid ${form.lado === o.v ? '#6b8fa3' : '#e0e0e0'}`, borderRadius: '8px', background: form.lado === o.v ? '#6b8fa3' : 'white', color: form.lado === o.v ? 'white' : '#555', fontWeight: 600, cursor: 'pointer', fontSize: '13px' }}>
                {o.l}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}># PASES</label>
          <input type="number" min="1" max="20" value={form.num_pases} onChange={e => setForm({ ...form, num_pases: parseInt(e.target.value) })}
            style={{ width: '100px', padding: '10px 12px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }} />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', background: '#f0ede8', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', color: '#555' }}>
            Cancelar
          </button>
          <button onClick={handleSave} style={{ flex: 2, padding: '12px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
            💾 Guardar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function GuestManager() {
  const [invitados, setInvitados] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ nombre: '', familia: '', num_pases: 1, lado: 'ambos', telefono: '' })
  const [buscar, setBuscar] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [qrInv, setQrInv] = useState(null)
  const [editInv, setEditInv] = useState(null)

  useEffect(() => { load() }, [])
  const load = async () => { setLoading(true); setInvitados(await invitadosDB.getAll()); setLoading(false) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await invitadosDB.create(form)
    setForm({ nombre: '', familia: '', num_pases: 1, lado: 'ambos', telefono: '' })
    load()
  }

  const handleDelete = async (id) => { if (confirm('¿Eliminar?')) { await invitadosDB.delete(id); load() } }

  const handleMarcarEnviada = async (id) => { await invitadosDB.marcarEnviada(id); load() }

  const handleWA = async (inv) => {
    await invitadosDB.marcarEnviada(inv.id)
    const msg = `¡Hola ${inv.nombre}! 🎉\n\nTe invitamos a celebrar el cumpleaños de *Chanita & Javier*.\n\n📅 8 de Agosto de 2026\n🕐 5:00 PM\n\nTu invitación: https://cumplecj.vercel.app\n\nToken de entrada: *${inv.token}*\n\n¡Te esperamos con cariño! 💚`
    const tel = inv.telefono ? inv.telefono.replace(/\D/g, '') : ''
    window.open(`https://wa.me/${tel ? tel : ''}?text=${encodeURIComponent(msg)}`, '_blank')
    load()
  }

  const filtrados = invitados.filter(i => {
    const match = i.nombre?.toLowerCase().includes(buscar.toLowerCase()) || i.familia?.toLowerCase().includes(buscar.toLowerCase())
    if (!match) return false
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
      {qrInv && <QRModal inv={qrInv} onClose={() => setQrInv(null)} />}
      {editInv && <EditModal inv={editInv} onClose={() => setEditInv(null)} onSave={load} />}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '25px' }}>
        {[
          { label: 'Total', val: stats.total, color: '#1a3a52' },
          { label: 'Total pases', val: stats.pases, color: '#1a3a52' },
          { label: 'Enviadas', val: stats.enviadas, color: '#6b8fa3' },
          { label: 'Sin enviar', val: stats.sinEnviar, color: '#f59e0b' },
          { label: '✓ Llegaron', val: stats.llegaron, color: '#10b981' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', padding: '16px', borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: s.color, margin: 0, fontFamily: "'Fredoka', sans-serif" }}>{s.val}</p>
            <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <p style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', fontWeight: 700 }}>AGREGAR MANUALMENTE</p>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px', alignItems: 'end' }}>
          <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required placeholder="Nombre / Familia *"
            style={{ padding: '10px 12px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }} />
          <input value={form.familia} onChange={e => setForm({ ...form, familia: e.target.value })} placeholder="Referencia"
            style={{ padding: '10px 12px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }} />
          <input value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} placeholder="Teléfono"
            style={{ padding: '10px 12px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }} />
          <select value={form.lado} onChange={e => setForm({ ...form, lado: e.target.value })}
            style={{ padding: '10px 12px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }}>
            <option value="ambos">Ambos</option>
            <option value="javier">Javier</option>
            <option value="chanita">Chanita</option>
          </select>
          <select value={form.num_pases} onChange={e => setForm({ ...form, num_pases: parseInt(e.target.value) })}
            style={{ padding: '10px 12px', border: '1.5px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }}>
            {[1,2,3,4,5,6,8,10].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <button type="submit" style={{ padding: '10px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}>
            + Agregar
          </button>
        </form>
      </div>

      {/* Filtros */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input value={buscar} onChange={e => setBuscar(e.target.value)} placeholder="🔍 Buscar..."
          style={{ padding: '8px 14px', border: '1.5px solid #e0e0e0', borderRadius: '20px', fontSize: '14px', minWidth: '200px' }} />
        {FILTROS.map(f => {
          const count = f === 'Todos' ? invitados.length : f === 'Sin enviar' ? stats.sinEnviar : f === 'Enviadas' ? stats.enviadas : stats.llegaron
          return (
            <button key={f} onClick={() => setFiltro(f)}
              style={{ padding: '7px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', background: filtro === f ? '#6b8fa3' : '#e0e0e0', color: filtro === f ? 'white' : '#555' }}>
              {f} ({count})
            </button>
          )
        })}
      </div>

      {/* Lista */}
      {loading ? <p style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Cargando...</p> : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {filtrados.map(inv => (
            <div key={inv.id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderLeft: `4px solid ${inv.checked_in ? '#10b981' : inv.invitacion_enviada ? '#6b8fa3' : '#e0e0e0'}` }}>
              <div style={{ padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: inv.checked_in ? '#d1fae5' : '#f0ede8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                    {inv.checked_in ? '✅' : '👤'}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#1a3a52', margin: 0 }}>{inv.nombre}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '3px' }}>
                      <span style={{ background: '#f0ede8', color: '#888', padding: '1px 8px', borderRadius: '10px', fontSize: '12px' }}>{inv.num_pases} pase{inv.num_pases !== 1 ? 's' : ''}</span>
                      {inv.invitacion_enviada && <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '1px 8px', borderRadius: '10px', fontSize: '12px' }}>✓ Enviada {inv.invitacion_enviada_at ? new Date(inv.invitacion_enviada_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) : ''}</span>}
                      {inv.checked_in && <span style={{ background: '#d1fae5', color: '#065f46', padding: '1px 8px', borderRadius: '10px', fontSize: '12px' }}>✓ Llegó {inv.checked_in_at ? new Date(inv.checked_in_at).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }) : ''}</span>}
                      {inv.confirmaciones?.length > 0 && <span style={{ background: '#fce7f3', color: '#9d174d', padding: '1px 8px', borderRadius: '10px', fontSize: '12px' }}>✓ RSVP</span>}
                      {inv.telefono && <span style={{ color: '#888', fontSize: '12px' }}>📱 {inv.telefono}</span>}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {!inv.invitacion_enviada && (
                    <button onClick={() => handleMarcarEnviada(inv.id)} style={{ padding: '6px 12px', background: '#e8f5e8', color: '#2d7d2d', border: '1px solid #c8e6c9', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                      ✓ Enviada
                    </button>
                  )}
                  <button onClick={() => setQrInv(inv)} style={{ padding: '6px 12px', background: '#f0ede8', color: '#1a3a52', border: '1px solid #e0e0e0', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    QR
                  </button>
                  <button onClick={() => handleWA(inv)} style={{ padding: '6px 12px', background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    WA
                  </button>
                  <button onClick={() => setEditInv(inv)} style={{ padding: '6px 12px', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(inv.id)} style={{ padding: '6px 10px', background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>🗑️</button>
                </div>
              </div>
              {inv.confirmaciones?.length > 0 && inv.confirmaciones.map(c => (
                <div key={c.id} style={{ padding: '10px 18px', background: '#fdf8f0', borderTop: '1px solid #f0ede8' }}>
                  {c.restriccion_alimentaria && <p style={{ fontSize: '12px', color: '#888', margin: '0 0 3px' }}>🍽️ <strong>Restricción:</strong> {c.restriccion_alimentaria}</p>}
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
