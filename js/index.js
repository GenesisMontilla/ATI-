const urlParams = new URLSearchParams(location.search);
const langParam = urlParams.get("lang");
const searchParam = urlParams.get("search");

if (!langParam) {
    urlParams.set("lang", "ES"); 
    window.history.replaceState({}, '', `${window.location.pathname}?${urlParams.toString()}`);
}

const lang = new URLSearchParams(location.search).get("lang") || "ES";

const c = document.createElement("script");
c.src = `conf/config${lang.toUpperCase()}.json`;

c.onload = () => {

    const searchForm = document.getElementById("search");
    const searchInput = searchForm ? (searchForm.querySelector("input") || searchForm) : document.getElementById("search");
    const contenedor = document.querySelector('.student-grid');
    
    const esPaginaPerfil = window.location.pathname.includes("profile.html");

    if (searchInput) {
        searchInput.placeholder = config.search + "...";
        if (searchParam && !esPaginaPerfil) {
            searchInput.value = searchParam;
        }
    }

    const $ = (id, v) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = v;
    };
    
    const setPlaceholder = (id, v) => {
        const el = document.getElementById(id);
        if (el) el.placeholder = v;
    };

    function renderInterfaz(d) {
        if (document.getElementById("search")) {
            setPlaceholder("search", config.search + "...");
        }
        $("semestre", d.semester);
        $("search-button", d.search);
        $("footer", d.copyRight);
    }

    if (typeof config !== "undefined") {
        renderInterfaz(config);
    }

    function renderizarPerfiles(listaFiltrada, query = "") {
        if (!contenedor) return;
        contenedor.innerHTML = '';

        if (listaFiltrada.length === 0) {
            const mensajeVacio = document.createElement('p');
            
            mensajeVacio.style.textAlign = 'center';
            mensajeVacio.style.width = '100%';
            mensajeVacio.style.padding = '40px 20px';
            mensajeVacio.style.fontSize = '18px';
            mensajeVacio.style.color = '#333';

            const textoBase = config.no_results || "No hay perfiles que tengan en su nombre: [query]";
            
            mensajeVacio.innerHTML = textoBase.replace("[query]", `<strong>${query}</strong>`);
            
            contenedor.appendChild(mensajeVacio);
            return;
        }

        listaFiltrada.forEach(estudiante => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'student-card';
            tarjeta.style.cursor = 'pointer';

            tarjeta.innerHTML = `
                <img src="${estudiante.ci}/${estudiante.ci}Big${estudiante.image_ext}" 
                alt="${estudiante.name}"
                class="imagen-perfil">

                <div class="info">
                    <p>${estudiante.name}</p>
                    <div class="blue-bar"></div>
                </div>
            `;

            tarjeta.addEventListener("click", () => {
                window.location.href = `profile.html?ci=${estudiante.ci}&lang=${lang}`;
            });

            contenedor.appendChild(tarjeta);
        });
    }

    if (typeof profiles !== "undefined") {
        if (searchParam && !esPaginaPerfil) {
            const queryMinuscula = searchParam.toLowerCase().trim();
            const filtrados = profiles.filter(estudiante => 
                estudiante.name.toLowerCase().includes(queryMinuscula)
            );
            renderizarPerfiles(filtrados, searchParam);
        } else {
            renderizarPerfiles(profiles);
        }
    }

    if (searchInput && searchInput.tagName === "INPUT") {
        searchInput.addEventListener("input", (e) => {
            const queryOriginal = e.target.value;

            if (esPaginaPerfil) {
                window.location.href = `index.html?search=${encodeURIComponent(queryOriginal)}&lang=${lang}`;
                return;
            }

            const queryMinuscula = queryOriginal.toLowerCase().trim();
            const filtrados = profiles.filter(estudiante => 
                estudiante.name.toLowerCase().includes(queryMinuscula)
            );

            renderizarPerfiles(filtrados, queryOriginal);
        });
    }

    if (searchForm && searchForm.tagName === "FORM") {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (esPaginaPerfil && searchInput) {
                const queryOriginal = searchInput.value;
                window.location.href = `index.html?search=${encodeURIComponent(queryOriginal)}&lang=${lang}`;
            }
        });
    }

    const menuBtn = document.querySelector('.menu');
    const navbar = document.querySelector('.navbar');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('open');
        });
    }

};

document.head.appendChild(c);