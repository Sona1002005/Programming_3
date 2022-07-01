var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Volcano extends LiveForm {
    constructor(x,y){
        super(x,y);
        this.multiply=0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x    , this.y - 2],
            [this.x    , this.y + 2],
            [this.x + 2, this.y    ],
            [this.x - 2, this.y    ],
        ]; 
    }
    chooseCell() {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if(matrix[y][x] != 9){
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    } 
    erupt(){
        let nearCells = this.chooseCell();
        this.multiply++;
        if(this.multiply>4){
        for(let i in nearCells){
            let x = nearCells[i][0];
            let y = nearCells[i][1];
            if(matrix[y][x]==1){
                for(let i in grassArr){
                    if(x == grassArr[i].x && y == grassArr[i].y){
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[y][x]==2){
                for(let i in grassEaterArr){
                    if(x == grassEaterArr[i].x && y == grassEaterArr[i].y){
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[y][x]==3){
                for(let i in predaterArr){
                    if(x == predaterArr[i].x && y == predaterArr[i].y){
                        predaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[y][x]==4){
                for(let i in destructerArr){
                    if(x == destructerArr[i].x && y == destructerArr[i].y){
                        destructerArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[y][x]==8){
                for(let i in mushEaterArr){
                    if(x == mushEaterArr[i].x && y == mushEaterArr[i].y){
                        mushEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            matrix[y][x]=6;
        }
        }   
        if(this.multiply>6 && this.multiply<8){
            for(let i in nearCells){
                let x = nearCells[i][0];
                let y = nearCells[i][1];
                matrix[y][x]=0;
                this.multiply=0;
            }
        }
        // else{
        //     for(let i in this.directions){
        //         let x = this.directions[i][0];
        //         let y = this.directions[i][1];
        //         matrix[y][x]=0;
        //         this.multiply=0;
        //     }   
        // }
    }
}