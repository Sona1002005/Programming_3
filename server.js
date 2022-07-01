// 
weath = "winter";
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predater = require("./modules/Predater.js");
var Destructer = require("./modules/Destructer.js");
var Volcano = require("./modules/Volcano.js");
var Mush = require("./modules/Mush.js");
var MushEater = require("./modules/MushEater.js");
let random = require('./modules/random');
let fs =require('fs')
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
predaterArr = [];
destructerArr = []
volcanoArr = [];
mushArr = [];
mushEaterArr = [];
matrix = [];
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, grassEaterEater, destructer, volcano, mush, mushEater, waterArr, fireArr) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < grassEaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < destructer; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < volcano; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < mush; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 7;
    }
    for (let i = 0; i < mushEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 8;
    }
    for (let i = 0; i < waterArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 9;
    }
    for (let i = 0; i < fireArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 10;
    }
    
}
matrixGenerator(50, 200, 200, 300, 50, 20, 20, 10);
//! Creating MATRIX -- END

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var predater = new Predater(x, y);
                predaterArr.push(predater);
            }
            else if (matrix[y][x] == 4) {
                var destructer = new Destructer(x, y);
                destructerArr.push(destructer);
            }
            else if (matrix[y][x] == 5) {
                var volcano = new Volcano(x, y);
                volcanoArr.push(volcano);
            }
            else if (matrix[y][x] == 7) {
                var mush = new Mush(x, y);
                mushArr.push(mush);
            }
            else if (matrix[y][x] == 8) {
                var mushEater = new MushEater(x, y);
                mushEaterArr.push(mushEater);
            }
        }
    }
}

function game() {
    if (grassArr[0] !== undefined) {
        if(weath == 'autumn') {
            for (var i in grassArr) {
                grassArr[i].max = 6;
            }
        }
        if(weath != 'autumn') {
            for (var i in grassArr) {
                grassArr[i].max = 3;
            }
        }
        if(weath != 'winter') {
            for (var i in grassArr) {
                grassArr[i].mul();
            }
        }
        
    }
    if (grassEaterArr[0] !== undefined) {
        if(weath == 'summer') {
            for (var i in grassEaterArr) {
                grassEaterArr[i].max = 5;
            }
        }
        if(weath != 'summer') {
            for (var i in grassEaterArr) {
                grassEaterArr[i].max = 10;
            }
        }
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predaterArr[0] !== undefined) {
        for (var i in predaterArr) {
            predaterArr[i].eat();
        }
    }
    if (destructerArr[0] !== undefined) {
        if(weath == 'spring' || weath == 'winter') {
            for (var i in destructerArr) {
                destructerArr[i].eat();
            }
        }
    }
    if (volcanoArr[0] !== undefined) {
        for (var i in volcanoArr) {
            volcanoArr[i].erupt();
        }
    }
    if (mushArr[0] !== undefined) {
        if(weath == 'autumn') {
            for (var i in mushArr) {
                mushArr[i].max = 8 ;
            }
        }
        if(weath != 'autumn') {
            for (var i in mushArr) {
                mushArr[i].max = 10;
            }
        }
        for (var i in mushArr) {
            mushArr[i].mul();
        }
    }
    if (mushEaterArr[0] !== undefined) {
        if(weath == 'summer' || weath == 'autumn') {
            for (var i in mushEaterArr) {
                mushEaterArr[i].eat();
            }
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassArr.length,
        grassEaterCounter: grassEaterArr.length,
        predaterCounter: predaterArr.length,
        destructerCounter: destructerArr.length,
        volcanoCounter: volcanoArr.length,
        mushCounter: mushArr.length,
        mushEaterCounter: mushEaterArr.length
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)

//// Add event
function kill1() {
    grassArr = [];
    grassEaterArr = [];
    predaterArr=[];
    destructerArr=[];
    volcanoArr=[];
    mushArr=[];
    mushEaterArr=[];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}
function fire1() {
    let fr = 0;
    let x = Math.floor(random(matrix.length));
    let y = Math.floor(random(matrix.length));
    directions = [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1]
    ];
    for(i=0; i<10; i++){
        let x = Math.floor(random(matrix.length));
        let y = Math.floor(random(matrix.length));
        directions = [
            [x, y],
            [x - 1, y - 1],
            [x, y - 1],
            [x + 1, y - 1],
            [x - 1, y],
            [x + 1, y],
            [x - 1, y + 1],
            [x, y + 1],
            [x + 1, y + 1],
            [x - 2, y - 2],
            [x - 2, y - 1],
            [x - 2, y],
            [x - 2, y + 1],
            [x - 2, y + 2],
            [x + 2, y - 2],
            [x + 2, y - 1],
            [x + 2, y],
            [x + 2, y + 1],
            [x + 2, y + 2],
            [x - 1, y - 2],
            [x, y - 2],
            [x + 1, y - 2],
            [x - 1, y + 2],
            [x, y + 2],
            [x + 1, y + 2],
            
        ];
        for(j in directions){
            a=directions[j][0];
            b=directions[j][1];
            if (a >= 0 && a < matrix.length && b >= 0 && b < matrix.length) { 
                if(matrix[b][a]==1){
                    for(let i in grassArr){
                        if(a == grassArr[i].x && b == grassArr[i].y){
                            grassArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if(matrix[b][a]==2){
                    for(let i in grassEaterArr){
                        if(a == grassEaterArr[i].x && b == grassEaterArr[i].y){
                            grassEaterArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if(matrix[b][a]==3){
                    for(let i in predaterArr){
                        if(a == predaterArr[i].x && b == predaterArr[i].y){
                            predaterArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if(matrix[b][a]==4){
                    for(let i in destructerArr){
                        if(a == destructerArr[i].x && b == destructerArr[i].y){
                            destructerArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if(matrix[b][a]==5){
                    for(let i in volcanoArr){
                        if(a == volcanoArr[i].x && b == volcanoArr[i].y){
                            volcanoArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if(matrix[b][a]==7){
                    for(let i in mushArr){
                        if(a == mushArr[i].x && b == mushArr[i].y){
                            mushArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if(matrix[b][a]==8){
                    for(let i in mushEaterArr){
                        if(a == mushEaterArr[i].x && b == mushEaterArr[i].y){
                            mushEaterArr.splice(i, 1);
                            break;
                        }
                    }
                }
                matrix[b][a]=9;
            }
        }
    }       
}
function stopFire() {
    for(x in matrix){
        for(y in matrix){
            if(matrix[y][x]==9){
                matrix[y][x]=0;
            }
        }
    }
}

io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill1);
});

io.on('connection', function (socket) {
    creatingObjects();
    socket.on("fire", fire1);
});

io.on('connection', function (socket) {
    creatingObjects();
    socket.on("stopfire", stopFire);
});
////   Create static Json
var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predater = predaterArr.length;
    statistics.destructer = destructerArr.length;
    statistics.volcano = volcanoArr.length;
    statistics.mush = mushArr.length;
    statistics.mushEater = mushEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)
