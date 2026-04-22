# 🚀 Guía de Deploy en Vercel

Esta guía te ayudará a desplegar tu invitación digital en Vercel, un servicio gratuito de hosting.

---

## 📋 Prerrequisitos

- Cuenta en GitHub (https://github.com)
- Cuenta en Vercel (https://vercel.com)
- Tener configuradas las variables de entorno de Supabase

---

## Opción 1: Deploy Automático (Recomendado)

### Paso 1: Subir el código a GitHub

```bash
# 1. Inicializar git (si no lo has hecho)
git init

# 2. Agregar todos los archivos
git add .

# 3. Hacer commit
git commit -m "Invitación Javier & Chanita"

# 4. Agregar el remote (reemplaza tu-usuario y nombre-repo)
git remote add origin https://github.com/tu-usuario/nombre-repo.git

# 5. Hacer push
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Vercel

1. Ve a https://vercel.com
2. Haz clic en "Sign Up" (o inicia sesión si ya tienes cuenta)
3. Haz clic en "Continue with GitHub"
4. Autoriza a Vercel para acceder a tus repositorios
5. En el dashboard, haz clic en "New Project"
6. Selecciona tu repositorio `nombre-repo`
7. Haz clic en "Import"

### Paso 3: Configurar variables de entorno

En la pantalla de "Configure Project":

1. Ve a la sección "Environment Variables"
2. Agrega las siguientes variables:
   - **VITE_SUPABASE_URL**: `https://oukwmfdezbrjkfetaftj.supabase.co`
   - **VITE_SUPABASE_ANON_KEY**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91a3dtZmRlemJyamtmZXRhZnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MTEzMzQsImV4cCI6MjA5MjM4NzMzNH0.Og3vZLF1DNYbui-EcY0vnbfouhz1y7B5COyRuvVdlQs`

3. Haz clic en "Deploy"

### ✅ ¡Listo!

Tu app estará disponible en una URL como `https://nombre-repo.vercel.app`

---

## Opción 2: Deploy Manual con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm i -g vercel
```

### Paso 2: Hacer deploy

```bash
# 1. Navega a la carpeta del proyecto
cd cumpleaños

# 2. Ejecuta vercel
vercel

# 3. Sigue las instrucciones:
#    - "Set up and deploy? [Y/n]" → Y
#    - "Which scope do you want to deploy to?" → Tu cuenta
#    - "Link to existing project? [y/N]" → N
#    - "What's your project's name?" → cumpleaños
#    - "In which directory is your code located?" → ./
#    - Agrega las variables de entorno cuando lo pida

# 4. ¡Tu app estará deployed!
```

---

## 📝 Después del Deploy

### Actualizar el dominio

Si Vercel te da una URL, la puedes personalizar:

1. Ve a tu proyecto en https://vercel.com
2. Haz clic en "Settings"
3. Ve a "Domains"
4. Agregar tu dominio personalizado (si tienes uno)

### Actualizar contenido después

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

Vercel se actualizará automáticamente 🚀

---

## 🔧 Solucionar Problemas

### "Build failed"

- Verifica que todas las dependencias estén en `package.json`
- Revisa la consola de Vercel para ver el error exacto

### Variables de entorno no funcionan

- Revisa que las variables estén agregadas en Settings → Environment Variables
- Asegúrate de que `npm run build` funciona localmente

### La app se ve rota

- Limpia el caché del navegador (Ctrl+Shift+Delete)
- Verifica que todas las imágenes y URLs externas sean accesibles

---

## 💡 Tips Útiles

- **Dominio gratis:** Usa el dominio `.vercel.app` incluido
- **HTTPS:** Automático y gratis ✅
- **Analytics:** Disponible en Settings
- **Logs:** Ve a "Deployments" para ver logs de build
- **Rollback:** Si algo se rompe, revierte a un deploy anterior

---

## 📞 Soporte

- Documentación de Vercel: https://vercel.com/docs
- Soporte de Supabase: https://supabase.com/docs
- GitHub Community: https://github.community

---

**¡Tu invitación digital está lista para ser compartida! 🎉**
