const urlParams = new URLSearchParams(location.search);
const langParam = urlParams.get("lang");

if (!langParam) {
    urlParams.set("lang", "ES"); 
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
}

const lang = new URLSearchParams(location.search).get("lang") || "ES";

const c = document.createElement("script");
c.src = `conf/config${lang.toUpperCase()}.json`;

c.onload = () => {

    
    document.getElementById("search").placeholder = config.search;

    const contenedor = document.querySelector('.student-grid');
    contenedor.innerHTML='';

    const $=(id,v)=>document.getElementById(id).innerHTML=v;
    const setPlaceholder = (id, v) => document.getElementById(id).placeholder = v;

    function renderInterfaz(d) {
            setPlaceholder("search", config.search);
            $("semestre", d.semester)
            $("search-button", d.search);
            $("footer", d.copyRight);

    }

        if(typeof config != "undefined"){
            renderInterfaz(config);
        }

       

    profiles.forEach(estudiante => {

        const tarjeta=document.createElement('div');
        tarjeta.className='student-card';
        tarjeta.style.cursor='pointer';

        tarjeta.innerHTML=`
        <img src="${estudiante.ci}/${estudiante.ci}Big${estudiante.image_ext}" 
        alt="${estudiante.name}"
        class="imagen-perfil">

        <div class="info">
            <p>${estudiante.name}</p>
            <div class="blue-bar"></div>
        </div>
        `;

        tarjeta.addEventListener("click",()=>{

            window.location.href=
            `profile.html?ci=${estudiante.ci}&lang=${lang}`;

        });

        contenedor.appendChild(tarjeta);


    });

};

document.head.appendChild(c);