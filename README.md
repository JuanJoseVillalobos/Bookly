# Bookly — Discover. Book. Experience.

> **Plataforma web adaptable y bilingüe para reserva de experiencias y servicios turísticos.**  
> Diseñada bajo la filosofía de **Premium Editorial Minimalism**, desacoplada de marcas específicas mediante configuración centralizada y datos estructurados.

---

## Stack Tecnológico

| Herramienta | Rol en el Proyecto |
| :--- | :--- |
| **React 19** | Biblioteca para interfaces de usuario basadas en componentes |
| **Vite 8** | Entorno de desarrollo ultrarrápido y bundler de producción |
| **Tailwind CSS v4** | Framework utilitario para diseño responsivo y tokens de diseño |
| **React Router v7** | Enrutamiento del lado del cliente SPA |
| **i18next & react-i18next** | Infraestructura de internacionalización bilingüe (ES / EN) |
| **Lucide React** | Iconografía vectorial consistente y minimalista |

---

## Resumen de Milestone M0 — Project Foundation

El hito **M0 (Fundación Técnica)** estableció los cimientos arquitectónicos, visuales y de datos necesarios para soportar todo el ciclo de vida del producto sin dependencias prematuras de backend.

### Tickets Implementados y Validados

```text
main
 └── develop
      ├── chore/BKL-01-initialize-project
      ├── chore/BKL-02-project-structure
      ├── feature/BKL-03-design-system
      ├── feature/BKL-04-shared-layout
      ├── feature/BKL-05-internationalization
      ├── feature/BKL-06-business-config
      ├── data/BKL-07-experience-data
      └── chore/BKL-08-foundation-validation
```

| Ticket | Módulo / Tarea | Resumen de Implementación |
| :--- | :--- | :--- |
| **BKL-01** | Inicialización del Proyecto | Configuración inicial con React, Vite, Tailwind CSS v4, Lucide React y dependencias esenciales de i18n y enrutamiento. |
| **BKL-02** | Estructura y Enrutamiento | Definición del árbol de directorios modular (`components`, `layouts`, `pages`, `routes`, `config`, `data`, `i18n`, `styles`). Mapeo de rutas iniciales: `/`, `/explore`, `/experience/:id`, `/booking/:id`, `/confirmation` y fallback 404 (`*`). |
| **BKL-03** | Sistema de Diseño & Tokens | Configuración de paleta editorial (*Ivory*, *Forest*, *Sand Gold*, *Charcoal*, *Stone*), tipografías (*Playfair Display* e *Inter*), y componentes base reutilizables (`Button`, `Input`, `Select`, `Badge`, `Card`). |
| **BKL-04** | Layout Compartido Responsivo | Implementación del `Navbar` con menú colapsable para móviles, selector de idioma, y `Footer` institucional responsivo desacoplado. |
| **BKL-05** | Infraestructura Bilingüe | Configuración de `i18next` con namespaces (`common`, `home`, `booking`), detección y persistencia automática en `localStorage` (`bookly_language`), selector con banderas SVG (España y Reino Unido) y cambio dinámico sin recarga. |
| **BKL-06** | Configuración Comercial Centralizada | Desacoplamiento de la identidad de marca en `businessConfig.js`, sincronización del título del documento y aplicación dinámica de variables CSS de branding mediante el hook `useBusinessConfig`. |
| **BKL-07** | Mock Data de Experiencias | Modelo de datos centralizado en `src/data/experiences.js` con las 4 experiencias ilustrativas iniciales (*Mountain Escape*, *Salt Flats Adventure*, *Hidden Waterfalls*, *Andean Sunset*), campos bilingües, imágenes, precios, franjas horarias y utilidades de filtrado y cálculo. |
| **BKL-08** | Validación de la Fundación | Verificación exhaustiva de build de producción, ejecución local, navegación, persistencia de idioma, consumo de datos y ausencia total de errores en consola. |

### Criterios de Aceptación de M0

- [x] Entorno de desarrollo funcional (`npm run dev`).
- [x] Compilación de producción exitosa sin advertencias (`npm run build`).
- [x] Enrutamiento SPA completo con soporte para páginas principales y 404.
- [x] Selector bilingüe ES / EN con persistencia en recarga y navegación.
- [x] Configuración comercial centralizada e independiente de la presentación visual.
- [x] Modelo de mock data listo para Discovery (M1) y Booking (M2).
- [x] Diseño responsivo en móviles, tablets y escritorio.

---

## Estructura del Proyecto

```text
src/
├── assets/             # Recursos estáticos locales
├── components/         # Componentes UI organizados por dominio
│   ├── common/         # Componentes atómicos (Button, Input, Select, Badge, Card, LanguageSelector)
│   └── layout/         # Navbar, Footer y contenedores estructurales
├── config/             # Configuración comercial y de marca (businessConfig.js)
├── data/               # Fuentes de mock data centralizadas (experiences.js)
├── hooks/              # Custom hooks reutilizables (useBusinessConfig.js)
├── i18n/               # Configuración de i18next y archivos de traducción
│   └── locales/
│       ├── en/         # common.json, home.json, booking.json
│       └── es/         # common.json, home.json, booking.json
├── layouts/            # Layouts de página principal (MainLayout.jsx)
├── pages/              # Vistas completas de la aplicación
│   ├── Home/
│   ├── Explore/
│   ├── ExperienceDetails/
│   ├── Booking/
│   ├── Confirmation/
│   └── NotFound/
├── routes/             # Configuración central de rutas (AppRoutes.jsx)
├── styles/             # Tokens del sistema de diseño (tokens.js, index.css)
├── App.jsx             # Componente raíz
└── main.jsx            # Punto de entrada de la aplicación
```

---

## Instalación y Puesta en Marcha

### Prerrequisitos

- Node.js 18+ instalado.
- Gestor de paquetes `npm` (o `yarn` / `pnpm`).

### Pasos

1. **Clonar el repositorio y situarse en el directorio:**
   ```bash
   cd "1. Bookly - Sistema de Reservas"
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará accesible en: `http://localhost:5173/`

4. **Generar build de producción:**
   ```bash
   npm run build
   ```

5. **Previsualizar el build de producción:**
   ```bash
   npm run preview
   ```

---

## Roadmap de Milestones

- [x] **M0 — Project Foundation** *(Completado)*: Arquitectura, tokens, layout, i18n, business config y mock data.
- [ ] **M1 — Experience Discovery**: Catálogo de experiencias, búsqueda, filtros por categoría/duración y página de detalle.
- [ ] **M2 — Booking Experience**: Selector interactivo de fecha/horario, cálculo de invitados, formulario de solicitud y pantalla de confirmación.
- [ ] **M3 — Demo Readiness**: QA cross-device, auditoría de accesibilidad, despliegue en Vercel y documentación final para portfolio.
