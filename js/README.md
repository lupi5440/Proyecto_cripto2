# Estructura de JavaScript Modular

Este proyecto ha sido reorganizado en una estructura modular para facilitar el mantenimiento y la escalabilidad.

## 📁 Estructura de Carpetas

``` Carpetas
js/
├── core/               # Funcionalidad central del sitio
│   └── navigation.js   # Sistema de navegación y carga de páginas
│
├── criptografia/       # Módulos de criptografía
│   ├── cipher.js       # Cifrado César y AES-GCM
│   ├── encryption.js   # Ataques de fuerza bruta y diccionario
│   └── rsa.js          # Cifrado RSA asimétrico
│
├── seguridad-web/      # Vulnerabilidades y seguridad web
│   └── security.js     # MITM, XSS, SQLi, CSRF, Session
│
├── autenticacion/      # Autenticación y contraseñas
│   └── auth.js         # Password strength, 2FA
│
└── main.js             # Funciones adicionales (ECC, Hash, Blockchain)
```

## 🎯 Módulos Principales

### **core/navigation.js**

- Sistema de navegación entre páginas
- Carga dinámica de fragmentos HTML
- Gestión del menú hamburguesa
- Inicialización de funcionalidades específicas

### **criptografia/cipher.js**

- `setupCipher()`: Cifrado César y AES-GCM
- Web Crypto API para AES real
- Conversión Base64

### **criptografia/encryption.js**

- `setupEncryption()`: Demos de ataques
- Ataque de fuerza bruta a PINs
- Ataque de diccionario a contraseñas

### **criptografia/rsa.js**

- `setupRSA()`: Criptografía RSA
- Generación de claves públicas/privadas
- Cifrado/descifrado de mensajes

### **seguridad-web/security.js**

- `setupMitm()`: Man-in-the-middle
- `setupXss()`: Cross-site scripting
- `setupSqli()`: SQL Injection
- `setupCsrf()`: Cross-site request forgery
- `setupSession()`: Gestión de sesiones

### **autenticacion/auth.js**

- `setupPassword()`: Evaluación de contraseñas con zxcvbn
- `setup2FA()`: Autenticación de dos factores

### **main.js** (pendiente de modularizar)

- `setupECC()`: Curvas elípticas
- `setupHash()`: Funciones hash (SHA-256, SHA-512, etc.)
- `setupBlockchain()`: Blockchain con PoW

## 🔄 Flujo de Carga

1. **index.html** carga los módulos en orden:

   ```html
   <script src="js/core/navigation.js"></script>
   <script src="js/criptografia/cipher.js"></script>
   <script src="js/criptografia/encryption.js"></script>
   <script src="js/criptografia/rsa.js"></script>
   <script src="js/seguridad-web/security.js"></script>
   <script src="js/autenticacion/auth.js"></script>
   <script src="js/main.js" defer></script>
   ```

2. **navigation.js** se ejecuta primero:
   - Carga componentes (header, sidebar, footer)
   - Configura el sistema de menú
   - Navega a la página inicial

3. **Cuando se carga una página**, `showPage()` llama a la función `setup*()` correspondiente:

   ```javascript
   if (page === 'cipher') setupCipher();
   if (page === 'encryption') {
       setupEncryption();
       setupRSA();
   }
   ```

## 📝 Ventajas de esta Estructura

✅ **Modularidad**: Cada funcionalidad en su propio archivo
✅ **Mantenibilidad**: Fácil localizar y actualizar código
✅ **Escalabilidad**: Agregar nuevas páginas sin modificar todo
✅ **Organización**: Estructura clara por categorías
✅ **Performance**: Carga solo lo necesario
✅ **Debugging**: Errores más fáciles de rastrear

## ✅ Estado Actual

La modularización está **100% completa**:

- ✅ `setupECC()` extraído a `js/criptografia/ecc.js` (919 líneas)
- ✅ `setupHash()` extraído a `js/criptografia/hash.js` (256 líneas)
- ✅ `setupBlockchain()` extraído a `js/criptografia/blockchain.js` (242 líneas)
- ✅ `main.js` limpiado (solo 25 líneas de documentación)
- ✅ Sin código duplicado

## 📊 Estadísticas del Proyecto

| Carpeta | Archivos | Total Líneas |
|---------|----------|--------------|
| core/ | 1 | 181 |
| criptografia/ | 6 | 1,947 |
| seguridad-web/ | 1 | 223 |
| autenticacion/ | 1 | 75 |
| **Total** | **9** | **2,426** |

## 🚀 Próximos Pasos Opcionales

- [ ] Considerar usar módulos ES6 (import/export)
- [ ] Añadir lazy loading para módulos grandes
- [ ] Implementar service workers para offline
- [ ] Añadir tests unitarios para cada módulo
