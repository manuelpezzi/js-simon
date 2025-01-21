const coountdownEl = document.getElementById("countdown");
const instructionsEl = document.getElementById('instructions');
const numberListEl = document.getElementById('nuber-list');
const answerFormEl = document.getElementById('answers-form');
const imputGroupEl = document.getElementById('imput-group');
const messageEl = document.getElementById('message');

let randomNumbers = [];
let countdown = 5;

function generateRandomNumbers(count, min, max) {
    const numbers = [];
    for (let i = 0; i < count; i++) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum)

        } else {
            i--;

        }
    }
    return numbers;
}
function startCountdown() {
    const timer = setInterval(function () {
        coountdownEl.textContent = countdown;
        countdown--;
        if (countdown < 0) {
            clearInterval(timer);
            showAnswerForm();
        }
    }, 1000)
}
function showAnswerForm() {
    numberListEl.innerHTML = '';
    numberListEl.classList.add('d-none')
    instructionsEl.textContent = 'inserisci i numeri che ricordi:';
    answerFormEl.classList.remove('d-none');
}
