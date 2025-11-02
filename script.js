const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#time-left');
const startButton = document.querySelector('#start-button');

let score = 0;
let timeLeft = 30; // Длительность игры в секундах
let lastHole;
let timeUp = false;
let timerId = null;
let countdownTimerId = null;

// Функция для генерации случайного времени появления крота
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Функция для выбора случайной норки
function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
        return randomHole(holes); // Избегаем повторения норки подряд
    }
    lastHole = hole;
    return hole;
}

// Функция, которая "высовывает" крота
function peep() {
    const time = randomTime(500, 1000); // Крот торчит от 0.5 до 1 секунды
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) {
            peep(); // Рекурсивный вызов для продолжения игры
        }
    }, time);
}

// Функция для отсчета времени игры
function countdown() {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;

    if (timeLeft === 0) {
        clearInterval(countdownTimerId);
        timeUp = true; // Останавливаем появление кротов
        alert(`Игра окончена! Ваш итоговый счет: ${score}`);
        startButton.disabled = false; // Разрешаем начать новую игру
    }
}

// Функция для обработки клика по кроту
function whack(event) {
    if (!timeUp && event.target.classList.contains('mole')) {
        score++;
        // Мгновенно прячем крота после удара
        event.target.parentNode.classList.remove('up'); 
        scoreDisplay.textContent = score;
    }
}

// Добавляем обработчики кликов на все норки
holes.forEach(hole => hole.addEventListener('click', whack));

// Функция старта игры
function startGame() {
    score = 0;
    timeLeft = 30;
    timeUp = false;
    scoreDisplay.textContent = 0;
    timeLeftDisplay.textContent = 30;
    startButton.disabled = true; // Отключаем кнопку пока игра идет

    peep(); // Запускаем первого крота
    countdownTimerId = setInterval(countdown, 1000); // Запускаем таймер
}

startButton.addEventListener('click', startGame);
