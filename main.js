

const quizQuestions = [
    {
        question: "What is the capital of France?",
        a: "Paris",
        b: "London",
        c: "Berlin",
        d: "Madrid",
        correct: "a"
    },
    {
        question: "What is 2 + 2?",
        a: "3",
        b: "4",
        c: "5",
        d: "6",
        correct: "b"
    },
    // ...
];

let submitted = false;

let currentQuestionIndex = 0;
let selections = Array( quizQuestions.length ).fill( null );

// Event Handlers
document.getElementById("next-button").addEventListener( "click", () => changeQuestion(1) );
document.getElementById("previous-button").addEventListener( "click", () => changeQuestion(-1) );
document.getElementById("submit-button").addEventListener( "click", submitQuiz );

const options = document.getElementsByClassName( "button" );

const answerButtons = document.querySelectorAll(".button");
answerButtons.forEach(button => {
    button.addEventListener("click", selectAnswer);
});

function loadQuestion() {
    const currentQuestion = quizQuestions[ currentQuestionIndex ];
    document.getElementById("question").textContent = currentQuestion.question;
    document.getElementById("option-a").textContent = currentQuestion.a;
    document.getElementById("option-b").textContent = currentQuestion.b;
    document.getElementById("option-c").textContent = currentQuestion.c;
    document.getElementById("option-d").textContent = currentQuestion.d;
    updateProgress();

    clearPreviousSelections();

    const selectedItem = selections[ currentQuestionIndex ];
    if( selectedItem ) highlightSelection( selectedItem );
}

function changeQuestion( direction ) {
    currentQuestionIndex += direction;

    if( currentQuestionIndex >= 0 && currentQuestionIndex < quizQuestions.length ) {
        loadQuestion();
    } else {
        currentQuestionIndex -= direction; // Stay within the bounds of the array
    }
}

function selectAnswer( event ) {
    const targetElement = event.target; // event.target.closest( "span" );
    if( !targetElement || !targetElement.id ) return;

    const selectedOption = targetElement.id.replace( "option-", "" );

    selections[ currentQuestionIndex ] = targetElement;

    console.log( "TARGET ELEMENT", targetElement, "SELECTED OPTION", selectedOption );
    highlightSelection( targetElement, selectedOption );
}

function highlightSelection( targetElement, selectedOption ) {
    clearPreviousSelections();

    if( submitted ) {
        const selectedAnswer = targetElement.id.replace( "option-", "" );
        const correctAnswer = quizQuestions[currentQuestionIndex].correct;

        targetElement.classList.add( selectedAnswer === correctAnswer ? "correct" : "wrong" );
    }
    else {
        targetElement.classList.add( "selected" );
    }
}

function removeHighlights() {
    answerButtons.forEach( option => {
        const parentListItem = option.parentNode;
        parentListItem.classList.remove( "correct", "wrong" );
    });
}

function clearPreviousSelections() {
    document.querySelectorAll('#answer-buttons li').forEach(li => {
        li.classList.remove('selected', 'correct', 'wrong');
    });
}

function updateProgress() {
    document.getElementById("progress").textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
}

function submitQuiz() {

    submitted = true;
    clearPreviousSelections();

    const selectedItem = selections[ currentQuestionIndex ];
    if( selectedItem ) highlightSelection( selectedItem );

    score = selections.reduce( (score, selection, index) => {
        console.log( selection, quizQuestions[index], score);
        if( selection && selection.id.replace("option-", "") === quizQuestions[index].correct ) return score + 1;
        else return score;
    }, 0);
    document.getElementById('result').textContent = `Your score: ${score}/${quizQuestions.length}`;

    answerButtons.forEach( button => {
        button.removeEventListener( "click", selectAnswer );
    });
}

loadQuestion(); // Initial load of the quiz






