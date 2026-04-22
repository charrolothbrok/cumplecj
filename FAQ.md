# ❓ Preguntas Frecuentes (FAQ)

## 🚀 Instalación y Setup

### P: ¿Necesito pagar por algo?
**R:** No, todo es gratuito:
- GitHub: Gratis
- Vercel: Gratis (plan básico suficiente)
- Supabase: Gratis hasta 500MB
- Las librerías: Todas open-source

### P: ¿Qué requisitos necesito?
**R:** Solo necesitas:
- Node.js 16+ (descárgalo de nodejs.org)
- GitHub account (opcional, pero recomendado)
- Supabase account (gratis)

### P: ¿Cómo instalo Node.js?
**R:** 
1. Ve a https://nodejs.org
2. Descarga la versión LTS (recomendada)
3. Instálalo (siguiente, siguiente, siguiente)
4. Abre terminal y verifica: `node --version`

### P: ¿Qué es npm?
**R:** npm es un gestor de paquetes que viene con Node.js. Necesitamos para descargar las librerías (React, Supabase, etc.)

---

## 🗄️ Base de Datos (Supabase)

### P: ¿Cómo creo las tablas en Supabase?
**R:** 
1. Ve a https://supabase.com y crea cuenta
2. Crea un nuevo proyecto
3. Ve a SQL Editor
4. Copia el contenido de `setup_database.sql`
5. Pégalo y ejecuta

### P: ¿Dónde encuentro mis credenciales de Supabase?
**R:**
1. Ve a Settings → API en tu proyecto Supabase
2. Copia `Project URL` y `anon public key`
3. Pégalos en tu archivo `.env`

### P: ¿Se perderán los datos si dejo el proyecto?
**R:** No, los datos se guardan en Supabase indefinidamente. Vercel solo hosting.

### P: ¿Puedo ver los datos desde Supabase?
**R:** Sí, ve a tu proyecto → Table Editor y verás todas las confirmaciones.

---

## 🌐 Deploy y Hosting

### P: ¿Cómo comparto la invitación?
**R:** Dale a cualquiera la URL:
- Si está en Vercel: `https://tu-proyecto.vercel.app`
- Compártelo por WhatsApp, email, redes sociales

### P: ¿Puedo usar mi propio dominio?
**R:** Sí:
1. Compra un dominio (godaddy.com, namecheap.com, etc.)
2. En Vercel → Settings → Domains
3. Agrega tu dominio

### P: ¿Vercel es seguro?
**R:** Sí, Vercel es usado por miles de empresas grandes. Ofrece HTTPS automático y backups.

### P: ¿Qué significa "Build"?
**R:** Es cuando Vercel transforma tu código React en archivos que el navegador puede entender.

---

## 🎨 Personalización

### P: ¿Dónde cambio los nombres?
**R:** Búsqueda y reemplaza (Ctrl+H) en Visual Studio Code:
- Busca: "Javier & Chanita"
- Reemplaza por tus nombres

### P: ¿Cómo agrego más fotos?
**R:** En `src/components/Gallery.jsx`:
1. Sube fotos a Supabase Storage
2. Copia la URL pública
3. Agrégalas al array `photos`

### P: ¿Puedo cambiar los colores?
**R:** Sí, en `src/index.css` en la sección `:root`. Usa https://coolors.co para inspiración.

### P: ¿Cómo cambio la contraseña del admin?
**R:** En `src/pages/AdminPage.jsx`, busca:
```javascript
if (password === 'MagoAn#02') {
```
Y reemplaza `'MagoAn#02'` por tu nueva contraseña.

---

## 📱 Funcionalidad

### P: ¿Funciona en teléfono?
**R:** Sí, funciona perfectamente en mobile. Está optimizado.

### P: ¿La música se reproduce automáticamente?
**R:** No (restricción de navegadores), pero se activa cuando el usuario abre el sobre.

### P: ¿Dónde se guardan las confirmaciones RSVP?
**R:** En la tabla `confirmaciones` de Supabase. Las ves en el panel admin.

### P: ¿Puedo recibir notificaciones de confirmaciones?
**R:** Sí, configurando webhooks en Supabase. (Avanzado)

### P: ¿El contador regresivo es en tiempo real?
**R:** Sí, se actualiza cada segundo en el navegador del usuario.

---

## 🐛 Problemas Comunes

### P: Cuando ejecuto `npm install` sale error
**R:** Intenta:
```bash
npm install --legacy-peer-deps
```

### P: "Cannot find module 'react'"
**R:** Ejecuta:
```bash
npm install
```

### P: La página carga en blanco
**R:** Abre DevTools (F12) y mira la consola para ver errores.

### P: Vercel dice "Build failed"
**R:**
1. Abre los logs de build en Vercel
2. Lee el error (usualmente el nombre del archivo que falta)
3. Verifica que el archivo exista
4. Intenta de nuevo

### P: Las variables de entorno no funcionan
**R:**
1. Verifica que estén en `.env`
2. Verifica que las hayas agregado en Vercel Settings
3. Re-deploy después de agregarlas

### P: Las imágenes no cargan
**R:**
1. Verifica que las URLs sean HTTPS
2. Verifica que Supabase Storage permita acceso público
3. Copia el URL exacto desde Supabase

---

## 💻 Desarrollo

### P: ¿Cómo ejecuto la app localmente?
**R:**
```bash
npm run dev
```
Luego ve a http://localhost:3000

### P: ¿Cómo hago cambios?
**R:**
1. Edita los archivos en tu editor
2. Guarda (Ctrl+S)
3. La página se actualiza automáticamente

### P: ¿Puedo usar otros componentes de React?
**R:** Sí, instálalos con `npm install nombre-libreria`

### P: ¿Cómo veo cambios en producción?
**R:** Haz git push y Vercel se actualiza automáticamente.

---

## 📊 Admin Panel

### P: ¿Cómo accedo al admin?
**R:** Ve a `/admin` en tu URL y usa la contraseña.

### P: ¿Qué puedo ver en el admin?
**R:**
- Lista de invitados
- Confirmaciones RSVP
- Estadísticas

### P: ¿Puedo exportar los datos?
**R:** Actualmente desde Supabase directamente:
1. Ve a tu proyecto Supabase
2. Descarga como CSV desde Table Editor

### P: ¿Puedo eliminar datos?
**R:** Sí, directamente en Supabase Table Editor (ten cuidado).

---

## 🔒 Seguridad

### P: ¿Es seguro mi página?
**R:** Sí:
- HTTPS automático (Vercel)
- Datos encriptados (Supabase)
- Acceso controlado (contraseña admin)

### P: ¿Quién puede ver los datos de RSVP?
**R:** Solo tú en el panel admin (con contraseña).

### P: ¿Cómo cambio la contraseña?
**R:** En `AdminPage.jsx`, busca y reemplaza el string de password.

---

## 📈 Análisis

### P: ¿Cuánta gente entra a mi invitación?
**R:** Vercel Analytics (Settings → Analytics)

### P: ¿Cuántos confirmaron?
**R:** En el panel admin (/admin) ves todas las confirmaciones.

---

## 🤝 Soporte

### P: ¿A quién le pregunto si tengo problema?
**R:**
- Supabase docs: https://supabase.com/docs
- Vercel docs: https://vercel.com/docs
- React docs: https://react.dev
- Stack Overflow

### P: ¿Puedo pedir cambios?
**R:** Sí, puedes:
1. Aprender JavaScript/React básico
2. Hacer los cambios tú
3. O contratar a alguien para que lo haga

### P: ¿Hay versión para iOS/Android?
**R:** Es una web app, funciona en cualquier navegador (mobile o desktop).

---

## 🎯 Casos de Uso

### P: ¿Puedo usarlo para otra fiesta?
**R:** Sí, personalízalo con los nuevos detalles.

### P: ¿Puedo duplicar el proyecto?
**R:** Sí, haz un fork o copia todo el código.

### P: ¿Puedo venderlo?
**R:** Las librerías que usamos lo permiten, pero respeta las licencias.

---

## 🚀 Tips Pro

### ✅ Haz backup de tus datos
```bash
git push con frecuencia
```

### ✅ Prueba en mobile
Usa DevTools (F12) → Responsive design

### ✅ Personaliza antes de compartir
Dale tu toque especial

### ✅ Prueba el formulario RSVP
Asegúrate de que guarde datos correctamente

### ✅ Comparte el link con anticipación
Más tiempo = más confirmaciones

---

## 📞 Contacto y Ayuda

Si tienes problemas no listados aquí:

1. **Google:** Busca el error exacto
2. **Stack Overflow:** Pregunta con detalles específicos
3. **Comunidad:** Reddit (r/reactjs, r/webdev)
4. **Documentación oficial:** Lee la doc del producto

---

**¡Espero que estas respuestas te ayuden! Si tienes más preguntas, no dudes en investigar. 🚀**
