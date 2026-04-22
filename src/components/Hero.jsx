export default function Hero() {
  return (
    <section style={{ padding: '80px 20px', background: '#f5f3f0', textAlign: 'center' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '50px', marginBottom: '20px' }}>🎂</div>
        <h2 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', color: '#1a3a52', fontFamily: "'Fredoka', sans-serif", fontWeight: 700, marginBottom: '20px' }}>
          Javier & Chanita
        </h2>
        <p style={{ fontSize: '17px', color: '#5a5a5a', marginBottom: '40px', lineHeight: 1.8, fontWeight: 300 }}>
          Los invitamos a celebrar a dos personas extraordinarias
        </p>
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          {[{ label: 'Papá', num: '62' }, { label: 'Abuelita', num: '83' }].map((b, i) => (
            <>
              {i === 1 && <div key="heart" style={{ fontSize: '2.5rem' }}>💚</div>}
              <div key={b.label} style={{ background: 'white', padding: '35px 45px', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', minWidth: '160px', borderTop: '3px solid #d4af37' }}>
                <p style={{ fontSize: '13px', color: '#5a5a5a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', fontWeight: 600 }}>{b.label}</p>
                <p style={{ fontSize: '3rem', color: '#1a3a52', fontWeight: 700, margin: '0', fontFamily: "'Fredoka', sans-serif" }}>{b.num}</p>
                <p style={{ fontSize: '13px', color: '#5a5a5a', marginTop: '8px' }}>años de vida</p>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  )
}
