// Funcionalidad para la página de cifrado básico

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
        shift = ((shift % 26) + 26) % 26;

        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const base = code >= 65 && code <= 90 ? 65 : 97;
                return String.fromCharCode(((code - base + shift) % 26) + base);
            }
            return char;
        }).join('');
    }

    // Cifrado AES-GCM real usando Web Crypto API
    async function encryptAES(plaintext, password) {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(plaintext);

            const passwordKey = await crypto.subtle.importKey(
                'raw',
                encoder.encode(password),
                'PBKDF2',
                false,
                ['deriveBits', 'deriveKey']
            );

            const salt = crypto.getRandomValues(new Uint8Array(16));

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

            const iv = crypto.getRandomValues(new Uint8Array(12));

            const ciphertext = await crypto.subtle.encrypt(
                {
                    name: 'AES-GCM',
                    iv: iv
                },
                aesKey,
                data
            );

            const combined = new Uint8Array(salt.length + iv.length + ciphertext.byteLength);
            combined.set(salt, 0);
            combined.set(iv, salt.length);
            combined.set(new Uint8Array(ciphertext), salt.length + iv.length);

            return arrayBufferToBase64(combined);
        } catch (error) {
            throw new Error('Error en cifrado AES: ' + error.message);
        }
    }

    // Descifrado AES-GCM real
    async function decryptAES(cipherBase64, password) {
        try {
            const combined = base64ToArrayBuffer(cipherBase64);

            const salt = combined.slice(0, 16);
            const iv = combined.slice(16, 28);
            const ciphertext = combined.slice(28);

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

            const decrypted = await crypto.subtle.decrypt(
                {
                    name: 'AES-GCM',
                    iv: iv
                },
                aesKey,
                ciphertext
            );

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
