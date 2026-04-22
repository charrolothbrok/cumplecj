export default function Itinerary() {
  const items = [
    { time: '5:00 PM', title: 'Bienvenida', desc: 'Llegada de invitados y recepción', icon: '❤️' },
    { time: '5:30 PM', title: 'Cena', desc: 'Cena especial preparada con amor', icon: '🍽️' },
    { time: '6:45 PM', title: 'Pastel y Felicitaciones', desc: 'Corte del pastel y brindis especiales', icon: '🎂' },
    { time: '7:15 PM', title: 'Música y Baile', desc: 'Fiesta, música en vivo y diversión', icon: '🎵' }
  ]

  return (
    <section style={{
      minHeight: '100vh',
      padding: '80px 20px',
      background: '#f5f3f0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Título */}
      <h2 style={{
        fontSize: 'clamp(2rem, 8vw, 2.8rem)',
        color: '#1a3a52',
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        Cronograma de la Noche
      </h2>

      <p style={{
        fontSize: '16px',
        color: '#5a5a5a',
        textAlign: 'center',
        marginBottom: '60px',
        maxWidth: '600px'
      }}>
        Así transcurrirá nuestra inolvidable celebración
      </p>

      {/* Timeline */}
      <div style={{
        maxWidth: '700px',
        width: '100%',
        position: 'relative'
      }}>
        {/* Línea vertical */}
        <div style={{
          position: 'absolute',
          left: '35px',
          top: 0,
          bottom: 0,
          width: '2px',
          background: '#d4af37'
        }} />

        {/* Items */}
        {items.map((item, idx) => (
          <div key={idx} style={{
            display: 'flex',
            gap: '30px',
            marginBottom: '40px',
            alignItems: 'flex-start',
            position: 'relative'
          }}>
            {/* Círculo con ícono */}
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: ['#ff6b9d', '#ff9966', '#ffdd33', '#ff6ba6'][idx],
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              position: 'relative',
              zIndex: 2
            }}>
              {item.icon}
            </div>

            {/* Card contenido */}
            <div style={{
              background: 'white',
              padding: '25px 30px',
              borderRadius: '10px',
              flex: 1,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              paddingTop: '15px'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#d4af37',
                fontWeight: 700,
                margin: '0 0 8px 0'
              }}>
                {item.time}
              </p>
              <h3 style={{
                fontSize: '1.2rem',
                color: '#1a3a52',
                fontWeight: 700,
                fontFamily: "'Fredoka', sans-serif",
                margin: '0 0 6px 0'
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#5a5a5a',
                margin: 0
              }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
