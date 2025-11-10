# Demo: Vulnerabilidades y Criptografía

Proyecto educativo que muestra varias vulnerabilidades y técnicas de mitigación.

Archivos:

- `index.html` - interfaz principal con páginas para cada demo.
- `main.js` - lógica de las demos (MITM simulado, cifrado, fuerza de contraseñas, SQLi simulado, XSS simulado).
- `styles.css` - estilos simples.

Cómo usar:

1. Abre `index.html` en tu navegador (doble clic o "Open with" -> navegador).
2. Navega entre las secciones con los botones del menú superior.

Notas de seguridad y alcance:

- Todo es local y simulado para fines educativos. No realiza ataques reales.
- Para una versión con servidor real (p. ej. para explicar cabeceras HTTPS/Certificate pinning), se necesitaría añadir código del servidor y cuidado con contenido sensible.

Mejoras posibles:

- Añadir tests automatizados.
- Separar en páginas con routing (React/Vue) y añadir build.
- Añadir ejemplos más completos de cifrado (firmas, intercambio de claves, etc.).

Hecho por: demo educativo.
