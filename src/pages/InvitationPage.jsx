import { useState } from 'react'
import LetterIntro from '../components/LetterIntro'
import Hero from '../components/Hero'
import Ceremony from '../components/Ceremony'
import Party from '../components/Party'
import Gallery from '../components/Gallery'
import Itinerary from '../components/Itinerary'
import Countdown from '../components/Countdown'
import RSVP from '../components/RSVP'
import MusicPlayer from '../components/MusicPlayer'

export default function InvitationPage() {
  const [opened, setOpened] = useState(false)
  if (!opened) return <LetterIntro onOpen={() => setOpened(true)} />
  return (
    <div>
      <MusicPlayer />
      <Hero />
      <Countdown />
      <Ceremony />
      <Party />
      <Gallery />
      <Itinerary />
      <RSVP />
      <footer style={{ background: '#1a3a52', color: 'white', textAlign: 'center', padding: '40px 20px', fontSize: '14px' }}>
        <div style={{ width: '80px', height: '2px', background: '#d4af37', margin: '0 auto 20px' }} />
        <p>Con mucho amor — Celebración Chanita & Javier • 8 de Agosto de 2026</p>
      </footer>
    </div>
  )
}
