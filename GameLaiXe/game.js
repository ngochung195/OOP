const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const keys = {};
let score = 0;
let gameOver = false;

window.addEventListener("keydown", function (e) {
    if (["Control", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
    }
    keys[e.key] = true;
});

window.addEventListener("keyup", function (e) {
    keys[e.key] = false;
});

// 1. LỚP ĐỐI TƯỢNG GAME (Dùng cho Chướng ngại vật & Phần thưởng)
class GameObject {
    constructor(imageSrc, width, height, isFixed = false) {
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;

        if (isFixed) {
            this.x = 20;
            this.y = 20;
        } else {
            this.randomizePosition();
        }
    }

    randomizePosition() {
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

// 2. LỚP XE (CAR)
class Car {
    constructor(imageSrc, width, height) {
        this.width = width;
        this.height = height;
        this.x = (canvas.width / 2) - (this.width / 2);
        this.y = (canvas.height / 2) - (this.height / 2);
        this.baseSpeed = 1.5;
        this.boostSpeed = 4.5;
        this.speed = this.baseSpeed;
        this.angle = 0;

        this.image = new Image();
        this.image.src = imageSrc;
    }

    update() {
        if (gameOver) return;

        if (keys["Control"]) {
            this.speed = this.boostSpeed;
        } else {
            this.speed = this.baseSpeed;
        }

        if (keys["ArrowLeft"]) this.angle = -Math.PI / 2;
        if (keys["ArrowRight"]) this.angle = Math.PI / 2;
        if (keys["ArrowUp"]) this.angle = 0;
        if (keys["ArrowDown"]) this.angle = Math.PI;

        this.x += Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;

        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width - this.width) this.x = canvas.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y > canvas.height - this.height) this.y = canvas.height - this.height;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

const myCar = new Car('car2.jpg', 40, 70);

const obstacles = [];
const rewards = [];

// Thêm 1 chướng ngại vật cố định ở góc trái theo yêu cầu
obstacles.push(new GameObject('obstacle.png', 40, 40, true));

// Thêm 4 chướng ngại vật ngẫu nhiên khác
for (let i = 0; i < 4; i++) {
    obstacles.push(new GameObject('obstacle.png', 40, 40));
}

// Thêm 5 phần thưởng ngẫu nhiên trên bản đồ
for (let i = 0; i < 5; i++) {
    rewards.push(new GameObject('reward.jpg', 30, 30));
}

// 3. THUẬT TOÁN KIỂM TRA VA CHẠM (AABB)
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
}

// 4. VÒNG LẶP CHÍNH CỦA GAME (GAME LOOP)
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    myCar.update();
    myCar.draw();

    rewards.forEach(reward => {
        reward.draw();
        if (!gameOver && checkCollision(myCar, reward)) {
            score += 10;
            reward.randomizePosition();
        }
    });

    obstacles.forEach(obstacle => {
        obstacle.draw();
        if (!gameOver && checkCollision(myCar, obstacle)) {
            gameOver = true;
        }
    });

    ctx.fillStyle = "green";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Điểm số: " + score, 20, 30);

    if (gameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.textAlign = "center";

        ctx.fillStyle = "red";
        ctx.font = "bold 50px Arial";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 40);

        ctx.fillStyle = "yellow";
        ctx.font = "bold 28px Arial";
        ctx.fillText("Tổng điểm của bạn: " + score, canvas.width / 2, canvas.height / 2 + 20);

        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.fillText("Nhấn F5 để chơi lại", canvas.width / 2, canvas.height / 2 + 80);
    } else {
        requestAnimationFrame(gameLoop);
    }
}

myCar.image.onload = function () {
    gameLoop();
};