# Sistema de Votaciones

Sistema completo de votaciones con registro de votantes, gestión de candidatos, visualización de resultados en tiempo real y API REST.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso del Sistema Web](#uso-del-sistema-web)
- [API REST](#api-rest)
- [Sincronización de Datos](#sincronización-de-datos)
- [Tecnologías](#tecnologías)

---

## ✨ Características

### Sistema Web
- ✅ Registro de votantes con validación de cédula
- 🗳️ Sistema de votación con verificación de identidad
- 📊 Resultados en tiempo real con gráficas interactivas
- 👨‍💼 Panel administrativo para gestión de candidatos
- 📱 Diseño responsive con Tailwind CSS
- 🔄 Sincronización automática con API

### API REST
- 🔌 Endpoints para consultar candidatos, votantes y votos
- 📈 Estadísticas generales del sistema
- 🔄 Sincronización bidireccional de datos
- 🌐 CORS habilitado para integración con frontend
- 📝 Documentación completa de endpoints

---

## 📁 Estructura del Proyecto

```
sistema-votaciones/
├── data/                      # Archivos JSON (backend simulado)
│   ├── candidatos.json
│   ├── votantes.json
│   ├── votos.json
│   └── admin.json
├── js/                        # Scripts JavaScript
│   ├── registro.js
│   ├── votacion.js
│   ├── admin.js
│   ├── resultados.js
│   └── sincronizar.js
├── pages/                     # Páginas HTML
│   ├── registro.html
│   ├── votacion.html
│   ├── admin.html
│   ├── resultados.html
│   └── sincronizar.html
├── index.html                 # Página principal
├── server.js                  # Servidor API REST
├── package.json               # Dependencias Node.js
├── test-api.html             # Interfaz de prueba de API
├── API_DOCUMENTATION.md      # Documentación detallada de API
└── README.md                 # Este archivo
```

---

## 🚀 Instalación

### Requisitos Previos
- Node.js (v14 o superior)
- npm (incluido con Node.js)
- Navegador web moderno

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd sistema-votaciones
   ```

2. **Instalar dependencias de la API**
   ```bash
   npm install
   ```

3. **Iniciar el servidor API**
   ```bash
   # Modo producción
   npm start

   # Modo desarrollo (con auto-reload)
   npm run dev
   ```

4. **Abrir el sistema web**
   - Abre `index.html` en tu navegador
   - O usa un servidor local como Live Server (VS Code)

---

## 🖥️ Uso del Sistema Web

### 1. Registro de Votantes

**Ruta:** `pages/registro.html`

- Ingresa número de cédula (único)
- Completa nombre completo
- Proporciona correo electrónico
- Los datos se guardan en localStorage

### 2. Panel Administrativo

**Ruta:** `pages/admin.html`

**Credenciales:**
- Usuario: `admin`
- Contraseña: `admin123`

**Funciones:**
- Registrar nuevos candidatos
- Agregar foto (URL), nombre y partido
- Ver lista de candidatos registrados
- Eliminar candidatos

### 3. Votación

**Ruta:** `pages/votacion.html`

**Proceso:**
1. Verificar identidad con número de cédula
2. Sistema valida si el votante está registrado
3. Verifica que no haya votado anteriormente
4. Selecciona candidato de tu preferencia
5. Confirma tu voto (irreversible)

### 4. Resultados

**Ruta:** `pages/resultados.html`

**Visualización:**
- Gráfica de barras con votos por candidato
- Estadísticas generales (total votos, participación)
- Detalle por candidato con porcentajes
- Actualización automática cada 5 segundos

### 5. Sincronización

**Ruta:** `pages/sincronizar.html`

**Opciones:**
- **Sincronización Automática:** Un clic sincroniza con la API
- **Descarga Manual:** Descarga archivos JSON para mover a `/data`
- Ver estadísticas actuales del sistema

---

## 🔌 API REST

### Iniciar el Servidor

```bash
npm start
```

La API estará disponible en: `http://localhost:3000`

### Endpoints Disponibles

#### 📊 CANDIDATOS

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/candidatos` | Obtener todos los candidatos |
| GET | `/api/candidatos/:id` | Obtener candidato por ID |
| GET | `/api/candidatos/ranking/votos` | Ranking ordenado por votos |
| GET | `/api/candidatos/partido/:partido` | Filtrar por partido |

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "total": 3,
  "data": [
    {
      "id": 1234567890,
      "nombre": "Juan Pérez",
      "partido": "Partido A",
      "foto": "https://ejemplo.com/foto.jpg",
      "votos": 15,
      "fechaRegistro": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 👥 VOTANTES

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/votantes` | Obtener todos los votantes |
| GET | `/api/votantes/verificar/:cedula` | Verificar votante por cédula |

**Ejemplo de verificación:**
```json
{
  "success": true,
  "data": {
    "existe": true,
    "haVotado": false,
    "nombre": "María García"
  }
}
```

#### 🗳️ VOTOS

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/votos` | Obtener todos los votos registrados |

#### 📈 ESTADÍSTICAS

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/estadisticas` | Estadísticas generales del sistema |

**Ejemplo de respuesta:**
```json
{
  "success": true,
  "data": {
    "totalCandidatos": 5,
    "votantesRegistrados": 100,
    "votantesQueVotaron": 75,
    "totalVotos": 75,
    "participacion": "75.00%",
    "ganador": {
      "nombre": "Juan Pérez",
      "partido": "Partido A",
      "votos": 30
    }
  }
}
```

#### 🔄 SINCRONIZACIÓN

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/sync/candidatos` | Sincronizar candidatos |
| POST | `/api/sync/votantes` | Sincronizar votantes |
| POST | `/api/sync/votos` | Sincronizar votos |
| POST | `/api/sync/all` | Sincronizar todos los datos |

**Ejemplo de sincronización completa:**
```bash
curl -X POST http://localhost:3000/api/sync/all \
  -H "Content-Type: application/json" \
  -d '{
    "candidatos": [...],
    "votantes": [...],
    "votos": [...]
  }'
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Todos los datos sincronizados correctamente",
  "totales": {
    "candidatos": 5,
    "votantes": 100,
    "votos": 75
  }
}
```

### Probar la API

Abre `test-api.html` en tu navegador para una interfaz interactiva de prueba.

**Ejemplos con curl:**

```bash
# Obtener todos los candidatos
curl http://localhost:3000/api/candidatos

# Obtener ranking
curl http://localhost:3000/api/candidatos/ranking/votos

# Verificar votante
curl http://localhost:3000/api/votantes/verificar/1234567890

# Obtener estadísticas
curl http://localhost:3000/api/estadisticas
```

---

## 🔄 Sincronización de Datos

El sistema utiliza localStorage en el navegador, pero la API lee archivos JSON. Hay dos formas de sincronizar:

### Opción 1: Sincronización Automática (Recomendada)

1. Asegúrate de que el servidor API esté corriendo (`npm start`)
2. Ve a la página "Sincronizar" en el menú
3. Haz clic en "🔄 Sincronizar con API"
4. Los datos se enviarán automáticamente a la API

### Opción 2: Sincronización Manual

1. Ve a la página "Sincronizar"
2. Haz clic en "📥 Descargar Archivos JSON"
3. Mueve los archivos descargados a la carpeta `data/`
4. Reinicia el servidor API

### Sincronización Programática

Puedes sincronizar desde JavaScript:

```javascript
const candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');
const votantes = JSON.parse(localStorage.getItem('votantes') || '[]');
const votos = JSON.parse(localStorage.getItem('votos') || '[]');

fetch('http://localhost:3000/api/sync/all', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ candidatos, votantes, votos })
})
.then(res => res.json())
.then(data => console.log('Sincronizado:', data));
```

---

## 🛠️ Tecnologías

### Frontend
- **HTML5** - Estructura
- **Tailwind CSS** - Estilos responsive
- **JavaScript Vanilla** - Lógica del cliente
- **Chart.js** - Gráficas interactivas
- **LocalStorage** - Almacenamiento local

### Backend (API)
- **Node.js** - Runtime
- **Express.js** - Framework web
- **CORS** - Habilitación de peticiones cross-origin
- **File System (fs)** - Lectura/escritura de JSON

---

## 📝 Notas Importantes

- Los datos en localStorage persisten entre sesiones del navegador
- Para reiniciar el sistema, limpia localStorage desde DevTools (F12 → Application → Local Storage)
- Las fotos de candidatos deben ser URLs válidas
- Puedes usar `https://i.pravatar.cc/300` para fotos de prueba
- La API debe estar corriendo para usar la sincronización automática
- Los archivos JSON en `/data` son la fuente de verdad para la API

---

## 🐛 Solución de Problemas

### La API no responde
- Verifica que el servidor esté corriendo: `npm start`
- Comprueba que el puerto 3000 esté disponible
- Revisa la consola del servidor para errores

### Los datos no se sincronizan
- Asegúrate de que la API esté corriendo
- Verifica la URL de la API en `js/sincronizar.js` (línea 7)
- Revisa la consola del navegador (F12) para errores CORS

### No puedo votar
- Verifica que estés registrado como votante
- Comprueba que no hayas votado anteriormente
- Asegúrate de que haya candidatos registrados

### El login admin no funciona
- Usuario: `admin`
- Contraseña: `admin123`
- Verifica que no haya espacios al escribir

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia ISC.

---

## 👨‍💻 Desarrollo

Para contribuir o modificar el proyecto:

1. Modifica los archivos según necesites
2. Para cambios en la API, edita `server.js`
3. Para cambios en el frontend, edita los archivos en `/js` y `/pages`
4. Reinicia el servidor si modificas `server.js`

---

**¡Listo para usar! 🎉**

Para comenzar:
1. `npm install`
2. `npm start`
3. Abre `index.html` en tu navegador