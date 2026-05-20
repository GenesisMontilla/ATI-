

 const ci = new URLSearchParams(location.search).get("ci");

const s = document.createElement("script");
s.src = `${ci}/profile.json`;

s.onload = () => {
    if (typeof profile != "undefined")
        render(profile);
};

document.head.appendChild(s);


function render(d){

    const $=(id,v)=>document.getElementById(id).innerHTML=v;

    document.getElementById("profile-picture").src=
    `${d.ci}/${d.ci}Big.jpg`;

    $("nombre",d.name);
    $("descripcion",d.description);

    $("email",
      config.email.replace("[email]",d.email));

    $("ci","Cédula: "+d.ci);
    $("genero","Género: "+d.gender);
    $("cumpleaños","Fecha de nacimiento: "+d.birth_date);

    $("color",config.color+": "+d.color);


    function texto(lista,tipo){

        return lista.length>1
        ? config[tipo][1]+": "+lista.join(", ")
        : config[tipo][0]+": "+lista[0];
    }


    $("libro",texto(d.book,"book"));

    $("musica",texto(d.music,"music"));

    $("videojuego",texto(d.video_game,"video_game"));

    $("lenguajes",
        config.language+": "+
        d.language.join(", "));
}