-- =====================================================================
-- USACH Space Program · Esquema de la base de datos
-- Pegar completo en Supabase → SQL Editor → New query → Run.
-- Se puede volver a correr sin romper nada.
-- =====================================================================

-- ---------- Administradores ----------
-- Solo las personas en esta tabla pueden editar. Crear la cuenta en
-- Authentication → Users y luego agregarla aquí (ver 02-agregar-admin.sql).
create table if not exists public.admins (
    user_id    uuid primary key references auth.users (id) on delete cascade,
    nombre     text not null,
    creado_en  timestamptz not null default now()
);

alter table public.admins enable row level security;

-- ¿El usuario que hace la consulta es admin?
create or replace function public.es_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
    select exists (select 1 from public.admins where user_id = auth.uid());
$$;

drop policy if exists "admins se ven entre sí" on public.admins;
create policy "admins se ven entre sí" on public.admins
    for select to authenticated
    using (public.es_admin());

-- ---------- Noticias ----------
create table if not exists public.noticias (
    id             uuid primary key default gen_random_uuid(),
    slug           text not null unique check (slug ~ '^[a-z0-9-]+$'),
    titulo         text not null check (char_length(titulo) between 1 and 120),
    fecha          date not null,
    eje            text not null check (eje in ('robotica', 'coheteria', 'orbital', 'comunidad')),
    lugar          text not null default '',
    resumen        text not null default '',
    cuerpo         text[] not null default '{}',
    fotos          jsonb not null default '[]'::jsonb,   -- [{ "src": url, "alt": texto }]
    enlace         text,
    destacada      boolean not null default false,
    afiches        boolean not null default false,
    estado         text not null default 'borrador' check (estado in ('borrador', 'publicada')),
    actualizado_en timestamptz not null default now(),
    actualizado_por uuid references auth.users (id) on delete set null
);

create index if not exists noticias_fecha_idx on public.noticias (fecha desc);

-- Solo una noticia destacada a la vez
create unique index if not exists noticias_una_destacada
    on public.noticias (destacada) where destacada;

create or replace function public.noticias_al_guardar()
returns trigger
language plpgsql
as $$
begin
    new.actualizado_en := now();
    new.actualizado_por := auth.uid();
    return new;
end;
$$;

drop trigger if exists noticias_al_guardar on public.noticias;
create trigger noticias_al_guardar
    before insert or update on public.noticias
    for each row execute function public.noticias_al_guardar();

alter table public.noticias enable row level security;

drop policy if exists "público lee publicadas" on public.noticias;
create policy "público lee publicadas" on public.noticias
    for select to anon, authenticated
    using (estado = 'publicada' or public.es_admin());

drop policy if exists "admins crean" on public.noticias;
create policy "admins crean" on public.noticias
    for insert to authenticated
    with check (public.es_admin());

drop policy if exists "admins editan" on public.noticias;
create policy "admins editan" on public.noticias
    for update to authenticated
    using (public.es_admin())
    with check (public.es_admin());

drop policy if exists "admins borran" on public.noticias;
create policy "admins borran" on public.noticias
    for delete to authenticated
    using (public.es_admin());

-- ---------- Fotos (Storage) ----------
-- Carpeta pública "novedades": cualquiera ve las fotos, solo admins suben o borran.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('novedades', 'novedades', true, 5242880, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do update
    set public = excluded.public,
        file_size_limit = excluded.file_size_limit,
        allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admins suben fotos" on storage.objects;
create policy "admins suben fotos" on storage.objects
    for insert to authenticated
    with check (bucket_id = 'novedades' and public.es_admin());

drop policy if exists "admins cambian fotos" on storage.objects;
create policy "admins cambian fotos" on storage.objects
    for update to authenticated
    using (bucket_id = 'novedades' and public.es_admin());

drop policy if exists "admins borran fotos" on storage.objects;
create policy "admins borran fotos" on storage.objects
    for delete to authenticated
    using (bucket_id = 'novedades' and public.es_admin());
