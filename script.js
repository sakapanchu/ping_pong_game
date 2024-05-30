// Selecting the canvas
let can = document.getElementById("table");
let draw_ = can.getContext("2d");

can.addEventListener("mousemove", getMousePosition);

// Defining game elements
const ball = {
    x: can.width / 2,
    y: can.height / 2,
    radius: 10,
    velX: 5,
    velY: 5,
    speed: 5,
    color: "green"
};

const user = {
    x: 0,
    y: (can.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "red",
    speed: 10
};

const cpu = {
    x: can.width - 10,
    y: (can.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "blue",
    speed: 5
};

const sep = {
    x: (can.width - 2) / 2,
    y: 0,
    height: 10,
    width: 2,
    color: "orange"
};

// Drawing functions
function drawRectangle(x, y, w, h, color) {
    draw_.fillStyle = color;
    draw_.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    draw_.fillStyle = color;
    draw_.beginPath();
    draw_.arc(x, y, r, 0, Math.PI * 2, true);
    draw_.closePath();
    draw_.fill();
}

function drawScore(text, x, y) {
    draw_.fillStyle = "white";
    draw_.font = "60px Arial";
    draw_.fillText(text, x, y);
}

function drawSeparator() {
    for (let i = 0; i <= can.height; i += 20) {
        drawRectangle(sep.x, sep.y + i, sep.width, sep.height, sep.color);
    }
}

function render() {
    // Clear the canvas
    drawRectangle(0, 0, can.width, can.height, "black");
    
    // Draw the net
    drawSeparator();
    
    // Draw the scores
    drawScore(user.score, can.width / 4, can.height / 5);
    drawScore(cpu.score, 3 * can.width / 4, can.height / 5);
    
    // Draw the paddles
    drawRectangle(user.x, user.y, user.width, user.height, user.color);
    drawRectangle(cpu.x, cpu.y, cpu.width, cpu.height, cpu.color);
    
    // Draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Movement functions
function moveUserPaddle() {
    if (user.y + user.height / 2 < ball.y) {
        user.y += user.speed;
    } else {
        user.y -= user.speed;
    }

    // Ensure paddle doesn't go out of bounds
    if (user.y < 0) {
        user.y = 0;
    }
    if (user.y + user.height > can.height) {
        user.y = can.height - user.height;
    }
}

function moveCpuPaddle() {
    if (cpu.y + cpu.height / 2 < ball.y) {
        cpu.y += cpu.speed;
    } else {
        cpu.y -= cpu.speed;
    }

    // Ensure paddle doesn't go out of bounds
    if (cpu.y < 0) {
        cpu.y = 0;
    }
    if (cpu.y + cpu.height > can.height) {
        cpu.y = can.height - cpu.height;
    }
}

function moveBall() {
    ball.x += ball.velX;
    ball.y += ball.velY;

    // Wall collision (top and bottom)
    if (ball.y + ball.radius > can.height || ball.y - ball.radius < 0) {
        ball.velY *= -1;
    }

    // Paddle collision
    if (ball.x - ball.radius < user.x + user.width && ball.y > user.y && ball.y < user.y + user.height) {
        ball.velX *= -1;
    }
    if (ball.x + ball.radius > cpu.x && ball.y > cpu.y && ball.y < cpu.y + cpu.height) {
        ball.velX *= -1;
    }

    // Score and reset ball if out of bounds
    if (ball.x + ball.radius > can.width) {
        user.score++;
        resetBall();
    }
    if (ball.x - ball.radius < 0) {
        cpu.score++;
        resetBall();
    }
}

function resetBall() {
    ball.x = can.width / 2;
    ball.y = can.height / 2;
    ball.velX = -ball.velX;
    ball.speed = 5;
}

function getMousePosition(event) {
    let rect = can.getBoundingClientRect();
    user.y = event.clientY - rect.top - user.height / 2;
}

// Game loop
function gameLoop() {
    render();
    moveUserPaddle();
    moveCpuPaddle();
    moveBall();
    requestAnimationFrame(gameLoop);
}

// Initial call to start the game loop
gameLoop();









