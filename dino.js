// Get the canvas element
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load the dino image
const dinoImage = new Image();
dinoImage.src = 'images/chick.png'; // Replace with the path to your dino image

// Game constants
const GROUND_HEIGHT = 80;
const DINO_SIZE = { width: 44, height: 47 };
const OBSTACLE_SIZE = { minWidth: 20, maxWidth: 40, heightMin: 40, heightMax: 70 };
const SPEED = 6;
const GRAVITY = 2;
const JUMP_VELOCITY = -25;

// Game state
let dino = {
  x: 50,
  y: 0,
  width: DINO_SIZE.width,
  height: DINO_SIZE.height,
  vy: 0, // velocity in the y direction
  grounded: false
};

let ground = canvas.height - GROUND_HEIGHT;
let obstacles = [];
let frame = 0;

// Draw the dino with wiggle effect
function drawDino() {
  const wiggle = Math.sin(frame * 0.3) * 2; // 2px wiggle side to side
  ctx.drawImage(dinoImage, dino.x + wiggle, dino.y, dino.width, dino.height);
}

// Draw obstacles
function drawObstacle(obstacle) {
  ctx.fillStyle = '#ccc';
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Spawn obstacles
function spawnObstacle() {
  const height = Math.random() * (OBSTACLE_SIZE.heightMax - OBSTACLE_SIZE.heightMin) + OBSTACLE_SIZE.heightMin;
  const width = Math.random() * (OBSTACLE_SIZE.maxWidth - OBSTACLE_SIZE.minWidth) + OBSTACLE_SIZE.minWidth;
  obstacles.push({
    x: canvas.width,
    y: ground - height,
    width,
    height
  });
}

// Main update loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw ground
  ctx.fillStyle = '#333';
  ctx.fillRect(0, ground, canvas.width, GROUND_HEIGHT);

  // Apply gravity
  dino.vy += GRAVITY; // Gravity pulls the dino down
  dino.y += dino.vy;

  // Ground collision check
  if (dino.y + dino.height >= ground) {
    dino.y = ground - dino.height; // Reset dino to ground level
    dino.vy = 0; // Stop downward velocity (grounded)
    dino.grounded = true; // Dino is grounded and can jump again
  } else {
    dino.grounded = false; // Dino is in the air
  }

  drawDino();

  // Update and draw obstacles
  if (frame % 60 === 0) spawnObstacle();
  obstacles.forEach((obstacle, index) => {
    obstacle.x -= SPEED;
    drawObstacle(obstacle);
    if (obstacle.x + obstacle.width < 0) {
      obstacles.splice(index, 1); // Remove obstacle once it's off-screen
    }
  });

  frame++;
  requestAnimationFrame(update); // Keep the game running
}

// Start after image is loaded
dinoImage.onload = () => {
  dino.y = ground - dino.height; // Set initial ground position
  update(); // Start the game loop
};

// Space bar jump handler
document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.code === 'Space') {
    if (dino.grounded) { // Only allow jump if dino is on the ground
      dino.vy = JUMP_VELOCITY; // Apply jump velocity
      dino.grounded = false; // Dino is in the air now
    }
  }
});
