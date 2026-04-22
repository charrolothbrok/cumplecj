import { useState } from 'react'
import { motion } from 'framer-motion'
import EnvelopeIntro from '../components/EnvelopeIntro'
import Hero from '../components/Hero'
import Countdown from '../components/Countdown'
import Party from '../components/Party'
import Gallery from '../components/Gallery'
import Itinerary from '../components/Itinerary'
import RSVP from '../components/RSVP'
import MusicPlayer from '../components/MusicPlayer'

export default function InvitationPage() {
  const [showInvitation, setShowInvitation] = useState(false)

  if (!showInvitation) {
    return <EnvelopeIntro onOpen={() => setShowInvitation(true)} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MusicPlayer />
      <Hero />
      <Countdown />
      <Party />
      <Gallery />
      <Itinerary />
      <RSVP />

      {/* Footer */}
      <footer style={{
        background: 'var(--dark)',
        color: 'white',
        padding: 'var(--spacing-xl) var(--spacing-lg)',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{
            fontSize: '1.1rem',
            marginBottom: 'var(--spacing-md)',
            fontFamily: 'var(--font-display)'
          }}>
            🎉 Cumpleaños Javier & Chanita 🎉
          </p>
          <p style={{
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 'var(--spacing-sm)'
          }}>
            8 de Agosto de 2026
          </p>
          <p style={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.5)',
            marginTop: 'var(--spacing-lg)'
          }}>
            Creado con amor para una celebración especial
          </p>
        </div>
      </footer>
    </motion.div>
  )
}
