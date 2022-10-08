const contenedor = document.querySelector(".container");
const formulario = document.getElementById("formulario");


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarNombre)
});

function buscarNombre(e){
    e.preventDefault();
    //console.log(nombre);
    //console.log(lugar);
    const nombre = document.getElementById("nombre").value;
    const lugar = document.getElementById("lugar").value;

    if(nombre === "" && lugar === ""){
        mostrarAdvertencia("Por favor ingrese un nombre");
        return;
    }

    consultarAPI(nombre);
}

function mostrarAdvertencia(mensaje){
    //console.log(mensaje);
    const alerta = document.querySelector("errorInputsBlanco");
    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add("errorInputsBlanco");
        alerta.innerHTML = `
        <strong>¡Error!</strong><br>
        <span>${mensaje}</span>`;
        ;
        formulario.appendChild(alerta);
        setTimeout(() => {
            alerta.remove()
        }, 3000);
    }
}

function consultarAPI(nombre){
    let reg = /,/g;
    let reemplazarComa = nombre.replace(reg, "&name[]=");
    const url = `https://api.agify.io?name[]=${reemplazarComa}`;
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
}