const contenedor = document.querySelector(".container");
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarNombre)
});

function buscarNombre(e){
    e.preventDefault();
    //console.log(nombre);
    //console.log(pais);
    const nombre = document.getElementById("nombre").value;
    const pais = document.getElementById("pais").value;

    if(nombre === "" && pais === ""){
        mostrarAdvertencia("Por favor ingrese un nombre");
        return;
    } else if(nombre === "" && pais !== ""){
        mostrarAdvertencia("Por favor ingrese un nombre");
        return;
    } else if(nombre !== "" && pais == ""){
        consultarAPINombre(nombre);
        return;
    } else {
        consultarAPINombreYPais(nombre, pais);
        return;
    }

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

function consultarAPINombre(nombre){
    let reg = /,/g;
    let reemplazarComa = nombre.replace(reg, "&name[]=");
    const urlNombre = `https://api.agify.io?name[]=${reemplazarComa}`;
    console.log(urlNombre)
    
    fetch(urlNombre)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    });
}

function consultarAPINombreYPais(nombre, pais){
    let reg = /,/g;
    let reemplazarComa = nombre.replace(reg, "&name[]=");
    const urlNombreYPais = `https://api.agify.io?name[]=${reemplazarComa}&country_id=${pais}`;
    console.log(urlNombreYPais);

    fetch(urlNombreYPais)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        });
}