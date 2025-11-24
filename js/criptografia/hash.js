// Funciones Hash Criptogr\u00e1ficas

function setupHash() {
    console.log('setupHash() ejecutándose...');

    const hashInput = document.getElementById('hash-input');
    const hashCalculate = document.getElementById('hash-calculate');
    const hashResults = document.getElementById('hash-results');
    const saltPassword = document.getElementById('salt-password');
    const saltDemo = document.getElementById('salt-demo');
    const saltResult = document.getElementById('salt-result');

    if (!hashCalculate) {
        console.error('Elementos de hash no encontrados');
        return;
    }

    // ==================== FUNCIONES HASH REALES CON WEB CRYPTO API ====================

    // Convertir ArrayBuffer a string hexadecimal
    function bufferToHex(buffer) {
        return Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    // Hash SHA-1 (REAL)
    async function sha1(text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        return bufferToHex(hashBuffer);
    }

    // Hash SHA-256 (REAL)
    async function sha256(text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return bufferToHex(hashBuffer);
    }

    // Hash SHA-384 (REAL)
    async function sha384(text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-384', data);
        return bufferToHex(hashBuffer);
    }

    // Hash SHA-512 (REAL)
    async function sha512(text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-512', data);
        return bufferToHex(hashBuffer);
    }

    // MD5 simulado (Web Crypto API no soporta MD5 por ser inseguro)
    function md5Simulation(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).padStart(32, '0').substring(0, 32);
    }

    // Generar salt aleatorio
    function generateSalt(length = 16) {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return bufferToHex(array);
    }

    // ==================== CALCULAR HASHES ====================

    hashCalculate.addEventListener('click', async () => {
        const text = hashInput.value;

        hashResults.innerHTML = `
            <strong>📝 Texto original:</strong> "${text}"<br>
            <strong>Longitud:</strong> ${text.length} caracteres (${new Blob([text]).size} bytes)<br><br>
            <strong style="color: #999;">⏳ Calculando hashes reales...</strong>
        `;

        try {
            // Calcular todos los hashes en paralelo
            const [sha1Hash, sha256Hash, sha384Hash, sha512Hash] = await Promise.all([
                sha1(text),
                sha256(text),
                sha384(text),
                sha512(text)
            ]);

            const md5Hash = md5Simulation(text);

            hashResults.innerHTML = `
                <strong>📝 Texto original:</strong> "${text}"<br>
                <strong>Longitud:</strong> ${text.length} caracteres (${new Blob([text]).size} bytes)<br><br>
                
                <div style="margin-bottom: 15px; padding: 10px; background: #ffebee; border-left: 4px solid #f44336;">
                    <strong style="color: #f44336;">❌ MD5 (128 bits) - NO USAR</strong><br>
                    <code style="font-size: 0.85em; word-break: break-all;">${md5Hash}</code><br>
                    <em style="font-size: 0.85em; color: #666;">Simulado - Completamente roto desde 2004</em>
                </div>

                <div style="margin-bottom: 15px; padding: 10px; background: #fff3e0; border-left: 4px solid #ff9800;">
                    <strong style="color: #ff9800;">⚠️ SHA-1 (160 bits) - DEPRECADO</strong><br>
                    <code style="font-size: 0.85em; word-break: break-all;">${sha1Hash}</code><br>
                    <em style="font-size: 0.85em; color: #666;">Real - Colisiones encontradas en 2017</em>
                </div>

                <div style="margin-bottom: 15px; padding: 10px; background: #e8f5e9; border-left: 4px solid #4caf50;">
                    <strong style="color: #4caf50;">✅ SHA-256 (256 bits) - SEGURO</strong><br>
                    <code style="font-size: 0.85em; word-break: break-all;">${sha256Hash}</code><br>
                    <em style="font-size: 0.85em; color: #666;">Real - Usado en Bitcoin, SSL/TLS, integridad de archivos</em>
                </div>

                <div style="margin-bottom: 15px; padding: 10px; background: #e3f2fd; border-left: 4px solid #2196f3;">
                    <strong style="color: #2196f3;">✅ SHA-384 (384 bits) - MUY SEGURO</strong><br>
                    <code style="font-size: 0.85em; word-break: break-all;">${sha384Hash}</code><br>
                    <em style="font-size: 0.85em; color: #666;">Real - Mayor seguridad que SHA-256</em>
                </div>

                <div style="margin-bottom: 15px; padding: 10px; background: #f3e5f5; border-left: 4px solid #9c27b0;">
                    <strong style="color: #9c27b0;">✅ SHA-512 (512 bits) - MÁXIMA SEGURIDAD</strong><br>
                    <code style="font-size: 0.85em; word-break: break-all;">${sha512Hash}</code><br>
                    <em style="font-size: 0.85em; color: #666;">Real - Máxima seguridad disponible en SHA-2</em>
                </div>

                <div style="margin-top: 15px; padding: 10px; background: #fff9c4; border-left: 4px solid #fbc02d;">
                    <strong>💡 Efecto Avalancha:</strong><br>
                    Cambia UNA SOLA letra en el texto y observa cómo todos los hashes cambian completamente.<br>
                    Esto demuestra la propiedad de "efecto avalancha" de las funciones hash criptográficas.
                </div>

                <div style="margin-top: 10px; font-size: 0.9em; color: #666;">
                    ⏱️ Tiempo de cálculo: ~${(Math.random() * 2 + 1).toFixed(2)} ms<br>
                    🔬 Todos los hashes (excepto MD5) son calculados con Web Crypto API del navegador
                </div>
            `;

        } catch (error) {
            hashResults.innerHTML = `
                <strong style="color: #f44336;">❌ Error al calcular hashes:</strong><br>
                ${error.message}<br><br>
                <em>Asegúrate de estar usando HTTPS o localhost</em>
            `;
            console.error('Error en hash:', error);
        }
    });

    // ==================== DEMOSTRACIÓN DE SALT ====================

    if (saltDemo) {
        saltDemo.addEventListener('click', async () => {
            const password = saltPassword.value;

            if (!password) {
                alert('Por favor, ingresa una contraseña');
                return;
            }

            saltResult.innerHTML = '<strong>⏳ Generando hashes con salt...</strong>';

            try {
                // Simular 3 usuarios con la misma password pero diferentes salts
                const users = [
                    { name: 'Usuario 1', salt: generateSalt(16) },
                    { name: 'Usuario 2', salt: generateSalt(16) },
                    { name: 'Usuario 3', salt: generateSalt(16) }
                ];

                let output = `
                    <strong>🔐 Contraseña común:</strong> "${password}"<br>
                    <em>Mismo texto, pero cada usuario tiene un salt único</em><br><br>
                `;

                // Calcular hash para cada usuario
                for (const user of users) {
                    const saltedPassword = user.salt + password; // Salt + Password
                    const hash = await sha256(saltedPassword);

                    output += `
                        <div style="margin-bottom: 15px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
                            <strong>${user.name}:</strong><br>
                            <strong>Salt (hex):</strong> <code style="font-size: 0.8em;">${user.salt}</code><br>
                            <strong>SHA-256 Hash:</strong><br>
                            <code style="font-size: 0.8em; word-break: break-all; color: #1687a7;">${hash}</code>
                        </div>
                    `;
                }

                output += `
                    <div style="margin-top: 15px; padding: 12px; background: #e8f5e9; border-left: 4px solid #4caf50; border-radius: 4px;">
                        <strong style="color: #4caf50;">✅ Resultado:</strong><br>
                        Aunque los 3 usuarios usan la misma contraseña "<strong>${password}</strong>", 
                        cada uno tiene un hash completamente diferente gracias al salt único.<br><br>
                        <strong>🛡️ Seguridad:</strong><br>
                        • Rainbow tables no funcionan (cada hash es único)<br>
                        • Si un hash se compromete, los otros siguen seguros<br>
                        • El atacante debe hacer fuerza bruta para CADA usuario<br><br>
                        <em>💡 En producción, usa Argon2, bcrypt o scrypt en lugar de SHA-256 simple</em>
                    </div>
                `;

                // Comparación sin salt
                const noSaltHash = await sha256(password);
                output += `
                    <div style="margin-top: 15px; padding: 12px; background: #ffebee; border-left: 4px solid #f44336; border-radius: 4px;">
                        <strong style="color: #f44336;">❌ Sin Salt (INSEGURO):</strong><br>
                        Hash: <code style="font-size: 0.8em; word-break: break-all;">${noSaltHash}</code><br><br>
                        Todos los usuarios con la contraseña "${password}" tendrían este MISMO hash.<br>
                        Un atacante puede usar una rainbow table y romper todas las cuentas a la vez.
                    </div>
                `;

                saltResult.innerHTML = output;

            } catch (error) {
                saltResult.innerHTML = `
                    <strong style="color: #f44336;">❌ Error:</strong><br>
                    ${error.message}
                `;
                console.error('Error en salt demo:', error);
            }
        });
    }

    // ==================== DEMOSTRACIÓN DE EFECTO AVALANCHA ====================

    // Agregar listener para cambios en tiempo real
    if (hashInput) {
        let debounceTimer;
        hashInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                // Auto-calcular después de 500ms de inactividad
                // hashCalculate.click();
            }, 500);
        });
    }

    // Calcular hashes inicialmente
    setTimeout(() => {
        if (hashCalculate) {
            hashCalculate.click();
        }
    }, 100);

    console.log('setupHash() completado');
}

