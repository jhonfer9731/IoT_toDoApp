@extends('layouts.todoApp')

@section('content2')
    <div class="msj-bienvenida">
        <div class="info-iniuser">
            <?php /*if(isset($_SESSION["mensaje"])){
            echo "<p class=".'nombre-user'."> Hola {$_SESSION["nombre"]} </p>";
            echo "<p class=".'mensaje-user'.">{$_SESSION["mensaje"]} </p>";
            }*/?>
        </div>
        <h1 id = "t_bienvenido"> Bienvenido </h1>
    </div>
    <p> Entro a todos </p>
    <header>
        <h1>Lista de tareas</h1>
    </header>
    <form>
        <p>Inserta una tarea:&nbsp&nbsp</p>
        <input class="todo-input" type="text">
        <button class="todo-button" type="submit">
            <i class="fas fa-plus-square"></i>
        </button>
        <div class="select">
            <select name="todos" class="filter-todo">
                <option value="all">All</option>
                <option value="completed">Completados</option>
                <option value="uncompleted">Incompletos</option>
            </select>
        </div>
    </form>
    <div class="todo-container">
        <ul class="todo-list">
            
        </ul>
    </div>
@endsection

@section('javaScripts')

    <script type="text/javascript" src="{{asset("js/todoApp/todoApp.js")}}"></script>

@endsection
