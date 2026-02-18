const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gecko = {
    x: 200,
    y: 250,
    health: 100,
    hunger: 50,
    hydration: 80,
    calcium: 70,
    stress: 20,
    temperature: 88,
    shedding: false,
    weight: 50
};

let day = 1;

function drawGecko() {
    ctx.fillStyle = "orange";
    ctx.fillRect(gecko.x, gecko.y, 80, 30);
}

function drawStats() {
    ctx.fillStyle = "white";
    ctx.fillText("Day: " + day, 10, 20);
    ctx.fillText("Health: " + gecko.health, 10, 40);
    ctx.fillText("Hunger: " + gecko.hunger, 10, 60);
    ctx.fillText("Hydration: " + gecko.hydration, 10, 80);
    ctx.fillText("Calcium: " + gecko.calcium, 10, 100);
    ctx.fillText("Temp: " + gecko.temperature + "°F", 10, 120);
}

function update() {
    gecko.hunger += 0.05;
    gecko.hydration -= 0.03;
    gecko.calcium -= 0.02;

    if (gecko.temperature < 75 || gecko.temperature > 95) {
        gecko.health -= 0.1;
    }

    if (gecko.hunger > 80) {
        gecko.health -= 0.2;
    }

    if (gecko.hydration < 40) {
        gecko.health -= 0.2;
    }

    if (gecko.calcium < 30) {
        gecko.health -= 0.3;
    }

    if (gecko.health <= 0) {
        alert("Your gecko has died.");
        resetGame();
    }
}

function feed() {
    gecko.hunger -= 20;
    gecko.weight += 1;
}

function addCalcium() {
    gecko.calcium += 20;
}

function adjustHeat(amount) {
    gecko.temperature += amount;
}

function mist() {
    gecko.hydration += 15;
}

function resetGame() {
    gecko.health = 100;
    gecko.hunger = 50;
    gecko.hydration = 80;
    gecko.calcium = 70;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGecko();
    drawStats();
    update();
    requestAnimationFrame(gameLoop);
}

setInterval(() => {
    day++;
    if (day % 7 === 0) {
        gecko.shedding = true;
        gecko.hydration -= 10;
    }
}, 5000);

gameLoop();
