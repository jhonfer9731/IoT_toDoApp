const encenderBtn = document.querySelector(".btn-success");
const apagarBtn = document.querySelector(".btn-danger");
const cvContainer = document.querySelector(".canva-container");
const wSocket = io("https://serwsockets.herokuapp.com/");
const canvas = document.createElement('canvas');

const cerrarS = {
    finish: true,
    logged_in: false
};

const t_inicial = new Date();

Chart.defaults.global.defaultFontColor = "whitesmoke";
Chart.defaults.global.elements.point.radius = 1;
Chart.defaults.global.defaultFontSize = 20;

canvas.id = "#sensor1";
canvas.classList.add("sensor");
cvContainer.appendChild(canvas);
canvas.getContext('2d');
const chart_element = new Chart(canvas, {
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
                scaleLabel: {
                    display: true,
                    labelString: 'tiempo [s]',
                },
                ticks:{ fontSize: 14}
            }],
            yAxes: [{
                ticks:
                {
                    callback: function(value,index, values){
                        return value + '°C';
                    },
                    fontSize: 18,
                    min: 17,
                    max:33
                }
            }],
        },
        label: {
            fontSize: 10
        }
    }
});
canvas.style.backgroundColor = '#1b2a37bb';




apagarBtn.addEventListener('click', offDevice);
encenderBtn.addEventListener('click', onDevice);



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

var prev_inputs = [];
var ban_filter = true;

wSocket.on('arduinoOutput', (output) => {
    if (JSON.parse(output).outputs[0].valor !== undefined) {
        var output_valor = JSON.parse(output).outputs[0].valor;
        if (ban_filter) {
            ban_filter = false;
            for (var i = 0; i < 5; i++) prev_inputs.push(output_valor);
        } else {
            prev_inputs.push(output_valor);
            prev_inputs.shift();
        }
        var t_actual = new Date();
        var tiempo = t_actual - t_inicial;
        //console.log(prev_inputs);
        const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
        const mean = arrAvg(prev_inputs);
        addDataChart(chart_element, (tiempo / 1000).toFixed(0), mean);
    }
});


// funcion que agrega los datos al grafico a medida que vayan llegando a la app
function addDataChart(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}


function enviarSenalDisp(senal) {


    wSocket.emit('led_inicial', JSON.stringify(senal));

    /*wSocket.on('led_inicial', (mensaje) => {
        console.log(mensaje);
    });*/
}



