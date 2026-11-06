// Panel interno: editor de novedades conectado a Supabase.
import { supabase, BUCKET_FOTOS } from '../lib/supabase.js';
import { noticias as delArchivo } from '../data/noticias.js';

const EJE_LABEL = { robotica: 'Robótica', coheteria: 'Cohetería', orbital: 'Sistemas Orbitales', comunidad: 'Comunidad' };
const MAX_LADO = 1400;
const MARCA_STORAGE = `/storage/v1/object/public/${BUCKET_FOTOS}/`;

const escapeHtml = (t = '') => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const slugify = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'noticia';
const hoy = () => new Date().toLocaleDateString('sv-SE');
const parseDate = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };
const enStorage = (src) => src.includes(MARCA_STORAGE);
const rutaStorage = (src) => decodeURIComponent(src.split(MARCA_STORAGE)[1] || '');

const $ = (id) => document.getElementById(id);
const form = $('form');

let notas = [];      // { id?, origen: 'panel' | 'archivo', estado, ...campos, fotos: [{ src, alt, blob? }] }
let actual = null;
let sucio = false;
let guardando = false;

// ---------- Cuadro de confirmación propio ----------
// (los cuadros nativos del navegador se bloquean en algunos navegadores integrados)
function preguntar({ titulo, texto = '', aceptar = 'Aceptar', peligro = false, valor = null }) {
    const dlg = $('dialogo');
    const campo = $('dialogoCampo');
    const btn = $('dialogoAceptar');
    $('dialogoTitulo').textContent = titulo;
    $('dialogoTexto').textContent = texto;
    $('dialogoTexto').hidden = !texto;
    btn.textContent = aceptar;
    btn.classList.toggle('p-btn-peligro-lleno', peligro);
    campo.hidden = valor === null;
    campo.value = valor ?? '';
    dlg.returnValue = '';
    dlg.showModal();
    if (valor !== null) campo.focus(); else btn.focus();
    return new Promise((resolve) => {
        dlg.addEventListener('close', () => {
            const ok = dlg.returnValue === 'aceptar';
            resolve(valor === null ? ok : (ok ? campo.value : null));
        }, { once: true });
    });
}

// ---------- Sesión ----------
async function verificarSesion() {
    const { data } = await supabase.auth.getSession();
    if (!data.session) return location.replace('/login/');
    const { data: esAdmin } = await supabase.rpc('es_admin');
    if (!esAdmin) {
        await supabase.auth.signOut();
        return location.replace('/login/');
    }
    $('usuario').textContent = data.session.user.email;
    return true;
}

$('salir').addEventListener('click', async () => {
    if (sucio && !(await preguntar({ titulo: '¿Salir sin guardar?', texto: 'Tienes cambios sin guardar en esta noticia.', aceptar: 'Salir igual' }))) return;
    await supabase.auth.signOut();
    location.replace('/login/');
});

supabase.auth.onAuthStateChange((evento) => {
    if (evento === 'SIGNED_OUT') location.replace('/login/');
});

window.addEventListener('beforeunload', (e) => {
    if (sucio) { e.preventDefault(); e.returnValue = ''; }
});

// ---------- Datos ----------
async function cargar() {
    const { data, error } = await supabase.from('noticias').select('*').order('fecha', { ascending: false });
    if (error) throw error;
    const delPanel = data.map((f) => ({ ...f, origen: 'panel', fotos: [...(f.fotos || [])] }));
    const slugs = new Set(delPanel.map((n) => n.slug));
    const soloArchivo = delArchivo
        .filter((n) => !slugs.has(n.slug))
        .map((n) => ({ ...n, cuerpo: [...n.cuerpo], fotos: n.fotos.map((f) => ({ ...f })), origen: 'archivo', estado: 'publicada', destacada: !!n.destacada, afiches: !!n.afiches }));
    notas = [...delPanel, ...soloArchivo].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

// ---------- Lista ----------
function badge(n) {
    if (n.origen === 'archivo') return '<span class="l-badge archivo">En el código</span>';
    if (n.estado === 'borrador') return '<span class="l-badge borrador">Borrador</span>';
    if (n.destacada) return '<span class="l-badge destacada">Destacada</span>';
    return '<span class="l-badge publicada">Publicada</span>';
}

function renderLista() {
    $('lista').innerHTML = notas.map((n, i) => {
        const mini = n.fotos[0] ? `<img class="l-mini" src="${escapeHtml(n.fotos[0].src)}" alt="">` : '<span class="l-mini"></span>';
        return `<li><button type="button" data-i="${i}" aria-current="${n === actual}">
            ${mini}<span class="l-titulo">${escapeHtml(n.titulo || 'Sin título')}</span>
            <span class="l-meta">${n.fecha ? parseDate(n.fecha).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'} ${badge(n)}</span>
        </button></li>`;
    }).join('');
}

const puedeSalir = async () => !sucio || preguntar({ titulo: '¿Descartar los cambios?', texto: 'Tienes cambios sin guardar en esta noticia.', aceptar: 'Descartar', peligro: true });

$('lista').addEventListener('click', async (e) => {
    const b = e.target.closest('button[data-i]');
    if (!b || guardando) return;
    const elegida = notas[Number(b.dataset.i)];
    if (elegida === actual || !(await puedeSalir())) return;
    descartarNuevaVacia();
    actual = elegida;
    cargarForm();
});

// Una noticia nueva que nunca se guardó se quita al cambiar de noticia
function descartarNuevaVacia() {
    if (actual && actual.origen === 'nueva') notas = notas.filter((n) => n !== actual);
}

$('nueva').addEventListener('click', async () => {
    if (guardando || !(await puedeSalir())) return;
    descartarNuevaVacia();
    actual = { origen: 'nueva', slug: '', titulo: '', fecha: hoy(), eje: 'comunidad', lugar: 'Universidad de Santiago de Chile', resumen: '', cuerpo: [], fotos: [], estado: 'borrador', destacada: false, afiches: false };
    notas.unshift(actual);
    cargarForm();
    form.titulo.focus();
});

// ---------- Formulario ----------
function cargarForm() {
    form.titulo.value = actual.titulo;
    form.fecha.value = actual.fecha;
    form.eje.value = actual.eje;
    form.lugar.value = actual.lugar || '';
    form.resumen.value = actual.resumen || '';
    form.cuerpo.value = (actual.cuerpo || []).join('\n\n');
    form.destacada.checked = !!actual.destacada;
    form.afiches.checked = !!actual.afiches;
    $('formTitulo').textContent = actual.origen === 'nueva' ? 'Nueva noticia' : 'Editar noticia';
    $('borrar').hidden = actual.origen !== 'panel';
    sucio = false;
    limpiarErrores();
    actualizarEstado();
    renderFotos();
    renderLista();
    renderPreview();
    contadores();
}

function leerForm() {
    actual.titulo = form.titulo.value.trim();
    actual.fecha = form.fecha.value;
    actual.eje = form.eje.value;
    actual.lugar = form.lugar.value.trim();
    actual.resumen = form.resumen.value.trim();
    actual.cuerpo = form.cuerpo.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    actual.destacada = form.destacada.checked;
    actual.afiches = form.afiches.checked;
}

function contadores() {
    document.querySelectorAll('.p-contador').forEach((el) => {
        const largo = form[el.dataset.for].value.length;
        const limite = el.dataset.for === 'titulo' ? 70 : 220;
        el.textContent = `${largo}/${limite}`;
        el.classList.toggle('is-largo', largo > limite);
    });
}

function actualizarEstado(texto) {
    if (texto) { $('estado').textContent = texto; return; }
    $('estado').textContent = {
        nueva: 'Sin guardar',
        archivo: 'En el código del sitio',
        panel: actual.estado === 'borrador' ? 'Borrador' : 'Publicada'
    }[actual.origen];
}

function marcarSucio() {
    sucio = true;
    actualizarEstado('Cambios sin guardar');
}

form.addEventListener('input', (e) => {
    leerForm();
    e.target.removeAttribute('aria-invalid');
    $('error').hidden = true;
    marcarSucio();
    contadores();
    renderPreview();
    renderLista();
});

function limpiarErrores() {
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    $('error').hidden = true;
}

function mostrarError(texto) {
    $('error').textContent = texto;
    $('error').hidden = false;
}

function validar(publicar) {
    limpiarErrores();
    const faltan = [];
    const marcar = (campo, texto) => { faltan.push(texto); form[campo]?.setAttribute('aria-invalid', 'true'); };
    if (!actual.titulo) marcar('titulo', 'el título');
    if (!actual.fecha) marcar('fecha', 'la fecha');
    if (publicar) {
        if (!actual.resumen) marcar('resumen', 'el resumen');
        if (!actual.cuerpo.length) marcar('cuerpo', 'el texto');
        if (!actual.fotos.length) faltan.push('al menos una foto');
    }
    if (faltan.length) {
        mostrarError(`${publicar ? 'Para publicar' : 'Para guardar'} falta ${faltan.join(', ')}.`);
        return false;
    }
    return true;
}

// ---------- Guardar ----------
async function subirFotos(slug) {
    const subidas = [];
    for (const [i, f] of actual.fotos.entries()) {
        if (enStorage(f.src)) { subidas.push({ src: f.src, alt: f.alt }); continue; }
        actualizarEstado(`Subiendo foto ${i + 1} de ${actual.fotos.length}…`);
        // Las fotos nuevas ya vienen procesadas; las del archivo se procesan aquí
        const blob = f.blob || (await procesar(await (await fetch(f.src)).blob())).blob;
        const ruta = `${slug}/${Date.now()}-${i + 1}.webp`;
        const { error } = await supabase.storage.from(BUCKET_FOTOS).upload(ruta, blob, { contentType: 'image/webp', cacheControl: '31536000' });
        if (error) throw error;
        const { data } = supabase.storage.from(BUCKET_FOTOS).getPublicUrl(ruta);
        subidas.push({ src: data.publicUrl, alt: f.alt });
    }
    return subidas;
}

async function slugLibre(base) {
    let slug = base;
    for (let n = 2; n < 50; n++) {
        const { data } = await supabase.from('noticias').select('id').eq('slug', slug).maybeSingle();
        if (!data) return slug;
        slug = `${base}-${n}`;
    }
    return `${base}-${Date.now()}`;
}

async function guardar(estado) {
    if (guardando) return;
    leerForm();
    if (!validar(estado === 'publicada')) return;

    guardando = true;
    document.body.setAttribute('aria-busy', 'true');
    try {
        const slug = actual.origen === 'panel' ? actual.slug
            : actual.origen === 'archivo' ? actual.slug
            : await slugLibre(slugify(actual.titulo));

        const fotos = await subirFotos(slug);
        actualizarEstado('Guardando…');

        // Solo puede haber una destacada: se apaga la anterior
        if (actual.destacada && estado === 'publicada') {
            const q = supabase.from('noticias').update({ destacada: false }).eq('destacada', true);
            const { error } = actual.id ? await q.neq('id', actual.id) : await q;
            if (error) throw error;
        }

        const fila = {
            slug,
            titulo: actual.titulo,
            fecha: actual.fecha,
            eje: actual.eje,
            lugar: actual.lugar,
            resumen: actual.resumen,
            cuerpo: actual.cuerpo,
            fotos,
            enlace: actual.enlace || null,
            destacada: actual.destacada && estado === 'publicada',
            afiches: actual.afiches,
            estado
        };

        const { data, error } = actual.id
            ? await supabase.from('noticias').update(fila).eq('id', actual.id).select().single()
            : await supabase.from('noticias').insert(fila).select().single();
        if (error) throw error;

        const idx = notas.indexOf(actual);
        actual = { ...data, origen: 'panel', fotos: [...data.fotos] };
        notas[idx] = actual;
        if (actual.destacada) notas.forEach((n) => { if (n !== actual) n.destacada = false; });
        notas.sort((a, b) => b.fecha.localeCompare(a.fecha));
        cargarForm();
        actualizarEstado(estado === 'publicada' ? 'Publicada ✓' : 'Borrador guardado ✓');
    } catch (err) {
        console.error(err);
        mostrarError(`No se pudo guardar: ${err.message || err}. Tus cambios siguen en el formulario.`);
        actualizarEstado('Error al guardar');
    } finally {
        guardando = false;
        document.body.removeAttribute('aria-busy');
    }
}

form.addEventListener('submit', (e) => { e.preventDefault(); guardar('publicada'); });
$('borrador').addEventListener('click', () => guardar('borrador'));

$('borrar').addEventListener('click', async () => {
    if (actual.origen !== 'panel' || guardando) return;
    const delCodigo = delArchivo.some((n) => n.slug === actual.slug);
    const ok = await preguntar({
        titulo: `¿Eliminar "${actual.titulo}"?`,
        texto: delCodigo
            ? 'Se borra la versión del panel. Esta noticia también está escrita en el código del sitio, así que volverá a aparecer como "En el código" con su contenido original.'
            : 'Se borra del sitio junto con sus fotos. No se puede deshacer.',
        aceptar: 'Eliminar',
        peligro: true
    });
    if (!ok) return;
    actualizarEstado('Eliminando…');
    const { data: borradas, error } = await supabase.from('noticias').delete().eq('id', actual.id).select('id');
    if (error) return mostrarError(`No se pudo eliminar: ${error.message}`);
    if (!borradas?.length) return mostrarError('Supabase no borró la noticia (¿tu cuenta sigue siendo admin?). Recarga la página e inténtalo de nuevo.');
    const rutas = actual.fotos.filter((f) => enStorage(f.src)).map((f) => rutaStorage(f.src));
    if (rutas.length) await supabase.storage.from(BUCKET_FOTOS).remove(rutas);
    sucio = false;
    await cargar();
    actual = notas[0];
    cargarForm();
});

// ---------- Fotos ----------
function renderFotos() {
    $('fotos').innerHTML = actual.fotos.map((f, i) => `
        <div class="p-foto${i === 0 ? ' is-portada' : ''}" draggable="true" data-i="${i}" title="${escapeHtml(f.alt)}">
            <img src="${escapeHtml(f.src)}" alt="${escapeHtml(f.alt)}">
            ${i === 0 ? '<span class="p-foto-tag">Portada</span>' : ''}
            <button type="button" class="p-foto-alt" data-alt="${i}" aria-label="Describir foto">✎</button>
            <button type="button" class="p-foto-quitar" data-quitar="${i}" aria-label="Quitar foto">×</button>
        </div>`).join('') + `
        <label class="p-foto-subir"><span aria-hidden="true">↑</span>Subir fotos
            <input type="file" id="subir" accept="image/jpeg,image/png,image/webp" multiple>
        </label>`;
}

function trasCambioFotos() {
    marcarSucio();
    renderFotos(); renderPreview(); renderLista();
}

$('fotos').addEventListener('click', (e) => {
    const q = e.target.closest('[data-quitar]');
    if (q) { actual.fotos.splice(Number(q.dataset.quitar), 1); trasCambioFotos(); return; }
    const a = e.target.closest('[data-alt]');
    if (a) {
        const f = actual.fotos[Number(a.dataset.alt)];
        preguntar({ titulo: 'Describir la foto', texto: 'Una frase sobre lo que se ve. La leen los lectores de pantalla y aparece si la imagen no carga.', aceptar: 'Guardar', valor: f.alt }).then((texto) => {
            if (texto !== null) { f.alt = texto.trim(); trasCambioFotos(); }
        });
    }
});

let arrastrando = null;
$('fotos').addEventListener('dragstart', (e) => {
    const f = e.target.closest('.p-foto');
    if (!f) return;
    arrastrando = Number(f.dataset.i);
    f.classList.add('is-dragging');
});
$('fotos').addEventListener('dragover', (e) => { if (arrastrando !== null) e.preventDefault(); });
$('fotos').addEventListener('drop', (e) => {
    e.preventDefault();
    const f = e.target.closest('.p-foto');
    if (!f || arrastrando === null) return;
    const [mov] = actual.fotos.splice(arrastrando, 1);
    actual.fotos.splice(Number(f.dataset.i), 0, mov);
    arrastrando = null;
    trasCambioFotos();
});
$('fotos').addEventListener('dragend', () => { arrastrando = null; renderFotos(); });

// Achica a 1.400 px y convierte a WebP en el navegador
async function procesar(file) {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, MAX_LADO / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * k);
    canvas.height = Math.round(bmp.height * k);
    canvas.getContext('2d').drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((r) => canvas.toBlob(r, 'image/webp', 0.8));
    return { blob, kb: Math.round(blob.size / 1024) };
}

$('fotos').addEventListener('change', async (e) => {
    if (e.target.id !== 'subir') return;
    const files = [...e.target.files];
    for (const [i, file] of files.entries()) {
        actualizarEstado(`Procesando foto ${i + 1} de ${files.length}…`);
        try {
            const { blob, kb } = await procesar(file);
            actual.fotos.push({ src: URL.createObjectURL(blob), alt: '', blob });
            actualizarEstado(`${file.name}: ${Math.round(file.size / 1024)} KB → ${kb} KB`);
        } catch {
            mostrarError(`No se pudo leer ${file.name}. Prueba con un JPG o PNG.`);
        }
    }
    trasCambioFotos();
});

// ---------- Vista previa (mismo HTML que /novedades/) ----------
function renderPreview() {
    const n = actual;
    const fecha = n.fecha ? parseDate(n.fecha) : new Date();
    const dia = fecha.toLocaleDateString('es-CL', { day: 'numeric' });
    const mes = fecha.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' });
    const fotos = n.fotos.map((f, i) => `
        <span class="gallery-item${i === 0 ? ' is-cover' : ''}"><img src="${escapeHtml(f.src)}" alt="${escapeHtml(f.alt)}"></span>`).join('');
    $('preview').innerHTML = `
        <article class="nota" data-eje="${escapeHtml(n.eje)}">
            <div class="nota-aside">
                <time class="nota-fecha"><span class="nota-dia">${dia}</span><span class="nota-mes">${mes}</span></time>
                <p class="nota-tag">${escapeHtml(EJE_LABEL[n.eje] || n.eje)}</p>
                <p class="nota-lugar">${escapeHtml(n.lugar || '')}</p>
            </div>
            <div class="nota-main">
                <h2>${escapeHtml(n.titulo || 'Título de la noticia')}</h2>
                ${(n.cuerpo.length ? n.cuerpo : ['El texto de la noticia aparece aquí.']).map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
                ${n.fotos.length ? `<div class="nota-galeria${n.afiches ? ' nota-galeria--afiches' : ''}" data-count="${Math.min(n.fotos.length, 5)}">${fotos}</div>` : ''}
            </div>
        </article>`;
}

// ---------- Inicio ----------
(async () => {
    if (!(await verificarSesion())) return;
    try {
        await cargar();
    } catch (err) {
        $('cargando').textContent = `No se pudieron cargar las noticias: ${err.message}. ¿Ya se corrió supabase/01-esquema.sql?`;
        return;
    }
    $('cargando').hidden = true;
    $('panel').hidden = false;
    actual = notas[0];
    if (actual) cargarForm(); else $('nueva').click();
})();
