# 14 · Quiénes somos, login y panel de novedades

## Qué se cambió

**Página nueva `/quienes-somos/`.**
- **Directiva 2026:** foto grupal y 6 tarjetas (foto, cargo, eje, carrera). Cada tarjeta abre una ficha con la bio y el contacto; se puede enlazar directo a una persona con `/quienes-somos/#slug`.
- **Nuestros comienzos:** la foto de los fundadores con el rover y la historia breve del programa.
- **Datos:** `src/js/data/equipo.js`. Las fotos van en `src/assets/images/equipo/`.
- **Menú:** "Nosotros" en el menú de todas las páginas y "Quiénes somos" en el pie.

**Inicio.** Sección "Juntos llegamos más lejos" antes de la galería, con la foto de los fundadores y un enlace a la página nueva.

**Login y panel (Supabase).**
- **`/login/`:** ingreso con correo y contraseña. Solo entran las cuentas que están en la tabla `admins`.
- **`/panel/`:** editor de novedades. Crea, edita, guarda borradores, publica y elimina. Las fotos se achican a 1.400 px, se convierten a WebP en el navegador y se suben a la carpeta `novedades` de Supabase Storage.
- **Noticias del archivo:** las de `noticias.js` aparecen como "En el código". Al guardarlas en el panel pasan a Supabase con sus fotos, y desde entonces se editan solo ahí.
- **Inicio y /novedades/:** juntan las noticias del panel con las de `noticias.js`; si el slug se repite, gana la del panel. Si Supabase no responde en 3,5 s, se muestran solo las del archivo.
- **Base de datos:** `supabase/01-esquema.sql` (tablas, reglas RLS, carpeta de fotos) y `supabase/02-agregar-admin.sql` (dar permisos). Se corren a mano en el SQL Editor de Supabase.

## Por qué

- Publicar una noticia exigía editar el repositorio. Ahora la directiva lo hace desde la web.
- "Quiénes somos" estaba pendiente desde el registro 13.

## Pendiente

- [ ] **Fotos en alta resolución** de Daniel, Benjamín y Martín (hoy son las versiones chicas del documento).
- [ ] **Liderazgo de Cohetería:** el documento de la directiva dice que Alessandro (Hugo) Orellano es co-líder de Robótica; otras páginas aún lo nombran como líder de Cohetería.
- [ ] **Registro abierto en Supabase:** desactivar "Allow new users to sign up" (Authentication → Sign In / Providers).
- [ ] **Cambiar contraseña** desde el panel.
- [ ] **Calendario y pendientes** del panel (bosquejo aprobado en conversación, sin implementar).
