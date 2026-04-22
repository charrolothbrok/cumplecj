import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Gift } from 'lucide-react'

export default function EnvelopeIntro({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpen = () => {
    setIsOpening(true)
    setTimeout(() => {
      onOpen()
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-center min-h-screen"
      style={{
        background: 'var(--gradient-party)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Elemento decorativo de fondo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }}></div>

      {/* Confeti */}
      {isOpening && Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            rotate: 0
          }}
          animate={{
            y: window.innerHeight,
            rotate: Math.random() * 360
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: Math.random() * 0.3
          }}
          style={{
            position: 'fixed',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: ['var(--primary-orange)', 'var(--accent-gold)', 'var(--accent-green)', 'var(--primary-pink)'][Math.floor(Math.random() * 4)],
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      ))}

      {/* Contenedor principal */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center'
      }}>
        <motion.div
          animate={isOpening ? { rotateX: 180, opacity: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            perspective: 1000,
            marginBottom: '2rem'
          }}
        >
          <motion.div
            animate={isOpening ? {} : { y: [0, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            style={{
              width: '120px',
              height: '80px',
              margin: '0 auto',
              cursor: 'pointer'
            }}
            onClick={handleOpen}
          >
            <div style={{
              background: 'white',
              borderRadius: '4px',
              padding: '12px',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative'
            }}>
              <Mail size={56} style={{
                margin: '0 auto',
                color: 'var(--primary-pink)',
                animation: 'bounce-gentle 2s infinite'
              }} />
            </div>
          </motion.div>
        </motion.div>

        {!isOpening && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontFamily: 'var(--font-display)'
            }}>
              ¡Una Sorpresa Especial!
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'white',
              marginBottom: '2rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}>
              Javier & Chanita
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              style={{
                background: 'white',
                color: 'var(--primary-pink)',
                padding: '12px 32px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-lg)',
                fontFamily: 'var(--font-body)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                margin: '0 auto'
              }}
            >
              <Gift size={20} />
              Abre la invitación
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
