/**
 * saveLastCreatedQuizName - stores the name of the last
 *	(to be created) quiz. This funcion proved to be useful in
 *	create question MVC.
 *
 * @lastCreatedQuizName: name of the last created quiz.
 */

function saveLastCreatedQuizName(lastCreatedQuizName) {
	if (typeof(Storage) == undefined) {
		alert("Você precisa habilitar o uso de cookies antes de usar o site!");
		return;
	}
	localStorage.setItem("lastCreatedQuiz", lastCreatedQuizName);
}

/**
 * for debug purposes only...
 *
 */
function getNumberOfQuizes() {
	var value = localStorage.getItem("numberOfQuizes");
	if (value == null) {
		/* nao ha quizes criados */
		value = 0;
		localStorage.setItem("numberOfQuizes", 0);
	}
	return value;
}

$(document).ready(function() {
	if (getNumberOfQuizes() == 0) {
		alert("não há quizes criados");
	}	

	$("#add_quiz").click(function() {
		var quizTitle = prompt("Dê um nome ao seu quiz", "QuizLand :) ");
		alert("O nome do seu quiz será " + quizTitle);
		saveLastCreatedQuizName(quizTitle);
		alert("substituindo...");
		window.location.assign("./create.html");
		return false;
	});
});
