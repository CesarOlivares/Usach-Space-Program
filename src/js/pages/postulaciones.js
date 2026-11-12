// Panel interno: postulaciones recibidas. Solo admins (RLS en Supabase).
import { supabase } from '../lib/supabase.js';
import { EJE_LABEL, HORAS_LABEL } from '../data/postulacion.js';

const $ = (id) => document.getElementById(id);
const escapeHtml = (t = '') => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

let filas = [];
let filtro = 'todos';

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
    await supabase.auth.signOut();
    location.replace('/login/');
});

function confirmar(titulo, texto) {
    const dlg = $('dialogo');
    $('dialogoTitulo').textContent = titulo;
    $('dialogoTexto').textContent = texto;
    dlg.returnValue = '';
    dlg.showModal();
    return new Promise((resolve) => dlg.addEventListener('close', () => resolve(dlg.returnValue === 'aceptar'), { once: true }));
}

const mostrarError = (texto) => { $('error').textContent = texto; $('error').hidden = false; };

async function cargar() {
    // Limpieza: lo que tenga más de 12 meses se borra, como dice la política de privacidad
    const limite = new Date();
    limite.setFullYear(limite.getFullYear() - 1);
    await supabase.from('postulaciones').delete().lt('creado_en', limite.toISOString());

    const { data, error } = await supabase.from('postulaciones').select('*').order('creado_en', { ascending: false });
    if (error) throw error;
    filas = data;
}

function mensajeDe(p) {
    const nombre = p.nombre.split(' ')[0];
    const eje = p.eje === 'no-se' ? 'el programa' : `el eje de ${EJE_LABEL[p.eje]}`;
    const asunto = encodeURIComponent('Tu postulación al USACH Space Program');
    const cuerpo = encodeURIComponent(`Hola ${nombre}:\n\nGracias por postular al USACH Space Program. Vimos tu interés en ${eje} y nos gustaría conocerte.\n\n¿Te acomoda reunirnos esta semana? Cuéntanos qué días y horarios puedes.\n\nSaludos,\n`);
    return `mailto:${encodeURIComponent(p.correo)}?subject=${asunto}&body=${cuerpo}`;
}

function render() {
    const visibles = filas.filter((p) => filtro === 'todos' || p.eje === filtro);
    $('resumen').textContent = filas.length === 1 ? '1 postulación pendiente' : `${filas.length} postulaciones pendientes`;
    $('vacio').hidden = visibles.length > 0;

    $('lista').innerHTML = visibles.map((p) => {
        const fecha = new Date(p.creado_en).toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' });
        const areas = (p.areas || []).map((a) => `<li>${escapeHtml(a)}</li>`).join('');
        return `
        <li class="post-card" data-eje="${escapeHtml(p.eje)}">
            <div class="post-card-head">
                <div>
                    <h2>${escapeHtml(p.nombre)}</h2>
                    <p class="post-meta">${escapeHtml(p.carrera)} · ingreso ${escapeHtml(p.anio_ingreso.replace('antes-', 'antes de '))}</p>
                </div>
                <time datetime="${escapeHtml(p.creado_en)}">${fecha}</time>
            </div>
            <dl class="post-datos">
                <div><dt>Eje</dt><dd>${escapeHtml(EJE_LABEL[p.eje] || p.eje)}${p.eje_segundo ? ` <small>(2.ª opción: ${escapeHtml(EJE_LABEL[p.eje_segundo] || p.eje_segundo)})</small>` : ''}</dd></div>
                <div><dt>Horas por semana</dt><dd>${escapeHtml(HORAS_LABEL[p.horas] || p.horas)}</dd></div>
                <div><dt>Correo</dt><dd>${escapeHtml(p.correo)}</dd></div>
                ${p.telefono ? `<div><dt>Teléfono</dt><dd>${escapeHtml(p.telefono)}</dd></div>` : ''}
            </dl>
            ${areas ? `<ul class="post-areas">${areas}</ul>` : ''}
            ${p.motivacion ? `<blockquote>${escapeHtml(p.motivacion)}</blockquote>` : ''}
            <div class="p-acciones">
                <a class="p-btn p-btn-primario" href="${mensajeDe(p)}">Escribirle</a>
                <span class="p-espacio"></span>
                <button class="p-btn p-btn-peligro" type="button" data-borrar="${escapeHtml(p.id)}">Ya la contacté: borrar datos</button>
            </div>
        </li>`;
    }).join('');
}

document.querySelector('.post-filtros').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-eje]');
    if (!b) return;
    filtro = b.dataset.eje;
    document.querySelectorAll('.post-filtros button').forEach((x) => x.classList.toggle('is-activo', x === b));
    render();
});

$('lista').addEventListener('click', async (e) => {
    const b = e.target.closest('[data-borrar]');
    if (!b) return;
    const p = filas.find((x) => x.id === b.dataset.borrar);
    if (!p) return;
    const ok = await confirmar(`¿Borrar los datos de ${p.nombre}?`, 'Hazlo solo si ya le escribiste. No se puede deshacer.');
    if (!ok) return;
    const { data, error } = await supabase.from('postulaciones').delete().eq('id', p.id).select('id');
    if (error) return mostrarError(`No se pudo borrar: ${error.message}`);
    if (!data?.length) return mostrarError('Supabase no borró la postulación. Recarga la página e inténtalo de nuevo.');
    filas = filas.filter((x) => x.id !== p.id);
    render();
});

(async () => {
    if (!(await verificarSesion())) return;
    try {
        await cargar();
    } catch (err) {
        $('cargando').textContent = `No se pudieron cargar las postulaciones: ${err.message}. ¿Ya se corrió supabase/03-postulaciones.sql?`;
        return;
    }
    $('cargando').hidden = true;
    $('panel').hidden = false;
    render();
})();
