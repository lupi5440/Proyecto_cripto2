// Blockchain con Proof of Work

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

