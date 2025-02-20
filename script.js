const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    color: 'red',
    speed: 5
};

const obstacles = [];
let score = 0;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    ctx.fillStyle = 'blue';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    moveObstacles();
    checkCollision();
    requestAnimationFrame(update);
}

function moveObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += player.speed;
        if (obstacle.y > canvas.height) {
            obstacle.y = 0;
            obstacle.x = Math.random() * canvas.width;
            score++;
        }
    });
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            alert('Game Over! Score: ' + score);
            document.location.reload();
        }
    });
}

function spawnObstacles() {
    setInterval(() => {
        obstacles.push({
            x: Math.random() * canvas.width,
            y: 0,
            width: 50,
            height: 50
        });
    }, 1000);
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed;
    }
    if (e.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
});

spawnObstacles();
update();