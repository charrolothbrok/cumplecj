import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LetterIntro({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpen = () => {
    setIsOpening(true)
    setTimeout(() => {
      onOpen()
    }, 1500)
  }

  // Confeti minimalista
  const confettiPieces = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    color: [
      'var(--primary-guinda)',
      'var(--primary-gold)',
      'var(--primary-guinda-light)',
      'var(--bg-secondary)'
    ][Math.floor(Math.random() * 4)],
    delay: Math.random() * 0.2,
    duration: 2.2 + Math.random() * 0.6,
    xStart: (Math.random() - 0.5) * 80,
    xEnd: (Math.random() - 0.5) * 280
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Confeti */}
      <AnimatePresence>
        {isOpening && confettiPieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              opacity: 1
            }}
            animate={{
              x: piece.xEnd,
              y: window.innerHeight + 100,
              rotate: 360 + Math.random() * 360,
              scale: 0,
              opacity: 0
            }}
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: "easeIn"
            }}
            style={{
              position: 'fixed',
              width: Math.random() * 6 + 3 + 'px',
              height: Math.random() * 6 + 3 + 'px',
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              background: piece.color,
              pointerEvents: 'none',
              zIndex: 1,
              left: 'calc(50% + ' + piece.xStart + 'px)',
              top: 'calc(50% - 80px)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Contenido Principal */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '700px' }}>
        <AnimatePresence>
          {!isOpening && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              {/* Línea decorativa superior */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{
                  height: '2px',
                  width: '80px',
                  background: 'var(--primary-guinda)',
                  margin: '0 auto 24px',
                  transformOrigin: 'center'
                }}
              />

              {/* Texto decorativo pequeño */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: '14px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'var(--text-subtitle)',
                  marginBottom: '16px',
                  fontWeight: 500,
                  fontFamily: 'var(--font-body)'
                }}
              >
                Con Amor Los Invitamos
              </motion.p>

              {/* TÍTULO PRINCIPAL - MUY GRANDE Y OSCURO */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{
                  fontSize: 'clamp(3rem, 8vw, 4.5rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  color: 'var(--text-title)',
                  marginBottom: '8px',
                  lineHeight: 1.2,
                  letterSpacing: '-0.5px'
                }}
              >
                Chanita & Javier
              </motion.h1>

              {/* Línea decorativa debajo del título */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                  height: '3px',
                  width: '120px',
                  background: 'var(--primary-guinda)',
                  margin: '24px auto 32px',
                  transformOrigin: 'center'
                }}
              />

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  fontSize: '18px',
                  color: 'var(--text-body)',
                  marginBottom: '48px',
                  fontWeight: 300,
                  lineHeight: 1.6
                }}
              >
                Una doble celebración llena de amor<br />
                <span style={{ fontWeight: 500 }}>8 de Agosto de 2026</span>
              </motion.p>

              {/* SOBRE - PEQUEÑO Y CENTRADO (NO ES EL PROTAGONISTA) */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  margin: '40px auto',
                  cursor: 'pointer'
                }}
                onClick={handleOpen}
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: '200px',
                    height: '130px',
                    background: 'white',
                    borderRadius: '4px',
                    boxShadow: 'var(--shadow-lg)',
                    position: 'relative',
                    overflow: 'hidden',
                    margin: '0 auto'
                  }}
                >
                  {/* Solapa */}
                  <motion.div
                    animate={isOpening ? { rotateX: -180, y: -15 } : { rotateX: 0, y: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '50%',
                      background: 'var(--primary-guinda)',
                      transformOrigin: 'top',
                      top: 0
                    }}
                  />

                  {/* Contenido del sobre */}
                  <div
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 2
                    }}
                  >
                    <div
                      style={{
                        fontSize: '32px',
                        marginBottom: '8px'
                      }}
                    >
                      ✉️
                    </div>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-subtitle)',
                        fontWeight: 500
                      }}
                    >
                      Toca para abrir
                    </p>
                  </div>

                  {/* Listón */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '30px',
                      height: '130px',
                      background: 'var(--primary-guinda)',
                      zIndex: 3
                    }}
                  />

                  {/* Sello */}
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      width: '40px',
                      height: '40px',
                      background: 'var(--primary-gold)',
                      borderRadius: '50%',
                      zIndex: 4,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      boxShadow: 'var(--shadow-md)'
                    }}
                  >
                    ✓
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* BOTÓN GRANDE Y PROMINENTE */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-xl)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                style={{
                  marginTop: '48px',
                  padding: '16px 48px',
                  fontSize: '16px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  background: 'var(--primary-guinda)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-lg)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease'
                }}
              >
                Abre la Invitación
              </motion.button>

              {/* Línea decorativa inferior */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{
                  height: '2px',
                  width: '80px',
                  background: 'var(--primary-guinda)',
                  margin: '48px auto 0',
                  transformOrigin: 'center'
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
