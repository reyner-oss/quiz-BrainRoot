const quizData = [
    {
        question: "Ibukota Indonesia ?",
        options: ["A. IKN ", "B. Jakarta ", "C. Bandung ", "D. Lampung ", "E. Surabaya"],
        correct: "B. Jakarta"
    },
    {
        question: "siapa nama presiden pertama?",
        options: ["A.udin", "B.soekarno", "C.lampard", "D.drogba", "E.ronaldo"],
        correct: "B. soekarno"
    },
    {
        question: "berapa hasil dari pertambahan 12 + 12?",
        options: ["A.22", "B.21", "C.24", "D.31", "E.34"],
        correct: "C. 24"
    },
    {
        question: "Manakah yang bukan termasuk jenis alat musik tiup?",
        options: ["A. Gitar", "B. Saksofon", "C. Trompet", "D. Terompet", "E. Seruling"],
        correct: "A. gitar"
    },
    {
        question: "Siapakah penulis buku 'Harry Potter'?",
        options: ["A. J.R.R. Tolkien", "B. J.K. Rowling", "C. George R.R. Martin", "D. C.S. Lewis", "E. Roald Dahl"],
        correct: "B. J.K. Rowling"
    },
    {
        question: "Berapa jumlah benua di dunia?",
        options: ["A. 4", "B. 5", "C. 6", "D. 7", "E. 8"],
        correct: "C. 6"
    },
    {
        question: "Apa ibu kota Jepang?",
        options: ["A. Seoul", "B. Tokyo", "C. Beijing", "D. Jakarta", "E. Manila"],
        correct: "B. Tokyo"
    },
    {
        question: "Berapa jumlah provinsi di Indonesia?",
        options: ["A. 38", "B. 31", "C. 32", "D. 33", "E. 34"],
        correct: "A. 38"
    },
    {
        question: "BERAPA HASIL DARI PERKALIAN 5 X 5?",
        options: ["A. 55", "B. 394", "C. 10", "D. 25", "E. 23"],
        correct: "D. 25"
    },
    {
        question: "APA WARNA BUAH PISANG?",
        options: ["A. HIJAU", "B. MERAH", "C. BIRU", "D. HITAM", "E. KUNING"],
        correct: "E. KUNING"
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function startQuiz() {
    document.getElementById('start').classList.add('hidden');
    document.getElementById('timer').classList.remove('hidden');

    let countdownNumber = 3;
    const countdownElement = document.getElementById('countdown');
    countdownElement.innerText = countdownNumber;

    const countdownInterval = setInterval(() => {
        countdownNumber--;
        countdownElement.innerText = countdownNumber;

        if (countdownNumber === 0) {
            clearInterval(countdownInterval);
            document.getElementById('timer').classList.add('hidden');
            document.getElementById('quiz').classList.remove('hidden');
            document.querySelector('.navigation').classList.remove('hidden');
            loadQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    const questionEl = document.getElementById("quiz");
    const currentQuiz = quizData[currentQuestion];
    questionEl.innerHTML = `
        <div class="question">${currentQuiz.question}</div>
        <ul class="options">
            ${currentQuiz.options.map((option, index) => `
                <li>
                    <input type="radio" name="answer" id="option${index}" value="${option.trim()}">
                    <label for="option${index}">${option}</label>
                </li>
            `).join('')}
        </ul>
    `;

    if (userAnswers[currentQuestion]) {
        const selectedOption = document.querySelector(`input[value="${userAnswers[currentQuestion]}"]`);
        if (selectedOption) {
            selectedOption.checked = true;
        }
    }

    updateNavigation();
    updateProgress();
}

function updateNavigation() {
    document.getElementById("prevBtn").style.visibility = currentQuestion > 0 ? "visible" : "hidden";
    document.getElementById("nextBtn").innerText = currentQuestion < quizData.length - 1 ? "Selanjutnya" : "Selesai";
}

function updateProgress() {
    const progress = document.getElementById("progress");
    const width = ((currentQuestion + 1) / quizData.length) * 100;
    progress.style.setProperty('--progress', `${width}%`);
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption && currentQuestion < quizData.length - 1) {
        alert("Silakan pilih jawaban Anda!");
        return;
    }

    if (selectedOption) {
        // Simpan jawaban lengkap pengguna
        userAnswers[currentQuestion] = selectedOption.value;
        console.log(`Question ${currentQuestion + 1}: User answer: ${userAnswers[currentQuestion]}, Correct answer: ${quizData[currentQuestion].correct}`);
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function prevQuestion() {
    currentQuestion--;
    loadQuestion();
}

function showResults() {
    document.getElementById("quiz").classList.add('hidden');
    document.querySelector(".navigation").classList.add('hidden');
    document.getElementById("results").classList.remove('hidden');

    score = 0; // Reset score sebelum menghitung ulang

    const resultList = document.getElementById("resultList");
    resultList.innerHTML = "";

    quizData.forEach((quiz, index) => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        const userAnswer = userAnswers[index] || "Tidak dijawab";
        const correctAnswer = quiz.correct;
        const isCorrect = userAnswer.trim() === correctAnswer.trim();

        if (isCorrect) {
            score++;
        }

        console.log(`Question ${index + 1}: User answer: ${userAnswer}, Correct answer: ${correctAnswer}, Is correct: ${isCorrect}`);

        resultItem.innerHTML = `
            <p><strong>Pertanyaan ${index + 1}:</strong> ${quiz.question}</p>
            <p>Jawaban Anda: ${userAnswer}</p>
            <p>Jawaban Benar: ${correctAnswer}</p>
            <p style="color: ${isCorrect ? 'green' : 'red'}">${isCorrect ? 'Benar' : 'Salah'}</p>
        `;

        resultList.appendChild(resultItem);
    });

    const scorePercentage = (score / quizData.length) * 100;
    document.getElementById("score").innerText = `Skor Anda: ${score} dari ${quizData.length} (${scorePercentage.toFixed(2)}%)`;
}


function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.getElementById("results").classList.add('hidden');
    document.getElementById('start').classList.remove('hidden');
}

window.onload = function() {
    document.getElementById('start').classList.remove('hidden');
}