import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function LetterIntro({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)
  const containerRef = useRef(null)
  const envelopeRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonRef = useRef(null)

  // Animación inicial con GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Fade in general
      tl.to(containerRef.current, { opacity: 1, duration: 0.8 })

      // Título aparece con scale
      tl.from(
        titleRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 30,
          duration: 0.8,
          ease: 'power2.out'
        },
        0.2
      )

      // Subtítulo aparece
      tl.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out'
        },
        0.4
      )

      // Sobre aparece con bounce
      tl.from(
        envelopeRef.current,
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'back.out'
        },
        0.6
      )

      // Botón aparece
      tl.from(
        buttonRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out'
        },
        0.8
      )

      // Animación continua del sobre (flotar)
      gsap.to(envelopeRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    })

    return () => ctx.revert()
  }, [])

  const handleOpen = () => {
    setIsOpening(true)

    // Animación de apertura con GSAP
    gsap.to(envelopeRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.in'
    })

    setTimeout(() => {
      onOpen()
    }, 1500)
  }

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: '#f5f1e8',
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
      {/* Confeti con GSAP */}
      {isOpening &&
        Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              background: ['#8b1538', '#d4af37', '#a82d4a'][
                Math.floor(Math.random() * 3)
              ],
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

      {/* Contenedor principal */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '700px'
        }}
      >
        {/* Línea decorativa */}
        <div
          style={{
            height: '2px',
            width: '100px',
            background: '#8b1538',
            margin: '0 auto 30px',
            borderRadius: '1px'
          }}
        />

        {/* Texto pequeño decorativo */}
        <p
          style={{
            fontSize: '14px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#4a4a4a',
            marginBottom: '20px',
            fontWeight: 500,
            fontFamily: "'Poppins', sans-serif",
            margin: '0 0 20px 0'
          }}
        >
          Con Amor Los Invitamos
        </p>

        {/* TÍTULO - SÓLIDO, NO GRADIENTE */}
        <h1
          ref={titleRef}
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 5rem)',
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 700,
            color: '#1a1a1a',
            margin: '0 0 10px 0',
            lineHeight: 1.1,
            letterSpacing: '-1px'
          }}
        >
          Chanita & Javier
        </h1>

        {/* Línea decorativa */}
        <div
          style={{
            height: '3px',
            width: '150px',
            background: '#8b1538',
            margin: '25px auto 30px',
            borderRadius: '2px'
          }}
        />

        {/* Subtítulo - SÓLIDO */}
        <div
          ref={subtitleRef}
          style={{
            marginBottom: '50px'
          }}
        >
          <p
            style={{
              fontSize: '18px',
              color: '#666666',
              margin: '0 0 10px 0',
              fontWeight: 300,
              lineHeight: 1.6,
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Una doble celebración llena de amor
          </p>
          <p
            style={{
              fontSize: '16px',
              color: '#8b1538',
              fontWeight: 600,
              margin: 0,
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            8 de Agosto de 2026
          </p>
        </div>

        {/* SOBRE - Elegante y minimalista */}
        <div
          ref={envelopeRef}
          onClick={handleOpen}
          style={{
            width: '220px',
            height: '140px',
            background: 'white',
            borderRadius: '4px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
            position: 'relative',
            margin: '40px auto',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            border: '1px solid rgba(139, 21, 56, 0.1)'
          }}
        >
          {/* Solapa decorativa */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: '#8b1538',
              borderRadius: '4px 4px 0 0',
              opacity: 0.9
            }}
          />

          {/* Contenido */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>✉️</div>
            <p
              style={{
                fontSize: '12px',
                color: '#4a4a4a',
                fontWeight: 500,
                margin: 0,
                fontFamily: "'Poppins', sans-serif"
              }}
            >
              Toca para abrir
            </p>
          </div>

          {/* Listón decorativo */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '25px',
              height: '140px',
              background: '#8b1538',
              opacity: 0.8,
              zIndex: 1
            }}
          />

          {/* Sello */}
          <div
            style={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              width: '45px',
              height: '45px',
              background: '#d4af37',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              zIndex: 3,
              boxShadow: '0 4px 12px rgba(212, 175, 55, 0.25)'
            }}
          >
            ✓
          </div>
        </div>

        {/* BOTÓN - Grande y prominente */}
        <button
          ref={buttonRef}
          onClick={handleOpen}
          style={{
            marginTop: '50px',
            padding: '16px 50px',
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: "'Fredoka', sans-serif",
            background: '#8b1538',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(139, 21, 56, 0.25)',
            textTransform: 'uppercase',
            letterSpacing: '1.2px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            gsap.to(e.target, {
              scale: 1.08,
              boxShadow: '0 12px 35px rgba(139, 21, 56, 0.35)',
              duration: 0.3
            })
          }}
          onMouseLeave={(e) => {
            gsap.to(e.target, {
              scale: 1,
              boxShadow: '0 8px 25px rgba(139, 21, 56, 0.25)',
              duration: 0.3
            })
          }}
        >
          Abre la Invitación
        </button>

        {/* Línea decorativa final */}
        <div
          style={{
            height: '2px',
            width: '100px',
            background: '#8b1538',
            margin: '50px auto 0',
            borderRadius: '1px'
          }}
        />
      </div>
    </div>
  )
}
