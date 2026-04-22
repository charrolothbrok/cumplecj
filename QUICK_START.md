# ⚡ Inicio Rápido (Quick Start)

¡Bienvenido! Esta es la guía más rápida para poner tu invitación en línea.

---

## 📋 Antes de Empezar

Tienes:
- ✅ URL de Supabase: `https://oukwmfdezbrjkfetaftj.supabase.co`
- ✅ Anonkey de Supabase
- ✅ Database password
- ✅ Node.js instalado
- ✅ Este código descargado

---

## 5 Pasos para Empezar

### Paso 1: Configurar Supabase (5 min)

1. Ve a https://supabase.com
2. Inicia sesión con tu cuenta
3. Ve a tu proyecto
4. Ve a SQL Editor
5. Copia el contenido de `setup_database.sql`
6. Pégalo y ejecuta (botón play)
7. ✅ Listo, tablas creadas

### Paso 2: Instalar Dependencias (3 min)

```bash
# Abre terminal en la carpeta del proyecto
cd cumpleaños

# Instala las librerías
npm install

# Si sale error, intenta:
npm install --legacy-peer-deps
```

### Paso 3: Verificar Variables de Entorno (1 min)

Abre archivo `.env` y verifica que tenga:

```env
VITE_SUPABASE_URL=https://oukwmfdezbrjkfetaftj.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91a3dtZmRlemJyamtmZXRhZnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MTEzMzQsImV4cCI6MjA5MjM4NzMzNH0.Og3vZLF1DNYbui-EcY0vnbfouhz1y7B5COyRuvVdlQs
```

### Paso 4: Ejecutar Localmente (30 seg)

```bash
npm run dev
```

Se abrirá una ventana del navegador con tu invitación.
- **URL:** http://localhost:3000
- **Admin:** http://localhost:3000/admin (contraseña: `MagoAn#02`)

### Paso 5: Hacer Deploy (10 min)

Ver: `DEPLOY_GUIDE.md`

TL;DR:
1. Sube código a GitHub
2. Conecta con Vercel
3. Agrega variables de entorno
4. Deploy automático ✅

---

## 🎯 Próximos Pasos

### Inmediatamente:
- [ ] Personalizar nombres (Hero.jsx)
- [ ] Cambiar fecha del evento (Countdown.jsx)
- [ ] Actualizar lugar (Party.jsx)

### Antes de Compartir:
- [ ] Subir fotos (Gallery.jsx)
- [ ] Personalizar itinerario (Itinerary.jsx)
- [ ] Cambiar contraseña admin (AdminPage.jsx)
- [ ] Probar en mobile (F12)

### Después de Deploy:
- [ ] Compartir link en WhatsApp, email, etc.
- [ ] Monitorear confirmaciones en /admin
- [ ] Exportar datos cuando terminen confirmaciones

---

## 📁 Archivos Importantes

```
cumpleaños/
├── .env                    ← Variables de Supabase
├── package.json           ← Dependencias
├── src/
│   ├── components/        ← Componentes de la página
│   ├── pages/            ← Páginas (invitación, admin)
│   ├── lib/
│   │   ├── supabase.js   ← Conexión a BD
│   │   └── utils.js      ← Funciones auxiliares
│   ├── App.jsx           ← Router
│   └── index.css         ← Estilos globales
├── README.md             ← Documentación
├── setup_database.sql    ← Script para crear tablas
└── DEPLOY_GUIDE.md       ← Cómo hacer deploy
```

---

## 🔑 Contraseñas y Credenciales

| Elemento | Valor | Dónde cambiar |
|----------|-------|---------------|
| Admin password | `MagoAn#02` | `AdminPage.jsx` línea ~60 |
| Supabase URL | Ya configurada | `.env` |
| Supabase Key | Ya configurada | `.env` |

---

## 🌐 URLs Después de Deploy

Una vez en Vercel:
- **Invitación:** `https://tu-proyecto.vercel.app`
- **Admin:** `https://tu-proyecto.vercel.app/admin`

---

## ❌ Si Algo Sale Mal

### "npm: command not found"
→ Node.js no está instalado. Ve a nodejs.org

### "Cannot find module"
→ Ejecuta `npm install`

### Vercel dice "Build failed"
→ Abre logs, léelos con cuidado. Usualmente falta un archivo.

### La página está en blanco
→ Abre DevTools (F12) → Console. Busca errores en rojo.

### Las confirmaciones no se guardan
→ Verifica variables de entorno en Vercel Settings

---

## 💡 Tips

✅ **Testing:** Completa el formulario RSVP para verificar que funciona  
✅ **Backup:** Haz `git push` frecuentemente  
✅ **Mobile:** Prueba en teléfono con DevTools  
✅ **Datos:** Descarga confirmaciones antes de borrar BD  

---

## 📞 Ayuda Rápida

**Documentación completa:**
- README.md - Detalles técnicos
- CUSTOMIZATION_GUIDE.md - Cómo personalizar
- DEPLOY_GUIDE.md - Deploy en Vercel
- FAQ.md - Preguntas frecuentes
- setup_database.sql - Crear tablas

---

## 🎉 ¡Listo!

Ya deberías tener:

```
✅ Código descargado
✅ Supabase configurado
✅ Variables de entorno
✅ Dependencias instaladas
✅ Invitación corriendo localmente
```

### Siguiente: Personaliza y comparte 🚀

---

## 📋 Checklist Final

- [ ] Código clonado/descargado
- [ ] Variables de entorno en `.env`
- [ ] Tablas de Supabase creadas
- [ ] `npm install` completado
- [ ] `npm run dev` funcionando
- [ ] Acceso a `/admin` con contraseña
- [ ] Nombres personalizados
- [ ] Fecha correcta
- [ ] Lugar correcto
- [ ] Fotos agregadas
- [ ] Deploy en Vercel listo
- [ ] Link compartido con invitados
- [ ] ¡Celebración lista! 🎉

---

**Tiempo total: ~30 minutos desde cero**

¿Listo? ¡Comienza! 🚀
