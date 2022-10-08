const formulario = document.getElementById("formulario");

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarNombre)
});

function buscarNombre(e){
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    if(nombre === ""){
        mostrarAdvertencia("Por favor ingrese un nombre");
        return;
    }
}

function mostrarAdvertencia(mensaje){
    console.log(mensaje);
}