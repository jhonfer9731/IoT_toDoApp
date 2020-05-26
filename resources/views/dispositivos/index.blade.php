@extends('layouts.todoApp')

@section('cssEspecifico')

<link rel="stylesheet" type="text/css" href="{{ asset('css/dispositivos/style.css') }}">
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>

@endsection

 @section('content2')
 <div class="img_gradient">
    <div class=container-iot>
        <h2 id="dispositivos">Dispositivos</h3>
        <ul class="iots-list">
            <li class="iots-item">
                <h3 class="iots-title">Led Inicial</h2>
                <div class="iots-btn">
                    <button class="btn btn-success">Encender</button>
                    <button class="btn btn-danger">Apagar</button>
                </div>
                <!-- <h3 class="iots-monitor"></h3> -->
                <div class="clear"></div>
            </li>
        </ul>
        <h2 class="iot-title"> Sensores Disponibles Arduino </h3>
        <ul class="sensor-list">
            <li class="sensor-item">
                <h3 class="sensor-title">Temperatura:</h3>
                <div class = "canva-container">
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