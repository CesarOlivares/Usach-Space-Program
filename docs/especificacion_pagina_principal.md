# Especificación de Diseño y Desarrollo: Página Principal (Home)
**Organización:** USACH Space Program (USP) — Universidad de Santiago de Chile  
**Documento:** Guía Maestra de UI/UX, Dirección de Arte y Arquitectura de Contenido  
**Dirección de Arte:** Deep Space HUD & Editorial Engineering (Institucional / Deep-Tech Real)  
**Estado:** Aprobado para Maquetación y Desarrollo Frontend  

---

## 1. Visión y Fundamentos del Proyecto

### 1.1. Frase Ideológica (Manifiesto Fundacional)
> *«La ciencia no pertenece a un solo hombre ni a una sola época; pertenece a cualquiera que esté dispuesto a sacrificar su presente por el progreso del mañana.»*

### 1.2. Estrella Norte de Diseño
> *«Debe sentir el asombro y la elegancia de la frontera aeroespacial, respaldados por la seriedad de una estructura técnica impecable que lo invita a ser parte de una ambición colectiva por el futuro.»*

### 1.3. Dirección Emocional y Perceptiva (A primera vista)
* **Lo que siente el usuario:** Gravitas, sobriedad y admiración por un proyecto técnico real de vanguardia. La atmósfera evoca el rigor metodológico de centros de ingeniería aeroespacial consolidados e iniciativas deep-tech universitarias internacionales (MIT Rocket Team, TU Delft DARE, Caltech Space Challenge).
* **Lo que entiende el usuario:** Queda establecido desde el primer segundo que **no es un videojuego ni ficción especulativa**, sino un programa de ingeniería estudiantil interdisciplinario y autogestionado en la Universidad de Santiago de Chile, que diseña, manufactura y ensaya prototipos físicos y software operativo con métricas y gobernanza comprobables.

---

## 2. Perfiles de Usuario (User Personas) y Casos de Uso

### 2.1. Arquetipo 1: El Estudiante Postulante («El Explorador Técnico»)
* **Perfil:** Estudiante de pregrado (20 a 24 años) de la USACH en ingeniería (Mecánica, Eléctrica, Informática, Aeroespacial, Materiales, Industrial) o ciencias exactas (Física, Química, Matemáticas).
* **Motivación:** Encontrar un equipo riguroso donde adquirir experiencia práctica en taller, laboratorios y simulación computacional; validar habilidades en proyectos tangibles (Rovers, Cohetería, CubeSats) y construir un portafolio de ingeniería de estándar internacional.
* **Puntos de dolor:** Desconfianza ante grupos estudiantiles desorganizados o de divulgación pasiva sin prototipos reales; procesos de postulación opacos; falta de claridad en las disciplinas técnicas activas.
* **Contexto de uso:** Acceso móvil prioritario (80%) desde el campus o transporte público. Requiere comprender en menos de 30 segundos la seriedad del programa, los ejes activos y los requisitos para postular.
* **Criterio de validación interno:** *«¿Aquí realmente se diseña, programa y manufactura hardware espacial, o es solo teoría?»*

#### Caso de Uso 1: Exploración Técnica y Postulación a Convocatoria
1. **Llegada:** Aterriza en el *Hero Section*, validando de inmediato la identidad del programa universitario y la fuerza del manifiesto.
2. **Métricas de impacto:** Revisa las cifras reales de la organización (miembros, ejes, proyectos e instituciones aliadas).
3. **Exploración de Ejes:** Identifica los 3 Ejes Estratégicos (Robótica, Cohetería, Sistemas Orbitales) y sus líderes técnicos.
4. **Validación de Hardware:** Revisa los Proyectos Emblema (Rover Mascota, Cohete de Agua 3 Unidades, CubeSat 1U FlatSat) y las Iniciativas Formativas de Onboarding.
5. **Conversión (CTA Principal):** Hace clic en *«Postular a la Convocatoria»*, completando el formulario de postulación técnica segmentado por competencias.

---

### 2.2. Arquetipo 2: El Profesional, Evaluador o Patrocinador («El Evaluador Estratégico»)
* **Perfil:** Académico, directivo universitario, líder de I+D, representante de agencias espaciales o empresas de base tecnológica (telecomunicaciones, minería, manufactura, defensa, software), evaluador de fondos concursables (30 a 55 años).
* **Motivación:** Identificar agrupaciones con seriedad metodológica, trazabilidad técnica y gobernanza transparente para canalizar financiamiento, donación de componentes o instrumental, patrocinios corporativos y captación temprana de talentos de ingeniería.
* **Puntos de dolor:** Propuestas sin respaldo técnico verificable; ausencia de hitos o cronogramas reales; sitios sobrecargados de ficción o estética lúdica que impiden evaluar la madurez del equipo o hallar canales formales de vinculación.
* **Contexto de uso:** Monitor de escritorio o laptop en entorno laboral. Dispone de un máximo de 2 minutos para evaluar la viabilidad institucional.
* **Criterio de validación interno:** *«¿Tienen la disciplina, el respaldo institucional y el rigor técnico necesarios para justificar una inversión o patrocinio de nuestra empresa?»*

#### Caso de Uso 2: Auditoría Rápida y Contacto para Patrocinio
1. **Llegada:** Constata de inmediato una presentación corporativa sobria, respaldada por la Universidad de Santiago de Chile, el Centro de Innovación USACH y ACHIDE.
2. **Auditoría de Avances:** Examina los proyectos activos, el roadmap 2026-2027 y la gobernanza metodológica (*Piensa - Crea - Aprende*).
3. **Verificación de Alianzas:** Revisa las entidades colaboradoras existentes en el ecosistema.
4. **Conversión (CTA Secundario):** Descarga el *Dossier Institucional* o utiliza el canal directo de contacto institucional (`spaceprogram@usach.cl`) para agendar una reunión formal.

---

## 3. Dirección de Arte: Deep Space HUD & Editorial Engineering

### 3.1. Lenguaje Visual y Filosofía Estética
Se descartan terminantemente referencias a videojuegos, ciencia ficción ficticia, interfaces lúdicas y datos inventados. El lenguaje adopta el canon de **ingeniería aeroespacial contemporánea y diseño editorial de alta precisión**:
* **Equilibrio Fotográfico-Editorial:** Fondos espaciales reales y de alto contraste (#030508 a #070B14) con tipografía editorial sobria y jerarquizada.
* **Retícula Técnica de 1px:** Divisiones finas en `rgba(255, 255, 255, 0.08)` inspiradas en planos de ingeniería, esquemas de ensamble y consolas de monitoreo técnico.
* **Acentos de Color Controlados:** Uso medido y funcional de ámbar solar (`#E5A958`) para llamados a la acción e hitos clave, y cian criogénico (`#48CAE4`) para etiquetas técnicas y enlaces de documentación.

### 3.2. Tokens de Color y Fotometría

| Nivel de Capa | Token CSS | Hex / Valor RGBA | Aplicación Real |
| :--- | :--- | :--- | :--- |
| **Fondo Base** | `--bg-space-void` | `#030508` | Fondo principal del sitio; máximo contraste y profundidad |
| **Superficie Modular** | `--bg-space-surface` | `#070B14` | Tarjetas técnicas, módulos de ejes y paneles institucionales |
| **Superficie Flotante** | `--bg-space-panel` | `rgba(7, 11, 20, 0.85)` | Header fijo con desenfoque de fondo (`backdrop-filter: blur(12px)`) |
| **Borde Estructural** | `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Cuadrículas técnicas de 1px, divisores de sección y marcos |
| **Borde Activo / Foco** | `--border-hud` | `rgba(255, 255, 255, 0.18)` | Contenedores en foco y esquinas técnicas de tarjetas |
| **Texto Primario** | `--text-primary` | `#FFFFFF` | Titulares principales H1–H3 y cifras numéricas |
| **Texto Secundario** | `--text-secondary` | `#8A95A5` | Cuerpos de texto, descripciones técnicas y metadatos |
| **Texto Atenuado** | `--text-muted` | `#4B5565` | Notas al pie, identificadores de subsistema e información legal |
| **Acento Ámbar Solar** | `--accent-amber` | `#E5A958` | Botones de postulación, insignias de proyectos emblema |
| **Acento Cian Criogénico** | `--accent-cyan` | `#48CAE4` | Enlaces a documentación técnica, etiquetas de subsistema |
| **Estado Operativo Real** | `--status-active` | `#2DD4BF` | Indicador de convocatoria abierta, hitos completados |

### 3.3. Jerarquía Tipográfica
* **Display / Identidad Aeroespacial:** `Horizon` (Aerospace display font, mayúsculas geométricas de alto impacto cinemático para la marca principal `USACH SPACE PROGRAM`).
* **Titulares & Subtitulares:** `Now` (Geometric sans-serif de alta pureza y elegancia editorial para H2, H3, H4, H5, fichas técnicas y botones).
* **Lectura Prosa / Editorial:** `Inter` y `Now` para legibilidad continua de alta fidelidad.
* **Telemetría y Parámetros Numéricos:** `JetBrains Mono` con soporte tabular (`font-variant-numeric: tabular-nums`).

---

## 4. Curaduría de Fotografía y Gráficos Reales

* **Hero Section:** Fotografía astronómica real de gran escala de misiones de exploración espacial con encuadre asimétrico monumental. Se aplica un viñeteado gradual para garantizar contraste WCAG AAA en los bloques de texto.
* **Proyectos Emblema e Iniciativas Formativas:**
  * Fotografías y renders reales del repositorio del equipo (`src/assets/images/rover/`, `src/assets/images/gallery/`).
  * Planos vectoriales limpios (CAD wireframe) e infografías esquemáticas reales de los subsistemas (Rocker-Bogie, fuselaje hidroneumático de 1 y 3 unidades, estructura CubeSat 1U).

---

## 5. Arquitectura de Información y Wireframe Estructural (Home)

### 5.1. Wireframe Desktop (1440px+)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ [TOP BAR INSTITUCIONAL] UNIVERSIDAD DE SANTIAGO DE CHILE | CENTRO DE INNOVACIÓN | ACHIDE | VRAE       │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [NAVBAR STICKY]                                                                                        │
│ [ USP LOGO ]  USACH Space Program    [01. EJES TÉCNICOS]  [02. PROYECTOS]  [03. NOSOTROS]  [04. ALIANZAS]│
│                                                [ POSTULAR AL EQUIPO (BOTÓN ÁMBAR) ] [ ACCESO MIEMBROS ]│
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [1. HERO SECTION: PROPUESTA DE VALOR REAL & MANIFIESTO]                                                │
│ ┌──────────────────────────────────────────────┐ ┌───────────────────────────────────────────────────┐ │
│ │ [LOGO BLANCO USP EN ALTA DEFINICIÓN]         │ │          [VIDEO PLANETA EN ROTACIÓN]              │ │
│ │ [BADGE: PROGRAMA AEROESPACIAL ESTUDIANTIL]   │ │       Curvatura terrestre / órbita real           │ │
│ │                                              │ │       Loop cinemático NASA SVS con retícula HUD   │ │
│ │ H1: USACH SPACE PROGRAM                      │ │       y dial técnico (Inspiración Proxima B UI)   │ │
│ │                                              │ │                                                   │ │
│ │ Cita Manifiesto en bloque editorial:         │ │       Overlay esquemático técnico real:           │ │
│ │ «La ciencia no pertenece a un solo hombre    │ │       • Rover Perseverance (Replica Platform)     │ │
│ │  ni a una sola época; pertenece a cualquiera │ │       • Cohete de Sondeo Hidroneumático (3 Unid.) │ │
│ │  que esté dispuesto a sacrificar su presente │ │       • Plataforma CubeSat 1U FlatSat             │ │
│ │  por el progreso del mañana.»                │ │                                                   │ │
│ │                                              │ │       [SEDE: SANTIAGO, CHILE | USACH]             │ │
│ │ [ CTA PRIMARIO: POSTULAR A CONVOCATORIA ]    │ │                                                   │ │
│ │ [ CTA SECUNDARIO: PONTE EN CONTACTO ]        │ │       [CORREO: spaceprogram@usach.cl]             │ │
│ └──────────────────────────────────────────────┘ └───────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [2. MÉTRICAS REALES DE IMPACTO ORGANIZACIONAL]                                                         │
│ ┌──────────────────────┬──────────────────────┬──────────────────────┬───────────────────────────────┐ │
│ │ 03                   │ 16+                  │ 03                   │ 05                            │ │
│ │ EJES DE DESARROLLO   │ ESTUDIANTES ACTIVOS  │ PROYECTOS EMBLEMA    │ ALIANZAS Y APOYOS             │ │
│ │ Robótica, Cohetería  │ Estudiantes de varias│ Rover, Cohete 3 Unid,│ USACH, Centro Innovación,     │ │
│ │ y Sistemas Orbitales │ ingenierías y ciencias│ CubeSat 1U FlatSat   │ ACHIDE, VRAE y Full 3D        │ │
│ └──────────────────────┴──────────────────────┴──────────────────────┴───────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [3. LOS 3 EJES ESTRATÉGICOS DE DESARROLLO (ESTATUS VIGENTE)]                                           │
│ "Estructura operativa orientada al aprendizaje práctico, prototipado y validación de hardware espacial:"│
│ ┌─────────────────────────────┬─────────────────────────────┬────────────────────────────────────────┐ │
│ │ EJE 01: ROBÓTICA Y          │ EJE 02: COHETERÍA Y         │ EJE 03: SISTEMAS ORBITALES Y           │ │
│ │ MECÁNICA ESPACIAL           │ PROPULSIÓN                  │ TELECOMUNICACIONES                     │ │
│ ├─────────────────────────────┼─────────────────────────────┼────────────────────────────────────────┤ │
│ │ • Líderes: César Olivares   │ • Líderes: Alessandro O.    │ • Líderes: Daniel González             │ │
│ │   y Alessandro Orellano     │   y Simón García-Huidobro   │   y Martín Castillo                    │ │
│ │ • Integrantes activos: 2    │ • Integrantes activos: 7    │ • Integrantes activos: 7               │ │
│ │ • Proyecto Emblema:         │ • Proyecto Emblema:         │ • Proyecto Emblema: CubeSat 1U         │ │
│ │   Rover Perseverance        │   Cohete de Agua (3 Unid.)  │ • Enfoque: Arquitectura OBC / COMMS,   │ │
│ │ • Enfoque: Autonomía, BMS,  │ • Enfoque: Vector multietapa│   banco de pruebas FlatSat en lab,     │ │
│ │   visión y mecanismos para  │   aerodinámica, paracaídas  │   telemetría y estación terrena hacia  │ │
│ │   ambientes hostiles.       │   y transición a sólido.    │   pruebas en estratosfera.             │ │
│ └─────────────────────────────┴─────────────────────────────┴────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [4. CATÁLOGO DE PROYECTOS TÉCNICOS: EMBLEMA & FORMATIVOS]                                              │
│ [FILTROS: TODOS // PROYECTOS EMBLEMA // INICIATIVAS FORMATIVAS DE ONBOARDING]                          │
│                                                                                                        │
│ ── PROYECTOS EMBLEMA (DESARROLLO AVANZADO) ────────────────────────────────────────────────────────── │
│ ┌───────────────────────────────┬───────────────────────────────┬────────────────────────────────────┐ │
│ │ [CARD: ROVER PERSEVERANCE]    │ │ [CARD: COHETE AGUA (3 UNID)]│ │ [CARD: CUBESAT 1U / FLATSAT]     │ │
│ │ Eje: Robótica & Mecánica      │ │ Eje: Cohetería & Propulsión │ │ Eje: Sistemas Orbitales & Telecom│ │
│ │ Plataforma Robótica Mascota   │ │ Vector multietapa (3 unid.) │ │ Arquitectura modular de bus satel│ │
│ │ con cinemática Rocker-Bogie,  │ │ para caracterización de     │ │ con integración FlatSat en banco │ │
│ │ navegación autónoma y LiDAR.  │ │ empuje, apogeo y eyección.  │ │ de laboratorio y estación tierra.│ │
│ │ [Ver Ficha Técnica ->]        │ │ [Ver Ficha Técnica ->]      │ │ [Ver Ficha Técnica ->]           │ │
│ └───────────────────────────────┴───────────────────────────────┴────────────────────────────────────┘ │
│                                                                                                        │
│ ── INICIATIVAS FORMATIVAS Y DE COMUNIDAD (ONBOARDING) ──────────────────────────────────────────────── │
│ ┌───────────────────────────────┬───────────────────────────────┬────────────────────────────────────┐ │
│ │ [CARD: MINI-CUBESAT]          │ │ [CARD: SALVA A USACHI]      │ │ [CARD: COHETE DE AGUA (1 UNID)]  │ │
│ │ Introducción práctica a la    │ │ Actividad tipo Egg Drop:    │ │ Vector hidroneumático unitario   │ │
│ │ arquitectura satelital,       │ │ absorción de impacto y      │ │ para aprendizaje de física, aero-│ │
│ │ empaquetamiento y sensórica.  │ │ estructuras de sacrificio.  │ │ dinámica (CG vs CP) y eyección.  │ │
│ │ [Ver Iniciativa ->]           │ │ [Ver Actividad ->]          │ │ [Ver Iniciativa ->]              │ │
│ └───────────────────────────────┴───────────────────────────────┴────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [5. FILOSOFÍA, GOBERNANZA & REGISTRO DE OPERACIONES]                                                   │
│ ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ FILOSOFÍA DE TRABAJO: «PIENSA - CREA - APRENDE»                                                    │ │
│ │ Metodología basada en registro riguroso de pruebas de laboratorio, documentación abierta            │ │
│ │ (Open Source) y trabajo interdisciplinario horizontal.                                             │ │
│ │ [GALERÍA REAL DE OPERACIONES: Robótica, Aviónica, Cohetería, Vinculación UAI, Campo]               │ │
│ └────────────────────────────────────────────────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [6. TERMINAL DE CONVERSIÓN DUAL (ESTUDIANTES & PROFESIONALES / EMPRESAS)]                             │
│ ┌──────────────────────────────────────────────┬─────────────────────────────────────────────────────┐ │
│ │ PARA ESTUDIANTES USACH                       │ ¿ERES PROFESIONAL U EMPRESA?                        │ │
│ │ «¿Eres estudiante y buscas construir         │ «Si gustan en apoyar los distintos proyectos...     │ │
│ │ proyectos reales?»                           │ cualquier aporte u apoyo tanto económico como en    │ │
│ │ Formación práctica en talleres y prototipado.│ conocimiento u espacio son un paso...»              │ │
│ │ [ BOTÓN: POSTULAR A CONVOCATORIA 2026 ]      │ [ BOTÓN: PONTE EN CONTACTO CON NOSOTROS ]           │ │
│ └──────────────────────────────────────────────┴─────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [7. RED DE ALIANZAS Y RESPALDO INSTITUCIONAL]                                                          │
│ [Logo: USACH]  [Logo: Centro de Innovación]  [Logo: ACHIDE]  [Logo: VRAE]  [Logo: Full 3D]             │
├────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ [8. FOOTER TÉCNICO E INSTITUCIONAL]                                                                    │
│ USACH Space Program | Universidad de Santiago de Chile, Santiago, Chile | spaceprogram@usach.cl         │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 5.2. Adaptación Mobile (< 768px)
* **Top Bar:** Formato continuo: `USACH | CENTRO DE INNOVACIÓN | ACHIDE | VRAE | FULL 3D`.
* **Hero:** Tipografía H1 a `32px` con alto contraste y botones apilados al 100% de ancho con área táctil mínima de `48px`.
* **Métricas:** Cuadrícula de `2x2` con cifras monoespaciadas y etiquetas legibles.
* **Ejes Técnicos:** 3 tarjetas verticales apiladas con líder técnico, miembros y proyecto emblema.
* **Catálogo de Proyectos:** Pestañas interactivas («Proyectos Emblema» / «Iniciativas Formativas») para organizar los 6 proyectos sin saturación.

---

## 6. Especificación Técnica de Componentes y Microinteracciones

### 6.1. Borde Técnico con Esquinas de Calibración (1px CSS Grid)
Aplica a tarjetas de proyectos y contenedores de ejes técnicos, ofreciendo un acabado pulido sin sobrecargar la GPU:

```css
.tech-card {
  position: relative;
  background-color: var(--bg-space-surface, #070B14);
  border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
  padding: 1.75rem;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.tech-card::before,
.tech-card::after {
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  border-color: rgba(255, 255, 255, 0.2);
  pointer-events: none;
  transition: border-color 0.2s ease, width 0.2s ease, height 0.2s ease;
}

.tech-card::before {
  top: -1px;
  left: -1px;
  border-top: 1.5px solid;
  border-left: 1.5px solid;
}

.tech-card::after {
  bottom: -1px;
  right: -1px;
  border-bottom: 1.5px solid;
  border-right: 1.5px solid;
}

.tech-card:hover {
  border-color: var(--border-hud, rgba(255, 255, 255, 0.25));
  transform: translateY(-2px);
}

.tech-card:hover::before,
.tech-card:hover::after {
  border-color: var(--accent-amber, #E5A958);
  width: 10px;
  height: 10px;
}
```

### 6.2. Botones de Acción Dual (Estudiantes vs. Empresas)

```css
/* Botón Primario: Convocatoria Estudiantil */
.btn-primary-tech {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.75rem;
  background: var(--accent-amber, #E5A958);
  color: #030508;
  font-family: var(--font-display, 'Space Grotesk', sans-serif);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  border: 1px solid var(--accent-amber, #E5A958);
  border-radius: 2px;
  letter-spacing: 0.02em;
  transition: filter 0.2s ease, transform 0.15s ease;
}

.btn-primary-tech:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}

/* Botón Secundario: Contacto Institucional y Patrocinio */
.btn-secondary-tech {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.75rem;
  background: transparent;
  color: var(--text-primary, #FFFFFF);
  font-family: var(--font-display, 'Space Grotesk', sans-serif);
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.btn-secondary-tech:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.4);
}
```

---

## 7. Criterios de Aceptación y Checklist para Desarrollo

1. [ ] **Veracidad Total de Datos:** Todas las métricas (16+ miembros, 3 ejes, líderes técnicos, proyectos) coinciden rigurosamente con los avances de la organización.
2. [ ] **Iniciativas Formativas Actualizadas:** "Mini-CubeSat", "Salva a Usachi" y "Cohete de Agua (1 Unidad)" reflejados con precisión didáctica.
3. [ ] **Accesibilidad y Contraste:** Ratios de contraste WCAG AA/AAA verificados sobre fondos `#030508`.
4. [ ] **Rendimiento Móvil:** 60 FPS garantizados sin saturación de scripts de animación o Canvas innecesarios en smartphones.
5. [ ] **Rutas y Enlaces Funcionales:** El botón de postulación conduce al formulario activo y el botón institucional enlaza directamente con `mailto:spaceprogram@usach.cl`.
