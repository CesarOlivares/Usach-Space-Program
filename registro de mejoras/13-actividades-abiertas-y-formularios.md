# 13 · Actividades abiertas, formularios e Instagram

Responde parte de la auditoría (registro 12): los formularios, los desafíos, el líder de Cohetería, Instagram y la Convocatoria.

## Qué se cambió

**Hay dos formularios, y cada uno tiene su lugar.**

| Formulario | Para qué | Dónde se usa |
|---|---|---|
| `1W-IU1sk…` "Formulario de inscripción" | Postular a un proyecto emblema: Rover, CubeSat 1U o Cohete de agua | `/registro/`. El sitio envía los datos al formulario por detrás, como antes |
| `1ZGOaU90…` | Inscribirse en las actividades abiertas (es el mismo que abren los QR de los afiches) | `/talleres/` y las fichas. Los botones abren el formulario de Google en una pestaña nueva |

- **Registro.**
  - **Proyectos:** las opciones quedaron en los 3 proyectos emblema. Se quitó "CubeSat 3U", que ya no existe, junto con los desafíos y "Comunicaciones".
  - **Datos que se piden:** ahora se pide el nombre además del correo. El formulario de Google solo tiene el campo "nombre", así que se envía "Nombre — correo" en ese campo.
  - **Enlace:** se agregó un enlace a las actividades abiertas.
- **Talleres.**
  - **Antes:** el formulario propio de la página tenía la dirección de envío vacía, así que las postulaciones se perdían y aun así mostraba "recibida con éxito".
  - **Ahora:** la página se rehízo con el diseño nuevo y enlaza directo al formulario de Google. Ese formulario pide una cuenta de Google cualquiera, no de la USACH, por eso no se puede enviar por detrás.

**La página `/talleres/` ahora se llama "Actividades abiertas".**
- **Hero:** cierre de inscripciones el 4 de noviembre.
- **Actividades:** las 3 tarjetas con su afiche, que se abre en grande.
- **Cómo funciona:** cuatro pasos (inscripción, cupos, equipos de 3 en el bloque W3, prueba final en diciembre).
- **Cierre:** el botón al formulario y el Instagram.

**Las 3 actividades, según los afiches y lo que respondió el equipo:**
- **Común a las tres:** se abren todas, con equipos de 3, cualquier carrera, el bloque W3 de los miércoles, inscripción hasta el 4 de noviembre y trabajo hasta diciembre. Los cupos los define el equipo del programa.
- **Concurso de diseño de cohetes de agua:** es la misma actividad que antes figuraba como "Cohete de agua (1 unidad)". Su sección va en la ficha del cohete (`#formativo`). El premio es un kit de electrónica "y más", que se deja como sorpresa.
- **Salva a Usachín** (`/proyectos/eggdrop/`): ahora es diseñar y construir el paracaídas de un cohete. El premio es un peluche de Usachín. Se quitaron la cápsula de 1 litro, el dron, el sensor con pantalla OLED y el cronograma de 4 semanas.
- **Taller de desarrollo de CubeSats** (`/proyectos/cansat/`): reemplaza a "Misión: Mini CubeSat". Cada equipo arma y prueba un CubeSat funcional a lo largo del semestre. Se quitaron el dron a 30 m, los equipos de 2 a 4 y el trofeo.
- **El mini Rover** del plan FOE se descartó y no aparece.

**Otros cambios:**
- **Noticia nueva y destacada en el inicio:** "Inscripciones abiertas" (26 de octubre), con los 3 afiches. Las noticias con `afiches: true` muestran los afiches completos en una fila.
- **Tarjetas:** las actividades del inicio y de Proyectos usan los afiches y se agrupan como "Actividades abiertas" en vez de "Formativos".
- **Líder de Cohetería:** es **Hugo Orellano**, no Alessandro. Se corrigió en el inicio, Ejes, la ficha del cohete y `llms.txt`.
- **Instagram @usach_space_program:**
  - en el pie de todas las páginas con pie;
  - en el llamado final de `/talleres/`;
  - en los datos estructurados (`sameAs`);
  - en `llms.txt`.
- **`llms.txt`:** actualizado con las actividades y los dos formularios.

## Por qué

- Las fichas describían versiones antiguas de los desafíos, con detalles que no coincidían con los afiches, y el formulario de Talleres perdía las inscripciones.
- Enlazar al formulario de Google es más confiable que replicarlo en el sitio: no hay que mantener los campos en el código y siempre llega al mismo lugar que los QR.

## Pendiente

- [ ] **"Quiénes somos":** una sección futura con la directiva (César Olivares, Simón García-Huidobro, Hugo Orellano, Daniel González y Martín Castillo), la fecha de fundación (1 de abril de 2026), la misión y la visión del plan FOE.
- [ ] **Después del 4 de noviembre:** cambiar los textos de "inscripciones abiertas" y quitar la noticia destacada.
- [ ] **Archivos sin uso:** `admision_talleres.js` y `admision_talleres.css` quedaron sin uso (se pueden borrar junto con los otros archivos viejos).
- [ ] **Datos de Registro:** si el equipo agrega un campo "correo" al formulario de Google, separar el nombre y el correo en `registro.js`.
