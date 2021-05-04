'use strict';

let player = 'circle';
const boardSize = 10;
const pointsToWin = 5;

const btnEls = document.querySelectorAll('.piskvorky-container__policko');
const znakEl = document.querySelector('.znak');

//  Helper functions
const getSymbol = (btnEl) => {
  if (btnEl.classList.contains('piskvorky-container__policko--cross'))
    return 'cross';
  else if (btnEl.classList.contains('piskvorky-container__policko--circle'))
    return 'circle';
  else return 'none';
};

const getBtnRow = (btnEl) => {
  return Number(btnEl.dataset.row);
};

const getBtnColumn = (btnEl) => {
  return Number(btnEl.dataset.column);
};

const getBtnIndex = (btnEl) => {
  return Number(btnEl.dataset.index);
};

const checkNeighbour = (currIndex) => {
  const currBtn = btnEls[currIndex];
  return getSymbol(currBtn) === player;
};

const checkIfWon = (winningPoints) => {
  if (winningPoints >= pointsToWin) {
    return true;
  }
};

// Check Horizontal Win
const checkHorizontalWin = (btnEl) => {
  let winningPoints = 1;
  let currColumn = getBtnColumn(btnEl);
  let currIndex = getBtnIndex(btnEl);

  // Check Left
  while (currColumn > 0) {
    currColumn--;
    currIndex--;
    if (checkNeighbour(currIndex)) winningPoints++;
    else break;
  }

  if (checkIfWon(winningPoints)) return true;

  currColumn = getBtnColumn(btnEl);
  currIndex = getBtnIndex(btnEl);
  // Check Right
  while (currColumn < boardSize - 1) {
    currColumn++;
    currIndex++;
    if (checkNeighbour(currIndex)) winningPoints++;
    else break;
  }

  if (checkIfWon(winningPoints)) return true;
};

// Check Vertical Win
const checkVerticalWin = (btnEl) => {
  let winningPoints = 1;
  let currRow = getBtnRow(btnEl);
  let currIndex = getBtnIndex(btnEl);

  // Check UP
  while (currRow > 0) {
    currRow--;
    currIndex -= 10;
    if (checkNeighbour(currIndex)) winningPoints++;
    else break;
  }

  if (checkIfWon(winningPoints)) return true;

  currRow = getBtnRow(btnEl);
  currIndex = getBtnIndex(btnEl);
  // Check DOWN
  while (currRow < boardSize - 1) {
    currRow++;
    currIndex += 10;
    if (checkNeighbour(currIndex)) winningPoints++;
    else break;
  }

  if (checkIfWon(winningPoints)) return true;
};

// Check DiagonalLeft Win
const checkDiagonalLeftWin = (btnEl) => {
  let winningPoints = 1;
  let currColumn = getBtnColumn(btnEl);
  let currRow = getBtnRow(btnEl);
  let currIndex = getBtnIndex(btnEl);

  // Check UP
  while (currColumn > 0 && currRow > 0) {
    currColumn--;
    currRow--;
    currIndex -= boardSize + 1;
    if (checkNeighbour(currIndex)) winningPoints++;
    else break;
  }

  if (checkIfWon(winningPoints)) return true;

  currColumn = getBtnColumn(btnEl);
  currRow = getBtnColumn(btnEl);
  currIndex = getBtnIndex(btnEl);
  // Check DOWN
  while (currColumn < boardSize - 1 && currRow < boardSize - 1) {
    currColumn++;
    currRow++;
    currIndex += boardSize + 1;
    if (checkNeighbour(currIndex)) winningPoints++;
    else break;
  }

  if (checkIfWon(winningPoints)) return true;
};

// Check DiagonalRight Win
const checkDiagonalRightWin = (btnEl) => {
  let winningPoints = 1;
  let currColumn = getBtnColumn(btnEl);
  let currRow = getBtnRow(btnEl);
  let currIndex = getBtnIndex(btnEl);

  // Check UP
  while (currColumn < boardSize - 1 && currRow > 0) {
    currColumn++;
    currRow--;
    currIndex -= boardSize - 1;
    if (checkNeighbour(currIndex)) winningPoints++;
    else break;
  }

  if (checkIfWon(winningPoints)) return true;

  currColumn = getBtnColumn(btnEl);
  currRow = getBtnRow(btnEl);
  currIndex = getBtnIndex(btnEl);
  // Check DOWN
  while (currColumn > 0 && currRow < boardSize - 1) {
    currColumn--;
    currRow++;
    currIndex += boardSize - 1;
    if (checkNeighbour(currIndex)) winningPoints++;
    else break;
  }

  if (checkIfWon(winningPoints)) return true;
};

// Event listener function for every button
const switchPlayer = function (btnEl) {
  btnEl.classList.add(`piskvorky-container__policko--${player}`);
  btnEl.disabled = true;
  btnEl.style.cursor = 'default';
  btnEl.classList.remove('policko--skryte');

  if (
    checkHorizontalWin(btnEl) ||
    checkVerticalWin(btnEl) ||
    checkDiagonalLeftWin(btnEl) ||
    checkDiagonalRightWin(btnEl)
  ) {
    console.log(`Player ${player} has won from switchPlayer`);
    setTimeout(() => {
      const newGame = confirm(
        `Vyhral hráč ${
          player === 'circle' ? 'kolečko' : 'krížik'
        }! Spustiť novú hru?`,
      );
      if (newGame) {
        location.reload();
      } else {
        btnEls.forEach((btn) => {
          btn.disabled = true;
          btn.style.cursor = 'default';
          btn.style.backgroundColor = 'transparent';
        });
      }
    }, 200);
  } else {
    player = `${player === 'circle' ? 'cross' : 'circle'}`;
    znakEl.alt = `${player === 'circle' ? 'kolečko' : 'krížik'}`;
    znakEl.src = `images/${player}.svg`;
  }
};

// Add Event Listener and add data attributes
btnEls.forEach((btnEl, index) => {
  btnEl.dataset.index = index;
  btnEl.dataset.row = Math.floor(index / boardSize);
  btnEl.dataset.column = Math.floor(index % boardSize);
  btnEl.addEventListener('click', function () {
    switchPlayer(btnEl);
  });
});
