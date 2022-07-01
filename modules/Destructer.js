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
    chooseCell(t) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] != 4 || matrix[y][x] != 6 || matrix[y][x] != 7 || matrix[y][x] != 8 || matrix[y][x] != 9 || matrix[y][x] != t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    } 
    mul() {
        let emptyCells = this.chooseCell(100);
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
        let emptyCells = this.chooseCell(0);
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
            else if(matrix[y][x]==5){
                for (let i in volcanoArr) {
                    if (volcanoArr[i].x == x && volcanoArr[i].y == y) {
                        volcanoArr.splice(i, 1);
                        let directions = [
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
                        for(i in directions){
                            let a = directions[i][0];
                            let b = directions[i][1];
                            if (a >= 0 && a < matrix[0].length && b >= 0 && b < matrix.length) {
                                matrix[b][a]=0;
                            }
                        }
                    }
                }
            }

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            if (this.life >= 50) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(100);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
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