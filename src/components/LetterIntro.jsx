import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LetterIntro({ onOpen }) {
  const ref = useRef(null)

  useEffect(() => {
    gsap.to(ref.current, { opacity: 1, duration: 0.8 })
  }, [])

  return (
    <div ref={ref} style={{ minHeight: '100vh', background: '#6b8fa3', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', opacity: 0 }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', color: 'white' }}>
        <p style={{ fontSize: '13px', letterSpacing: '4px', textTransform: 'uppercase', color: '#d4af37', marginBottom: '20px', fontWeight: 600 }}>
          Somos el Honor de Invitarte
        </p>
        <h1 style={{ fontSize: 'clamp(2.5rem, 12vw, 5rem)', fontFamily: "'Fredoka', sans-serif", fontWeight: 700, color: 'white', margin: '0 0 20px', lineHeight: 1.1 }}>
          Chanita & Javier
        </h1>
        <div style={{ width: '100px', height: '3px', background: '#d4af37', margin: '0 auto 30px' }} />
        <p style={{ fontSize: '18px', color: '#f0f0f0', marginBottom: '15px', fontWeight: 300, lineHeight: 1.8 }}>
          Celebramos juntos 62 años de papá y 83 años de abuelita<br />
          Una doble celebración llena de amor, familia y momentos especiales
        </p>
        <p style={{ fontSize: '20px', color: '#d4af37', fontWeight: 700, marginBottom: '50px' }}>
          8 de Agosto de 2026
        </p>
        <button onClick={onOpen} style={{ padding: '18px 60px', background: '#d4af37', color: '#1a3a52', border: 'none', borderRadius: '50px', fontFamily: "'Fredoka', sans-serif", fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1.3px', fontSize: '16px', boxShadow: '0 8px 25px rgba(212,175,55,0.4)' }}>
          Ver Invitación Completa
        </button>
      </div>
    </div>
  )
}
