@extends('layouts.todoApp')
@section('content2')
    <div class="msj-bienvenida">
         <!-- <div class="info-iniuser"> -->
            <?php /*if(isset($_SESSION["mensaje"])){
            echo "<p class=".'nombre-user'."> Hola {$_SESSION["nombre"]} </p>";
            echo "<p class=".'mensaje-user'.">{$_SESSION["mensaje"]} </p>";
            }*/?>
        <!-- </div> -->
        <h1 id = "t_bienvenido"> Bienvenido </h1>
    </div>
    <div class="container-fluid">
        <header>
            <h1>Lista de tareas</h1>
        </header>
        <form class="card text-white bg-dark w-95">
            <div class="container-2">
                <p class="card-header">Inserta una tarea:&nbsp&nbsp</p>
                <div class="card-body card-expand-lg">
                    <div class="todo-input-group">
                        <input class="todo-input form-control pb-3 pt-3 m-0" type="text">
                        <button class="todo-button btn btn-light" type="submit"><i class="fas fa-plus-square"></i></button>
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Filtra</label>
                        </div>
                        <div class="select" id="inputGroupSelect01">
                            <select name="todos" class="custom-select filter-todo">
                                <option value="all">Todos</option>
                                <option value="completed">Completados</option>
                                <option value="uncompleted">Incompletos</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
        <div class="todo-container">
            <ul class="todo-list">
                @if (count($todos) > 0)
                    @foreach ($todos as $todo)
                    @if ($todo->completada == true)
                        <div class="todo completed" id="{{ 'id_'.$todo->id."-user_".$todo->user_id }}">
                    @else
                        <div class="todo" id="{{ 'id_'.$todo->id."-user_".$todo->user_id }}">
                    @endif
                            <li class="todo-item">
                                <!-- Aqui va el valor del todo -->
                                {{$todo->actividad}}
                            </li>
                            <button class="complete-btn"><i class="fas fa-check"> </i></button>
                            <button class="removed-btn"><i class="fas fa-trash"> </i></button>
                        </div>
                    @endforeach
                @endif
            </ul>
        </div>
        <div class="container container3">
            <button type="button" class="btn btn-primary" id="agregar-lista">Agregar a una lista </button>
        </div>
@endsection

@section('javaScripts')

    <script type="text/javascript" src="{{asset("js/todoApp/todoApp.js")}}"></script>

@endsection
