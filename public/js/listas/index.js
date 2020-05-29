
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
        editarListaFrm.style.position = "absolute";
        editarListaFrm.style.top  = ((event.clientY/2).toString())+"px";
    

    }else{
        mainSection.style.opacity = 1;
        mainSection.style.zIndex = 1;
        editarListaFrm.classList.toggle("mostrar-crear-lista");
    }
}

let user = "anonimo";

window.onload = () => { // Se obtiene toda la informacion del usuario registrado
    getUserInfo();
    
}


//Get user Information

function getUserInfo() {
    const url = "/api/todos/me";
    fetch(url, {
        headers: {
            "content-type": "application/json"
        },
        method: "post",
        body: JSON.stringify({
            todo: "/index"
        })
    }).then(res => res.json()).then(response => { 
        
        console.log(response);
        if(response.error !== undefined) redireccionarLogout(response.error)
        user = response;

    
    }).catch(err => console.log(err));
}