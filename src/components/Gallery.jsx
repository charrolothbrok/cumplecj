import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Imágenes de ejemplo - puedes reemplazar con tus URLs reales
  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=600&fit=crop',
      alt: 'Familia feliz'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=600&fit=crop',
      alt: 'Celebración'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=600&fit=crop',
      alt: 'Fiesta'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1551632786-de41ec16a83a?w=600&h=600&fit=crop',
      alt: 'Momentos especiales'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop',
      alt: 'Diversión'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop',
      alt: 'Recuerdos'
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
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
            Galería de Momentos
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)'
          }}>
            Recuerdos compartidos que queremos celebrar juntos
          </p>
        </motion.div>

        {/* Carrusel principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            position: 'relative',
            marginBottom: 'var(--spacing-xxl)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xl)',
            aspectRatio: '16 / 10',
            background: 'var(--dark)'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={photos[currentIndex].url}
              alt={photos[currentIndex].alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedIndex(currentIndex)}
            />
          </AnimatePresence>

          {/* Controles */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              color: 'var(--primary-orange)'
            }}
          >
            <ChevronLeft size={28} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              color: 'var(--primary-orange)'
            }}
          >
            <ChevronRight size={28} />
          </motion.button>

          {/* Indicadores */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}>
            {photos.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: idx === currentIndex ? '32px' : '10px',
                  height: '10px',
                  borderRadius: '50px',
                  background: idx === currentIndex ? 'var(--accent-gold)' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Grid de miniaturas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 'var(--spacing-md)',
          }}
        >
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentIndex(idx)}
              style={{
                aspectRatio: '1',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                cursor: 'pointer',
                border: currentIndex === idx ? '3px solid var(--primary-orange)' : '2px solid transparent',
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.3s ease'
              }}
            >
              <img
                src={photo.url}
                alt={photo.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              padding: 'var(--spacing-lg)'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden'
              }}
            >
              <img
                src={photos[selectedIndex].url}
                alt={photos[selectedIndex].alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain'
                }}
              />

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedIndex(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--primary-orange)',
                  zIndex: 10
                }}
              >
                <X size={28} />
              </motion.button>

              {/* Controles en lightbox */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedIndex((prev) => (prev - 1 + photos.length) % photos.length)}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--primary-orange)',
                  zIndex: 10
                }}
              >
                <ChevronLeft size={28} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedIndex((prev) => (prev + 1) % photos.length)}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--primary-orange)',
                  zIndex: 10
                }}
              >
                <ChevronRight size={28} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
