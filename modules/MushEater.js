var LiveForm = require("./LiveForm");
var random = require("./random.js");



module.exports = class MushEater extends LiveForm {
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
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 8;
            let mushEater = new MushEater(x, y);
            mushEaterArr.push(mushEater);
            this.life = 5;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(7);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 8;
            matrix[this.y][this.x] = 0;

            for (let i in mushArr) {
                if (mushArr[i].x == x && mushArr[i].y == y) {
                    mushArr.splice(i, 1)
                }
            }
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
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 8;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
    }
}