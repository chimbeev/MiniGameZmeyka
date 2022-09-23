class Cell {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }

    GetCell() {
        return this.x, this.y, this.color;
    }

    SetCell(x, y, color ) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}

class Field {
    constructor(numberX, numberY) {

    }
}

let element = document.createElement("div");
element.classList.add("Cell");
let field__div = document.getElementsByClassName('field')[0].appendChild(element);


