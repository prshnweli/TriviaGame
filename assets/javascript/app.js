// Variables

var gameHTML;
var number = 30;
var questionCounter = 0;
var intervalId;
var right = 0;
var wrong = 0;
var noGuess = 0;

//document

$(document).ready(function() {

function startGame() {
	var startScreen = "<p><a class='btn start-button' href='#'>Start Quiz</a></p>";
	$(".game").html(startScreen);
}

startGame();



$("body").on("click", ".start-button", function(event){
	generateHTML();
	run();
}); 

$("body").on("click", ".answer", function(event){
	guess = $(this).text();
	if(guess === correctAnswers[questionCounter]) {
		clearInterval(intervalId);
		guessCorrect();
	}
	else {
		clearInterval(intervalId);
		guessWrong();
	}
}); 

$("body").on("click", ".reset-button", function(event){
	resetGame();
}); 

});  


//Create timer for 30 sec. 

function run() {
	intervalId = setInterval(decrement, 1000);
	function decrement() {
		if (number === 0) {
			clearInterval(intervalId);
			timeUp();
		}
		if (number > 0) {
			number--;
		}
		$(".timer").html(number);
	}
}

  
//Create array with questions

var questionArray = [
"How much of the things does Jon Snow know?", 
"Possible side effects of dueling the Mountain may include?", 
"Who is Arya?", 
"Things you can trust your life with more than Littlefinger?", 
"Bran can see everything. But can he see why kids love the taste of Cinnamon Toast Crunch?", 
"Why does Bron choose to fight with the Lannisters?", 
"Hodor, Hodor?",];


//Array with random answers 

var answerArray = [
["All the Things", "Most of the Things", "Some of the Things", "Nothing"], 
["Nausea and/or Vomiting","Severe Headache","Bad Gas","Decreased Appetite"], 
["Arya Stark of Winterfell", "Little Girl with Little Sword", "No-one", "Some Angry Person"], 
["Hungry Dragon","White Walkers","Some Random Guy","All of the Above"], 
["Yes", "No", "Maybe", "This is a stupid question"], 
["Investment in Experience","Investment in Friends","Investment in Real Estate","No reason"], 
["Hodor Hodor!", "Hodor", "Hoooooodooooooor", "Heh Hodor"], 
];
var correctAnswers = ["Nothing", "Severe Headache", "No-one", "All of the Above", "No", "Investment in Real Estate", "Hodor"];




//display questions and answers onto DOM one at a time

function generateHTML() {
	gameHTML = "<p timer-p'>Time Remaining: <span class='timer'>30</span></p><p>" 
	+ questionArray[questionCounter] + "</p><button class='first-answer answer'>" 
	+ answerArray[questionCounter][0] + "</button><button class='answer'>"
	+ answerArray[questionCounter][1] + "</button><button class='answer'>"
	+ answerArray[questionCounter][2] + "</button><button class='answer'>"
	+ answerArray[questionCounter][3] + "</button>";
	$(".game").html(gameHTML);
}


//If user picks right answer alert correct else alert wrong with correct answer
//Store number correct and incorrect and unanswered into a variable

function guessCorrect() {
	right++;
	gameHTML = "<p timer-p'>Time Remaining: <span class='timer'>" 
	+ number + "</span></p>" 
	+ "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>";
	$(".game").html(gameHTML);
	setTimeout(wait, 2000);  
}

function guessWrong() {
	wrong++;
	gameHTML = "<p timer-p'>Time Remaining: <span class='timer'>" 
	+ number + "</span></p>" 
	+ "<p class='text-center'>Sorry! The correct answer is: " + correctAnswers[questionCounter] + "</p>";
	$(".game").html(gameHTML);
	setTimeout(wait, 2000); 
}


//If time = 0 create time up alert with correct answer

function timeUp() {
	noGuess++;
	gameHTML = "<p timer-p'>Time Remaining: <span class='timer'>" 
	+ number + "</span></p>" 
	+ "<p class='text-center'>Time up! The correct answer was: " + correctAnswers[questionCounter] + "</p>";
	$(".game").html(gameHTML);
	setTimeout(wait, 2000);  
}

//Create time blocks in between each click to move to next question

function wait() {
	if (questionCounter < 6) {
	questionCounter++;
	generateHTML();
	number = 30;
	run();
	}
	else {
		finalScreen();
	}
}


//After all questions are answered display variables 

function finalScreen() {
	gameHTML = 
	"<p class='summary-correct'>Correct Answers: " + right + "</p>" 
	+ "<p>Wrong Answers: " + wrong + "</p>" 
	+ "<p>Unanswered: " + noGuess + "</p>" 
	+ "<p><a class='btn reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$(".game").html(gameHTML);
}


//reset button.

function resetGame() {
	questionCounter = 0;
	right = 0;
	wrong = 0;
	noGuess = 0;
	number = 30;
	generateHTML();
	run();
}


