# 🎨 Guía de Personalización

Esta guía te ayudará a personalizar la invitación digital según tus necesidades.

---

## 🔤 Cambiar Nombres

### En el componente Hero

Archivo: `src/components/Hero.jsx`

```javascript
// Busca esta sección y cambia los nombres:
<h1 style={{...}}>
  Javier & Chanita  // ← Cambia estos nombres
</h1>

// También cambia las edades:
<p style={{...}}>62 años</p>  // ← Edad de Javier
<p style={{...}}>83 años</p>  // ← Edad de Chanita
```

### En el sobre inicial

Archivo: `src/components/EnvelopeIntro.jsx`

```javascript
<p style={{...}}>
  Javier & Chanita  // ← Cambia aquí también
</p>
```

### En el footer

Archivo: `src/pages/InvitationPage.jsx`

```javascript
<p style={{...}}>
  🎉 Cumpleaños Javier & Chanita 🎉  // ← Personaliza
</p>
```

---

## 📅 Cambiar Fecha y Hora

### Fecha del evento

Archivo: `src/components/Countdown.jsx`

```javascript
const targetDate = new Date('2026-08-08T00:00:00').getTime()
// Cambia 2026-08-08 por tu fecha: YYYY-MM-DD
```

### Hora y lugar

Archivo: `src/components/Party.jsx`

```javascript
const partyInfo = {
  lugar: 'Salón Los Girasoles',  // ← Tu lugar
  direccion: 'Calle Principal 123, Centro',  // ← Tu dirección
  fecha: 'Sábado, 8 de Agosto de 2026',  // ← Tu fecha
  hora: '5:00 PM',  // ← Tu hora
  googleMapsUrl: 'https://maps.google.com/?q=salón+los+girasoles',  // ← Tu ubicación
  descripcion: '¡Una noche mágica llena de música, baile y muchas sorpresas!'
}
```

---

## 🎵 Cambiar Música

### Reemplazar la música de fondo

Archivo: `src/components/MusicPlayer.jsx`

```javascript
const musicUrl = 'https://tu-url-de-musica.mp3'
// Reemplaza con tu URL de música (debe ser MP3)
```

**Opciones para subir música:**
- Supabase Storage (recomendado)
- YouTube Music (obtén URL directa)
- Spotify (con permisos)
- Archive.org
- Tu propio servidor

---

## 🖼️ Cambiar Fotos

### Galería de fotos

Archivo: `src/components/Gallery.jsx`

```javascript
const photos = [
  {
    id: 1,
    url: 'https://tu-url-foto-1.jpg',  // ← Cambia estas URLs
    alt: 'Foto 1'
  },
  {
    id: 2,
    url: 'https://tu-url-foto-2.jpg',
    alt: 'Foto 2'
  }
  // Agrega más fotos aquí
]
```

**Cómo obtener URLs de fotos:**
1. Sube las fotos a Supabase Storage
2. Copia la URL pública
3. Pégala en el array de fotos

---

## ⏰ Cambiar Itinerario

### Eventos del día

Archivo: `src/components/Itinerary.jsx`

```javascript
const timeline = [
  {
    id: 1,
    hora: '5:00 PM',  // ← Hora
    evento: 'Bienvenida',  // ← Nombre del evento
    descripcion: 'Llegada de invitados, bienvenida y cocktail',  // ← Descripción
    icon: Heart,  // ← Ícono (Heart, Music, Cake, etc.)
    color: '#FF1493'  // ← Color
  },
  // Agrega o modifica más eventos
]
```

**Íconos disponibles:**
- `Heart` - Corazón
- `Music` - Música
- `Cake` - Pastel
- `Utensils` - Cubiertos
- `Clock` - Reloj
- Y muchos más en `lucide-react`

---

## 🎨 Cambiar Colores

### Variables CSS globales

Archivo: `src/index.css`

```css
:root {
  /* Colores principales */
  --primary-orange: #FF6B35;  // ← Naranja
  --primary-pink: #FF1493;    // ← Rosa
  --primary-magenta: #E91E63; // ← Magenta
  --accent-gold: #FFD700;     // ← Dorado
  --accent-green: #00D084;    // ← Verde
  --accent-purple: #9C27B0;   // ← Púrpura
  --accent-cyan: #00BCD4;     // ← Cian
}
```

**Generador de colores:** https://coolors.co

---

## 🔐 Cambiar Contraseña Admin

### Nueva contraseña

Archivo: `src/pages/AdminPage.jsx`

```javascript
const handleLogin = (e) => {
  e.preventDefault()
  if (password === 'MagoAn#02') {  // ← Cambia aquí
    setAuthenticated(true)
    setPassword('')
  } else {
    alert('Contraseña incorrecta')
  }
}
```

Y en `src/components/EnvelopeIntro.jsx` también actualiza si necesitas.

---

## 📝 Cambiar Textos Principales

### Mensaje en el sobre

Archivo: `src/components/EnvelopeIntro.jsx`

```javascript
<h1>¡Una Sorpresa Especial!</h1>  // ← Cambia
<p>Javier & Chanita</p>  // ← Cambia
```

### Descripción en Hero

Archivo: `src/components/Hero.jsx`

```javascript
<p>¡Una doble celebración llena de amor!</p>  // ← Cambia
<p>Nos encantaría compartir este día especial contigo</p>  // ← Cambia
```

---

## 🌐 Personalización Avanzada

### Cambiar tipografía

Archivo: `src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=TuFuente:wght@400;700&display=swap');

:root {
  --font-display: 'TuFuente', sans-serif;
  --font-body: 'OtraFuente', sans-serif;
}
```

### Agregar nuevos componentes

1. Crea archivo `src/components/MiComponente.jsx`
2. Impórtalo en `src/pages/InvitationPage.jsx`
3. Úsalo en el JSX

### Cambiar estructura de la página

Archivo: `src/pages/InvitationPage.jsx`

```javascript
<Hero />
<Countdown />
<Party />
<Gallery />         // ← Puedes comentar esto
<Itinerary />       // ← O mover el orden
<RSVP />
```

---

## 🚀 Consejos de Diseño

### ✅ Lo que funciona bien:
- Mantener los colores vibrantes
- Usar fuentes grandes y legibles
- Animaciones suaves (no exagerar)
- Espacios en blanco generosos
- Elementos centrados en mobile

### ❌ Lo que evitar:
- Demasiados colores diferentes
- Fuentes muy pequeñas
- Animaciones que confunden
- Demasiado contenido en una sección

---

## 📱 Responsive Design

Los componentes están diseñados para funcionar en:
- Desktop (1920px+)
- Tablet (768px - 1920px)
- Mobile (< 768px)

Si cambias estilos, asegúrate de probar en:

```bash
# Abre DevTools (F12) y usa el modo móvil
```

---

## 💾 Guardar Cambios

Después de personalizar:

```bash
# Si usas Git
git add .
git commit -m "Personalizar invitación"
git push origin main

# Si hiciste deploy en Vercel, se actualizará automáticamente
```

---

## 🆘 Problemas Comunes

### Mi sitio se ve diferente en mobile

- Revisa el DevTools (F12)
- Verifica que no hayas puesto widths fijos
- Usa porcentajes en lugar de píxeles cuando sea posible

### Las fotos no cargan

- Verifica que las URLs sean correctas
- Asegúrate que sean HTTPS
- Comprueba que Supabase Storage esté configurado

### Los colores se ven raros

- Limpia el caché (Ctrl+Shift+Delete)
- Verifica el código hex de color
- Usa https://coolors.co para validar

---

## 🎁 Recursos Útiles

- **Google Fonts:** https://fonts.google.com
- **Coolors:** https://coolors.co
- **Lucide Icons:** https://lucide.dev
- **Unsplash (fotos):** https://unsplash.com
- **Pexels (fotos):** https://pexels.com

---

**¡Diviértete personalizando tu invitación! 🎨✨**
