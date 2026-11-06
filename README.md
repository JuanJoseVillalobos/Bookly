# Bookly — Discover. Book. Experience.

> **Versión:** `v1.0.0` (MVP Release)  
> **Demo en Producción (Vercel):** [https://001-bookly-project.vercel.app/](https://001-bookly-project.vercel.app/)  
> **Plataforma web adaptable y bilingüe (ES / EN) para descubrimiento y solicitud de reservas de experiencias turísticas.**  
> Diseñada bajo la dirección estética de **Premium Editorial Minimalism**, desacoplada de una identidad comercial fija mediante configuración centralizada.

---

## Tabla de Contenidos

1. [Descripción del Proyecto](#descripción-del-proyecto)
2. [Demo Pública](#demo-pública)
3. [Stack Tecnológico](#stack-tecnológico)
4. [Funcionalidades Principales del MVP](#funcionalidades-principales-del-mvp)
5. [Arquitectura y Estructura del Proyecto](#arquitectura-y-estructura-del-proyecto)
6. [Seguridad, Accesibilidad y Rendimiento](#seguridad-accesibilidad-y-rendimiento)
7. [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
8. [Limitaciones Conocidas del MVP](#limitaciones-conocidas-del-mvp)
9. [Roadmap y Milestones Completados](#roadmap-y-milestones-completados)

---

## Descripción del Proyecto

**Bookly** es una aplicación web frontend moderna concebida para operadores turísticos, agencias de viajes boutique y anfitriones de experiencias que necesitan exhibir su catálogo de actividades y recibir solicitudes de reserva de manera clara, estructurada y confiable.

A diferencia de un sitio hecho a medida para una única marca, Bookly separa su **identidad comercial** (`src/config/businessConfig.js`) y su **catálogo de experiencias** (`src/data/experiences.js`) de los componentes de interfaz, permitiendo adaptar el sistema a distintos rubros o regiones modificando únicamente archivos de configuración.

---

## Demo Pública

La versión estable **`v1.0.0`** se encuentra desplegada en producción mediante **Vercel**:

- **URL Pública:** [https://001-bookly-project.vercel.app/](https://001-bookly-project.vercel.app/)

---

## Stack Tecnológico

| Tecnología | Versión | Rol en el Proyecto |
| :--- | :--- | :--- |
| **React** | `^19.3.1` | Construcción de interfaz declarativa basada en componentes y hooks |
| **Vite** | `^8.3.5` | Entorno de desarrollo y empaquetador de producción con code-splitting |
| **Tailwind CSS** | `^4.3.4` | Sistema de diseño utilitario y definición de tokens editoriales (`@theme`) |
| **React Router** | `^7.18.5` | Enrutamiento SPA del lado del cliente con carga diferida (`React.lazy`) |
| **i18next & react-i18next** | `^26.7.1` / `^17.1.12` | Internacionalización bilingüe completa (Español e Inglés) |
| **Lucide React** | `^1.68.0` | Iconografía vectorial consistente y ligera |
| **Vercel** | Edge Network | Hosting de producción, rewrites SPA y encabezados HTTP de seguridad |

---

## Funcionalidades Principales del MVP

### 1. Landing Page Editorial (`/`)
- **Hero Multimedia Adaptativo**: Reproducción automática de video en alta definición para escritorio y tablet (`>= 768px`), e imagen estática optimizada en dispositivos móviles (`< 768px`) para ahorrar ancho de banda.
- **Buscador Rápido**: Redirección directa al catálogo aplicando términos de búsqueda por destino o actividad.
- **Secciones de Descubrimiento**: Experiencias destacadas, exploración rápida por categorías (*Aventura*, *Excursión*, *Naturaleza*, *Paisajes*), propuesta de valor, carrusel interactivo de testimonios ilustrativos y llamado a la acción final.

### 2. Catálogo y Búsqueda Avanzada (`/explore`)
- **20 Experiencias Ilustrativas**: Catálogo completo con información bilingüe, precios, duración, dificultad y calificaciones.
- **Filtros Combinables Sincronizados con URL**: Búsqueda de texto libre (`?q=`), filtrado por categoría (`?category=`), rango de precio (`?price=`) y ordenamiento dinámico (`?sort=featured|price-asc|price-desc|rating`).
- **Chips de Filtros Activos y Empty State**: Eliminación individual o global de filtros aplicados y estado vacío con restablecimiento en un clic.

### 3. Detalle de Experiencia (`/experience/:id`)
- **Galería Fotográfica con Lightbox**: Grilla editorial y visor modal a pantalla completa con navegación por teclado (`Escape`, `ArrowLeft`, `ArrowRight`).
- **Información Detallada**: Resumen narrativo, puntos destacados (*highlights*), listado de servicios incluidos y no incluidos, y disponibilidad ilustrativa (temporada, días operativos y turnos).
- **Booking Sidebar Sticky**: Resumen de tarifa por persona y acceso directo al asistente de reserva.

### 4. Multi-Step Booking Wizard (`/booking/:id`)
Flujo guiado de solicitud de reserva dividido en **5 etapas progresivas**:
1. **Paso 1 — Fecha y Turno**: Calendario interactivo con bloqueo de fechas pasadas y días no operativos, entrada manual con máscara según idioma (`dd/mm/aaaa` en ES, `mm/dd/yyyy` en EN) y selector de horarios disponibles con cupos simulados.
2. **Paso 2 — Cantidad de Huéspedes**: Control incremental (`GuestSelector`) que respeta los mínimos y máximos de cada experiencia y calcula en tiempo real el subtotal y total estimado (`precio unitario × participantes`).
3. **Paso 3 — Información de Contacto**: Validación de nombre completo, correo electrónico y teléfono de contacto con mensajes de error contextuales.
4. **Paso 4 — Requerimientos Adicionales**: Campo opcional de notas o preferencias especiales con contador de caracteres en vivo (máximo 500 caracteres).
5. **Paso 5 — Revisión y Confirmación**: Resumen integral con accesos rápidos (`Modificar`) a cada etapa previa, casilla de verificación explícita y envío protegido contra clics múltiples.

### 5. Confirmación y Persistencia Local (`/confirmation`)
- **Registro con Referencia Única**: Generación de código verificable con formato `BKL-YYYYMMDD-XXXX` y botón de copiado al portapapeles.
- **Estado Inicial `pending_approval`**: Comunicación transparente de que la solicitud se encuentra **Pendiente de Aprobación** por parte del operador y que no se ha efectuado ningún cobro.
- **Recuperación Resiliente**: Recuperación de la solicitud mediante query param (`?id=`), estado de navegación o última solicitud almacenada en `localStorage` tras recargar la página.

### 6. Internacionalización Bilingüe (ES / EN)
- Selector de idioma en el `Navbar` (desktop y mobile) con cambio instantáneo sin recargar la página.
- Paridad del 100% en los 3 namespaces (`common`, `home`, `booking`) y adaptación automática de formatos de fecha y moneda (`Intl.DateTimeFormat` e `Intl.NumberFormat`).

---

## Arquitectura y Estructura del Proyecto

```text
├── public/
│   └── favicon.svg                 # Favicon vectorial con identidad Bookly
├── src/
│   ├── components/
│   │   ├── common/                 # Button, Input, Select, Badge, Card, DatePicker, TimeSlotSelector, GuestSelector, ScrollToTop
│   │   ├── experience/             # ExperienceCard, ExperienceSkeleton
│   │   └── layout/                 # Navbar (sticky), Footer, LanguageSelector
│   ├── config/
│   │   └── businessConfig.js       # Identidad comercial, contacto, moneda y branding desacoplados
│   ├── data/
│   │   └── experiences.js          # Catálogo bilingüe de 20 experiencias y generador de disponibilidad
│   ├── hooks/
│   │   └── useBusinessConfig.js    # Hook reactivo al idioma para consumir la configuración del negocio
│   ├── i18n/
│   │   ├── index.js                # Inicialización de i18next y persistencia en localStorage
│   │   └── locales/                # Archivos de traducción ES y EN (common, home, booking)
│   ├── layouts/
│   │   └── MainLayout.jsx          # Layout global con skip-link accesible, Navbar sticky y Footer
│   ├── pages/
│   │   ├── Home/                   # Landing Page y secciones modulares
│   │   ├── Explore/                # Catálogo interactivo con buscador y filtros
│   │   ├── ExperienceDetails/      # Vista de detalle, galería lightbox y tarjeta de reserva
│   │   ├── Booking/                # Multi-Step Booking Wizard (Steps 1 a 5 + WizardStepper)
│   │   ├── Confirmation/           # Página de confirmación de solicitud y estado vacío
│   │   └── NotFound/               # Página 404 para rutas inexistentes
│   ├── routes/
│   │   └── AppRoutes.jsx           # Definición de rutas con code-splitting (React.lazy + Suspense)
│   ├── services/
│   │   └── bookingService.js       # Creación, sanitización, deduplicación y persistencia en localStorage
│   ├── styles/
│   │   └── tokens.js               # Referencia documentada de tokens del sistema de diseño
│   ├── utils/
│   │   ├── formatters.js           # Formateo seguro de fechas ISO (sin desfase UTC) y monedas
│   │   ├── pricing.js              # Cálculo centralizado de tarifas y totales estimados
│   │   └── validation.js           # Reglas de validación de formulario y etapas del wizard
│   ├── App.jsx                     # Proveedor de enrutamiento y restauración de scroll
│   ├── index.css                   # Configuración de Tailwind CSS v4 y variables @theme
│   └── main.jsx                    # Punto de entrada React 19
├── index.html                      # Plantilla HTML5 con metadatos SEO/OG y preconnect a CDNs
├── vercel.json                     # Rewrites SPA para React Router y encabezados HTTP de seguridad
├── vite.config.js                  # Configuración de Vite y particionado de chunks de producción
└── package.json                    # Manifiesto del proyecto (v1.0.0)
```

---

## Seguridad, Accesibilidad y Rendimiento

- **Auditoría de Dependencias**: `0` vulnerabilidades reportadas por `npm audit`.
- **Sanitización y Prevención de Inyección**: Validación estricta de entradas del usuario y sanitización en `bookingService.js` (`sanitizeTextInput`) eliminando etiquetas HTML/scripts y caracteres de control antes de almacenar en `localStorage`, sumado al escape automático de JSX en React.
- **Encabezados HTTP en Producción (`vercel.json`)**:
  - `Content-Security-Policy` restringido a orígenes confiables (`'self'`, Google Fonts, Unsplash y Cloudinary).
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- **Optimización de Bundle y Caché**:
  - División de código por rutas (`React.lazy`) y separación de chunks de proveedores (`react-vendor`, `router-vendor`, `i18n-vendor`, `icons-vendor`).
  - Caché inmutable de largo plazo (`max-age=31536000, immutable`) para assets estáticos con hash.
- **Accesibilidad (a11y)**: Enlace *Skip to main content*, roles semánticos (`dialog`, `radiogroup`, `spinbutton`, `tablist`, `alert`, `status`), soporte de teclado y contraste editorial cuidado.

---

## Instalación y Puesta en Marcha

### Prerrequisitos

- **Node.js** `18.x` o superior.
- **npm** `9.x` o superior.

### Pasos de Instalación

1. **Clonar el repositorio e ingresar al directorio del proyecto:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd "1. Bookly - Sistema de Reservas"
   ```

2. **Instalar las dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173/`.

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

5. **Previsualizar el build de producción localmente:**
   ```bash
   npm run preview
   ```

---

## Limitaciones Conocidas del MVP

Bookly `v1.0.0` constituye un **Minimum Viable Product (MVP)** enfocado en la experiencia de usuario frontend y la arquitectura de interfaz. Al evaluar o utilizar la demostración, ten en cuenta las siguientes limitaciones deliberadas de alcance:

1. **Catálogo y Disponibilidad Simulados (Mock Data)**:
   - Las 20 experiencias, fotografías, tarifas, reseñas y cupos horarios provienen de datos estáticos e ilustrativos definidos en `src/data/experiences.js`.
   - Los cupos disponibles por horario se calculan de forma determinista según la fecha seleccionada para demostrar todos los estados de interfaz (*disponible*, *último lugar*, *agotado*).
2. **Persistencia Local en el Navegador (`localStorage`)**:
   - No existe conexión a un servidor backend ni base de datos en la nube en esta versión.
   - Las solicitudes de reserva generadas se almacenan localmente en el navegador del usuario bajo la clave `bookly_bookings` (y el idioma preferido en `bookly_language`). Si el usuario borra los datos del navegador o cambia de dispositivo, las solicitudes previas no estarán disponibles.
3. **Flujo Basado en Solicitud (`Pending Approval`)**:
   - Enviar el formulario registra una **solicitud de reserva sujeta a aprobación del operador** (`pending_approval`), no una reserva confirmada de forma instantánea.
   - No se envían correos electrónicos ni notificaciones reales por WhatsApp/SMS.
4. **Sin Procesamiento de Pagos**:
   - Los precios y totales mostrados son ilustrativos. El MVP no solicita tarjetas de crédito ni integra pasarelas de pago.
5. **Sin Panel de Administración ni Autenticación**:
   - El alcance del MVP cubre exclusivamente el recorrido público del viajero.

---

## Roadmap y Milestones Completados

- [x] **M0 — Project Foundation**: Inicialización con Vite + React + Tailwind v4, sistema de diseño editorial, layout compartido, i18n bilingüe (ES/EN), `businessConfig` y modelo de datos.
- [x] **M1 — Experience Discovery**: Landing page completa, catálogo en `/explore` con búsqueda y filtros sincronizados en URL, y página de detalle `/experience/:id` con galería lightbox.
- [x] **M2 — Booking Experience**: Selector de fechas con restricciones operativas, selector de turnos horarios, cálculo dinámico de huéspedes, validaciones, Multi-Step Booking Wizard de 5 pasos, persistencia local y página `/confirmation`.
- [x] **M3 — Demo Readiness (`v1.0.0`)**: Navbar sticky, auditoría de seguridad y accesibilidad, optimización de chunks, configuración SPA y encabezados HTTP en Vercel (`vercel.json`), y documentación final de release.
