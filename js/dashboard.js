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
 * get the number of quizes already created by the user
 */
function getNumberOfQuizes() {
	var value = 0;
	var strValue = localStorage.getItem("numberOfQuizes");
	if (strValue == null) {
		/* there is no created quizes  */
		localStorage.setItem("numberOfQuizes", 0);
	} else {
		/* there is already created quizes */
		value = parseInt(strValue);
	}

	return value;
}

function getSelectQuizName(hrefID) {
}

$(document).ready(function() {

	/* lits all the created quizes */
	var quizCounter = getNumberOfQuizes();
	if (quizCounter == 0) {
		alert("não há quizes criados");
		for (i = 0; i < 5; i++) {
			var emptyItem = '<li class="empty_li_item"> <a href="https://www.w3schools.com" style="text-decoration: none; list-style-type: none; list-style: none;">&nbsp</a></li>';
			$("#list_quiz").append(emptyItem);
		}
	} else {
		/* for debug purposes only */
		var msg = "";
		for (i = 1; i < (quizCounter+1); i++) {
			var hrefID = "quiz_link" + i;
			msg = localStorage.getItem("quiz" + i);
			var quizItem = '<li class="li_item" id="' + hrefID  + '"><a href="" style="text-decoration: none">' + msg + '</a></li>';
			$("#list_quiz").append(quizItem);
			console.log(msg);
		}
	}

	

	$("#add_quiz").click(function() {
		var quizTitle = prompt("Dê um nome ao seu quiz", "QuizLand :) ");
		alert("O nome do seu quiz será " + quizTitle);
		saveLastCreatedQuizName(quizTitle);
		alert("substituindo...");
		window.location.assign("./create.html");
		return false;
	});

	$(".li_item").click(function(e) {
		e.preventDefault();
		
		alert(document.getElementById(this.id).textContent);
	});
});
