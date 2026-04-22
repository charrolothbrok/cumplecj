import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Pause, Play, Volume2 } from 'lucide-react'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showVolumeControl, setShowVolumeControl] = useState(false)
  const audioRef = useRef(null)

  // Música de demostración (puedes reemplazar con tu propia URL)
  const musicUrl = 'https://assets.mixkit.co/active_storage/sfx/2360/2360-preview.mp3'

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => {
          console.log('Error playing audio:', err)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--gradient-main)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-xl)',
            position: 'relative',
            zIndex: 10
          }}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Pause size={28} fill="white" />
              </motion.div>
            ) : (
              <motion.div
                key="paused"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ duration: 0.3 }}
              >
                <Play size={28} fill="white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animación de ondas de música */}
          {isPlaying && (
            <>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: '2px solid var(--accent-gold)',
                  opacity: 0.5
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                style={{
                  position: 'absolute',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  border: '2px solid var(--accent-gold)',
                  opacity: 0.3
                }}
              />
            </>
          )}
        </motion.button>

        {/* Control de volumen */}
        <AnimatePresence>
          {showVolumeControl && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'absolute',
                bottom: '75px',
                right: '0',
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-md)',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-sm)',
                alignItems: 'center',
                minWidth: '80px'
              }}
            >
              <Volume2 size={20} style={{ color: 'var(--primary-orange)' }} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{
                  width: '40px',
                  height: '4px',
                  writingMode: 'bt-lr',
                  WebkitAppearance: 'slider-vertical',
                  appearance: 'slider-vertical'
                }}
              />
              <span style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                fontWeight: 600
              }}>
                {Math.round(volume * 100)}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón para mostrar/ocultar volumen */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowVolumeControl(!showVolumeControl)}
          style={{
            position: 'absolute',
            top: '-15px',
            right: '0',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--accent-gold)',
            border: 'none',
            color: 'var(--dark)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            fontSize: '1.2rem'
          }}
        >
          🔊
        </motion.button>
      </motion.div>
    </>
  )
}
