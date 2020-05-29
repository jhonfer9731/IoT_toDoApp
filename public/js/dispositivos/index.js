//const encenderBtn = document.querySelector(".btn-success");
//const apagarBtn = document.querySelector(".btn-danger");
const cvContainer = document.querySelector(".canva-container");
const wSocket = io("https://serwsockets.herokuapp.com/");
const canvas = document.createElement('canvas');
const toggle = document.querySelector('#toggle');
const iniciarSensor = document.querySelector('.btn-iniciar-sensor');
const pausarSensor = document.querySelector('.btn-pausar-sensor');


const cerrarS = {
    finish: true,
    logged_in: false
};

//const t_inicial = new Date();

Chart.defaults.global.defaultFontColor = "whitesmoke";
Chart.defaults.global.elements.point.radius = 1;
Chart.defaults.global.defaultFontSize = 20;

canvas.id = "#sensor1";
canvas.classList.add("sensor");
cvContainer.appendChild(canvas);
canvas.getContext('2d');

var chart_element = new Chart(canvas, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperatura Habitación',
            data: [],
            borderColor: '#d0492d',
            pointBackgroundColor: '#ff826e',
            pointBorderColor: "fffbfb",
            fill: false
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                scaleLabel: {
                    display: true,
                    labelString: 'tiempo [s]',
                    fontSize: 14
                },
                ticks: { fontSize: 14 }
            }],
            yAxes: [{
                ticks:
                {
                    callback: function (value, index, values) {
                        return value + '°C';
                    },
                    fontSize: 14,
                    min: 17,
                    max: 33
                }
            }],
        },
        label: {
            fontSize: 10
        },
        legend: {
            labels: {
                fontSize: 14
            }
        },
        responsive: true,
        maintainAspectRatio: false
    }
});

canvas.style.backgroundColor = '#1b2a37bb';
cvContainer.style.minHeight = '400px';

let banComenzarMedicion = false;
pausarSensor.disabled = true;
//event listeners 

toggle.addEventListener('click', switchDispositivos);
iniciarSensor.addEventListener('click', (event) => {
    chart_element.data.labels = [];
    chart_element.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    banComenzarMedicion = true;
    pausarSensor.disabled = false;
    if (!pausarSensor.classList.contains('btn-danger')) {
        pausarSensor.classList.add('btn-danger');
        pausarSensor.classList.remove('btn-success');
        pausarSensor.innerHTML = 'pausar';
    }
});
pausarSensor.addEventListener('click', (event) => {
    banComenzarMedicion = !banComenzarMedicion;
    pausarSensor.classList.toggle('btn-danger');
    pausarSensor.classList.toggle('btn-success');
    if (pausarSensor.classList.contains('btn-danger')) {
        pausarSensor.innerHTML = 'pausar';

    } else {
        pausarSensor.innerHTML = 'Reanudar';
    }


});

//functions 

function switchDispositivos(event) {
    const senal = {
        estado: 'on',
        disp: 'led_inicial'
    }
    if (event.target.checked === true) {
        senal.estado = 'on';
    } else {
        senal.estado = 'off';
    }
    enviarSenalDisp(senal);

}

function offDevice(event) {
    apagarBtn.disabled = true;
    encenderBtn.disabled = false;
    console.log("apagando");
    const senal = {
        estado: 'off',
        disp: 'led_inicial'
    }
    enviarSenalDisp(senal);

}

function onDevice(event) {
    apagarBtn.disabled = false;
    encenderBtn.disabled = true;
    console.log("encendiendo");
    const senal = {
        estado: 'on',
        disp: 'led_inicial'
    }
    enviarSenalDisp(senal);
}


//let ban_temp = true

/* Recibe la señal proveniente del arduino */


wSocket.on('arduinoOutput', (body) => {
    //if(ban_temp) { console.log(body); ban_temp = false;}
    if (JSON.parse(body).outputs[0].valor !== undefined) {
        JSON.parse(body).outputs.forEach(output => {
            switch (output.nombre) {  // determina el tipo de sensor que esta enviando la informacion
                case 'temp':
                    const valorSensorfiltrado = filtroSensores(parseFloat(output.valor.toFixed(3)));
                    const t_actual = new Date(); // genera los valores de tiempo
                    if (banComenzarMedicion) addDataChart(chart_element, t_actual, valorSensorfiltrado.toFixed(2));
                    break;
                default:
                    break;
            }
        });
    }
});

/* Variables del filtro */

var ban_filter = true;
const prev_inputs = [];
const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length; // funcion saca el promedio de todos los elementos


// Funcion que realiza el filtrado y llama a la funcion que dibuja en la grafica


function filtroSensores(valorSensor) {
    // se establece un filtro de media movil para poder suavizar la señal
    if (ban_filter) {
        ban_filter = false;
        for (var i = 0; i < 5; i++) prev_inputs.push(valorSensor);
    } else {
        prev_inputs.push(valorSensor); // prev_inputs corresponde a la ventana del filtro
        prev_inputs.shift();
    }
    return arrAvg(prev_inputs); // obtiene el promedio
}


// funcion que agrega los datos al grafico a medida que vayan llegando a la app
function addDataChart(chart, label, data) {
    const temp = {
        t: label,
        y: data
    };
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(temp);
    });
    chart.update();
}


function enviarSenalDisp(senal) {


    wSocket.emit('led_inicial', JSON.stringify(senal));

    /*wSocket.on('led_inicial', (mensaje) => {
        console.log(mensaje);
    });*/
}


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



