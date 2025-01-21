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
function checkAnswers(event) {
    event.preventDefault();
    messageEl.textContent = '';

    const userInputs = [];
    const inputs = inputGroupEl.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        const value = parseInt(inputs[i].value, 10);
        if (!isNaN(value)) {
            userInputs.push(value);
        }
    }
    if (new Set(userInputs).size !== userInputs.length) {
        messageEl.textContent = 'Hai inserito numeri duplicati. Riprova!';
        return;
    }
    const correctNumbers = [];
    for (let i = 0; i < userInputs.length; i++) {
        if (randomNumbers.includes(userInputs[i])) {
            correctNumbers.push(userInputs[i]);
        }

    }
    messageEl.textContent = `Hai indovinato ${correctNumbers.length} numeri: ${correctNumbers.join(', ')}`;
}
