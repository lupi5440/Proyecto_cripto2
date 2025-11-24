# 📊 RESUMEN EJECUTIVO - PRESENTACIÓN POWERPOINT

## Diapositiva 1: PORTADA

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    DEMO INTERACTIVA:
    VULNERABILIDADES Y CRIPTOGRAFÍA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Instituto Politécnico Nacional
Escuela Superior de Cómputo (ESCOM)
Criptografía 2

Integrantes:
• [Nombre completo 1]
• [Nombre completo 2]
• [Nombre completo 3]
• [Nombre completo 4]

Fecha: 4 de noviembre de 2025
```

---

## Diapositiva 2: PLANTEAMIENTO DEL PROBLEMA

### 🎯 Problema Principal

**Brecha entre teoría y práctica en criptografía**

### Problemas Identificados

1. 📚 Conceptos abstractos difíciles de visualizar
2. 🔒 Falta de experiencia con vulnerabilidades reales
3. 🛡️ Desconocimiento de herramientas de privacidad
4. 🌐 No hay plataformas educativas integradas

### Consecuencias

- Estudiantes aprenden teoría sin aplicación práctica
- Vulnerabilidades comunes en proyectos reales
- Poca conciencia de seguridad digital

---

## Diapositiva 3: OBJETIVO

### ¿QUÉ?

Plataforma educativa interactiva de criptografía y seguridad

### ¿PARA QUÉ?

- ✅ Aprender criptografía mediante experimentación
- ✅ Entender vulnerabilidades en entorno seguro
- ✅ Desarrollar conciencia de seguridad
- ✅ Conocer historia y filosofía de la criptografía

### ¿CÓMO?

- Demos interactivas en navegador
- Código visible (inseguro vs seguro)
- Implementaciones reales (Web Crypto API)
- Sin necesidad de servidor

---

## Diapositiva 4: ARQUITECTURA

```
         NAVEGADOR WEB
              |
    ┌─────────┴─────────┐
    |                   |
INDEX.HTML         MAIN.JS
    |                   |
    ├─ Components/      ├─ Navegación
    ├─ Pages/           ├─ Demos
    └─ Assets/          └─ Algoritmos
              |
        WEB CRYPTO API
    (SHA-256, AES-GCM, PBKDF2)
```

### Estructura

- 📄 24 páginas temáticas
- 🧩 Componentes reutilizables
- 🎮 15+ demos interactivas
- 📱 Diseño responsive

---

## Diapositiva 5: LENGUAJES Y BIBLIOTECAS

### Lenguajes

| Lenguaje | Uso | Versión |
|----------|-----|---------|
| **HTML5** | Estructura | Estándar actual |
| **CSS3** | Estilos + Responsive | CSS3 |
| **JavaScript** | Lógica + Algoritmos | ES6+ |

### Bibliotecas Criptográficas

#### 🔐 Web Crypto API (Principal)

```
✅ SHA-1, SHA-256, SHA-384, SHA-512
✅ AES-GCM (256-bit)
✅ PBKDF2 (100,000 iteraciones)
✅ Números aleatorios seguros
```

#### 🔑 zxcvbn (Dropbox)

- Evaluación de contraseñas
- Score 0-4
- Estimación de tiempo de crackeo

---

## Diapositiva 6: USUARIO Y CLIENTE

### 👤 USUARIO

**Estudiante de Criptografía (18-25 años)**

Necesita:

- Aprender de forma visual e interactiva
- Entender ataques antes de defender
- Prepararse para exámenes
- Código fuente para aprender

### 🏢 CLIENTE

**ESCOM - Instituto Politécnico Nacional**

Necesita:

- Herramienta para enseñar criptografía moderna
- Material para laboratorios
- Entorno seguro de aprendizaje
- Código abierto y sin costo

---

## Diapositiva 7: RF - CRIPTOGRAFÍA

### Requerimientos Funcionales (Alta Prioridad)

| ID | Funcionalidad | Descripción |
|----|---------------|-------------|
| **RF-002** | Cifrado César | Desplazamiento 1-25, preserva mayúsculas |
| **RF-003** | AES-GCM | Cifrado real 256-bit con PBKDF2 |
| **RF-004** | Contraseñas | Evaluación con zxcvbn (score 0-4) |
| **RF-005** | Funciones Hash | SHA-1, SHA-256, SHA-384, SHA-512 |
| **RF-007** | ECC | Curvas elípticas y firmas ECDSA |
| **RF-008** | Blockchain | Minería con Proof of Work real |

---

## Diapositiva 8: RF - VULNERABILIDADES

### Requerimientos Funcionales (Alta Prioridad)

| ID | Funcionalidad | Descripción |
|----|---------------|-------------|
| **RF-010** | SQL Injection | Query vulnerable vs parametrizada |
| **RF-011** | XSS | Renderizado inseguro vs escapado |
| **RF-013** | MITM | Intercepción con/sin cifrado |
| **RF-015** | Fuerza Bruta | Crackeo de PIN 6 dígitos |
| **RF-016** | Diccionario | 100 contraseñas más comunes |

---

## Diapositiva 9: RNF - NO FUNCIONALES

### Requerimientos Críticos

| Categoría | Requisito | Meta |
|-----------|-----------|------|
| ⚡ **Rendimiento** | Tiempo respuesta | < 500ms |
| 🌐 **Compatibilidad** | Navegadores | Chrome, Firefox, Edge, Safari |
| 📦 **Portabilidad** | Sin servidor | Funciona desde file:// |
| 🔒 **Seguridad** | Solo cliente | Sin riesgos reales |
| 🌍 **Idioma** | Interfaz | Español completo |
| 📱 **Responsive** | Dispositivos | PC, tablet, móvil |

---

## Diapositiva 10: BIBLIOGRAFÍA (1/2)

### Libros de Texto

1. **Stallings, W.** (2017). _Cryptography and Network Security_ (7th ed.)
2. **Ferguson, N. & Schneier, B.** (2010). _Cryptography Engineering_
3. **Paar, C. & Pelzl, J.** (2010). _Understanding Cryptography_

### Estándares

4. **NIST FIPS 197** - Advanced Encryption Standard (AES)
5. **NIST FIPS 180-4** - Secure Hash Standard (SHS)
6. **W3C** - Web Cryptography API Recommendation

---

## Diapositiva 11: BIBLIOGRAFÍA (2/2)

### Seguridad Web

7. **OWASP Top 10 (2021)** - Vulnerabilidades críticas
8. **Stuttard & Pinto** (2011). _Web Application Hacker's Handbook_

### Blockchain

9. **Narayanan et al.** (2016). _Bitcoin and Cryptocurrency Technologies_
10. **Nakamoto, S.** (2008). _Bitcoin: A Peer-to-Peer Electronic Cash System_

### Recursos Online

11. **MDN** - Web Crypto API Documentation
12. **Dropbox** - zxcvbn Password Strength Library
13. **Corbellini, A.** - ECC: A Gentle Introduction

---

## Diapositiva 12: DEMO EN VIVO (Opcional)

### Demostración Sugerida

**1. Cifrado AES-GCM** (30 seg)

- Cifrar mensaje "Hola ESCOM"
- Mostrar salt e IV aleatorios
- Descifrar exitosamente

**2. Funciones Hash** (30 seg)

- Calcular SHA-256 de "IPN"
- Cambiar a "ipn" (minúscula)
- Mostrar efecto avalancha

**3. Blockchain** (45 seg)

- Minar bloque con datos
- Alterar bloque anterior
- Mostrar cadena rota (invalida)

**4. Vulnerabilidad** (45 seg)

- SQL Injection con `' OR '1'='1`
- XSS con `<script>alert('XSS')</script>`

---

## Diapositiva 13: ESTADÍSTICAS DEL PROYECTO

### Métricas Técnicas

```
📊 LÍNEAS DE CÓDIGO
━━━━━━━━━━━━━━━━━━━━━━
JavaScript:  ~1,500 líneas
HTML:        ~2,000 líneas
CSS:         ~500 líneas
TOTAL:       ~4,000 líneas

📁 ESTRUCTURA
━━━━━━━━━━━━━━━━━━━━━━
Páginas:     24 archivos HTML
Componentes: 3 reutilizables
Demos:       15+ interactivas
Funciones:   20+ algoritmos

🔐 ALGORITMOS IMPLEMENTADOS
━━━━━━━━━━━━━━━━━━━━━━
Hashes:      5 (MD5, SHA-1, SHA-256/384/512)
Cifrado:     2 (César, AES-GCM)
ECC:         6 operaciones (suma, mult, ECDSA)
Blockchain:  1 con PoW real
```

---

## Diapositiva 14: CONCLUSIONES

### ✅ Logros Alcanzados

1. Plataforma educativa completa y funcional
2. Implementaciones criptográficas **reales** (no simuladas)
3. Cobertura de OWASP Top 10
4. 100% código abierto y portable
5. Interfaz amigable en español

### 💡 Aprendizajes

- Web Crypto API es potente y segura
- Visualizar conceptos mejora el aprendizaje
- Demos interactivas > teoría pasiva
- Importante contexto histórico y ético

### 🚀 Trabajo Futuro

- Agregar RSA, Diffie-Hellman
- Criptografía post-cuántica
- Tests automatizados
- PWA (funciona offline)
- Modo oscuro

---

## Diapositiva 15: DEMOSTRACIÓN

### 🎬 DEMO EN VIVO

**Abrir:** `index.html`

**Navegar por:**

1. 🏛️ Fundamentos de Criptografía
2. 🔐 Cifrado (César vs AES)
3. 📊 Curvas Elípticas (ECC)
4. ⛓️ Blockchain
5. 💉 SQL Injection
6. ⚠️ Cross-Site Scripting (XSS)
7. 🔑 Evaluación de Contraseñas

**Mensaje final:**
> "La seguridad no es un producto, es un proceso"
> — Bruce Schneier

---

## Diapositiva 16: PREGUNTAS Y RESPUESTAS

```
¿PREGUNTAS?

📧 Contacto: [email del equipo]
🔗 GitHub: [repositorio del proyecto]
📚 Documentación: Ver README.md
```

**Agradecimientos:**

- Profesor de Criptografía 2
- ESCOM - IPN
- Comunidad Open Source
- Web Crypto API Team

---

## 🎨 SUGERENCIAS DE DISEÑO POWERPOINT

### Paleta de Colores

```
PRIMARIOS:
- Azul IPN:     #1E3A8A (títulos)
- Verde Seguro: #4CAF50 (demos correctas)
- Rojo Alerta:  #F44336 (vulnerabilidades)

SECUNDARIOS:
- Gris Oscuro:  #333333 (texto)
- Gris Claro:   #F5F5F5 (fondos)
- Amarillo:     #FFC107 (advertencias)
```

### Iconos Sugeridos

- 🔐 Criptografía
- 🛡️ Seguridad
- 💉 Vulnerabilidades
- 📚 Educación
- ⚡ Rendimiento
- 🌐 Web
- 🔑 Autenticación
- ⛓️ Blockchain

### Tipografía

- **Títulos:** Montserrat Bold, 36-44pt
- **Subtítulos:** Montserrat SemiBold, 24-28pt
- **Texto:** Open Sans Regular, 16-18pt
- **Código:** Fira Code, 14pt

### Layout

- Máximo 6-7 bullets por slide
- Usar diagramas visuales
- Bloques de código con syntax highlight
- Screenshots de demos (si no hay demo en vivo)
- Transiciones suaves (fade, push)

---

## 📋 CHECKLIST ANTES DE PRESENTAR

- [ ] Probar todas las demos en la laptop de presentación
- [ ] Verificar compatibilidad del navegador
- [ ] Tener ejemplos de texto preparados (copy-paste rápido)
- [ ] Plan B si falla internet (todo es local, debería funcionar)
- [ ] Conocer el orden de las diapositivas
- [ ] Practicar transiciones entre demos
- [ ] Tiempo estimado: 10-15 minutos total
- [ ] Preparar respuestas a preguntas comunes:
  - ¿Por qué no usar framework como React?
  - ¿Es seguro usar Web Crypto API?
  - ¿Cómo se compara con otras plataformas?
  - ¿Planes de expansión?

---

**¡ÉXITO EN LA PRESENTACIÓN!** 🎉
