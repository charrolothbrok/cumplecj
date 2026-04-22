import { motion } from 'framer-motion'
import { MapPin, Clock, Users } from 'lucide-react'

export default function Party() {
  const partyInfo = {
    lugar: 'Salón Los Girasoles',
    direccion: 'Calle Principal 123, Centro',
    fecha: 'Sábado, 8 de Agosto de 2026',
    hora: '5:00 PM',
    googleMapsUrl: 'https://maps.google.com/?q=salón+los+girasoles',
    descripcion: '¡Una noche mágica llena de música, baile y muchas sorpresas!'
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section style={{
      padding: 'var(--spacing-xxl) var(--spacing-lg)',
      background: 'white'
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: 'var(--spacing-xxl)'
          }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: 'var(--spacing-md)',
            color: 'var(--text-primary)'
          }}>
            Detalles de la Fiesta
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)'
          }}>
            Todo lo que necesitas saber para llegar
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-xxl)'
          }}
        >
          {/* Lugar */}
          <motion.div
            variants={itemVariants}
            className="card"
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(255,215,0,0.1) 100%)',
              border: '2px solid var(--primary-orange)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ y: -8 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 'var(--spacing-md)',
              gap: 'var(--spacing-md)'
            }}>
              <div style={{
                background: 'var(--gradient-warm)',
                padding: '12px 16px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <MapPin size={28} style={{ color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Lugar
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Ubicación del evento
                </p>
              </div>
            </div>
            <p style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              {partyInfo.lugar}
            </p>
            <p style={{
              color: 'var(--text-secondary)',
              marginBottom: 'var(--spacing-md)'
            }}>
              {partyInfo.direccion}
            </p>
            <motion.a
              href={partyInfo.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-block',
                background: 'var(--gradient-main)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              Ver en Google Maps
            </motion.a>
          </motion.div>

          {/* Fecha */}
          <motion.div
            variants={itemVariants}
            className="card"
            style={{
              background: 'linear-gradient(135deg, rgba(233,30,99,0.1) 0%, rgba(156,39,176,0.1) 100%)',
              border: '2px solid var(--primary-pink)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ y: -8 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 'var(--spacing-md)',
              gap: 'var(--spacing-md)'
            }}>
              <div style={{
                background: 'var(--gradient-cool)',
                padding: '12px 16px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Clock size={28} style={{ color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Cuándo
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Fecha y hora
                </p>
              </div>
            </div>
            <p style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '8px'
            }}>
              {partyInfo.fecha}
            </p>
            <p style={{
              fontSize: '1.3rem',
              fontWeight: 700,
              background: 'var(--gradient-main)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {partyInfo.hora}
            </p>
          </motion.div>

          {/* Información adicional */}
          <motion.div
            variants={itemVariants}
            className="card"
            style={{
              background: 'linear-gradient(135deg, rgba(0,208,132,0.1) 0%, rgba(0,188,212,0.1) 100%)',
              border: '2px solid var(--accent-green)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ y: -8 }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 'var(--spacing-md)',
              gap: 'var(--spacing-md)'
            }}>
              <div style={{
                background: 'var(--gradient-party)',
                padding: '12px 16px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <Users size={28} style={{ color: 'white' }} />
              </div>
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>
                  La Fiesta
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Qué esperar
                </p>
              </div>
            </div>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8
            }}>
              {partyInfo.descripcion}
            </p>
          </motion.div>
        </motion.div>

        {/* Llamada a la acción */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            background: 'var(--gradient-main)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-lg)',
            textAlign: 'center',
            color: 'white'
          }}
        >
          <p style={{
            fontSize: '1.2rem',
            marginBottom: 'var(--spacing-md)',
            fontWeight: 600
          }}>
            ¿Ya confirmaste tu asistencia?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('[data-section="rsvp"]')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              background: 'white',
              color: 'var(--primary-pink)',
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: 700,
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)'
            }}
          >
            Confirmar Ahora
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
