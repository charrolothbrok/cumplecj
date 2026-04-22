import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LogOut, Users, CheckCircle, Settings } from 'lucide-react'
import { invitadosDB, confirmacionesDB, supabase } from '../lib/supabase'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [invitados, setInvitados] = useState([])
  const [confirmaciones, setConfirmaciones] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('invitados')

  // Cargar datos
  useEffect(() => {
    if (authenticated) {
      loadData()
    }
  }, [authenticated])

  const loadData = async () => {
    setLoading(true)
    try {
      const [invData, confData] = await Promise.all([
        invitadosDB.getAll(),
        confirmacionesDB.getAll()
      ])
      setInvitados(invData || [])
      setConfirmaciones(confData || [])
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === 'MagoAn#02') {
      setAuthenticated(true)
      setPassword('')
    } else {
      alert('Contraseña incorrecta')
    }
  }

  if (!authenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--gradient-main)',
        padding: 'var(--spacing-lg)'
      }}>
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-xl)',
            maxWidth: '400px',
            width: '100%',
            boxShadow: 'var(--shadow-xl)'
          }}
        >
          <h1 style={{
            textAlign: 'center',
            marginBottom: 'var(--spacing-lg)',
            fontSize: '2rem',
            color: 'var(--text-primary)'
          }}>
            Admin
          </h1>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 600,
              color: 'var(--text-primary)'
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
                padding: 'var(--spacing-sm)',
                border: '2px solid var(--light-dark)',
                borderRadius: 'var(--radius-md)',
                fontSize: '1rem'
              }}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: 'var(--spacing-md)',
              background: 'var(--gradient-main)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Acceder
          </motion.button>
        </motion.form>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--light)'
    }}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: 'var(--gradient-main)',
          color: 'white',
          padding: 'var(--spacing-lg)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h1 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)' }}>
          Panel Admin - Javier & Chanita
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setAuthenticated(false)}
          style={{
            background: 'white',
            color: 'var(--primary-pink)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <LogOut size={20} />
          Salir
        </motion.button>
      </motion.header>

      {/* Tabs */}
      <nav style={{
        background: 'white',
        borderBottom: '2px solid var(--light-dark)',
        display: 'flex',
        gap: 'var(--spacing-md)',
        padding: 'var(--spacing-md)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {[
          { id: 'invitados', label: 'Invitados', icon: Users },
          { id: 'confirmaciones', label: 'Confirmaciones', icon: CheckCircle }
        ].map(tab => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              border: activeTab === tab.id ? '3px solid var(--primary-orange)' : '2px solid transparent',
              background: activeTab === tab.id ? 'rgba(255,107,53,0.1)' : 'transparent',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontWeight: 600,
              color: activeTab === tab.id ? 'var(--primary-orange)' : 'var(--text-secondary)',
              fontSize: '1rem'
            }}
          >
            <tab.icon size={20} />
            {tab.label}
          </motion.button>
        ))}
      </nav>

      {/* Contenido */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: 'var(--spacing-lg)'
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-xxl)' }}>
            <p>Cargando...</p>
          </div>
        ) : (
          <>
            {activeTab === 'invitados' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>
                  Invitados ({invitados.length})
                </h2>
                <div style={{
                  background: 'white',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-md)',
                  overflow: 'hidden'
                }}>
                  <table style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                  }}>
                    <thead>
                      <tr style={{ background: 'var(--light)' }}>
                        <th style={{
                          padding: 'var(--spacing-md)',
                          textAlign: 'left',
                          fontWeight: 700,
                          borderBottom: '2px solid var(--light-dark)'
                        }}>
                          Nombre
                        </th>
                        <th style={{
                          padding: 'var(--spacing-md)',
                          textAlign: 'left',
                          fontWeight: 700,
                          borderBottom: '2px solid var(--light-dark)'
                        }}>
                          Familia
                        </th>
                        <th style={{
                          padding: 'var(--spacing-md)',
                          textAlign: 'left',
                          fontWeight: 700,
                          borderBottom: '2px solid var(--light-dark)'
                        }}>
                          Pases
                        </th>
                        <th style={{
                          padding: 'var(--spacing-md)',
                          textAlign: 'left',
                          fontWeight: 700,
                          borderBottom: '2px solid var(--light-dark)'
                        }}>
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invitados.map((inv, idx) => (
                        <tr
                          key={inv.id}
                          style={{
                            background: idx % 2 === 0 ? 'white' : 'rgba(0,0,0,0.02)',
                            borderBottom: '1px solid var(--light-dark)'
                          }}
                        >
                          <td style={{ padding: 'var(--spacing-md)' }}>
                            {inv.nombre}
                          </td>
                          <td style={{ padding: 'var(--spacing-md)' }}>
                            {inv.familia}
                          </td>
                          <td style={{ padding: 'var(--spacing-md)' }}>
                            {inv.num_pases}
                          </td>
                          <td style={{ padding: 'var(--spacing-md)' }}>
                            <span style={{
                              display: 'inline-block',
                              padding: '4px 12px',
                              borderRadius: 'var(--radius-md)',
                              background: inv.checked_in ? 'var(--accent-green)' : 'var(--accent-gold)',
                              color: 'white',
                              fontSize: '0.85rem',
                              fontWeight: 600
                            }}>
                              {inv.checked_in ? '✓ Entrada registrada' : 'Pendiente'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'confirmaciones' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>
                  Confirmaciones RSVP ({confirmaciones.length})
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: 'var(--spacing-lg)'
                }}>
                  {confirmaciones.map(conf => (
                    <motion.div
                      key={conf.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card"
                      style={{
                        border: '2px solid var(--primary-orange)',
                        background: 'white'
                      }}
                    >
                      <h3 style={{
                        color: 'var(--primary-orange)',
                        marginBottom: 'var(--spacing-sm)',
                        fontSize: '1.2rem'
                      }}>
                        {conf.nombre}
                      </h3>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>Teléfono:</strong> {conf.telefono || 'N/A'}
                      </p>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>Personas:</strong> {conf.num_personas}
                      </p>
                      <p style={{ marginBottom: '8px' }}>
                        <strong>Asistirá:</strong> {conf.asistira ? '✓ Sí' : '✗ No'}
                      </p>
                      {conf.restriccion_alimentaria && (
                        <p style={{ marginBottom: '8px' }}>
                          <strong>Restricciones:</strong> {conf.restriccion_alimentaria}
                        </p>
                      )}
                      {conf.mensaje && (
                        <p style={{
                          marginTop: 'var(--spacing-md)',
                          padding: 'var(--spacing-sm)',
                          background: 'rgba(255,107,53,0.1)',
                          borderRadius: 'var(--radius-md)',
                          fontStyle: 'italic',
                          color: 'var(--text-secondary)'
                        }}>
                          "{conf.mensaje}"
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
