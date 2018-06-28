/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


function closeCards(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].classList.remove('open', 'show');
    }
    openCardsArray.length = 0;
}


function compareCards() {
    let firstCard = openCardsArray[0].getElementsByTagName('i');
    let firstCardArray = Array.prototype.slice.call(firstCard);
    let firstListOfClasses = firstCardArray[0].className.split(' ');

    let secondCard = openCardsArray[1].getElementsByTagName('i');
    let secondCardArray = Array.prototype.slice.call(secondCard);
    let secondListOfClasses = secondCardArray[0].className.split(' ');

    if (firstListOfClasses[firstListOfClasses.length - 1] === secondListOfClasses[secondListOfClasses.length - 1]) {
        return true;
    } else {
        return false;
    }
}


function openCard(index) {
    if (openCardsArray.length < 2) {
        openCardsArray.push(cardsArray[index]);
        cardsArray[index].classList.add('open', 'show');
    }
    if (openCardsArray.length === 2) {
        compareCards();
        if (compareCards() === true) {
            openCardsArray.length = 0;
        } else if (compareCards() === false) {
            setTimeout(closeCards, 600, openCardsArray);
        }
        
    }
}


const cards = document.getElementsByTagName('li');
const cardsArray = Array.prototype.slice.call(cards);

const openCards = document.getElementsByClassName('open');
const openCardsArray = Array.prototype.slice.call(openCards);

for (let i = 0; i < cardsArray.length; i++) {
    cardsArray[i].addEventListener('click', function() {
        openCard(i);
    });
}




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
