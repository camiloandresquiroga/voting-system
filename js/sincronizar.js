// Cargar datos al iniciar
window.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
});

const API_URL = 'http://localhost:3000';

function cargarDatos() {
    // Obtener datos de localStorage
    const candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');
    const votantes = JSON.parse(localStorage.getItem('votantes') || '[]');
    const votos = JSON.parse(localStorage.getItem('votos') || '[]');
    
    // Mostrar en los textareas
    document.getElementById('candidatosData').value = JSON.stringify(candidatos, null, 2);
    document.getElementById('votantesData').value = JSON.stringify(votantes, null, 2);
    document.getElementById('votosData').value = JSON.stringify(votos, null, 2);
    
    // Mostrar estadísticas
    const totalVotos = votos.length;
    const votantesQueVotaron = votantes.filter(v => v.haVotado).length;
    
    document.getElementById('estadisticas').innerHTML = `
        <div>
            <p class="text-3xl font-bold text-green-600">${candidatos.length}</p>
            <p class="text-sm text-gray-600">Candidatos</p>
        </div>
        <div>
            <p class="text-3xl font-bold text-blue-600">${votantes.length}</p>
            <p class="text-sm text-gray-600">Votantes Registrados</p>
        </div>
        <div>
            <p class="text-3xl font-bold text-purple-600">${totalVotos}</p>
            <p class="text-sm text-gray-600">Votos Emitidos</p>
        </div>
    `;
}

async function sincronizarAutomatico() {
    const boton = document.getElementById('btnSincronizar');
    const mensaje = document.getElementById('mensajeSincronizacion');
    
    try {
        boton.disabled = true;
        boton.textContent = '⏳ Sincronizando...';
        boton.classList.remove('bg-green-600', 'hover:bg-green-700');
        boton.classList.add('bg-gray-400');
        
        const candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');
        const votantes = JSON.parse(localStorage.getItem('votantes') || '[]');
        const votos = JSON.parse(localStorage.getItem('votos') || '[]');
        
        const response = await fetch(`${API_URL}/api/sync/all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ candidatos, votantes, votos })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mensaje.className = 'mt-4 p-4 rounded-lg bg-green-100 text-green-800';
            mensaje.innerHTML = `
                <p class="font-bold">✓ Sincronización exitosa!</p>
                <p class="text-sm mt-2">
                    Candidatos: ${data.totales.candidatos} | 
                    Votantes: ${data.totales.votantes} | 
                    Votos: ${data.totales.votos}
                </p>
            `;
        } else {
            throw new Error(data.message);
        }
        
    } catch (error) {
        mensaje.className = 'mt-4 p-4 rounded-lg bg-red-100 text-red-800';
        mensaje.innerHTML = `
            <p class="font-bold">✗ Error al sincronizar</p>
            <p class="text-sm mt-2">${error.message}</p>
            <p class="text-sm mt-2">Asegúrate de que el servidor API esté corriendo en ${API_URL}</p>
        `;
    } finally {
        boton.disabled = false;
        boton.textContent = '🔄 Sincronizar con API';
        boton.classList.remove('bg-gray-400');
        boton.classList.add('bg-green-600', 'hover:bg-green-700');
        mensaje.classList.remove('hidden');
        
        setTimeout(() => {
            mensaje.classList.add('hidden');
        }, 5000);
    }
}

function copiarTexto(elementId) {
    const textarea = document.getElementById(elementId);
    textarea.select();
    document.execCommand('copy');
    
    // Mostrar mensaje temporal
    const button = event.target;
    const textoOriginal = button.textContent;
    button.textContent = '✓ Copiado';
    button.classList.add('bg-green-600');
    button.classList.remove('bg-indigo-600');
    
    setTimeout(() => {
        button.textContent = textoOriginal;
        button.classList.remove('bg-green-600');
        button.classList.add('bg-indigo-600');
    }, 2000);
}

function descargarArchivo(nombreArchivo, contenido) {
    const blob = new Blob([contenido], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function descargarTodos() {
    const candidatos = localStorage.getItem('candidatos') || '[]';
    const votantes = localStorage.getItem('votantes') || '[]';
    const votos = localStorage.getItem('votos') || '[]';
    
    // Formatear JSON
    const candidatosFormatted = JSON.stringify(JSON.parse(candidatos), null, 2);
    const votantesFormatted = JSON.stringify(JSON.parse(votantes), null, 2);
    const votosFormatted = JSON.stringify(JSON.parse(votos), null, 2);
    
    // Descargar archivos con un pequeño delay entre cada uno
    descargarArchivo('candidatos.json', candidatosFormatted);
    
    setTimeout(() => {
        descargarArchivo('votantes.json', votantesFormatted);
    }, 300);
    
    setTimeout(() => {
        descargarArchivo('votos.json', votosFormatted);
    }, 600);
    
    // Mostrar mensaje de éxito
    alert('✓ Archivos descargados exitosamente!\n\nMueve los archivos a la carpeta "data/" del proyecto y reinicia el servidor API.');
}