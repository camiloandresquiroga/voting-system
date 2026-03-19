let votanteActual = null;

document.getElementById('verificarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const cedula = document.getElementById('cedulaVerificar').value.trim();
    
    try {
        const votantes = JSON.parse(localStorage.getItem('votantes') || '[]');
        const votante = votantes.find(v => v.cedula === cedula);
        
        if (!votante) {
            mostrarMensajeVerificacion('Cédula no registrada. Por favor regístrese primero.', 'error');
            return;
        }
        
        if (votante.haVotado) {
            mostrarMensajeVerificacion('Ya has votado anteriormente. No puedes votar de nuevo.', 'error');
            return;
        }
        
        votanteActual = votante;
        document.getElementById('verificacionVotante').classList.add('hidden');
        document.getElementById('seccionVotacion').classList.remove('hidden');
        cargarCandidatos();
        
    } catch (error) {
        mostrarMensajeVerificacion('Error al verificar votante', 'error');
    }
});

async function cargarCandidatos() {
    const lista = document.getElementById('listaCandidatos');
    const candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');
    
    if (candidatos.length === 0) {
        lista.innerHTML = '<p class="text-gray-500 text-center col-span-full">No hay candidatos disponibles</p>';
        return;
    }
    
    lista.innerHTML = candidatos.map(c => `
        <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer" onclick="votar(${c.id})">
            <img src="${c.foto}" alt="${c.nombre}" class="w-full h-48 object-cover rounded-lg mb-4">
            <h3 class="text-xl font-bold text-gray-900 mb-2">${c.nombre}</h3>
            <p class="text-gray-600 mb-4">${c.partido}</p>
            <button class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                Votar
            </button>
        </div>
    `).join('');
}

function votar(candidatoId) {
    if (!votanteActual) return;
    
    if (!confirm('¿Estás seguro de tu voto? Esta acción no se puede deshacer.')) return;
    
    try {
        let candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');
        const candidato = candidatos.find(c => c.id === candidatoId);
        
        if (!candidato) {
            alert('Error: Candidato no encontrado');
            return;
        }
        
        candidato.votos++;
        localStorage.setItem('candidatos', JSON.stringify(candidatos));
        
        let votantes = JSON.parse(localStorage.getItem('votantes') || '[]');
        const votanteIndex = votantes.findIndex(v => v.cedula === votanteActual.cedula);
        votantes[votanteIndex].haVotado = true;
        localStorage.setItem('votantes', JSON.stringify(votantes));
        
        const votos = JSON.parse(localStorage.getItem('votos') || '[]');
        votos.push({
            votanteCedula: votanteActual.cedula,
            candidatoId: candidatoId,
            fecha: new Date().toISOString()
        });
        localStorage.setItem('votos', JSON.stringify(votos));
        
        alert(`¡Gracias por votar por ${candidato.nombre}!`);
        window.location.href = 'resultados.html';
        
    } catch (error) {
        alert('Error al registrar el voto');
    }
}

function mostrarMensajeVerificacion(texto, tipo) {
    const mensaje = document.getElementById('mensajeVerificacion');
    mensaje.className = `mt-4 p-4 rounded-lg ${tipo === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
    mensaje.textContent = texto;
    mensaje.classList.remove('hidden');
}