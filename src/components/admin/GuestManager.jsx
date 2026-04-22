import { useState, useEffect } from 'react'
import { invitadosDB } from '../../lib/supabase'

export default function GuestManager() {
  const [invitados, setInvitados] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ nombre: '', familia: '', num_pases: 1, lado: 'ambos' })
  const [editId, setEditId] = useState(null)
  const [buscar, setBuscar] = useState('')

  useEffect(() => { load() }, [])

  const load = async () => {
    setLoading(true)
    setInvitados(await invitadosDB.getAll())
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = Math.random().toString(36).substr(2, 8).toUpperCase()
    if (editId) {
      await invitadosDB.update(editId, form)
      setEditId(null)
    } else {
      await invitadosDB.create({ ...form, token, checked_in: false })
    }
    setForm({ nombre: '', familia: '', num_pases: 1, lado: 'ambos' })
    load()
  }

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar invitado?')) { await invitadosDB.delete(id); load() }
  }

  const handleEdit = (inv) => {
    setEditId(inv.id)
    setForm({ nombre: inv.nombre, familia: inv.familia || '', num_pases: inv.num_pases, lado: inv.lado || 'ambos' })
  }

  const filtrados = invitados.filter(i => i.nombre?.toLowerCase().includes(buscar.toLowerCase()))
  const asistieron = invitados.filter(i => i.checked_in).length

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        {[
          { label: 'Total Invitados', val: invitados.length, color: '#6b8fa3' },
          { label: 'Pases Totales', val: invitados.reduce((s, i) => s + (i.num_pases || 0), 0), color: '#d4af37' },
          { label: 'Check-In', val: asistieron, color: '#4caf50' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: `3px solid ${s.color}`, textAlign: 'center' }}>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: s.color, margin: 0 }}>{s.val}</p>
            <p style={{ fontSize: '12px', color: '#5a5a5a', margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Formulario */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '10px', marginBottom: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h3 style={{ color: '#1a3a52', marginBottom: '20px', fontFamily: "'Fredoka', sans-serif" }}>{editId ? '✏️ Editar Invitado' : '➕ Agregar Invitado'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, fontSize: '13px', color: '#1a3a52' }}>Nombre *</label>
            <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required placeholder="Juan García"
              style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, fontSize: '13px', color: '#1a3a52' }}>Familia</label>
            <input value={form.familia} onChange={e => setForm({ ...form, familia: e.target.value })} placeholder="Familia García"
              style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, fontSize: '13px', color: '#1a3a52' }}>Pases</label>
            <select value={form.num_pases} onChange={e => setForm({ ...form, num_pases: parseInt(e.target.value) })}
              style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', boxSizing: 'border-box' }}>
              {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 600, fontSize: '13px', color: '#1a3a52' }}>Lado</label>
            <select value={form.lado} onChange={e => setForm({ ...form, lado: e.target.value })}
              style={{ width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '6px', boxSizing: 'border-box' }}>
              <option value="ambos">Ambos</option>
              <option value="javier">Javier</option>
              <option value="chanita">Chanita</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <button type="submit" style={{ flex: 1, padding: '10px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
              {editId ? 'Actualizar' : 'Agregar'}
            </button>
            {editId && <button type="button" onClick={() => { setEditId(null); setForm({ nombre: '', familia: '', num_pases: 1, lado: 'ambos' }) }}
              style={{ padding: '10px 15px', background: '#e0e0e0', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>✕</button>}
          </div>
        </form>
      </div>

      {/* Lista */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <h3 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", margin: 0 }}>Lista de Invitados</h3>
          <input value={buscar} onChange={e => setBuscar(e.target.value)} placeholder="🔍 Buscar..."
            style={{ padding: '8px 12px', border: '2px solid #e0e0e0', borderRadius: '6px', width: '200px' }} />
        </div>
        {loading ? <p style={{ textAlign: 'center', color: '#5a5a5a' }}>Cargando...</p> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                  {['Nombre', 'Familia', 'Pases', 'Lado', 'Token', 'Check-In', ''].map(h => (
                    <th key={h} style={{ padding: '10px', textAlign: 'left', color: '#1a3a52', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.map(inv => (
                  <tr key={inv.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{inv.nombre}</td>
                    <td style={{ padding: '10px', color: '#5a5a5a' }}>{inv.familia || '-'}</td>
                    <td style={{ padding: '10px' }}>{inv.num_pases}</td>
                    <td style={{ padding: '10px', color: '#5a5a5a' }}>{inv.lado}</td>
                    <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '12px', color: '#6b8fa3' }}>{inv.token}</td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ background: inv.checked_in ? '#e8f5e9' : '#fff3e0', color: inv.checked_in ? '#2e7d32' : '#e65100', padding: '3px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                        {inv.checked_in ? '✅ Entró' : '⏳ Pendiente'}
                      </span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <button onClick={() => handleEdit(inv)} style={{ padding: '5px 10px', background: '#e3f2fd', color: '#1565c0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>✏️</button>
                        <button onClick={() => handleDelete(inv.id)} style={{ padding: '5px 10px', background: '#ffebee', color: '#c62828', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtrados.length === 0 && <p style={{ textAlign: 'center', color: '#5a5a5a', padding: '30px' }}>No hay invitados aún</p>}
          </div>
        )}
      </div>
    </div>
  )
}
