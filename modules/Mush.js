var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Mush{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.multiply=0;
        this.max=10;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ]; 
    }
    chooseCell(t){
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] != t || matrix[y][x] != 8 || matrix[y][x] != 9) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul(){
        var newCell = random(this.chooseCell(7));
        if(newCell && this.multiply>=this.max ){
            var newX = newCell[0];
            var newY = newCell[1];
            
            if(matrix[newY][newX]==1){
                for(let i in grassArr){
                    if(newX == grassArr[i].x && newY == grassArr[i].y){
                        grassArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[newY][newX]==2){
                for(let i in grassEaterArr){
                    if(newX == grassEaterArr[i].x && newY == grassEaterArr[i].y){
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[newY][newX]==3){
                for(let i in predaterArr){
                    if(newX == predaterArr[i].x && newY == predaterArr[i].y){
                        predaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[newY][newX]==4){
                for(let i in destructerArr){
                    if(newX == destructerArr[i].x && newY == destructerArr[i].y){
                        destructerArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if(matrix[newY][newX]==5){
                for(let i in volcanoArr){
                    if(newX == volcanoArr[i].x && newY == volcanoArr[i].y){
                        volcanoArr.splice(i, 1);
                        break;
                    }
                }
            }
           
            matrix[newY][newX]=7;
            mushArr.push(new Mush(newY, newX));

            this.multiply=0;
        }
        
        this.multiply++
    }

}