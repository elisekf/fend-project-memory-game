/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Er rekkefølgen på funksjonene god?


// Turns open cards if they don't match and removes them from openCardsArray
function closeCards(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove('open', 'show');
    }
    openCardsArray.length = 0;
}


function stopTimer() {
    clearInterval(startTimer);
}

// Adds 1 to time every time function is called
function timer() {
    let time = Number(document.querySelector('.timer').innerHTML);
    time += 1;
    
    // Timer stops when game is won
    if (pairs.length >= 8) {
        stopTimer();
        document.querySelector('.number-of-stars').innerHTML = numberOfStars;
        modal.style.display = 'block';
    }
    document.querySelector('.timer').innerHTML = time;
    document.querySelector('.seconds').innerHTML = time;
}

// Is run when two cards are opened
function compareCards() {
    // Creates arrays of the classes of the two cards
    let firstCard = openCardsArray[0].getElementsByTagName('i');
    let firstCardArray = Array.prototype.slice.call(firstCard);
    let firstListOfClasses = firstCardArray[0].className.split(' ');

    let secondCard = openCardsArray[1].getElementsByTagName('i');
    let secondCardArray = Array.prototype.slice.call(secondCard);
    let secondListOfClasses = secondCardArray[0].className.split(' ');

    // The last class of each array are compared
    if (firstListOfClasses[firstListOfClasses.length - 1] === secondListOfClasses[secondListOfClasses.length - 1]) {
        return true;
    } else {
        return false;
    }
}


function movesCount() {
    // Counts turns taken
    let numberOfMoves = Number(document.querySelector('.moves').innerHTML);
    numberOfMoves += 1;
    document.querySelector('.moves').innerHTML = numberOfMoves;
    document.querySelector('.number-of-moves').innerHTML = numberOfMoves;

    // Removes stars after certain amount of turns
    if (numberOfMoves === 18) {
        starsArray[0].classList.add('hidden');
        numberOfStars -= 1;
    } else if (numberOfMoves === 24) {
        starsArray[1].classList.add('hidden');
        numberOfStars -= 1;
    } else if (numberOfMoves === 29) {
        starsArray[2].classList.add('hidden');
        numberOfStars -= 1;
    }
}


function openCard(index) {
    if (startTimer == 0) {
        startTimer = setInterval(timer, 1000);
    }

    // Clicked cards go into openCardsArray until the array contains two cards
    if (openCardsArray.length < 2) {
        openCardsArray.push(cardsArray[index]);
        cardsArray[index].classList.add('open', 'show');
    }

    // When two cards are open, the turn is counted and the cards are compared
    // If the cards match, they are added to the pairs array and openCardsArray is emptied
    // If the cards don't match, they are hidden again 
    if (openCardsArray.length === 2) {
        movesCount();
        compareCards();
        if (compareCards() === true) {
            pairs.push(cardsArray[index]);
            openCardsArray.length = 0;
        } else if (compareCards() === false) {
            setTimeout(closeCards, 600, openCardsArray);
        }
    }
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}

 
function startGame() {
    // Puts classes of all cards into the cardClasses array
    for (let i = 0; i < cardsArray.length; i++) {
        let cardClass = cardsArray[i].firstElementChild.className;
        cardClasses.push(cardClass);
    }

    // Turns each element into new arrays
    for (let i = 0; i < cardClasses.length; i++) {
        cardClasses[i] = cardClasses[i].split(' ');
    }

    // Shuffles the cardClasses array, removes all classes from the cards, replaces them with the same classes again but in a new order
    shuffle(cardClasses);
    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].firstElementChild.className = '';
        cardsArray[i].firstElementChild.classList.add('fa', cardClasses[i][1]);
    }
}

function restartGame() {
    document.querySelector('.timer').innerHTML = 0;
    document.querySelector('.moves').innerHTML = 0;
    cardClasses.length = 0;

    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].className = 'card';
    }

    pairs.length = 0;
    startGame();
    stopTimer();
    startTimer = 0;

    for (let i = 0; i < starsArray.length; i++) {
        starsArray[i].classList.remove('hidden');
    }

    modal.style.display = 'none';
    numberOfStars = 3;
}


function loadGame() {
    startGame();
    
    // Adds event listeners to all the cards and the restart button
    restart.addEventListener('click', restartGame);
    modalButton.addEventListener('click', restartGame);
    for (let i = 0; i < cardsArray.length; i++) {
        cardsArray[i].addEventListener('click', function() {
            openCard(i);
        })
    }   
}


const cards = document.getElementsByClassName('card');
const openCards = document.getElementsByClassName('open');
const stars = document.getElementsByClassName('fa-star');
const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal-button');

const cardsArray = Array.prototype.slice.call(cards);
const openCardsArray = Array.prototype.slice.call(openCards);
const starsArray = Array.prototype.slice.call(stars);
const pairs = [];
const cardClasses = [];
let numberOfStars = 3;
let startTimer = 0;

window.onload = loadGame();








/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
