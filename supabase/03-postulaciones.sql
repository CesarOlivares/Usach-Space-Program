-- =====================================================================
-- USACH Space Program · Postulaciones y ajustes de seguridad
-- Pegar completo en Supabase → SQL Editor → New query → Run.
-- Se puede volver a correr sin romper nada.
-- Requiere haber corrido antes 01-esquema.sql (usa public.es_admin()).
-- =====================================================================

-- ---------- Postulaciones ----------
-- El público solo puede INSERTAR. Leer y borrar: solo admins.
create table if not exists public.postulaciones (
    id              uuid primary key default gen_random_uuid(),
    creado_en       timestamptz not null default now(),
    nombre          text not null check (char_length(nombre) between 3 and 120),
    correo          text not null check (correo ~ '^[a-z0-9._%+-]+@usach\.cl$' and char_length(correo) <= 120),
    telefono        text check (telefono is null or telefono ~ '^[0-9+ ()-]{6,20}$'),
    carrera         text not null check (char_length(carrera) between 2 and 120),
    anio_ingreso    text not null check (char_length(anio_ingreso) <= 12),
    eje             text not null check (eje in ('robotica', 'coheteria', 'orbital', 'no-se')),
    eje_segundo     text check (eje_segundo is null or eje_segundo in ('robotica', 'coheteria', 'orbital')),
    areas           text[] not null default '{}' check (coalesce(array_length(areas, 1), 0) <= 8),
    horas           text not null check (horas in ('2-4', '5-8', '9-12', '13+')),
    motivacion      text not null default '' check (char_length(motivacion) <= 400),
    consentimiento  boolean not null check (consentimiento),
    version_privacidad text not null default '1'
);

-- Una postulación por correo: evita duplicados y que alguien llene la tabla
-- repitiendo el mismo correo.
create unique index if not exists postulaciones_correo_unico
    on public.postulaciones (correo);

create index if not exists postulaciones_fecha_idx
    on public.postulaciones (creado_en desc);

-- Freno contra envíos masivos: como máximo 40 postulaciones por hora en total.
create or replace function public.postulaciones_freno()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
    if (select count(*) from public.postulaciones
        where creado_en > now() - interval '1 hour') >= 40 then
        raise exception 'Demasiadas postulaciones en poco tiempo. Inténtalo más tarde.'
            using errcode = 'P0001';
    end if;
    new.creado_en := now();
    return new;
end;
$$;

drop trigger if exists postulaciones_freno on public.postulaciones;
create trigger postulaciones_freno
    before insert on public.postulaciones
    for each row execute function public.postulaciones_freno();

alter table public.postulaciones enable row level security;

drop policy if exists "cualquiera postula" on public.postulaciones;
create policy "cualquiera postula" on public.postulaciones
    for insert to anon, authenticated
    with check (consentimiento);

drop policy if exists "admins leen postulaciones" on public.postulaciones;
create policy "admins leen postulaciones" on public.postulaciones
    for select to authenticated
    using (public.es_admin());

drop policy if exists "admins borran postulaciones" on public.postulaciones;
create policy "admins borran postulaciones" on public.postulaciones
    for delete to authenticated
    using (public.es_admin());

-- Permisos de tabla (RLS decide el resto)
grant insert on public.postulaciones to anon, authenticated;
grant select, delete on public.postulaciones to authenticated;

-- ---------- Ajustes de seguridad sobre lo existente ----------
-- El enlace de una noticia solo puede ser una ruta del sitio o una dirección https.
alter table public.noticias drop constraint if exists noticias_enlace_seguro;
alter table public.noticias add constraint noticias_enlace_seguro
    check (enlace is null or enlace ~ '^(/[^/]|https://)' or enlace = '/');

-- Al cambiar una foto, el resultado también debe quedar en la carpeta de novedades.
drop policy if exists "admins cambian fotos" on storage.objects;
create policy "admins cambian fotos" on storage.objects
    for update to authenticated
    using (bucket_id = 'novedades' and public.es_admin())
    with check (bucket_id = 'novedades' and public.es_admin());
