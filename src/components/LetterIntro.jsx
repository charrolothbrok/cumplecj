import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail } from 'lucide-react'

export default function LetterIntro({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpen = () => {
    setIsOpening(true)
    setTimeout(() => {
      onOpen()
    }, 1800)
  }

  // Generar confeti sofisticado
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    color: [
      'var(--primary-beige)',
      'var(--primary-turquesa)',
      'var(--primary-sage)',
      'var(--primary-navy)',
      'var(--primary-gold)',
      'var(--accent-earth)'
    ][Math.floor(Math.random() * 6)],
    delay: Math.random() * 0.3,
    duration: 2.5 + Math.random() * 0.8,
    xStart: (Math.random() - 0.5) * 100,
    xEnd: (Math.random() - 0.5) * 300
  }))

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
      {/* Patrón decorativo de fondo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.08,
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)',
      }}></div>

      {/* Confeti cuando se abre */}
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
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
              background: piece.color,
              pointerEvents: 'none',
              zIndex: 1,
              left: 'calc(50% + ' + piece.xStart + 'px)',
              top: 'calc(50% - 100px)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Contenedor principal */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center'
      }}>
        <AnimatePresence>
          {!isOpening && (
            <>
              {/* Sobre animado */}
              <motion.div
                initial={{ scale: 0, rotateY: -180 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0, y: -50 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                style={{
                  perspective: '1000px',
                  marginBottom: '3rem',
                  cursor: 'pointer'
                }}
                onClick={handleOpen}
              >
                {/* Movimiento suave arriba y abajo */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* SOBRE */}
                  <div style={{
                    position: 'relative',
                    width: '280px',
                    height: '180px',
                    margin: '0 auto'
                  }}>
                    {/* Cuerpo del sobre */}
                    <motion.div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: 'white',
                        borderRadius: '4px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Solapa del sobre - se abre */}
                      <motion.div
                        animate={isOpening ? { rotateX: -180, y: -20 } : { rotateX: 0, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '50%',
                          background: 'linear-gradient(135deg, var(--primary-beige) 0%, var(--primary-sage) 100%)',
                          transformOrigin: 'top',
                          borderBottom: '2px solid rgba(0,0,0,0.1)'
                        }}
                      >
                        {/* Triángulo decorativo en la solapa */}
                        <div style={{
                          position: 'absolute',
                          width: 0,
                          height: 0,
                          borderLeft: '140px solid transparent',
                          borderRight: '140px solid transparent',
                          borderTop: '50px solid rgba(0,0,0,0.05)',
                          top: 0,
                          left: 0
                        }} />
                      </motion.div>

                      {/* Contenido del sobre */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px',
                        zIndex: 2,
                        background: 'white'
                      }}>
                        <Mail size={32} color="var(--primary-gold)" style={{ marginBottom: '12px' }} />
                        <p style={{
                          fontSize: '1.2rem',
                          fontWeight: 600,
                          color: 'var(--primary-navy)',
                          margin: '8px 0',
                          fontFamily: 'var(--font-display)'
                        }}>
                          Chanita & Javier
                        </p>
                        <p style={{
                          fontSize: '0.85rem',
                          color: 'var(--primary-sage)',
                          margin: 0
                        }}>
                          Una invitación especial
                        </p>
                      </div>

                      {/* Listón decorativo */}
                      <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '40px',
                        height: '180px',
                        background: 'var(--primary-turquesa)',
                        zIndex: 3,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }} />

                      {/* Sello decorativo */}
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                          position: 'absolute',
                          bottom: '20px',
                          right: '20px',
                          width: '50px',
                          height: '50px',
                          background: 'var(--primary-gold)',
                          borderRadius: '50%',
                          zIndex: 4,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 12px rgba(201, 169, 97, 0.3)',
                          fontSize: '24px'
                        }}
                      >
                        ✓
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Texto descriptivo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 style={{
                  fontSize: '2.8rem',
                  marginBottom: '1rem',
                  color: 'white',
                  textShadow: '2px 2px 6px rgba(0,0,0,0.2)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  letterSpacing: '1px'
                }}>
                  Una Invitación Especial
                </h1>
                <p style={{
                  fontSize: '1.3rem',
                  color: 'rgba(255,255,255,0.95)',
                  marginBottom: '2rem',
                  textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
                  fontWeight: 300
                }}>
                  Para celebrar juntos
                </p>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpen}
                  style={{
                    background: 'white',
                    color: 'var(--primary-navy)',
                    padding: '14px 40px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    fontFamily: 'var(--font-display)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Mail size={20} />
                  Abre la Invitación
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
