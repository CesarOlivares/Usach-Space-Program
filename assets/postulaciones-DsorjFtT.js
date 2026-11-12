import"./main-Wg6KVayF.js";/* empty css              */import{supabase as i}from"./supabase-0-bjmVk9.js";import{E as l,H as f}from"./postulacion-kXg7LHE_.js";const a=t=>document.getElementById(t),n=(t="")=>String(t).replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]);let c=[],u="todos";async function b(){const{data:t}=await i.auth.getSession();if(!t.session)return location.replace("/login/");const{data:e}=await i.rpc("es_admin");return e?(a("usuario").textContent=t.session.user.email,!0):(await i.auth.signOut(),location.replace("/login/"))}a("salir").addEventListener("click",async()=>{await i.auth.signOut(),location.replace("/login/")});function $(t,e){const o=a("dialogo");return a("dialogoTitulo").textContent=t,a("dialogoTexto").textContent=e,o.returnValue="",o.showModal(),new Promise(r=>o.addEventListener("close",()=>r(o.returnValue==="aceptar"),{once:!0}))}const g=t=>{a("error").textContent=t,a("error").hidden=!1};async function h(){const t=new Date;t.setFullYear(t.getFullYear()-1),await i.from("postulaciones").delete().lt("creado_en",t.toISOString());const{data:e,error:o}=await i.from("postulaciones").select("*").order("creado_en",{ascending:!1});if(o)throw o;c=e}function v(t){const e=t.nombre.split(" ")[0],o=t.eje==="no-se"?"el programa":`el eje de ${l[t.eje]}`,r=encodeURIComponent("Tu postulación al USACH Space Program"),s=encodeURIComponent(`Hola ${e}:

Gracias por postular al USACH Space Program. Vimos tu interés en ${o} y nos gustaría conocerte.

¿Te acomoda reunirnos esta semana? Cuéntanos qué días y horarios puedes.

Saludos,
`);return`mailto:${encodeURIComponent(t.correo)}?subject=${r}&body=${s}`}function m(){const t=c.filter(e=>u==="todos"||e.eje===u);a("resumen").textContent=c.length===1?"1 postulación pendiente":`${c.length} postulaciones pendientes`,a("vacio").hidden=t.length>0,a("lista").innerHTML=t.map(e=>{const o=new Date(e.creado_en).toLocaleDateString("es-CL",{day:"numeric",month:"short",year:"numeric"}),r=(e.areas||[]).map(s=>`<li>${n(s)}</li>`).join("");return`
        <li class="post-card" data-eje="${n(e.eje)}">
            <div class="post-card-head">
                <div>
                    <h2>${n(e.nombre)}</h2>
                    <p class="post-meta">${n(e.carrera)} · ingreso ${n(e.anio_ingreso.replace("antes-","antes de "))}</p>
                </div>
                <time datetime="${n(e.creado_en)}">${o}</time>
            </div>
            <dl class="post-datos">
                <div><dt>Eje</dt><dd>${n(l[e.eje]||e.eje)}${e.eje_segundo?` <small>(2.ª opción: ${n(l[e.eje_segundo]||e.eje_segundo)})</small>`:""}</dd></div>
                <div><dt>Horas por semana</dt><dd>${n(f[e.horas]||e.horas)}</dd></div>
                <div><dt>Correo</dt><dd>${n(e.correo)}</dd></div>
                ${e.telefono?`<div><dt>Teléfono</dt><dd>${n(e.telefono)}</dd></div>`:""}
            </dl>
            ${r?`<ul class="post-areas">${r}</ul>`:""}
            ${e.motivacion?`<blockquote>${n(e.motivacion)}</blockquote>`:""}
            <div class="p-acciones">
                <a class="p-btn p-btn-primario" href="${v(e)}">Escribirle</a>
                <span class="p-espacio"></span>
                <button class="p-btn p-btn-peligro" type="button" data-borrar="${n(e.id)}">Ya la contacté: borrar datos</button>
            </div>
        </li>`}).join("")}document.querySelector(".post-filtros").addEventListener("click",t=>{const e=t.target.closest("button[data-eje]");e&&(u=e.dataset.eje,document.querySelectorAll(".post-filtros button").forEach(o=>o.classList.toggle("is-activo",o===e)),m())});a("lista").addEventListener("click",async t=>{const e=t.target.closest("[data-borrar]");if(!e)return;const o=c.find(d=>d.id===e.dataset.borrar);if(!o||!await $(`¿Borrar los datos de ${o.nombre}?`,"Hazlo solo si ya le escribiste. No se puede deshacer."))return;const{data:s,error:p}=await i.from("postulaciones").delete().eq("id",o.id).select("id");if(p)return g(`No se pudo borrar: ${p.message}`);if(!(s!=null&&s.length))return g("Supabase no borró la postulación. Recarga la página e inténtalo de nuevo.");c=c.filter(d=>d.id!==o.id),m()});(async()=>{if(await b()){try{await h()}catch(t){a("cargando").textContent=`No se pudieron cargar las postulaciones: ${t.message}. ¿Ya se corrió supabase/03-postulaciones.sql?`;return}a("cargando").hidden=!0,a("panel").hidden=!1,m()}})();
