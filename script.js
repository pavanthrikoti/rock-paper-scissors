let playerScore = 0;
let computerScore = 0;
let sound = new Audio();
let soundTimeout;

function play(userChoice) {
  const computerChoice = getComputerChoice();
  const result = getResult(userChoice, computerChoice);
  showResult(result, userChoice, computerChoice);
  playSound(result);
}

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * 3)];
}

function getResult(user, comp) {
  if (user === comp) return "tie";
  if (
    (user === "rock" && comp === "scissors") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissors" && comp === "paper")
  ) return "win";
  return "lose";
}

function showResult(result, user, comp) {
  const resultText = document.getElementById("result");
  if (result === "win") {
    playerScore++;
    resultText.textContent = `You Win! ${user} beats ${comp}`;
  } else if (result === "lose") {
    computerScore++;
    resultText.textContent = `You Lose! ${comp} beats ${user}`;
  } else {
    resultText.textContent = `It's a Tie! Both chose ${user}`;
  }

  document.getElementById("player-score").textContent = playerScore;
  document.getElementById("computer-score").textContent = computerScore;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  document.getElementById("player-score").textContent = "0";
  document.getElementById("computer-score").textContent = "0";
  document.getElementById("result").textContent = "";
}

function playSound(result) {
  const soundCheckbox = document.getElementById("sound-checkbox");
  if (!soundCheckbox.checked) return;

  // Stop any ongoing sound
  if (!sound.paused) {
    sound.pause();
    sound.currentTime = 0;
    clearTimeout(soundTimeout);
  }

  if (result === "win") sound.src = "win.mp3";
  else if (result === "lose") sound.src = "lose.mp3";
  else sound.src = "tie.mp3";

  sound.play();

  // Stop after 3 seconds
  soundTimeout = setTimeout(() => {
    sound.pause();
    sound.currentTime = 0;
  }, 3000);
}
