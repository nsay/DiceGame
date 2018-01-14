var scores, roundScore, activePlayer, gamePlaying;

initializeGame();

//Button Roll function
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //Display result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
        document.getElementById('dice-1').src = 'img/dice-' + dice2 + '.png';

        if (dice1 !== 1 && dice2 !== 1) { //Update & change active player only if rolled number is 1
            roundScore += dice1 + dice2;
            //display round score
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
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

        //Set player's input winning score
        //Default is 100pts
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if (input) { //if there is value in player's input
            winningScore = input;
        } else { //no value in player's input
            winningScore = 100;
        }

        //Check if player won the game by having at least 100pts
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
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

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
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
    
    //Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}