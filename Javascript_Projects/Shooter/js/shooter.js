const canvas = $('canvas').get(0);
const ctx = canvas.getContext('2d');

const scoreElement = $('#score');
const gameBoard = $('#game-board');
const scoreLabel = $('#score');
const displayScore = $('.start-game__display-score');
const restartBtn = $('#restart_btn');
const startBtn = $('#start-btn');
const startScreen = $('#start-screen');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Creating the player
class Player {
    constructor(xcor, ycor, radius, color) {
        this.x = xcor,
        this.y = ycor,
        this.radius = radius,
        this.color = color
        this.velocity = {
            x: 0,
            y: 0
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();

        const friction = 0.99;
        this.velocity.x *= friction;
        this.velocity.y *= friction;

        if (
            this.x + this.radius + this.velocity.x <= canvas.width &&
            this.x - this.radius + this.velocity.x >= 0
        ) {
            this.x += this.velocity.x;
        } else {
            this.velocity.x = 0;
        }


        if (
            this.y + this.radius + this.velocity.y <= canvas.height &&
            this.y - this.radius + this.velocity.y >= 0
        ) {
            this.y += this.velocity.y;
        } else {
            this.velocity.y = 0;
        }

        // this.x += this.velocity.x;
        // this.y += this.velocity.y;
    }
}

// Creating the Projectile
class Projectile {
    constructor(xcor, ycor, radius, color, velocity) {
        this.x = xcor,
            this.y = ycor,
            this.radius = radius,
            this.color = color,
            this.velocity = velocity

    }


    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

class Enemy {
    constructor(xcor, ycor, radius, color, velocity) {
        this.x = xcor,
        this.y = ycor,
        this.radius = radius,
        this.color = color,
        this.velocity = velocity
        this.type = 'Linear'

        if (Math.random() < 0.5) {
            this.type = 'Homing';
        }

    }


    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.draw();
        if (this.type === 'Homing') {
            const angle = Math.atan2(player.y - this.y, player.x - this.x);
            this.velocity.x = Math.cos(angle);
            this.velocity.y = Math.sin(angle);
        }
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

const x = canvas.width / 2;
const y = canvas.height / 2;


// const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', { x : 1, y : 1});



let player = new Player(x, y, 15, 'white');
let projectiles = [];
let enemies = [];
let animationId // Stores the current animated frame
let intervalId
let score = 0;

function init() {
    player = new Player(x, y, 15, 'white');
    projectiles = [];
    enemies = [];
    animationId // Stores the current animated frame
    score = 0;
    scoreElement.text('Score: 0');
}

function spawnEnemies() {
    intervalId = setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4;
        let x;
        let y;
        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
            y = Math.random() * canvas.height;
        } else {
            x = Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        }

        const randomColor = Math.random() * 360
        const color = `hsl(${randomColor}, 50%, 50%)`;
        const angle = Math.atan2(canvas.height / 2 - y,
            canvas.width / 2 - x);
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity));
    }, 1000);
}


function animate() {
    animationId = requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();

    for (let index = projectiles.length - 1; index > 0; index--) {
        const projectile = projectiles[index];


        projectile.update();

        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {

            projectiles.splice(index, 1);

        }
    }

    for (let enemyIndex = enemies.length - 1; enemyIndex > 0; enemyIndex--) {
        const enemy = enemies[enemyIndex];


        enemy.update();

        const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if (dist - player.radius - enemy.radius < 1) {
            clearInterval(intervalId);
            cancelAnimationFrame(animationId);
            gameBoard.css('display', 'block');
            gsap.fromTo('#game-board', { scale: 0.8, opacity: 0 }, {
                scale: 1,
                opacity: 1,
                ease: 'expo',
            });
            scoreLabel.css('display', 'none');
            displayScore.text(`${score}`);


        }
        for (let projectileIndex = projectiles.length - 1; projectileIndex > 0; projectileIndex--) {

            const projectile = projectiles[projectileIndex];

            const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);

            if (dist - projectile.radius - enemy.radius < 1) {
                if (enemy.radius - 10 > 5) {
                    score += 100;
                    scoreElement.text(`Score: ${score}`);
                    gsap.to(enemy, {
                        radius: enemy.radius - 10
                    })

                    projectiles.splice(projectileIndex, 1);


                } else {
                    score += 150;
                    scoreElement.text(`Score: ${score}`);

                    enemies.splice(enemyIndex, 1);
                    projectiles.splice(projectileIndex, 1);

                }
            }
        }

    }

}

addEventListener('click', (event) => {

    const angle = Math.atan2(event.clientY - player.y,
        event.clientX - player.x);
    const velocity = {
        x: Math.cos(angle) * 5,
        y: Math.sin(angle) * 5
    }
    projectiles.push(new Projectile(player.x, player.y, 5, 'white', velocity));
});

restartBtn.click(() => {
    init();
    animate();
    spawnEnemies();
    gsap.to('#game-board', {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: 'expo.in',
        onComplete: () => {
            gameBoard.css('display', 'none');
            scoreLabel.css('display', 'block');
        }
    });
});

startBtn.click(() => {
    init();
    animate();
    spawnEnemies();
    gsap.to('#start-screen', {
        opacity: 0,
        scale: 0.8,
        duration: 0.2,
        ease: 'expo.in',
        onComplete: () => {
            startScreen.css('display', 'none');

        }
    });
});

$(window).keydown((event) => {
    switch (event.key) {
        case 'd':
            player.velocity.x += 1;
            break;
        case 'a':
            player.velocity.x -= 1;
            break;
        case 'w':
            player.velocity.y -= 1;
            break;
        case 's':
            player.velocity.y += 1;
            break;
    }
});

