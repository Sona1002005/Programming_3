var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class Destructer extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell1(t) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] != t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    } 
    chooseCell2(character){
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    mul() {
        let emptyCells = this.chooseCell(4);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let destructer = new Destructer(x, y);
            destructerArr.push(destructer);
            this.life = 5;
        }
    }
    eat() {
        let emptyCells = this.chooseCell1(0);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            if(matrix[y][x]==1){
                for (let i in grassArr) {
                    if (grassArr[i].x == x && grassArr[i].y == y) {
                        grassArr.splice(i, 1)
                    }
                }
            }
            else if(matrix[y][x]==2){
                for (let i in grassEaterArr) {
                    if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                        grassEaterArr.splice(i, 1)
                    }
                }
            }
            else if(matrix[y][x]==3){
                for (let i in predaterArr) {
                    if (predaterArr[i].x == x && predaterArr[i].y == y) {
                        predaterArr.splice(i, 1)
                    }
                }
            }

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            if (this.life >= 30) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell2(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;

            let nearCells = this.chooseCell(4);
            for(let i = 0; i < nearCells.length; i++){
                let x = nearCells[i][0];
                let y = nearCells[i][1];

                if(matrix[y][x]==1){
                    this.life++;
                    for (let i in grassArr) {
                        if (grassArr[i].x == x && grassArr[i].y == y) {
                            grassArr.splice(i, 1)
                        }
                    }
                }
                else if(matrix[y][x]==2){
                    this.life++;
                    for (let i in grassEaterArr) {
                        if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                            grassEaterArr.splice(i, 1)
                        }
                    }
                }
                else if(matrix[y][x]==3){
                    this.life++;
                    for (let i in predaterArr) {
                        if (predaterArr[i].x == x && predaterArr[i].y == y) {
                            predaterArr.splice(i, 1)
                        }
                    }
                }

                matrix[y][x]=0;
            }
            
            
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in destructerArr) {
            if (destructerArr[i].x == this.x && destructerArr[i].y == this.y) {
                destructerArr.splice(i, 1)
            }
        }
    }
}