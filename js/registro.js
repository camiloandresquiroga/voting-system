document.getElementById('registroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const cedula = document.getElementById('cedula').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    
    try {
        const response = await fetch('../data/votantes.json');
        let votantes = await response.json();
        
        const yaRegistrado = votantes.find(v => v.cedula === cedula);
        
        if (yaRegistrado) {
            mostrarMensaje('Ya existe un votante registrado con esta cédula', 'error');
            return;
        }
        
        const nuevoVotante = {
            cedula,
            nombre,
            email,
            fechaRegistro: new Date().toISOString(),
            haVotado: false
        };
        
        votantes.push(nuevoVotante);
        localStorage.setItem('votantes', JSON.stringify(votantes));
        
        mostrarMensaje('¡Registro exitoso! Ya puedes votar', 'success');
        document.getElementById('registroForm').reset();
        
    } catch (error) {
        const votantes = JSON.parse(localStorage.getItem('votantes') || '[]');
        const yaRegistrado = votantes.find(v => v.cedula === cedula);
        
        if (yaRegistrado) {
            mostrarMensaje('Ya existe un votante registrado con esta cédula', 'error');
            return;
        }
        
        const nuevoVotante = {
            cedula,
            nombre,
            email,
            fechaRegistro: new Date().toISOString(),
            haVotado: false
        };
        
        votantes.push(nuevoVotante);
        localStorage.setItem('votantes', JSON.stringify(votantes));
        
        mostrarMensaje('¡Registro exitoso! Ya puedes votar', 'success');
        document.getElementById('registroForm').reset();
    }
});

function mostrarMensaje(texto, tipo) {
    const mensaje = document.getElementById('mensaje');
    mensaje.className = `mt-6 p-4 rounded-lg ${tipo === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
    mensaje.textContent = texto;
    mensaje.classList.remove('hidden');
    
    setTimeout(() => {
        mensaje.classList.add('hidden');
    }, 5000);
}