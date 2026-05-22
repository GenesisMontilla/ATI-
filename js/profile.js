const lang = new URLSearchParams(location.search).get("lang") || "ES";

const ci= new URLSearchParams(location.search).get("ci");

const c=document.createElement("script");

c.src=`conf/config${lang.toUpperCase()}.json`;

c.onload=()=>{

    const s=document.createElement("script");

    s.src=`${ci}/profile.json`;

    s.onload=()=>{

        if(typeof profile!="undefined"){
            render(profile);
        }

    };

    document.head.appendChild(s);

    

};

document.head.appendChild(c);


function render(d){

    const $=(id,v)=> document.getElementById(id).innerHTML=v;
    
    const setPlaceholder = (id, v) => document.getElementById(id).placeholder = v;
        
    
    document.getElementById("profile-picture").src=
    `${d.ci}/${d.ci}Big.jpg`;

    $("nombre",d.name);

    $("descripcion",d.description);

    $("email",
    config.email.replace("[email]",d.email));


    $("color",
    config.color+": "+d.color);


    function texto(lista,tipo){

        return lista.length>1
        ? config[tipo][1]+": "+lista.join(", ")
        : config[tipo][0]+": "+lista[0];

    }

    $("libro",texto(d.book,"book"));

    $("musica",
    texto(d.music,"music"));

    $("videojuego",
    texto(d.video_game,"video_game"));

    $("lenguajes",
    config.language+": "+
    d.language.join(", "));

    $("footer",config.copyRight);
    setPlaceholder("busqueda",config.search);
    $("boton-busqueda",config.search);


}