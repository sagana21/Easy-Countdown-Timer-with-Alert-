let interval;
let timeLeft = 0;
let originalTime = 0;
let paused = false;

const display = document.getElementById("display");
const progressCircle = document.querySelector(".progress");
const beep = document.getElementById("beep");
const input = document.getElementById("secondsInput");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

// common start function
function handleStart() {
  if (!paused) {
    originalTime = parseInt(input.value);
    timeLeft = originalTime;
  }

  if (isNaN(originalTime) || originalTime <= 0) return;

  paused = false;
  startCountdown();
}

// CLICK on Start
startBtn.addEventListener("click", handleStart);

// PRESS Enter inside input
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleStart();
  }
});

pauseBtn.addEventListener("click", () => {
  clearInterval(interval);
  paused = true;
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  display.textContent = "0";
  updateProgress(1);
  paused = false;
});

function startCountdown() {
  clearInterval(interval);

  interval = setInterval(() => {
    display.textContent = timeLeft;
    updateProgress(timeLeft / originalTime);

    if (timeLeft === 0) {
      clearInterval(interval);
      notifyUser();
      beep.play();
      return;
    }

    timeLeft--;
  }, 1000);
}

function updateProgress(percent) {
  const circumference = 440;
  progressCircle.style.strokeDashoffset = circumference * percent;
}

function notifyUser() {
  if (Notification.permission === "granted") {
    new Notification("⏰ Time's up!");
  } else {
    Notification.requestPermission();
  }
}
