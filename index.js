

const socket = io();

const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const led1 = document.getElementById("led_1");
const led2 = document.getElementById("led_2");
const led3 = document.getElementById("led_3");
const led4 = document.getElementById("led_4");
const led5 = document.getElementById("led_5");
const led6 = document.getElementById("led_6");
const led7 = document.getElementById("led_7");
const led8 = document.getElementById("led_8");
const led9 = document.getElementById("led_9");


let led1State = 0;
let led2State = 0;
let led3State = 0;
let led4State = 0;
let led5State = 0;
let led6State = 0;
let led7State = 0;
let led8State = 0;
let led9State = 0;


var ctx = document.getElementById("myChart").getContext("2d");
var ctx2 = document.getElementById("myChart2").getContext("2d");



led1.addEventListener('click', () => {
    if (led1State == 1) {
        led1State = 0;
        led1.classList.remove('on');

    }
    else {
        led1State = 1;
        led1.classList.add('on');
    }
    
    send();
    
})
led2.addEventListener('click', () => {
    if (led2State == 1) {
        led2State = 0;
        led2.classList.remove('on');

    }
    else {
        led2State = 1;
        led2.classList.add('on');

    }
    send();
    
})
led3.addEventListener('click', () => {
    if (led3State == 1) {
        led3State = 0;
        led3.classList.remove('on');

    }
    else {
        led3State = 1;
        led3.classList.add('on');

    }
    send();
})
led4.addEventListener('click', () => {
    if (led4State == 1) {
        led4State = 0;
        led4.classList.remove('on');

    }
    else {
        led4State = 1;
        led4.classList.add('on');

    }
    send();
})
led5.addEventListener('click', () => {
    if (led5State == 1) {
        led5State = 0;
        led5.classList.remove('on');

    }
    else {
        led5State = 1;
        led5.classList.add('on');

    }
    send();
    
})
led6.addEventListener('click', () => {
    if (led6State == 1) {
        led6State = 0;
        led6.classList.remove('on');

    }
    else {
        led6State = 1;
        led6.classList.add('on');

    }
    send();
    
})
led7.addEventListener('click', () => {
    if (led7State == 1) {
        led7State = 0;
        led7.classList.remove('on');

    }
    else {
        led7State = 1;
        led7.classList.add('on');

    }
    send();
    
})
led8.addEventListener('click', () => {
    if (led8State == 1) {
        led8State = 0;
        led8.classList.remove('on');

    }
    else {
        led8State = 1;
        led8.classList.add('on');

    }
    send();
    
})
led9.addEventListener('click', () => {
    if (led9State == 1) {
        led9State = 0;
        led9.classList.remove('on');

    }
    else {
        led9State = 1;
        led9.classList.add('on');

    }
    send();
    
})

function send() {
    const param = {
        led1: led1State,
        led2: led2State,
        led3: led3State,
        led4: led4State,
        led5: led5State,
        led6: led6State,
        led7: led7State,
        led8: led8State,
        led9: led9State,
    }
    socket.emit('pressButton', param);
    console.log(param)
}

socket.on('sendData', (data) => {
    const { t, h } = data;
    temperature.innerText = t;
    humidity.innerText = h;
    
});
var inform1;
socket.on('dbData', (info) => {
    var inform = info;
    inform1 = inform;
    console.log(info)
    
    
    
    

    
    


});

var config2 = {
    type: 'line',
    data: {
        labels: [ // Date Objects
            
        ],
        datasets: [{
            label: 'Humidity',
            backgroundColor: 'rgba(0, 51, 255, 1)',
            borderColor: 'rgba(0, 51, 255, 1)',
            fill: false,
            data: [
                
            ],
        
        }]
    },
    options: {
        maintainAspectRatio: false,
        title: {
            text: 'Chart.js Time Scale'
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time',
                    color : 'white'
                },
                ticks: {color : 'white'},

            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Humidity',
                    color : 'white'

                },
                ticks: {color : 'white'},
                suggestedMin: 0,
                suggestedMax: 100,
            }
        }

        
    }
};
var config = {
    type: 'line',
    data: {
        labels: [ // Date Objects
            
        ],
        datasets: [{
            label: 'Temperature',
            backgroundColor: 'rgba(255, 0, 51, 1)',
            borderColor: 'rgba(255, 0, 51, 1)',
            fill: false,
            data: [
                
            ],
        
        }]
    },
    options: {
        maintainAspectRatio: false,
        
        title: {
            text: 'Chart.js Time Scale'
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Time',
                    color : 'white'

                },
                ticks: {
                    color: 'white',
                    
                },

                
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Temperature',
                    color : 'white'
                },
                suggestedMin: -20,
                suggestedMax: 40,
                ticks: { color: 'white' },
                
                
            }
            
        }

        
    }
};
var myChart = new Chart(ctx, config);
var myChart2 = new Chart(ctx2, config2)
var dataset = config.data.datasets;
var dataset2 = config2.data.datasets;
setInterval(() => {
    
    var time = new Date();
    let hour = String(time.getHours()).padStart(2,"0");
    let minute = String(time.getMinutes()).padStart(2,"0");
    let seconds = String(time.getSeconds()).padStart(2,"0");
    config.data.labels.push(`${hour}:${minute}:${seconds}`);
    config2.data.labels.push(`${hour}:${minute}:${seconds}`);
    dataset[0].data.push(inform1.temperature);
    dataset2[0].data.push(inform1.humidity);
    
    if (dataset[0].data.length > 10) {
        
        config.data.labels.pop(0);
        config2.data.labels.pop(0);
        
        dataset[0].data.shift();
        dataset2[0].data.shift();
        
    }
    myChart.update();
    myChart2.update();
}, 2000);