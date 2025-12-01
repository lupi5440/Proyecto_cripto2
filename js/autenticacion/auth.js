// Funciones para autenticación (Password, 2FA)

// ===== PASSWORD STRENGTH =====
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

// ===== 2FA (TWO-FACTOR AUTHENTICATION) =====
function setup2FA() {
    const startBtn = document.getElementById('totp-start');
    const codeDisplay = document.getElementById('totp-code');
    const timerBar = document.getElementById('timer-bar');
    const timerText = document.getElementById('timer-text');

    if (!startBtn) return;

    let totpInterval = null;

    // Función simple para generar código TOTP simulado
    function generateTOTP() {
        // Generar código de 6 dígitos basado en timestamp
        const timestamp = Math.floor(Date.now() / 30000); // Intervalo de 30 segundos
        const code = ((timestamp * 123456789) % 1000000).toString().padStart(6, '0');
        return code;
    }

    // Función para actualizar el temporizador
    function updateTimer() {
        const now = Date.now();
        const timeInPeriod = Math.floor((now / 1000) % 30);
        const remaining = 30 - timeInPeriod;

        timerText.textContent = `${remaining}s`;
        const percentage = (remaining / 30) * 100;
        timerBar.style.width = `${percentage}%`;

        // Actualizar código
        const code = generateTOTP();
        codeDisplay.textContent = code;

        // Animación cuando se renueva el código
        if (remaining === 30) {
            codeDisplay.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                codeDisplay.style.animation = '';
            }, 500);
        }
    }

    startBtn.addEventListener('click', () => {
        if (totpInterval) {
            // Detener generador
            clearInterval(totpInterval);
            totpInterval = null;
            startBtn.textContent = 'Iniciar Generador TOTP';
            codeDisplay.textContent = '------';
            timerBar.style.width = '0%';
            timerText.textContent = '30s';
        } else {
            // Iniciar generador
            startBtn.textContent = 'Detener Generador TOTP';
            updateTimer(); // Primera actualización inmediata
            totpInterval = setInterval(updateTimer, 1000);
        }
    });
}
