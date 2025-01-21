
const countdownEl = document.getElementById('countdown');
const instructionsEl = document.getElementById('instructions');
const numbersListEl = document.getElementById('numbers-list');
const answersFormEl = document.getElementById('answers-form');
const inputGroupEl = document.getElementById('input-group');
const messageEl = document.getElementById('message');


let randomNumbers = [];
let countdown = 5;


function generateRandomNumbers(count, min, max) {
    const numbers = [];
    for (let i = 0; i < count; i++) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum);
        } else {
            i--;
        }
    }
    return numbers;
}


function startCountdown() {
    const timer = setInterval(function () {
        countdownEl.textContent = countdown;
        countdown--;

        if (countdown < 0) {
            clearInterval(timer);
            showAnswerForm();
        }
    }, 1000);
}


function showAnswerForm() {
    numbersListEl.innerHTML = '';
    numbersListEl.classList.add('d-none');
    instructionsEl.textContent = 'Inserisci i numeri che ricordi:';
    answersFormEl.classList.remove('d-none');
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


function initGame() {
    randomNumbers = generateRandomNumbers(5, 1, 50);
    for (let i = 0; i < randomNumbers.length; i++) {
        const li = document.createElement('li');
        li.textContent = randomNumbers[i];
        li.classList.add('fs-3', 'fw-bold');
        numbersListEl.appendChild(li);
    }

    startCountdown();
}


answersFormEl.addEventListener('submit', checkAnswers);


initGame();
