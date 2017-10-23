/**
 * validateForm - check for empty fields
 *
 */
function validateForm(stmt, rans, wans1, wans2, wans3) {
	var valid = true;

	if (stmt == null || stmt == "")
		valid = false;

	if (rans == null || rans == "")
		valid = false;

	if (wans1 == null || wans1 == "")
		valid = false;

	if (wans2 == null || wans2 == "")
		valid = false;

	if (wans3 == null || wans3 == "")
		valid = false;

	return valid;
}

/**
 * getQuestionId - get the number of the current question
 *
 * @strQuestion: the string representation of the 
 * 		 number of the current question
 */
function getQuestionId(strQuestion) {
	var strSize = strQuestion.length;
	return strQuestion.slice(strSize - 1);
}

/**
 * cleanQuestionFields - clean the fields of the all questions.
 *
 * clean the fields so user can insert a new question.
 *
 */
function cleanQuestionFields() {
	document.getElementById("statement_question").value = "";
	document.getElementById("right_answer_txt").value = "";
	document.getElementById("wrong_answer_txt1").value = "";
	document.getElementById("wrong_answer_txt2").value = "";
	document.getElementById("wrong_answer_txt3").value = "";
}

/**
 * storeQuestion - stores the recently created question
 */
function storeQuestion() {
	/* stores the number of the question */
	var questionIndex = 0;

	/* gets view inputs */
	var statement = $("#statement_question").val();
	var rans = $("#right_answer_txt").val();
	var wans1 = $("#wrong_answer_txt1").val();
	var wans2 = $("#wrong_answer_txt2").val();
	var wans3 = $("#wrong_answer_txt3").val();

	/* validate form inputs */
	if (validateForm(statement, rans, wans1, wans2, wans3) == false) {
		alert("preencha corretamente todos os campos");
		return false;
	}

	/* gets the title of the quiz  (aka the name of the quiz) */
	var quizTitle = localStorage.getItem("currentUserQuiz");

	/* increments the question counter */
	var labelValue = document.getElementById("question_tag").textContent;
	var currentID = parseInt(getQuestionId(labelValue));
	questionIndex = currentID;
	var nextQuestionId = currentID + 1;
	document.getElementById("question_tag").textContent = "Questão " + nextQuestionId;

	/* stores locally the question */
	var question = new Question(currentID, statement, rans, wans1, wans2, wans3);
	question.setQuestionOwner(quizTitle);
	question.saveQuestion();

	return questionIndex;
}

/**
 * incrementQuizCounter - increment the number of
 *			quizes created by the user.
 */
function incrementQuizCounter() {
	var strValue = localStorage.getItem("numberOfQuizes");
	value = parseInt(strValue);
	value++;
	localStorage.setItem("numberOfQuizes", value);
	return value;
}

/**
 *
 * pushQuiz - saves the quiz name and its index.
 *
 * This function it pretty useful in the dashboard view.
 * Once we save the index of the quiz, we are able to
 * retrive its name and checks whether the quiz is already
 * deleted or not.
 *
 */
function pushQuiz(quizIndex, numberOfQuestions) {
	/* step 1: we must retrieve the quiz name */
	var quizName = localStorage.getItem("currentUserQuiz");

	/*step 2: we must map the quiz index to its name 
	* we will do it using some kingd of Map data structure
	*/
	localStorage.setItem("quiz"+quizIndex, quizName);

	/*
	* step 4: we als must mark the quiz as valid
	* (i.e.: it was not deleted yet)
 	*/
	localStorage.setItem("valid_quiz"+quizIndex, "valid");
}

/**
 * getCurrentQuestionIndex - get the number of the current question
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

function finishCurrentQuiz() {
	localStorage.setItem("currentQuestionCounter", 1);
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
        document.getElementById("statement_question").textContent = statement;
	document.getElementById("question_tag").textContent = "Questão " + currentUserQuestionIdx;
}


function setCurrentRightAnswer() {
        /* gets the quiz title and question number */
        var currentUserQuiz = localStorage.getItem("currentUserQuiz");
        var currentUserQuestionIdx = getCurrentQuestionIndex();

	/* retrieves the right answer from localStorage */
	var rans = localStorage.getItem(currentUserQuiz + currentUserQuestionIdx + "right_answer");

	/* update the view */
	document.getElementById("right_answer_txt").textContent = rans;
}

/**
 * setWrongAnswer - seths the textfield of the wrong answer
 *
 *
 * @wans: index of the wrong answer (1 - wrong answer 1, and so on...)
 *
 */
function setWrongAnswer(wans) {
        /* gets the quiz title and question number */
        var currentUserQuiz = localStorage.getItem("currentUserQuiz");
        var currentUserQuestionIdx = getCurrentQuestionIndex();

	/* sets the wrong answer text area */
        var wrongAnswer = localStorage.getItem(currentUserQuiz + currentUserQuestionIdx + "wrong_answer" + wans);
        document.getElementById("wrong_answer_txt" + wans).textContent = wrongAnswer;
}

/**
 * incCurrentQuestionIndex - increment the counter of questions
 *      already alswered by the user.
 *
 */
function incCurrentQuestionIndex() {
        var currentQuestionIdx = 0;
        var strCurrentQuestionIdx = getCurrentQuestionIndex();
        currentQuestionIdx = parseInt(strCurrentQuestionIdx);
        currentQuestionIdx++;
        localStorage.setItem("currentQuestionCounter", currentQuestionIdx);
}


function retrieveCurrentQuestionInfo() {
	setCurrentQuestionStatement();
	setCurrentRightAnswer();
	setWrongAnswer(1);
	setWrongAnswer(2);
	setWrongAnswer(3);
}


function onloadInput() {
	alert("carregando caixa de texto...");
}

$(document).ready(function() {

	document.getElementById("wrong_answer_txt1").onload = onloadInput;

	//$("#wrong_answer1").addEventListener("load", onloadInput);
	retrieveCurrentQuestionInfo();

	$("#create_save").click(function(e) {		
                var lengthOfQuiz =  parseInt(localStorage.getItem("currentUserQuizSize"));
		var currQuestionIdx = getCurrentQuestionIndex();

                if (currQuestionIdx == lengthOfQuiz) {
			/* prevents page from reloading */
			e.preventDefault();

			/* stores the created question */
			storeQuestion();
		
			/* print out some user info */
                        alert(" Todas questões já foram editadas ");
                        finishCurrentQuiz();

			/* come back to control panel */
                        window.location.assign("./dashboard.html");
                } else {
			/* prevents page from reloading */
			//e.preventDefault();

			/* stores the created question */
			storeQuestion();

			/* increments global counter of questions */
			incCurrentQuestionIndex();

			//cleanQuestionFields();
			retrieveCurrentQuestionInfo();

			/* reloads the page */
			location.reload();
		}

	});

	$("#create_finish").click(function(e) {
		/* prevents page from reloading */
		e.preventDefault();

		/* stores the created question */
		storeQuestion();

		/* finish quiz */
		finishCurrentQuiz();

		/* back to the main page */
		window.location.assign("./dashboard.html");	
	});

	$("#create_cancel").click(function(e) {
		/* finish quiz */
		finishCurrentQuiz();

		/* back to the main page */
		window.location.assign("./dashboard.html");	
	});
});
