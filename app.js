/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/



var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {  //adding event listener for click event with function we created (btn), we can also create a function inside the eventListener method
    if (gamePlaying) {
         // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            //roundScore = roundScore + dice; // same as roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
            // toastr warning popup
            toastr["info"]("You rolled 1!");
        }
    }
});   

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying){
        // Add CURRENT score to the GLOBAL score
        scores[activePlayer] += roundScore;
        //scores[activePlayer] = scores[activePlayer] + roundScore    // same as code above

        // Update the UserInterface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
    }  
});

function nextPlayer() {
    //Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;   //switch players 
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';  // set current score to default 0
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');    // toggle active class if there is one remove it if there is none add it
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';  // another players turn hide the dice
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {       // creating a function not to repeat myself in other codes if code needs to repeat
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; // changing css properties, hiding the dice with display: none;

    document.getElementById('score-0').textContent = '0'; // getting element by id from html setting values to 0 default
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
}

/* EXAMPLES */

// dice = Math.floor(Math.random() * 6) + 1; // Generate random number between 1 and 6
// console.log(dice);

// document.querySelector('#current-' + activePlayer).textContent = dice;  // selecting element from html (current round score) + var activePlayer depends whose turn is, changing text to dice value
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; //innerHTML changes html 

// var x = document.querySelector('#score-0').textContent; //storing content into a variable
// console.log(x);






