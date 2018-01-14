/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

initializeGame();

//Button Roll function
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;

        //Display result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'img/dice-' + dice + '.png';

        //Update round score and change active player only if rolled number is 1
        if (dice !== 1) {
            roundScore += dice;
            //display round score
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            //change player
            nextPlayer();
        }
    }
});

//Button Hold function
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying){
        //Add round score to global score
        scores[activePlayer] += roundScore;

        //Update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //Check if player won the game by having at least 100pts
        if (scores[activePlayer] >= 100) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //change player
            nextPlayer();
        }
    }
});

//Button New Function
document.querySelector('.btn-new').addEventListener('click', initializeGame);

function initializeGame() {
    scores = [0, 0]; //Global scores for each player.
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true; //Play if set to true

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 1';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
//Next Player function
function nextPlayer() {
    //change active player
    if (activePlayer === 0) {
        activePlayer = 1;
        //change active player's text
        document.querySelector('.player-0-panel').classList.remove('active');
        document.querySelector('.player-1-panel').classList.add('active');
    } else {
        activePlayer = 0;
        //change active player's text
        document.querySelector('.player-1-panel').classList.remove('active');
        document.querySelector('.player-0-panel').classList.add('active');
    }
    //reset round score to 0
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';
}