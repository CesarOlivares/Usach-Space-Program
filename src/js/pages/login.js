import { supabase } from '../lib/supabase.js';

const form = document.getElementById('loginForm');
const error = document.getElementById('loginError');
const btn = document.getElementById('loginBtn');
const DESTINO = '/panel/';

const mostrarError = (texto) => {
    error.textContent = texto;
    error.hidden = false;
};

// Si ya hay sesión de admin, directo al panel
supabase.auth.getSession().then(async ({ data }) => {
    if (!data.session) return;
    const { data: esAdmin } = await supabase.rpc('es_admin');
    if (esAdmin) location.replace(DESTINO);
});

form.addEventListener('input', (e) => {
    e.target.removeAttribute('aria-invalid');
    error.hidden = true;
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
        if (!email) form.email.setAttribute('aria-invalid', 'true');
        if (!password) form.password.setAttribute('aria-invalid', 'true');
        mostrarError('Escribe tu correo y tu contraseña.');
        return;
    }

    btn.setAttribute('aria-busy', 'true');
    btn.textContent = 'Entrando…';

    try {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) {
            mostrarError(authError.message.includes('Invalid login')
                ? 'El correo o la contraseña no coinciden.'
                : 'No se pudo ingresar. Revisa tu conexión e inténtalo de nuevo.');
            return;
        }

        const { data: esAdmin, error: rpcError } = await supabase.rpc('es_admin');
        if (rpcError) {
            console.error(rpcError);
            await supabase.auth.signOut();
            mostrarError(`Entraste, pero no se pudo comprobar tu permiso (${rpcError.message}). Inténtalo de nuevo en un momento.`);
            return;
        }
        if (!esAdmin) {
            await supabase.auth.signOut();
            mostrarError(`Entraste como ${email}, pero esa cuenta no está en la lista de admins. Pídele a la presidencia que te agregue.`);
            return;
        }

        location.replace(DESTINO);
    } finally {
        btn.removeAttribute('aria-busy');
        btn.textContent = 'Entrar';
    }
});
