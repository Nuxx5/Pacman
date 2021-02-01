'use strict'
const WALL = '🧱'
const FOOD = '.'
const EMPTY = '';
const CHERRY = '🍒';
const SUPER_FOOD = '🍇';
var gCherryInterval;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(getCherry, 15000);
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = SUPER_FOOD;
    board[1][8] = SUPER_FOOD;
    board[8][1] = SUPER_FOOD;
    board[8][8] = SUPER_FOOD;
    return board;
}

function findEmptyCells() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] !== WALL && gBoard[i][j] !== PACMAN && gBoard[i][j] !== GHOST && gBoard[i][j] !== FOOD && gBoard[i][j] !== SUPER_FOOD) {
                var emptyPos = { i, j };
                emptyCells.push(emptyPos);

            }
        }
    }
    return emptyCells
}

function getCherry() {
    var emptyCells = findEmptyCells()
    if (emptyCells.length === 0) return;
    console.log('emptyCells',emptyCells);
    var targetCellIndex = getRandomIntInclusive(0, emptyCells.length)
    var targetCherryCell = emptyCells[targetCellIndex]
    console.log('targetCherryCell', targetCherryCell);
    gBoard[targetCherryCell.i][targetCherryCell.j] = CHERRY
    renderCell(targetCherryCell, CHERRY)
}

// update model and dom
function updateScore(diff) {
    gGame.score += diff
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score
}

// TODO
function gameOver() {
    console.log('Game Over');
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    gIntervalGhosts = null
    gCherryInterval = null
    gameOverModal()
}

function gameOverModal(){
    var elGameOverModal = document.querySelector('.game-over-modal')
    elGameOverModal.style.display = 'block';
    var elGameOverModalText = document.querySelector('.game-over-modal p')
    if (gFoodCounter === 56) elGameOverModalText.innerText = 'Game Done! You won'
    else elGameOverModalText.innerText = 'Game Over! You lost'
    
}

function restartGame(){
    var elGameOverModal = document.querySelector('.game-over-modal')
    elGameOverModal.style.display = 'none';
    gGame = {
        score: 0,
        isOn: false}
        var elScore = document.querySelector('h2 span')
    elScore.innerText = 0
    gFoodCounter = 0
    init()
}
