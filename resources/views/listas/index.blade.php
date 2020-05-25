@extends('layouts.todoApp')

@section('cssEspecifico')

    <link rel="stylesheet" type="text/css" href="{{ asset('css/listas/style.css') }}">

@endsection

@section('content2')
    <h1 class="title-listas"> Tus listas </h1>
    <div class="container">
        <div class="jumbotron mt-5 p-2 bg-dark">
            @if (count($listas) > 0)
                <div class="list-group">
                @foreach ($listas as $lista)
                    <div href="#" class=" w-120 list-group-item list-group-item-action align-items-start">
                        <div class="d-flex w-120 justify-content-around align-items-center">
                            <div class="container2">
                                <a href="/listas/{{$lista->id}}"><h5 class="mb-1 lista-nombre">{{ $lista->nombre}}</h5></a>
                                <p class="mb-3 lista-comentario">{{$lista->Comentario}}</p>
                            </div>
                            <div class="despliege">
                                @if (count($lista->todos) > 0)
                                    <button class="btn btn-primary btn-lg" type="button" data-toggle="collapse" data-target="#collapseExample{{$lista->id}}" aria-expanded="false" aria-controls="collapseExample{{$lista->id}}">
                                    Tareas
                                    </button>
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
@endsection

