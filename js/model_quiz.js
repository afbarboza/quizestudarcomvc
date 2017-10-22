class Quiz {
	constructor(name) {
		/* set quiz name */
		this.name = name;

		/* set unique quiz id */
		this.id = new Date().getTime();

		/** 
		*
		* initializes an empty list of questions 
		* As a matter of fact, the quiz is an array list
		* of questions.
		*
		*/
		this.listOfQuestions = [];
	}


	/* just some buch of setters and getters */
	get getQuizName() {
		return this.name;
	}

	get getQuizId() {
		return this.id;
	}

	get getQuizSize() {
		return this.listOfQuestions.length;
	}

	/**
	* getQuestionAt - get some question using its index
	*
	* @index: the position of the question in the array of question
	*
	*/
	get getQuestionAt(index) {

		/* some sanity checks */
		if (index < 0 || index >= this.getQuizSize()) {
			return null;
		}

		/* a quiz with length zero does not have any questions at all */
		if (this.getQuizSize() == 0) {
			return null;
		}

		/* returning the index-th element */
		return this.listOfQuestions[index];
	}

	/**
	*
	* addNewQuestion - inserts a new question to the quiz
	*
	* @q: the new question to be inserted
	* 	( @q must be typeof(Question) )
	*/
	addNewQuestion(q) {
		this.listOfQuestions.push(q);
	}
}
