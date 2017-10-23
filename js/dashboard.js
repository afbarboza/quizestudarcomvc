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
	var retval = document.getElementById(hrefID).textContent;
	console.log(retval);
	return retval;
}

/**
 * getIndexQuiz - gets the index of the selected quiz
 *
 * @quizName - the name of the quiz
 */
function getIndexQuiz(quizName) {
	console.log(quizName);

	var numberOfQuizes = getNumberOfQuizes();
	for (i = 1; i < (numberOfQuizes + 1); i++) {
		var tmpQuizName = localStorage.getItem("quiz" + i);
		if (quizName.localeCompare(tmpQuizName) == 0)
			return i;
	}
	return 0;
}

/**
 * storeSelectedQuizInfo - sets information about the to be created/deleted/edited quiz 
 *
 */
function storeSelectedQuizInfo(quizTitle, quizIndex) {
	var strCurrQuizSize = "";
	var currQuizSize = 0;

	/* save the selected quiz to be done by the user */
	localStorage.setItem("currentUserQuiz", quizTitle);

	/* save the size of the selected quiz */
	var strCurrQuizSize = localStorage.getItem("number_questions_quiz" + quizIndex);
	currQuizSize = parseInt(strCurrQuizSize);
	localStorage.setItem("currentUserQuizSize", currQuizSize);
}

/**
 * isDeletedQuiz - checks whether the quiz were deleted.
 *
 * @index: the index of the quiz which we wanna find out 
 * whether has already been deleted by the user.
 *
 * returns true, if the quiz is deleted.
 *	flase, otherwise.
 */
function isDeletedQuiz(index) {
	var quizTitle = localStorage.getItem("quiz" + index);
	if (quizTitle == null) {
		return true;
	} else {
		return false;
	}
}


/**
 * isAllDeleted - checks whether all the quizes had already been
 *	deleted.
 *
 * returns true, if there is no existent quiz.
 *	false, if there is at least one created quiz.
 */

function isAllDeleted() {
	var nbrQuizes = getNumberOfQuizes();
	for (i = 1; i < (nbrQuizes + 1); i++) {
		if (!isDeletedQuiz(i)) {
			return false;
		}
	}
	return true;
}

/**
 * setEditQuizBoxesVisibility - sets the visibility of edit check boxes
 * 
 */
function setEditQuizBoxesVisibility(value)
{
	var max = getNumberOfQuizes();
	for (i = 1; i < (max + 1); i++) {
		if (!isDeletedQuiz(i))
			document.getElementById("editCheckBox" + i).style.visibility = value;
	}
}



/**
 * setDeleteQuizBoxesVisibility - sets the visibility of delete check boxes
 * 
 */
function setDeleteQuizBoxesVisibility(value)
{
	var max = getNumberOfQuizes();
	for (i = 1; i < (max + 1); i++) {
		if (!isDeletedQuiz(i))
			document.getElementById("delCheckBox" + i).style.visibility = value;
	}
}

/**
 * handleDeleteQuiz - deletes the user quiz.
 *
 */
function handleDeleteQuiz() {
	/* finds out the quiz name by traversing DOM tree */
	var deletedQuizName = $(this).siblings().html();
	console.log(deletedQuizName);

	/* finds the to be deleted quiz index */
	var deletedQuizIdx = getIndexQuiz(deletedQuizName);

	/* gets the number of quizes */
	var nbrQuizes = getNumberOfQuizes();

	/* marks the quiz as deleted */
	localStorage.removeItem("quiz" + deletedQuizIdx);

	/* for each checkbox, makes it invisible again */
	for (i = 1; i < (nbrQuizes + 1); i++) {
		if (!isDeletedQuiz(i))
			setDeleteQuizBoxesVisibility("false");
	}

	/* automatically reloads the page */
	location.reload();
}

/**
 * handleEditQuiz - edit the user quiz.
 *
 */
function handleEditQuiz() {
	alert('editando...');

	/* finds out the quiz name by traversing DOM tree */
	var editedQuizName = $(this).siblings().html();

	/* finds the to be edited quiz index */
	var editedQuizIdx = getIndexQuiz(editedQuizName);

	/* setting paramater to edit the question */
	//storeSelectedQuizInfo(selectedQuiz, selectedQuizIdx);
	storeSelectedQuizInfo(editedQuizName, editedQuizIdx);

	/* replacing the page */
	window.location.assign("./edit.html");

}

/**
 * fillEmptySpaces - make some dummy graphical adjustments to the HTML DOM tree
 *
 *
 */
function fillEmptySpaces() {
	var nbrQuizes = getNumberOfQuizes();

	for (i = 1; i < (nbrQuizes + 1); i++) {
		if (!isDeletedQuiz(i))
			return;
	}

	alert("não há quizes criados");
	for (i = 0; i < 5; i++) {
		var emptyItem = '<li class="empty_li_item"> <a href="" style="text-decoration: none; list-style-type: none; list-style: none;">&nbsp</a></li>';
		$("#list_quiz").append(emptyItem);
	}
}


$(document).ready(function() {

	/* lits all the created quizes after the page is loaded */
	var quizCounter = getNumberOfQuizes();
	if (quizCounter == 0) {
		alert("não há quizes criados");
		for (i = 0; i < 5; i++) {
			var emptyItem = '<li class="empty_li_item"> <a href="" style="text-decoration: none; list-style-type: none; list-style: none;">&nbsp</a></li>';
			$("#list_quiz").append(emptyItem);
		}
	} else {
		/* some graphical trick to improve UX */
		fillEmptySpaces();

		/* adds a li item for each quiz */
		var msg = "";
		for (i = 1; i < (quizCounter+1); i++) {
			/*step 1: create an graphic unique identifier for the quiz*/
			var hrefID = "quiz_link" + i;

			/* just some bunch of white spaced */
			var bnsp = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp";

			/* also adds the checkbox to delete questions */
			var checkBox = '<input id="delCheckBox' + i + '"  type="checkbox" style="visibility: hidden"/>';
			var checkBox2 = '<input id="editCheckBox' + i + '"  type="checkbox" style="visibility: hidden"/>';

			/*checks whether the quiz was deleted by the user */
			if (isDeletedQuiz(i)) {
				continue;
			}

			/* gets the name of the quiz to be displayed */
			msg = localStorage.getItem("quiz" + i);

			/*creates the HTML string which represents the li quiz item */
			var quizItem = '<li class="li_item"><a class="li_item_quiz" href="" style="text-decoration: none" id="' + hrefID  + '">' + msg + '</a>' + bnsp + checkBox + checkBox2 + '</li>';

			/* adds the the HTML DOM tree */
			$("#list_quiz").append(quizItem);

			/* for debug purposes only */
			console.log(msg);
		}
	}

	/* handler to the 'create new quiz' button */
	$("#add_quiz").click(function() {
		var quizTitle = prompt("Dê um nome ao seu quiz", "QuizLand :) ");
		alert("O nome do seu quiz será " + quizTitle);
		saveLastCreatedQuizName(quizTitle);
		window.location.assign("./create.html");
		return false;
	});

	/* handler to the 'edit the quiz' button */
	$("#edit_quiz").click(function() {
		/* sanity check: we cannot edit a quiz which does not exist */
		var nbrQuizes = getNumberOfQuizes();
		if (nbrQuizes == 0) {
			alert("Não quizes a serem editados.");
			return;
		}

		if (isAllDeleted()) {
			alert("Não quizes a serem editados.");
			return;
		}

		/* for each check box, assign the check box handler */		
		for (i = 1; i < (nbrQuizes + 1); i++) {
			$("#editCheckBox" + i).change(handleEditQuiz);
		}

		/* set the visibility of all check boxes */
		for (i = 1; i < (nbrQuizes + 1); i++) {
			setEditQuizBoxesVisibility("visible");
		}

	});


	/* handler to 'delete the quiz' button */
	$("#del_quiz").click(function(e) {
		/* sanity check: we cannot delte a quiz which does not exist */
		var nbrQuizes = getNumberOfQuizes();
		if (nbrQuizes == 0) {
			alert("Não quizes a serem excluídos.");
			return;
		}

		if (isAllDeleted()) {
			alert("Não quizes a serem excluídos.");
			return;
		}

		var nbrQuizes = getNumberOfQuizes();

		/* for each check box, assign the check box handler */		
		for (i = 1; i < (nbrQuizes + 1); i++) {
			$("#delCheckBox" + i).change(handleDeleteQuiz);
		}

		/* set the visibility of all check boxes */
		for (i = 1; i < (nbrQuizes + 1); i++) {
			setDeleteQuizBoxesVisibility("visible");
		}
	});

	/* handler to answer a new quiz */
	$(".li_item_quiz").click(function(e) {
		/* gets the quiz identifier */
		var selectedQuiz = getSelectedQuizName(this.id);

		/* gets the quiz index */
		var selectedQuizIdx = getIndexQuiz(selectedQuiz);

		/* store the informations about the selectec quiz to be done */
		storeSelectedQuizInfo(selectedQuiz, selectedQuizIdx);

		/* redirects the user to the answer quiz page */
		window.location.assign("./answer.html")	;
	});
});
