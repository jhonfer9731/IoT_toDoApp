//Selector area
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const cerrarSesion = document.querySelector('#cerrar-sesion');
let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// event listener area
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



//functions area


const cerrarS = {
    finish: true,
    logged_in: false
};

//variable usuario de sesion
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


function addTodo(event) {
    // solo funciona el listas.show
    //console.log(window.location.pathname.split('/')[2])
    const cuerpo = {
        actividad: todoInput.value,
        completada: false,
        user_id: user.id,
        mis_lista_id : window.location.pathname.split('/')[2]

    }
    event.preventDefault();
    fetch('/api/todos', {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'post',
        body: JSON.stringify(cuerpo),
    }
    ).then(response => response.json()).then(
        res => {
            addArchTodo(event, res);
        }
    ).catch(err => console.log(err));

}

function addArchTodo(event, response) {

    // Todo DIV

    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    todoDiv.id = ('id_' + response.id + '-user_' + response.data.user_id);
    //create li
    const todoNuevo = document.createElement('li');
    todoNuevo.innerHTML = todoInput.value;
    todoNuevo.classList.add('todo-item');
    todoDiv.appendChild(todoNuevo);
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"> </i>';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);

    //check trash button
    const removedBtn = document.createElement('button');
    removedBtn.innerHTML = '<i class="fas fa-trash"> </i>';
    removedBtn.classList.add('removed-btn');
    todoDiv.appendChild(removedBtn);

    //Append to list
    todoList.appendChild(todoDiv);

    //clear input value

    todoInput.value = "";
}

// Funcionalidad de los botones de cada todo

function deleteCheck(event) //Se ejecuta cada vez que se hace click sobre un elemento 
{
    //delete element
    const item = event.target;
    if (item.classList[0] === 'removed-btn') {
        const todo = item.parentElement; // aqui obtengo el todo con id = id_#_user_#
        deleteFormDB(todo.id);
        todo.classList.add('fall') // se usa para crear una animacion
        //removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => { // cuando acaba la transicion se elimina
            todo.remove();

        });
    }
    //checked mark
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        completadoDB(todo, todo.classList)

    }
 
}

function completadoDB(todo, class_status) {
    //console.log(class_status);
    const completada = class_status.contains('completed');
    const infoTodo = extraerInfoTodo(todo.id); // extrae la informacion de la etiqueta id y la coloca en un objeto
    const body = {
        actividad: todo.getElementsByClassName('todo-item')[0].innerText,
        completada: completada,
        user_id: infoTodo.user_id
    }
    //console.log(body);
    const uri = '/api/todos/' + infoTodo.id;
    fetch(uri, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'put',
        body: JSON.stringify(body)
    }).then(response => response.json()).then(
        res => console.log(res)
    ).catch(err => console.log("algo paso mal"));
}



function deleteFormDB(todo_id) {
    const infoTodo = extraerInfoTodo(todo_id);
    const uri = '/api/todos/' + infoTodo.id;
    console.log(uri);
    fetch(uri, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'delete',
        body: JSON.stringify(infoTodo)
    }).then(response => response.json()).then(
        res => console.log(res)
    ).catch(err => console.log("algo paso mal"));

}


//extrae la informacion del id del todo
function extraerInfoTodo(todo_id) {
    const id_content = todo_id.split('-');
    const infoTodo = {
        id: parseInt(id_content[0].split('id_')[1]),
        user_id: parseInt(id_content[1].split('user_')[1])
    }
    return infoTodo;
}




// filtra los todos entre incompletos, completados o todos
function filterTodo(event) {
    const todos = todoList.childNodes; // lista con todos los todos generados
    console.log(todos);

    todos.forEach((todo) => {

        console.log(todo.classList);
        switch (event.target.value) // saca el valor del selector escogido
        {
            case "all":
                if (typeof (todo.classList) === "undefined") break;
                todo.style.display = "flex";
                break;
            case "completed":
                if (typeof (todo.classList) === "undefined") { break; }
                else {
                    if (todo.classList.contains('completed')) { // corrobora los todos que ya han sido completados
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                }
            case "uncompleted":
                if (typeof (todo.classList) === "undefined") break;
                if (!todo.classList.contains('completed')) { // corrobora los todos que ya han sido completados
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
    console.log(todos);
}