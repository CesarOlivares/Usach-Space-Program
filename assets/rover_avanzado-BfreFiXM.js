import"./header-B2EIyKSy.js";document.getElementById("video-cover").addEventListener("click",function(){const t=document.getElementById("video-wrapper");t.innerHTML=`
                <video autoplay loop muted controls style="width: 100%; display: block; background: #000;">
                    <source src="../../../fotos_rover/rover_prueba_giro.mp4" type="video/mp4">
                    Tu navegador no soporta la reproducción de video HTML5.
                </video>
            `});const o=document.getElementById("stars");for(let t=0;t<45;t++){let e=document.createElement("div");e.className="star",e.style.width=Math.random()*2.5+"px",e.style.height=e.style.width,e.style.left=Math.random()*100+"%",e.style.top=Math.random()*100+"%",e.style.animationDuration=Math.random()*3+2.5+"s",e.style.animationDelay=Math.random()*2+"s",o.appendChild(e)}
