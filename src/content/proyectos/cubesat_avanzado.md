---
title: "Plataforma CubeSat 3U"
description: "Ingeniería de sistemas aeroespaciales en volumen restringido orientada a la validación de aviónica, comunicaciones en banda S y control de actitud."
axisLevel: "Level 2"
layoutType: "sidebar-gold"
backgroundImage: "../../assets/gallery/IMG-20260607-WA0039.jpg"
specs:
  costo: "Investigación & Desarrollo Avanzado"
  tiempo: "Fase de FlatSat y Placa Base"
  rol: "Plataforma de I+D (Flagship)"
  recompensa: "Desarrollo del hardware estandarte del programa satelital."
  referenceLink: "https://www.cubesat.org/cubesatinfo"
  referenceLabel: "Documentación CubeSat.org ↗"
  techStack: |
    • Diseño estructural 3U
    • FlatSat base de aviónica
    • Comunicaciones en Banda S
    • Control de actitud ADCS
---

## Contexto y Marco Normativo

El estándar CubeSat revolucionó el acceso al espacio al proporcionar especificaciones volumétricas y de masa claras (1U = 10x10x10 cm, aprox. 1.33 kg) compatibles con despliegues orbitales comerciales. Nuestro estandarte técnico institucional se acoge rigurosamente a la **Especificación de Diseño CubeSat (CDS)** redactada por Cal Poly y la Universidad de Stanford. Operar bajo este estándar asegura que nuestra plataforma de 3 Unidades (10x10x30 cm) cumpla con los requerimientos de la industria, garantizando viabilidad técnica para futuras misiones suborbitales u orbitales (LEO).

## Arquitectura del Bus Satelital

El desarrollo de un satélite de este calibre exige la división del trabajo en módulos altamente especializados. Actualmente nos encontramos en la fase de FlatSat (prototipado de aviónica en mesa) desarrollando los siguientes subsistemas:

### Subsistemas del Satélite

- **Computador de A Bordo y Manejo de Datos (OBC & C&DH):** El cerebro del satélite. Implementación de una arquitectura tolerante a fallos basada en microcontroladores de grado industrial para la recolección, empaquetado de telemetría y ejecución de rutinas de seguridad ante anomalías térmicas o de voltaje.
- **Comunicaciones y Telemetría (COMMS):** Establecimiento de un enlace bidireccional fiable. Diseño de antenas desplegables y transceptores para operar balizas UHF/VHF y transmisión de datos de carga útil mediante enlaces de mayor ancho de banda (Banda S).
- **Subsistema de Potencia Eléctrica (EPS):** La columna vertebral energética. Desarrollo de matrices solares montadas en el chasis y sistemas de gestión máxima del punto de potencia (MPPT) para alimentar eficientemente los componentes mientras se orbita en fases de eclipse.
- **Determinación y Control de Actitud (ADCS):** El desafío mecánico en el vacío. Desarrollo de algoritmos de fusión sensorial (magnetómetros, giroscopios, sensores solares) y actuadores físicos (ruedas de reacción y magnetorquers) para orientar el satélite y apuntar antenas/cargas útiles con precisión.
