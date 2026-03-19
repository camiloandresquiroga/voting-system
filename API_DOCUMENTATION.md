# API REST - Sistema de Votaciones

API REST para consultar información de candidatos del sistema de votaciones.

## Instalación

```bash
npm install
```

## Iniciar el servidor

```bash
# Modo producción
npm start

# Modo desarrollo (con auto-reload)
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`

## Endpoints Disponibles

### 1. Obtener todos los candidatos

**GET** `/api/candidatos`

Retorna la lista completa de candidatos registrados.

**Respuesta exitosa:**
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

**Ejemplo de uso:**
```bash
curl http://localhost:3000/api/candidatos
```

---

### 2. Obtener candidato por ID

**GET** `/api/candidatos/:id`

Retorna la información de un candidato específico.

**Parámetros:**
- `id` (número): ID del candidato

**Respuesta exitosa:**
```json
{
  "success": true,
  "data": {
    "id": 1234567890,
    "nombre": "Juan Pérez",
    "partido": "Partido A",
    "foto": "https://ejemplo.com/foto.jpg",
    "votos": 15,
    "fechaRegistro": "2024-01-15T10:30:00.000Z"
  }
}
```

**Respuesta error (404):**
```json
{
  "success": false,
  "message": "Candidato no encontrado"
}
```

**Ejemplo de uso:**
```bash
curl http://localhost:3000/api/candidatos/1234567890
```

---

### 3. Obtener ranking por votos

**GET** `/api/candidatos/ranking/votos`

Retorna los candidatos ordenados por cantidad de votos (de mayor a menor).

**Respuesta exitosa:**
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
      "votos": 25,
      "fechaRegistro": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": 9876543210,
      "nombre": "María García",
      "partido": "Partido B",
      "foto": "https://ejemplo.com/foto2.jpg",
      "votos": 18,
      "fechaRegistro": "2024-01-16T11:00:00.000Z"
    }
  ]
}
```

**Ejemplo de uso:**
```bash
curl http://localhost:3000/api/candidatos/ranking/votos
```

---

### 4. Obtener candidatos por partido

**GET** `/api/candidatos/partido/:partido`

Retorna los candidatos que pertenecen a un partido específico.

**Parámetros:**
- `partido` (string): Nombre del partido (búsqueda parcial, no case-sensitive)

**Respuesta exitosa:**
```json
{
  "success": true,
  "total": 2,
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

**Ejemplo de uso:**
```bash
curl http://localhost:3000/api/candidatos/partido/PartidoA
```

---

## Códigos de Estado HTTP

- `200 OK`: Solicitud exitosa
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error del servidor

## CORS

La API tiene CORS habilitado, permitiendo solicitudes desde cualquier origen.

## Notas

- La API lee los datos del archivo `data/candidatos.json`
- Los datos se sincronizan con localStorage del frontend
- Solo métodos GET (consulta), sin modificación de datos