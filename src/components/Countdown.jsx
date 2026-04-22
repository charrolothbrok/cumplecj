import { useState, useEffect } from 'react'

export default function Countdown() {
  const [time, setTime] = useState({})

  useEffect(() => {
    const calc = () => {
      const diff = new Date('2026-08-08T17:00:00') - new Date()
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return }
      setTime({ d: Math.floor(diff/86400000), h: Math.floor((diff%86400000)/3600000), m: Math.floor((diff%3600000)/60000), s: Math.floor((diff%60000)/1000) })
    }
    calc(); const t = setInterval(calc, 1000); return () => clearInterval(t)
  }, [])

  return (
    <section style={{ padding: '60px 20px', background: '#1a3a52', textAlign: 'center' }}>
      <p style={{ color: '#d4af37', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '13px', marginBottom: '30px', fontWeight: 600 }}>
        Faltan para la celebración
      </p>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {[{ val: time.d, label: 'Días' }, { val: time.h, label: 'Horas' }, { val: time.m, label: 'Minutos' }, { val: time.s, label: 'Segundos' }].map(t => (
          <div key={t.label} style={{ background: 'rgba(255,255,255,0.1)', padding: '20px 25px', borderRadius: '10px', minWidth: '80px' }}>
            <p style={{ fontSize: '2.5rem', color: 'white', fontWeight: 700, margin: '0', fontFamily: "'Fredoka', sans-serif" }}>{String(t.val).padStart(2,'0')}</p>
            <p style={{ color: '#d4af37', fontSize: '12px', margin: '5px 0 0', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
