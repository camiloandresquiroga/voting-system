let sesionActiva = false;

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Credenciales hardcodeadas para simulación
    const adminUsername = 'admin';
    const adminPassword = 'admin123';
    
    if (username === adminUsername && password === adminPassword) {
        sesionActiva = true;
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        cargarCandidatos();
    } else {
        mostrarMensajeLogin('Usuario o contraseña incorrectos', 'error');
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    sesionActiva = false;
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('loginForm').reset();
});

document.getElementById('candidatoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!sesionActiva) return;
    
    const nombre = document.getElementById('nombreCandidato').value.trim();
    const partido = document.getElementById('partido').value.trim();
    const foto = document.getElementById('foto').value.trim();
    
    try {
        const candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');
        
        const nuevoCandidato = {
            id: Date.now(),
            nombre,
            partido,
            foto,
            votos: 0,
            fechaRegistro: new Date().toISOString()
        };
        
        candidatos.push(nuevoCandidato);
        localStorage.setItem('candidatos', JSON.stringify(candidatos));
        
        mostrarMensajeCandidato('Candidato registrado exitosamente', 'success');
        document.getElementById('candidatoForm').reset();
        cargarCandidatos();
        
    } catch (error) {
        mostrarMensajeCandidato('Error al registrar candidato', 'error');
    }
});

async function cargarCandidatos() {
    const lista = document.getElementById('listaCandidatosAdmin');
    const candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');
    
    if (candidatos.length === 0) {
        lista.innerHTML = '<p class="text-gray-500 text-center">No hay candidatos registrados</p>';
        return;
    }
    
    lista.innerHTML = candidatos.map(c => `
        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-4">
                <img src="${c.foto}" alt="${c.nombre}" class="w-16 h-16 rounded-full object-cover">
                <div>
                    <h4 class="font-bold text-gray-900">${c.nombre}</h4>
                    <p class="text-sm text-gray-600">${c.partido}</p>
                    <p class="text-xs text-gray-500">Votos: ${c.votos}</p>
                </div>
            </div>
            <button onclick="eliminarCandidato(${c.id})" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                Eliminar
            </button>
        </div>
    `).join('');
}

function eliminarCandidato(id) {
    if (!confirm('¿Estás seguro de eliminar este candidato?')) return;
    
    let candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');
    candidatos = candidatos.filter(c => c.id !== id);
    localStorage.setItem('candidatos', JSON.stringify(candidatos));
    cargarCandidatos();
}

function mostrarMensajeLogin(texto, tipo) {
    const mensaje = document.getElementById('mensajeLogin');
    mensaje.className = `mt-4 p-4 rounded-lg ${tipo === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
    mensaje.textContent = texto;
    mensaje.classList.remove('hidden');
}

function mostrarMensajeCandidato(texto, tipo) {
    const mensaje = document.getElementById('mensajeCandidato');
    mensaje.className = `mt-4 p-4 rounded-lg ${tipo === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
    mensaje.textContent = texto;
    mensaje.classList.remove('hidden');
    
    setTimeout(() => {
        mensaje.classList.add('hidden');
    }, 5000);
}