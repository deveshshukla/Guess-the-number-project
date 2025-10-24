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

// Hi-Score variables
let easyHiScore = 0;
const easyHiScoreArr = [];

let mediumHiScore = 0;
const mediumHiScoreArr = [];

let hardHiScore = 0;
const hardHiScoreArr = [];

// Initial
let sysGenNum;
let lvlScore;
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
        gameReset();
        break;
      case "medium":
        lvlMedium();
        gameReset();
        break;
      case "hard":
        lvlHard();
        gameReset();
        break;
    }
  });
});

//Game Level --> Easy
function lvlEasy() {

  // Static txt content
  txtLevelInfo.textContent = 'Guess between (1 to 20)';
  txtWrongPenalty.textContent = 'Wrong penalty (-1 score)';
  hintMsg.textContent = 'Start guessing..?';
  guessInput.value = '';

  // Game Level Design
  txtLevelInfo.style.color = '#000000'
  txtLevelInfo.style.backgroundColor = '#17adf8ff';

  // Give random num range based on level.
  sysGenNum = genRandomNum(20);

  // Game Score & HiScore Logic
  lvlScore = 20;
  txtScore.textContent = `${lvlScore}`;

  easyHiScoreArr.length == 0? txtHiScore.textContent = '0' : txtHiScore.textContent = `${easyHiScoreArr[easyHiScoreArr.length-1]}`;
}

//Game Level --> Medium
function lvlMedium() {

  // Static txt content
  txtLevelInfo.textContent = 'Guess between (1 to 30)';
  txtWrongPenalty.textContent = 'Wrong penalty (-2 score)';
  hintMsg.textContent = 'Start guessing..?';
  guessInput.value = '';

  // Game Level Design
  txtLevelInfo.style.color = '#000000'
  txtLevelInfo.style.backgroundColor = '#c1c50a';

  // Give random num range based on level.
  sysGenNum = genRandomNum(30);

  // Game Score & HiScore Logic
  lvlScore = 30;
  txtScore.textContent = `${lvlScore}`;

  mediumHiScoreArr.length == 0? txtHiScore.textContent = '0' : txtHiScore.textContent = `${mediumHiScoreArr[mediumHiScoreArr.length-1]}`;
}

//Game Level --> Hard
function lvlHard() {

  // Static txt content
  txtLevelInfo.textContent = 'Guess between (1 to 30)';
  txtWrongPenalty.textContent = 'Wrong penalty (-3 score)';
  hintMsg.textContent = 'Start guessing..?';
  guessInput.value = '';

  // Game Level Design
  txtLevelInfo.style.color = '#ffffff'
  txtLevelInfo.style.backgroundColor = '#cb1e55';

  // Give random num range based on level.
  sysGenNum = genRandomNum(30);

  // Game Score & HiScore Logic
  lvlScore = 30;
  txtScore.textContent = `${lvlScore}`;

  hardHiScoreArr.length == 0? txtHiScore.textContent = '0' : txtHiScore.textContent = `${hardHiScoreArr[hardHiScoreArr.length-1]}`;
}

// ----------- Btn Check ------------
btnCheck.addEventListener('click', () => {
  const usrGuessNum = numEncoding(guessInput.value);

  if(numComparison(usrGuessNum, sysGenNum)) {
    correctGuessMsg(sysGenNum);

  }else {
    incorrectGuessMsg(guessInput.value, sysGenNum);

    if(lvlScore>0) {
      if(findSelected() === 'easy') {
        lvlScore -= 1;
      } else if(findSelected() === 'medium') {
        lvlScore -= 2;
      } else if(findSelected() === 'hard') {
        lvlScore -= 3;
      }
      
      txtScore.textContent = `${lvlScore}`;
    } else
      gameOverMsg();
    
  }
});

// ----------- Btn Again ------------
btnAgain.addEventListener('click', () => {
  let resetGame = confirm('Are you sure?');

  if(resetGame) {
    gameReset();
  }
});

// ----------- Function--> Reset Game ------------
function gameReset() {
  secNum.style.width = "15rem";
    secNum.textContent = '?';
    gameBody.style.backgroundColor = "#222";

    if(findSelected() === 'easy') {
        lvlEasy();
    } else if(findSelected() === 'medium') {
      lvlMedium();
    } else if(findSelected() === 'hard') {
      lvlHard();
    }

    enable(btnCheck);
}

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

  updateHighScore();
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
  txtScore.textContent = "0";
  guessInput.value = "0";
  document.querySelector("body").style.backgroundColor = "#f92f60";
  disable(btnCheck);
}

//Disable button
function disable(btn) { 
  btn.disabled = true;
  btn.style.cursor = "not-allowed";
  btn.style.opacity = ".2";
}

//Enable button
function enable(btn) { 
  btn.disabled = false;
  btn.style.cursor = "pointer";
  btn.style.opacity = "1";
}

// Function --> Maintain High Score
function updateHighScore() {
  if(findSelected() === 'easy') {

    if(lvlScore > easyHiScore) {
      easyHiScoreArr.push(lvlScore);
    }
    txtHiScore.textContent = `${easyHiScoreArr[easyHiScoreArr.length-1]}`;

  } else if(findSelected() === 'medium') {

    if(lvlScore > mediumHiScore) {
      mediumHiScoreArr.push(lvlScore);
    }
    txtHiScore.textContent = `${mediumHiScoreArr[mediumHiScoreArr.length-1]}`;

  } else if(findSelected() === 'hard') {

    if(lvlScore > hardHiScore) {
      hardHiScoreArr.push(lvlScore);
    }
    
    txtHiScore.textContent = `${hardHiScoreArr[hardHiScoreArr.length-1]}`;
  }
}

//-------------Individual functions ends-------------