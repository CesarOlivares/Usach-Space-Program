---
title: "Plataforma Rover Avanzada"
description: "Vehículo robótico análogo para la investigación de sistemas de navegación autónoma, cinemática de terrenos hostiles y manipulación de muestras."
axisLevel: "Level 2"
layoutType: "sidebar-gold"
backgroundImage: "../../assets/gallery/IMG-20260607-WA0030.jpg"
specs:
  costo: "Investigación & Desarrollo Avanzado"
  tiempo: "Fase Operativa Continua"
  rol: "Plataforma de I+D (Flagship)"
  recompensa: "Desarrollo del hardware estandarte mecatrónico del programa."
  referenceLink: "https://howtomechatronics.com/projects/diy-mars-perseverance-rover-replica-with-arduino/"
  referenceLabel: "Documentación HowToMechatronics ↗"
  techStack: |
    • Impresión 3D (PETG/ABS)
    • C/C++ (Microcontroladores)
    • ROS (Robot Operating System)
    • Fusión Sensorial (IMU + Lidar)
---

## Contexto y Arquitectura Base

El desarrollo de nuestra plataforma insignia de superficie comienza con el estudio y asimilación de la arquitectura de suspensión **Rocker-Bogie**, el estándar de oro utilizado por el JPL de la NASA en misiones marcianas. Para la estructuración inicial del chasis y la validación cinemática de este modelo a escala, nuestro equipo tomó como referencia de estudio la réplica de código abierto documentada por el proyecto *HowToMechatronics*. Esta base de conocimiento nos permitió superar rápidamente los problemas de tracción iniciales para concentrar nuestros recursos de ingeniería en la personalización y escalabilidad del vehículo.

## Desarrollo: Innovaciones USP

Nuestra directiva técnica se encuentra expandiendo agresivamente las capacidades del rover base mediante el diseño e integración de subsistemas de hardware y software originales orientados a simular operaciones extravehiculares complejas.

### Sub-sistemas Principales

- **Módulo de Sensores LIDAR:** Implementación de mapeo láser 2D/3D (SLAM) para el reconocimiento del entorno, permitiendo la transición del control por radiofrecuencia a rutinas de navegación verdaderamente autónomas y evasión dinámica de obstáculos.
- **Gestión de Potencia (EPS):** Diseñando mecanismos de despliegue para matrices de paneles solares a escala. Este sistema incluye la gestión de carga de bancos de baterías Li-ion y el monitoreo de telemetría de consumo en tiempo real.
- **Brazo Robótico Articulado:** Desarrollo mecatrónico de un manipulador espacial con múltiples grados de libertad (DOF), acoplado a la bahía delantera del chasis para operaciones de precisión.
- **End-Effectors Intercambiables:** Ingeniería de un sistema de acople rápido en el efector final del brazo robótico, permitiendo al rover cambiar de herramientas (pinzas de extracción, taladros de muestreo o cámaras de inspección) según los requerimientos de la misión.
