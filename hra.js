'use strict';

let player = 'circle';

const btnEls = document.querySelectorAll('.piskvorky-container__policko');
const znakEl = document.querySelector('.znak');

const switchPlayer = function (btnEl) {
  btnEl.classList.add(`piskvorky-container__policko--${player}`);
  btnEl.disabled = true;
  btnEl.style.cursor = 'default';
  btnEl.classList.remove('policko--skryte');
  player = `${player === 'circle' ? 'cross' : 'circle'}`;
  znakEl.alt = `${player === 'circle' ? 'kolečko' : 'krížik'}`;
  znakEl.src = `images/${player}.svg`;
};

btnEls.forEach((btnEl) => {
  btnEl.addEventListener('click', function () {
    switchPlayer(btnEl);
  });
});
