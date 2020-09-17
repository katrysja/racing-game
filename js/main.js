console.log('init!');

// init default values
const MAX_ENEMY = 2;
const HEIGHT_ELEM = 100;
const WIDTH_ELEM = 50;

const setting = {
    start: false,
    score: 0,
    speed: 10,
    traffic: 3
};

topScore.textContent = localStorage.getItem('nfjs_score',setting.score)?
localStorage.setItem('nfjs_score',setting.score) 
: 0;
const addLocalStorage = ()=> {
    localStorage.setItem('nfjs_score',setting.score);
    topScore.textContent=setting.score
}

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};

// get main DOM elements
const score = document.querySelector('.score');
const start = document.querySelector('.start');

// level options
const easy = document.querySelector('#easy');
const medium = document.querySelector('#medium');
const hard = document.querySelector('#hard');

const gameArea = document.querySelector('.gameArea');

const countSection = Math.floor(document.documentElement.clientHeight / HEIGHT_ELEM);

gameArea.style.height = countSection * HEIGHT_ELEM;

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


function getQuantityElements(heightElement) {
    return (gameArea.offsetHeight / heightElement) + 1;
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

function changeLevel(event) {
    const target = event.target;

    switch (target.id) {
        case 'easy':
            setting.speed = 3;
            setting.traffic = 4;
            break;

        case 'medium':
            setting.speed = 5;
            setting.traffic = 3;
            break;

        case 'hard':
            setting.speed = 6;
            setting.traffic = 2;
            break;
    }
}

// init game 
function startGame(event) {
    changeLevel(event);

    audio.classList.add('hidden');
    start.classList.add('hidden');

    gameArea.innerHTML = '';

    for (let i = 0; i < getQuantityElements(HEIGHT_ELEM); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * HEIGHT_ELEM) + 'px';
        line.style.height = (HEIGHT_ELEM / 2) + 'px';
        line.y = i * HEIGHT_ELEM;

        gameArea.appendChild(line)
    }

    for (let i = 0; i < getQuantityElements(120 * setting.traffic); i++) {
        const randomEnemy = Math.floor(Math.random() * MAX_ENEMY) + 1;
        const enemy = document.createElement('div');
        const periodEnemy = -HEIGHT_ELEM * setting.traffic * (i + 1);
        enemy.y = periodEnemy < 100 ? -100 * setting.traffic * (i + 1) : periodEnemy;
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - enemy.offsetWidth)) + 'px';
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
    if (setting.start) {
        setting.score += setting.speed;
        score.innerHTML = 'Score<br>' + setting.score;

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

        if (line.y >= gameArea.offsetHeight) {
            line.y = -HEIGHT_ELEM;
        }
    });
}

function moveEnemy() {
    let enemys = document.querySelectorAll('.enemy');

    enemys.forEach(function (enemy) {
        let carRect = car.getBoundingClientRect();
        let enemyRect = enemy.getBoundingClientRect();

        if (carRect.top <= enemyRect.bottom &&
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top) {

            setting.start = false;
            console.warn('ДТП');

            start.classList.remove('hidden');
            audio.remove();
            start.style.stop = score.offsetHeight;
            addLocalStorage()
        }; 

        enemy.y += setting.speed / 2;
        enemy.style.top = enemy.y + 'px';

        if (enemy.y >= gameArea.offsetHeight) {
            enemy.y = -HEIGHT_ELEM * setting.traffic;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - WIDTH_ELEM / 2)) + 'px';
        }
    });
}
