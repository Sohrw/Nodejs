
const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app);
const socketIO = require('socket.io');

const io = socketIO(server);


const PORT = process.env.PORT || 5002; 
app.use(express.static(path.join(__dirname, "/")));
const maria = require('./maria.js');

maria.connect();



let led1State = 0;
let led2State = 0;
let led3State = 0;
let led4State = 0;
let led5State = 0;
let led6State = 0;
let led7State = 0;
let led8State = 0;
let led9State = 0;
io.on("connection", (socket) => {
    var dataSheet = [];
    socket.on("sendData", (data) => {
        const { t, h, } = data;
        
        io.emit("sendData" ,{
            t : t,
            h: h,
            
            
        });
        var dataBit = [ t, h];
        var sql = "INSERT INTO info (date,temperature, humidity) VALUES (NOW(),?,?)";
        maria.query(sql, dataBit, function (err, results) {
            if (err) throw err;
            maria.query(`SELECT * FROM info WHERE id=${results.insertId}`, function (error2, info) {
                if (error2) throw error2;
                dataSheet = info;
                console.log(dataSheet);
                io.emit('dbData', dataSheet[0]);

                
            })

        });
        
    });
    socket.on('pressButton', (data) => {
        const { led1, led2, led3, led4, led5, led6, led7, led8, led9 } = data;
        led1State = led1;
        led2State = led2;
        led3State = led3;
        led4State = led4;
        led5State = led5;
        led6State = led6;
        led7State = led7;
        led8State = led8;
        led9State = led9;
        io.emit("pressButton", {
            led1: led1,
            led2: led2,
            led3: led3,
            led4: led4,
            led5: led5,
            led6: led6,
            led7: led7,
            led8: led8,
            led9: led9,

        })
    })
    
    
    
});


server.listen(PORT, () => {
    console.log(`server is running ${PORT}`);
})

