const contenedor = document.querySelector(".container");
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");


window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarNombre)
});

function buscarNombre(e){
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const pais = document.getElementById("pais").value;

    try {
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
    } catch (error) {
        return (error);
    }

}

function mostrarAdvertencia(mensaje){

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
    
    fetch(urlNombre)
        .then(res => res.json())
        .then(data => {
            if(data[0].count === 0){
                mostrarAdvertencia("No se encontraron coincidencias, ingrese otro nombre");
            }
            mostrarResultadosNombre(data);
        });
}

function consultarAPINombreYPais(nombre, pais){
    let reg = /,/g;
    let reemplazarComa = nombre.replace(reg, "&name[]=");
    const urlNombreYPais = `https://api.agify.io?name[]=${reemplazarComa}&country_id=${pais}`;

    fetch(urlNombreYPais)
        .then(res => res.json())
        .then(data => {
            if(data[0].count === 0){
                mostrarAdvertencia("No se encontraron coincidencias, ingrese otro nombre y pais");
            }
            mostrarResultadosNombreYLugar(data);
        });
}

function mostrarResultadosNombre(data){
    
    for(let i = 0; i <= data.length; i++){
        resultado.classList.add('parrafosResultado');
        resultado.innerHTML += `
            <li>${data[i].name} tiene ${data[i].age} años de edad</li>
        `;
        
        setTimeout(() => {
            resultado.remove()
        }, 10000);
    }
}

function mostrarResultadosNombreYLugar(data){

    for(let i = 0; i <= data.length; i++){
        resultado.classList.add('parrafosResultado');
        resultado.innerHTML += `
            <li>${data[i].name} tiene ${data[i].age} años de edad</li>
        `;

        setTimeout(() => {
            resultado.remove()
        }, 10000);
    }
}

