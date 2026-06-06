const lang = new URLSearchParams(location.search).get("lang") || "ES";
const ci = new URLSearchParams(location.search).get("ci");
const c = document.createElement("script");

c.src = `conf/config${lang.toUpperCase()}.json`;

c.onload = () => {
    const s = document.createElement("script");
    s.src = `${ci}/profile.json`;
    s.onload = () => {
        if (typeof profile != "undefined") {
            render(profile);
        }
    };
    document.head.appendChild(s);

    const menuBtn = document.querySelector('.menu');
    const navbar = document.querySelector('.navbar');

    if (menuBtn && navbar) { // se remplazo el Eventlistener por este que usa this para el reto 5
        menuBtn.addEventListener('click', function () {
        console.log("Caso 1 - this en EventListener:", this);
        debugger;
        navbar.classList.toggle('open');
});
    }

    const buscarInfo = () => {
        const query = document.getElementById("busqueda").value.trim();
        if (query) {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set("ci", query);
            window.location.href = currentUrl.toString();
        }
    };

    const botonBusqueda = document.getElementById("boton-busqueda");
    if (botonBusqueda) {
        botonBusqueda.addEventListener("click", buscarInfo);
    }

    const inputBusqueda = document.getElementById("busqueda");
    if (inputBusqueda) {
        inputBusqueda.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                buscarInfo();
            }
        });
    }
};

document.head.appendChild(c);

function render(d) {
    const $ = (id, v) => document.getElementById(id).innerHTML = v;
    const setPlaceholder = (id, v) => document.getElementById(id).placeholder = v;

    document.getElementById("profile-picture").src = `${d.ci}/${d.ci}Big.jpg`;

    $("nombre", d.name);
    $("descripcion", d.description);
    $("email", config.email.replace("[email]", d.email));
    $("color", config.color + ": " + d.color);

    function texto(lista, tipo) {
        return lista.length > 1
            ? config[tipo][1] + ": " + lista.join(", ")
            : config[tipo][0] + ": " + lista[0];
    }

    $("libro", texto(d.book, "book"));
    $("musica", texto(d.music, "music"));
    $("videojuego", texto(d.video_game, "video_game"));
    $("lenguajes", config.language + ": " + d.language.join(", "));
    $("footer", config.copyRight);
    setPlaceholder("busqueda", config.search);
    $("boton-busqueda", config.search);
}

const estudianteDemo = { // este es lo nuevo que se agrego para usar this en el reto5
    nombre: "Genesis",
    mostrarNombre: function () {
        console.log("Caso 2 - this en objeto:", this);
        debugger;
    }
};

estudianteDemo.mostrarNombre();

const estudianteArrow = { // este es lo nuevo que se agrego para usar this en el reto5
    nombre: "Genesis",
    mostrarNombre: () => {
        console.log("Caso 3 - this en Arrow Function (funcion) :", this);
        debugger;
    }
};

estudianteArrow.mostrarNombre();