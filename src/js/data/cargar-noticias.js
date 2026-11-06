/*
 * Junta las noticias publicadas desde el panel (Supabase) con las que siguen
 * escritas en noticias.js. Si una noticia del panel tiene el mismo slug que una
 * del archivo, gana la del panel. Si Supabase no responde a tiempo, la página
 * se arma solo con noticias.js, así nunca queda vacía.
 */
import { noticias as locales } from './noticias.js';

const ESPERA_MAX = 3500;

const desdeFila = (f) => ({
    slug: f.slug,
    titulo: f.titulo,
    fecha: f.fecha,
    eje: f.eje,
    lugar: f.lugar,
    resumen: f.resumen,
    cuerpo: f.cuerpo || [],
    fotos: Array.isArray(f.fotos) ? f.fotos : [],
    enlace: f.enlace || undefined,
    destacada: f.destacada,
    afiches: f.afiches
});

async function remotas() {
    // Se carga aparte para no frenar el resto de la página
    const { supabase } = await import('../lib/supabase.js');
    const { data, error } = await supabase
        .from('noticias')
        .select('slug,titulo,fecha,eje,lugar,resumen,cuerpo,fotos,enlace,destacada,afiches')
        .eq('estado', 'publicada')
        .order('fecha', { ascending: false });
    if (error) throw error;
    return data.map(desdeFila);
}

export async function cargarNoticias() {
    let delPanel = [];
    try {
        delPanel = await Promise.race([
            remotas(),
            new Promise((_, rej) => setTimeout(() => rej(new Error('Supabase no respondió a tiempo')), ESPERA_MAX))
        ]);
    } catch (err) {
        console.warn('[noticias] Se usan solo las noticias del archivo:', err.message);
    }

    const slugs = new Set(delPanel.map((n) => n.slug));
    const hayDestacadaEnPanel = delPanel.some((n) => n.destacada);
    const delArchivo = locales
        .filter((n) => !slugs.has(n.slug))
        // Si se destacó una noticia desde el panel, esa manda
        .map((n) => (hayDestacadaEnPanel ? { ...n, destacada: false } : n));

    return [...delPanel, ...delArchivo].sort((a, b) => b.fecha.localeCompare(a.fecha));
}
