class Cell {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
}
class Field extends Cell { //Класс игровое поле
    constructor() {
        super();
        this.height = 10;
        this.width = 10;
        let field = document.getElementsByClassName('field')[0];
        for (let x = 10; x >= 1; x--) {
            for (let y = 10; y >=1; y--) {
                let element = document.createElement("div"); //Рисуем клеточки поля
                element.classList.add(`Cell`);
                element.classList.add(`Cell${x}${y}`);
                field.appendChild(element);
            }
        }
    }
    clear() { //Для очистки клеток поля
        for (let x = 10; x >= 1; x--) {
            for (let y = 10; y >= 1; y--) {
                let element = document.getElementsByClassName(`Cell${x}${y}`)[0];
                if (element.classList.contains('Snake')) element.classList.remove(`Snake`);
                if (element.classList.contains('Apple')) element.classList.remove(`Apple`);
            }
        }
    }
}
// Служебная переменная, которая отвечает за скорость змейки
let count = 0;
// змейка
class Snake {
    constructor() {
        // Начальные координаты
        this.x = 4;
        this.y = 4;
        // Скорость змейки — в каждом новом кадре змейка смещается по оси Х или У. На старте будет двигаться горизонтально,
        // поэтому скорость по y равна нулю.
        this.dx = 1;
        this.dy = 0;
        // хвост, который пока пустой
        this.cells = [];
        // Стартовая длина змейки — 2 клеточки
        this.maxCells =  2;
    }
    moving() { //// Двигаем змейку с нужной скоростью
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
    }
}
// Яблоко
class Apple extends Cell { //Класс Яблоко

    constructor() {
        super();
        this.getApple();
    }
    random(min, max) {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    };
    getApple() {
        let num = this.random(1,10);
        if (num != 4) this.x = num; //Случайная координата х
        num = this.random(1,10);
        if (num != 4) this.y = num; //Случайная координата y
        this.render();
    }
    render() {//Нарисовать яблочко
        let c = document.getElementsByClassName(`Cell${this.x}${this.y}`)[0]; //Получаем клетку куда надо поместить яблоко
        c.classList.add('Apple'); //Показать яблоко в клетке
    }
}

// Игровой цикл — основной процесс, внутри которого будет всё происходить

function loop() {
    // Функция, которая замедляет скорость игры с 60 кадров в секунду до 15 (60/15 = 4)
    //requestAnimationFrame(loop);
    // Игровой код выполнится только один раз из четырёх, в этом и суть замедления кадров, а пока переменная count меньше четырёх, код выполняться не будет
    //if (++count < 18) {
    //    return;
    //}
    // Обнуляем переменную скорости
    //count = 0;
    // Очищаем игровое поле
    field.clear();
    // Двигаем змейку с нужной скоростью
    //snake.x += snake.dx;
    //snake.y += snake.dy;
    snake.moving();// Двигаем змейку с нужной скоростью
    // Если змейка достигла края поля по горизонтали — продолжаем её движение с противоположной строны
    if (snake.x < 1) {
        snake.x = field.width;
    }
    else if (snake.x > field.width) {
        snake.x = 1;
    }
    // Делаем то же самое для движения по вертикали
    if (snake.y < 1) {
        snake.y = field.height;
    }
    else if (snake.y > field.height) {
        snake.y = 1;
    }
    // Продолжаем двигаться в выбранном направлении. Голова всегда впереди, поэтому добавляем её координаты в начало массива, который отвечает за всю змейку
    snake.cells.unshift({ x: snake.x, y: snake.y });
    // Сразу после этого удаляем последний элемент из массива змейки, потому что она движется и постоянно освобождает клетки после себя
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    // Рисуем красное яблоко
    apple.render();
    // Обрабатываем каждый элемент змейки
    snake.cells.forEach(function (cell, index) {
        let c = document.getElementsByClassName(`Cell${cell.x}${cell.y}`)[0]; //Получаем клетку где надо нарисовать змею
        c.classList.add('Snake'); //Показать змейку в клетке
        // Если змейка добралась до яблока...
        if (cell.x === apple.x && cell.y === apple.y) {
            // увеличиваем длину змейки
            snake.maxCells++;
            // Рисуем новое яблочко
            field.clear();
            apple.getApple();// Рисуем новое яблочко
        }
        // Проверяем, не столкнулась ли змея сама с собой
        // Для этого перебираем весь массив и смотрим, есть ли у нас в массиве змейки две клетки с одинаковыми координатами
        for (let i = index + 1; i < snake.cells.length; i++) {
            // Если такие клетки есть — начинаем игру заново
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                // Задаём стартовые параметры основным переменным
                snake.x = 4;
                snake.y = 4;
                snake.cells = [];
                snake.maxCells = 2;
                snake.dx = 1;
                snake.dy = 0;
                // Ставим яблочко в случайное место
                apple.getApple();// Рисуем новое яблочко
            }
        }
    });
}
// Слушаем какие нажимаются клавиши и отрабатываем события
document.addEventListener('keydown', function (e) {
    // Стрелка влево
    if (e.key === 'ArrowLeft' && snake.dx === 0) {
        snake.dx = -1;
        snake.dy = 0;
    }
    // Стрелка вверх
    else if (e.key === 'ArrowUp' && snake.dy === 0) {
        snake.dy = 1;
        snake.dx = 0;
    }
    // Стрелка вправо
    else if (e.key === 'ArrowRight' && snake.dx === 0) {
        snake.dx = 1;
        snake.dy = 0;
    }
    // Стрелка вниз
    else if (e.key === 'ArrowDown' && snake.dy === 0) {
        snake.dy = -1;
        snake.dx = 0;
    }
});
// Запускаем игру
let field = new Field();
let apple = new Apple;
let snake = new Snake();
let timerId = setInterval(loop, 500);
//requestAnimationFrame(loop);