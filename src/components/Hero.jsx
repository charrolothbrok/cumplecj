export default function Hero() {
  return (
    <section style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f3f0',
      padding: '60px 20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '800px' }}>
        {/* Emoji */}
        <div style={{ fontSize: '50px', marginBottom: '30px' }}>🎂</div>

        {/* Título */}
        <h2 style={{
          fontSize: 'clamp(2rem, 8vw, 3.5rem)',
          color: '#1a3a52',
          fontFamily: "'Fredoka', sans-serif",
          fontWeight: 700,
          marginBottom: '20px'
        }}>
          Javier & Chanita
        </h2>

        {/* Descripción */}
        <p style={{
          fontSize: '18px',
          color: '#5a5a5a',
          marginBottom: '40px',
          lineHeight: 1.8,
          fontWeight: 300
        }}>
          Los invitamos a celebrar a dos personas extraordinarias:<br />
          <strong>62 años de papá</strong> con su sonrisa, su fuerza y su amor de padre<br />
          <strong>83 años de abuelita</strong> con su sabiduría, su calidez y su amor infinito
        </p>

        {/* Cajas de edades */}
        <div style={{
          display: 'flex',
          gap: '30px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {/* Caja papá */}
          <div style={{
            background: 'white',
            padding: '35px 45px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            minWidth: '180px',
            borderTop: '3px solid #d4af37'
          }}>
            <p style={{
              fontSize: '13px',
              color: '#5a5a5a',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '8px',
              fontWeight: 600
            }}>
              Papá
            </p>
            <p style={{
              fontSize: '3rem',
              color: '#1a3a52',
              fontWeight: 700,
              margin: '0',
              fontFamily: "'Fredoka', sans-serif"
            }}>
              62
            </p>
            <p style={{
              fontSize: '13px',
              color: '#5a5a5a',
              marginTop: '8px'
            }}>
              años de vida
            </p>
          </div>

          {/* Corazón */}
          <div style={{ fontSize: '2.5rem' }}>💚</div>

          {/* Caja abuelita */}
          <div style={{
            background: 'white',
            padding: '35px 45px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            minWidth: '180px',
            borderTop: '3px solid #d4af37'
          }}>
            <p style={{
              fontSize: '13px',
              color: '#5a5a5a',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '8px',
              fontWeight: 600
            }}>
              Abuelita
            </p>
            <p style={{
              fontSize: '3rem',
              color: '#1a3a52',
              fontWeight: 700,
              margin: '0',
              fontFamily: "'Fredoka', sans-serif"
            }}>
              83
            </p>
            <p style={{
              fontSize: '13px',
              color: '#5a5a5a',
              marginTop: '8px'
            }}>
              años de vida
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
