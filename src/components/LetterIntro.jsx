import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LetterIntro({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)
  const containerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Fade in container
      tl.to(containerRef.current, { opacity: 1, duration: 0.8 })

      // Fade in content
      tl.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      }, 0.2)
    })

    return () => ctx.revert()
  }, [])

  const handleOpen = () => {
    setIsOpening(true)
    gsap.to(contentRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: 'power2.in'
    })

    setTimeout(() => {
      onOpen()
    }, 600)
  }

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6b8fa3 0%, #5a7a8f 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        opacity: 0,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Patrón decorativo de fondo */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          backgroundImage: 'radial-gradient(circle at 80% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
          width: '300px',
          height: '300px'
        }}
      />

      {/* Confeti al abrir */}
      {isOpening &&
        Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              background: ['#d4af37', '#f5f3f0', '#6b8fa3'][Math.floor(Math.random() * 3)],
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 1
            }}
            ref={(el) => {
              if (el && isOpening) {
                gsap.to(el, {
                  x: (Math.random() - 0.5) * 500,
                  y: window.innerHeight + 100,
                  opacity: 0,
                  duration: 2.5 + Math.random() * 0.8,
                  delay: Math.random() * 0.3,
                  ease: 'power1.in'
                })
              }
            }}
          />
        ))}

      {/* Contenido principal */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '800px',
          color: 'white'
        }}
      >
        {/* Subtítulo */}
        <p
          style={{
            fontSize: '14px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: '#d4af37',
            marginBottom: '20px',
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          Somos el Honor de Invitarte
        </p>

        {/* Título principal */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 12vw, 5rem)',
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 700,
            color: 'white',
            margin: '0 0 15px 0',
            lineHeight: 1.1,
            textShadow: '2px 2px 8px rgba(0,0,0,0.3)'
          }}
        >
          Chanita & Javier
        </h1>

        {/* Línea decorativa */}
        <div
          style={{
            width: '120px',
            height: '3px',
            background: '#d4af37',
            margin: '20px auto 30px',
            borderRadius: '2px'
          }}
        />

        {/* Descripción */}
        <p
          style={{
            fontSize: '18px',
            color: '#f0f0f0',
            marginBottom: '15px',
            fontWeight: 300,
            lineHeight: 1.8,
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          Celebramos juntos 62 años de papá y 83 años de abuelita<br />
          Una doble celebración llena de amor, familia y momentos especiales
        </p>

        {/* Fecha */}
        <p
          style={{
            fontSize: '20px',
            color: '#d4af37',
            fontWeight: 700,
            marginBottom: '50px',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          8 de Agosto de 2026
        </p>

        {/* Botón */}
        <button
          onClick={handleOpen}
          style={{
            padding: '18px 60px',
            background: '#d4af37',
            color: '#1a3a52',
            border: 'none',
            borderRadius: '50px',
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 12px 35px rgba(212, 175, 55, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '1.3px',
            fontSize: '16px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            gsap.to(e.target, {
              background: '#e5c158',
              y: -3,
              duration: 0.3
            })
          }}
          onMouseLeave={(e) => {
            gsap.to(e.target, {
              background: '#d4af37',
              y: 0,
              duration: 0.3
            })
          }}
        >
          Ver Invitación Completa
        </button>
      </div>
    </div>
  )
}

