import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-08-08T00:00:00').getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const TimeUnit = ({ value, label }) => (
    <motion.div
      key={value}
      initial={{ scale: 1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        flex: 1,
        padding: 'var(--spacing-md)',
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        minWidth: '80px'
      }}
    >
      <motion.div
        key={value}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          fontSize: '2.5rem',
          fontWeight: 700,
          background: 'var(--gradient-main)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: 'var(--font-display)'
        }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        marginTop: '8px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {label}
      </p>
    </motion.div>
  )

  return (
    <section style={{
      padding: 'var(--spacing-xxl) var(--spacing-lg)',
      background: 'linear-gradient(135deg, rgba(255,107,53,0.05) 0%, rgba(233,30,99,0.05) 100%)',
      textAlign: 'center'
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            marginBottom: 'var(--spacing-lg)'
          }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: 'var(--spacing-md)',
            color: 'var(--text-primary)'
          }}>
            ¿Cuánto falta?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--spacing-xl)'
          }}>
            Cuenta regresiva para la gran celebración • 8 de Agosto
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: 'var(--spacing-md)',
            maxWidth: '500px',
            margin: '0 auto'
          }}
        >
          <TimeUnit value={timeLeft.days} label="Días" />
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <TimeUnit value={timeLeft.minutes} label="Minutos" />
          <TimeUnit value={timeLeft.seconds} label="Segundos" />
        </motion.div>

        {/* Mensaje adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          style={{
            marginTop: 'var(--spacing-xxl)'
          }}
        >
          <p style={{
            fontSize: '1.2rem',
            fontWeight: 600,
            background: 'var(--gradient-warm)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            ¡La fiesta está cada vez más cerca! 🎉
          </p>
        </motion.div>
      </div>
    </section>
  )
}
