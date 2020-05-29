@extends('layouts.todoApp')

@section('cssEspecifico')

<link rel="stylesheet" type="text/css" href="{{ asset('css/dispositivos/style.css') }}">
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.bundle.js"></script>

@endsection

 @section('content2')
 <div class="img_gradient">
    <div class=container-iot>
        <h2 id="dispositivos">Dispositivos</h3>
        <h2 class="iot-title">Actuadores Disponibles Arduino </h2>
        <ul class="iots-list">
            <li class="iots-item">
                <h3 class="iots-title">Led Inicial</h2>
                <div class="iots-btn">
                    <div class="toggle">
                        <input type="checkbox" id="toggle"/>
                        <label for="toggle"></label>
                    </div>
                   <!-- <button class="btn btn-success boton">Encender</button>
                    <button class="btn btn-danger boton">Apagar</button> -->
                </div>
                <!-- <h3 class="iots-monitor"></h3> -->
                <div class="clear"></div>
            </li>
        </ul>
        <h2 class="iot-title"> Sensores Disponibles Arduino </h2>
        <ul class="sensor-list">
            <li class="sensor-item">
                <h3 class="sensor-title">Temperatura:</h3>
                <div class = "canva-container container">
                    <button class="btn btn-primary btn-iniciar-sensor">Iniciar</button>
                    <button class="btn btn-danger btn-pausar-sensor">Pausar</button>
                </div>
                <div class="clear"></div>
            </li>
        </ul>
    </div>
</div>
 @endsection


 @section('javaScripts')
 <script type="text/javascript" src="{{asset("js/app.js")}}"></script>
 <script type="text/javascript" src="{{asset("js/dispositivos/index.js")}}"></script>
 @endsection