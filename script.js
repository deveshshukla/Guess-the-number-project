'use strict';

//Init varibles
const txtLevelInfo = document.querySelector('.txtLevel');
const txtWrongPenalty = document.querySelector('.txtRule');

const btnAgain = document.querySelector('.again');
const btnCheck = document.querySelector('.check');

const secNum = document.querySelector('.secNumber');
const guessInput = document.querySelector('.guess');

const gameTitle = document.querySelector('.txtHeading');
const hintMsg = document.querySelector('.message');
const txtScore = document.querySelector('.score');
const txtHiScore = document.querySelector('.highscore');

const gameBody = document.querySelector('.body-container');
const mainBody = document.getElementById('main-container');

//------------ Starting of game ------------
gameStart();
function gameStart() {
  alert('To Start Game Choose Level 1st')
  txtLevelInfo.style.visibility = 'hidden';
  txtWrongPenalty.style.visibility = 'hidden';
  mainBody.style.visibility = 'hidden';
  
  disable(btnAgain);
}

//After selecting game level
const showLvlInfo = () => {
  txtLevelInfo.style.visibility = 'visible';
  txtWrongPenalty.style.visibility = 'visible';
  mainBody.style.visibility = 'visible';

  enable(btnAgain);
}

//------------ Handel Game Level ------------
const radioBtns = document.querySelectorAll("input[name = 'gamelevel']");

let findSelected = () => {
  return document.querySelector("input[name='gamelevel']:checked").value;
};

let selectLvl = radioBtns.forEach((radioBtn) => {
  radioBtn.addEventListener("change", findSelected);
  radioBtn.addEventListener("click", function () {
    switch (findSelected()) {
      case "easy":
        lvlEasy();
        break;
      case "medium":
        lvlMedium();
        break;
      case "hard":
        lvlHard();
        break;
    }
  });
});

//Game Level --> Easy
function lvlEasy() {
  //Static txt content
  txtLevelInfo.textContent = 'Guess btween (1 to 20)';
  txtWrongPenalty.textContent = 'Wrong penalty (-1 score)';

  //design
  txtLevelInfo.style.color = '#000000'
  txtLevelInfo.style.backgroundColor = '#60b347';

  //game rules txt info
  showLvlInfo();

  //game logic
  const easyLvlScore = 20;
  const easyLvlHiScore = 0;

  const sysGenNum = genRandomNum(20);
  btnCheck.addEventListener('click', () => {
    const usrGuessNum = numEncoding(guessInput.value);

    if(numComparison(usrGuessNum, sysGenNum)) {
      correctGuessMsg(sysGenNum);
    }else {
      incorrectGuessMsg(guessInput.value, sysGenNum);
      easyLvlScore -= 1;
      txtScore.textContent = `${easyLvlScore}`;
    }
  });
}

//Game Level --> Medium
function lvlMedium() {
  //Static txt content
  txtLevelInfo.textContent = 'Guess btween (1 to 30)';
  txtWrongPenalty.textContent = 'Wrong penalty (-1 score)';

  //style
  txtLevelInfo.style.color = '#000000'
  txtLevelInfo.style.backgroundColor = '#c1c50a';

  //game rules txt info
  showLvlInfo();

  //game logic
  genRandomNum(30);
}

//Game Level --> Hard
function lvlHard() {
  //Static txt content
  txtLevelInfo.textContent = 'Guess btween (1 to 30)';
  txtWrongPenalty.textContent = 'Wrong penalty (-2 score)';

  //style
  txtLevelInfo.style.color = '#ffffff'
  txtLevelInfo.style.backgroundColor = '#cb1e55';

  //game rules txt info
  showLvlInfo();

  //game logic
  genRandomNum(30);
}

//------------Function Genrate Random Num.------------
function genRandomNum(numRange) {
  return numEncoding(Math.trunc(Math.random() * numRange + 1));
}

//Function: Encode Genrated Random No.
function numEncoding(num) {return btoa(num);}

//--------- Check user input num & game gen num ---------
function numComparison(usrNum, gameNum) {
  return gameNum === usrGuessNum ? true : false;
}




//-------------Individule functions start-------------

//Function Correct Guess Msg
function correctGuessMsg(sysGenNum) {
  hintMsg.textContent = "✅ Correct Guess 🥳";
  secNum.textContent = `${atob(sysGenNum)}`;
  secNum.style.width = "25rem";
  disable(btnCheck);
  gameBody.style.backgroundColor = "#60b347";
}

//Function Incorrect Guess Msg
function incorrectGuessMsg(usrGuessNum, sysGenNum) {
  Number(usrGuessNum) > Number(atob(sysGenNum))
    ? (hintMsg.textContent = "📈 Inorrect: Too High!")
    : (hintMsg.textContent = "📉 Inorrect: Too Low!");
}

//Function Game Over Msg
function gameOverMsg() {
  hintMsg.textContent = "☠️ Game Over!";
  secNum.textContent = "⚔️";
  userScore.textContent = "0";
  guessInput.value = "0";
  btnCheckDisable();
  document.querySelector("body").style.backgroundColor = "#f92f60";
}

function disable(btn) { //Disable button
  btn.disabled = true;
  btn.style.cursor = "not-allowed";
  btn.style.opacity = ".2";
}

function enable(btn) { //Enable button
  btn.disabled = false;
  btn.style.cursor = "pointer";
  btn.style.opacity = "1";
}

//-------------Individule functions ends-------------