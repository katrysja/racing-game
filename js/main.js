console.log('init!');

const scoreNode = document.querySelector('.score');
const startNode = document.querySelector('.start');
const gameAreaNode = document.querySelector('.gameArea');
const car = document.createElement('div');
car.classList.add('car');

startNode.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3;
}
//2 day
function getQuantityElements() {
    retutn document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
    start.classList.add('hide');
    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = `${i * 100}px`;
        line.y = i * 100;
        gameAreaNode.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * gameArae.offsetWidth - 5);
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = 'transparent url(.image/enemy2.png' center;
        gameAreaNode.appendChild(enemy);
    }
    setting.start = true;
    gameAreaNode.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {

    if (settingStart) {
        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArae.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }
        if (keys.ArrowDown && setting.y < (gameArae.offsetWidth - car.offsetWidth)) {
            setting.y += setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';

        requestAnimationFrame(playGame);
    }
}

function startGame() {
    startNode.classList.add('hide');
    gameAreaNode.appendChild(car);
    setting.start = true;

    requestAnimationFrame(playGame);

    console.log('start!');
};

function playGame() {
    if (setting.start) {
        requestAnimationFrame(playGame);

        console.log('tick');
    }
};

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;

    console.log('key down');
};

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;

    console.log('key up');
};

function moveRoad() {
    let line = document.querySelectorAll('.line');
    lines.forEach(function (line)) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';
    }
    if (line.y = document.documentElement.clientHeight) {
        line.y = -100;
    }
}