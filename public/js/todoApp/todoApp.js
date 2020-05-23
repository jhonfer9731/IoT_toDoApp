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
document.addEventListener('DOMContentLoaded', loadTodos);
//cerrarSesion.addEventListener('click', cerrar_sesion);


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
    }).then(res => res.json()).then(response => { console.log(response); user = response }).catch(err => console.log(err));
}

// Get cookies

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function cerrar_sesion(event) // Hay que cambiar esta funcion
{
    alert("Hasta Pronto");
    const url = "/login/cerrarsesion.php";
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(cerrarS),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(
        res => {
            console.log(res.location);
            document.location.href = res.location;
        }
    );
}

function addTodo(event) {
    const cuerpo = {
        actividad: todoInput.value,
        completada: false,
        user_id: user.id

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
    //save to localstorage
    //saveTodos(todoInput.value);
    //check mark button
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


function deleteCheck(event) //Se ejecuta cada vez que se hace click sobre un elemento 
{
    //delete element
    const item = event.target;
    if (item.classList[0] === 'removed-btn') {
        const todo = item.parentElement; // aqui obtengo el todo con id = id_#_user_#
        deleteFormDB(todo.id);
        todo.classList.add('fall') // se usa para crear una animacion
        removeLocalTodos(todo);
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
    //console.log(item.classList[0]); // me muestra informacion sobre el elemento fue 
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

function extraerInfoTodo(todo_id) {
    const id_content = todo_id.split('-');
    const infoTodo = {
        id: parseInt(id_content[0].split('id_')[1]),
        user_id: parseInt(id_content[1].split('user_')[1])
    }
    return infoTodo;
}


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

function saveTodos(todo) {
    // check if there is a list of todos
    if (todo == ' ' || todo == "") return;
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    // check if there is a list of todos
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((todo) => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add('todo');
        //create li
        const todoNuevo = document.createElement('li');
        todoNuevo.innerHTML = todo;
        todoNuevo.classList.add('todo-item');
        todoDiv.appendChild(todoNuevo);
        //save to localstorage
        saveTodos(todoInput.value);
        //check mark button
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
    })

}

function removeLocalTodos(todo) {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoDeleted = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoDeleted), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}