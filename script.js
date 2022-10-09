'use strict';

// Выбираем и присваиваем элементы константам
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

// Обьявляем переменные
let score, sumScorePlayer1, sumScorePlayer2, player, gameRunOrStop;

// Функция, котороая задает начальное значения и CSS свойства, также она для кнопки "New game"
const initialState = function () {
  // меняем на true, чтобы начать игру(чтобы условие для двух кнопок игры перешло в true)
  gameRunOrStop = true;
  // Сбрасываем переменные, которые хранят итоговый счет
  sumScorePlayer1 = 0;
  sumScorePlayer2 = 0;
  // Сбрасываем итоговый счет, который отображается на странице
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  // обнуляемт current счет
  score = 0;
  // current счет=0 выводим на страницу
  currentScorePlayer1.textContent = score;
  currentScorePlayer2.textContent = score;
  // Скрываем картинку кости
  diceImg.classList.remove('dice--active');
  // Переназначаем игрока, чтобы первый игрок начал новую игру
  player = currentScorePlayer1;
  // Удаляем класс победителя заднего фона для обоих игроков
  player1BackGround.classList.remove('player--winner');
  player2BackGround.classList.remove('player--winner');
  // Удаляем класс победителя для имени игрока для обоих игроков
  player1Name.classList.remove('player--winner');
  player2Name.classList.remove('player--winner');
  // Добавляем класс активности заднего фона для первого и убираем для второго, если клас уже есть JS повторно его не добавляет
  player1BackGround.classList.add('player--active');
  player2BackGround.classList.remove('player--active');
};

// Вызываем функцию, чтобы переменные подхватили значения let score, sumScorePlayer1, sumScorePlayer2, player, gameRunOrStop;
initialState();

// Если текущий игрок - первый игрок, то меняем текущего игрока на второго игрока и наоборот
const changeActivePlayer = () => {
  // Проверяем какой сейчас текущий игрок и меняем на противополжного игрока
  player =
    player === currentScorePlayer1 ? currentScorePlayer2 : currentScorePlayer1;
  // Меняем активность заднего фона
  player1BackGround.classList.toggle('player--active');
  player2BackGround.classList.toggle('player--active');
};

// Сбрасываем current счет
const resetCurrentScore = () => {
  score = 0;
  // выводим current=0 в блоке current
  player.textContent = score;
};

// Окончить игру
const finishGame = () => {
  // меняем на false, для остановки игры после выйгрыши
  gameRunOrStop = false;
  // убираем отображение кости
  diceImg.classList.remove('dice--active');
};

// Кнопка "броска кости"
btnRollDice.addEventListener('click', () => {
  // условие для остановки игры после выйгрыши
  console.log('dalbaeb');
  if (gameRunOrStop) {
    // Генерируем рандомное число, обьявляем внутри функции, чтобы при КАЖДОМ нажатии кнопки, генерировалось новое рандомное число(имитация броска кости)
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    // Отображаем картинку кости
    diceImg.classList.add('dice--active');
    diceImg.src = `dice-${randomDice}.png`;
    // Проверяем какое число выпало на кости, если выпало не один, то текущий счет суммируется с костью
    if (randomDice !== 1) {
      score += randomDice; // суммируем current счет
      player.textContent = score; // выводим счет в блоке current
      // Проверяем какое число выпало на кости, если выпало один, то текущий счет обнуляется и ходит следующий игрок
    } else if (randomDice === 1) {
      // Сбрасываем current счет и выводим в блоке current
      resetCurrentScore();
      // Если текущий игрок - первый игрок, то меняем текущего игрока на второго игрока и наоборот
      changeActivePlayer();
    }
  }
});

// Т.к. current счет обнуляется, если выпадает на кости 1, то можно перестраховаться и сохранить current счет в итоговый счет нажатием на кнопку, но при этом ход передается следующему игроку
btnHold.addEventListener('click', () => {
  // условие для остановки игры после выйгрыши
  if (gameRunOrStop) {
    // если текущий игрок - это первый игрок
    if (player === currentScorePlayer1) {
      sumScorePlayer1 += score;
      // итоговый счет выводим на страницу
      scorePlayer1.textContent = sumScorePlayer1;
      // Сбрасываем current счет и выводим в блоке current
      resetCurrentScore();
      // если итоговый счет больше или равно 100
      if (sumScorePlayer1 >= 100) {
        // Заканчиваем игру
        finishGame();
        // убираем класс активности заднего фона
        player1BackGround.classList.remove('player--active');
        // добавляем класс победителя заднего фона
        player1BackGround.classList.add('player--winner');
        // добавляем класс победителя для имени игрока
        player1Name.classList.add('player--winner');
      } else {
        // Меняем текущего игрока
        changeActivePlayer();
      }
      // если текущий игрок - это второй и игрок
    } else if (player === currentScorePlayer2) {
      sumScorePlayer2 += score;
      // итоговый счет выводим на страницу
      scorePlayer2.textContent = sumScorePlayer2;
      // Сбрасываем current счет и выводим в блоке current
      resetCurrentScore();
      if (sumScorePlayer2 >= 100) {
        // Заканчиваем игру
        finishGame();
        player2BackGround.classList.remove('player--active');
        player2BackGround.classList.add('player--winner');
        player2Name.classList.add('player--winner');
      } else {
        // Меняем текущего игрока
        changeActivePlayer();
      }
    }
  }
});

// Кнопка reset, для того, чтобы начать игру заного
btnNewGame.addEventListener('click', initialState);
