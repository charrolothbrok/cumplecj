import { useState } from 'react'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'MagoAn#02') {
      setAuthenticated(true)
      setPassword('')
    } else {
      alert('❌ Contraseña incorrecta')
    }
  }

  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#6b8fa3',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          padding: '50px',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h2 style={{
            color: '#1a3a52',
            marginBottom: '30px',
            textAlign: 'center',
            fontFamily: "'Fredoka', sans-serif"
          }}>
            Admin - Cumpleaños
          </h2>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#1a3a52',
                fontWeight: 600
              }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d4af37',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background: '#6b8fa3',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = '#5a7a93'}
              onMouseLeave={(e) => e.target.style.background = '#6b8fa3'}
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f3f0',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <h1 style={{
            color: '#1a3a52',
            fontFamily: "'Fredoka', sans-serif"
          }}>
            Panel de Admin
          </h1>
          <button
            onClick={() => {
              setAuthenticated(false)
              setPassword('')
            }}
            style={{
              padding: '10px 20px',
              background: '#d4af37',
              color: '#1a3a52',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Placeholder para desarrollo futuro */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#6b8fa3', marginBottom: '20px' }}>
            ✅ Admin Funcional
          </h2>
          <p style={{ color: '#5a5a5a', marginBottom: '20px' }}>
            El panel de admin está listo para desarrollo.
          </p>
          <p style={{ color: '#999', fontSize: '14px' }}>
            Aquí irán: <br />
            - Editar invitados <br />
            - Ver confirmaciones <br />
            - Editar evento <br />
            - Editar galería
          </p>
        </div>
      </div>
    </div>
  )
}
