/**
 * Question - Movel (MVC)
 *
 * Represents a question created by user
 */

class Question {
	constructor(id, statement, rans, wans1, wans2, wans3) {
		/* set the quiz title - what are the title of the quiz who owns this question? */
		this.quizTitle = "default";

		/* set the statement (enunciation) of the question */
		this.statement = statement;

		/* set some unique id dor the question */
		this.id = id;

		/* set the right answer of the question */
		this.right_answer = rans;

		/* set the first wrong answer */
		this.wrong_answer1 = wans1;

		/* set the second wrong answer */
		this.wrong_answer2 = wans2;

		/* set the third wrong answer */
		this.wrong_answer3 = wans3;
	}

	/* just some bunch of getters */
	getQuestionStatement() {
		return this.statement;
	}

	getRightAnswer() {
		return this.right_answer;
	}

	getWrongAnswer1() {
		return this.wrong_answer1;
	}

	getWrongAnswer2() {
		return this.wrong_answer2;
	}

	getWrongAnswer3() {
		return this.wrong_answer3;
	}

	getTitleOwner() {
		return this.quizTitle;
	}

	setQuestionOwner(questionTitleOwner) {
		this.quizTitle = questionTitleOwner;
	}

	/**
	* saveQuestion - once we wont implement backend persistence,
	* this website stores the question using the WebStorage API.
	*
	* save quetions in local storage
	*/
	saveQuestion() {
		if (typeof(Storage) == undefined) {
			alert("Você precisa habilitar o uso de cookies antes de usar o site!");
			return;
		}

		/* store the set of answer to a given question */
		localStorage.setItem(this.quizTitle + this.id + "statement", this.statement);
		localStorage.setItem(this.quizTitle + this.id+"right_answer",  this.right_answer);
		localStorage.setItem(this.quizTitle + this.id+"wrong_answer1", this.wrong_answer1);
		localStorage.setItem(this.quizTitle + this.id+"wrong_answer2", this.wrong_answer2);
		localStorage.setItem(this.quizTitle + this.id+"wrong_answer3", this.wrong_answer3);
	}

	/**
	* retrieveQuestion - retrive answers to a given question
	*/
	retrieveQuestion() {
		if (typeof(Storage) == undefined) {
			alert("Você precisa habilitar o uso de cookies antes de usar o site!");
			return;
		}
		
		/* retrieves the set of questions to a given question */
		this.statement = localStorage.getItem(this.quizTitle     + this.id + "statement");
		this.right_answer = localStorage.getItem(this.quizTitle  + this.id + "right_answer");
		this.wrong_answer1 = localStorage.getItem(this.quizTitle + this.id + "wrong_answer1");
		this.wrong_answer2 = localStorage.getItem(this.quizTitle + this.id + "wrong_answer2");
		this.wrong_answer3 = localStorage.getItem(this.quizTitle + this.id + "wrong_answer3");	
	}
}
