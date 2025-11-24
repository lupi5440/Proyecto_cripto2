// Sistema de navegación y carga de páginas

// Utilidad para cargar HTML externo en un contenedor
async function loadFragment(url, containerId) {
    const res = await fetch(url);
    const html = await res.text();
    document.getElementById(containerId).innerHTML = html;
}

// Mapeo de páginas
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

// Navegación de páginas con inicialización de funcionalidad
function showPage(page) {
    const url = pageMap[page] || pageMap.home;
    console.log('Cargando página:', page, 'desde', url);
    loadFragment(url, 'page-container').then(() => {
        console.log('Página cargada:', page);

        // Inicializar funcionalidad específica de cada página
        if (page === 'mitm' && typeof setupMitm === 'function') setupMitm();
        if (page === 'password' && typeof setupPassword === 'function') setupPassword();
        if (page === 'cipher' && typeof setupCipher === 'function') setupCipher();
        if (page === 'encryption') {
            if (typeof setupEncryption === 'function') setupEncryption();
            if (typeof setupRSA === 'function') setupRSA();
        }
        if (page === 'ecc' && typeof setupECC === 'function') setupECC();
        if (page === 'hash' && typeof setupHash === 'function') setupHash();
        if (page === 'blockchain' && typeof setupBlockchain === 'function') setupBlockchain();
        if (page === '2fa' && typeof setup2FA === 'function') setup2FA();
        if (page === 'sqli' && typeof setupSqli === 'function') setupSqli();
        if (page === 'xss' && typeof setupXss === 'function') setupXss();
        if (page === 'csrf' && typeof setupCsrf === 'function') setupCsrf();
        if (page === 'session' && typeof setupSession === 'function') setupSession();
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
            document.body.style.overflow = 'hidden';
            console.log('Menu opened');
        }
    }

    function closeMenu() {
        if (menu && overlay) {
            menu.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
            console.log('Menu closed');
        }
    }
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
