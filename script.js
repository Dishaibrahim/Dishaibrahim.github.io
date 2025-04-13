// Assign each flower a random direction and speed
const flowers = document.querySelectorAll(".flower");

flowers.forEach(flower => {
  const directions = [
    { startY: "110vh", endY: "-20vh", startX: "0vw", endX: "0vw" }, // bottom to top
    { startY: "-20vh", endY: "110vh", startX: "0vw", endX: "0vw" }, // top to bottom
    { startX: "-20vw", endX: "110vw", startY: "0vh", endY: "0vh" }, // left to right
    { startX: "110vw", endX: "-20vw", startY: "0vh", endY: "0vh" }  // right to left
  ];

  const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  const duration = Math.random() * 10 + 10; // 10s to 20s
  const delay = Math.random() * 5;

  flower.style.setProperty('--startX', randomDirection.startX || '0vw');
  flower.style.setProperty('--endX', randomDirection.endX || '0vw');
  flower.style.setProperty('--startY', randomDirection.startY || '0vh');
  flower.style.setProperty('--endY', randomDirection.endY || '0vh');
  flower.style.animationDuration = `${duration}s`;
  flower.style.animationDelay = `${delay}s`;

  // Random position on screen
  flower.style.top = `${Math.random() * 100}%`;
  flower.style.left = `${Math.random() * 100}%`;
});
