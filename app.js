const readlineSync = require('readline-sync');

console.log("Welcome to the quiz!");
console.log("\n");

const username = readlineSync.question("Your Name? ");
console.log("\n");
console.log("Welcome to THE QUIZ, " + username + "!");

let score = 0;

function quiz(question, answer, timeLimit, callback) {
  let answered = false;
  const timeout = setTimeout(() => {
    if (!answered) {
      console.log("Time's up.....Moving to the next question.");
      console.log("-------------------");
      callback();  // Move to next question
    }
  }, timeLimit * 1000);

  const userAnswer = readlineSync.question(question);
  answered = true;
  clearTimeout(timeout);

  if (userAnswer.toLowerCase() === answer.toLowerCase()) {
    console.log("Correct!");
    score++;
  } else {
    console.log("Wrong!");
    if (score > 0) score--;  // Prevent negative score
  }
  console.log("Your score is", score);
  console.log("-------------------");

  callback(); // Move to next question after answering
}

// New quiz questions with varying time limits
const questions = [
  { question: "Which planet is known as the Red Planet? ", answer: "Mars", timeLimit: 5 },
  { question: "Who wrote the play 'Romeo and Juliet'? ", answer: "Shakespeare", timeLimit: 4 },
  { question: "What is the capital of France? ", answer: "Paris", timeLimit: 3 },
  { question: "What is the largest mammal on Earth? ", answer: "Blue whale", timeLimit: 6 },
  { question: "Which element's chemical symbol is 'O'? ", answer: "Oxygen", timeLimit: 2 },
  { question: "Did you enjoy the quiz? ", answer: "yes", timeLimit: 1 }
];

// Function to ask each question with a timer
function askQuestion(index) {
  if (index < questions.length) {
    const currentQ = questions[index];
    quiz(currentQ.question, currentQ.answer, currentQ.timeLimit, () => askQuestion(index + 1));
  } else {
    console.log("Quiz is finished!");
    console.log("YOUR FINAL SCORE IS: " + score + "/" + questions.length);
  }
}

// Start the quiz
askQuestion(0);
