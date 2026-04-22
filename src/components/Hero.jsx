import { motion } from 'framer-motion'
import { Cake, Heart } from 'lucide-react'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gradient-main)',
      padding: 'var(--spacing-lg)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Formas decorativas de fondo */}
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, 10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity
        }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          zIndex: 1
        }}
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, -10, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 215, 0, 0.15)',
          borderRadius: '50%',
          zIndex: 1
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          textAlign: 'center',
          zIndex: 10,
          maxWidth: '800px'
        }}
      >
        {/* Decoración superior */}
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: 'var(--spacing-lg)'
          }}
        >
          <Cake size={64} style={{
            color: 'white',
            margin: '0 auto',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
          }} />
        </motion.div>

        {/* Nombres principales */}
        <motion.div
          variants={itemVariants}
          style={{
            marginBottom: 'var(--spacing-md)'
          }}
        >
          <h1 style={{
            fontSize: '3.5rem',
            fontFamily: 'var(--font-display)',
            color: 'white',
            marginBottom: 'var(--spacing-sm)',
            textShadow: '2px 2px 8px rgba(0,0,0,0.2)',
            fontWeight: 800
          }}>
            Javier & Chanita
          </h1>
        </motion.div>

        {/* Edades con corazón */}
        <motion.div
          variants={itemVariants}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--spacing-md)',
            marginBottom: 'var(--spacing-lg)',
            flexWrap: 'wrap'
          }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            borderRadius: 'var(--radius-xl)',
            color: 'white'
          }}>
            <p style={{
              fontSize: '1rem',
              opacity: 0.9,
              marginBottom: '4px'
            }}>Papá cumple</p>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              fontFamily: 'var(--font-display)'
            }}>62 años</p>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <Heart size={48} style={{
              color: '#FFD700',
              fill: '#FFD700'
            }} />
          </motion.div>

          <div style={{
            background: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            borderRadius: 'var(--radius-xl)',
            color: 'white'
          }}>
            <p style={{
              fontSize: '1rem',
              opacity: 0.9,
              marginBottom: '4px'
            }}>Abuelita cumple</p>
            <p style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              fontFamily: 'var(--font-display)'
            }}>83 años</p>
          </div>
        </motion.div>

        {/* Fecha y descripción */}
        <motion.div
          variants={itemVariants}
        >
          <p style={{
            fontSize: '1.3rem',
            color: 'white',
            marginBottom: 'var(--spacing-sm)',
            opacity: 0.95
          }}>
            ¡Una doble celebración llena de amor!
          </p>
          <p style={{
            fontSize: '1.2rem',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 600
          }}>
            Nos encantaría compartir este día especial contigo
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
