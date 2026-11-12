// Formulario de postulación: guarda en Supabase (tabla "postulaciones").
// El público solo puede insertar; leer y borrar es exclusivo de la directiva
// (reglas en supabase/03-postulaciones.sql).
import { initMotion } from '../components/motion.js';
import { CARRERAS, AREAS_POR_EJE } from '../data/postulacion.js';

const CORREO_PROGRAMA = 'spaceprogram@usach.cl';
const form = document.getElementById('postularForm');
const error = document.getElementById('formError');
const boton = document.getElementById('enviar');
const ok = document.getElementById('postularOk');

// ---------- Opciones ----------
document.getElementById('carreras').append(...CARRERAS.map((c) => new Option(c)));

const anio = document.getElementById('anio_ingreso');
const actual = new Date().getFullYear();
for (let y = actual; y >= actual - 7; y--) anio.add(new Option(String(y), String(y)));
anio.add(new Option(`Antes de ${actual - 7}`, `antes-${actual - 7}`));

const areasCampo = document.getElementById('areasCampo');
const areasCaja = document.getElementById('areas');
const segundoCampo = document.getElementById('segundoCampo');
const segundo = document.getElementById('eje_segundo');

// Las áreas cambian según el eje elegido
function pintarAreas(eje) {
    const lista = AREAS_POR_EJE[eje] || [];
    areasCaja.replaceChildren(...lista.map((area) => {
        const label = document.createElement('label');
        label.className = 'chip';
        const input = Object.assign(document.createElement('input'), { type: 'checkbox', name: 'areas', value: area });
        const span = document.createElement('span');
        span.textContent = area;
        label.append(input, span);
        return label;
    }));
    areasCampo.hidden = !lista.length;

    const conSegundo = eje && eje !== 'no-se';
    segundoCampo.hidden = !conSegundo;
    [...segundo.options].forEach((o) => { o.hidden = o.disabled = o.value === eje; });
    if (segundo.value === eje) segundo.value = '';
}

form.addEventListener('change', (e) => {
    if (e.target.name === 'eje') pintarAreas(e.target.value);
});

// Llegar desde una página de eje deja el eje ya elegido (/registro/?eje=coheteria)
const pedido = new URLSearchParams(location.search).get('eje');
const radio = pedido && form.querySelector(`input[name="eje"][value="${CSS.escape(pedido)}"]`);
if (radio) { radio.checked = true; pintarAreas(pedido); }

const motivacion = document.getElementById('motivacion');
const cuenta = document.getElementById('motivacion-cuenta');
motivacion.addEventListener('input', () => { cuenta.textContent = `${motivacion.value.length} / 300`; });

// ---------- Validación ----------
const mostrarError = (texto, html = false) => {
    if (html) error.innerHTML = texto; else error.textContent = texto;
    error.hidden = false;
};

form.addEventListener('input', (e) => {
    e.target.removeAttribute('aria-invalid');
    error.hidden = true;
});

function validar(datos) {
    const marcar = (id) => document.getElementById(id)?.setAttribute('aria-invalid', 'true');
    const faltan = [];
    if (datos.nombre.length < 3) { faltan.push('tu nombre'); marcar('nombre'); }
    if (!/^[a-z0-9._%+-]+@usach\.cl$/.test(datos.correo)) { faltan.push('un correo @usach.cl'); marcar('correo'); }
    if (datos.telefono && !/^[0-9+ ()-]{6,20}$/.test(datos.telefono)) { faltan.push('un teléfono válido'); marcar('telefono'); }
    if (datos.carrera.length < 2) { faltan.push('tu carrera'); marcar('carrera'); }
    if (!datos.anio_ingreso) { faltan.push('tu año de ingreso'); marcar('anio_ingreso'); }
    if (!datos.eje) faltan.push('un eje de interés');
    if (!datos.horas) faltan.push('tus horas disponibles');
    if (!datos.consentimiento) faltan.push('la autorización para usar tus datos');
    if (!faltan.length) return true;
    mostrarError(`Para enviar, completa: ${faltan.join(', ')}.`);
    form.querySelector('[aria-invalid="true"]')?.focus();
    return false;
}

// ---------- Envío ----------
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (boton.getAttribute('aria-busy') === 'true') return;

    const f = new FormData(form);
    // Campo trampa: si viene con texto es un robot. Se responde como éxito y no se guarda nada.
    const esRobot = String(f.get('sitio_web') || '').trim() !== '';

    const datos = {
        nombre: String(f.get('nombre') || '').trim().replace(/\s+/g, ' '),
        correo: String(f.get('correo') || '').trim().toLowerCase(),
        telefono: String(f.get('telefono') || '').trim() || null,
        carrera: String(f.get('carrera') || '').trim(),
        anio_ingreso: String(f.get('anio_ingreso') || ''),
        eje: String(f.get('eje') || ''),
        eje_segundo: String(f.get('eje_segundo') || '') || null,
        areas: f.getAll('areas').map(String).slice(0, 8),
        horas: String(f.get('horas') || ''),
        motivacion: String(f.get('motivacion') || '').trim().slice(0, 300),
        consentimiento: f.get('consentimiento') === 'on',
        version_privacidad: '1'
    };
    if (datos.eje === 'no-se') datos.eje_segundo = null;

    if (!validar(datos)) return;

    boton.setAttribute('aria-busy', 'true');
    boton.disabled = true;
    const textoBoton = boton.innerHTML;
    boton.textContent = 'Enviando…';

    try {
        if (!esRobot) {
            const { supabase } = await import('../lib/supabase.js');
            const { error: fallo } = await supabase.from('postulaciones').insert(datos);
            // 23505 = ese correo ya postuló: para la persona es lo mismo que un éxito
            if (fallo && fallo.code !== '23505') throw fallo;
        }
        document.getElementById('okNombre').textContent = `, ${datos.nombre.split(' ')[0]}.`;
        document.getElementById('okCorreo').textContent = datos.correo;
        form.hidden = true;
        ok.hidden = false;
        ok.focus();
        ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
        console.error('[postulación]', err);
        const asunto = encodeURIComponent('Postulación - USACH Space Program');
        const cuerpo = encodeURIComponent(`Nombre: ${datos.nombre}\nCarrera: ${datos.carrera}\nEje de interés: ${datos.eje}\nHoras semanales: ${datos.horas}\n`);
        mostrarError(
            `No pudimos guardar tu postulación. Inténtalo de nuevo en un momento o <a href="mailto:${CORREO_PROGRAMA}?subject=${asunto}&body=${cuerpo}">envíanosla por correo</a>. Tus respuestas siguen en el formulario.`,
            true
        );
    } finally {
        boton.removeAttribute('aria-busy');
        boton.disabled = false;
        boton.innerHTML = textoBoton;
    }
});

initMotion();
