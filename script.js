let quiz = JSON.parse(localStorage.getItem("quiz")) || [];
let currentIndex = 0;
let score = 0;

function addQuestion() {
    let question = document.getElementById("question").value;
    let opt1 = document.getElementById("opt1").value;
    let opt2 = document.getElementById("opt2").value;
    let opt3 = document.getElementById("opt3").value;
    let opt4 = document.getElementById("opt4").value;
    let correct = document.getElementById("correct").value;

    if (!question || !opt1 || !opt2 || !opt3 || !opt4 || !correct) {
        alert("Please fill all fields");
        return;
    }

    quiz.push({
        question: question,
        options: [opt1, opt2, opt3, opt4],
        answer: correct - 1
    });

    document.getElementById("msg").innerText = "Question Added!";
}

function saveQuiz() {
    localStorage.setItem("quiz", JSON.stringify(quiz));
    alert("Quiz Saved Successfully!");
    window.location.href = "index.html";
}

function loadQuestion() {
    if (quiz.length === 0) {
        document.getElementById("quizBox").innerHTML =
            "<p>No quiz available!</p>";
        return;
    }

    let q = quiz[currentIndex];

    let html = `<h3>${q.question}</h3>`;

    q.options.forEach((opt, i) => {
        html += `
        <div>
            <input type="radio" name="option" value="${i}">
            ${opt}
        </div>`;
    });

    document.getElementById("quizBox").innerHTML = html;
}

function nextQuestion() {
    let selected = document.querySelector('input[name="option"]:checked');

    if (selected) {
        if (selected.value == quiz[currentIndex].answer) {
            score++;
        }
    }

    currentIndex++;

    if (currentIndex < quiz.length) {
        loadQuestion();
    } else {
        localStorage.setItem("score", score + "/" + quiz.length);
        window.location.href = "result.html";
    }
}

if (window.location.pathname.includes("take.html")) {
    loadQuestion();
}