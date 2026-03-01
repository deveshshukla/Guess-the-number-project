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

// Hi-Score variables (one per difficulty)
let easyHiScore = 0;
let mediumHiScore = 0;
let hardHiScore = 0;

// --- localStorage helpers --------------------------------------------------
function loadHighScores() {
  // read stored values or default to zero
  easyHiScore = Number(localStorage.getItem('easyHiScore')) || 0;
  mediumHiScore = Number(localStorage.getItem('mediumHiScore')) || 0;
  hardHiScore = Number(localStorage.getItem('hardHiScore')) || 0;
}

function saveHighScore(level) {
  switch (level) {
    case 'easy':
      localStorage.setItem('easyHiScore', easyHiScore);
      break;
    case 'medium':
      localStorage.setItem('mediumHiScore', mediumHiScore);
      break;
    case 'hard':
      localStorage.setItem('hardHiScore', hardHiScore);
      break;
  }
}

// ---------------------------------------------------------------------------

// Initial
let sysGenNum;
let lvlScore;
// get any previously stored highs before the first level is initialized
loadHighScores();
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
  // make sure we have the latest stored high scores
  loadHighScores();

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

  // display current high score for easy level
  txtHiScore.textContent = `${easyHiScore}`;
}

//Game Level --> Medium
function lvlMedium() {
  // keep highs up to date in case storage changed
  loadHighScores();

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

  // display current high score for medium level
  txtHiScore.textContent = `${mediumHiScore}`;
}

//Game Level --> Hard
function lvlHard() {
  // make sure stored scores are applied
  loadHighScores();

  // Static txt content
  txtLevelInfo.textContent = 'Guess between (1 to 30)';
  txtWrongPenalty.textContent = 'Wrong penalty (-3 score)';
  hintMsg.textContent = 'Start guessing..?';
  guessInput.value = '';
  txtLevelInfo.style.color = '#ffffff'
  txtLevelInfo.style.backgroundColor = '#cb1e55';

  // Give random num range based on level.
  sysGenNum = genRandomNum(30);

  // Game Score & HiScore Logic
  lvlScore = 30;
  txtScore.textContent = `${lvlScore}`;

  // display current high score for hard level
  txtHiScore.textContent = `${hardHiScore}`;
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
  // compare current lvlScore against stored high score for the active level
  if (findSelected() === 'easy') {
    if (lvlScore > easyHiScore) {
      easyHiScore = lvlScore;
      saveHighScore('easy');
    }
    txtHiScore.textContent = `${easyHiScore}`;

  } else if (findSelected() === 'medium') {
    if (lvlScore > mediumHiScore) {
      mediumHiScore = lvlScore;
      saveHighScore('medium');
    }
    txtHiScore.textContent = `${mediumHiScore}`;

  } else if (findSelected() === 'hard') {
    if (lvlScore > hardHiScore) {
      hardHiScore = lvlScore;
      saveHighScore('hard');
    }
  }
};
