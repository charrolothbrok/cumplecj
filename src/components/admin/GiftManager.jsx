import { useState, useEffect } from 'react'
import { regalosDB, configDB } from '../../lib/supabase'

export default function GiftManager() {
  const [tiendas, setTiendas] = useState([])
  const [bancos, setBancos] = useState([])
  const [config, setConfig] = useState({ regalos_activo: 'true', regalos_mensaje: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => { load() }, [])

  const load = async () => {
    const all = await regalosDB.getAll()
    setTiendas(all.filter(r => r.tipo === 'tienda'))
    setBancos(all.filter(r => r.tipo === 'banco'))
    const cfg = await configDB.getAll()
    setConfig(c => ({ ...c, regalos_activo: cfg.regalos_activo || 'true', regalos_mensaje: cfg.regalos_mensaje || '' }))
  }

  const addTienda = async () => {
    await regalosDB.create({ tipo: 'tienda', nombre: 'Nueva Tienda', link: '', logo_url: '', orden: tiendas.length })
    load()
  }

  const addBanco = async () => {
    await regalosDB.create({ tipo: 'banco', banco: 'Banco', titular: '', num_cuenta: '', clabe: '', concepto: 'Regalo cumpleaños', orden: bancos.length })
    load()
  }

  const updateItem = async (id, field, value) => {
    await regalosDB.update(id, { [field]: value })
  }

  const deleteItem = async (id) => {
    if (confirm('¿Eliminar?')) { await regalosDB.delete(id); load() }
  }

  const handleSave = async () => {
    await configDB.setMany(config)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const Input = ({ val, onChange, placeholder, style = {} }) => (
    <input defaultValue={val} onBlur={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: '100%', padding: '9px 12px', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', ...style }} />
  )

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", margin: 0 }}>Mesa de Regalos</h2>
        <button onClick={handleSave} style={{ padding: '10px 25px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
          💾 {saved ? '¡Guardado!' : 'Guardar cambios'}
        </button>
      </div>

      {/* Toggle y mensaje */}
      <div style={{ background: 'white', padding: '20px 25px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontWeight: 700, color: '#1a3a52', margin: 0 }}>Mostrar en la invitación</p>
          <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>Activa/desactiva la sección de mesa de regalos</p>
        </div>
        <button onClick={() => setConfig(c => ({ ...c, regalos_activo: c.regalos_activo === 'true' ? 'false' : 'true' }))}
          style={{ width: '48px', height: '26px', borderRadius: '13px', border: 'none', background: config.regalos_activo === 'true' ? '#6b8fa3' : '#ccc', cursor: 'pointer', position: 'relative', transition: 'background 0.3s' }}>
          <span style={{ position: 'absolute', top: '3px', left: config.regalos_activo === 'true' ? '24px' : '3px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.3s' }} />
        </button>
      </div>

      <div style={{ background: 'white', padding: '20px 25px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Mensaje introductorio</label>
        <textarea value={config.regalos_mensaje} onChange={e => setConfig(c => ({ ...c, regalos_mensaje: e.target.value }))} rows={3}
          style={{ width: '100%', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }} />
      </div>

      {/* Tiendas */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", margin: 0 }}>🎁 Links de tiendas</h3>
          <button onClick={addTienda} style={{ padding: '8px 16px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}>+ Agregar tienda</button>
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {tiendas.map(t => (
            <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr auto', gap: '10px', alignItems: 'center', padding: '15px', background: '#fdf8f0', borderRadius: '8px', border: '1px solid #f0e8d8' }}>
              <div>
                {t.logo_url ? <img src={t.logo_url} alt="" style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '6px', border: '1px solid #e0e0e0' }} /> : <div style={{ width: '50px', height: '50px', background: '#e0e0e0', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#888' }}>Logo</div>}
                <button onClick={async () => { const url = prompt('URL del logo:'); if (url) { await regalosDB.update(t.id, { logo_url: url }); load() } }}
                  style={{ display: 'block', fontSize: '11px', color: '#f44336', background: 'none', border: 'none', cursor: 'pointer', marginTop: '4px' }}>✕ quitar</button>
              </div>
              <Input val={t.nombre} onChange={v => regalosDB.update(t.id, { nombre: v })} placeholder="Nombre tienda" />
              <Input val={t.link} onChange={v => regalosDB.update(t.id, { link: v })} placeholder="https://..." />
              <button onClick={() => deleteItem(t.id)} style={{ padding: '8px', background: '#fff1f2', color: '#be123c', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>🗑️</button>
            </div>
          ))}
          {tiendas.length === 0 && <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>Sin tiendas. Agrega una.</p>}
        </div>
      </div>

      {/* Bancos */}
      <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", margin: 0 }}>🏦 Datos bancarios</h3>
          <button onClick={addBanco} style={{ padding: '8px 16px', background: '#6b8fa3', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '13px' }}>+ Agregar cuenta</button>
        </div>
        <div style={{ display: 'grid', gap: '15px' }}>
          {bancos.map((b, i) => (
            <div key={b.id} style={{ padding: '20px', background: '#fdf8f0', borderRadius: '8px', border: '1px solid #f0e8d8' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ fontWeight: 700, color: '#1a3a52', fontSize: '15px' }}>Cuenta {i + 1} • {b.banco}</span>
                <button onClick={() => deleteItem(b.id)} style={{ padding: '6px 10px', background: '#fff1f2', color: '#be123c', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>🗑️</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {[
                  { label: 'Banco', field: 'banco', val: b.banco },
                  { label: 'Titular', field: 'titular', val: b.titular },
                  { label: 'No. de cuenta', field: 'num_cuenta', val: b.num_cuenta },
                  { label: 'CLABE', field: 'clabe', val: b.clabe },
                  { label: 'Concepto sugerido', field: 'concepto', val: b.concepto },
                ].map(f => (
                  <div key={f.field}>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{f.label}</label>
                    <Input val={f.val} onChange={v => regalosDB.update(b.id, { [f.field]: v })} placeholder={f.label} />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {bancos.length === 0 && <p style={{ color: '#888', textAlign: 'center', padding: '20px' }}>Sin cuentas bancarias.</p>}
        </div>
      </div>
    </div>
  )
}
