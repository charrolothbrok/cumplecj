export default function Party() {
  return (
    <section style={{ padding: '80px 20px', background: '#f5f3f0' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", textAlign: 'center', marginBottom: '15px' }}>Detalles del Evento</h2>
        <p style={{ color: '#5a5a5a', textAlign: 'center', marginBottom: '50px' }}>Todo lo que necesitas saber para acompañarnos</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
          {[
            { icon: '📍', title: 'Lugar', content: 'Salón Los Girasoles\nCalle Principal 123, Centro' },
            { icon: '🕐', title: 'Recepción', content: 'Sábado\n8 de Agosto de 2026\n5:00 PM' },
            { icon: '🎉', title: 'La Celebración', content: 'Una noche mágica con música, cena especial, baile y muchas sorpresas para nuestros cumpleañeros' },
          ].map(c => (
            <div key={c.title} style={{ background: 'white', padding: '35px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderLeft: '4px solid #d4af37' }}>
              <div style={{ fontSize: '36px', marginBottom: '15px' }}>{c.icon}</div>
              <h3 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", fontSize: '1.3rem', marginBottom: '10px' }}>{c.title}</h3>
              <p style={{ color: '#5a5a5a', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{c.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
