'use strict'
const PACMAN = '😷';

var gPacman;
var gFoodCounter = 0;
var gRemovedGhosts = [];
// TODO
function createPacman(board) {
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {
    if (!gGame.isOn) return
    // TODO: use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // TODO: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === FOOD) {
        updateScore(1)
        gFoodCounter++
        console.log(gFoodCounter)
    }
    if (nextCell === CHERRY) {
        updateScore(10)
        // gFoodCounter++
        // console.log(gFoodCounter)
    }
    // is it Super Food?
    if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) return;
        gPacman.isSuper = true;
        setTimeout(noLongerSuper, 5000)
        for (var i = 0; i < gGhosts.length; i++) {
            gGhosts[i].color = '#0000FF';
        }
    }
    // TODO: hitting a ghost?  call gameOver
    if (nextCell === GHOST && gPacman.isSuper) {
        for (var i = 0; i < gGhosts.length; i++) {
            // var currI = gGhosts[i].location.i;
            // var currJ = gGhosts[i].location.j;
            var currGhost = gGhosts[i];
            var ghostLocation = currGhost.location;
            // var currI = ghostLocation.i;
            // var currJ = ghostLocation.j;
            // var nextI = nextLocation.i;
            // var nextJ = nextLocation.j;
            if (ghostLocation.i === nextLocation.i && ghostLocation.j === nextLocation.j) {
                // if (currI === nextI && currJ === nextJ) {
                var extractedGhost = gGhosts.splice(i, 1);
                var ghostObject = extractedGhost[0];
                gRemovedGhosts.push(ghostObject);
            }
        }
    }
    if (nextCell === GHOST && !gPacman.isSuper) {
        gameOver()
        return
    }
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)
    // TODO: Move the pacman
    gPacman.location = { i: nextLocation.i, j: nextLocation.j }
    // TODO: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    // TODO: update the DOM
    renderCell(nextLocation, PACMAN)
    checkVictory()
}


function checkVictory() {
    if (gFoodCounter === 56) gameOverModal();
    else return
}

// figure out nextLocation
function getNextLocation(eventKeyboard) {
    var nextLocation = { i: gPacman.location.i, j: gPacman.location.j }

    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        case 'ArrowRight':
            nextLocation.j++
            break
    }
    return nextLocation;
}

function noLongerSuper() {

    gPacman.isSuper = false;
    if (gRemovedGhosts.length >= 1) {
        for (var i = 0; i < gRemovedGhosts.length; i++) {
            var currGhost = gRemovedGhosts[i];
            gGhosts.push(currGhost);
            renderCell(currGhost.location, GHOST);
        }
    }
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = getRandomColor();
    }
}