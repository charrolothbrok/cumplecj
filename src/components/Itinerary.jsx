const items = [
  { time: '5:00 PM', title: 'Bienvenida', desc: 'Llegada de invitados y recepción con cóctel', icon: '❤️', color: '#ff6b9d' },
  { time: '5:30 PM', title: 'Cena', desc: 'Cena especial preparada con amor', icon: '🍽️', color: '#ff9966' },
  { time: '6:45 PM', title: 'Pastel y Felicitaciones', desc: 'Corte del pastel y brindis especiales', icon: '🎂', color: '#d4af37' },
  { time: '7:15 PM', title: 'Música y Baile', desc: 'Fiesta con música en vivo y sorpresas', icon: '🎵', color: '#6b8fa3' },
]

export default function Itinerary() {
  return (
    <section style={{ padding: '80px 20px', background: '#f5f3f0' }}>
      <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", textAlign: 'center', marginBottom: '15px' }}>Cronograma de la Noche</h2>
      <p style={{ color: '#5a5a5a', textAlign: 'center', marginBottom: '60px' }}>Así transcurrirá nuestra inolvidable celebración</p>
      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '35px', top: 0, bottom: 0, width: '2px', background: '#d4af37' }} />
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '25px', marginBottom: '35px', alignItems: 'flex-start' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', position: 'relative', zIndex: 2 }}>
              {item.icon}
            </div>
            <div style={{ background: 'white', padding: '20px 25px', borderRadius: '10px', flex: 1, boxShadow: '0 3px 10px rgba(0,0,0,0.08)' }}>
              <p style={{ fontSize: '14px', color: '#d4af37', fontWeight: 700, margin: '0 0 6px' }}>{item.time}</p>
              <h3 style={{ fontSize: '1.1rem', color: '#1a3a52', fontWeight: 700, fontFamily: "'Fredoka', sans-serif", margin: '0 0 5px' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#5a5a5a', margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
