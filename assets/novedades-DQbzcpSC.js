import"./main-uMHmB8Kc.js";import"./header-BHafkzy6.js";import{n as c}from"./noticias-C0Iiwyli.js";import{i as u}from"./lightbox-4WZmpiwN.js";import{i as g}from"./project-filter-MhR1x_rp.js";import{i as h}from"./motion-epFh6Iqh.js";const $={robotica:"Robótica",coheteria:"Cohetería",orbital:"Sistemas Orbitales",comunidad:"Comunidad"},f={"/proyectos/rover/":"Conoce el rover","/proyectos/cohete/":"Conoce el cohete de agua","/proyectos/cubesat/":"Conoce el CubeSat 1U","/talleres/":"Inscríbete en las actividades"},e=(a="")=>String(a).replace(/[&<>"']/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[o]),y=a=>{const[o,i,t]=a.split("-").map(Number);return new Date(o,i-1,t)};function b(){const a=document.getElementById("notas");if(!a)return;const o=document.getElementById("statEventos");o&&(o.textContent=c.length),a.innerHTML=c.map(t=>{const n=y(t.fecha),r=n.toLocaleDateString("es-CL",{day:"numeric"}),l=n.toLocaleDateString("es-CL",{month:"short",year:"numeric"}),d=t.fotos.map((s,p)=>`
            <button class="gallery-item${p===0?" is-cover":""}" data-full="${e(s.src)}" data-caption="${e(s.alt)}">
                <img src="${e(s.src)}" alt="${e(s.alt)}" loading="lazy">
            </button>`).join(""),m=t.enlace?`<a class="text-link" href="${e(t.enlace)}">${e(f[t.enlace]||"Ver más")} <span aria-hidden="true">→</span></a>`:"";return`
            <article class="nota" id="${e(t.slug)}" data-eje="${e(t.eje)}" data-filter-item>
                <div class="nota-aside">
                    <time class="nota-fecha" datetime="${e(t.fecha)}"><span class="nota-dia">${r}</span><span class="nota-mes">${l}</span></time>
                    <p class="nota-tag">${e($[t.eje]||t.eje)}</p>
                    <p class="nota-lugar">${e(t.lugar)}</p>
                </div>
                <div class="nota-main">
                    <h2>${e(t.titulo)}</h2>
                    ${t.cuerpo.map(s=>`<p>${e(s)}</p>`).join("")}
                    <div class="nota-galeria${t.afiches?" nota-galeria--afiches":""}" data-gallery data-count="${Math.min(t.fotos.length,5)}">${d}</div>
                    ${m}
                </div>
            </article>`}).join("");const i=location.hash&&document.getElementById(decodeURIComponent(location.hash.slice(1)));i&&(i.scrollIntoView(),window.addEventListener("load",()=>i.scrollIntoView(),{once:!0}))}b();g(document.getElementById("bitacora"));u();h();
