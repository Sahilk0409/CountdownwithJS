// Set target date to April 29, 2025
const targetDate = new Date("April 20, 2025 23:20:00").getTime();

// Function to update the countdown
function updateCountdown() {
  const currentDate = new Date().getTime();
  const timeRemaining = Math.max(0, targetDate - currentDate);

  // Calculate time units
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  // Update days display (split into hundreds, tens, ones)
  flip(document.querySelector("[data-days-hundreds]"), Math.floor(days / 100));
  flip(
    document.querySelector("[data-days-tens]"),
    Math.floor((days % 100) / 10)
  );
  flip(document.querySelector("[data-days-ones]"), days % 10);

  // Update hours, minutes, seconds display
  flip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
  flip(document.querySelector("[data-hours-ones]"), hours % 10);

  flip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
  flip(document.querySelector("[data-minutes-ones]"), minutes % 10);

  flip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
  flip(document.querySelector("[data-seconds-ones]"), seconds % 10);

  // Show button and hide countdown when countdown ends
  // if (timeRemaining === 0) {
  //   const countdownContainer = document.getElementById("countdownContainer");
  //   const redirectBtn = document.getElementById("redirectBtn");
  //   countdownContainer.style.display = "none";
  //   redirectBtn.style.display = "block";
  //   clearInterval(countdownInterval);
  // }
  // Redirect when countdown ends
  if (timeRemaining === 0) {
    clearInterval(countdownInterval);
    window.location.href = "https://happybirthdaymona.netlify.app/"; // Replace with your URL
  }
}

// Function to flip a card
function flip(flipCard, newNumber) {
  if (!flipCard) return; // Safety check

  const topHalf = flipCard.querySelector(".top");
  const startNumber = parseInt(topHalf.textContent);
  if (newNumber === startNumber) return; // Don't flip if number hasn't changed

  const bottomHalf = flipCard.querySelector(".bottom");

  // Create flip animation elements
  const topFlip = document.createElement("div");
  topFlip.classList.add("top-flip");
  topFlip.textContent = startNumber;

  const bottomFlip = document.createElement("div");
  bottomFlip.classList.add("bottom-flip");
  bottomFlip.textContent = newNumber;

  // Set up animation events
  topFlip.addEventListener("animationstart", () => {
    topHalf.textContent = newNumber;
  });

  topFlip.addEventListener("animationend", () => {
    topFlip.remove();
  });

  bottomFlip.addEventListener("animationend", () => {
    bottomHalf.textContent = newNumber;
    bottomFlip.remove();
  });

  // Append animation elements to create the flip effect
  flipCard.append(topFlip, bottomFlip);
}

// Add redirect functionality
document.getElementById("redirectBtn").addEventListener("click", () => {
  window.location.href = "https://your-new-website.com"; // Replace with your URL
});

// Initialize countdown
updateCountdown();

// Update every 250ms for smooth countdown
countdownInterval = setInterval(updateCountdown, 250);
