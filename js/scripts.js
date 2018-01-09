var newGameBtn = document.getElementById('js-newGameButton');
newGameBtn.addEventListener('click', newGame);

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors');

var result = document.getElementById('js-result');

pickRock.addEventListener('click', function() {
    playerPick('rock');
})
pickPaper.addEventListener('click', function() {
    playerPick('paper');
})
pickScissors.addEventListener('click', function() {
    playerPick('scissors');
})

var gameState = 'notStarted',
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    }

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
    switch(gameState) {
        case 'started':
            newGameElem.style.display = 'none';
            pickElem.style.display = 'block';
            resultsElem.style.display = 'block';
            result.style.display = 'none';
        break;
        case 'ended':
            newGameBtn.innerText = 'Jeszcze raz';
            result.style.display = 'block';
        case 'notStarted':
            console.log('notstarted');
        default:
            newGameElem.style.display = 'block';
            pickElem.style.display = 'none';
            resultsElem.style.display = 'none';
    }
}
setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
    player.name = prompt('Please enter your name', 'imię gracza');
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();

        playerNameElem.innerHTML = player.name;
        setGamePoints();
    }    
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultsElem = document.getElementById('js-playerResult'),
    computerResultsElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundwinner(playerPick, computerPick);
}

function checkRoundwinner(playerPick, computerPick) {
    playerResultsElem.innerHTML = computerResultsElem.innerHTML = '';

    var winnerIs = 'player';

        if(playerPick == computerPick) {
            winnerIs = 'none';
        } else if (
            (computerPick =='rock' && playerPick == 'scissors') ||
            (computerPick =='scissors' && playerPick == 'paper') ||
            (computerPick == 'paper' && playerPick == 'rock')) {
                winnerIs = 'computer';
        }

        if (winnerIs == 'player') {
            playerResultsElem.innerHTML = 'Win!';
            player.score++;
        } else if (winnerIs == 'computer') {
            computerResultsElem.innerHTML = 'Win!';
            computer.score++
        }
        setGamePoints();
        checkGameWinner();
}
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}
function checkGameWinner() {
    if (player.score == 10) {
        result.innerHTML = '<b>The winner is ' + player.name + '</b>';
        gameState ='ended';
    } else if (computer.score == 10) {
        result.innerHTML = '<b>The winner is computer</b>';
        gameState = 'ended';
    } 
    setGameElements();
    gameState = 'started';
};
