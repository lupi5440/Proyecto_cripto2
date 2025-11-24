// Funcionalidad para ataques de fuerza bruta y diccionario

function setupEncryption() {
    console.log('setupEncryption() ejecutándose...');

    // ===== ATAQUE DE FUERZA BRUTA =====
    const bruteAttackBtn = document.getElementById('brute-attack');
    const bruteTarget = document.getElementById('brute-target');
    const bruteResult = document.getElementById('brute-result');

    if (bruteAttackBtn) {
        bruteAttackBtn.addEventListener('click', async () => {
            const target = bruteTarget.value;

            if (!target || !/^\d{6}$/.test(target)) {
                alert('⚠️ Ingresa un PIN válido de exactamente 6 dígitos numéricos');
                return;
            }

            bruteAttackBtn.disabled = true;
            bruteResult.innerHTML = '<strong>🔨 Iniciando ataque de fuerza bruta...</strong><br><br>';

            let attempts = 0;
            let found = false;
            const startTime = Date.now();
            const maxAttempts = 1000000;

            for (let pin = 0; pin < maxAttempts && !found; pin++) {
                attempts++;
                const currentPin = String(pin).padStart(6, '0');

                if (attempts % 5000 === 0) {
                    const elapsed = (Date.now() - startTime) / 1000;
                    const percentage = ((attempts / maxAttempts) * 100).toFixed(2);
                    bruteResult.innerHTML = `
                        <strong>🔨 Probando combinaciones...</strong><br>
                        Intentos: ${attempts.toLocaleString()} / ${maxAttempts.toLocaleString()}<br>
                        Progreso: ${percentage}%<br>
                        Último intento: ${currentPin}<br>
                        Tiempo transcurrido: ${elapsed.toFixed(2)}s<br>
                    `;
                    await new Promise(resolve => setTimeout(resolve, 0));
                }

                if (currentPin === target) {
                    found = true;
                    const totalTime = (Date.now() - startTime) / 1000;
                    bruteResult.innerHTML = `
                        <strong style="color: #f44336;">🚨 ¡PIN ENCONTRADO!</strong><br><br>
                        ✅ PIN crackeado: <strong>${currentPin}</strong><br>
                        📊 Intentos necesarios: ${attempts.toLocaleString()}<br>
                        ⏱️ Tiempo real: ${totalTime.toFixed(2)} segundos<br>
                        💻 Velocidad simulada: ~${Math.round(attempts / totalTime).toLocaleString()} intentos/seg<br><br>
                        <span style="color: #f44336;">⚠️ CONCLUSIÓN: Los PINs de 6 dígitos son MUY INSEGUROS</span><br>
                        <span style="font-size: 0.9em;">Un atacante con hardware dedicado podría probar millones por segundo.</span>
                    `;
                }
            }

            if (!found) {
                bruteResult.innerHTML += '<br><strong>❌ Error en la simulación</strong>';
            }

            bruteAttackBtn.disabled = false;
        });
    }

    // ===== ATAQUE DE DICCIONARIO =====
    const dictAttackBtn = document.getElementById('dict-attack');
    const dictTarget = document.getElementById('dict-target');
    const dictResult = document.getElementById('dict-result');

    if (dictAttackBtn) {
        const commonPasswords = [
            'password', '123456', '12345678', 'qwerty', 'abc123',
            'monkey', 'letmein', 'trustno1', 'dragon', 'baseball',
            'iloveyou', 'master', 'sunshine', 'ashley', 'bailey',
            'shadow', 'superman', 'michael', 'welcome', 'password1',
            'admin', 'root', 'pass', '123123', 'password123',
            'qwerty123', 'admin123', 'letmein123', '1234567890', 'password1234',
            'welcome123', 'password12345', 'admin1234', '12345', '123',
            'jordan', 'charlie', 'princess', 'starwars', 'computer',
            'freedom', 'princess', 'qazwsx', 'football', 'liverpool',
            'london', 'jessica', 'daniel', 'jennifer', 'thomas',
            'jordan23', 'zxcvbnm', 'asdfgh', 'Password', 'Password1',
            'Password123', 'Admin', 'Admin123', 'Welcome1', 'Letmein',
            'Qwerty', 'Abc123', 'Monkey1', 'Dragon1', 'Master1',
            'Soccer', 'Love', 'Secret', 'Summer', 'Winter',
            'Spring', 'Autumn', 'Killer', 'Tigger', 'Pepper',
            'Mustang', 'Ranger', 'Batman', 'Spider', 'Ginger',
            'Dallas', 'Matrix', 'Access', 'Flower', 'Silver',
            'Shadow1', 'Buster', 'Dakota', 'Cowboy', 'Prince',
            'Guitar', 'Golfer', 'Rocket', 'Thunder', 'Cookie',
            'Cheese', 'Smokey', 'Hunter', 'Angel', 'Harley'
        ];

        dictAttackBtn.addEventListener('click', () => {
            const target = dictTarget.value;

            if (!target) {
                alert('⚠️ Ingresa una contraseña objetivo');
                return;
            }

            dictAttackBtn.disabled = true;
            dictResult.innerHTML = '<strong>🎯 Iniciando ataque de diccionario...</strong><br><span style="font-size: 0.9em;">Probando las 100 contraseñas más comunes...</span><br><br>';

            let attempts = 0;
            let found = false;

            const interval = setInterval(() => {
                if (attempts >= commonPasswords.length) {
                    dictResult.innerHTML += `<br><strong style="color: #4caf50;">✅ Ataque completado</strong><br>`;
                    dictResult.innerHTML += `📊 Total de intentos: ${attempts}<br>`;
                    dictResult.innerHTML += `⏱️ Tiempo estimado: ${(attempts * 0.1).toFixed(1)} segundos<br><br>`;
                    if (!found) {
                        dictResult.innerHTML += `<span style="color: #4caf50;"><strong>🎉 ¡Tu contraseña es más segura!</strong><br>`;
                        dictResult.innerHTML += `No está en el diccionario de contraseñas comunes.</span><br>`;
                        dictResult.innerHTML += `<span style="font-size: 0.85em;">Pero recuerda: diccionarios más grandes tienen millones de entradas.</span>`;
                    }
                    clearInterval(interval);
                    dictAttackBtn.disabled = false;
                    return;
                }

                const attempt = commonPasswords[attempts];

                if (attempt === target) {
                    dictResult.innerHTML = `<strong style="color: #f44336;">🚨 ¡CONTRASEÑA CRACKEADA!</strong><br><br>`;
                    dictResult.innerHTML += `✅ Contraseña encontrada: <strong>"${target}"</strong><br>`;
                    dictResult.innerHTML += `📊 Intentos necesarios: ${attempts + 1}<br>`;
                    dictResult.innerHTML += `⏱️ Tiempo de ataque: ${((attempts + 1) * 0.1).toFixed(1)} segundos<br><br>`;
                    dictResult.innerHTML += `<span style="color: #f44336;"><strong>⚠️ PELIGRO: Contraseña extremadamente común</strong><br>`;
                    dictResult.innerHTML += `Esta contraseña está en el top ${attempts + 1} de las más usadas.<br>`;
                    dictResult.innerHTML += `Cambiarla INMEDIATAMENTE.</span><br><br>`;
                    dictResult.innerHTML += `<strong>Historial del ataque:</strong><br>`;
                    dictResult.innerHTML += `<div style="font-size: 0.85em; max-height: 100px; overflow-y: auto; background: #f5f5f5; padding: 8px; margin-top: 5px;">`;
                    for (let i = 0; i <= attempts; i++) {
                        const mark = i === attempts ? ' ← ✅ MATCH!' : '';
                        dictResult.innerHTML += `${i + 1}. "${commonPasswords[i]}"${mark}<br>`;
                    }
                    dictResult.innerHTML += `</div>`;
                    found = true;
                    clearInterval(interval);
                    dictAttackBtn.disabled = false;
                } else if (attempts < 10 || attempts === commonPasswords.length - 1) {
                    dictResult.innerHTML += `${attempts + 1}. Probando "${attempt}" ... ❌<br>`;
                } else if (attempts === 10) {
                    dictResult.innerHTML += `<span style="font-size: 0.85em; color: #666;">... probando más contraseñas ...</span><br>`;
                }

                attempts++;
            }, 100);
        });
    }

    console.log('setupEncryption() completado');
}
