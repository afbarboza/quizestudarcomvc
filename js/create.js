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
	var nextQuestionId = currentID + 1;
	document.getElementById("question_tag").textContent = "Questão " + nextQuestionId;

	/* stores locally the question */
	var question = new Question(currentID, statement, rans, wans1, wans2, wans3);
	question.setQuestionOwner(quizTitle);
	question.saveQuestion();
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
		storeQuestion();

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
