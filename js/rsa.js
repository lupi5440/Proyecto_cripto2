let keys = {
    n: null,
    e: null,
    d: null
};

let encryptedMessage = []; // array de números cifrados

// maximo comun divisor usando el algoritmo de Euclides
function gcd(a, b) {
    while (b > 0n) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// algoritmo de Euclides Extendido para encontrar el inverso modular (d)
function modInverse(e, phi) {
    let m0 = phi;
    let y = 0n;
    let x = 1n;

    if (phi === 1n) return 0n;

    while (e > 1n) {
        // q es el cociente
        let q = e / phi;
        let t = phi;

        // phi es el resto ahora
        phi = e % phi;
        e = t;
        t = y;

        // actualizar y y x
        y = x - q * y;
        x = t;
    }

    // Asegurarse de que x sea positivo
    if (x < 0n) x += m0;

    return x;
}

// exponenciación modular rápida (base ^ exp) % mod
function modPow(base, exp, mod) {
    let res = 1n;
    base = base % mod;
    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2n;
    }
    return res;
}

function generarLlaves() {
    try {
        const p = BigInt(document.getElementById('bob-p').value);
        const q = BigInt(document.getElementById('bob-q').value);

        if (p === q) {
            alert("P y Q deben ser diferentes para mayor seguridad.");
            return;
        }

        const n = p * q; // n es el módulo para las llaves pública y privada
        const phi = (p - 1n) * (q - 1n);

        // se elige el exponente e (llave pública)
        let e = 3n;
        while (gcd(e, phi) !== 1n) {
            e += 2n;
        }

        const d = modInverse(e, phi); // d es la llave privada
        keys = { n, e, d };

        document.getElementById('displayN').innerText = n.toString();
        document.getElementById('displayPhi').innerText = phi.toString();
        document.getElementById('pubE').innerText = e.toString();
        document.getElementById('pubN').innerText = n.toString();
        document.getElementById('privD').innerText = d.toString();
        
        document.getElementById('keyResults').style.display = 'block';

    } catch (error) {
        alert("Por favor ingresa números válidos.");
        console.error(error);
    }
}

function cifrarMensaje() {
    if (!keys.n) {
        alert("¡Primero debes generar las llaves!");
        return;
    }

    const text = document.getElementById('msg-alice').value;
    encryptedMessage = [];
    let visualization = [];

    for (let i = 0; i < text.length; i++) {
        const charCode = BigInt(text.charCodeAt(i));
        const encryptedChar = modPow(charCode, keys.e, keys.n); 
        
        encryptedMessage.push(encryptedChar);
        
        visualization.push(`'${text[i]}'(${charCode}) → <strong>${encryptedChar}</strong>`);
    }

    document.getElementById('alice-msg-cifrado').innerHTML = visualization.join(' | ');
}

function descifrarMensaje() {
    if (encryptedMessage.length === 0) {
        alert("No hay mensaje cifrado para descifrar.");
        return;
    }

    let decryptedString = "";
    let visualization = [];

    for (let i = 0; i < encryptedMessage.length; i++) {
        const c = encryptedMessage[i];

        const decryptedCharInfo = modPow(c, keys.d, keys.n); // formula inversa: c^d mod n
        
        const char = String.fromCharCode(Number(decryptedCharInfo)); // convertir de vuelta a carácter
        
        decryptedString += char;
        visualization.push(`<strong>${c}</strong> → ${char}`);
    }

    document.getElementById('bob-msg-descifrado').innerHTML = 
        `<div>Proceso: ${visualization.join(' | ')}</div>` +
        `<div style="margin-top:10px; color:green; font-weight:bold;">Mensaje Final: "${decryptedString}"</div>`;
}

// Función para inicializar los listeners
function setupRSA() {
    console.log("Configurando botones RSA...");
    
    const genBtn = document.getElementById('bob-generate');
    const aliceBtn = document.getElementById('alice-cifrar');
    const descBtn = document.getElementById('bob-descifrar');

    if (genBtn) {
        genBtn.removeEventListener('click', generarLlaves);
        genBtn.addEventListener('click', generarLlaves);
    }
    if (aliceBtn) {
        aliceBtn.removeEventListener('click', cifrarMensaje);
        aliceBtn.addEventListener('click', cifrarMensaje);
    }
    if (descBtn) {
        descBtn.removeEventListener('click', descifrarMensaje);
        descBtn.addEventListener('click', descifrarMensaje);
    }
}

// Exponer funciones globales y la de configuración
if (typeof window !== 'undefined') {
    window.generarLlaves = generarLlaves;
    window.cifrarMensaje = cifrarMensaje;
    window.descifrarMensaje = descifrarMensaje;
    window.setupRSA = setupRSA;
}