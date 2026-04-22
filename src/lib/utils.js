// Funciones auxiliares para el proyecto

/**
 * Genera un token único para invitados
 */
export const generateToken = () => {
  return 'inv_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

/**
 * Formatea una fecha al formato local español
 */
export const formatDate = (date) => {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('es-ES', options)
}

/**
 * Formatea una hora
 */
export const formatTime = (hour) => {
  return `${String(hour).padStart(2, '0')}:00`
}

/**
 * Calcula el tiempo restante
 */
export const calculateTimeLeft = (targetDate) => {
  const difference = targetDate - new Date()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  }
}

/**
 * Genera URL de WhatsApp compartida
 */
export const generateWhatsAppShare = (invitedName, inviteUrl) => {
  const message = `¡Hola ${invitedName}! Te invito al cumpleaños de Javier & Chanita. Abre la invitación aquí: ${inviteUrl}`
  const encoded = encodeURIComponent(message)
  return `https://wa.me/?text=${encoded}`
}

/**
 * Valida email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Valida teléfono
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s+\-()]+$/
  return phoneRegex.test(phone) && phone.length >= 10
}

/**
 * Obtiene número de asistentes esperados
 */
export const getTotalExpectedGuests = (confirmaciones) => {
  return confirmaciones.reduce((total, conf) => total + (conf.asistira ? conf.num_personas : 0), 0)
}

/**
 * Calcula estadísticas de confirmaciones
 */
export const getConfirmationStats = (confirmaciones) => {
  const total = confirmaciones.length
  const confirmed = confirmaciones.filter(c => c.asistira).length
  const rejected = confirmaciones.filter(c => !c.asistira).length
  const pending = total - confirmed - rejected

  return {
    total,
    confirmed,
    rejected,
    pending,
    confirmationRate: total > 0 ? Math.round((confirmed / total) * 100) : 0,
    totalGuests: getTotalExpectedGuests(confirmaciones)
  }
}

/**
 * Ordena invitados por estado de asistencia
 */
export const sortInvitados = (invitados, sortBy = 'nombre') => {
  const copy = [...invitados]

  switch (sortBy) {
    case 'nombre':
      return copy.sort((a, b) => a.nombre.localeCompare(b.nombre))
    case 'familia':
      return copy.sort((a, b) => a.familia?.localeCompare(b.familia) || 0)
    case 'checked_in':
      return copy.sort((a, b) => (b.checked_in ? 1 : 0) - (a.checked_in ? 1 : 0))
    default:
      return copy
  }
}

/**
 * Exporta datos a CSV
 */
export const exportToCSV = (data, filename = 'datos.csv') => {
  const csv = [
    Object.keys(data[0]).join(','),
    ...data.map(obj =>
      Object.values(obj)
        .map(val => `"${val}"`)
        .join(',')
    )
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Copia texto al portapapeles
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Error al copiar:', err)
    return false
  }
}

/**
 * Formatea número con separador de miles
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Obtiene initiales de un nombre
 */
export const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}

/**
 * Calcula edad basado en fecha de nacimiento
 */
export const calculateAge = (birthDate) => {
  const today = new Date()
  const age = today.getFullYear() - new Date(birthDate).getFullYear()
  return age
}

/**
 * Detecta si es dispositivo móvil
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

/**
 * Scroll suave a elemento
 */
export const smoothScroll = (elementId) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Espera un tiempo en ms
 */
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
