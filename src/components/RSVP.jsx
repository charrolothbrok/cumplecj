import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { confirmacionesDB } from '../lib/supabase'

export default function RSVP() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    numPersonas: '1',
    asistira: true,
    restriccionAlimentaria: '',
    mensaje: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await confirmacionesDB.create({
        nombre: formData.nombre,
        telefono: formData.telefono,
        num_personas: parseInt(formData.numPersonas),
        asistira: formData.asistira,
        restriccion_alimentaria: formData.restriccionAlimentaria,
        mensaje: formData.mensaje
      })

      setSubmitted(true)
      setFormData({
        nombre: '',
        telefono: '',
        numPersonas: '1',
        asistira: true,
        restriccionAlimentaria: '',
        mensaje: ''
      })

      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      setError('Hubo un error al enviar tu confirmación. Intenta de nuevo.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      data-section="rsvp"
      style={{
        padding: 'var(--spacing-xxl) var(--spacing-lg)',
        background: 'linear-gradient(135deg, rgba(156,39,176,0.05) 0%, rgba(0,188,212,0.05) 100%)'
      }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          <h2 style={{
            fontSize: '2.5rem',
            textAlign: 'center',
            marginBottom: 'var(--spacing-md)',
            color: 'var(--text-primary)'
          }}>
            Confirma tu Asistencia
          </h2>

          <p style={{
            textAlign: 'center',
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--spacing-xl)'
          }}>
            Cuéntanos si irás a la fiesta y ayúdanos a preparar una celebración inolvidable
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: 'linear-gradient(135deg, var(--accent-green) 0%, var(--accent-cyan) 100%)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-xl)',
                textAlign: 'center',
                color: 'white'
              }}
            >
              <CheckCircle size={64} style={{
                margin: '0 auto var(--spacing-md)',
                animation: 'bounce-gentle 1s infinite'
              }} />
              <h3 style={{
                fontSize: '1.8rem',
                marginBottom: 'var(--spacing-sm)',
                fontFamily: 'var(--font-display)'
              }}>
                ¡Gracias por Confirmar!
              </h3>
              <p style={{
                fontSize: '1.1rem',
                opacity: 0.95
              }}>
                Tu respuesta ha sido registrada. ¡Nos vemos en la fiesta!
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--spacing-lg)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: '#FFE0E0',
                    color: '#D32F2F',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--spacing-md)',
                    fontSize: '0.95rem'
                  }}
                >
                  {error}
                </motion.div>
              )}

              {/* Nombre */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ marginBottom: 'var(--spacing-md)' }}
              >
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}>
                  Tu Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Juan García"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-sm)',
                    border: '2px solid var(--light-dark)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.3s ease'
                  }}
                />
              </motion.div>

              {/* Teléfono */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                style={{ marginBottom: 'var(--spacing-md)' }}
              >
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}>
                  Tu Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Ej: +34 612 345 678"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-sm)',
                    border: '2px solid var(--light-dark)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-body)',
                    transition: 'all 0.3s ease'
                  }}
                />
              </motion.div>

              {/* Número de personas */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{ marginBottom: 'var(--spacing-md)' }}
              >
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}>
                  ¿Cuántas personas asistirán? *
                </label>
                <select
                  name="numPersonas"
                  value={formData.numPersonas}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-sm)',
                    border: '2px solid var(--light-dark)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-body)',
                    cursor: 'pointer'
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'persona' : 'personas'}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* ¿Asistirás? */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                style={{ marginBottom: 'var(--spacing-md)' }}
              >
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}>
                  <input
                    type="checkbox"
                    name="asistira"
                    checked={formData.asistira}
                    onChange={handleChange}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer'
                    }}
                  />
                  Sí, ¡Voy a asistir! 🎉
                </label>
              </motion.div>

              {/* Restricción alimentaria */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ marginBottom: 'var(--spacing-md)' }}
              >
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}>
                  Restricciones Alimentarias
                </label>
                <input
                  type="text"
                  name="restriccionAlimentaria"
                  value={formData.restriccionAlimentaria}
                  onChange={handleChange}
                  placeholder="Ej: Vegetariano, sin gluten, etc."
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-sm)',
                    border: '2px solid var(--light-dark)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-body)'
                  }}
                />
              </motion.div>

              {/* Mensaje */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{ marginBottom: 'var(--spacing-lg)' }}
              >
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}>
                  Déjanos un Mensaje
                </label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="¡Felicidades! Espero..."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-sm)',
                    border: '2px solid var(--light-dark)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '1rem',
                    fontFamily: 'var(--font-body)',
                    resize: 'vertical'
                  }}
                />
              </motion.div>

              {/* Botón enviar */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  background: 'var(--gradient-main)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--spacing-sm)',
                  opacity: loading ? 0.6 : 1,
                  transition: 'all 0.3s ease',
                  fontFamily: 'var(--font-body)'
                }}
              >
                <Send size={20} />
                {loading ? 'Enviando...' : 'Confirmar Asistencia'}
              </motion.button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
