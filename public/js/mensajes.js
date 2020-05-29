const containerMsj = document.querySelector('.container-msj');

function redireccionarLogout(error){

    const divDanger = document.createElement("div");
    divDanger.classList.add('alert');
    divDanger.classList.add('alert-danger');
    divDanger.innerText = error;
    containerMsj.appendChild(divDanger);
    console.log("entro aqui");
    setTimeout(()=>{
        document.getElementById('logout-form').submit();
    },3000)
}