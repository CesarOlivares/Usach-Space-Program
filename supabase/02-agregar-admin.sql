-- =====================================================================
-- Dar permisos de edición a una persona.
-- 1. Crear su cuenta: Authentication → Users → Add user → Create new user
--    (correo + contraseña, marcar "Auto Confirm User").
-- 2. Cambiar el correo y el nombre de abajo y correr esto en el SQL Editor.
--    Si el correo no existe todavía en Users, el script avisa con un error.
-- =====================================================================

do $$
declare
    v_correo text := 'cesar.olivares.l@usach.cl';
    v_nombre text := 'César Olivares';
    v_id uuid;
begin
    select id into v_id
    from auth.users
    where lower(trim(email)) = lower(trim(v_correo));

    if v_id is null then
        raise exception 'No hay ningún usuario con el correo %. Créalo primero en Authentication → Users.', v_correo;
    end if;

    insert into public.admins (user_id, nombre)
    values (v_id, v_nombre)
    on conflict (user_id) do update set nombre = excluded.nombre;

    raise notice 'Listo: % ahora es admin.', v_correo;
end $$;

-- Ver todos los usuarios y quién es admin:
select u.email, a.nombre as admin
from auth.users u
left join public.admins a on a.user_id = u.id
order by u.created_at;

-- Para quitarle el permiso a alguien:
-- delete from public.admins where user_id = (select id from auth.users where lower(email) = 'correo@usach.cl');
