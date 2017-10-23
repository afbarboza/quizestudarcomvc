/**
 * getCurrentQuestionIndex - get the number of the current question
 *
 *
 */
function getCurrentQuestionIndex() {
	var currentQuestionIdx = 0;
	var strCurrentQuestionIdx = localStorage.getItem("currentQuestionCounter");
	if (strCurrentQuestionIdx == null) {
		localStorage.setItem("currentQuestionCounter", 1);
		currentQuestionIdx = 1;	
	} else {
		currentQuestionIdx = parseInt(strCurrentQuestionIdx);
	}
	return currentQuestionIdx;
}

/**
 * incCurrentQuestionIndex - increment the counter of questions
 *	already alswered by the user.
 *
 */
function incCurrentQuestionIndex() {
	var currentQuestionIdx = 0;
	var strCurrentQuestionIdx = getCurrentQuestionIndex();
	currentQuestionIdx = parseInt(strCurrentQuestionIdx);
	currentQuestionIdx++;
	localStorage.setItem("currentQuestionCounter", currentQuestionIdx);
}

function finishCurrentQuiz() {
	localStorage.setItem("currentQuestionCounter", 1);
	localStorage.setItem("curr_score", 0);
}



/**
 * setCurrentQuestionNumber - set the number of the current question
 *
 */
function setCurrentQuestionNumber() {
	var questionNbr = getCurrentQuestionIndex();
	document.getElementById("lbl_question_nbr").textContent = "Questão " +  questionNbr;
}

/**
 * generateRandomAnswersSequence - generate some random sequence of answers.
 *
 */
function generateRandomAnswersSequence() {
	var possibleSequences  = ["1234","1243","1324","1342","1423","1432","2143","2134","2341","2314","2431","2413","3124","3142","3214","3241","3412","3421","4132","4123","4231","4213","4321","4312"];
	var randomSequence = Math.floor(Math.random() * (23 - 0)) + 0;
	return possibleSequences[randomSequence];
}

/**
 * setCurrentQuestionStatement - sets the current enuciation of the question
 *
 */
function setCurrentQuestionStatement() {
	/* gets the quiz title and question number */
	var currentUserQuiz = localStorage.getItem("currentUserQuiz");
	var currentUserQuestionIdx = getCurrentQuestionIndex();

	/* retrieves statement from localStorage */
	var statement = localStorage.getItem(currentUserQuiz + currentUserQuestionIdx + "statement");

	/*update the view */
	document.getElementById("lbl_question_stmt").textContent = statement;
}

/**
 * setRightAnswer - sets the right answer for the user.
 *
 * @randomSequence - the generated random sequence of answers
 * @quizTitle - the name of te quiz who owns the current question (primary key)
 * @questionID - the number of the current question
 *
 */
function setRightAnswer(randomSequence, quizTitle, questionID) {
	/* first: retrieves the right answer from local storage */
	var rightAnswer = localStorage.getItem(quizTitle + questionID + "right_answer");

	
	/* lookup the position of the reight answer */
	var rightAnswerPosition = 0;

	/* puts the right answer in this position */
	for (i = 0; i < 4; i++) {
		if (randomSequence.charAt(i) == '1') {
			rightAnswerPosition = (i + 1);
		}
	}

	/* stores the position of the right answer */
	localStorage.setItem("curr_right_answer", rightAnswerPosition);

	/* just updates the view */
	document.getElementById("ans" + rightAnswerPosition).textContent = rightAnswer;
}

/**
 * setWrongAnswer - seths the label of the wrong answer
 *
 * @randomSequence - the generated random sequence of nswers
 * @quizTitle - the name of the quiz who owns the current question (primary key)
 * @questionID - the number of the current question
 * @wans: index of the wrong answer (1 - wrong answer 1, and so on...)
 *
 */
function setWrongAnswer(randomSequence, quizTitle, questionID, wans) {
	var wrongAnswer = localStorage.getItem(quizTitle + questionID + "wrong_answer" + wans);

	var wrongAnswerPosition = 0;
	for (i = 0; i < 4; i++) {
		if (randomSequence.charAt(i) == (wans + 1).toString()) {
			wrongAnswerPosition = (i + 1)	
		}
	}

	document.getElementById("ans" + wrongAnswerPosition).textContent = wrongAnswer;
}

/**
 * checkAnswerSelection - checks whether whether a radio
 *	was selected.
 *
 * return true if one radio is checked;
 *	false, otherwise.
 */
function checkAnswerSelection() {
	var check1 = document.getElementById("opt1").checked;
	var check2 = document.getElementById("opt2").checked;
	var check3 = document.getElementById("opt3").checked;
	var check4 = document.getElementById("opt4").checked;
	return (check1 || check2 || check3 || check4);
}


/**
 * probeRightAnswer - checks whether the user selected the right answer
 *
 * return true if the user seletected the right answer
 *	false, otherwise.
 */
function probeRightAnswer() {
	/* gets the position of the right answer */
	var rightAnswerPos = parseInt(localStorage.getItem("curr_right_answer"));

	/* gets the selected element */
	var check1 = document.getElementById("opt1").checked;
	var check2 = document.getElementById("opt2").checked;
	var check3 = document.getElementById("opt3").checked;
	var check4 = document.getElementById("opt4").checked;

	if (check1 == true && rightAnswerPos == 1)
		return true;

	if (check2 == true && rightAnswerPos == 2)
		return true;

	if (check3 == true && rightAnswerPos == 3)
		return true;

	if (check4 == true && rightAnswerPos == 4)
		return true;

	return false;
}

/**
 * incUserScore - increments the score of the user.
 *
 * The score is incremented if, and only if, the right 
 * answer was seletected.
 */
function incUserScore() {
	/* store the current user score*/
	var currentUserScore = 0;

	/* get old score of the user */
	var strCurrentUserScore = localStorage.getItem("curr_score");

	/* if a score does not exist, we create one */
	if (strCurrentUserScore == null) {
		localStorage.setItem("curr_score", 0);
	} else {
		currentUserScore = parseInt(strCurrentUserScore);
	}
	currentUserScore++;
	
	/* stores back the incremented score*/
	localStorage.setItem("curr_score", currentUserScore);
}

function getPercentageScoreHits() {
	var sizeOfQuiz = parseInt(localStorage.getItem("currentUserQuizSize"));
	var currentUserScore = parseInt(localStorage.getItem("curr_score"));

	return ((currentUserScore / sizeOfQuiz) * 100);
}

$(document).ready(function() {
	/* updates the  question number and statement */
	setCurrentQuestionNumber();
	setCurrentQuestionStatement();

	/* gets some basic info about the current question */
	var answerSequence = generateRandomAnswersSequence();
	var currentQuiz = localStorage.getItem("currentUserQuiz");
	var currentIdx = getCurrentQuestionIndex();

	/* updates the answer to the question */
	setRightAnswer(answerSequence, currentQuiz, currentIdx);
	setWrongAnswer(answerSequence, currentQuiz, currentIdx, 1);
	setWrongAnswer(answerSequence, currentQuiz, currentIdx, 2);
	setWrongAnswer(answerSequence, currentQuiz, currentIdx, 3);

	/* adds a handler to the click listener of the next button */
	$("#next_question").click(function() {

		/* checks the user selected a question */
		if (checkAnswerSelection() == false) {
			alert("Você deve selecionar uma resposta!");
			return;
		}

		/* checks whether the user selected the right answer*/
		if (probeRightAnswer() == true) {
			incUserScore();
		}

		/* checks whether the user completed the quiz */
		lengthOfQuiz =  parseInt(localStorage.getItem("currentUserQuizSize"));
		if (lengthOfQuiz == getCurrentQuestionIndex()) {
			alert("Parabéns! Você finalizou o quiz!\nSua porcentagem de acertos foi de " + Math.floor(getPercentageScoreHits()) + "%");
			finishCurrentQuiz();
			window.location.assign("./dashboard.html");
		} else {
			incCurrentQuestionIndex();
			location.reload();
		}
	});

	$("#restart_quiz").click(function() {
		finishCurrentQuiz();
		location.reload();
	});
});
