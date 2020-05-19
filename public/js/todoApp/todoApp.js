//Selector area
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const cerrarSesion = document.querySelector('#cerrar-sesion');

// event listener area


todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);
document.addEventListener('DOMContentLoaded',loadTodos);
//cerrarSesion.addEventListener('click', cerrar_sesion);




//functions area


const cerrarS = {
    finish: true,
    logged_in : false
};


function cerrar_sesion(event)
{
    alert("Hasta Pronto");
    const url = "/login/cerrarsesion.php";
    fetch(url,{
        method: 'POST',
        body: JSON.stringify(cerrarS),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(response => response.json()).then(
        res => {
            console.log(res.location);
            document.location.href = res.location;
        }
    );   
}

function addTodo(event)
{
    event.preventDefault();

    // Todo DIV

    const todoDiv = document.createElement("div");
    todoDiv.classList.add('todo');
    //create li
    const todoNuevo = document.createElement('li');
    todoNuevo.innerHTML = todoInput.value;
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

    //clear input value

    todoInput.value = "";

}


function deleteCheck(event) //Se ejecuta cada vez que se hace click sobre un elemento 
{
    //delete element
    const item = event.target;
    if ( item.classList[0] === 'removed-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall') // se usa para crear una animacion
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', ()=>{ // cuando acaba la transicion se elimina
            todo.remove();

        });
    }
    //checked mark
    if (item.classList[0] === 'complete-btn')
    {
        const todo= item.parentElement;
        todo.classList.toggle("completed");
    }
    //console.log(item.classList[0]); // me muestra informacion sobre el elemento fue 
}




function filterTodo(event)
{
    const todos = todoList.childNodes; // lista con todos los todos generados
    console.log(todos);

    todos.forEach((todo)=>{

        console.log(todo.classList);
        switch(event.target.value) // saca el valor del selector escogido
        {
            case "all":
                if(typeof(todo.classList) === "undefined")break;
                todo.style.display = "flex";
                break;
            case "completed":
                if(typeof(todo.classList) === "undefined"){break;}
                else{
                    if(todo.classList.contains('completed')){ // corrobora los todos que ya han sido completados
                        todo.style.display = "flex";
                    }else{
                        todo.style.display = "none";
                    }
                    break;
                }
            case "uncompleted":
                if(typeof(todo.classList) === "undefined")break;
                if(!todo.classList.contains('completed')){ // corrobora los todos que ya han sido completados
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;

        }
    });
    console.log(todos);
}

function saveTodos(todo)
{
    // check if there is a list of todos
    if ( todo == ' ' || todo == "") return;
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos)); 
}

function loadTodos(){
    // check if there is a list of todos
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach((todo)=>{
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

function removeLocalTodos(todo){
    
    let todos;
    if(localStorage.getItem('todos') === null)
    {
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoDeleted = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoDeleted),1);
    localStorage.setItem('todos', JSON.stringify(todos));

}