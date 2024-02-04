'use strict';

//Todo : Add Game Dificulty Level

//Random No.
let randomNum = Math.floor((Math.random() * 20) + 1);

//Set elements with reference variables
let setMsg = function (msg) {
    document.querySelector('.message').textContent = msg;
}

let txtScore = Number(document.querySelector('.score').textContent);

let txtHighScore = Number(document.querySelector('.highscore').textContent);

let txtPrvHighScore = Number(document.querySelector('.prvhighscore').textContent);


//Imp Check btn click event
const btnCheck = document.querySelector('.check');
btnCheck.addEventListener('click', function () {
    let userGuessedNum = Number(document.querySelector('.guess').value);

    if (!userGuessedNum) {
        setMsg("💀 Invalid input!");

        //Change bg color
        changeBgColor('#f92f60');
    } else {
        //Change bg color
        changeBgColor('#212121');

        checkGuess(randomNum, userGuessedNum);
    }
})

//Check user guess function
function checkGuess(randomNum, userNum) {

    //Case-1: User Guess is correct.
    if (userNum === randomNum) {
        //Set Success Msg
        setMsg("🎉 Correct Guess");

        //Change bg color
        changeBgColor('#60b347');

        //Logic-> Set HighScore & Prv. HighScore
        if (txtScore > txtHighScore) {
            txtPrvHighScore = txtHighScore;
            txtHighScore = txtScore;
            document.querySelector('.highscore').textContent = txtScore;

            //After highscore changes set to prvHighScore
            document.querySelector('.prvhighscore').textContent = txtPrvHighScore;
        }

        //Show random no. txt & Increase width
        document.querySelector('.number').textContent = randomNum;
        document.querySelector('.number').style.width = '30rem';

        //Make check btn disable after win
        btnCheckDisable();

        //Case-2: User Guess is Incorrect.
    } else if (userNum !== randomNum) {

        if (txtScore > 1) {
            //Set Msg
            setMsg(userNum > randomNum ? "📈 Too high!" : "📉 Too low!");

            //Reduce the score
            wrongGuess();
        } else {
            //Set Msg
            setMsg("☠️ GAME OVER...Try Again");

            //Make check btn disable after game over
            btnCheckDisable();
        }
    }
}

//Function-> Reduce score of wrong guess
function wrongGuess() {
    //Reduce the score
    document.querySelector('.score').textContent = txtScore -= 1;
}

//Btn Again - Restart Game
document.querySelector('.again').addEventListener('click', function () {
    //Set check btn active after reset
    btnCheck.disabled = false;
    btnCheck.style.cursor = "pointer";
    btnCheck.style.opacity = "1";

    setMsg("Start guessing..?");

    txtScore = 20;
    document.querySelector('.score').textContent = txtScore;

    document.querySelector('.guess').value = "";

    //Reset
    randomNum = Math.floor((Math.random() * 20) + 1);
    document.querySelector('.number').textContent = "?";
    document.querySelector('.number').style.width = '15rem';

    //Change bg color
    changeBgColor('#212121');
});

//Change bg color function
function changeBgColor(color) {
    document.querySelector('body').style.backgroundColor = color;
}

//Diable Check button -> after win & game over
function btnCheckDisable() {
    btnCheck.disabled = true;
    btnCheck.style.cursor = "not-allowed";
    btnCheck.style.opacity = ".2";
}