# 📁 Estructura CSS del Proyecto

Este proyecto utiliza una **arquitectura CSS modular** organizada por funcionalidad, similar a la estructura JavaScript.

## 📂 Estructura de Carpetas

```
css/
├── base/                    # Estilos fundamentales
│   └── base.css            # Variables CSS, reset, tipografía global
├── layout/                  # Estructura de página
│   ├── layout.css          # Header, footer, container, grid
│   └── page.css            # Estilos compartidos de páginas
├── components/              # Componentes reutilizables
│   ├── navigation.css      # Menú lateral, hamburger, overlay
│   └── components.css      # Botones, inputs, info-boxes, tablas
├── pages/                   # Estilos específicos de página
│   └── ecc.css             # Graficador de curvas elípticas
└── styles.css              # Archivo principal (importa todos los módulos)
```

## 📄 Descripción de Archivos

### 🎨 base/base.css (80 líneas)

**Propósito:** Fundamentos del diseño

- Variables CSS (`:root`) con paleta de colores del proyecto
- Reset básico de estilos
- Tipografía base y fuentes
- Estilos globales para elementos HTML básicos

**Variables principales:**

```css
--color-primary: #1687a7
--color-primary-dark: #0b3954
--color-accent: #4db8d8
--color-background: #f5f7fb
```

### 🏗️ layout/layout.css (95 líneas)

**Propósito:** Estructura principal de la aplicación

- Header principal (`.main-header`)
- Footer (`.main-footer`)
- Container y grid system
- Área de contenido principal (`#main-content`)
- Media queries para responsive (tablets y móviles)

### 📄 layout/page.css (40 líneas)

**Propósito:** Estilos compartidos de páginas

- Contenedor de página (`.page`)
- Títulos h2, h3, h4
- Descripción de página (`.page-description`)
- Responsive para páginas

### 🧭 components/navigation.css (200 líneas)

**Propósito:** Sistema de navegación

- Botón hamburguesa (`.hamburger`)
- Menú lateral (`.header-menu`)
- Items de menú (`.menu-item`)
- Secciones colapsables (`.menu-section`)
- Overlay oscuro (`.menu-overlay`)
- Responsive para diferentes tamaños de pantalla

### 🎯 components/components.css (290 líneas)

**Propósito:** Componentes reutilizables

- Botones (`.btn-primary`, `.btn-secondary`)
- Inputs y formularios (`.input-group`)
- Info boxes (`.info-box`)
- Result boxes (`.result-box`)
- Logs y vistas (`.log-container`, `.log-item`)
- Tablas de comparación (`.comparison-table`)
- Demostración containers (`.demo-section`)

### 🔐 pages/ecc.css (310 líneas)

**Propósito:** Graficador de curvas elípticas

- Sección principal (`.elliptic-curve-section`)
- Display de ecuación (`.equation-display`)
- Controles (`.controls-container`)
- Botones preset (`.preset-buttons`)
- Gráfico SVG (`#ecc-plot`)
- Leyenda y zoom (`.legend`, `.zoom-controls`)
- Responsive específico para graficador

### 📋 styles.css (40 líneas)

**Propósito:** Archivo principal de importación

- Importa todos los módulos CSS usando `@import`
- Incluye documentación de la estructura
- Punto de entrada único para el proyecto

## 🔗 Cómo se Cargan los Estilos

El archivo `index.html` solo necesita cargar **un archivo CSS**:

```html
<link rel="stylesheet" href="css/styles.css">
```

Luego `styles.css` importa automáticamente todos los módulos en el orden correcto:

```css
@import url('base/base.css');
@import url('layout/layout.css');
@import url('layout/page.css');
@import url('components/navigation.css');
@import url('components/components.css');
@import url('pages/ecc.css');
```

## ✨ Ventajas de Esta Estructura

1. **Modularidad:** Cada archivo tiene una responsabilidad única y clara
2. **Mantenibilidad:** Fácil encontrar y modificar estilos específicos
3. **Escalabilidad:** Agregar nuevas páginas o componentes es simple
4. **Reutilización:** Componentes comunes están centralizados
5. **Organización:** Estructura clara similar al JavaScript del proyecto

## 🆕 Agregar Nuevos Estilos

### Para estilos globales (colores, tipografía)

→ Editar `base/base.css`

### Para cambios de layout general

→ Editar `layout/layout.css` o `layout/page.css`

### Para nuevos componentes reutilizables

→ Agregar a `components/components.css`

### Para estilos específicos de una página

1. Crear nuevo archivo: `css/pages/nombre-pagina.css`
2. Importarlo en `styles.css`:

   ```css
   @import url('pages/nombre-pagina.css');
   ```

## 📊 Estadísticas

- **Total de archivos CSS:** 7 módulos + 1 principal
- **Líneas totales:** ~1,055 líneas organizadas
- **Reducción en styles.css:** De 1,000+ líneas a 40 líneas (96% reducción)
- **Archivos modulares:** 6 módulos especializados

## 🎯 Convenciones de Nombres

- **Layout:** Clases para estructura general (`.main-header`, `.container`)
- **Components:** Clases con prefijos descriptivos (`.btn-`, `.input-group`)
- **Pages:** Clases específicas de funcionalidad (`.elliptic-curve-section`)
- **States:** Modificadores con punto (`.menu-item.active`, `.menu-section.collapsed`)

## 🔄 Orden de Carga

El orden de importación es importante:

1. **Base** → Variables y reset
2. **Layout** → Estructura principal
3. **Components** → Elementos reutilizables
4. **Pages** → Estilos específicos (pueden sobrescribir anteriores)

## 🛠️ Herramientas de Desarrollo

Para agregar más páginas específicas, sigue el patrón de `ecc.css`:

- Nombres de clase descriptivos
- Comentarios claros
- Responsive incluido
- Variables CSS cuando sea posible

---

**Última actualización:** Noviembre 2025
**Estructura compatible con:** Todos los navegadores modernos
