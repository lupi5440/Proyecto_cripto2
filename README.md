# Demo: Vulnerabilidades y Criptografía

Proyecto educativo que muestra varias vulnerabilidades y técnicas de mitigación.

## Estructura del Proyecto

```
proyecto/
├── index.html              # Punto de entrada principal
├── README.md              # Este archivo
├── css/
│   └── styles.css        # Estilos globales
├── js/
│   ├── main.js           # Lógica de navegación y demos
│   └── rsa.js            # Implementación de RSA
└── pages/
    ├── home.html         # Página de inicio
    ├── components/       # Componentes reutilizables (header, sidebar, footer)
    ├── criptografia/     # Páginas de criptografía
    ├── seguridad-web/    # Páginas de vulnerabilidades web
    ├── autenticacion/    # Páginas de autenticación
    ├── ataques-sociales/ # Páginas de ingeniería social
    ├── infraestructura/  # Páginas de infraestructura de red
    ├── historia/         # Historia y personajes
    ├── privacidad/       # Herramientas de privacidad
    └── recursos/         # Mejores prácticas
```

## Archivos principales

- `index.html` - interfaz principal con navegación dinámica
- `js/main.js` - lógica de las demos y navegación entre páginas
- `js/rsa.js` - implementación del algoritmo RSA
- `css/styles.css` - estilos responsive y componentes visuales

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

Desarrollado como proyecto educativo.
