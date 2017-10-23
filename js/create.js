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
	var quizTitle = localStorage.getItem("lastCreatedQuiz");

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
	var quizName = localStorage.getItem("lastCreatedQuiz");

	/*step 2: we must map the quiz index to its name 
	* we will do it using some kingd of Map data structure
	*/
	localStorage.setItem("quiz"+quizIndex, quizName);

	/*
	* step 3: we also must record the number of questions
	* in each quiz
	*/
	localStorage.setItem("number_questions_quiz" + quizIndex, numberOfQuestions);

	/*
	* step 4: we als must mark the quiz as valid
	* (i.e.: it was not deleted yet)
 	*/
	localStorage.setItem("valid_quiz"+quizIndex, "valid");
}

$(document).ready(function() {
	$("#create_save").click(function(e) {
		/* prevents page from reloading */
		e.preventDefault();

		/* stores the created question */
		storeQuestion();

		/*clean all fields for the next question */
		cleanQuestionFields();
	});

	$("#create_finish").click(function(e) {
		/* prevents page from reloading */
		e.preventDefault();
	
		/* stores the created question */
		var numberOfQuestions = storeQuestion();

		/*increment global counter of quizes */
		var quizIndex = incrementQuizCounter();

		/*TODO: save quiz*/
		pushQuiz(quizIndex, numberOfQuestions);
		//console.log("esse quiz tem " + numberOfQuestions + " questoes...\n");

		/* back to the main page */
		window.location.assign("./dashboard.html");	
	});

	$("#create_cancel").click(function(e) {
		/* prevents page from reloading */
		e.preventDefault();

		/*clean all fields for the next question */
		cleanQuestionFields();

	});
});
