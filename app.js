/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll, winningScore;

winningScore = 100;

newGame();

var buttonRoll = document.querySelector('.btn-roll');
var buttonHold = document.querySelector('.btn-hold');
var buttonNewGame = document.querySelector('.btn-new');
var buttonScore = document.querySelector('.btn-score');

buttonScore.addEventListener('click', function(){
    var inputScore = document.getElementById('input-score');
    winningScore = inputScore.value;
    document.querySelector('#score-0').textContent = scores[0] + '/' + winningScore;
    document.querySelector('#score-1').textContent = scores[1] + '/' + winningScore;
    inputScore.value = '';
})

buttonRoll.addEventListener('click', function(){
    if(gamePlaying){
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    console.log('dice:' + dice);
    console.log('prev:' + previousRoll);
    

    //2. Display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the round score IF the rolled number was NOT a 1;
    if (dice === 6 && previousRoll === 6){
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = 0;
        nextPlayer();
    } 
    if (dice !== 1){
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;    
    } else {
        if(scores[activePlayer] > 80){
            scores[activePlayer] = 50;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        }
        nextPlayer();
        }       
        previousRoll = dice;
    }
})

buttonHold.addEventListener('click', function(){
    if(gamePlaying){
        //1. Add current/roundScore to global score
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer] + '/' + winningScore;

    if(scores[activePlayer] >= winningScore){
        gamePlaying = false;
        document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    }
    else{
         nextPlayer();
        }   
    }    
})

buttonNewGame.addEventListener('click', newGame);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
}

function newGame() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0/' + winningScore;
    document.getElementById('score-1').textContent = '0/' + winningScore;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}