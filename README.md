# 🎉 Invitación Digital — Javier & Chanita (Cumpleaños)

Una invitación digital interactiva y moderna para celebrar el cumpleaños de Javier (62 años) y Chanita (83 años) con sistema de gestión de invitados, confirmaciones RSVP y panel de administración.

**Estado:** En desarrollo | **Fecha del evento:** 8 de Agosto de 2026

---

## ✨ Características

### 🎊 Invitación Pública
- ✅ Pantalla de sobre animado al entrar (efecto sorpresa)
- ✅ Música de fondo con controles flotantes
- ✅ Contador regresivo en tiempo real hasta la fiesta
- ✅ Información detallada del lugar y hora
- ✅ Botón de "Cómo llegar" con Google Maps
- ✅ Formulario RSVP completo con validación
- ✅ Colores vibrantes y alegres (naranja, rosa, dorado, verde)
- ✅ Animaciones suaves y responsivo

### 🔧 Panel Admin
- ✅ Visualización de invitados con estado
- ✅ Seguimiento de confirmaciones RSVP
- ✅ Estadísticas de asistencia
- ✅ Protegido con contraseña (`MagoAn#02`)

---

## 🛠 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + Vite |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| Base de datos | Supabase (PostgreSQL) |
| Estilos | CSS-in-JS + CSS variables |
| Deploy | Vercel (recomendado) |

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── EnvelopeIntro.jsx      # Animación de sobre
│   ├── Hero.jsx               # Sección principal con nombres
│   ├── Countdown.jsx          # Contador regresivo
│   ├── Party.jsx              # Info del lugar y hora
│   ├── RSVP.jsx               # Formulario de confirmación
│   └── MusicPlayer.jsx        # Control de música flotante
├── pages/
│   ├── InvitationPage.jsx     # Página principal
│   └── AdminPage.jsx          # Panel de administración
├── lib/
│   └── supabase.js            # Cliente y funciones BD
├── App.jsx                    # Router principal
├── main.jsx                   # Entry point
├── index.css                  # Variables y estilos globales
└── .env                       # Variables de entorno
```

---

## 🗄 Base de Datos (Supabase)

### Tablas Necesarias

```sql
-- Invitados
CREATE TABLE invitados (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  familia TEXT,
  num_pases INTEGER DEFAULT 1,
  token TEXT UNIQUE,
  lado TEXT DEFAULT 'ambos',
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMP,
  hora_entrada TEXT,
  invitacion_enviada BOOLEAN DEFAULT FALSE,
  invitacion_enviada_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Confirmaciones RSVP
CREATE TABLE confirmaciones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  telefono TEXT,
  num_personas INTEGER,
  asistira BOOLEAN DEFAULT TRUE,
  restriccion_alimentaria TEXT,
  mensaje TEXT,
  lado TEXT,
  invitado_id UUID REFERENCES invitados(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Configuración general
CREATE TABLE configuracion (
  clave TEXT PRIMARY KEY,
  valor TEXT
);
```

---

## 🔐 Variables de Entorno

Crear archivo `.env` en la raíz con:

```env
VITE_SUPABASE_URL=https://oukwmfdezbrjkfetaftj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91a3dtZmRlemJyamtmZXRhZnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MTEzMzQsImV4cCI6MjA5MjM4NzMzNH0.Og3vZLF1DNYbui-EcY0vnbfouhz1y7B5COyRuvVdlQs
```

---

## 🚀 Instalación Local

### Prerrequisitos
- Node.js 16+ y npm/yarn
- Cuenta en Supabase

### Pasos

```bash
# 1. Clonar o descargar el proyecto
cd cumpleaños

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env con las variables de Supabase

# 4. Crear las tablas en Supabase (ver sección de BD arriba)

# 5. Ejecutar en desarrollo
npm run dev
```

La app estará disponible en `http://localhost:3000`

---

## 🌐 Rutas de la App

| Ruta | Descripción | Acceso |
|------|-----------|--------|
| `/` | Invitación principal | Público |
| `/admin` | Panel de administración | Requiere contraseña |

**Contraseña admin:** `MagoAn#02`

---

## 🎨 Paleta de Colores

- **Naranja vibrante:** `#FF6B35` (primario)
- **Rosa/Magenta:** `#FF1493` - `#E91E63`
- **Dorado:** `#FFD700` (acentos)
- **Verde vibrante:** `#00D084`
- **Cian:** `#00BCD4`
- **Púrpura:** `#9C27B0`

---

## 📦 Dependencias Principales

```json
{
  "react": "^19.0.0",
  "react-router-dom": "^6.20.0",
  "@supabase/supabase-js": "^2.38.0",
  "framer-motion": "^12.0.0",
  "lucide-react": "^0.408.0"
}
```

---

## 🚀 Deploy en Vercel

### Opción 1: Automático (Recomendado)

1. Push el código a GitHub
2. Conecta el repo en [Vercel](https://vercel.com)
3. Agrega las variables de entorno en Settings
4. Deploy automático ✅

### Opción 2: Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 📝 Notas Importantes

- ✅ Los colores son vibrantes y alegres, perfectos para celebración
- ✅ Todas las animaciones son suaves y no interfieren con la experiencia
- ✅ El formulario RSVP se envía directamente a Supabase
- ✅ Responsivo en mobile y desktop
- ✅ Las fuentes (Fredoka, Poppins) se cargan desde Google Fonts
- ⚠️ La música requiere interacción del usuario antes de reproducir (restricción del navegador)

---

## 🔧 Personalización

### Cambiar fecha del evento
Editar en `src/components/Countdown.jsx`:
```javascript
const targetDate = new Date('2026-08-08T00:00:00').getTime()
```

### Cambiar información del lugar
Editar en `src/components/Party.jsx`:
```javascript
const partyInfo = {
  lugar: 'Salón Los Girasoles',
  direccion: 'Calle Principal 123',
  googleMapsUrl: 'https://maps.google.com/?q=...'
}
```

### Cambiar música
Reemplazar URL en `src/components/MusicPlayer.jsx`:
```javascript
const musicUrl = 'https://tu-url-de-musica.mp3'
```

---

## 📞 Soporte

Para problemas o dudas:
1. Verificar que las variables de entorno sean correctas
2. Confirmar que las tablas de Supabase existan
3. Revisar la consola del navegador para mensajes de error

---

## 👨‍💻 Desarrollado para

**Celebración:** Cumpleaños de Javier (62 años) & Chanita (83 años)  
**Fecha:** 8 de Agosto de 2026  
**Creado con:** ❤️ Amor y tecnología

---

## 📄 Licencia

Este proyecto es privado y está creado específicamente para esta celebración.

---

**¡A disfrutar del cumpleaños! 🎉🎂✨**
