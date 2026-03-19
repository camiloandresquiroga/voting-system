# 🚀 Guía de Despliegue en Railway

Esta guía te ayudará a desplegar el Sistema de Votaciones completo (Frontend + API) en Railway.

## 📋 Requisitos Previos

1. Cuenta en [Railway.app](https://railway.app) (gratis)
2. Cuenta de GitHub (para conectar el repositorio)
3. Git instalado en tu computadora

---

## 🔧 Preparación del Proyecto

### 1. Inicializar Git (si no lo has hecho)

```bash
git init
git add .
git commit -m "Initial commit - Sistema de Votaciones"
```

### 2. Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio
2. Nombra el repositorio: `sistema-votaciones`
3. No inicialices con README (ya tienes uno)
4. Copia la URL del repositorio

### 3. Subir el Código a GitHub

```bash
git remote add origin https://github.com/TU_USUARIO/sistema-votaciones.git
git branch -M main
git push -u origin main
```

---

## 🚂 Despliegue en Railway

### Opción 1: Desde GitHub (Recomendada)

1. **Accede a Railway**
   - Ve a [railway.app](https://railway.app)
   - Inicia sesión con GitHub

2. **Crear Nuevo Proyecto**
   - Haz clic en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Autoriza Railway para acceder a tus repositorios

3. **Seleccionar Repositorio**
   - Busca y selecciona `sistema-votaciones`
   - Railway detectará automáticamente que es un proyecto Node.js

4. **Configurar Variables de Entorno** (Opcional)
   - Ve a la pestaña "Variables"
   - Agrega: `PORT=3000` (Railway lo asigna automáticamente)

5. **Desplegar**
   - Railway comenzará el despliegue automáticamente
   - Espera a que termine (2-3 minutos)

6. **Obtener URL**
   - Ve a "Settings" → "Domains"
   - Haz clic en "Generate Domain"
   - Copia la URL generada (ej: `sistema-votaciones-production.up.railway.app`)

### Opción 2: Desde CLI de Railway

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Inicializar proyecto
railway init

# Desplegar
railway up
```

---

## 🌐 Acceder a tu Aplicación

Una vez desplegado, tu aplicación estará disponible en:

```
https://tu-proyecto.up.railway.app
```

### Rutas Disponibles:

- **Frontend:** `https://tu-proyecto.up.railway.app/`
- **Registro:** `https://tu-proyecto.up.railway.app/pages/registro.html`
- **Votación:** `https://tu-proyecto.up.railway.app/pages/votacion.html`
- **Admin:** `https://tu-proyecto.up.railway.app/pages/admin.html`
- **Resultados:** `https://tu-proyecto.up.railway.app/pages/resultados.html`
- **Sincronizar:** `https://tu-proyecto.up.railway.app/pages/sincronizar.html`

### API Endpoints:

- **Base:** `https://tu-proyecto.up.railway.app/api`
- **Candidatos:** `https://tu-proyecto.up.railway.app/api/candidatos`
- **Estadísticas:** `https://tu-proyecto.up.railway.app/api/estadisticas`
- Ver todos los endpoints en el README.md

---

## 🔄 Actualizar el Despliegue

Cada vez que hagas cambios y los subas a GitHub, Railway se actualizará automáticamente:

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

Railway detectará el push y redesplegar automáticamente.

---

## ⚙️ Configuración Avanzada

### Variables de Entorno

En Railway → Settings → Variables, puedes agregar:

```
NODE_ENV=production
PORT=3000
```

### Dominio Personalizado

1. Ve a Settings → Domains
2. Haz clic en "Custom Domain"
3. Ingresa tu dominio (ej: `votaciones.midominio.com`)
4. Configura los DNS según las instrucciones

---

## 📊 Monitoreo

Railway proporciona:
- **Logs en tiempo real:** Pestaña "Deployments" → Ver logs
- **Métricas:** CPU, memoria, red
- **Reinicio automático:** Si la app falla

---

## 🐛 Solución de Problemas

### Error: "Application failed to respond"

**Solución:**
- Verifica que `PORT` use `process.env.PORT`
- Revisa los logs en Railway

### Error: "Build failed"

**Solución:**
- Verifica que `package.json` tenga todas las dependencias
- Asegúrate de que `node_modules` esté en `.gitignore`

### Los datos no persisten

**Nota:** Railway usa almacenamiento efímero. Los datos en archivos JSON se perderán al reiniciar.

**Soluciones:**
1. Usar una base de datos (Railway ofrece PostgreSQL gratis)
2. Usar un servicio de almacenamiento externo
3. Para pruebas, los datos en localStorage del navegador persisten

### CORS Errors

El servidor ya tiene CORS habilitado. Si tienes problemas:
- Verifica que la URL de la API sea correcta
- Revisa la consola del navegador para detalles

---

## 💰 Costos

Railway ofrece:
- **Plan Gratuito:** $5 de crédito mensual
- **Suficiente para:** Proyectos pequeños y pruebas
- **Uso estimado:** Este proyecto consume ~$3-4/mes en el plan gratuito

---

## 🔒 Seguridad

### Recomendaciones:

1. **Cambiar credenciales admin:**
   - Edita `js/admin.js` líneas 10-11
   - Usa variables de entorno para producción

2. **Agregar autenticación JWT** (opcional):
   ```bash
   npm install jsonwebtoken
   ```

3. **Rate limiting** (opcional):
   ```bash
   npm install express-rate-limit
   ```

---

## 📝 Checklist de Despliegue

- [ ] Código subido a GitHub
- [ ] Proyecto creado en Railway
- [ ] Repositorio conectado
- [ ] Despliegue exitoso
- [ ] URL generada y funcionando
- [ ] Frontend accesible
- [ ] API respondiendo correctamente
- [ ] Sincronización funcionando
- [ ] Credenciales admin cambiadas (recomendado)

---

## 🎉 ¡Listo!

Tu Sistema de Votaciones está ahora en producción y accesible desde cualquier lugar.

**URL de ejemplo:**
```
https://sistema-votaciones-production.up.railway.app
```

### Próximos Pasos:

1. Comparte la URL con los usuarios
2. Registra candidatos desde el panel admin
3. Los votantes pueden registrarse y votar
4. Monitorea los resultados en tiempo real

---

## 📚 Recursos Adicionales

- [Documentación de Railway](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)
- [Railway Status](https://status.railway.app)

---

**¿Necesitas ayuda?** Revisa los logs en Railway o consulta la documentación.