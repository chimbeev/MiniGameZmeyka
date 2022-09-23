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


let field__div = document.getElementsByClassName('field')[0];

for (let i=100; i>=1; i--) {
    let element = document.createElement("div");
    element.classList.add(`Cell`);
    element.classList.add(`Cell${i}`);
    field__div.appendChild(element);
}



