import"./main-uMHmB8Kc.js";import"./header-BHafkzy6.js";import{n as c}from"./noticias-DSqdLaep.js";import{i as u}from"./lightbox-4WZmpiwN.js";import{i as g}from"./project-filter-MhR1x_rp.js";import{i as h}from"./motion-CN-njdw4.js";const $={robotica:"Robótica",coheteria:"Cohetería",orbital:"Sistemas Orbitales",comunidad:"Comunidad"},f={"/proyectos/rover/":"Conoce el rover","/proyectos/cohete/":"Conoce el cohete de agua","/proyectos/cubesat/":"Conoce el CubeSat 1U"},e=(a="")=>String(a).replace(/[&<>"']/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[o]),y=a=>{const[o,n,t]=a.split("-").map(Number);return new Date(o,n-1,t)};function E(){const a=document.getElementById("notas");if(!a)return;const o=document.getElementById("statEventos");o&&(o.textContent=c.length),a.innerHTML=c.map(t=>{const i=y(t.fecha),r=i.toLocaleDateString("es-CL",{day:"numeric"}),l=i.toLocaleDateString("es-CL",{month:"short",year:"numeric"}),m=t.fotos.map((s,p)=>`
            <button class="gallery-item${p===0?" is-cover":""}" data-full="${e(s.src)}" data-caption="${e(s.alt)}">
                <img src="${e(s.src)}" alt="${e(s.alt)}" loading="lazy">
            </button>`).join(""),d=t.enlace?`<a class="text-link" href="${e(t.enlace)}">${e(f[t.enlace]||"Ver más")} <span aria-hidden="true">→</span></a>`:"";return`
            <article class="nota" id="${e(t.slug)}" data-eje="${e(t.eje)}" data-filter-item>
                <div class="nota-aside">
                    <time class="nota-fecha" datetime="${e(t.fecha)}"><span class="nota-dia">${r}</span><span class="nota-mes">${l}</span></time>
                    <p class="nota-tag">${e($[t.eje]||t.eje)}</p>
                    <p class="nota-lugar">${e(t.lugar)}</p>
                </div>
                <div class="nota-main">
                    <h2>${e(t.titulo)}</h2>
                    ${t.cuerpo.map(s=>`<p>${e(s)}</p>`).join("")}
                    <div class="nota-galeria" data-gallery data-count="${Math.min(t.fotos.length,5)}">${m}</div>
                    ${d}
                </div>
            </article>`}).join("");const n=location.hash&&document.getElementById(decodeURIComponent(location.hash.slice(1)));n&&(n.scrollIntoView(),window.addEventListener("load",()=>n.scrollIntoView(),{once:!0}))}E();g(document.getElementById("bitacora"));u();h();
