// Funcionalidad de Curvas Elípticas (ECC)

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
            const displayA = document.getElementById('display-a');
            const displayB = document.getElementById('display-b');
            if (displayA) displayA.textContent = a.toFixed(2);
            if (displayB) displayB.textContent = b.toFixed(2);

            // Limpiar curvas previas
            curvesGroup.innerHTML = '';

            // Verificar discriminante para singularidades
            const discriminant = 4 * (a * a * a) + 27 * (b * b);
            if (discriminant == 0) {
                if (infoDiv) {
                    infoDiv.innerHTML = `<p>⚠️ Esta curva tiene una singularidad porque el discriminante = 0 (4(${a})³ + 27(${b})² = 0). No es una curva elíptica válida.</p>`;
                    infoDiv.innerHTML += '<p><strong>¿En qué afecta esto a la criptografía de curva elíptica?</strong></p>';
                    infoDiv.innerHTML += '<ul><li>El problema del logaritmo discreto en ECC depende de sumar y multiplicar puntos en una curva elíptica.</li></ul>';
                    infoDiv.innerHTML += '<ul><li>Para obtener P + Q, la línea que conecta P y Q intersecta la curva en un tercer punto cuyo reflejo es P + Q.</li></ul>';
                    infoDiv.innerHTML += '<ul><li>Para obtener kP, la tangente de P intersecta con un segundo punto cuyo reflejo es 2P, luego la tangente de 2P intersecta con 4P, y así hasta encontrar kP.</li></ul>';
                    infoDiv.innerHTML += '<ul><li>Si la curva tiene una singularidad, estas operaciones pueden no estar bien definidas en todos los puntos, comprometiendo la seguridad.</li></ul>';
                }
                return;
            }

            // Dominio de dibujo adaptativo basado en los parámetros
            const xMin = -10;
            const xMax = 10;
            const steps = 1000;

            // Muestreo de x
            const xs = new Array(steps).fill(0).map((_, i) => xMin + (i / (steps - 1)) * (xMax - xMin));

            // Calcular valores y y determinar rangos
            let yMin = Infinity, yMax = -Infinity;

            const values = xs.map(x => {
                const v = x * x * x + a * x + b; // x^3 + a*x + b
                if (v >= 0) {
                    const y = Math.sqrt(v);
                    yMin = Math.min(yMin, -y);
                    yMax = Math.max(yMax, y);
                    return { x, yPos: y, yNeg: -y };
                }
                return { x, yPos: null, yNeg: null };
            });

            // Si no hay puntos válidos, usar rango por defecto
            if (yMin === Infinity || yMax === -Infinity) {
                yMin = -5;
                yMax = 5;
            }

            // Añadir margen visual (20% extra)
            const yRange = yMax - yMin;
            const yMargin = yRange * 0.2;
            yMin -= yMargin;
            yMax += yMargin;

            // Calcular escala adaptativa para que la curva ocupe bien el viewBox
            // ViewBox es 400x200 centrado en (0,0), así que va de -200 a 200 en X y -100 a 100 en Y
            const viewBoxWidth = 400;
            const viewBoxHeight = 200;

            const xRange = xMax - xMin;
            const xScale = viewBoxWidth / xRange * 0.9; // 0.9 para dejar margen
            const yScale = viewBoxHeight / (yMax - yMin) * 0.9;

            // Función para construir path SVG con mapeo centrado
            function buildPath(key, color, filter) {
                let d = '';
                let started = false;

                for (let i = 0; i < values.length; i++) {
                    const val = values[i][key];
                    if (val === null) {
                        started = false;
                        continue;
                    }

                    // Mapear a coordenadas SVG centradas
                    const xSvg = (values[i].x - (xMin + xMax) / 2) * xScale;
                    const ySvg = -(val - (yMin + yMax) / 2) * yScale;

                    if (!started) {
                        d += `M ${xSvg.toFixed(2)} ${ySvg.toFixed(2)} `;
                        started = true;
                    } else {
                        d += `L ${xSvg.toFixed(2)} ${ySvg.toFixed(2)} `;
                    }
                }

                if (d) {
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('d', d.trim());
                    path.setAttribute('stroke', color);
                    path.setAttribute('stroke-width', '2.5');
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

            // Dibujar las dos ramas de la curva
            buildPath('yPos', '#1687a7', 'url(#glow)');
            buildPath('yNeg', '#ff9800', 'url(#glow)');

            // Actualizar información con rangos
            if (infoDiv) {
                infoDiv.innerHTML = `
                    <p>✅ Curva elíptica graficada: <strong>y² = x³ + ${a.toFixed(2)}x + ${b.toFixed(2)}</strong></p>
                    <p style="font-size: 0.9em; margin-top: 5px;">
                        📊 Rango X: [${xMin.toFixed(1)}, ${xMax.toFixed(1)}] | 
                        Rango Y: [${yMin.toFixed(1)}, ${yMax.toFixed(1)}]
                    </p>
                `;
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


