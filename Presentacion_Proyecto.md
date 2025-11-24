# Presentación del Proyecto - Criptografía 2

**Entrega: 4 de noviembre de 2025**

---

## 📋 PORTADA

**Título del Proyecto:**

# Demo Interactiva: Vulnerabilidades y Criptografía

**Institución:**
Instituto Politécnico Nacional
Escuela Superior de Cómputo (ESCOM)

**Materia:**
Criptografía 2

**Integrantes del Equipo:**

- [Nombre completo del integrante 1]
- [Nombre completo del integrante 2]
- [Nombre completo del integrante 3]
- [Nombre completo del integrante 4]

**Fecha de Entrega:**
4 de noviembre de 2025

---

## 📖 PLANTEAMIENTO DEL PROBLEMA

### Contexto

En la actualidad, existe una **brecha significativa** entre el conocimiento teórico de criptografía y seguridad informática y su aplicación práctica. Los estudiantes y profesionales enfrentan:

1. **Conceptos abstractos difíciles de visualizar**: Algoritmos de cifrado, funciones hash, y curvas elípticas son complejos de entender solo con teoría.

2. **Falta de experiencia práctica con vulnerabilidades**: Muchos aprenden sobre ataques como SQL Injection, XSS y CSRF sin verlos en acción.

3. **Desconocimiento de herramientas de privacidad**: Poca conciencia sobre cómo protegerse en el mundo digital moderno.

4. **Ausencia de plataformas educativas integradas**: No hay recursos que combinen historia de la criptografía, demostraciones interactivas y mejores prácticas de seguridad en un solo lugar.

### Problemática Específica

Los estudiantes necesitan:

- ✅ Entender cómo funcionan los ataques cibernéticos **en un entorno seguro**
- ✅ Visualizar algoritmos criptográficos **en tiempo real**
- ✅ Comparar técnicas inseguras vs. seguras **lado a lado**
- ✅ Conocer el contexto histórico de la criptografía
- ✅ Acceder a herramientas prácticas de privacidad digital

---

## 🎯 OBJETIVO

### ¿Qué queremos lograr?

Desarrollar una **plataforma educativa interactiva** que permita a estudiantes y profesionales:

### ¿Para qué?

1. **Aprender conceptos criptográficos mediante experimentación**
   - Cifrado César vs AES-GCM
   - Funciones hash reales (SHA-256, SHA-512)
   - Curvas elípticas (ECC) y firmas digitales (ECDSA)
   - Blockchain y prueba de trabajo (PoW)

2. **Entender vulnerabilidades web de forma práctica**
   - SQL Injection
   - Cross-Site Scripting (XSS)
   - Cross-Site Request Forgery (CSRF)
   - Man-in-the-Middle (MITM)

3. **Desarrollar conciencia de seguridad**
   - Evaluación de fortaleza de contraseñas
   - Autenticación de dos factores (2FA/TOTP)
   - Gestión segura de sesiones
   - Protección contra phishing e ingeniería social

4. **Conocer la historia y filosofía de la seguridad**
   - Eventos históricos (Enigma, Snowden, WikiLeaks)
   - Personajes clave (Alan Turing, Edward Snowden)
   - Importancia del software libre y código abierto

### ¿Cómo?

- Mediante **demostraciones interactivas** ejecutadas localmente en el navegador
- **Código lado a lado** (inseguro vs seguro) para comparación directa
- **Implementaciones reales** usando Web Crypto API (no simulaciones)
- **Interfaz amigable** con menú organizado por temas
- **Sin necesidad de servidor** - todo funciona en HTML/CSS/JavaScript estático

---

## 🏗️ ARQUITECTURA DE LA SOLUCIÓN

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    NAVEGADOR WEB                        │
│                    (Cliente único)                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │           index.html (Punto de entrada)          │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                              │
│           ┌──────────────┼──────────────┐              │
│           │              │              │              │
│  ┌────────▼──────┐ ┌────▼─────┐ ┌─────▼──────┐       │
│  │ components/   │ │  pages/  │ │   assets/  │       │
│  │ - header.html │ │ - home   │ │ - css/     │       │
│  │ - sidebar.html│ │ - cipher │ │ - js/      │       │
│  │ - footer.html │ │ - ecc    │ │            │       │
│  └───────────────┘ │ - hash   │ └────────────┘       │
│                     │ - sqli   │                       │
│                     │ - xss    │                       │
│                     │ - etc... │                       │
│                     └──────────┘                       │
│                                                         │
│  ┌──────────────────────────────────────────────────┐ │
│  │              main.js (Lógica central)            │ │
│  │                                                   │ │
│  │  • Navegación entre páginas                     │ │
│  │  • Carga dinámica de componentes                │ │
│  │  • Setup de demostraciones interactivas         │ │
│  │  • Implementación de algoritmos criptográficos  │ │
│  └──────────────────────────────────────────────────┘ │
│                          │                             │
│  ┌──────────────────────▼──────────────────────────┐ │
│  │         Web Crypto API (Navegador)              │ │
│  │                                                  │ │
│  │  • SHA-1, SHA-256, SHA-384, SHA-512            │ │
│  │  • AES-GCM (256-bit)                           │ │
│  │  • PBKDF2 (derivación de claves)               │ │
│  │  • Generación de números aleatorios            │ │
│  └─────────────────────────────────────────────────┘ │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Estructura de Archivos

```
proyecto/
│
├── index.html                  # Punto de entrada principal
├── README.md                   # Documentación del proyecto
│
├── css/
│   └── styles.css             # Estilos globales y responsivos
│
├── js/
│   └── main.js                # Lógica de navegación y demos
│
├── pages/
│   ├── components/            # Componentes reutilizables
│   │   ├── header.html        # Encabezado con menú hamburguesa
│   │   ├── sidebar.html       # Navegación lateral
│   │   └── footer.html        # Pie de página
│   │
│   ├── home.html              # Página de inicio
│   │
│   ├── [Criptografía]
│   │   ├── crypto-fundamentals.html  # Historia y fundamentos
│   │   ├── cipher.html               # César vs AES
│   │   ├── encryption.html           # Ataques a cifrado
│   │   ├── ecc.html                  # Curvas elípticas
│   │   ├── hash.html                 # Funciones hash
│   │   └── blockchain.html           # Blockchain y PoW
│   │
│   ├── [Vulnerabilidades Web]
│   │   ├── sqli.html                 # SQL Injection
│   │   ├── xss.html                  # Cross-Site Scripting
│   │   ├── csrf.html                 # CSRF
│   │   ├── mitm.html                 # Man-in-the-Middle
│   │   └── session.html              # Gestión de sesiones
│   │
│   ├── [Autenticación]
│   │   ├── password.html             # Evaluación de contraseñas
│   │   ├── 2fa.html                  # Autenticación 2FA
│   │   └── oauth.html                # OAuth y JWT
│   │
│   ├── [Seguridad de Redes]
│   │   ├── https.html                # HTTPS/TLS
│   │   └── vpn.html                  # VPN y túneles
│   │
│   ├── [Amenazas Sociales]
│   │   ├── phishing.html             # Phishing
│   │   └── social-eng.html           # Ingeniería social
│   │
│   └── [Recursos]
│       ├── crypto-events.html        # Eventos históricos
│       ├── crypto-heroes.html        # Personajes clave
│       ├── privacy-tools.html        # Herramientas de privacidad
│       ├── open-source.html          # Software libre
│       └── security-tips.html        # Mejores prácticas
│
└── [Bibliotecas Externas]
    └── zxcvbn.js (CDN)              # Evaluación de contraseñas
```

### Flujo de Navegación

```
Usuario abre index.html
    │
    ├─> Carga header, sidebar, footer (componentes)
    │
    ├─> Muestra página home por defecto
    │
    └─> Usuario navega mediante menú hamburguesa
        │
        ├─> Click en item del menú
        │   └─> showPage(nombrePagina)
        │       └─> Carga HTML de la página
        │           └─> Ejecuta setup de la demo (si aplica)
        │               └─> Renderiza interfaz interactiva
        │
        └─> Usuario interactúa con demos
            ├─> Cifra/descifra textos
            ├─> Genera hashes
            ├─> Firma mensajes con ECC
            ├─> Mina bloques de blockchain
            ├─> Prueba vulnerabilidades
            └─> Aprende con ejemplos visuales
```

---

## 💻 LENGUAJE DE PROGRAMACIÓN Y BIBLIOTECA CRIPTOGRÁFICA

### Lenguajes Utilizados

#### 1. **HTML5**

- **Versión:** HTML5 (estándar actual)
- **Uso:** Estructura semántica de todas las páginas
- **Características utilizadas:**
  - Elementos semánticos (`<section>`, `<article>`, `<nav>`)
  - Formularios y controles interactivos
  - Data attributes para navegación
  - Meta tags para responsive design

#### 2. **CSS3**

- **Versión:** CSS3
- **Uso:** Estilos visuales y diseño responsivo
- **Características utilizadas:**
  - CSS Grid y Flexbox para layouts
  - Media queries para diseño responsive
  - Animaciones y transiciones
  - Variables CSS para temas
  - Box model y positioning

#### 3. **JavaScript (ES6+)**

- **Versión:** ECMAScript 2015+ (ES6 y posteriores)
- **Uso:** Lógica de negocio, navegación y algoritmos criptográficos
- **Características utilizadas:**
  - `async/await` para operaciones asíncronas
  - Arrow functions
  - Template literals
  - Destructuring
  - Promises
  - Módulos y scope moderno
  - DOM manipulation
  - Event handling

### Bibliotecas Criptográficas

#### 1. **Web Crypto API** (Principal) ✅

- **Tipo:** API nativa del navegador
- **Versión:** W3C Recommendation
- **Propósito:** Implementaciones criptográficas **REALES** y seguras

**Algoritmos implementados:**

```javascript
// Funciones Hash
- SHA-1   (160 bits) - Deprecado, solo educativo
- SHA-256 (256 bits) - Seguro, uso en Bitcoin/HTTPS
- SHA-384 (384 bits) - Mayor seguridad
- SHA-512 (512 bits) - Máxima seguridad SHA-2

// Cifrado Simétrico
- AES-GCM (256 bits) - Advanced Encryption Standard
  * Modo GCM (Galois/Counter Mode)
  * Autenticación e integridad incorporadas
  * Salt e IV únicos por operación

// Derivación de Claves
- PBKDF2 (Password-Based Key Derivation Function 2)
  * 100,000 iteraciones
  * Protección contra ataques de diccionario
  * SHA-256 como función hash

// Generación de Aleatoriedad
- crypto.getRandomValues()
  * Números criptográficamente seguros
  * Para salts, IVs, nonces
```

**Ejemplo de uso real:**

```javascript
// Cifrado AES-GCM con PBKDF2
async function encryptAES(plaintext, password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plaintext);
    
    // Importar contraseña
    const passwordKey = await crypto.subtle.importKey(
        'raw',
        encoder.encode(password),
        'PBKDF2',
        false,
        ['deriveKey']
    );
    
    // Generar salt aleatorio
    const salt = crypto.getRandomValues(new Uint8Array(16));
    
    // Derivar clave AES desde contraseña
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
    
    // Generar IV aleatorio
    const iv = crypto.getRandomValues(new Uint8Array(12));
    
    // Cifrar
    const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        aesKey,
        data
    );
    
    return { salt, iv, ciphertext };
}
```

#### 2. **zxcvbn** (Biblioteca externa)

- **Versión:** 4.4.2
- **Desarrollador:** Dropbox
- **Propósito:** Evaluación realista de fortaleza de contraseñas
- **URL:** <https://github.com/dropbox/zxcvbn>

**Características:**

- Análisis de patrones comunes
- Detección de secuencias (123, abc)
- Diccionario de palabras comunes
- Estimación de tiempo de crackeo
- Sugerencias de mejora
- Score de 0-4

**Integración:**

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js"></script>
```

```javascript
const result = zxcvbn(password);
// result.score: 0 (muy débil) - 4 (muy fuerte)
// result.crack_times_display: tiempos estimados
// result.feedback: sugerencias
```

#### 3. **Implementaciones Propias**

**Curvas Elípticas (ECC):**

- Aritmética modular personalizada
- Suma de puntos en curva elíptica
- Multiplicación escalar
- ECDSA (firma digital)
- Generación de pares de claves

**Blockchain:**

- Función de hash SHA-256 (via Web Crypto)
- Proof of Work (PoW)
- Validación de cadena
- Minería con dificultad ajustable

**Cifrado César:**

- Implementación educativa clásica
- Soporte para ROT13
- Preservación de mayúsculas/minúsculas

### Justificación de Tecnologías

**¿Por qué Web Crypto API?**

- ✅ Implementaciones optimizadas y auditadas
- ✅ Seguridad garantizada por el navegador
- ✅ Alto rendimiento (implementación nativa)
- ✅ Sin dependencias externas
- ✅ Estándar W3C oficial
- ✅ Disponible en todos los navegadores modernos

**¿Por qué JavaScript/HTML/CSS puro?**

- ✅ Sin necesidad de servidor (portabilidad)
- ✅ Fácil de compartir y ejecutar
- ✅ Ideal para fines educativos
- ✅ Código visible y auditable
- ✅ Compatible con cualquier sistema operativo
- ✅ No requiere instalación

---

## 👥 DEFINICIÓN DE USUARIO Y CLIENTE

### 👤 USUARIO (Quien USA el sistema)

#### Usuario Principal: **Estudiante de Criptografía y Seguridad**

**Perfil demográfico:**

- 🎓 Estudiantes universitarios de 18-25 años
- 📚 Cursando carreras de:
  - Ingeniería en Sistemas Computacionales
  - Ciencias de la Computación
  - Seguridad Informática
  - Ciberseguridad

**Conocimientos previos:**

- Programación básica (al menos 1 lenguaje)
- Conceptos de redes (TCP/IP, HTTP)
- Matemáticas básicas (álgebra, módulo)
- Navegación web

**Objetivos del usuario:**

1. ✅ Aprender criptografía de forma **visual e interactiva**
2. ✅ Entender cómo funcionan los **ataques** antes de defender contra ellos
3. ✅ Prepararse para **exámenes de criptografía**
4. ✅ Desarrollar habilidades prácticas para **proyectos profesionales**
5. ✅ Conocer **herramientas de privacidad digital** para uso personal

**Necesidades del usuario:**

- 📱 Acceso desde cualquier dispositivo (PC, tablet, móvil)
- 🎮 Demostraciones interactivas (no solo teoría)
- 📖 Explicaciones claras en español
- 🔍 Código fuente visible para aprender
- ⚡ Respuesta inmediata (sin esperas)
- 🎯 Ejemplos del mundo real

**Casos de uso:**

1. **Estudio para examen:**
   - Entra a la sección "Funciones Hash"
   - Prueba SHA-256 con diferentes textos
   - Observa el efecto avalancha
   - Entiende la irreversibilidad

2. **Proyecto de clase:**
   - Navega a "Curvas Elípticas (ECC)"
   - Genera claves públicas/privadas
   - Firma un mensaje
   - Verifica la firma
   - Copia código para su proyecto

3. **Curiosidad personal:**
   - Explora "Blockchain"
   - Mina bloques con Proof of Work
   - Altera un bloque
   - Ve cómo se rompe la cadena

#### Usuario Secundario: **Profesionales en Desarrollo Web**

**Perfil:**

- 💼 Desarrolladores junior/semi-senior
- 🌐 Trabajan en desarrollo web/mobile
- 🔒 Necesitan aprender seguridad aplicada

**Objetivos:**

- Evitar vulnerabilidades comunes (OWASP Top 10)
- Implementar autenticación segura
- Entender HTTPS/TLS
- Proteger datos de usuarios

#### Usuario Terciario: **Instructores/Profesores**

**Perfil:**

- 👨‍🏫 Docentes de criptografía/seguridad
- 📚 Necesitan material didáctico

**Objetivos:**

- Demostrar conceptos en clase
- Asignar ejercicios prácticos
- Mostrar vulnerabilidades de forma segura

---

### 🏢 CLIENTE (Quien SOLICITA el sistema)

#### Cliente: **Institución Educativa (ESCOM - IPN)**

**Representante:**

- Profesor de la materia "Criptografía 2"
- Coordinación Académica de ESCOM

**Necesidades del cliente:**

1. **Educación de calidad:**
   - Herramienta para enseñar criptografía moderna
   - Complemento práctico a clases teóricas
   - Material para laboratorios

2. **Cobertura completa:**
   - Fundamentos históricos (Enigma, César)
   - Algoritmos clásicos (DES, RSA)
   - Tecnologías modernas (ECC, AES-GCM)
   - Blockchain y aplicaciones actuales

3. **Seguridad y ética:**
   - Demostraciones en entorno controlado
   - Sin riesgos para sistemas reales
   - Énfasis en uso ético del conocimiento

4. **Accesibilidad:**
   - Sin costo (código abierto)
   - Sin instalación compleja
   - Funciona sin conexión a internet
   - Compatible con equipos de cómputo del instituto

**Requisitos específicos del cliente:**

✅ **Funcionales:**

- Demos de al menos 10 conceptos criptográficos
- Código fuente visible y documentado
- Interfaz en español
- Ejemplos paso a paso

✅ **No funcionales:**

- Tiempo de respuesta < 1 segundo
- Compatible con navegadores modernos
- Diseño responsive (móvil/PC)
- Sin dependencias de servidor

✅ **Académicos:**

- Alineado con temario oficial
- Referencias bibliográficas
- Casos de estudio históricos
- Ejercicios sugeridos

**Criterios de éxito del cliente:**

1. 📊 Al menos 80% de estudiantes aprueban con la herramienta
2. 🎓 Mejora en comprensión de conceptos complejos
3. 💡 Aumento de interés en especialización en seguridad
4. 🔧 Estudiantes pueden implementar algoritmos por sí mismos
5. 🏆 Proyecto reutilizable para futuras generaciones

---

### 🔄 RELACIÓN USUARIO-CLIENTE

```
┌─────────────────────────────┐
│        CLIENTE              │
│   (Institución - ESCOM)     │
│                             │
│  • Solicita el proyecto     │
│  • Define requisitos        │
│  • Evalúa resultados        │
│  • Financia/apoya           │
└──────────────┬──────────────┘
               │
               │ Proporciona
               │ plataforma
               ▼
┌─────────────────────────────┐
│         USUARIO             │
│   (Estudiantes/Docentes)    │
│                             │
│  • Usa la plataforma        │
│  • Aprende conceptos        │
│  • Realiza prácticas        │
│  • Da retroalimentación     │
└─────────────────────────────┘
```

---

## 📡 REQUERIMIENTOS FUNCIONALES (RF)

### RF-001: Navegación entre Páginas

**Descripción:** El sistema debe permitir navegar entre diferentes secciones mediante menú hamburguesa.

**Criterios de aceptación:**

- Menú responsive (colapsa en móvil, siempre visible en desktop)
- Organizado por categorías (Criptografía, Vulnerabilidades, etc.)
- Transiciones suaves entre páginas
- Marcar página activa visualmente

**Prioridad:** 🔴 Alta

---

### RF-002: Demo de Cifrado César

**Descripción:** Implementar cifrado/descifrado César con desplazamiento configurable.

**Criterios de aceptación:**

- Entrada de texto y número de desplazamiento (1-25)
- Botones "Cifrar" y "Descifrar"
- Preservar mayúsculas/minúsculas
- Solo afectar letras (A-Z, a-z)
- Mostrar resultado inmediatamente

**Prioridad:** 🔴 Alta

---

### RF-003: Demo de Cifrado AES-GCM

**Descripción:** Implementar cifrado simétrico real usando Web Crypto API.

**Criterios de aceptación:**

- AES-256-GCM
- PBKDF2 con 100,000 iteraciones
- Salt e IV aleatorios por operación
- Entrada mínima de 8 caracteres para contraseña
- Detectar errores de descifrado (contraseña incorrecta)
- Salida en Base64

**Prioridad:** 🔴 Alta

---

### RF-004: Evaluación de Fortaleza de Contraseñas

**Descripción:** Usar zxcvbn para evaluar contraseñas en tiempo real.

**Criterios de aceptación:**

- Score de 0-4
- Tiempo estimado de crackeo
- Advertencias sobre patrones comunes
- Sugerencias de mejora
- Indicador visual de fortaleza (colores)

**Prioridad:** 🔴 Alta

---

### RF-005: Demostración de Funciones Hash

**Descripción:** Calcular hashes reales con múltiples algoritmos.

**Criterios de aceptación:**

- SHA-1, SHA-256, SHA-384, SHA-512 (reales)
- MD5 (simulado, marcado como inseguro)
- Mostrar longitud de cada hash
- Indicar seguridad de cada algoritmo
- Demostrar efecto avalancha

**Prioridad:** 🔴 Alta

---

### RF-006: Demo de Salt en Hashing

**Descripción:** Mostrar cómo el salt protege contraseñas idénticas.

**Criterios de aceptación:**

- Generar 3 usuarios con misma contraseña
- Salt aleatorio único por usuario
- Hashes completamente diferentes
- Comparación con hash sin salt
- Explicación de beneficios de seguridad

**Prioridad:** 🟡 Media

---

### RF-007: Curvas Elípticas (ECC)

**Descripción:** Implementar operaciones de curva elíptica y ECDSA.

**Criterios de aceptación:**

- Validación de parámetros de curva
- Generación de todos los puntos de la curva
- Suma de puntos en curva
- Multiplicación escalar
- Generación de claves ECDSA
- Firma digital de mensajes
- Verificación de firma
- Detección de mensajes adulterados

**Prioridad:** 🟡 Media

---

### RF-008: Blockchain con Proof of Work

**Descripción:** Simular minería de blockchain con SHA-256 real.

**Criterios de aceptación:**

- Bloque génesis automático
- Minería con dificultad configurable (2 ceros)
- Cálculo real de nonce
- Validación de cadena
- Demostración de inmutabilidad (alterar bloque)
- Mostrar tiempo de minado
- Indicadores visuales de validez (✅/❌)

**Prioridad:** 🟡 Media

---

### RF-009: Generador TOTP (2FA)

**Descripción:** Generar códigos de autenticación de dos factores.

**Criterios de aceptación:**

- Código de 6 dígitos
- Renovación cada 30 segundos
- Barra de progreso visual
- Inicio/pausa del generador

**Prioridad:** 🟡 Media

---

### RF-010: Demo SQL Injection

**Descripción:** Mostrar diferencia entre query vulnerable y parametrizada.

**Criterios de aceptación:**

- Input de usuario
- Construcción de query insegura (concatenación)
- Construcción de query segura (parámetros)
- Ejemplo de payload malicioso (`' OR '1'='1`)
- Explicación lado a lado

**Prioridad:** 🔴 Alta

---

### RF-011: Demo Cross-Site Scripting (XSS)

**Descripción:** Demostrar escape de HTML para prevenir XSS.

**Criterios de aceptación:**

- Renderizado inseguro (innerHTML)
- Renderizado seguro (textContent)
- Ejemplo de payload (`<script>alert('XSS')</script>`)
- Comparación visual

**Prioridad:** 🔴 Alta

---

### RF-012: Demo CSRF

**Descripción:** Explicar tokens CSRF con ejemplos.

**Criterios de aceptación:**

- Formulario sin token (vulnerable)
- Formulario con token CSRF
- Generación de token único
- Explicación de validación en servidor

**Prioridad:** 🟢 Baja

---

### RF-013: Demo Man-in-the-Middle (MITM)

**Descripción:** Simular intercepción de paquetes con/sin cifrado.

**Criterios de aceptación:**

- Envío de mensaje sin cifrar (visible)
- Envío de mensaje cifrado (ilegible)
- Log de red
- Vista del atacante
- Indicadores visuales de seguridad

**Prioridad:** 🔴 Alta

---

### RF-014: Gestión de Sesiones

**Descripción:** Mostrar configuración segura de cookies.

**Criterios de aceptación:**

- Ejemplo de cookie insegura
- Ejemplo de cookie segura (HttpOnly, Secure, SameSite)
- Explicación de cada flag
- Mejores prácticas

**Prioridad:** 🟢 Baja

---

### RF-015: Ataque de Fuerza Bruta

**Descripción:** Simular crackeo de PIN de 6 dígitos.

**Criterios de aceptación:**

- Input de PIN objetivo
- Iteración de todas las combinaciones
- Actualización de progreso en tiempo real
- Mostrar intentos, tiempo, velocidad
- Conclusión sobre seguridad de PINs

**Prioridad:** 🟡 Media

---

### RF-016: Ataque de Diccionario

**Descripción:** Probar contraseña contra diccionario de 100 contraseñas comunes.

**Criterios de aceptación:**

- Lista de passwords comunes
- Comparación secuencial
- Mostrar progreso
- Indicar si la contraseña es común o segura
- Historial de intentos

**Prioridad:** 🟡 Media

---

### RF-017: Información Histórica

**Descripción:** Mostrar eventos y personajes clave en criptografía.

**Criterios de aceptación:**

- Al menos 10 eventos históricos
- Al menos 10 personajes relevantes
- Contexto y fechas
- Impacto en seguridad moderna

**Prioridad:** 🟢 Baja

---

### RF-018: Herramientas de Privacidad

**Descripción:** Listar y explicar herramientas open-source de privacidad.

**Criterios de aceptación:**

- Al menos 10 herramientas
- Descripción de uso
- Enlaces a proyectos oficiales
- Categorización (mensajería, VPN, etc.)

**Prioridad:** 🟢 Baja

---

### RF-019: Diseño Responsive

**Descripción:** Interfaz adaptable a diferentes tamaños de pantalla.

**Criterios de aceptación:**

- Móvil (< 768px): menú hamburguesa
- Tablet (768px - 1024px): layout ajustado
- Desktop (> 1024px): menú lateral fijo
- Texto legible en todos los tamaños
- Botones táctiles en móvil

**Prioridad:** 🔴 Alta

---

### RF-020: Carga Dinámica de Componentes

**Descripción:** Cargar header, sidebar, footer dinámicamente.

**Criterios de aceptación:**

- Fetch de archivos HTML
- Inserción en contenedores específicos
- Manejo de errores (404)
- Carga en paralelo con Promise.all

**Prioridad:** 🔴 Alta

---

## 🔧 REQUERIMIENTOS NO FUNCIONALES (RNF)

### RNF-001: Rendimiento

**Métrica:** Tiempo de respuesta

- Carga inicial: < 2 segundos
- Cambio de página: < 500ms
- Cálculo de hash: < 100ms
- Cifrado AES: < 500ms

**Prioridad:** 🔴 Alta

---

### RNF-002: Compatibilidad

**Navegadores soportados:**

- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

**Prioridad:** 🔴 Alta

---

### RNF-003: Portabilidad

**Requisitos:**

- Sin servidor backend
- Sin base de datos
- Funciona desde `file://` o `http://localhost`
- Tamaño total < 5 MB

**Prioridad:** 🔴 Alta

---

### RNF-004: Seguridad

**Implementación:**

- Código ejecutado solo en cliente
- Sin almacenamiento de datos sensibles
- Advertencias sobre uso educativo
- Uso de APIs criptográficas oficiales

**Prioridad:** 🔴 Alta

---

### RNF-005: Usabilidad

**Criterios:**

- Interfaz en español
- Mensajes de error claros
- Tooltips explicativos
- Ejemplos pre-cargados

**Prioridad:** 🟡 Media

---

### RNF-006: Mantenibilidad

**Código:**

- Comentarios en español
- Funciones modulares
- Nombres descriptivos
- Separación de responsabilidades

**Prioridad:** 🟡 Media

---

### RNF-007: Escalabilidad

**Diseño:**

- Fácil agregar nuevas páginas
- Sistema de navegación genérico
- Estructura de carpetas clara

**Prioridad:** 🟢 Baja

---

### RNF-008: Accesibilidad

**Estándares:**

- Contraste de colores suficiente
- Texto legible (min 14px)
- Navegación por teclado
- Alt text en imágenes

**Prioridad:** 🟢 Baja

---

### RNF-009: Documentación

**Requerimientos:**

- README.md completo
- Comentarios en código
- Guía de uso
- Referencias bibliográficas

**Prioridad:** 🟡 Media

---

### RNF-010: Licencia

**Legal:**

- Código abierto
- Sin restricciones de uso educativo
- Atribución a bibliotecas usadas

**Prioridad:** 🟢 Baja

---

## 📚 BIBLIOGRAFÍA

### Libros de Texto

1. **Stallings, William** (2017). _Cryptography and Network Security: Principles and Practice_ (7th ed.). Pearson.
   - ISBN: 978-0134444284
   - Capítulos 2-5: Criptografía clásica y moderna

2. **Ferguson, Niels; Schneier, Bruce; Kohno, Tadayoshi** (2010). _Cryptography Engineering: Design Principles and Practical Applications_. Wiley.
   - ISBN: 978-0470474242
   - Capítulo 4: Hash functions
   - Capítulo 8: AES

3. **Paar, Christof; Pelzl, Jan** (2010). _Understanding Cryptography: A Textbook for Students and Practitioners_. Springer.
   - ISBN: 978-3642041006
   - Capítulo 9: Elliptic Curve Cryptography

4. **Katz, Jonathan; Lindell, Yehuda** (2020). _Introduction to Modern Cryptography_ (3rd ed.). CRC Press.
   - ISBN: 978-0815354369
   - Teoría formal de seguridad

### Estándares y Especificaciones

5. **NIST** (2001). _Advanced Encryption Standard (AES)_. FIPS PUB 197.
   - <https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf>

6. **NIST** (2015). _Secure Hash Standard (SHS)_. FIPS PUB 180-4.
   - <https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf>

7. **IETF** (2017). _PKCS #5: Password-Based Cryptography Specification_. RFC 8018.
   - <https://tools.ietf.org/html/rfc8018>

8. **W3C** (2017). _Web Cryptography API_. W3C Recommendation.
   - <https://www.w3.org/TR/WebCryptoAPI/>

### Seguridad Web

9. **OWASP Foundation** (2021). _OWASP Top Ten 2021_.
   - <https://owasp.org/Top10/>
   - SQL Injection (A03)
   - XSS (A03)
   - CSRF (A01)

10. **Stuttard, Dafydd; Pinto, Marcus** (2011). _The Web Application Hacker's Handbook_ (2nd ed.). Wiley.
    - ISBN: 978-1118026472

### Blockchain

11. **Narayanan, Arvind; Bonneau, Joseph; Felten, Edward; Miller, Andrew; Goldfeder, Steven** (2016). _Bitcoin and Cryptocurrency Technologies_. Princeton University Press.
    - ISBN: 978-0691171692

12. **Nakamoto, Satoshi** (2008). _Bitcoin: A Peer-to-Peer Electronic Cash System_.
    - <https://bitcoin.org/bitcoin.pdf>

### Recursos en Línea

13. **Mozilla Developer Network (MDN)** (2024). _Web Crypto API Documentation_.
    - <https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API>

14. **Dropbox** (2024). _zxcvbn: Low-Budget Password Strength Estimation_.
    - <https://github.com/dropbox/zxcvbn>
    - Paper: <https://www.usenix.org/conference/usenixsecurity16/technical-sessions/presentation/wheeler>

15. **Andrea Corbellini** (2015). _Elliptic Curve Cryptography: A Gentle Introduction_.
    - <https://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/>

16. **Khan Academy** (2024). _Cryptography Course_.
    - <https://www.khanacademy.org/computing/computer-science/cryptography>

### Historia de la Criptografía

17. **Singh, Simon** (1999). _The Code Book: The Science of Secrecy from Ancient Egypt to Quantum Cryptography_. Anchor.
    - ISBN: 978-0385495325

18. **Kahn, David** (1996). _The Codebreakers: The Comprehensive History of Secret Communication from Ancient Times to the Internet_. Scribner.
    - ISBN: 978-0684831309

### Privacidad y Ética

19. **Schneier, Bruce** (2015). _Data and Goliath: The Hidden Battles to Collect Your Data and Control Your World_. W. W. Norton & Company.
    - ISBN: 978-0393352177

20. **Greenwald, Glenn** (2014). _No Place to Hide: Edward Snowden, the NSA, and the U.S. Surveillance State_. Metropolitan Books.
    - ISBN: 978-1250062581

### Herramientas y Software

21. **OpenSSL Project** (2024). _OpenSSL Documentation_.
    - <https://www.openssl.org/docs/>

22. **Signal Foundation** (2024). _Signal Protocol Specifications_.
    - <https://signal.org/docs/>

23. **Tor Project** (2024). _Tor: Anonymity Online_.
    - <https://www.torproject.org/>

### Cursos y Tutoriales

24. **Coursera - Stanford University** (2024). _Cryptography I_.
    - Instructor: Dan Boneh
    - <https://www.coursera.org/learn/crypto>

25. **MIT OpenCourseWare** (2023). _6.857: Network and Computer Security_.
    - <https://ocw.mit.edu/courses/6-857-network-and-computer-security-spring-2014/>

### Artículos Científicos

26. **Rivest, Ronald; Shamir, Adi; Adleman, Leonard** (1978). "A Method for Obtaining Digital Signatures and Public-Key Cryptosystems". _Communications of the ACM_, 21(2), 120-126.

27. **Koblitz, Neal** (1987). "Elliptic Curve Cryptosystems". _Mathematics of Computation_, 48(177), 203-209.

28. **Miller, Victor** (1986). "Use of Elliptic Curves in Cryptography". _CRYPTO '85 Proceedings_, 417-426.

### Estándares de la Industria

29. **PCI Security Standards Council** (2022). _Payment Card Industry Data Security Standard (PCI DSS) v4.0_.
    - <https://www.pcisecuritystandards.org/>

30. **ISO/IEC** (2018). _ISO/IEC 27001:2013 - Information Security Management_.

---

## 🎯 NOTAS FINALES

### Alcance del Proyecto

Este proyecto es una **plataforma educativa interactiva** que cubre:

- ✅ 24 páginas temáticas diferentes
- ✅ 15+ demos interactivas funcionales
- ✅ Implementaciones criptográficas reales
- ✅ Vulnerabilidades OWASP Top 10
- ✅ Historia y filosofía de la criptografía

### Uso Ético

⚠️ **ADVERTENCIA:** Este proyecto es solo para fines educativos. Las técnicas de hacking mostradas deben usarse exclusivamente en entornos controlados con autorización explícita. El uso indebido es ilegal y éticamente incorrecto.

### Contribuciones Futuras

Posibles mejoras:

- Agregar más algoritmos (RSA, DH, DSA)
- Implementar criptografía post-cuántica
- Tests automatizados con Jest
- Modo oscuro
- Internacionalización (inglés)
- Progressive Web App (PWA)

### Contacto y Soporte

Para preguntas, sugerencias o reportes de bugs:

- GitHub Issues: [crear repositorio]
- Email del equipo: [agregar email]
- Documentación: Ver README.md

---

**Fin de la Presentación**

---

_Proyecto desarrollado para la materia de Criptografía 2_  
_Escuela Superior de Cómputo (ESCOM) - Instituto Politécnico Nacional (IPN)_  
_Fecha: 4 de noviembre de 2025_
