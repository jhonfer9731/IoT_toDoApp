
const editarListaFrm = document.querySelector('#crear-lista');
const mainSection = document.querySelector('#main');
const cancelarEnvio = document.querySelector('#cancelar-envio');
const listGroup = document.querySelector('.list-group');
const editForm = document.querySelector('#editarListasForm');



listGroup.addEventListener('click', verficarBtnEditar);
cancelarEnvio.addEventListener('click', mostrarCrearLista);
editarListaFrm.style.display = 'none';
editarListaFrm.style.top = "-300px";

function verficarBtnEditar (event){

    const item = event.target;
    if(item.classList.contains('boton-editar'))
    {
        mostrarCrearLista(event);
    }
}

function mostrarCrearLista(event){

    const divLista = event.target.parentElement.parentElement;

    const nombre = divLista.querySelector('.lista-nombre');
    const comentario = divLista.querySelector('.lista-comentario');

    if(!editarListaFrm.classList.contains('mostrar-crear-lista')){
        mainSection.style.opacity = 0.2;
        mainSection.style.zIndex = 2;
        editarListaFrm.querySelector('#nombreNuevaLista').value = nombre.innerText;
        editarListaFrm.querySelector('#comentarioLista').value = comentario.innerText;
        editForm.action =nombre.parentElement.href;
        editarListaFrm.classList.toggle("mostrar-crear-lista");
    }else{
        mainSection.style.opacity = 1;
        mainSection.style.zIndex = 1;
        editarListaFrm.classList.toggle("mostrar-crear-lista");
    }
}
/*
window.onload = function(){
    const agregarListaBtn = document.querySelector('.boton-editar');
    console.log(agregarListaBtn);
    agregarListaBtn.addEventListener('click',mostrarCrearLista);
    cancelarEnvio.addEventListener('click', mostrarCrearLista);


    editarListaFrm.style.display = 'none';
    editarListaFrm.style.top = "-500px";

    //functions area
    function mostrarCrearLista(){
        if(!editarListaFrm.classList.contains('mostrar-crear-lista')){
            mainSection.style.opacity = 0.2;
            mainSection.style.zIndex = 2;
            editarListaFrm.classList.toggle("mostrar-crear-lista");
        }else{
            mainSection.style.opacity = 1;
            mainSection.style.zIndex = 1;
            editarListaFrm.classList.toggle("mostrar-crear-lista");
        }
    }
}*/