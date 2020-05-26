@extends('layouts.todoApp')

@section('cssEspecifico')

    <link rel="stylesheet" type="text/css" href="{{ asset('css/listas/style.css') }}">

@endsection

@section('content2')
    @include('inc.messages')
    <main id="main">
        <h1 class="title-listas"> Tus listas </h1>
        <div class="container">
            <div class="jumbotron mt-5 p-2 bg-dark">
                @if (count($listas) > 0)
                    <div class="list-group">
                    @foreach ($listas as $lista)
                        <div href="#" class=" w-120 list-group-item list-group-item-action align-items-start">
                            <div class="d-flex w-120 justify-content-between align-items-center">
                                <div class="container2">
                                    <a href="/listas/{{$lista->id}}"><h5 class="mb-1 lista-nombre">{{ $lista->nombre}}</h5></a>
                                    <p class="mb-3 lista-comentario" name="comentario_lista">{{$lista->Comentario}}</p>
                                </div>
                                <div class="despliege ml-4">
                                    @if (count($lista->todos) > 0)
                                        <button class="btn btn-primary btn-lg mb-2" type="button" data-toggle="collapse" data-target="#collapseExample{{$lista->id}}" aria-expanded="false" aria-controls="collapseExample{{$lista->id}}">
                                        Tareas
                                        </button>      
                                    @endif
                                    @if (!Auth::guest())
                                        @if (Auth::user()->id == $lista->user["id"]) <!-- Se usa para que solo el usuario logeado pueda borrar sus post-->
                                            <a href="#" class="btn btn-secondary btn-lg mb-2 boton-editar" id="listaId_{{$lista->id}}">Editar</a>
                                            <form action="/listas/{{$lista->id}}" method="POST" class="d-inline">
                                                {{ method_field('DELETE') }} <!--convierte el metodo POST a DELETE -->
                                                <button type="submit" class="btn btn-alert btn-lg mb-2" id="eliminar-lista">Eliminar</button>
                                                {{ csrf_field()}}
                                            </form>
                                        @endif
                                    @endif
                                </div>
                            </div> 
                        </div>
                        <div class="collapse" id="collapseExample{{$lista->id}}">
                            <div class="card card-body mb-0 mt-0 pb-1 pt-1">
                                <ul class="todo-list">
                                    @foreach ($lista->todos as $todo)
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
                                </ul>
                            </div>
                        </div>
                    @endforeach
                    </div>
                @else
                    <div class="jumbotron">
                        <h2 style="text-justify: center; color:black;" class=""> No tiene listas Disponibles </h2>
                        <p style="text-justify: center; color:black;"> Puede crear una.. :) </p>
                    </div>
                @endif
            </div>
        </div>
    </main>
    <div class="container col-sm-3 create-listas-form" id="crear-lista">
        <div class="p-3 custom-blue" style="border-radius: 25px;">
            <form action="/listas/" method="POST" id="editarListasForm">
                {{ method_field('PUT') }} <!--convierte el metodo POST a DELETE -->
                <h2 class="form-group card-title text-center">Editar lista</h2>
                <div class="form-group justify-center">
                    <div class="nombre-group">
                        <label class="col-form-label mr-3">Nombre</label>
                        <input type="text" id="nombreNuevaLista" class="form-control text-dark font-weight-bold" name="nombre">
                    </div>
                    <div class="nombre-group">
                        <label class="col-form-label mr-3">Comentario</label>
                        <textarea placeholder="Ingrese un corto comentario..." class="form-control text-dark font-weight-normal" name="comentario" id="comentarioLista" rows="3"></textarea>
                    </div>
                </div>
                <div class="form-group text-center">
                    <div class="">
                        <button type="button" class="btn btn-primary" id="cancelar-envio"> Regresar </button>
                        <button type="submit" class="btn btn-primary" id="enviar-lista">Editar</button>
                    </div>
                </div>
                @csrf
            </form>
        </div>
    </div>
@endsection


@section('javaScripts')

    <script type="text/javascript" src="{{asset("js/listas/index.js")}}"></script>

@endsection

