//Delcare variables
var score = 0;
var timeLeft = 75;
var timer;


//arrray questions- titles, choices, and answers     
var questions = [{
  title: "String values must be enclosed within ________ when being assigned to variables",
  choices: ["Commas", "Quotes", "Parenthesis", "Periods"],
  answer: "Quotes"
},
{
  title: "Commonly used Data Types do NOT Include:",
  choices: ["numbers", "strings", "alerts", "booleans"],
  answer: "alerts"
},
{
  title: " Arrays in JavaScript can be used to store ________.",
  choices: ["Numbers", "Strings", "Other Arrays", "All of the above"],
  answer: "All of the above"
},
{
  title: "Which of the following function of an array object adds and/or removes elements from an array?",
  choices: ["toSource( )", "sort( )", "unshift( )", "splice( )"],
  answer: "splice( )"
},
{
  title: "Which of the following function of String object combines the text of two strings and returns a new string?",
  choices: ["add( )", "concat( )", " merge( )", "append( )"],
  answer: "concat( )"
}
]

//Click start button to start timer and quiz
function startBtn() {
  timeLeft = 75;
  document.getElementById("timeLeft").innerHTML = timeLeft;
  // console.log(timeLeft);

  timer = setInterval(function () {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    // timeLeft is 0, clear interval and endgame 
    if (timeLeft === 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);

  nextQtn();
}

// set initial questions array index before ++
var currentQuestion = -1;
// loops thru questions array 
function nextQtn() {
  currentQuestion++;
  // check to see if all questions been asked
  if (currentQuestion === questions.length) {
    endGame();
    return;
  }
  // var to hold arr questions.title 
  var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

  // loop through questions choices 
  for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
    
    var buttonCode = "<button onclick=questions[currentQuestion].choice[i]";
    var answerCode = questions[currentQuestion].answer;
    // console.log('buttoncode is ' + buttonCode);
    // console.log('answercode is ' + answerCode);

      if (buttonCode == answerCode) {
      buttonCode = "<button onclick=correct()>";
      console.log('buttoncode is ' + buttonCode);
    } else {
      buttonCode = "<button onclick=incorrect()>";
      console.log('buttoncode is ' + buttonCode);
    }

    quizContent += buttonCode
  }

  document.getElementById("quizBody").innerHTML = quizContent;
}

//end game to output score and name
function endGame() {
  clearInterval(timer);

  var quizResults = `
  <h2>Finished!</h2>
  <h3>You got ` + score / 20 + ` questions correct. </h3>
  <h3>That is a score ` + score + ` out of 100.</h3>
  <input type="text" id="name" placeholder="Your Initials"> 
  <button onclick="setScore()">Set score!</button><br>
  <button onclick="resetGame()">Play Again!</button>
  `;

  document.getElementById("quizBody").innerHTML = quizResults;
}

//store the scores on local storage
function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById('name').value);
  getScore();
}

function getScore() {
  var quizContent = `
  <h2>` + localStorage.getItem("highscoreName") + `'s last saved score is:</h2>
  <h1>` + localStorage.getItem("highscore") + `</h1><br> 
  
  <button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>
  
  `;

  document.getElementById("quizBody").innerHTML = quizContent;
}


//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");

  resetGame();
}

//reset the game 
function resetGame() {
  clearInterval(timer);
  score = 0;
  currentQuestion = -1;
  timeLeft = 0;
  timer = null;

  document.getElementById("timeLeft").innerHTML = timeLeft;

  var quizContent = `
  <h1>
      Coding Quiz!
  </h1>
  <h3>
      Click start to play!   
  </h3>
  <button onclick="startBtn()">Start!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 10seconds from the timer if user chooses an incorrect answer
function incorrect() {
  timeLeft -= 10;
  console.log('timeleft incorrect' + timeLeft);
  nextQtn();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
  score += 20;
  nextQtn();
}