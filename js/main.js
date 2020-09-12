console.log('init!');

// init default values
const MAX_ENEMY = 2;

const setting = {
    start: false,
    score: 0,
    speed: 10,
    traffic: 3
};

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

// get main DOM elements
const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.gameArea');

// init player's car
const car = document.createElement('div');
car.classList.add('car');

// listen main events
start.addEventListener('click', startGame);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// init game background music
const audio = document.createElement('embed');
audio.classList.add('hidden');
audio.src = './audio/background.mp3';
audio.type = 'audio/mp3';


createLines();


// 2 day
function getQuantityElements(heightElement) {
    return document.documentElement.clientHeight / heightElement + 1;
}

function createLines() {
    const qantityElementsCount = getQuantityElements(100);

    for (let i = 0; i < qantityElementsCount; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = `${i * 100}px`;
        line.y = i * 100;

        gameArea.appendChild(line);
    }
}

// init game 
function startGame() {
    audio.classList.add('hidden');
    start.classList.add('hidden');

    for (let i = 0; i < getQuantityElements(120 * setting.traffic); i++) {
        const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1;

        const enemy = document.createElement('div');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url(./img/enemy${randomEnemy}.png) center / cover no-repeat`;
        enemy.classList.add('enemy');

        gameArea.appendChild(enemy);
    }

    setting.score = 0;
    setting.start = true;

    gameArea.appendChild(car);
    gameArea.appendChild(audio);

    car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
    car.style.top = 'auto';
    car.style.bottom = '10px';

    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(loop);
}

function loop() {
    moveRoad();
    moveEnemy();

    if (keys.ArrowLeft && setting.x > 0) {
        setting.x -= setting.speed;
    }

    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
        setting.x += setting.speed;
    }

    if (keys.ArrowUp && setting.y > 0) {
        setting.y -= setting.speed;
    }

    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
        setting.y += setting.speed;
    }

    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';

    requestAnimationFrame(loop);
}

function onKeyDown(event) {
    event.preventDefault();

    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = true;
    }

    console.log('key down');
}

function onKeyUp(event) {
    event.preventDefault();

    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = false;
    }

    console.log('key up');
}

function moveRoad() {
    let lines = document.querySelectorAll('.line');

    lines.forEach(function (line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';

        if (line.y >= document.documentElement.clientHeight) {
            line.y = -100;
        }
    });
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function (item) {
        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';

        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50));
        }
    })
}