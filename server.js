const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper para leer archivos JSON
function leerJSON(archivo) {
    const rutaArchivo = path.join(__dirname, 'data', archivo);
    const data = fs.readFileSync(rutaArchivo, 'utf8');
    return JSON.parse(data);
}

// Helper para escribir archivos JSON
function escribirJSON(archivo, datos) {
    const rutaArchivo = path.join(__dirname, 'data', archivo);
    fs.writeFileSync(rutaArchivo, JSON.stringify(datos, null, 2), 'utf8');
}

// ============================================
// ENDPOINTS DE CANDIDATOS
// ============================================

// Obtener todos los candidatos
app.get('/api/candidatos', (req, res) => {
    try {
        const candidatos = leerJSON('candidatos.json');
        res.json({
            success: true,
            total: candidatos.length,
            data: candidatos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener candidatos',
            error: error.message
        });
    }
});

// Obtener un candidato por ID
app.get('/api/candidatos/:id', (req, res) => {
    try {
        const candidatos = leerJSON('candidatos.json');
        const candidato = candidatos.find(c => c.id === parseInt(req.params.id));
        
        if (!candidato) {
            return res.status(404).json({
                success: false,
                message: 'Candidato no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: candidato
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener candidato',
            error: error.message
        });
    }
});

// Obtener candidatos ordenados por votos
app.get('/api/candidatos/ranking/votos', (req, res) => {
    try {
        const candidatos = leerJSON('candidatos.json');
        const ranking = [...candidatos].sort((a, b) => b.votos - a.votos);
        
        res.json({
            success: true,
            total: ranking.length,
            data: ranking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener ranking',
            error: error.message
        });
    }
});

// Obtener candidatos por partido
app.get('/api/candidatos/partido/:partido', (req, res) => {
    try {
        const candidatos = leerJSON('candidatos.json');
        const partido = req.params.partido.toLowerCase();
        const candidatosPorPartido = candidatos.filter(c => 
            c.partido.toLowerCase().includes(partido)
        );
        
        res.json({
            success: true,
            total: candidatosPorPartido.length,
            data: candidatosPorPartido
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener candidatos por partido',
            error: error.message
        });
    }
});

// ============================================
// ENDPOINTS DE VOTANTES
// ============================================

// Obtener todos los votantes
app.get('/api/votantes', (req, res) => {
    try {
        const votantes = leerJSON('votantes.json');
        res.json({
            success: true,
            total: votantes.length,
            data: votantes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener votantes',
            error: error.message
        });
    }
});

// Verificar si un votante existe por cédula
app.get('/api/votantes/verificar/:cedula', (req, res) => {
    try {
        const votantes = leerJSON('votantes.json');
        const votante = votantes.find(v => v.cedula === req.params.cedula);
        
        if (!votante) {
            return res.status(404).json({
                success: false,
                message: 'Votante no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: {
                existe: true,
                haVotado: votante.haVotado,
                nombre: votante.nombre
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al verificar votante',
            error: error.message
        });
    }
});

// ============================================
// ENDPOINTS DE VOTOS
// ============================================

// Obtener todos los votos
app.get('/api/votos', (req, res) => {
    try {
        const votos = leerJSON('votos.json');
        res.json({
            success: true,
            total: votos.length,
            data: votos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener votos',
            error: error.message
        });
    }
});

// Obtener estadísticas generales
app.get('/api/estadisticas', (req, res) => {
    try {
        const candidatos = leerJSON('candidatos.json');
        const votantes = leerJSON('votantes.json');
        const votos = leerJSON('votos.json');
        
        const totalVotos = votos.length;
        const votantesQueVotaron = votantes.filter(v => v.haVotado).length;
        const votantesRegistrados = votantes.length;
        const totalCandidatos = candidatos.length;
        
        const ganador = candidatos.length > 0 
            ? candidatos.reduce((max, c) => c.votos > max.votos ? c : max, candidatos[0])
            : null;
        
        res.json({
            success: true,
            data: {
                totalCandidatos,
                votantesRegistrados,
                votantesQueVotaron,
                totalVotos,
                participacion: votantesRegistrados > 0 
                    ? ((votantesQueVotaron / votantesRegistrados) * 100).toFixed(2) + '%'
                    : '0%',
                ganador: ganador ? {
                    nombre: ganador.nombre,
                    partido: ganador.partido,
                    votos: ganador.votos
                } : null
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener estadísticas',
            error: error.message
        });
    }
});

// ============================================
// ENDPOINTS DE SINCRONIZACIÓN
// ============================================

// Sincronizar candidatos desde localStorage
app.post('/api/sync/candidatos', (req, res) => {
    try {
        const { candidatos } = req.body;
        
        if (!Array.isArray(candidatos)) {
            return res.status(400).json({
                success: false,
                message: 'Los datos deben ser un array'
            });
        }
        
        escribirJSON('candidatos.json', candidatos);
        
        res.json({
            success: true,
            message: 'Candidatos sincronizados correctamente',
            total: candidatos.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al sincronizar candidatos',
            error: error.message
        });
    }
});

// Sincronizar votantes desde localStorage
app.post('/api/sync/votantes', (req, res) => {
    try {
        const { votantes } = req.body;
        
        if (!Array.isArray(votantes)) {
            return res.status(400).json({
                success: false,
                message: 'Los datos deben ser un array'
            });
        }
        
        escribirJSON('votantes.json', votantes);
        
        res.json({
            success: true,
            message: 'Votantes sincronizados correctamente',
            total: votantes.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al sincronizar votantes',
            error: error.message
        });
    }
});

// Sincronizar votos desde localStorage
app.post('/api/sync/votos', (req, res) => {
    try {
        const { votos } = req.body;
        
        if (!Array.isArray(votos)) {
            return res.status(400).json({
                success: false,
                message: 'Los datos deben ser un array'
            });
        }
        
        escribirJSON('votos.json', votos);
        
        res.json({
            success: true,
            message: 'Votos sincronizados correctamente',
            total: votos.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al sincronizar votos',
            error: error.message
        });
    }
});

// Sincronizar todos los datos de una vez
app.post('/api/sync/all', (req, res) => {
    try {
        const { candidatos, votantes, votos } = req.body;
        
        if (!Array.isArray(candidatos) || !Array.isArray(votantes) || !Array.isArray(votos)) {
            return res.status(400).json({
                success: false,
                message: 'Todos los datos deben ser arrays'
            });
        }
        
        escribirJSON('candidatos.json', candidatos);
        escribirJSON('votantes.json', votantes);
        escribirJSON('votos.json', votos);
        
        res.json({
            success: true,
            message: 'Todos los datos sincronizados correctamente',
            totales: {
                candidatos: candidatos.length,
                votantes: votantes.length,
                votos: votos.length
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al sincronizar datos',
            error: error.message
        });
    }
});

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        message: 'API de Sistema de Votaciones',
        version: '2.0.0',
        endpoints: {
            candidatos: {
                'GET /api/candidatos': 'Obtener todos los candidatos',
                'GET /api/candidatos/:id': 'Obtener candidato por ID',
                'GET /api/candidatos/ranking/votos': 'Ranking por votos',
                'GET /api/candidatos/partido/:partido': 'Candidatos por partido'
            },
            votantes: {
                'GET /api/votantes': 'Obtener todos los votantes',
                'GET /api/votantes/verificar/:cedula': 'Verificar votante por cédula'
            },
            votos: {
                'GET /api/votos': 'Obtener todos los votos'
            },
            estadisticas: {
                'GET /api/estadisticas': 'Estadísticas generales del sistema'
            },
            sincronizacion: {
                'POST /api/sync/candidatos': 'Sincronizar candidatos',
                'POST /api/sync/votantes': 'Sincronizar votantes',
                'POST /api/sync/votos': 'Sincronizar votos',
                'POST /api/sync/all': 'Sincronizar todos los datos'
            }
        }
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n🚀 API de Sistema de Votaciones v2.0.0`);
    console.log(`📡 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`\n📊 Endpoints disponibles:`);
    console.log(`\n   CANDIDATOS:`);
    console.log(`   GET  /api/candidatos`);
    console.log(`   GET  /api/candidatos/:id`);
    console.log(`   GET  /api/candidatos/ranking/votos`);
    console.log(`   GET  /api/candidatos/partido/:partido`);
    console.log(`\n   VOTANTES:`);
    console.log(`   GET  /api/votantes`);
    console.log(`   GET  /api/votantes/verificar/:cedula`);
    console.log(`\n   VOTOS:`);
    console.log(`   GET  /api/votos`);
    console.log(`\n   ESTADÍSTICAS:`);
    console.log(`   GET  /api/estadisticas`);
    console.log(`\n   SINCRONIZACIÓN:`);
    console.log(`   POST /api/sync/candidatos`);
    console.log(`   POST /api/sync/votantes`);
    console.log(`   POST /api/sync/votos`);
    console.log(`   POST /api/sync/all`);
    console.log(`\n✨ Listo para recibir peticiones!\n`);
});