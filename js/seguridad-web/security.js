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
                li2.innerHTML = `<strong>Paquete #${i + 1}:</strong> <span class="encrypted">🔒 [Cifrado con Base64 - ilegible]</span><br>
                    <small style="color: #666; font-size: 0.85em;">💡 Nota: Cifrado usando Base64 (codificación simple para demostración). En producción se usa AES-256-GCM o similar.</small>`;
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
    const insecureBtn = document.getElementById('xss-insecure');
    const secureBtn = document.getElementById('xss-secure');
    const userInput = document.getElementById('xss-input');
    const result = document.getElementById('xss-result');

    if (!insecureBtn || !secureBtn) return;

    // Botón INSEGURO - usa innerHTML (permite ejecución de scripts)
    insecureBtn.addEventListener('click', () => {
        const input = userInput.value;

        if (!input) {
            alert('Por favor ingresa algún texto para probar');
            return;
        }

        result.innerHTML = `
            <div style="background: #ffebee; padding: 16px; border-radius: 6px; border-left: 4px solid #f44336;">
                <h4 style="margin-top: 0; color: #f44336;">❌ Salida INSEGURA (innerHTML)</h4>
                <p><strong>Entrada del usuario:</strong></p>
                <pre style="background: #fff; padding: 8px; border-radius: 4px; overflow-x: auto;">${input}</pre>
                
                <p><strong>⚠️ Código ejecutado:</strong></p>
                <div style="background: #fff; padding: 12px; border-radius: 4px; border: 2px solid #f44336;">
                    ${input}
                </div>
                
                <p style="margin-top: 12px; color: #d32f2f;">
                    <strong>🚨 VULNERABILIDAD:</strong> Si el usuario ingresó un script (ej. &lt;script&gt;alert('XSS')&lt;/script&gt;), 
                    se ejecutará en el navegador. Esto permite:
                </p>
                <ul style="color: #d32f2f; line-height: 1.8;">
                    <li>Robar cookies de sesión (document.cookie)</li>
                    <li>Secuestrar la sesión del usuario</li>
                    <li>Redirigir a sitios maliciosos</li>
                    <li>Modificar el contenido de la página</li>
                    <li>Capturar pulsaciones de teclado (keylogger)</li>
                </ul>
            </div>
        `;
    });

    // Botón SEGURO - usa textContent (no ejecuta scripts)
    secureBtn.addEventListener('click', () => {
        const input = userInput.value;

        if (!input) {
            alert('Por favor ingresa algún texto para probar');
            return;
        }

        // Crear elementos de forma segura
        const container = document.createElement('div');
        container.style.cssText = 'background: #e8f5e9; padding: 16px; border-radius: 6px; border-left: 4px solid #4caf50;';

        const title = document.createElement('h4');
        title.style.cssText = 'margin-top: 0; color: #4caf50;';
        title.textContent = '✅ Salida SEGURA (textContent)';

        const label1 = document.createElement('p');
        label1.innerHTML = '<strong>Entrada del usuario:</strong>';

        const pre1 = document.createElement('pre');
        pre1.style.cssText = 'background: #fff; padding: 8px; border-radius: 4px; overflow-x: auto;';
        pre1.textContent = input;

        const label2 = document.createElement('p');
        label2.innerHTML = '<strong>✅ Texto mostrado de forma segura:</strong>';

        const safeDiv = document.createElement('div');
        safeDiv.style.cssText = 'background: #fff; padding: 12px; border-radius: 4px; border: 2px solid #4caf50;';
        safeDiv.textContent = input; // textContent previene ejecución de scripts

        const explanation = document.createElement('p');
        explanation.style.cssText = 'margin-top: 12px; color: #2e7d32;';
        explanation.innerHTML = `
            <strong>🛡️ PROTECCIÓN ACTIVA:</strong> El texto se muestra como texto plano, sin ejecutar código. 
            Incluso si el usuario intenta inyectar &lt;script&gt;alert('XSS')&lt;/script&gt;, 
            se mostrará literalmente como texto y no se ejecutará.
        `;

        const defenses = document.createElement('ul');
        defenses.style.cssText = 'color: #2e7d32; line-height: 1.8;';
        defenses.innerHTML = `
            <li><strong>textContent:</strong> Trata todo como texto plano, no como HTML</li>
            <li><strong>Escapado automático:</strong> &lt; se convierte en &amp;lt; y &gt; en &amp;gt;</li>
            <li><strong>Sin ejecución:</strong> Scripts y eventos HTML son desactivados</li>
            <li><strong>Contenido visible:</strong> El usuario ve exactamente lo que escribió</li>
        `;

        // Ensamblar todo
        container.appendChild(title);
        container.appendChild(label1);
        container.appendChild(pre1);
        container.appendChild(label2);
        container.appendChild(safeDiv);
        container.appendChild(explanation);
        container.appendChild(defenses);

        result.innerHTML = '';
        result.appendChild(container);
    });
}

// ===== SQL INJECTION =====
function setupSqli() {
    const insecureBtn = document.getElementById('sqli-insecure');
    const secureBtn = document.getElementById('sqli-secure');
    const usernameInput = document.getElementById('sqli-username');
    const result = document.getElementById('sqli-result');

    if (!insecureBtn || !secureBtn) return;

    const fakeDatabase = [
        { id: 1, username: 'admin', password: 'admin123', role: 'administrator' },
        { id: 2, username: 'user1', password: 'pass123', role: 'user' },
        { id: 3, username: 'user2', password: 'mypass', role: 'user' }
    ];

    // Botón INSEGURO - concatenación directa
    insecureBtn.addEventListener('click', () => {
        const username = usernameInput.value;

        if (!username) {
            alert('Por favor ingresa un nombre de usuario');
            return;
        }

        // Simular concatenación directa (vulnerable)
        const insecureQuery = `SELECT * FROM users WHERE username = '${username}'`;

        result.innerHTML = `
            <div style="background: #ffebee; padding: 16px; border-radius: 6px; border-left: 4px solid #f44336;">
                <h4 style="margin-top: 0; color: #f44336;">❌ CONSULTA INSEGURA (Concatenación Directa)</h4>
                
                <p><strong>Entrada del usuario:</strong></p>
                <pre style="background: #fff; padding: 8px; border-radius: 4px; overflow-x: auto;">${username}</pre>
                
                <p><strong>Query SQL ejecutada:</strong></p>
                <pre style="background: #fff; padding: 8px; border-radius: 4px; overflow-x: auto; border-left: 3px solid #f44336;">${insecureQuery}</pre>
                
                <p><strong>📊 Resultado:</strong></p>
                <div style="background: #fff; padding: 12px; border-radius: 4px;">
        `;

        // Detectar inyección SQL
        if (username.includes("'") || username.toLowerCase().includes(' or ') || username.includes('--')) {
            result.innerHTML += `
                    <strong style="color: #f44336; font-size: 1.1em;">🚨 ¡INYECCIÓN SQL EXITOSA!</strong><br><br>
                    <p style="color: #d32f2f;">La condición WHERE se modificó. Ahora la consulta devuelve:</p>
                    <strong>TODOS LOS USUARIOS DE LA BASE DE DATOS:</strong><br><br>
            `;

            fakeDatabase.forEach(user => {
                result.innerHTML += `
                    <div style="background: #ffebee; padding: 8px; margin: 4px 0; border-radius: 4px;">
                        👤 <strong>${user.username}</strong> - ${user.role}<br>
                        🔑 Password: <code>${user.password}</code> (¡EXPUESTA!)
                    </div>
                `;
            });

            result.innerHTML += `
                    <br>
                    <p style="color: #d32f2f; font-weight: bold;">
                        ⚠️ El atacante ahora tiene acceso a:<br>
                        • Todas las cuentas de usuario<br>
                        • Contraseñas en texto plano<br>
                        • Roles y permisos<br>
                        • Puede modificar o eliminar datos<br>
                        • Puede escalar privilegios a administrador
                    </p>
            `;
        } else {
            const user = fakeDatabase.find(u => u.username === username);
            if (user) {
                result.innerHTML += `
                    <strong style="color: #2e7d32;">Usuario encontrado:</strong><br>
                    👤 ${user.username} (${user.role})
                `;
            } else {
                result.innerHTML += `
                    <strong style="color: #666;">❌ Usuario no encontrado</strong>
                `;
            }
        }

        result.innerHTML += `
                </div>
                
                <div style="margin-top: 16px; padding: 12px; background: #fff3e0; border-radius: 4px; border-left: 3px solid #ff9800;">
                    <strong>⚠️ ¿Por qué es vulnerable?</strong>
                    <ul style="margin: 8px 0; line-height: 1.8;">
                        <li>La entrada del usuario se concatena directamente en la consulta SQL</li>
                        <li>Caracteres especiales como <code>'</code> alteran la sintaxis SQL</li>
                        <li>El atacante puede modificar la lógica de la consulta</li>
                        <li><code>OR '1'='1'</code> hace que la condición siempre sea verdadera</li>
                        <li><code>--</code> comenta el resto de la consulta original</li>
                    </ul>
                </div>
            </div>
        `;
    });

    // Botón SEGURO - consultas parametrizadas
    secureBtn.addEventListener('click', () => {
        const username = usernameInput.value;

        if (!username) {
            alert('Por favor ingresa un nombre de usuario');
            return;
        }

        result.innerHTML = `
            <div style="background: #e8f5e9; padding: 16px; border-radius: 6px; border-left: 4px solid #4caf50;">
                <h4 style="margin-top: 0; color: #4caf50;">✅ CONSULTA SEGURA (Prepared Statement)</h4>
                
                <p><strong>Entrada del usuario:</strong></p>
                <pre style="background: #fff; padding: 8px; border-radius: 4px; overflow-x: auto;">${username}</pre>
                
                <p><strong>Query SQL parametrizada:</strong></p>
                <pre style="background: #fff; padding: 8px; border-radius: 4px; overflow-x: auto; border-left: 3px solid #4caf50;">SELECT * FROM users WHERE username = ?</pre>
                
                <p><strong>Parámetro tratado como dato:</strong></p>
                <pre style="background: #fff; padding: 8px; border-radius: 4px; overflow-x: auto;">Parámetro[0] = "${username}"</pre>
                
                <p><strong>📊 Resultado:</strong></p>
                <div style="background: #fff; padding: 12px; border-radius: 4px;">
        `;

        // Buscar usuario de forma segura (el input se trata como literal)
        const user = fakeDatabase.find(u => u.username === username);

        if (user) {
            result.innerHTML += `
                    <strong style="color: #2e7d32;">✅ Usuario encontrado:</strong><br>
                    👤 <strong>${user.username}</strong> - ${user.role}
            `;
        } else {
            result.innerHTML += `
                    <strong style="color: #666;">❌ Usuario no encontrado</strong><br><br>
                    <p style="color: #555;">
                        La entrada se trató como <strong>texto literal</strong>.<br>
                        Incluso si contiene <code>'</code> o <code>OR</code>, se busca exactamente ese texto.
                    </p>
            `;
        }

        result.innerHTML += `
                </div>
                
                <div style="margin-top: 16px; padding: 12px; background: #e3f2fd; border-radius: 4px; border-left: 3px solid #2196f3;">
                    <strong>🛡️ ¿Por qué es seguro?</strong>
                    <ul style="margin: 8px 0; line-height: 1.8;">
                        <li><strong>Separación de código y datos:</strong> La consulta SQL se define primero</li>
                        <li><strong>Parámetros tratados como datos:</strong> El <code>?</code> será reemplazado por el valor literal</li>
                        <li><strong>Sin interpretación SQL:</strong> Los caracteres especiales no modifican la consulta</li>
                        <li><strong>Escape automático:</strong> El motor de BD escapa los caracteres peligrosos</li>
                        <li><strong>Inyección imposible:</strong> <code>'</code>, <code>OR</code>, <code>--</code> se buscan literalmente</li>
                    </ul>
                </div>
                
                <div style="margin-top: 12px; padding: 12px; background: #fff; border-radius: 4px; border: 2px dashed #4caf50;">
                    <strong>💡 Ejemplo de código seguro:</strong>
                    <pre style="margin-top: 8px; font-size: 0.9em;">// Node.js con MySQL2
const query = 'SELECT * FROM users WHERE username = ?';
db.execute(query, [username], (err, results) => {
    // Los caracteres especiales son escapados automáticamente
});</pre>
                </div>
            </div>
        `;
    });
}

// ===== CSRF =====
function setupCsrf() {
    const attackBtn = document.getElementById('csrf-attack');
    const safeBtn = document.getElementById('csrf-safe');
    const result = document.getElementById('csrf-result');

    if (!attackBtn || !safeBtn) return;

    const validToken = 'csrf_a1b2c3d4e5f6g7h8';

    attackBtn.addEventListener('click', () => {
        result.innerHTML = `
            <div class="info-box" style="background: #ffebee; border-left-color: #f44336; margin-top: 16px;">
                <h4>🚨 Simulación de Ataque CSRF</h4>
                
                <p><strong>Escenario:</strong> Estás autenticado en tu banco (banco.com) con sesión activa.</p>
                
                <p><strong>📧 Paso 1:</strong> Recibes un email: "¡Felicidades! Has ganado un premio, haz clic aquí"</p>
                
                <p><strong>🌐 Paso 2:</strong> El enlace te lleva a sitio-malicioso.com que contiene:</p>
                <pre style="background: #fff; padding: 12px; border-radius: 4px; overflow-x: auto; font-size: 0.9em;">
&lt;!-- Página maliciosa --&gt;
&lt;form action="https://banco.com/transferir" method="POST"&gt;
    &lt;input type="hidden" name="destino" value="atacante123" /&gt;
    &lt;input type="hidden" name="monto" value="10000" /&gt;
&lt;/form&gt;
&lt;script&gt;
    document.forms[0].submit(); // Envío automático
&lt;/script&gt;
                </pre>

                <p><strong>⚠️ ¿Qué sucede?</strong></p>
                <ul style="line-height: 1.8;">
                    <li>✅ Tu navegador <strong>automáticamente envía tus cookies de sesión</strong> del banco</li>
                    <li>✅ El banco te reconoce como autenticado (sesión válida)</li>
                    <li>✅ La transferencia se ejecuta sin tu consentimiento</li>
                    <li>❌ <strong>Perdiste $10,000</strong> sin saberlo</li>
                </ul>

                <p><strong>💰 Resultado del ataque:</strong></p>
                <div style="background: #fff; padding: 12px; border-radius: 4px; border: 2px solid #f44336;">
                    <strong style="color: #f44336;">❌ TRANSFERENCIA EJECUTADA SIN CONSENTIMIENTO</strong><br>
                    <strong>Destino:</strong> Cuenta del atacante (atacante123)<br>
                    <strong>Monto:</strong> $10,000.00<br>
                    <strong>Estado:</strong> ✅ Aprobada (sesión válida detectada)<br>
                    <strong>Token CSRF:</strong> ❌ No requerido (sitio vulnerable)
                </div>

                <p><strong>🎯 ¿Por qué funciona?</strong></p>
                <ul style="line-height: 1.8;">
                    <li>El navegador envía cookies automáticamente a banco.com</li>
                    <li>El banco no valida de dónde proviene la solicitud</li>
                    <li>No hay token CSRF para verificar legitimidad</li>
                    <li>La víctima nunca vio ni aprobó la transferencia</li>
                </ul>
            </div>
        `;
    });

    safeBtn.addEventListener('click', () => {
        result.innerHTML = `
            <div class="info-box" style="background: #e8f5e9; border-left-color: #4caf50; margin-top: 16px;">
                <h4>✅ Protección contra CSRF con Token</h4>
                
                <p><strong>🔒 Mismo escenario, pero con protección CSRF:</strong></p>
                
                <p><strong>🌐 Sitio malicioso intenta el ataque:</strong></p>
                <pre style="background: #fff; padding: 12px; border-radius: 4px; overflow-x: auto; font-size: 0.9em;">
&lt;!-- Página maliciosa --&gt;
&lt;form action="https://banco.com/transferir" method="POST"&gt;
    &lt;input type="hidden" name="destino" value="atacante123" /&gt;
    &lt;input type="hidden" name="monto" value="10000" /&gt;
    &lt;!-- ⚠️ NO TIENE el token CSRF válido --&gt;
&lt;/form&gt;
&lt;script&gt;
    document.forms[0].submit();
&lt;/script&gt;
                </pre>

                <p><strong>🛡️ El servidor bancario verifica:</strong></p>
                <ol style="line-height: 1.8;">
                    <li>✅ Cookie de sesión válida (usuario autenticado)</li>
                    <li>❌ <strong>Token CSRF faltante o inválido</strong></li>
                    <li>🚫 <strong>Solicitud rechazada</strong></li>
                </ol>

                <div style="background: #fff; padding: 12px; border-radius: 4px; border: 2px solid #4caf50; margin: 16px 0;">
                    <strong style="color: #4caf50;">✅ ATAQUE CSRF BLOQUEADO</strong><br>
                    <strong>Intento de transferencia:</strong> $10,000.00<br>
                    <strong>Destino solicitado:</strong> atacante123<br>
                    <strong>Token CSRF:</strong> ❌ Faltante<br>
                    <strong>Estado:</strong> 🚫 <strong>RECHAZADA</strong><br>
                    <strong>Razón:</strong> Token CSRF inválido o ausente
                </div>

                <p><strong>🔐 Cómo funciona el token CSRF:</strong></p>
                <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; font-size: 0.9em;">
// 1. Al cargar el formulario legítimo:
&lt;form action="/transferir" method="POST"&gt;
    &lt;input type="hidden" name="csrf_token" value="${validToken}" /&gt;
    &lt;input name="destino" /&gt;
    &lt;input name="monto" /&gt;
    &lt;button&gt;Transferir&lt;/button&gt;
&lt;/form&gt;

// 2. En el servidor:
if (request.csrf_token === session.csrf_token) {
    // ✅ Token válido, procesar solicitud
} else {
    // ❌ Token inválido, rechazar solicitud
}
                </pre>

                <p><strong>✅ Métodos de protección CSRF:</strong></p>
                <ul style="line-height: 1.8;">
                    <li><strong>Token CSRF:</strong> Token único por sesión/formulario, imposible de adivinar</li>
                    <li><strong>SameSite Cookies:</strong> <code>Set-Cookie: session=...; SameSite=Strict</code>
                        <br>→ Cookies no se envían en peticiones cross-site</li>
                    <li><strong>Verificar Origin/Referer:</strong> Validar que petición viene del dominio correcto</li>
                    <li><strong>Re-autenticación:</strong> Solicitar contraseña para acciones críticas</li>
                    <li><strong>Doble Submit Cookie:</strong> Token en cookie + formulario, deben coincidir</li>
                </ul>

                <p><strong>💡 Buenas prácticas:</strong></p>
                <ul style="line-height: 1.8;">
                    <li>✅ Usar métodos POST/PUT/DELETE para acciones que modifiquen datos</li>
                    <li>✅ Nunca usar GET para operaciones que cambien estado</li>
                    <li>✅ Implementar tokens CSRF en todos los formularios</li>
                    <li>✅ Configurar cookies con <code>SameSite=Strict</code> o <code>Lax</code></li>
                    <li>✅ Validar Origin/Referer headers</li>
                    <li>✅ Requerir re-autenticación para operaciones sensibles</li>
                </ul>
            </div>
        `;
    });
}

// ===== SESSION MANAGEMENT =====
function setupSession() {
    const showBtn = document.getElementById('session-show');
    const result = document.getElementById('session-result');

    if (!showBtn) return;

    showBtn.addEventListener('click', () => {
        // Generar ID de sesión seguro simulado
        const sessionId = Array.from(crypto.getRandomValues(new Uint8Array(16)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        result.innerHTML = `
            <div class="info-box" style="background: #e8f5e9; border-left-color: #4caf50; margin-top: 16px;">
                <h4>✅ Configuración Segura de Sesión</h4>
                
                <p><strong>📋 Ejemplo de Session ID seguro:</strong></p>
                <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto;">
Session-ID: ${sessionId}
                </pre>
                
                <p><strong>🍪 Configuración de Cookie (Header HTTP):</strong></p>
                <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; font-size: 0.9em;">
Set-Cookie: sessionid=${sessionId}; 
    HttpOnly;           // ← JavaScript NO puede acceder
    Secure;             // ← Solo transmisión HTTPS
    SameSite=Strict;    // ← Protección contra CSRF
    Path=/;
    Max-Age=3600;       // ← Expira en 1 hora
    Domain=example.com
                </pre>

                <p><strong>🔒 ¿Qué hace cada bandera?</strong></p>
                <ul style="line-height: 1.8;">
                    <li><strong>HttpOnly:</strong> La cookie NO es accesible vía <code>document.cookie</code> en JavaScript
                        <br>→ Previene robo por XSS (Cross-Site Scripting)</li>
                    
                    <li><strong>Secure:</strong> La cookie SOLO se transmite por conexiones HTTPS
                        <br>→ Previene intercepción en redes inseguras (Man-in-the-Middle)</li>
                    
                    <li><strong>SameSite=Strict:</strong> La cookie NO se envía en solicitudes cross-site
                        <br>→ Previene CSRF (Cross-Site Request Forgery)</li>
                    
                    <li><strong>Max-Age:</strong> Tiempo de vida limitado de la sesión
                        <br>→ Reduce ventana de oportunidad para ataques</li>
                </ul>

                <p><strong>🛡️ Buenas prácticas adicionales:</strong></p>
                <ul style="line-height: 1.8;">
                    <li>✅ Regenerar Session ID después del login exitoso</li>
                    <li>✅ Invalidar sesión después de logout</li>
                    <li>✅ Usar IDs criptográficamente aleatorios (mínimo 128 bits)</li>
                    <li>✅ Implementar timeout de inactividad (ej. 30 minutos)</li>
                    <li>✅ Almacenar datos sensibles en servidor, no en cookie</li>
                    <li>✅ Detectar cambios sospechosos (IP, User-Agent)</li>
                    <li>✅ Limitar sesiones concurrentes por usuario</li>
                    <li>✅ Usar HTTPS en toda la aplicación (no solo login)</li>
                </ul>

                <p><strong>❌ Configuración INSEGURA (NO hacer):</strong></p>
                <pre style="background: #ffebee; padding: 12px; border-radius: 4px; overflow-x: auto; font-size: 0.9em; border-left: 4px solid #f44336;">
Set-Cookie: sessionid=${sessionId}
    // Sin HttpOnly → Vulnerable a XSS
    // Sin Secure → Transmisión por HTTP plano
    // Sin SameSite → Vulnerable a CSRF
                </pre>
            </div>
        `;
    });
}
