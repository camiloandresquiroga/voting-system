# 🚀 Inicio Rápido - Sistema de Votaciones

## Opción 1: Desarrollo Local (5 minutos)

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor
npm start

# 3. Abrir en navegador
# http://localhost:3000
```

**Credenciales Admin:**
- Usuario: `admin`
- Contraseña: `admin123`

---

## Opción 2: Despliegue en Railway (10 minutos)

### Paso 1: Preparar GitHub

```bash
git init
git add .
git commit -m "Sistema de Votaciones"
```

Crea un repositorio en GitHub y sube el código:

```bash
git remote add origin https://github.com/TU_USUARIO/sistema-votaciones.git
git push -u origin main
```

### Paso 2: Desplegar en Railway

1. Ve a [railway.app](https://railway.app)
2. Inicia sesión con GitHub
3. Click en "New Project"
4. Selecciona "Deploy from GitHub repo"
5. Elige tu repositorio `sistema-votaciones`
6. Railway desplegará automáticamente

### Paso 3: Obtener URL

1. Ve a "Settings" → "Domains"
2. Click en "Generate Domain"
3. Copia tu URL: `https://tu-proyecto.up.railway.app`

**¡Listo!** Tu aplicación está en línea.

---

## 📱 Uso Básico

### 1. Registrar Candidatos (Admin)

```
1. Ve a /pages/admin.html
2. Login: admin / admin123
3. Completa el formulario:
   - Nombre: Juan Pérez
   - Partido: Partido A
   - Foto: https://i.pravatar.cc/300?img=1
4. Click "Registrar Candidato"
```

### 2. Registrar Votantes

```
1. Ve a /pages/registro.html
2. Ingresa:
   - Cédula: 1234567890
   - Nombre: María García
   - Email: maria@email.com
3. Click "Registrarse"
```

### 3. Votar

```
1. Ve a /pages/votacion.html
2. Ingresa tu cédula: 1234567890
3. Selecciona un candidato
4. Confirma tu voto
```

### 4. Ver Resultados

```
1. Ve a /pages/resultados.html
2. Observa gráficas y estadísticas en tiempo real
```

---

## 🔄 Sincronización con API

Si desplegaste en Railway:

```
1. Ve a /pages/sincronizar.html
2. Click "🔄 Sincronizar con API"
3. Los datos se guardarán en el servidor
```

---

## 🧪 Probar la API

### Localmente:

```bash
# Obtener candidatos
curl http://localhost:3000/api/candidatos

# Obtener estadísticas
curl http://localhost:3000/api/estadisticas
```

### En Railway:

```bash
# Reemplaza con tu URL
curl https://tu-proyecto.up.railway.app/api/candidatos
```

O abre: `https://tu-proyecto.up.railway.app/test-api.html`

---

## 📊 Endpoints Principales

| Endpoint | Descripción |
|----------|-------------|
| `GET /` | Página principal |
| `GET /api/candidatos` | Lista de candidatos |
| `GET /api/estadisticas` | Estadísticas generales |
| `POST /api/sync/all` | Sincronizar datos |

Ver todos los endpoints en [README.md](README.md)

---

## 🐛 Problemas Comunes

### "Cannot GET /"
- Asegúrate de que el servidor esté corriendo
- Verifica el puerto: `http://localhost:3000`

### "Candidato no encontrado"
- Primero registra candidatos desde el panel admin

### "Votante no registrado"
- Regístrate primero en /pages/registro.html

### API no responde en Railway
- Espera 2-3 minutos después del despliegue
- Verifica los logs en Railway

---

## 📚 Documentación Completa

- [README.md](README.md) - Documentación completa
- [DEPLOY_RAILWAY.md](DEPLOY_RAILWAY.md) - Guía de despliegue
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - Documentación de API

---

## ✅ Checklist

- [ ] Servidor corriendo
- [ ] Candidatos registrados
- [ ] Votantes registrados
- [ ] Votos emitidos
- [ ] Resultados visibles
- [ ] API funcionando
- [ ] (Opcional) Desplegado en Railway

---

**¡Disfruta tu Sistema de Votaciones! 🎉**