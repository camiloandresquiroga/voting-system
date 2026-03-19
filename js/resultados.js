let chart = null;

async function cargarResultados() {
    const candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');
    
    if (candidatos.length === 0) {
        document.getElementById('detalleResultados').innerHTML = '<p class="text-gray-500 text-center col-span-full">No hay candidatos registrados</p>';
        return;
    }
    
    candidatos.sort((a, b) => b.votos - a.votos);
    
    mostrarGrafica(candidatos);
    mostrarEstadisticas(candidatos);
    mostrarDetalle(candidatos);
}

function mostrarGrafica(candidatos) {
    const ctx = document.getElementById('chartVotos').getContext('2d');
    
    if (chart) {
        chart.destroy();
    }
    
    const colores = [
        'rgba(99, 102, 241, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)'
    ];
    
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: candidatos.map(c => c.nombre),
            datasets: [{
                label: 'Votos',
                data: candidatos.map(c => c.votos),
                backgroundColor: colores.slice(0, candidatos.length),
                borderColor: colores.slice(0, candidatos.length).map(c => c.replace('0.8', '1')),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function mostrarEstadisticas(candidatos) {
    const totalVotos = candidatos.reduce((sum, c) => sum + c.votos, 0);
    const ganador = candidatos[0];
    
    const html = `
        <div class="bg-indigo-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600">Total de Votos</p>
            <p class="text-3xl font-bold text-indigo-600">${totalVotos}</p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600">Candidatos</p>
            <p class="text-3xl font-bold text-green-600">${candidatos.length}</p>
        </div>
        ${ganador.votos > 0 ? `
        <div class="bg-yellow-50 p-4 rounded-lg">
            <p class="text-sm text-gray-600">Líder Actual</p>
            <p class="text-xl font-bold text-yellow-600">${ganador.nombre}</p>
            <p class="text-sm text-gray-600">${ganador.votos} votos</p>
        </div>
        ` : ''}
    `;
    
    document.getElementById('estadisticas').innerHTML = html;
}

function mostrarDetalle(candidatos) {
    const totalVotos = candidatos.reduce((sum, c) => sum + c.votos, 0);
    
    const html = candidatos.map((c, index) => {
        const porcentaje = totalVotos > 0 ? ((c.votos / totalVotos) * 100).toFixed(1) : 0;
        const medalla = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
        
        return `
            <div class="bg-white border-2 ${index === 0 ? 'border-yellow-400' : 'border-gray-200'} rounded-lg p-6 hover:shadow-lg transition">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-3xl">${medalla}</span>
                    <span class="text-2xl font-bold text-indigo-600">${c.votos}</span>
                </div>
                <img src="${c.foto}" alt="${c.nombre}" class="w-full h-32 object-cover rounded-lg mb-4">
                <h4 class="text-lg font-bold text-gray-900 mb-1">${c.nombre}</h4>
                <p class="text-sm text-gray-600 mb-3">${c.partido}</p>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="bg-indigo-600 h-2.5 rounded-full" style="width: ${porcentaje}%"></div>
                </div>
                <p class="text-sm text-gray-600 mt-2 text-center">${porcentaje}%</p>
            </div>
        `;
    }).join('');
    
    document.getElementById('detalleResultados').innerHTML = html;
}

cargarResultados();

setInterval(cargarResultados, 5000);