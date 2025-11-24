# Reorganización del Proyecto - Estructura por Secciones

## Cambios Realizados

### 📁 Nueva Estructura de Carpetas

Las páginas HTML ahora están organizadas en carpetas temáticas que corresponden exactamente con las secciones del menú de navegación:

#### 1. **pages/criptografia/** 🔐

- crypto-fundamentals.html
- cipher.html
- encryption.html
- ecc.html
- hash.html
- blockchain.html

#### 2. **pages/seguridad-web/** 🛡️

- sqli.html
- xss.html
- csrf.html
- mitm.html
- session.html

#### 3. **pages/autenticacion/** 🔑

- password.html
- 2fa.html
- oauth.html

#### 4. **pages/ataques-sociales/** 🎣

- phishing.html
- social-eng.html

#### 5. **pages/infraestructura/** 🌐

- https.html
- vpn.html

#### 6. **pages/historia/** 📖

- crypto-events.html
- crypto-heroes.html

#### 7. **pages/privacidad/** 🔒

- privacy-tools.html
- open-source.html

#### 8. **pages/recursos/** 💡

- security-tips.html

### 🔧 Archivos Modificados

1. **js/main.js**
   - Actualizado el objeto `pageMap` con las nuevas rutas
   - Agregados comentarios para identificar cada sección
   - Mantenida toda la funcionalidad existente

2. **README.md**
   - Actualizada la estructura del proyecto
   - Documentada la nueva organización de carpetas

3. **Nuevos archivos README.md**
   - Creado un README.md en cada carpeta de sección
   - Cada README documenta el propósito de la carpeta y las páginas que contiene

### ✅ Beneficios de la Nueva Estructura

1. **Organización lógica**: Las páginas están agrupadas por tema, igual que en el menú
2. **Fácil navegación**: Ahora es más fácil encontrar archivos específicos
3. **Escalabilidad**: Se pueden agregar nuevas páginas fácilmente en la carpeta correspondiente
4. **Documentación**: Cada carpeta tiene su propio README explicativo
5. **Mantenibilidad**: El código está mejor organizado y es más fácil de mantener

### 🔄 Compatibilidad

- ✅ Toda la navegación sigue funcionando correctamente
- ✅ Todas las demos mantienen su funcionalidad
- ✅ Los scripts (setupMitm, setupPassword, etc.) siguen ejecutándose correctamente
- ✅ Los estilos CSS se aplican sin problemas
- ✅ La carga dinámica de componentes (header, sidebar, footer) funciona igual

### 📝 Notas Técnicas

- Las rutas en `main.js` usan rutas relativas desde `pages/`
- Ejemplo: `'pages/criptografia/cipher.html'`
- No se requieren cambios en los archivos HTML individuales
- La estructura de `components/` permanece sin cambios

### 🎯 Próximos Pasos Sugeridos

1. Considerar agregar más páginas en las secciones existentes
2. Posible creación de índices visuales por sección
3. Implementar breadcrumbs para mostrar la ubicación actual
4. Agregar metadatos a cada página (autor, fecha, tags)

---

**Fecha de reorganización**: 24 de noviembre de 2025
**Versión**: 2.0 - Estructura organizada por secciones
