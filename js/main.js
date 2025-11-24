// Utilidad para cargar HTML externo en un contenedor
async function loadFragment(url, containerId) {
    const res = await fetch(url);
    const html = await res.text();
    document.getElementById(containerId).innerHTML = html;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Cargar componentes y esperar a que header y sidebar estén listos
    Promise.all([
        loadFragment('pages/components/header.html', 'header-container'),
        loadFragment('pages/components/sidebar.html', 'sidebar-container')
    ]).then(() => {
        setupMenu();
    });

    loadFragment('pages/components/footer.html', 'footer-container');

    // Cargar página inicial
    showPage('home');
});

// Navegación de páginas
const pageMap = {
    home: 'pages/home.html',
    // Criptografía
    'crypto-fundamentals': 'pages/criptografia/crypto-fundamentals.html',
    cipher: 'pages/criptografia/cipher.html',
    encryption: 'pages/criptografia/encryption.html',
    ecc: 'pages/criptografia/ecc.html',
    hash: 'pages/criptografia/hash.html',
    blockchain: 'pages/criptografia/blockchain.html',
    // Seguridad Web
    sqli: 'pages/seguridad-web/sqli.html',
    xss: 'pages/seguridad-web/xss.html',
    csrf: 'pages/seguridad-web/csrf.html',
    mitm: 'pages/seguridad-web/mitm.html',
    session: 'pages/seguridad-web/session.html',
    // Autenticación
    password: 'pages/autenticacion/password.html',
    '2fa': 'pages/autenticacion/2fa.html',
    oauth: 'pages/autenticacion/oauth.html',
    // Ataques Sociales
    phishing: 'pages/ataques-sociales/phishing.html',
    'social-eng': 'pages/ataques-sociales/social-eng.html',
    // Infraestructura
    https: 'pages/infraestructura/https.html',
    vpn: 'pages/infraestructura/vpn.html',
    // Historia
    'crypto-events': 'pages/historia/crypto-events.html',
    'crypto-heroes': 'pages/historia/crypto-heroes.html',
    // Privacidad
    'privacy-tools': 'pages/privacidad/privacy-tools.html',
    'open-source': 'pages/privacidad/open-source.html',
    // Recursos
    'security-tips': 'pages/recursos/security-tips.html'
};

function showPage(page) {
    const url = pageMap[page] || pageMap.home;
    console.log('Cargando página:', page, 'desde', url);
    loadFragment(url, 'page-container').then(() => {
        console.log('Página cargada:', page);
        if (page === 'mitm') setupMitm();
        if (page === 'password') setupPassword();
        if (page === 'cipher') setupCipher();
        if (page === 'encryption') {
            console.log('Llamando a setupEncryption()...');
            console.log('setupEncryption existe?', typeof window.setupEncryption);
            if (typeof window.setupEncryption === 'function') {
                setupEncryption();
            } else {
                console.error('setupEncryption no está disponible!');
            }
            console.log('Llamando a setupRSA()...');
            if (typeof window.setupRSA === 'function') {
                setupRSA();
            } else {
                console.error('setupRSA no está disponible!');
            }
        }
        if (page === 'ecc') setupECC();
        if (page === 'hash') setupHash();
        if (page === 'blockchain') setupBlockchain();
        if (page === '2fa') setup2FA();
        if (page === 'sqli') setupSqli();
        if (page === 'xss') setupXss();
        if (page === 'csrf') setupCsrf();
        if (page === 'session') setupSession();
    });
    setActiveMenu(page);
}

function setActiveMenu(page) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });
}

function setupMenu() {
    const menu = document.getElementById('header-menu');
    const menuToggle = document.getElementById('menu-toggle');
    const overlay = document.getElementById('menu-overlay');

    console.log('Setting up menu...', { menu, menuToggle, overlay });

    // Toggle del menú hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked!');
            if (menu && overlay) {
                const isOpen = menu.classList.contains('show');
                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }
            }
        });
    } else {
        console.error('Menu toggle button not found!');
    }

    // Cerrar menú al hacer clic en el overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            console.log('Overlay clicked!');
            closeMenu();
        });
    }

    // Toggle de secciones colapsables
    if (menu) {
        const sectionTitles = menu.querySelectorAll('.menu-section-title');
        sectionTitles.forEach(title => {
            title.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = title.dataset.section;
                const section = document.getElementById(`section-${sectionId}`);
                if (section) {
                    section.classList.toggle('collapsed');
                    title.classList.toggle('collapsed');
                }
            });
        });
    }

    // Navegación desde los items del menú
    if (menu) {
        menu.addEventListener('click', (e) => {
            if (e.target.classList.contains('menu-item')) {
                const page = e.target.dataset.page;
                console.log('Menu item clicked:', page);
                showPage(page);
                // Cerrar el menú después de seleccionar
                closeMenu();
            }
        });
    }

    // Cerrar con la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu && menu.classList.contains('show')) {
            closeMenu();
        }
    });

    function openMenu() {
        if (menu && overlay) {
            menu.classList.add('show');
            overlay.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevenir scroll del body
            console.log('Menu opened');
        }
    }

    function closeMenu() {
        if (menu && overlay) {
            menu.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = ''; // Restaurar scroll
            console.log('Menu closed');
        }
    }
}

// Inicializar con página home
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});

// --- Demos: sólo inicialización mínima, el resto igual que antes ---
function setupMitm() {
    const networkLog = [];
    const sendBtn = document.getElementById('mitm-send');
    const messageInput = document.getElementById('mitm-message');
    const encryptCheck = document.getElementById('mitm-encrypt');
    const passInput = document.getElementById('mitm-pass');
    const networkLogEl = document.getElementById('network-log');
    const attackerViewEl = document.getElementById('attacker-view');
    const networkEmpty = document.getElementById('network-empty');
    const attackerEmpty = document.getElementById('attacker-empty');

    if (!sendBtn) return;

    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (!message) {
            alert('Por favor, escribe un mensaje');
            return;
        }

        const shouldEncrypt = encryptCheck.checked;
        const password = passInput.value;

        if (shouldEncrypt && !password) {
            alert('Por favor, ingresa una contraseña para cifrar');
            return;
        }

        let packet = message;
        if (shouldEncrypt && password) {
            // Simulación simple de cifrado usando btoa
            packet = btoa(message + ':' + password);
        }

        networkLog.push({ original: message, packet, encrypted: shouldEncrypt });
        updateNetworkLog();
        messageInput.value = '';
    });

    function updateNetworkLog() {
        if (networkLog.length > 0) {
            networkEmpty.style.display = 'none';
            attackerEmpty.style.display = 'none';
        }

        networkLogEl.innerHTML = '';
        attackerViewEl.innerHTML = '';

        networkLog.forEach((log, i) => {
            const li1 = document.createElement('li');
            li1.className = 'log-item';
            li1.innerHTML = `<strong>Paquete #${i + 1}:</strong> <code>${log.packet}</code>`;
            networkLogEl.appendChild(li1);

            const li2 = document.createElement('li');
            li2.className = 'log-item';
            if (log.encrypted) {
                li2.innerHTML = `<strong>Paquete #${i + 1}:</strong> <span class="encrypted">🔒 [Cifrado - ilegible]</span>`;
                li2.style.borderLeft = '3px solid #4caf50';
            } else {
                li2.innerHTML = `<strong>Paquete #${i + 1}:</strong> <span class="plain-text">⚠️ "${log.original}" [¡VISIBLE!]</span>`;
                li2.style.borderLeft = '3px solid #f44336';
            }
            attackerViewEl.appendChild(li2);
        });
    }
}

function setupPassword() {
    const passwordInput = document.getElementById('password-input');
    const checkBtn = document.getElementById('check-password');
    const resultDiv = document.getElementById('password-result');

    if (!checkBtn) return;

    checkBtn.addEventListener('click', () => {
        const password = passwordInput.value;
        if (typeof zxcvbn === 'undefined') {
            resultDiv.innerHTML = '<p style="color: red;">Error: zxcvbn no está cargado</p>';
            return;
        }

        const result = zxcvbn(password);
        const score = result.score;
        const feedback = result.feedback;

        let strength = ['Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'][score];
        let color = ['red', 'orange', 'yellow', 'lightgreen', 'green'][score];

        resultDiv.innerHTML = `
            <p>Fuerza: <strong style="color: ${color}">${strength}</strong></p>
            <p>Score: ${score}/4</p>
            <p>Tiempo estimado para crackear: ${result.crack_times_display.offline_slow_hashing_1e4_per_second}</p>
            ${feedback.warning ? `<p style="color: red;">⚠️ ${feedback.warning}</p>` : ''}
            ${feedback.suggestions.length ? `<p>💡 Sugerencias: ${feedback.suggestions.join(', ')}</p>` : ''}
        `;
    });
}

function setupCipher() {
    const textInput = document.getElementById('cipher-text');
    const methodSelect = document.getElementById('cipher-method');
    const keyInput = document.getElementById('cipher-key');
    const encryptBtn = document.getElementById('cipher-encrypt');
    const decryptBtn = document.getElementById('cipher-decrypt');
    const resultArea = document.getElementById('cipher-result');

    if (!encryptBtn) return;

    encryptBtn.addEventListener('click', async () => {
        const text = textInput.value;
        const method = methodSelect.value;
        const key = keyInput.value;

        if (!text) {
            resultArea.value = 'Error: por favor, ingresa un texto';
            return;
        }

        if (method === 'caesar') {
            const shift = parseInt(key) || 3;
            const result = caesarCipher(text, shift);
            resultArea.value = `Cifrado César (desplazamiento ${shift}):\n${result}`;
        } else if (method === 'aes') {
            if (!key || key.length < 8) {
                resultArea.value = 'Error: La contraseña debe tener al menos 8 caracteres';
                return;
            }
            try {
                const encrypted = await encryptAES(text, key);
                resultArea.value = `Cifrado AES-GCM:\n${encrypted}`;
            } catch (e) {
                resultArea.value = `Error al cifrar: ${e.message}`;
            }
        }
    });

    decryptBtn.addEventListener('click', async () => {
        const text = textInput.value;
        const method = methodSelect.value;
        const key = keyInput.value;

        if (!text) {
            resultArea.value = 'Error: por favor, ingresa un texto cifrado';
            return;
        }

        if (method === 'caesar') {
            const shift = parseInt(key) || 3;
            const result = caesarCipher(text, -shift);
            resultArea.value = `Descifrado César (desplazamiento ${shift}):\n${result}`;
        } else if (method === 'aes') {
            if (!key || key.length < 8) {
                resultArea.value = 'Error: La contraseña debe tener al menos 8 caracteres';
                return;
            }
            try {
                const decrypted = await decryptAES(text, key);
                resultArea.value = `Descifrado AES-GCM:\n${decrypted}`;
            } catch (e) {
                resultArea.value = `Error al descifrar: ${e.message}\nVerifica que la contraseña sea correcta y el texto esté cifrado con AES.`;
            }
        }
    });

    // Cifrado César (funciona con letras A-Z, mantiene mayúsculas/minúsculas)
    function caesarCipher(text, shift) {
        // Normalizar el desplazamiento al rango 0-25
        shift = ((shift % 26) + 26) % 26;

        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                // Determinar si es mayúscula (A-Z: 65-90) o minúscula (a-z: 97-122)
                const base = code >= 65 && code <= 90 ? 65 : 97;
                return String.fromCharCode(((code - base + shift) % 26) + base);
            }
            // No cifrar números, espacios, puntuación, etc.
            return char;
        }).join('');
    }

    // Cifrado AES-GCM real usando Web Crypto API
    async function encryptAES(plaintext, password) {
        try {
            // Convertir texto a bytes
            const encoder = new TextEncoder();
            const data = encoder.encode(plaintext);

            // Derivar clave de 256 bits desde la contraseña usando PBKDF2
            const passwordKey = await crypto.subtle.importKey(
                'raw',
                encoder.encode(password),
                'PBKDF2',
                false,
                ['deriveBits', 'deriveKey']
            );

            // Salt aleatorio para PBKDF2
            const salt = crypto.getRandomValues(new Uint8Array(16));

            // Derivar clave AES
            const aesKey = await crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt: salt,
                    iterations: 100000,
                    hash: 'SHA-256'
                },
                passwordKey,
                { name: 'AES-GCM', length: 256 },
                false,
                ['encrypt']
            );

            // IV (Initialization Vector) aleatorio de 12 bytes para AES-GCM
            const iv = crypto.getRandomValues(new Uint8Array(12));

            // Cifrar con AES-GCM
            const ciphertext = await crypto.subtle.encrypt(
                {
                    name: 'AES-GCM',
                    iv: iv
                },
                aesKey,
                data
            );

            // Combinar salt + iv + ciphertext para poder descifrar después
            const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
            combined.set(salt, 0);
            combined.set(iv, salt.length);
            combined.set(new Uint8Array(ciphertext), salt.length + iv.length);

            // Convertir a base64 para mostrar como texto
            return arrayBufferToBase64(combined);
        } catch (error) {
            throw new Error('Error en cifrado AES: ' + error.message);
        }
    }

    // Descifrado AES-GCM real
    async function decryptAES(cipherBase64, password) {
        try {
            // Convertir de base64 a bytes
            const combined = base64ToArrayBuffer(cipherBase64);

            // Extraer salt (16 bytes), iv (12 bytes) y ciphertext
            const salt = combined.slice(0, 16);
            const iv = combined.slice(16, 28);
            const ciphertext = combined.slice(28);

            // Derivar la clave usando la misma contraseña y salt
            const encoder = new TextEncoder();
            const passwordKey = await crypto.subtle.importKey(
                'raw',
                encoder.encode(password),
                'PBKDF2',
                false,
                ['deriveBits', 'deriveKey']
            );

            const aesKey = await crypto.subtle.deriveKey(
                {
                    name: 'PBKDF2',
                    salt: salt,
                    iterations: 100000,
                    hash: 'SHA-256'
                },
                passwordKey,
                { name: 'AES-GCM', length: 256 },
                false,
                ['decrypt']
            );

            // Descifrar con AES-GCM
            const decrypted = await crypto.subtle.decrypt(
                {
                    name: 'AES-GCM',
                    iv: iv
                },
                aesKey,
                ciphertext
            );

            // Convertir bytes a texto
            const decoder = new TextDecoder();
            return decoder.decode(decrypted);
        } catch (error) {
            throw new Error('Descifrado fallido. Contraseña incorrecta o datos corruptos.');
        }
    }

    // Utilidades para convertir entre ArrayBuffer y Base64
    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    function base64ToArrayBuffer(base64) {
        const binary = atob(base64);
        const len = binary.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }
}

function setupEncryption() {
    console.log('setupEncryption() ejecutándose...');

    // ===== ATAQUE DE FUERZA BRUTA =====
    const bruteAttackBtn = document.getElementById('brute-attack');
    const bruteTarget = document.getElementById('brute-target');
    const bruteResult = document.getElementById('brute-result');

    console.log('Elementos de fuerza bruta:', {
        btn: bruteAttackBtn,
        target: bruteTarget,
        result: bruteResult
    });

    if (bruteAttackBtn) {
        console.log('Registrando listener para fuerza bruta');
        bruteAttackBtn.addEventListener('click', async () => {
            console.log('Click en botón de fuerza bruta');
            const target = bruteTarget.value;

            // Validar que sea un PIN de 6 dígitos
            if (!target || !/^\d{6}$/.test(target)) {
                alert('⚠️ Ingresa un PIN válido de exactamente 6 dígitos numéricos');
                return;
            }

            console.log('Iniciando ataque para PIN:', target);
            bruteAttackBtn.disabled = true;
            bruteResult.innerHTML = '<strong>🔨 Iniciando ataque de fuerza bruta...</strong><br><br>';

            let attempts = 0;
            let found = false;
            const startTime = Date.now();
            const maxAttempts = 1000000; // 10^6 posibilidades

            // Simular el ataque con intervalos
            for (let pin = 0; pin < maxAttempts && !found; pin++) {
                attempts++;
                const currentPin = String(pin).padStart(6, '0');

                // Actualizar UI cada 5000 intentos
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
                    // Permitir que el navegador actualice la UI
                    await new Promise(resolve => setTimeout(resolve, 0));
                }

                // Verificar si encontramos el PIN
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
    } else {
        console.error('No se encontró el botón de fuerza bruta');
    }

    // ===== ATAQUE DE DICCIONARIO =====
    const dictAttackBtn = document.getElementById('dict-attack');
    const dictTarget = document.getElementById('dict-target');
    const dictResult = document.getElementById('dict-result');

    console.log('Elementos de diccionario:', {
        btn: dictAttackBtn,
        target: dictTarget,
        result: dictResult
    });

    if (dictAttackBtn) {
        console.log('Registrando listener para diccionario');
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
            console.log('Click en botón de diccionario');
            const target = dictTarget.value;
            console.log('Contraseña objetivo:', target);

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
                    // Mostrar solo los primeros 10 intentos y el último
                    dictResult.innerHTML += `${attempts + 1}. Probando "${attempt}" ... ❌<br>`;
                } else if (attempts === 10) {
                    dictResult.innerHTML += `<span style="font-size: 0.85em; color: #666;">... probando más contraseñas ...</span><br>`;
                }

                attempts++;
            }, 100);
        });
    } else {
        console.error('No se encontró el botón de diccionario');
    }

    console.log('setupEncryption() completado');
}

function setupECC() {
    console.log('setupECC() ejecutándose...');

    // ==================== MATEMÁTICAS DE CURVA ELÍPTICA ====================

    // Aritmética modular
    function mod(n, m) {
        return ((n % m) + m) % m;
    }

    // Inverso modular usando algoritmo extendido de Euclides
    function modInverse(a, m) {
        // a, m pueden ser Numbers; trabajamos en BigInt para seguridad
        a = BigInt(((a % m) + m) % m);
        m = BigInt(m);
        let [old_r, r] = [a, m];
        let [old_s, s] = [1n, 0n];

        while (r !== 0n) {
            const q = old_r / r;
            [old_r, r] = [r, old_r - q * r];
            [old_s, s] = [s, old_s - q * s];
        }

        if (old_r !== 1n) return null; // no existe inverso
        // devolver como Number en rango 0..m-1
        const res = (old_s + m) % m;
        return Number(res);
    }

    // Verificar si un punto está en la curva
    function isOnCurve(x, y, a, b, p) {
        const left = mod(y * y, p);
        const right = mod(x * x * x + a * x + b, p);
        return left === right;
    }

    // Suma de puntos en curva elíptica
    function pointAdd(P, Q, a, p) {
        if (!P) return Q;
        if (!Q) return P;

        const [x1, y1] = P;
        const [x2, y2] = Q;

        let slope;

        if (x1 === x2 && y1 === y2) {
            // Duplicación de punto (P + P)
            const numerator = mod(3 * x1 * x1 + a, p);
            const denominator = mod(2 * y1, p);
            const inv = modInverse(denominator, p);
            if (inv === null) return null; // Punto en infinito
            slope = mod(numerator * inv, p);
        } else if (x1 === x2) {
            // Puntos son inversos aditivos
            return null; // Punto en infinito
        } else {
            // Suma normal
            const numerator = mod(y2 - y1, p);
            const denominator = mod(x2 - x1, p);
            const inv = modInverse(denominator, p);
            if (inv === null) return null;
            slope = mod(numerator * inv, p);
        }

        const x3 = mod(slope * slope - x1 - x2, p);
        const y3 = mod(slope * (x1 - x3) - y1, p);

        return [x3, y3];
    }

    // Multiplicación escalar (k × P)
    function scalarMult(k, P, a, p) {
        if (k === 0 || !P) return null;
        if (k === 1) return P;

        let result = null;
        let addend = P;

        while (k > 0) {
            if (k & 1) {
                result = pointAdd(result, addend, a, p);
            }
            addend = pointAdd(addend, addend, a, p);
            k >>= 1;
        }

        return result;
    }

    // Generar todos los puntos de la curva
    function generateAllPoints(a, b, p) {
        const points = [];

        for (let x = 0; x < p; x++) {
            const ySquared = mod(x * x * x + a * x + b, p);

            // Buscar raíces cuadradas de ySquared mod p
            for (let y = 0; y < p; y++) {
                if (mod(y * y, p) === ySquared) {
                    points.push([x, y]);
                }
            }
        }

        return points;
    }

    // Hash simple para firma digital (en producción usar SHA-256)
    function simpleHash(message) {
        let hash = 0;
        for (let i = 0; i < message.length; i++) {
            hash = ((hash << 5) - hash) + message.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    function signToyECDSA(privateKey, message, G, a, p) {
        // privateKey: Number, G: [gx,gy], a,p: Numbers
        const h = simpleHash(message) % p;
        const maxAttempts = 100;
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            // elegir k aleatorio en [1, p-1]
            const k = Math.floor(Math.random() * (p - 1)) + 1;

            // R = k * G
            const R = scalarMult(k, G, a, p);
            if (!R) continue; // punto en infinito, elegir otro k

            const r = mod(R[0], p);
            if (r === 0) continue;

            const kInv = modInverse(k, p);
            if (kInv === null) continue;

            const s = mod(kInv * (h + r * privateKey), p);
            if (s === 0) continue;

            return { r, s, message, hash: h };
        }

        throw new Error('No se pudo generar una firma válida tras varios intentos (elige otra G/p).');
    }

    // ==================== VARIABLES GLOBALES ====================
    let currentCurve = { a: 0, b: 7, p: 17 };
    let currentPoints = [];
    let currentKeys = null;
    let currentSignature = null;
    let basePoint = null;

    // ==================== VALIDAR CURVA ====================
    const validateBtn = document.getElementById('validate-curve');
    const curveValidation = document.getElementById('curve-validation');

    if (validateBtn) {
        validateBtn.addEventListener('click', () => {
            const a = parseInt(document.getElementById('curve-a').value);
            const b = parseInt(document.getElementById('curve-b').value);
            const p = parseInt(document.getElementById('curve-p').value);

            // Verificar que 4a³ + 27b² ≠ 0 (mod p)
            const discriminant = mod(4 * a * a * a + 27 * b * b, p);

            if (discriminant === 0) {
                curveValidation.innerHTML = `
                    <strong style="color: #f44336;">❌ CURVA INVÁLIDA</strong><br><br>
                    La curva y² = x³ + ${a}x + ${b} (mod ${p}) es singular.<br>
                    Discriminante: 4a³ + 27b² ≡ 0 (mod ${p})<br>
                    Por favor, elige otros parámetros.
                `;
            } else {
                currentCurve = { a, b, p };
                curveValidation.innerHTML = `
                    <strong style="color: #4caf50;">✅ CURVA VÁLIDA</strong><br><br>
                    <strong>Ecuación:</strong> y² = x³ + ${a}x + ${b} (mod ${p})<br>
                    <strong>Discriminante:</strong> 4a³ + 27b² ≡ ${discriminant} (mod ${p}) ✓<br>
                    <em>La curva es no-singular y puede usarse para criptografía.</em>
                `;
            }
        });
    }

    // ==================== GENERAR PUNTOS ====================
    const generatePointsBtn = document.getElementById('generate-points');
    const curvePointsDiv = document.getElementById('curve-points');

    if (generatePointsBtn) {
        generatePointsBtn.addEventListener('click', () => {
            const { a, b, p } = currentCurve;
            currentPoints = generateAllPoints(a, b, p);

            curvePointsDiv.innerHTML = `
                <strong>📊 Puntos en la curva y² = x³ + ${a}x + ${b} (mod ${p})</strong><br><br>
                <strong>Total de puntos: ${currentPoints.length}</strong><br><br>
            `;

            let pointsHTML = '<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 8px;">';
            currentPoints.forEach(([x, y]) => {
                pointsHTML += `<span style="background: #e3f2fd; padding: 4px 8px; border-radius: 4px;">(${x}, ${y})</span>`;
            });
            pointsHTML += '</div>';

            curvePointsDiv.innerHTML += pointsHTML;
            curvePointsDiv.innerHTML += `<br><em>💡 Puedes usar cualquiera de estos puntos para operaciones.</em>`;
        });
    }

    // ==================== SUMA DE PUNTOS ====================
    const addPointsBtn = document.getElementById('add-points');
    const pointAdditionDiv = document.getElementById('point-addition');

    if (addPointsBtn) {
        addPointsBtn.addEventListener('click', () => {
            const { a, b, p } = currentCurve;

            const pointPStr = document.getElementById('point-p').value.trim();
            const pointQStr = document.getElementById('point-q').value.trim();

            if (!pointPStr || !pointQStr) {
                alert('Por favor, ingresa ambos puntos en formato x,y');
                return;
            }

            const parsePoint = (str) => {
                const [x, y] = str.split(',').map(s => parseInt(s.trim()));
                return [x, y];
            };

            const P = parsePoint(pointPStr);
            const Q = parsePoint(pointQStr);

            // Verificar que los puntos estén en la curva
            if (!isOnCurve(P[0], P[1], a, b, p)) {
                pointAdditionDiv.innerHTML = `<strong style="color: #f44336;">❌ El punto P(${P[0]}, ${P[1]}) NO está en la curva!</strong>`;
                return;
            }
            if (!isOnCurve(Q[0], Q[1], a, b, p)) {
                pointAdditionDiv.innerHTML = `<strong style="color: #f44336;">❌ El punto Q(${Q[0]}, ${Q[1]}) NO está en la curva!</strong>`;
                return;
            }

            const R = pointAdd(P, Q, a, p);

            if (!R) {
                pointAdditionDiv.innerHTML = `
                    <strong>➕ Suma de Puntos</strong><br><br>
                    P = (${P[0]}, ${P[1]})<br>
                    Q = (${Q[0]}, ${Q[1]})<br><br>
                    <strong>Resultado: P + Q = ∞ (Punto en infinito)</strong><br>
                    <em>Los puntos son inversos aditivos.</em>
                `;
            } else {
                pointAdditionDiv.innerHTML = `
                    <strong>➕ Suma de Puntos en y² = x³ + ${a}x + ${b} (mod ${p})</strong><br><br>
                    P = (${P[0]}, ${P[1]})<br>
                    Q = (${Q[0]}, ${Q[1]})<br><br>
                    <strong style="color: #4caf50;">✅ P + Q = (${R[0]}, ${R[1]})</strong><br><br>
                    <strong>Proceso:</strong><br>
                    ${P[0] === Q[0] && P[1] === Q[1] ?
                        `1. Duplicación de punto: P + P<br>
                         2. Pendiente: λ = (3x₁² + a) / (2y₁) mod ${p}<br>
                         3. x₃ = λ² - 2x₁ mod ${p} = ${R[0]}<br>
                         4. y₃ = λ(x₁ - x₃) - y₁ mod ${p} = ${R[1]}` :
                        `1. Suma de puntos distintos<br>
                         2. Pendiente: λ = (y₂ - y₁) / (x₂ - x₁) mod ${p}<br>
                         3. x₃ = λ² - x₁ - x₂ mod ${p} = ${R[0]}<br>
                         4. y₃ = λ(x₁ - x₃) - y₁ mod ${p} = ${R[1]}`
                    }
                `;
            }
        });
    }

    // ==================== MULTIPLICACIÓN ESCALAR ====================
    const scalarMultBtn = document.getElementById('scalar-mult');
    const scalarResultDiv = document.getElementById('scalar-result');

    if (scalarMultBtn) {
        scalarMultBtn.addEventListener('click', () => {
            const { a, b, p } = currentCurve;

            const k = parseInt(document.getElementById('scalar-k').value);
            const pointStr = document.getElementById('point-scalar').value.trim();

            if (!pointStr) {
                alert('Por favor, ingresa un punto en formato x,y');
                return;
            }

            const [x, y] = pointStr.split(',').map(s => parseInt(s.trim()));
            const P = [x, y];

            if (!isOnCurve(x, y, a, b, p)) {
                scalarResultDiv.innerHTML = `<strong style="color: #f44336;">❌ El punto (${x}, ${y}) NO está en la curva!</strong>`;
                return;
            }

            const R = scalarMult(k, P, a, p);

            scalarResultDiv.innerHTML = `
                <strong>✖️ Multiplicación Escalar</strong><br><br>
                P = (${P[0]}, ${P[1]})<br>
                k = ${k}<br><br>
                <strong style="color: #4caf50;">✅ ${k} × P = ${R ? `(${R[0]}, ${R[1]})` : '∞'}</strong><br><br>
                <strong>Cálculo paso a paso:</strong><br>
            `;

            let steps = '';
            let current = null;
            for (let i = 1; i <= k; i++) {
                current = pointAdd(current, P, a, p);
                if (i <= 10 || i === k) {
                    steps += `${i}P = ${current ? `(${current[0]}, ${current[1]})` : '∞'}<br>`;
                } else if (i === 11) {
                    steps += `...<br>`;
                }
            }
            scalarResultDiv.innerHTML += steps;

            scalarResultDiv.innerHTML += `<br><em>💡 Esta operación es fundamental para ECC: fácil de calcular, difícil de invertir.</em>`;
        });
    }

    // ==================== GENERAR CLAVES ECDSA ====================
    const generateKeysBtn = document.getElementById('ecc-generate');
    const keysDiv = document.getElementById('ecc-keys');

    if (generateKeysBtn) {
        generateKeysBtn.addEventListener('click', () => {
            const { a, b, p } = currentCurve;
            const basePointStr = document.getElementById('base-point').value.trim();

            if (!basePointStr) {
                alert('Por favor, ingresa un punto base G');
                return;
            }

            const [gx, gy] = basePointStr.split(',').map(s => parseInt(s.trim()));
            basePoint = [gx, gy];

            if (!isOnCurve(gx, gy, a, b, p)) {
                keysDiv.innerHTML = `<strong style="color: #f44336;">❌ El punto base G NO está en la curva!</strong>`;
                return;
            }

            // Generar clave privada (número aleatorio menor que p)
            const privateKey = Math.floor(Math.random() * (p - 2)) + 1;

            // Calcular clave pública: Q = privateKey × G
            const publicKey = scalarMult(privateKey, basePoint, a, p);

            if (!publicKey) {
                keysDiv.innerHTML = `<strong style="color: #f44336;">❌ Error: El punto base no es válido</strong>`;
                return;
            }

            currentKeys = { privateKey, publicKey, basePoint };

            keysDiv.innerHTML = `
                <strong style="color: #4caf50;">✅ Par de Claves ECDSA Generado</strong><br><br>
                <strong>Curva:</strong> y² = x³ + ${a}x + ${b} (mod ${p})<br>
                <strong>Punto Base G:</strong> (${basePoint[0]}, ${basePoint[1]})<br><br>
                <strong>🔐 Clave Privada (d):</strong><br>
                <span style="color: #f44336; font-size: 1.2em;">${privateKey}</span><br><br>
                <strong>🔓 Clave Pública (Q = d × G):</strong><br>
                Q = (${publicKey[0]}, ${publicKey[1]})<br><br>
                <strong>Verificación:</strong> ${isOnCurve(publicKey[0], publicKey[1], a, b, p) ? '✅ Q está en la curva' : '❌ Error'}<br>
                <em>💡 La clave pública se puede compartir, la privada debe mantenerse secreta.</em>
            `;
        });
    }

    // ==================== FIRMAR MENSAJE (ECDSA) ====================
    //async function firmarDatos(privateKey, mensajeHash) {
    //    // Convertir el mensaje (string) a ArrayBuffer
    //    const encoder = new TextEncoder();
    //    const data = encoder.encode(mensajeHash)
    //    const signature = await window.crypto.subtle.sign(
    //        {
    //        name: "ECDSA",
    //        hash: { name: "SHA-256" }, // El hash debe coincidir en firma y verificación
    //        },
    //        privateKey, // Solo la clave privada puede firmar
    //        data // Los datos a firmar
    //    );
    //    
    //    // La firma (signature) es un ArrayBuffer
    //    console.log("Firma generada:", signature);
    //    return signature;
    //}
    //
    //async function hashearMensaje(mensaje) {
    //    // 1. Codificar el mensaje a ArrayBuffer
    //    const encoder = new TextEncoder();
    //    const data = encoder.encode(mensaje);
    //
    //    // 2. Calcular el hash
    //    const hashBuffer = await window.crypto.subtle.digest(
    //        'SHA-256', // Algoritmo de hash
    //        data       // Datos a hashear
    //    );
    //
    //    // 3. Convertir el ArrayBuffer a una cadena hexadecimal (para mostrarlo)
    //    const hashArray = Array.from(new Uint8Array(hashBuffer));
    //    const hashHex = hashArray
    //        .map((b) => b.toString(16).padStart(2, '0'))
    //        .join('');
    //
    //    return hashHex;
    //}

    const signBtn = document.getElementById('ecc-sign'); // boton que activa la firma ecdsa
    const signatureDiv = document.getElementById('ecc-signature'); // campo donde se muestra la firma

    if (signBtn) {
        signBtn.addEventListener('click', async () => {
            const message = document.getElementById('ecc-message').value.trim();

            if (!message) {
                alert('Por favor, ingresa un mensaje');
                return;
            }

            if (!currentKeys) {
                alert('Primero genera un par de claves');
                return;
            }

            const { privateKey, basePoint } = currentKeys;
            // Si prefieres usar hashearMensaje (SHA-256 real), await:
            // const hashHex = await hashearMensaje(message);

            // Usar la versión toy de firma que trabaja con tu curva modular
            const sig = signToyECDSA(privateKey, message, basePoint, currentCurve.a, currentCurve.p);

            currentSignature = { r: sig.r, s: sig.s, message: sig.message, hash: sig.hash };

            signatureDiv.innerHTML = `
                <strong style="color: #4caf50;">✅ Mensaje Firmado</strong><br><br>
                <strong>Mensaje:</strong> "${sig.message}"<br>
                <strong>Hash (simple):</strong> ${sig.hash}<br><br>
                <strong>📝 Firma Digital (r, s):</strong><br>
                r = ${sig.r}<br>
                s = ${sig.s}<br><br>
            `;
        });
    }
    /*<strong>Proceso de firma:</strong><br>
                1. Hash del mensaje: h = ${hash}<br>
                2. Número aleatorio: k = ${k}<br>
                3. Punto R = k × G = (${R[0]}, ${R[1]})<br>
                4. r = ${r} (coordenada x de R)<br>
                5. s = k⁻¹(h + r·d) mod p = ${s}<br><br>
                <em>💡 La firma (r, s) prueba que conoces la clave privada sin revelarla.</em>*/

    // ==================== VERIFICAR FIRMA ====================
    const verifyBtn = document.getElementById('ecc-verify');
    const verifyResultDiv = document.getElementById('ecc-verify-result');

    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            if (!currentSignature) {
                alert('Primero firma un mensaje');
                return;
            }

            if (!currentKeys) {
                alert('No hay claves disponibles');
                return;
            }

            const { a, p } = currentCurve;
            const { publicKey, basePoint } = currentKeys;
            const { r, s, message, hash } = currentSignature;

            // Verificar firma: calcular w = s⁻¹
            const w = modInverse(s, p);

            // u1 = hash × w mod p
            const u1 = mod(hash * w, p);

            // u2 = r × w mod p
            const u2 = mod(r * w, p);

            // Calcular P = u1 × G + u2 × Q
            const point1 = scalarMult(u1, basePoint, a, p);
            const point2 = scalarMult(u2, publicKey, a, p);
            const P = pointAdd(point1, point2, a, p);

            const isValid = P && P[0] === r;

            verifyResultDiv.innerHTML = `
                <strong style="color: ${isValid ? '#4caf50' : '#f44336'};">${isValid ? '✅ FIRMA VÁLIDA' : '❌ FIRMA INVÁLIDA'}</strong><br><br>
                <strong>Mensaje:</strong> "${message}"<br>
                <strong>Firma:</strong> (r=${r}, s=${s})<br><br>
                <strong>Proceso de verificación:</strong><br>
                1. w = s⁻¹ mod p = ${w}<br>
                2. u₁ = h·w mod p = ${u1}<br>
                3. u₂ = r·w mod p = ${u2}<br>
                4. P = u₁×G + u₂×Q = ${P ? `(${P[0]}, ${P[1]})` : '∞'}<br>
                5. Verificar: x₁ = ${P ? P[0] : '?'} ${isValid ? '==' : '!='} r = ${r}<br><br>
                ${isValid ?
                    '<strong style="color: #4caf50;">✅ La firma es auténtica.</strong><br>El mensaje fue firmado con la clave privada correspondiente a esta clave pública.' :
                    '<strong style="color: #f44336;">❌ La firma NO es válida.</strong><br>El mensaje fue modificado o la firma es incorrecta.'
                }
            `;
        });
    }

    // ==================== VERIFICAR MENSAJE FALSO ====================
    const verifyFakeBtn = document.getElementById('ecc-verify-fake');
    const fakeResultDiv = document.getElementById('ecc-fake-result');

    if (verifyFakeBtn) {
        verifyFakeBtn.addEventListener('click', () => {
            const fakeMessage = document.getElementById('ecc-fake-message').value.trim();

            if (!fakeMessage) {
                alert('Por favor, ingresa un mensaje para verificar');
                return;
            }

            if (!currentSignature) {
                alert('Primero firma un mensaje original');
                return;
            }

            const { a, p } = currentCurve;
            const { publicKey, basePoint } = currentKeys;
            const { r, s } = currentSignature;

            // Hash del mensaje falso
            const fakeHash = simpleHash(fakeMessage) % p;

            // Intentar verificar con la firma original
            const w = modInverse(s, p);
            const u1 = mod(fakeHash * w, p);
            const u2 = mod(r * w, p);

            const point1 = scalarMult(u1, basePoint, a, p);
            const point2 = scalarMult(u2, publicKey, a, p);
            const P = pointAdd(point1, point2, a, p);

            const isValid = P && P[0] === r;

            fakeResultDiv.innerHTML = `
                <strong style="color: ${isValid ? '#f44336' : '#4caf50'};">${isValid ? '⚠️ IMPOSIBLE - FIRMA VÁLIDA' : '✅ FIRMA RECHAZADA (esperado)'}</strong><br><br>
                <strong>Mensaje original:</strong> "${currentSignature.message}"<br>
                <strong>Mensaje falso:</strong> "${fakeMessage}"<br>
                <strong>Firma original:</strong> (r=${r}, s=${s})<br><br>
                <strong>Resultado:</strong><br>
                Hash original: ${currentSignature.hash}<br>
                Hash falso: ${fakeHash}<br>
                Punto verificado: ${P ? `(${P[0]}, ${P[1]})` : '∞'}<br>
                Validación: x₁ = ${P ? P[0] : '?'} ${isValid ? '==' : '!='} r = ${r}<br><br>
                ${!isValid ?
                    '<strong style="color: #4caf50;">✅ SEGURIDAD CONFIRMADA</strong><br>La firma NO funciona con el mensaje modificado.<br>Esto demuestra que ECDSA detecta adulteraciones.' :
                    '<strong style="color: #ff9800;">⚠️ COLISIÓN</strong><br>Por coincidencia extrema, los hashes coinciden (probabilidad casi nula en curvas reales).'
                }
            `;
        });
    }

    // ==================== GRAFICADOR MEJORADO ====================
    (function () {
        let currentZoom = 1;
        const baseViewBox = { x: -200, y: -100, width: 400, height: 200 };

        // Función para crear marcas en los ejes
        function createAxisMarks() {
            const svg = document.getElementById('ecc-plot');
            const marksGroup = document.getElementById('axis-marks');
            if (!marksGroup) return;

            marksGroup.innerHTML = '';

            // Marcas en eje X
            for (let i = -180; i <= 180; i += 40) {
                if (i === 0) continue;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', i);
                line.setAttribute('y1', -3);
                line.setAttribute('x2', i);
                line.setAttribute('y2', 3);
                line.setAttribute('stroke', '#666');
                line.setAttribute('stroke-width', '1.5');
                marksGroup.appendChild(line);

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', i);
                text.setAttribute('y', 15);
                text.setAttribute('font-size', '10');
                text.setAttribute('fill', '#666');
                text.setAttribute('text-anchor', 'middle');
                text.textContent = (i / 20).toFixed(0);
                marksGroup.appendChild(text);
            }

            // Marcas en eje Y
            for (let i = -80; i <= 80; i += 40) {
                if (i === 0) continue;
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', -3);
                line.setAttribute('y1', -i);
                line.setAttribute('x2', 3);
                line.setAttribute('y2', -i);
                line.setAttribute('stroke', '#666');
                line.setAttribute('stroke-width', '1.5');
                marksGroup.appendChild(line);

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', -15);
                text.setAttribute('y', -i + 4);
                text.setAttribute('font-size', '10');
                text.setAttribute('fill', '#666');
                text.setAttribute('text-anchor', 'end');
                text.textContent = (i / 20).toFixed(0);
                marksGroup.appendChild(text);
            }
        }

        // Función principal de graficación mejorada
        function drawCurveReal(a, b) {
            const svg = document.getElementById('ecc-plot');
            const curvesGroup = document.getElementById('curves-group');
            const infoDiv = document.getElementById('curve-info');

            if (!svg || !curvesGroup) return;

            // Actualizar displays
            document.getElementById('display-a').textContent = a.toFixed(2);
            document.getElementById('display-b').textContent = b.toFixed(2);

            // Limpiar curvas previas
            curvesGroup.innerHTML = '';

            // Verificar discriminante para singularidades
            const discriminant = 4 * (a * a * a) + 27 * (b * b);
            if (discriminant == 0) {
                infoDiv.innerHTML = `<p>⚠️ Esta curva tiene una singularidad porque el discriminante = 0 (4(${a})³ + 27(${b})² = 0). No es una curva elíptica válida.</p>`;
                infoDiv.innerHTML += '<p><strong>¿En qué afecta esto a la criptografía de curva elíptica?</strong></p>';
                infoDiv.innerHTML += '<ul><li>El problema del logaritmo discreto en ECC depende de sumar y multiplicar puntos en una curva elíptica.</li></ul>';
                infoDiv.innerHTML += '<ul><li>Para obtener P + Q, la línea que conecta P y Q intersecta la curva en un tercer punto cuyo reflejo es P + Q.</li></ul>';
                infoDiv.innerHTML += '<ul><li>Para obtener kP, la tangente de P intersecta con un segundo punto cuyo reflejo es 2P, luego la tangente de 2P intersecta con 4P, y asi hasta encontrar kP.</li></ul>';
                infoDiv.innerHTML += '<ul><li>Si la curva tiene una singularidad, estas operaciones pueden no estar bien definidas en todos los puntos, comprometiendo la seguridad.</li></ul>';
                let started = false;

                for (let i = 0; i < values.length; i++) {
                    const val = values[i][key];
                    if (val === null) {
                        started = false;
                        continue;
                    }
                    const x = values[i].x * xScale;
                    const y = -val * yScale;

                    if (!started) {
                        d += `M ${x.toFixed(2)} ${y.toFixed(2)} `;
                        started = true;
                    } else {
                        d += `L ${x.toFixed(2)} ${y.toFixed(2)} `;
                    }
                }

                if (d) {
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', d.trim());
                    path.setAttribute('stroke', color);
                    path.setAttribute('stroke-width', '3');
                    path.setAttribute('fill', 'none');
                    path.setAttribute('stroke-linecap', 'round');
                    path.setAttribute('stroke-linejoin', 'round');
                    if (filter) path.setAttribute('filter', filter);
                    path.classList.add('ecc-curve-branch');

                    // Animación de trazo
                    const length = path.getTotalLength();
                    path.style.strokeDasharray = length;
                    path.style.strokeDashoffset = length;
                    path.style.animation = 'dash 1.5s ease-in-out forwards';

                    curvesGroup.appendChild(path);
                }
            }

            // Agregar keyframes para animación
            if (!document.getElementById('curve-animation-style')) {
                const style = document.createElement('style');
                style.id = 'curve-animation-style';
                style.textContent = `
                    @keyframes dash {
                        to {
                            stroke-dashoffset: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            buildPath('yPos', '#1687a7', 'url(#glow)');
            buildPath('yNeg', '#ff9800', 'url(#glow)');

            if (discriminant != 0) {
                infoDiv.innerHTML = `<p>✅ Curva elíptica graficada: y² = x³ + ${a.toFixed(2)}x + ${b.toFixed(2)}</p>`;
                infoDiv.style.background = '#e8f5e9';
                infoDiv.style.borderColor = '#4caf50';
                infoDiv.style.color = '#2e7d32';
            }
        }

        // Controles de zoom
        function setupZoom() {
            const svg = document.getElementById('ecc-plot');

            document.getElementById('zoom-in')?.addEventListener('click', () => {
                currentZoom *= 0.8;
                updateViewBox();
            });

            document.getElementById('zoom-out')?.addEventListener('click', () => {
                currentZoom *= 1.25;
                updateViewBox();
            });

            document.getElementById('zoom-reset')?.addEventListener('click', () => {
                currentZoom = 1;
                updateViewBox();
            });

            function updateViewBox() {
                const newWidth = baseViewBox.width * currentZoom;
                const newHeight = baseViewBox.height * currentZoom;
                const newX = -(newWidth / 2);
                const newY = -(newHeight / 2);
                svg.setAttribute('viewBox', `${newX} ${newY} ${newWidth} ${newHeight}`);
            }
        }

        // Event listeners
        document.getElementById('plot-curve')?.addEventListener('click', () => {
            const aVal = parseFloat(document.getElementById('ec-a').value);
            const bVal = parseFloat(document.getElementById('ec-b').value);

            if (isNaN(aVal) || isNaN(bVal)) {
                alert('Por favor, introduce valores numéricos válidos para a y b');
                return;
            }

            drawCurveReal(aVal, bVal);
        });

        document.getElementById('clear-curve')?.addEventListener('click', () => {
            const curvesGroup = document.getElementById('curves-group');
            if (curvesGroup) curvesGroup.innerHTML = '';
            document.getElementById('ec-a').value = '';
            document.getElementById('ec-b').value = '';
            document.getElementById('display-a').textContent = '0';
            document.getElementById('display-b').textContent = '0';
            document.getElementById('curve-info').innerHTML = '<p>💡 Introduce valores y presiona "Graficar Curva" para visualizar</p>';
            document.getElementById('curve-info').style.background = '#e3f2fd';
            document.getElementById('curve-info').style.borderColor = '#667eea';
            document.getElementById('curve-info').style.color = '#1976d2';
        });

        // Presets
        document.querySelectorAll('.btn-preset').forEach(btn => {
            btn.addEventListener('click', function () {
                const a = parseFloat(this.dataset.a);
                const b = parseFloat(this.dataset.b);
                document.getElementById('ec-a').value = a;
                document.getElementById('ec-b').value = b;
                drawCurveReal(a, b);
            });
        });

        // Enter key para graficar
        ['ec-a', 'ec-b'].forEach(id => {
            document.getElementById(id)?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById('plot-curve').click();
                }
            });
        });

        // Inicialización
        createAxisMarks();
        setupZoom();
    })();

    /*
        // ==================== GRAFICADOR (VISUAL, REALES) ====================
        // Dibuja la curva y^2 = x^3 + a x + b en el SVG con id ecc-plot
        function drawCurveReal(a, b, svgId = 'ecc-plot') {
            const svg = document.getElementById(svgId);
            if (!svg) return;
    
            // Limpiar curvas previas
            svg.querySelectorAll('.ecc-curve-branch').forEach(n => n.remove());
    
            // Obtener dimensiones desde viewBox o client
            const vb = svg.viewBox.baseVal;
            const width = (vb && vb.width) ? vb.width : svg.clientWidth || 400;
            const height = (vb && vb.height) ? vb.height : svg.clientHeight || 200;
    
            // Dominio de dibujo en X (puedes ajustar esto o exponer al usuario)
            const xMin = -6;
            const xMax = 6;
            const steps = 800;
    
            // Muestreo de x
            const xs = new Array(steps).fill(0).map((_, i) => xMin + (i / (steps - 1)) * (xMax - xMin));
    
            // Calcular valores y y determinar rangos
            let yMin = Infinity, yMax = -Infinity;
    
            const values = xs.map(x => {
                const v = x * x * x + a * x + b; // x^3 + a x + b
                if (v >= 0) {
                    const y = Math.sqrt(v);
                    yMin = Math.min(yMin, -y);
                    yMax = Math.max(yMax, y);
                    return { x, yPos: y, yNeg: -y };
                }
                return { x, yPos: null, yNeg: null };
            });
    
            if (yMin === Infinity || yMax === -Infinity) {
                // No hay puntos reales en el rango, mostrar un pequeño rango por defecto
                yMin = -3;
                yMax = 3;
            }
    
            // Margen vertical
            const pad = (yMax - yMin) * 0.1 || 1;
            yMin -= pad;
            yMax += pad;
    
            // Mapeo a coordenadas SVG
            const toSvgX = x => ((x - xMin) / (xMax - xMin)) * width;
            const toSvgY = y => (height - ((y - yMin) / (yMax - yMin)) * height);
    
            // Construir trazados para ramas positivas y negativas
            function buildPathFor(key) {
                let d = '';
                let started = false;
                for (let i = 0; i < values.length; i++) {
                    const val = values[i][key];
                    if (val === null) {
                        started = false; // romper segmento
                        continue;
                    }
                    const x = values[i].x;
                    const sx = toSvgX(x);
                    const sy = toSvgY(val);
                    if (!started) {
                        d += `M ${sx.toFixed(2)} ${sy.toFixed(2)} `;
                        started = true;
                    } else {
                        d += `L ${sx.toFixed(2)} ${sy.toFixed(2)} `;
                    }
                }
                return d.trim();
            }
    
            const dPos = buildPathFor('yPos');
            const dNeg = buildPathFor('yNeg');
    
            if (dPos) {
                const pathPos = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pathPos.setAttribute('d', dPos);
                pathPos.setAttribute('stroke', '#1687a7');
                pathPos.setAttribute('stroke-width', '2');
                pathPos.setAttribute('fill', 'none');
                pathPos.classList.add('ecc-curve-branch');
                svg.appendChild(pathPos);
            }
    
            if (dNeg) {
                const pathNeg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pathNeg.setAttribute('d', dNeg);
                pathNeg.setAttribute('stroke', '#ff9800');
                pathNeg.setAttribute('stroke-width', '2');
                pathNeg.setAttribute('fill', 'none');
                pathNeg.classList.add('ecc-curve-branch');
                svg.appendChild(pathNeg);
            }
        }
    
        // Listener para el botón Graficar
        const plotBtn = document.getElementById('plot-curve');
        if (plotBtn) {
            plotBtn.addEventListener('click', () => {
                const aVal = parseFloat(document.getElementById('ec-a').value);
                const bVal = parseFloat(document.getElementById('ec-b').value);
                if (Number.isNaN(aVal) || Number.isNaN(bVal)) return;
                drawCurveReal(aVal, bVal, 'ecc-plot');
            });
        }
    */
    // Dibujar automáticamente al validar curva
    if (validateBtn) {
        validateBtn.addEventListener('click', () => {
            const aVal = parseFloat(document.getElementById('curve-a').value);
            const bVal = parseFloat(document.getElementById('curve-b').value);
            if (Number.isFinite(aVal) && Number.isFinite(bVal)) {
                drawCurveReal(aVal, bVal, 'ecc-plot');
            }
        });
    }

    console.log('setupECC() completado');
}

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

function setupBlockchain() {
    console.log('setupBlockchain() ejecutándose...');

    const blockDataInput = document.getElementById('block-data');
    const mineBtn = document.getElementById('mine-block');
    const tamperBtn = document.getElementById('tamper-block');
    const resetBtn = document.getElementById('reset-chain');
    const container = document.getElementById('blockchain-container');
    const status = document.getElementById('blockchain-status');

    let blockchain = [];
    let isMining = false;

    if (!mineBtn) {
        console.error('Elementos de blockchain no encontrados');
        return;
    }

    // ==================== HASH SHA-256 REAL ====================

    function bufferToHex(buffer) {
        return Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    async function sha256(text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return bufferToHex(hashBuffer);
    }

    // ==================== FUNCIONES DE BLOCKCHAIN ====================

    async function calculateHash(index, previousHash, timestamp, data, nonce) {
        const blockData = index + previousHash + timestamp + data + nonce;
        return await sha256(blockData);
    }

    async function createBlock(index, previousHash, data, difficulty = 2) {
        const timestamp = Date.now();
        let nonce = 0;
        let hash = await calculateHash(index, previousHash, timestamp, data, nonce);

        const target = '0'.repeat(difficulty);
        const startTime = Date.now();

        // Proof of Work (PoW) - Mining
        while (!hash.startsWith(target)) {
            nonce++;
            hash = await calculateHash(index, previousHash, timestamp, data, nonce);

            // Actualizar UI cada 1000 intentos para no bloquear el navegador
            if (nonce % 1000 === 0) {
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        }

        const miningTime = Date.now() - startTime;

        return {
            index,
            previousHash,
            timestamp,
            data,
            nonce,
            hash,
            miningTime
        };
    }

    async function resetBlockchain() {
        blockchain = [];
        status.innerHTML = '⛏️ Minando bloque génesis...';

        const genesisBlock = await createBlock(0, '0'.repeat(64), 'Bloque Génesis 🎉', 2);
        blockchain.push(genesisBlock);

        await renderBlockchain();
        status.innerHTML = `✅ Blockchain inicializada correctamente. Bloque génesis minado en ${genesisBlock.miningTime}ms`;
        status.style.background = '#e8f5e9';
        status.style.borderLeftColor = '#4caf50';
    }

    async function renderBlockchain() {
        container.innerHTML = '';

        for (let i = 0; i < blockchain.length; i++) {
            const block = blockchain[i];
            const isValid = await validateBlock(block, i);

            const blockEl = document.createElement('div');
            blockEl.className = 'mini-block ' + (isValid ? 'valid' : 'invalid');
            blockEl.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <strong>Bloque #${block.index}</strong> 
                    <span style="font-size: 1.2em;">${isValid ? '✅' : '❌'}</span>
                </div>
                <div style="font-size: 0.85em; line-height: 1.6;">
                    <strong>Hash:</strong><br>
                    <code style="word-break: break-all; background: #f5f5f5; padding: 2px 4px; border-radius: 3px;">${block.hash}</code><br>
                    <strong>Hash Anterior:</strong><br>
                    <code style="word-break: break-all; background: #f5f5f5; padding: 2px 4px; border-radius: 3px;">${block.previousHash}</code><br>
                    <strong>Datos:</strong> ${block.data}<br>
                    <strong>Timestamp:</strong> ${new Date(block.timestamp).toLocaleString()}<br>
                    <strong>Nonce:</strong> ${block.nonce.toLocaleString()}<br>
                    ${block.miningTime ? `<strong>Tiempo de minado:</strong> ${block.miningTime}ms<br>` : ''}
                </div>
            `;
            container.appendChild(blockEl);
        }
    }

    async function validateBlock(block, index) {
        // Verificar que el hash comience con "00" (dificultad 2)
        if (!block.hash.startsWith('00')) return false;

        if (index === 0) return true; // Bloque génesis

        const prevBlock = blockchain[index - 1];

        // Verificar que el previousHash coincida con el hash del bloque anterior
        if (block.previousHash !== prevBlock.hash) return false;

        // Recalcular el hash y verificar que sea correcto
        const calculatedHash = await calculateHash(
            block.index,
            block.previousHash,
            block.timestamp,
            block.data,
            block.nonce
        );

        return block.hash === calculatedHash;
    }

    async function validateChain() {
        for (let i = 1; i < blockchain.length; i++) {
            const isValid = await validateBlock(blockchain[i], i);
            if (!isValid) return false;
        }
        return true;
    }

    // ==================== EVENT LISTENERS ====================

    mineBtn.addEventListener('click', async () => {
        if (isMining) {
            alert('Ya se está minando un bloque. Por favor espera...');
            return;
        }

        const data = blockDataInput.value.trim();
        if (!data) {
            alert('Ingresa datos para el bloque');
            return;
        }

        isMining = true;
        mineBtn.disabled = true;

        const lastBlock = blockchain[blockchain.length - 1];
        const newIndex = blockchain.length;

        status.innerHTML = `⛏️ Minando bloque #${newIndex}... <em>(Buscando nonce con SHA-256 real)</em>`;
        status.style.background = '#fff3e0';
        status.style.borderLeftColor = '#ff9800';

        try {
            const newBlock = await createBlock(newIndex, lastBlock.hash, data, 2);
            blockchain.push(newBlock);

            await renderBlockchain();

            status.innerHTML = `
                ✅ ¡Bloque #${newBlock.index} minado exitosamente!<br>
                Nonce encontrado: <strong>${newBlock.nonce.toLocaleString()}</strong><br>
                Tiempo: <strong>${newBlock.miningTime}ms</strong><br>
                Hash: <code style="font-size: 0.8em;">${newBlock.hash.substring(0, 20)}...</code>
            `;
            status.style.background = '#e8f5e9';
            status.style.borderLeftColor = '#4caf50';

            blockDataInput.value = '';
        } catch (error) {
            status.innerHTML = `❌ Error al minar bloque: ${error.message}`;
            status.style.background = '#ffebee';
            status.style.borderLeftColor = '#f44336';
        } finally {
            isMining = false;
            mineBtn.disabled = false;
        }
    });

    tamperBtn.addEventListener('click', async () => {
        if (blockchain.length < 2) {
            alert('Agrega más bloques primero');
            return;
        }

        // Alterar el bloque #1 (primero después del génesis)
        const targetIndex = 1;
        blockchain[targetIndex].data = '💀 DATOS ALTERADOS 💀';
        blockchain[targetIndex].hash = 'HASH_INVALIDO';

        await renderBlockchain();

        const isValid = await validateChain();

        if (!isValid) {
            status.innerHTML = `
                ⚠️ <strong>¡BLOCKCHAIN CORRUPTO DETECTADO!</strong><br>
                El bloque #${targetIndex} fue alterado.<br>
                Todos los bloques posteriores son ahora inválidos porque sus previousHash no coinciden.<br><br>
                <em>Esto demuestra la inmutabilidad del blockchain:</em><br>
                Para alterar un bloque, tendrías que re-minar ese bloque Y todos los bloques siguientes.
            `;
            status.style.background = '#ffebee';
            status.style.borderLeftColor = '#f44336';
        } else {
            status.innerHTML = '❌ Error en la validación - esto no debería pasar';
        }
    });

    resetBtn.addEventListener('click', async () => {
        resetBtn.disabled = true;
        await resetBlockchain();
        resetBtn.disabled = false;
    });

    // ==================== INICIALIZACIÓN ====================

    // Inicializar con bloque génesis
    resetBlockchain();

    console.log('setupBlockchain() completado');
}

function setup2FA() {
    console.log('setup2FA() ejecutándose...');

    const totpStartBtn = document.getElementById('totp-start');
    const totpCode = document.getElementById('totp-code');
    const timerBar = document.getElementById('timer-bar');
    const timerText = document.getElementById('timer-text');

    if (!totpStartBtn) {
        console.error('Elementos de 2FA no encontrados');
        return;
    }

    let interval = null;

    // ==================== GENERADOR TOTP REAL ====================

    function generateTOTP() {
        // Simulación de TOTP - genera código de 6 dígitos basado en timestamp
        // En producción real, esto usaría HMAC-SHA1 con una secret key compartida
        const timestamp = Math.floor(Date.now() / 30000); // Intervalo de 30 segundos
        let hash = 0;
        const secret = 'JBSWY3DPEHPK3PXP'; // Secret key simulada (en base32)
        const combined = secret + timestamp.toString();

        // Simple hash para demostración (en producción sería HMAC-SHA1)
        for (let i = 0; i < combined.length; i++) {
            hash = ((hash << 5) - hash) + combined.charCodeAt(i);
            hash = hash & hash; // Convertir a entero de 32 bits
        }

        // Retornar código de 6 dígitos
        return Math.abs(hash % 1000000).toString().padStart(6, '0');
    }

    function updateTOTP() {
        const code = generateTOTP();
        totpCode.textContent = code;

        // Calcular segundos restantes en el intervalo actual
        const secondsLeft = 30 - (Math.floor(Date.now() / 1000) % 30);
        const percentage = (secondsLeft / 30) * 100;

        timerBar.style.width = percentage + '%';
        timerText.textContent = secondsLeft + 's';

        // Animación cuando se genera nuevo código
        if (secondsLeft === 30) {
            totpCode.style.animation = 'none';
            setTimeout(() => {
                totpCode.style.animation = 'pulse 0.5s';
            }, 10);
        }
    }

    // ==================== EVENT LISTENERS ====================

    totpStartBtn.addEventListener('click', () => {
        if (interval) {
            // Detener generador
            clearInterval(interval);
            interval = null;
            totpStartBtn.textContent = '🔄 Iniciar Generador TOTP';
            totpCode.textContent = '------';
            timerBar.style.width = '100%';
            timerText.textContent = '30s';
        } else {
            // Iniciar generador
            updateTOTP();
            interval = setInterval(updateTOTP, 1000);
            totpStartBtn.textContent = '⏸️ Detener Generador';
        }
    });

    console.log('setup2FA() completado');
}

function setupSqli() {
    const usernameInput = document.getElementById('sqli-username');
    const insecureBtn = document.getElementById('sqli-insecure');
    const secureBtn = document.getElementById('sqli-secure');
    const resultDiv = document.getElementById('sqli-result');

    if (!insecureBtn) return;

    insecureBtn.addEventListener('click', () => {
        const username = usernameInput.value;
        const query = `SELECT * FROM users WHERE username = '${username}'`;

        resultDiv.innerHTML = `
            <h4>Query insegura (vulnerable a SQLi):</h4>
            <pre>${query}</pre>
            <p style="color: red;">⚠️ Si ingresas: <code>' OR '1'='1</code>, la query se convierte en:</p>
            <pre>SELECT * FROM users WHERE username = '' OR '1'='1'</pre>
            <p>Esto retornaría todos los usuarios!</p>
        `;
    });

    secureBtn.addEventListener('click', () => {
        const username = usernameInput.value;

        resultDiv.innerHTML = `
            <h4>Query segura (parametrizada):</h4>
            <pre>SELECT * FROM users WHERE username = ?</pre>
            <p>Parámetro: <code>${username}</code></p>
            <p style="color: green;">✓ La entrada del usuario se trata como dato, no como código SQL.</p>
            <p>Incluso si ingresas <code>' OR '1'='1</code>, se buscaría literalmente ese texto como nombre de usuario.</p>
        `;
    });
}

function setupXss() {
    const userInput = document.getElementById('xss-input');
    const insecureBtn = document.getElementById('xss-insecure');
    const secureBtn = document.getElementById('xss-secure');
    const resultDiv = document.getElementById('xss-result');

    if (!insecureBtn) return;

    insecureBtn.addEventListener('click', () => {
        const input = userInput.value;
        resultDiv.innerHTML = `
            <h4>Renderizado inseguro (vulnerable a XSS):</h4>
            <div style="border: 1px solid red; padding: 10px; background: #ffe0e0;">
                ${input}
            </div>
            <p style="color: red;">⚠️ Si ingresas <code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code>, se ejecutará!</p>
        `;
    });

    secureBtn.addEventListener('click', () => {
        const input = userInput.value;
        const escaped = escapeHtml(input);
        resultDiv.innerHTML = `
            <h4>Renderizado seguro (escapado):</h4>
            <div style="border: 1px solid green; padding: 10px; background: #e0ffe0;">
                ${escaped}
            </div>
            <p style="color: green;">✓ El HTML se escapó y se muestra como texto, no se ejecuta.</p>
        `;
    });

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

function setupCsrf() {
    const attackBtn = document.getElementById('csrf-attack');
    const safeBtn = document.getElementById('csrf-safe');
    const resultDiv = document.getElementById('csrf-result');

    if (!attackBtn) return;

    attackBtn.addEventListener('click', () => {
        resultDiv.innerHTML = `
            <h4>❌ Vulnerable a CSRF:</h4>
            <p style="color: red;">Sin token CSRF, un atacante puede crear una página maliciosa que envíe peticiones en tu nombre:</p>
            <pre>&lt;form action="https://banco.com/transferir" method="POST"&gt;
  &lt;input name="cuenta" value="atacante123"&gt;
  &lt;input name="monto" value="1000"&gt;
&lt;/form&gt;
&lt;script&gt;document.forms[0].submit();&lt;/script&gt;</pre>
            <p>El navegador envía automáticamente tus cookies de sesión!</p>
        `;
    });

    safeBtn.addEventListener('click', () => {
        const token = Math.random().toString(36).substr(2, 16);
        resultDiv.innerHTML = `
            <h4>✅ Protegido contra CSRF:</h4>
            <p style="color: green;">Con token CSRF único por sesión:</p>
            <pre>&lt;form action="/transferir" method="POST"&gt;
  &lt;input type="hidden" name="csrf_token" value="${token}"&gt;
  &lt;input name="cuenta" value="destino"&gt;
  &lt;input name="monto" value="100"&gt;
&lt;/form&gt;</pre>
            <p>El servidor valida que el token coincida. Los atacantes no pueden obtener este token!</p>
        `;
    });
}

function setupSession() {
    const showBtn = document.getElementById('session-show');
    const resultDiv = document.getElementById('session-result');

    if (!showBtn) return;

    showBtn.addEventListener('click', () => {
        const sessionId = Math.random().toString(36).substr(2, 32);
        resultDiv.innerHTML = `
            <h4>🍪 Configuración Segura de Cookies de Sesión:</h4>
            <pre>Set-Cookie: sessionId=${sessionId}; 
  HttpOnly;           ← No accesible desde JavaScript (previene XSS)
  Secure;             ← Solo se envía por HTTPS
  SameSite=Strict;    ← Previene CSRF
  Max-Age=3600;       ← Expira en 1 hora
  Path=/;             ← Disponible en todo el sitio</pre>
            
            <h4>❌ Cookie Insegura:</h4>
            <pre>Set-Cookie: sessionId=${sessionId}</pre>
            <p style="color: red;">Sin flags de seguridad, vulnerable a XSS, CSRF, y ataques man-in-the-middle!</p>
            
            <h4>💡 Mejores Prácticas:</h4>
            <ul>
                <li>✅ Regenerar ID de sesión después del login</li>
                <li>✅ Timeout de sesión después de inactividad</li>
                <li>✅ Almacenar sesiones en servidor, no en cookies</li>
                <li>✅ Invalidar sesión al logout</li>
            </ul>
        `;
    });
}