// Cliente de Supabase compartido por el sitio y el panel.
// La "publishable key" es pública por diseño: lo que protege los datos son
// las reglas (RLS) definidas en supabase/01-esquema.sql. Nunca poner aquí
// la "secret" / "service_role" key.
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://fbsfegpbobynclwxxdlm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_OAy3FyGbjXbXcRLw0u3xAA_Rq9nX8hc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true }
});

export const BUCKET_FOTOS = 'novedades';
