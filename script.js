let currentNumber;
let nextNumber;
let range;
let score = 0;
let isGameOver = false;

document.getElementById('start-btn').addEventListener('click', initializeGame);

document.getElementById('restart-btn').addEventListener('click', restartGame);

function initializeGame() {
    const rangeInput = document.getElementById('range-input').value;
    range = parseInt(rangeInput, 10);
    if (isNaN(range) || range < 10 || range > 1000) {
        alert('Please enter a valid number between 10 and 1000.');
        return;
    }
    startGame();
    document.getElementById('start-screen').classList.add('hidden');
    const gameScreen = document.getElementById('game-screen');
    gameScreen.classList.remove('hidden');
    gameScreen.classList.add('visible');
}

function startGame() {
    score = 0;
    isGameOver = false;
    currentNumber = generateRandomNumber();
    updateNumberDisplay();
    updateButtonProbabilities();
    resetButtons();
    document.getElementById('restart-btn').classList.add('hidden');
    updateScoreDisplay();
}

function generateRandomNumber() {
    return Math.floor(Math.random() * range) + 1;
}

function updateNumberDisplay() {
    const currentNumberElement = document.getElementById('current-number');
    currentNumberElement.textContent = currentNumber;
    currentNumberElement.classList.add('tween');
    setTimeout(() => {
        currentNumberElement.classList.remove('tween');
    }, 500);
}

function updateButtonProbabilities() {
    const higherButton = document.getElementById('higher-btn');
    const lowerButton = document.getElementById('lower-btn');

    higherButton.innerHTML = `Higher<br><span class="button-probability">${calculateProbability('higher')}%</span>`;
    lowerButton.innerHTML = `Lower<br><span class="button-probability">${calculateProbability('lower')}%</span>`;
}

function calculateProbability(direction) {
    if (direction === 'higher') {
        return (currentNumber < range ? ((range - currentNumber) / range * 100) : 0).toFixed(2);
    } else if (direction === 'lower') {
        return (currentNumber > 1 ? ((currentNumber - 1) / range * 100) : 0).toFixed(2);
    }
    return '0.00';
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

document.getElementById('higher-btn').addEventListener('click', () => guess('higher'));
document.getElementById('lower-btn').addEventListener('click', () => guess('lower'));

function guess(direction) {
    if (isGameOver) return;

    nextNumber = generateRandomNumber();
    const isCorrect =
        (direction === 'higher' && nextNumber > currentNumber) ||
        (direction === 'lower' && nextNumber < currentNumber);

    const button = direction + '-btn';

    if (isCorrect) {
        document.getElementById(button).classList.add('correct');
        score++;
    } else {
        document.getElementById(button).classList.add('wrong');
        document.getElementById('restart-btn').classList.remove('hidden');
        isGameOver = true;
        disableButtons();
        showFinalScore();
    }

    updateScoreDisplay();

    setTimeout(() => {
        document.getElementById(button).classList.remove('correct', 'wrong');
    }, 1000);

    currentNumber = nextNumber;
    updateNumberDisplay();
    updateButtonProbabilities();
}

function showFinalScore() {
    const currentNumberElement = document.getElementById('current-number');
    currentNumberElement.classList.add('hidden');
    const scoreElement = document.getElementById('score');
    scoreElement.classList.add('score-big');
}

function restartGame() {
    score = 0;
    isGameOver = false;
    document.getElementById('start-screen').classList.remove('hidden');
    const gameScreen = document.getElementById('game-screen');
    gameScreen.classList.add('hidden');
    gameScreen.classList.remove('visible');

    updateScoreDisplay();
    resetButtons();
    const currentNumberElement = document.getElementById('current-number');
    currentNumberElement.classList.remove('hidden');
    currentNumberElement.textContent = 0;
    const scoreElement = document.getElementById('score');
    scoreElement.classList.remove('score-big');
}

function resetButtons() {
    const buttons = ['higher-btn', 'lower-btn'];
    buttons.forEach((id) => {
        const button = document.getElementById(id);
        button.classList.remove('correct', 'wrong');
        button.classList.remove('hidden');
        button.disabled = false;
    });
}

function disableButtons() {
    const buttons = ['higher-btn', 'lower-btn'];
    buttons.forEach((id) => {
        const button = document.getElementById(id);
        button.classList.add('hidden');
        button.disabled = true;
    });
}