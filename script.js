'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0Element.textContent = '0';
    score1Element.textContent = '0';
    current0Element.textContent = '0';
    current1Element.textContent = '0';

    diceElement.classList.add('hidden');


    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
}

init();

const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = '0';
    activePlayer = Math.abs(activePlayer - 1);
    currentScore = 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
};

// Rolling dice
btnRoll.addEventListener('click', function () {
    if (!playing) return;
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `assets/dice-${dice}.png`

    // 3. Check for rolled 1
    if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    } else {
        // Switch player
        switchPlayer();
    }
});

btnHold.addEventListener('click', function () {
    if (!playing) return;
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = String(scores[activePlayer]);
    // 2. Check if score >= 100
    if (scores[activePlayer] >= 100) {
        // Finish game
        playing = false;
        diceElement.classList.add('hidden');

        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
        // Switch to the next player
        switchPlayer();
    }
});

btnNew.addEventListener('click', init);