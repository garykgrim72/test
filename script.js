// script.js

// Загрузите данные из JSON
const quizData = [
  {
    question: "Какое из приведенных требований к манометрам указано верно?",
    options: [
      "Манометр должен быть выбран с такой шкалой, чтобы предел измерения рабочего давления находился во второй трети шкалы.",
      "Взамен красной черты разрешается в качестве указателя значения максимально допустимого давления прикреплять к корпусу манометра пластину.",
      "На шкале манометра владельцем сосуда должна быть нанесена красная черта, указывающая предельное давление в сосуде.",
      "Фамилия и имя проверяющего."
    ],
    correctAnswers: [0, 2]
  },
  {
    question: "Какие из перечисленных требований к отметкам по результатам технического освидетельствования баллонов указаны неверно?",
    options: [
      "На сферической части каждого баллона должно быть нанесено клеймо организации.",
      "Указана дата проведенного и следующего технического освидетельствования баллона.",
      "Указана масса баллона с учетом массы нанесенной краски.",
      "Фамилия и имя проверяющего."
    ],
    correctAnswers: [3]
  }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const submitBtn = document.getElementById("submit-btn");

  if (currentQuestionIndex >= quizData.length) {
    showResult();
    return;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsElement.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "answer";
    checkbox.value = index;
    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(option));
    optionsElement.appendChild(li);
  });

  submitBtn.disabled = false;
}

function checkAnswer() {
  const selectedAnswers = Array.from(
    document.getElementsByName("answer")
  ).filter((checkbox) => checkbox.checked).map((checkbox) => parseInt(checkbox.value));

  const currentQuestion = quizData[currentQuestionIndex];
  const isCorrect = arraysEqual(selectedAnswers.sort(), currentQuestion.correctAnswers.sort());

  if (isCorrect) {
    score++;
  }

  currentQuestionIndex++;
  loadQuestion();
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function showResult() {
  const quizContainer = document.getElementById("quiz-container");
  const resultElement = document.getElementById("result");

  quizContainer.style.display = "none";
  resultElement.textContent = `Вы набрали ${score} из ${quizData.length} баллов!`;
  resultElement.style.color = score === quizData.length ? "green" : "red";
}

document.getElementById("submit-btn").addEventListener("click", checkAnswer);

loadQuestion();
