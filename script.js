'use strict';

const scorePlayer1 = document.querySelector('#score--0');
const scorePlayer2 = document.querySelector('#score--1');
const diceImg = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentScorePlayer1 = document.querySelector('#current--0');
const currentScorePlayer2 = document.querySelector('#current--1');
const player1BackGround = document.querySelector('.player--0');
const player2BackGround = document.querySelector('.player--1');
const player1Name = document.querySelector('#name--0');
const player2Name = document.querySelector('#name--1');

let score, sumScorePlayer1, sumScorePlayer2, player, gameRunOrStop;

// Функция, котороая задает начальное значения и CSS свойства, также она для кнопки "New game"
const initialState = function () {
  gameRunOrStop = true;
  sumScorePlayer1 = 0;
  sumScorePlayer2 = 0;
  score = 0;

  player = currentScorePlayer1;

  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  currentScorePlayer1.textContent = 0;
  currentScorePlayer2.textContent = 0;

  diceImg.classList.remove('dice--active');
  player1BackGround.classList.remove('player--winner');
  player2BackGround.classList.remove('player--winner');
  player1Name.classList.remove('player--winner');
  player2Name.classList.remove('player--winner');
  player1BackGround.classList.add('player--active');
  player2BackGround.classList.remove('player--active');
};

initialState();

// Если текущий игрок - первый игрок, то меняем текущего игрока на второго игрока и наоборот
const changeActivePlayer = () => {
  player =
    player === currentScorePlayer1 ? currentScorePlayer2 : currentScorePlayer1;
  player1BackGround.classList.toggle('player--active');
  player2BackGround.classList.toggle('player--active');
};

// Сбрасываем current счет
const resetCurrentScore = () => {
  score = 0;
  player.textContent = score;
};

// Окончить игру
const finishGame = () => {
  gameRunOrStop = false;
  diceImg.classList.remove('dice--active');
};

// Кнопка "броска кости"
btnRollDice.addEventListener('click', () => {
  if (gameRunOrStop) {
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.add('dice--active');
    diceImg.src = `dice-${randomDice}.png`;
    if (randomDice !== 1) {
      score += randomDice;
      player.textContent = score;
    } else if (randomDice === 1) {
      resetCurrentScore();
      changeActivePlayer();
    }
  }
});

// Сохранить current счет в итоговый счет нажатием на кнопку, и при этом ход передается следующему игроку. Проверка sumScorePlayer, если 100, то выйграл
btnHold.addEventListener('click', () => {
  if (gameRunOrStop) {
    if (player === currentScorePlayer1) {
      sumScorePlayer1 += score;
      scorePlayer1.textContent = sumScorePlayer1;
      resetCurrentScore();
      if (sumScorePlayer1 >= 100) {
        finishGame();
        player1BackGround.classList.remove('player--active');
        player1BackGround.classList.add('player--winner');
        player1Name.classList.add('player--winner');
      } else {
        changeActivePlayer();
      }
    } else if (player === currentScorePlayer2) {
      sumScorePlayer2 += score;
      scorePlayer2.textContent = sumScorePlayer2;
      resetCurrentScore();
      if (sumScorePlayer2 >= 100) {
        finishGame();
        player2BackGround.classList.remove('player--active');
        player2BackGround.classList.add('player--winner');
        player2Name.classList.add('player--winner');
      } else {
        changeActivePlayer();
      }
    }
  }
});

// Кнопка reset, для того, чтобы начать игру заного
btnNewGame.addEventListener('click', initialState);
