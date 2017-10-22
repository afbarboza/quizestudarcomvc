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

function getQuestionId(strQuestion) {
	var strSize = strQuestion.length;
	return strQuestion.slice(strSize - 1);
}

$(document).ready(function() {

	function addClickHandler()

	$("#create_save").click(function(e) {
		/* prevents page from reloading */
		e.preventDefault();
		
		/* increments the question counter */
		var labelValue = document.getElementById("question_tag").textContent;
		var nextQuestionId = parseInt(getQuestionId(labelValue)) + 1;
		document.getElementById("question_tag").textContent = "Questão " + nextQuestionId;

		/*var statement = $("#statement_question").val();
		var rans = $("#right_answer_txt").val();
		var wans1 = $("#wrong_answer_txt1").val();
		var wans2 = $("#wrong_answer_txt2").val();
		var wans3 = $("#wrong_answer_txt3").val();

		if (validateForm(statement, rans, wans1, wans2, wans3) == false) {
			alert("preencha corretamente todos os campos");
			return false;
		}

		var question = new Question(statement, rans, wans1, wans2, wans3);
		console.log(question.getQuestionStatement());
		console.log(question.getRightAnswer());
		console.log(question.getWrongAnswer1());
		console.log(question.getWrongAnswer2());
		console.log(question.getWrongAnswer3());

		alert("classe instanciada com sucesso");*/	
	});
});
