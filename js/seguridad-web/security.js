// Funciones para seguridad web (MITM, XSS, SQLi, CSRF, Session)

// ===== MAN-IN-THE-MIDDLE =====
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

// ===== XSS =====
function setupXss() {
    const executeBtn = document.getElementById('xss-execute');
    const userInput = document.getElementById('xss-input');
    const insecureOutput = document.getElementById('xss-insecure-output');
    const secureOutput = document.getElementById('xss-secure-output');

    if (!executeBtn) return;

    executeBtn.addEventListener('click', () => {
        const input = userInput.value;

        // Inseguro: inyecta directamente HTML
        insecureOutput.innerHTML = input;

        // Seguro: escapa el HTML
        secureOutput.textContent = input;
    });
}

// ===== SQL INJECTION =====
function setupSqli() {
    const queryBtn = document.getElementById('sqli-query');
    const usernameInput = document.getElementById('sqli-username');
    const insecureResult = document.getElementById('sqli-insecure');
    const secureResult = document.getElementById('sqli-secure');

    if (!queryBtn) return;

    const fakeDatabase = [
        { id: 1, username: 'admin', password: 'admin123', role: 'administrator' },
        { id: 2, username: 'user1', password: 'pass123', role: 'user' },
        { id: 3, username: 'user2', password: 'mypass', role: 'user' }
    ];

    queryBtn.addEventListener('click', () => {
        const username = usernameInput.value;

        // Inseguro: concatenación directa
        const insecureQuery = `SELECT * FROM users WHERE username = '${username}'`;
        insecureResult.innerHTML = `
            <strong>Query ejecutada:</strong><br>
            <code>${insecureQuery}</code><br><br>
        `;

        if (username.includes("'") || username.toLowerCase().includes('or')) {
            insecureResult.innerHTML += `<strong style="color: #f44336;">🚨 ¡INYECCIÓN SQL EXITOSA!</strong><br>
                Todos los usuarios expuestos:<br>`;
            fakeDatabase.forEach(user => {
                insecureResult.innerHTML += `• ${user.username} (${user.role})<br>`;
            });
        } else {
            const user = fakeDatabase.find(u => u.username === username);
            if (user) {
                insecureResult.innerHTML += `Usuario encontrado: ${user.username}`;
            } else {
                insecureResult.innerHTML += 'Usuario no encontrado';
            }
        }

        // Seguro: consultas parametrizadas (simulado)
        secureResult.innerHTML = `
            <strong>Query segura:</strong><br>
            <code>SELECT * FROM users WHERE username = ?</code><br>
            <em>Parámetro: "${username}"</em><br><br>
        `;

        const user = fakeDatabase.find(u => u.username === username);
        if (user) {
            secureResult.innerHTML += `<strong style="color: #4caf50;">✅ Usuario encontrado:</strong> ${user.username}`;
        } else {
            secureResult.innerHTML += '❌ Usuario no encontrado (entrada tratada como texto literal)';
        }
    });
}

// ===== CSRF =====
function setupCsrf() {
    const sendBtn = document.getElementById('csrf-send');
    const amountInput = document.getElementById('csrf-amount');
    const tokenCheck = document.getElementById('csrf-token');
    const result = document.getElementById('csrf-result');

    if (!sendBtn) return;

    const validToken = 'a1b2c3d4e5f6';

    sendBtn.addEventListener('click', () => {
        const amount = amountInput.value;
        const hasToken = tokenCheck.checked;

        if (!amount) {
            alert('Ingresa un monto');
            return;
        }

        if (hasToken) {
            result.innerHTML = `
                <strong style="color: #4caf50;">✅ Transferencia exitosa</strong><br>
                Monto: $${amount}<br>
                Token CSRF verificado: ${validToken}<br>
                La solicitud proviene del sitio legítimo
            `;
        } else {
            result.innerHTML = `
                <strong style="color: #f44336;">🚨 ¡ATAQUE CSRF BLOQUEADO!</strong><br>
                Intento de transferir: $${amount}<br>
                ❌ Token CSRF faltante o inválido<br>
                La solicitud fue rechazada por seguridad
            `;
        }
    });
}

// ===== SESSION MANAGEMENT =====
function setupSession() {
    const loginBtn = document.getElementById('session-login');
    const usernameInput = document.getElementById('session-username');
    const secureCheck = document.getElementById('session-secure');
    const sessionInfo = document.getElementById('session-info');

    if (!loginBtn) return;

    loginBtn.addEventListener('click', () => {
        const username = usernameInput.value;
        const isSecure = secureCheck.checked;

        if (!username) {
            alert('Ingresa un nombre de usuario');
            return;
        }

        const sessionId = Math.random().toString(36).substring(7);

        sessionInfo.innerHTML = `
            <strong>Usuario:</strong> ${username}<br>
            <strong>Session ID:</strong> ${sessionId}<br>
            <strong>Seguridad:</strong> ${isSecure ? '✅ HttpOnly, Secure, SameSite' : '❌ Cookie insegura'}<br>
        `;

        if (!isSecure) {
            sessionInfo.innerHTML += `<br><strong style="color: #f44336;">⚠️ VULNERABILIDADES:</strong><br>
                • Session Hijacking posible<br>
                • Vulnerable a XSS<br>
                • Cookie accesible por JavaScript`;
        } else {
            sessionInfo.innerHTML += `<br><strong style="color: #4caf50;">✅ PROTECCIONES ACTIVAS:</strong><br>
                • HttpOnly: JavaScript no puede leer la cookie<br>
                • Secure: Solo HTTPS<br>
                • SameSite: Protección contra CSRF`;
        }
    });
}
