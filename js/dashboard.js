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

/**
 * getSelectedQuizName - gets the name of the selected quiz
 *
 */
function getSelectedQuizName(hrefID) {
	return (document.getElementById(hrefID).textContent);
}

/**
 * getIndexQuiz - gets the index of the selected quiz
 *
 * @quizName - the name of the quiz
 */
function getIndexQuiz(quizName) {
	var numberOfQuizes = getNumberOfQuizes();
	for (i = 1; i < (numberOfQuizes + 1); i++) {
		var tmpQuizName = localStorage.getItem("quiz" + i);
		if (quizName.localeCompare(tmpQuizName) == 0)
			return i;
	}
	return 0;
}

function storeSelectedQuizInfo(quizTitle, quizIndex) {
	var strCurrQuizSize = "";
	var currQuizSize = 0;

	/* save the selected quiz to be done by the user */
	localStorage.setItem("currentUserQuiz", quizTitle);

	/* save the size of the selected quiz */
	var strCurrQuizSize = localStorage.getItem("number_questions_quiz" + quizIndex);
	currQuizSize = parseInt(strCurrQuizSize);
	localStorage.setItem("currentUserQuizSize", currQuizSize);
	alert("o tamanho do quiz selecionado é de " + currQuizSize + " questoes");
}

$(document).ready(function() {

	/* lits all the created quizes after the page is loaded */
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

	/* handler to the 'create new quiz' button */
	$("#add_quiz").click(function() {
		var quizTitle = prompt("Dê um nome ao seu quiz", "QuizLand :) ");
		alert("O nome do seu quiz será " + quizTitle);
		saveLastCreatedQuizName(quizTitle);
		alert("substituindo...");
		window.location.assign("./create.html");
		return false;
	});

	/* handler to answer a new quiz */
	$(".li_item").click(function(e) {
		/* gets the quiz identifier */
		e.preventDefault();
		var selectedQuiz = getSelectedQuizName(this.id);
		alert("selectedQuiz: " + selectedQuiz);

		/* gets the quiz index */
		var selectedQuizIdx = getIndexQuiz(selectedQuiz);
		alert("o indice do quiz corrente é " + selectedQuizIdx);

		/* store the informations about the selectec quiz to be done */
		storeSelectedQuizInfo(selectedQuiz, selectedQuizIdx);

		/* redirects the user to the answer quiz page */
		window.location.assign("./answer.html")	;
	});
});
