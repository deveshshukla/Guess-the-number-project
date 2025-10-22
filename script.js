'use strict';

//Initialize Variables
const txtLevelInfo = document.querySelector('.txtLevel');
const txtWrongPenalty = document.querySelector('.txtRule');

const btnAgain = document.querySelector('.again');
const btnCheck = document.querySelector('.check');

const secNum = document.querySelector('.secNumber');
const guessInput = document.querySelector('.userInput');

const gameTitle = document.querySelector('.txtHeading');
const hintMsg = document.querySelector('.message');

const txtScore = document.querySelector('.score');
const txtHiScore = document.querySelector('.highScore');

const gameBody = document.querySelector('.body-container');
const mainBody = document.getElementById('main-container');

// Init System generated num.
let sysGenNum = 0;
lvlEasy(); // by default easy level on game start


//------------ Handel Game Level ------------
const radioBtns = document.querySelectorAll("input[name='gameLevel']");

function findSelected() {
  const checked = document.querySelector("input[name='gameLevel']:checked");
  return checked ? checked.value : null;
}

radioBtns.forEach((radioBtn) => {
  radioBtn.addEventListener("change", function () {
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
  txtLevelInfo.textContent = 'Guess between (1 to 20)';
  txtWrongPenalty.textContent = 'Wrong penalty (-1 score)';

  //design
  txtLevelInfo.style.color = '#000000'
  txtLevelInfo.style.backgroundColor = '#60b347';

  //game logic
  const easyLvlScore = 20;
  const easyHiScoreArr = [];

  sysGenNum = genRandomNum(20);

  txtScore.textContent = `${easyLvlScore}`;

  // Bug:
  // if(numComparison(usrGuessNum, sysGenNum)) {
  //   correctGuessMsg(sysGenNum);
  // }else {
  //   incorrectGuessMsg(guessInput.value, sysGenNum);
  // }

  // //Maintain high-score arr
  // easyHiScoreArr.push(easyLvlScore);
  // txtHiScore.textContent = `${easyHiScoreArr[easyHiScoreArr.length-1]}`
}

//Game Level --> Medium
function lvlMedium() {
  //Static txt content
  txtLevelInfo.textContent = 'Guess between (1 to 30)';
  txtWrongPenalty.textContent = 'Wrong penalty (-1 score)';

  //style
  txtLevelInfo.style.color = '#000000'
  txtLevelInfo.style.backgroundColor = '#c1c50a';

  //game logic
  genRandomNum(30);
}

//Game Level --> Hard
function lvlHard() {
  //Static txt content
  txtLevelInfo.textContent = 'Guess between (1 to 30)';
  txtWrongPenalty.textContent = 'Wrong penalty (-2 score)';

  //style
  txtLevelInfo.style.color = '#ffffff'
  txtLevelInfo.style.backgroundColor = '#cb1e55';

  //game logic
  genRandomNum(30);
}

// ----------- Function--> Btn Check ------------
btnCheck.addEventListener('click', () => {
  const usrGuessNum = numEncoding(guessInput.value);


  // if(numComparison(usrGuessNum, sysGenNum)) {
  //   correctGuessMsg(sysGenNum);

  //   if(findSelected() === "easy"){

  //   } else if(findSelected() === "medium"){
      
  //   } else if(findSelected() === "hard"){
      
  //   }

  // }else {
  //   incorrectGuessMsg(guessInput.value, sysGenNum);
  // }
});

//------------Function Generate Random Num.------------
function genRandomNum(numRange) {
  return numEncoding(Math.trunc(Math.random() * numRange + 1));
}

//Function: Encode Generated Random No.
function numEncoding(num) {return btoa(num);}

//--------- Check user input num & game gen num ---------
function numComparison(usrNum, gameNum) {
  return gameNum === usrNum ? true : false;
}


//-------------Individual functions start-------------

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
    ? (hintMsg.textContent = "📈 Incorrect: Too High!")
    : (hintMsg.textContent = "📉 Incorrect: Too Low!");
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

//-------------Individual functions ends-------------