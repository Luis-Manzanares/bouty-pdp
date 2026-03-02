<div align="center">

# L'ESSENTIEL

### Premium Fashion — Product Detail Page

[![HTML5](https://img.shields.io/badge/HTML5-Semántico-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Avanzado-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-blue?style=flat-square&logo=github)](https://Luis-Manzanares.github.io/bouty-pdp/)

**Prototipo de Página de Detalle de Producto para E-commerce de moda premium.**  
Construido con HTML5, CSS3 y Vanilla JS puros · Sin frameworks · Sin dependencias.

[**→ Ver Demo en Vivo**](https://Luis-Manzanares.github.io/bouty-pdp/) · [Reportar Bug](https://github.com/Luis-Manzanares/bouty-pdp/issues) · [Solicitar Feature](https://github.com/Luis-Manzanares/bouty-pdp/issues)

</div>

---

## ✦ Vista Previa

> *Abre `index.html` directamente en tu navegador — no requiere servidor ni instalación.*

```
Diseño editorial de lujo · Galería interactiva · Carrito Off-canvas
Selectores sin JavaScript · Animaciones CSS puras · Mobile-First
```

---

## 🎯 Decisiones Técnicas Clave

Este proyecto fue diseñado como demostración de **ingeniería frontend de precisión**. Cada decisión tiene una justificación técnica:

### 1. Layout Asimétrico con CSS Grid `1.2fr / 0.8fr`

La proporción entre galería e información usa fracciones CSS en lugar de porcentajes fijos, haciendo el layout completamente fluido y responsivo sin media queries adicionales.

```css
/* Mobile-first: columna única */
.pdp-container { display: grid; grid-template-columns: 1fr; }

/* Desktop: proporción áurea asimétrica */
@media (min-width: 1024px) {
    .pdp-container {
        grid-template-columns: 1.2fr 0.8fr;
        gap: 6rem;
    }
}
```

### 2. Estado Visual sin JavaScript — El Truco de `:checked`

Los selectores de talla y color son `input[type="radio"]` invisible. El CSS usa el selector hermano adyacente `+` para leer el estado del DOM y estilizar el `<label>`. **Interactividad de estado sin una sola línea de JS para la UI.**

```css
/* El input existe solo en el DOM, invisible al usuario */
.radio-wrapper input[type="radio"] { display: none; }

/* El label reacciona al estado :checked de su input hermano */
.radio-wrapper input[type="radio"]:checked + label {
    background: var(--ink);
    color: var(--white);
}

/* Swatches de color con pseudo-elemento ::after como anillo de selección */
.radio-wrapper input[type="radio"]:checked + .color-swatch {
    box-shadow: 0 0 0 2px var(--white), 0 0 0 4px var(--ink);
}
```

### 3. Carrito Off-Canvas — El Body como Árbol de Estado

El drawer lateral usa `transform: translateX(100%)` para posicionarse fuera de pantalla. El único estado que maneja JS es **una clase CSS en el `<body>`**. El resto — animaciones, overlay, scroll lock — son reglas CSS puras.

```css
/* Estado base: fuera de pantalla */
.cart-drawer { transform: translateX(100%); transition: 550ms cubic-bezier(0.16, 1, 0.3, 1); }
.cart-overlay { opacity: 0; visibility: hidden; backdrop-filter: blur(4px); }

/* Activado: JS solo añade/quita esta clase */
body.cart-open .cart-drawer  { transform: translateX(0); }
body.cart-open .cart-overlay { opacity: 1; visibility: visible; }
body.cart-open             { overflow: hidden; } /* Scroll lock nativo */
```

### 4. Botón CTA con 3 Estados Visuales

El botón "Añadir a la Bolsa" implementa un ciclo de estado con animaciones CSS `position: absolute` entre las capas del texto, un patrón propio de librerías de UI sin necesitar ninguna.

```
idle → [click] → .is-loading (spinner) → .is-success (✓ feedback) → idle
```

### 5. Botón Sticky en Mobile — CRO Pattern

El contenedor del CTA usa `position: fixed; bottom: 0` en viewport móvil. Técnica de **Conversion Rate Optimization (CRO)** documentada: reduce la fricción manteniendo la llamada a la acción siempre accesible sin importar el scroll.

```css
@media (max-width: 1023px) {
    .purchase-actions {
        position: fixed;
        bottom: 0;
        backdrop-filter: blur(10px); /* Glassmorphism para separación visual */
    }
}
```

---

## ⚙️ Funcionalidades

| Feature | Tecnología |
|---|---|
| Layout asimétrico de dos columnas | CSS Grid (`1.2fr / 0.8fr`) |
| Galería con cambio de imagen principal | Vanilla JS + CSS `opacity` transition |
| Marquee animado en header | CSS `@keyframes` + `animation: infinite` |
| Selector de talla (XS–XL) | `input[type=radio]` + `:checked + label` |
| Selector de color con dot-swatches | CSS Custom Properties + `::after` ring |
| Carrito Off-canvas | CSS `transform` + JS `classList` |
| Feedback visual en botón CTA | CSS `position: absolute` multi-state |
| Badge de carrito con animación bump | CSS `transform: scale` + Spring `cubic-bezier` |
| Control de cantidad `+` / `−` | Vanilla JS con total dinámico |
| Sincronización de variante en carrito | Event delegation en `change` |
| Wishlist con persistencia de estado | `aria-pressed` + JS toggle |
| Toast notifications | CSS `transform` + `opacity` |
| Validación de código promocional | JS string match |
| Acordeón nativo | `<details>` / `<summary>` + CSS animation |
| Header con scroll shadow | `IntersectionObserver`-lite en `scroll` |
| Botón CTA sticky mobile | `position: fixed` + `env(safe-area-inset-bottom)` |
| Accesibilidad ARIA | `aria-live`, `aria-pressed`, `role="dialog"` |

---

## 🛠️ Stack Tecnológico

| | Tecnología | Versión / Estándar |
|---|---|---|
| 📄 | HTML5 Semántico | Living Standard |
| 🎨 | CSS3 — Grid, Custom Props, Animations | CSS Level 4 |
| ⚡ | JavaScript | ES2022 (sin transpilación) |
| 🔤 | Cormorant Garamond + Inter | Google Fonts |
| 📦 | Build Tools | **Ninguno** |
| 🔌 | Dependencias | **Cero** |

---

## 📁 Estructura

```
bouty-pdp/
│
├── 📄 index.html            # Estructura semántica · <main>, <aside>, <details>
├── 📋 README.md
├── ⚖️  LICENSE
│
├── css/
│   └── 🎨 style.css         # Toda la lógica visual, estados y animaciones
│
└── js/
    └── ⚡ main.js           # 9 módulos: galería, carrito, qty, variantes, toast…
```

---

## 🚀 Uso

```bash
# Sin instalación — abrir directamente
open index.html
```

O clona el repositorio:

```bash
git clone https://github.com/Luis-Manzanares/bouty-pdp.git
cd bouty-pdp
# Abrir index.html en tu navegador preferido
```

> ⚡ **GitHub Pages**: Ve a `Settings → Pages → Branch: main → / (root)` para publicarlo instantáneamente.

---

## 👤 Autor

**Luis Manzanares**

[![GitHub](https://img.shields.io/badge/GitHub-@Luis--Manzanares-181717?style=flat-square&logo=github)](https://github.com/Luis-Manzanares)

---

## 📄 Licencia

Distribuido bajo la Licencia MIT. Ver [`LICENSE`](LICENSE) para más información.

---

<div align="center">

*Construido como ejercicio de ingeniería frontend de precisión.*  
*Demuestra que los fundamentos de la plataforma web son suficientes.*

</div>
