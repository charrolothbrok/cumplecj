import { motion } from 'framer-motion'
import { Clock, Utensils, Music, Cake, Heart } from 'lucide-react'

export default function Itinerary() {
  const timeline = [
    {
      id: 1,
      hora: '5:00 PM',
      evento: 'Bienvenida',
      descripcion: 'Llegada de invitados, bienvenida y cocktail',
      icon: Heart,
      color: '#FF1493'
    },
    {
      id: 2,
      hora: '5:30 PM',
      evento: 'Cena',
      descripcion: 'Cena preparada especialmente para ustedes',
      icon: Utensils,
      color: '#FF6B35'
    },
    {
      id: 3,
      hora: '6:30 PM',
      evento: 'Pastel y Felicitaciones',
      descripcion: 'Corte del pastel y brindis especiales',
      icon: Cake,
      color: '#FFD700'
    },
    {
      id: 4,
      hora: '7:00 PM',
      evento: 'Música y Baile',
      descripcion: 'Fiesta con música en vivo y diversión',
      icon: Music,
      color: '#E91E63'
    },
    {
      id: 5,
      hora: '9:30 PM',
      evento: 'Clausura',
      descripcion: 'Despedida con gratitud infinita',
      icon: Heart,
      color: '#9C27B0'
    }
  ]

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section style={{
      padding: 'var(--spacing-xxl) var(--spacing-lg)',
      background: 'linear-gradient(135deg, rgba(0,208,132,0.05) 0%, rgba(0,188,212,0.05) 100%)'
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
            Cronograma del Evento
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)'
          }}>
            Así será nuestro increíble día juntos
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            maxWidth: '700px',
            margin: '0 auto'
          }}
        >
          {timeline.map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: 'var(--spacing-lg)',
                  marginBottom: 'var(--spacing-xl)',
                  position: 'relative'
                }}
              >
                {/* Línea conectora */}
                {index < timeline.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    left: '30px',
                    top: '80px',
                    width: '2px',
                    height: '100%',
                    background: `linear-gradient(180deg, ${item.color} 0%, ${timeline[index + 1].color} 100%)`,
                    opacity: 0.3
                  }} />
                )}

                {/* Círculo con icono */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: `0 0 0 4px white, 0 0 0 8px ${item.color}33`,
                    position: 'relative',
                    zIndex: 2,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <IconComponent size={32} />
                </motion.div>

                {/* Contenido */}
                <motion.div
                  whileHover={{ x: 10 }}
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--spacing-lg)',
                    boxShadow: 'var(--shadow-md)',
                    border: `2px solid ${item.color}20`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <Clock size={18} style={{ color: item.color }} />
                    <p style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: item.color,
                      margin: 0
                    }}>
                      {item.hora}
                    </p>
                  </div>

                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '8px',
                    fontFamily: 'var(--font-display)'
                  }}>
                    {item.evento}
                  </h3>

                  <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6
                  }}>
                    {item.descripcion}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Mensaje final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginTop: 'var(--spacing-xxl)',
            padding: 'var(--spacing-lg)',
            background: 'var(--gradient-main)',
            borderRadius: 'var(--radius-lg)',
            color: 'white'
          }}
        >
          <p style={{
            fontSize: '1.2rem',
            fontWeight: 600,
            margin: 0
          }}>
            ¡Será un día lleno de amor, risas y momentos inolvidables! 🎉
          </p>
        </motion.div>
      </div>
    </section>
  )
}
