// Script de verificación para Railway
console.log('🔍 Verificando configuración para Railway...\n');

const fs = require('fs');
const path = require('path');

let errores = 0;
let advertencias = 0;

// Verificar archivos necesarios
const archivosRequeridos = [
    'server.js',
    'package.json',
    'index.html',
    'Procfile'
];

console.log('📁 Verificando archivos requeridos:');
archivosRequeridos.forEach(archivo => {
    if (fs.existsSync(archivo)) {
        console.log(`  ✅ ${archivo}`);
    } else {
        console.log(`  ❌ ${archivo} - NO ENCONTRADO`);
        errores++;
    }
});

// Verificar package.json
console.log('\n📦 Verificando package.json:');
try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (pkg.scripts && pkg.scripts.start) {
        console.log(`  ✅ Script "start" definido: ${pkg.scripts.start}`);
    } else {
        console.log('  ❌ Script "start" no definido');
        errores++;
    }
    
    if (pkg.engines && pkg.engines.node) {
        console.log(`  ✅ Versión de Node especificada: ${pkg.engines.node}`);
    } else {
        console.log('  ⚠️  Versión de Node no especificada (se usará la por defecto)');
        advertencias++;
    }
    
    const depsRequeridas = ['express', 'cors'];
    depsRequeridas.forEach(dep => {
        if (pkg.dependencies && pkg.dependencies[dep]) {
            console.log(`  ✅ Dependencia "${dep}" instalada`);
        } else {
            console.log(`  ❌ Dependencia "${dep}" no encontrada`);
            errores++;
        }
    });
} catch (error) {
    console.log('  ❌ Error al leer package.json');
    errores++;
}

// Verificar server.js
console.log('\n🖥️  Verificando server.js:');
try {
    const serverContent = fs.readFileSync('server.js', 'utf8');
    
    if (serverContent.includes('process.env.PORT')) {
        console.log('  ✅ Usa process.env.PORT');
    } else {
        console.log('  ❌ No usa process.env.PORT (Railway necesita esto)');
        errores++;
    }
    
    if (serverContent.includes('express.static')) {
        console.log('  ✅ Sirve archivos estáticos');
    } else {
        console.log('  ⚠️  No sirve archivos estáticos');
        advertencias++;
    }
    
    if (serverContent.includes('cors()')) {
        console.log('  ✅ CORS habilitado');
    } else {
        console.log('  ⚠️  CORS no habilitado');
        advertencias++;
    }
} catch (error) {
    console.log('  ❌ Error al leer server.js');
    errores++;
}

// Verificar estructura de carpetas
console.log('\n📂 Verificando estructura:');
const carpetasRequeridas = ['data', 'js', 'pages'];
carpetasRequeridas.forEach(carpeta => {
    if (fs.existsSync(carpeta)) {
        console.log(`  ✅ Carpeta "${carpeta}" existe`);
    } else {
        console.log(`  ❌ Carpeta "${carpeta}" no encontrada`);
        errores++;
    }
});

// Verificar .gitignore
console.log('\n🚫 Verificando .gitignore:');
if (fs.existsSync('.gitignore')) {
    const gitignore = fs.readFileSync('.gitignore', 'utf8');
    if (gitignore.includes('node_modules')) {
        console.log('  ✅ node_modules en .gitignore');
    } else {
        console.log('  ⚠️  node_modules no está en .gitignore');
        advertencias++;
    }
} else {
    console.log('  ⚠️  .gitignore no existe');
    advertencias++;
}

// Resumen
console.log('\n' + '='.repeat(50));
console.log('📊 RESUMEN:');
console.log('='.repeat(50));

if (errores === 0 && advertencias === 0) {
    console.log('✅ ¡Todo perfecto! El proyecto está listo para Railway.');
    console.log('\n🚀 Próximos pasos:');
    console.log('   1. git init (si no lo has hecho)');
    console.log('   2. git add .');
    console.log('   3. git commit -m "Initial commit"');
    console.log('   4. Sube a GitHub');
    console.log('   5. Despliega en Railway');
} else {
    if (errores > 0) {
        console.log(`❌ ${errores} error(es) encontrado(s)`);
        console.log('   Corrige los errores antes de desplegar.');
    }
    if (advertencias > 0) {
        console.log(`⚠️  ${advertencias} advertencia(s) encontrada(s)`);
        console.log('   El proyecto puede funcionar, pero revisa las advertencias.');
    }
}

console.log('='.repeat(50) + '\n');

process.exit(errores > 0 ? 1 : 0);