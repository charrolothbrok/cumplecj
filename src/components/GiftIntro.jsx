import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift } from 'lucide-react'

export default function GiftIntro({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpen = () => {
    setIsOpening(true)
    setTimeout(() => {
      onOpen()
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-center min-h-screen"
      style={{
        background: 'var(--gradient-main)',
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

      {/* Confeti cuando se abre */}
      {isOpening && Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            rotate: 0,
            scale: 1
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            rotate: Math.random() * 360,
            scale: 0
          }}
          transition={{
            duration: 2 + Math.random() * 0.5,
            delay: Math.random() * 0.3
          }}
          style={{
            position: 'fixed',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: ['var(--primary-gold)', 'var(--primary-navy)', 'var(--primary-purple)'][Math.floor(Math.random() * 3)],
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
          animate={isOpening ? { y: -50, opacity: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            marginBottom: '3rem'
          }}
        >
          {/* CAJA DE REGALO ANIMADA */}
          <motion.div
            animate={isOpening ? {} : { y: [0, -15, 0] }}
            transition={{
              duration: 2,
              repeat: isOpening ? 0 : Infinity
            }}
            style={{
              perspective: 1000,
              cursor: 'pointer'
            }}
            onClick={handleOpen}
          >
            {/* Caja principal */}
            <motion.div
              animate={isOpening ? { scale: [1, 1.05, 0.95] } : {}}
              transition={{ duration: 0.4 }}
              style={{
                position: 'relative',
                width: '140px',
                height: '120px',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}
            >
              {/* Tapa de la caja */}
              <motion.div
                animate={isOpening ? { rotateX: -180, y: -60 } : { rotateX: 0, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  position: 'absolute',
                  width: '140px',
                  height: '40px',
                  background: 'linear-gradient(135deg, var(--primary-gold) 0%, #c9a961 100%)',
                  borderRadius: '8px 8px 0 0',
                  boxShadow: '0 -4px 8px rgba(0,0,0,0.2)',
                  transformOrigin: 'bottom center',
                  border: '3px solid #8b6f47',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 0,
                  zIndex: 2
                }}
              >
                {/* Cinta de la tapa */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '8px',
                  background: 'var(--primary-navy)',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }} />
                <div style={{
                  position: 'absolute',
                  width: '8px',
                  height: '100%',
                  background: 'var(--primary-navy)',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }} />
              </motion.div>

              {/* Cuerpo de la caja */}
              <div style={{
                position: 'absolute',
                width: '140px',
                height: '100px',
                background: 'linear-gradient(135deg, var(--primary-navy) 0%, #2d5a6f 100%)',
                borderRadius: '0 0 8px 8px',
                border: '3px solid #1e3a5f',
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                zIndex: 1
              }} />
            </motion.div>
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
              fontFamily: 'var(--font-display)',
              fontWeight: 800
            }}>
              ¡Un Regalo Especial!
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'white',
              marginBottom: '2rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}>
              Para Javier & Chanita
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              style={{
                background: 'white',
                color: 'var(--primary-navy)',
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
              Abre el Regalo
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
