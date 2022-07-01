var socket = io();
//! Setup function fires automatically
function setup() {
    var weath = 'winter';
    var side = 20;
    
    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predaterElement = document.getElementById('predaterCount');
    let destructerElement = document.getElementById('destructerCount');
    let volcanoElement = document.getElementById('volcanoCount');
    let mushElement = document.getElementById('mushCount');
    let mushEaterElement = document.getElementById('mushEaterCount');


    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);
    socket.on("weather", function (data)
    {
        weath = data;
    })
    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predaterElement.innerText = data.predaterCounter;
        destructerElement.innerText = data.destructerCounter;
        volcanoElement.innerText = data.volcanoCounter;
        mushElement.innerText = data.mushCounter;
        mushEaterElement.innerText = data.mushEaterCounter;
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        if(weath == "spring"){
            document.body.style.background = "url('spring.jpg') no-repeat center center fixed";
        }
        else if(weath == "summer"){
            document.body.style.background = "url('summer.jpg') no-repeat center center fixed";
        }
        else if(weath == "winter"){
            document.body.style.background = "url('winter.jpg') no-repeat center center fixed"
        }
        else if(weath == "autumn"){
            document.body.style.background = "url('autumn.jpg') no-repeat center center fixed"
        }

        if(weath == "spring"){
            document.getElementById("grassCol").style.backgroundColor = "green";
            document.getElementById("grassEaterCol").style.backgroundColor = "yellow";
            document.getElementById("predaterCol").style.backgroundColor = "#ff1cc6";
            document.getElementById("destructerCol").style.backgroundColor = "blue";
            document.getElementById("volcanoCol").style.backgroundColor = "#ff5e00";
            document.getElementById("mushEaterCol").style.backgroundColor = "#8906b1";
        }
        else if(weath == "summer"){
            document.getElementById("grassCol").style.backgroundColor = "#1cfc03";
            document.getElementById("grassEaterCol").style.backgroundColor = "yellow";
            document.getElementById("predaterCol").style.backgroundColor = "#ff1cc6";
            document.getElementById("destructerCol").style.backgroundColor = "blue";
            document.getElementById("volcanoCol").style.backgroundColor = "#ff5e00";
            document.getElementById("mushEaterCol").style.backgroundColor = "#8906b1";
        }
        else if(weath == "winter"){
            document.getElementById("grassCol").style.backgroundColor = "#c8fcc2";
            document.getElementById("grassEaterCol").style.backgroundColor = "#f7f1a6";
            document.getElementById("predaterCol").style.backgroundColor = "#f78ddd";
            document.getElementById("destructerCol").style.backgroundColor = "#9dadfc";
            document.getElementById("volcanoCol").style.backgroundColor = "#ff8640";
            document.getElementById("mushEaterCol").style.backgroundColor = "#ab3fcc";
        }
        else if(weath == "autumn"){
            document.getElementById("grassCol").style.backgroundColor = "#bbff00";
            document.getElementById("grassEaterCol").style.backgroundColor = "yellow";
            document.getElementById("predaterCol").style.backgroundColor = "#ff1cc6";
            document.getElementById("destructerCol").style.backgroundColor = "blue";
            document.getElementById("volcanoCol").style.backgroundColor = "#ff5e00";
            document.getElementById("mushEaterCol").style.backgroundColor = "#8906b1";
        }

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                        if(weath == "spring")
                        {
                            fill("green")
                        }
                        else if(weath == "summer")
                        {
                            fill("#1cfc03");
                        }
                        else if(weath == "winter")
                        {
                            fill("#c8fcc2")
                        }
                        else if(weath == "autumn")
                        {
                            fill("#bbff00")
                        }
                        rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    if(weath == "spring"){
                        fill("yellow")
                    }
                    else if(weath == "summer"){
                        fill("yellow");
                    }
                    else if(weath == "winter"){
                        fill("#f7f1a6")
                    }
                    else if(weath == "autumn"){
                        fill("yellow")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill("#bababa");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    if(weath == "spring"){
                        fill("#ff1cc6")
                    }
                    else if(weath == "summer"){
                        fill("#ff1cc6");
                    }
                    else if(weath == "winter"){
                        fill("#f78ddd")
                    }
                    else if(weath == "autumn"){
                        fill("#ff1cc6")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    if(weath == "spring"){
                        fill("blue")
                    }
                    else if(weath == "summer"){
                        fill("blue");
                    }
                    else if(weath == "winter"){
                        fill("#9dadfc")
                    }
                    else if(weath == "autumn"){
                        fill("blue")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    if(weath == "spring"){
                        fill("#ff5e00")
                    }
                    else if(weath == "summer"){
                        fill("#ff5e00");
                    }
                    else if(weath == "winter"){
                        fill("#ff8640")
                    }
                    else if(weath == "autumn"){
                        fill("#ff5e00")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 6) {
                    if(weath == "spring"){
                        fill("#ff8000")
                    }
                    else if(weath == "summer"){
                        fill("#ff8000");
                    }
                    else if(weath == "winter"){
                        fill("#ffb870")
                    }
                    else if(weath == "autumn"){
                        fill("#ff8000")
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 7) {
                    fill(0, 67, 43);
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 8) {
                    if(weath == "spring"){
                        fill(137, 6, 177)
                    }
                    else if(weath == "summer"){
                        fill(137, 6, 177);
                    }
                    else if(weath == "winter"){
                        fill("#ab3fcc")
                    }
                    else if(weath == "autumn"){
                        fill(137, 6, 177)
                    }
                    fill(137, 6, 177);
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 9) {
                    fill("#ff0000");
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
    
}

function kill() {
    socket.emit("kill")
}
function fire() {
    const myTimeout = setTimeout(stopFire, 10000);
    socket.emit("fire")
}
function stopFire() {
    socket.emit("stopfire")
}
