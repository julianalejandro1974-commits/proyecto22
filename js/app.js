// Lógica principal de Quiz Challenge.
const QUESTION_TIME = 60;
const POINTS_PER_CORRECT_ANSWER = 1;
const PENALTY_FOR_TIMEOUT = 1;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

const questionCounter = document.getElementById("question-counter");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const timerElement = document.getElementById("timer");
const timerBar = document.getElementById("timer-bar");
const categoryElement = document.getElementById("question-category");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const answerHint = document.getElementById("answer-hint");

let currentQuestionIndex = 0;
let score = 0;
let secondsRemaining = QUESTION_TIME;
let timerInterval = null;
let hasAnswered = false;
let results = [];

document.getElementById("total-questions").textContent = quizQuestions.length;
document.getElementById("score-out-of").textContent = `de ${quizQuestions.length} puntos`;

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", goToNextQuestion);
restartButton.addEventListener("click", startQuiz);

function startQuiz() {
    clearInterval(timerInterval);
    currentQuestionIndex = 0;
    score = 0;
    results = [];
    scoreElement.textContent = score;
    showScreen(quizScreen);
    renderQuestion();
}

function showScreen(screenToShow) {
    [startScreen, quizScreen, resultScreen].forEach(screen => {
        screen.classList.add("hidden");
    });
    screenToShow.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
    clearInterval(timerInterval);
    hasAnswered = false;
    secondsRemaining = QUESTION_TIME;

    const question = quizQuestions[currentQuestionIndex];
    questionCounter.textContent = `PREGUNTA ${currentQuestionIndex + 1} DE ${quizQuestions.length}`;
    progressBar.style.width = `${(currentQuestionIndex / quizQuestions.length) * 100}%`;
    categoryElement.textContent = question.category;
    questionText.textContent = question.question;
    feedback.className = "feedback hidden";
    feedback.textContent = "";
    answerHint.textContent = "Selecciona una respuesta para continuar.";
    nextButton.disabled = true;
    nextButton.innerHTML = currentQuestionIndex === quizQuestions.length - 1
        ? 'Ver resultado <span aria-hidden="true">→</span>'
        : 'Siguiente <span aria-hidden="true">→</span>';

    answersContainer.innerHTML = "";
    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-button";
        button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span></span>`;
        button.querySelector("span:last-child").textContent = answer;
        button.addEventListener("click", () => selectAnswer(index));
        answersContainer.appendChild(button);
    });

    updateTimerDisplay();
    timerInterval = setInterval(tickTimer, 1000);
}

function selectAnswer(selectedIndex) {
    if (hasAnswered) return;

    hasAnswered = true;
    clearInterval(timerInterval);

    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctAnswer;
    const answerButtons = [...answersContainer.querySelectorAll(".answer-button")];

    answerButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === question.correctAnswer) {
            button.classList.add("correct");
        } else if (index === selectedIndex) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score += POINTS_PER_CORRECT_ANSWER;
        scoreElement.textContent = score;
        feedback.className = "feedback success";
        feedback.innerHTML = `<strong>¡Correcto! +${POINTS_PER_CORRECT_ANSWER} punto</strong>`;
    } else {
        feedback.className = "feedback error";
        feedback.innerHTML = `<strong>Respuesta incorrecta.</strong>`;
    }

    const correctAnswer = question.answers[question.correctAnswer];
    const explanation = document.createElement("span");
    explanation.textContent = `La respuesta correcta es: ${correctAnswer}. ${question.explanation}`;
    feedback.appendChild(explanation);

    answerHint.textContent = "Respuesta registrada.";
    nextButton.disabled = false;
    results.push({
        question: question.question,
        selectedAnswer: question.answers[selectedIndex],
        correctAnswer,
        isCorrect,
        timedOut: false,
        explanation: question.explanation
    });
}

function tickTimer() {
    secondsRemaining -= 1;
    updateTimerDisplay();

    if (secondsRemaining <= 0) {
        clearInterval(timerInterval);
        handleTimeout();
    }
}

function updateTimerDisplay() {
    timerElement.textContent = `00:${String(secondsRemaining).padStart(2, "0")}`;
    timerBar.style.width = `${(secondsRemaining / QUESTION_TIME) * 100}%`;
    timerBar.classList.toggle("low", secondsRemaining <= 10);
}

function handleTimeout() {
    if (hasAnswered) return;
    hasAnswered = true;
    score -= PENALTY_FOR_TIMEOUT;
    scoreElement.textContent = score;

    const question = quizQuestions[currentQuestionIndex];
    const answerButtons = [...answersContainer.querySelectorAll(".answer-button")];

    answerButtons.forEach((button, index) => {
        button.disabled = true;
        if (index === question.correctAnswer) {
            button.classList.add("correct");
        }
    });

    feedback.className = "feedback error";
    feedback.innerHTML = "<strong>¡Se acabó el tiempo! −1 punto</strong>";
    const explanation = document.createElement("span");
    explanation.textContent = `La respuesta correcta era: ${question.answers[question.correctAnswer]}. ${question.explanation}`;
    feedback.appendChild(explanation);

    answerHint.textContent = "El tiempo terminó. Puedes continuar.";
    nextButton.disabled = false;
    results.push({
        question: question.question,
        selectedAnswer: null,
        correctAnswer: question.answers[question.correctAnswer],
        isCorrect: false,
        timedOut: true,
        explanation: question.explanation
    });
}

function goToNextQuestion() {
    if (!hasAnswered) return;
    currentQuestionIndex += 1;

    if (currentQuestionIndex < quizQuestions.length) {
        renderQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(timerInterval);
    showScreen(resultScreen);

    const correctCount = results.filter(result => result.isCorrect).length;
    const timeoutCount = results.filter(result => result.timedOut).length;
    const incorrectCount = results.length - correctCount - timeoutCount;

    document.getElementById("final-score").textContent = score;
    document.getElementById("correct-count").textContent = correctCount;
    document.getElementById("incorrect-count").textContent = incorrectCount;
    document.getElementById("timeout-count").textContent = timeoutCount;

    const resultTitle = document.getElementById("result-title");
    const resultMessage = document.getElementById("result-message");
    const percentage = (correctCount / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultTitle.textContent = "¡Excelente trabajo!";
        resultMessage.textContent = "¡Respondiste todas las preguntas correctamente! Dominas estos temas.";
    } else if (percentage >= 70) {
        resultTitle.textContent = "¡Muy buen trabajo!";
        resultMessage.textContent = "Tienes una buena base. Sigue practicando para llegar aún más lejos.";
    } else if (percentage >= 40) {
        resultTitle.textContent = "¡Vas por buen camino!";
        resultMessage.textContent = "Has conseguido algunos aciertos. Revisa las respuestas y sigue aprendiendo.";
    } else {
        resultTitle.textContent = "¡Sigue practicando!";
        resultMessage.textContent = "Cada intento es una oportunidad para aprender algo nuevo. ¡No te rindas!";
    }

    renderReview();
}

function renderReview() {
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";

    results.forEach((result, index) => {
        const item = document.createElement("article");
        const statusClass = result.isCorrect ? "correct-review" : result.timedOut ? "timeout-review" : "incorrect-review";
        const statusText = result.isCorrect ? "Correcta" : result.timedOut ? "Tiempo agotado" : "Incorrecta";
        item.className = `review-item ${statusClass}`;

        const title = document.createElement("h3");
        title.textContent = `${index + 1}. ${result.question}`;

        const status = document.createElement("p");
        status.className = "review-status";
        status.textContent = statusText;

        const yourAnswer = document.createElement("p");
        yourAnswer.textContent = `Tu respuesta: ${result.selectedAnswer ?? "Sin responder"}`;

        const correctAnswer = document.createElement("p");
        correctAnswer.textContent = `Respuesta correcta: ${result.correctAnswer}`;

        const explanation = document.createElement("p");
        explanation.textContent = result.explanation;

        item.append(title, status, yourAnswer, correctAnswer, explanation);
        reviewList.appendChild(item);
    });
}
