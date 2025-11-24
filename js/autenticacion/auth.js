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
    const generateBtn = document.getElementById('2fa-generate');
    const verifyBtn = document.getElementById('2fa-verify');
    const codeInput = document.getElementById('2fa-code');
    const result = document.getElementById('2fa-result');

    if (!generateBtn) return;

    let generatedCode = null;

    generateBtn.addEventListener('click', () => {
        generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        result.innerHTML = `
            <strong>✅ Código 2FA generado:</strong><br>
            <span style="font-size: 2em; color: #1687a7; font-weight: bold;">${generatedCode}</span><br>
            <em>Válido por 30 segundos (simulado)</em>
        `;
    });

    verifyBtn.addEventListener('click', () => {
        const code = codeInput.value;

        if (!generatedCode) {
            alert('Primero genera un código');
            return;
        }

        if (code === generatedCode) {
            result.innerHTML = `
                <strong style="color: #4caf50;">✅ Código verificado correctamente</strong><br>
                Acceso concedido
            `;
        } else {
            result.innerHTML = `
                <strong style="color: #f44336;">❌ Código incorrecto</strong><br>
                Acceso denegado
            `;
        }
    });
}
