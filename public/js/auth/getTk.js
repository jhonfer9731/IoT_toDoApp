window.onload = function(){
    const email = document.querySelector('#email');
    const password = document.querySelector('#password'); 
}
function getTk(){
    const password_conf = document.querySelector('#password-confirm');
    if(password_conf !== null){
        if(password.value !== password_conf.value)
        {   
            alert("contraseñas no coinciden");
            return false;
        }
    } 
    const formulario ={
        email: email.value,
        password : password.value 
    }

    fetch('/api/todos/login',{
        headers:{
            "content-type": "application/json"
        },
        method: "post",
        body: JSON.stringify(formulario)
        }
    ).then(response => response.json()).then(
        res => console.log(res)
    ).catch(err => {
        console.log(err);
        alert("Error: No se pudo obtener el API Token");
        return false;
    });

    return true;

}

