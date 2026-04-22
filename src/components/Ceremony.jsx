export default function Ceremony() {
  return (
    <section style={{ padding: '80px 20px', background: 'white', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", marginBottom: '15px' }}>Ceremonia Religiosa</h2>
        <p style={{ color: '#5a5a5a', marginBottom: '40px' }}>Acompáñanos en la misa de acción de gracias</p>
        <div style={{ background: '#f5f3f0', padding: '40px', borderRadius: '12px', borderTop: '4px solid #d4af37' }}>
          <div style={{ fontSize: '50px', marginBottom: '15px' }}>⛪</div>
          <h3 style={{ color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", fontSize: '1.8rem', marginBottom: '15px' }}>Misa de Acción de Gracias</h3>
          <p style={{ color: '#d4af37', fontWeight: 700, fontSize: '18px', marginBottom: '10px' }}>7:00 AM</p>
          <p style={{ color: '#5a5a5a', lineHeight: 1.8 }}>
            <strong>Iglesia de los Festejos</strong><br />
            Avenida Principal 456, Centro
          </p>
        </div>
      </div>
    </section>
  )
}
