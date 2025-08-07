// Game Variables
let gameActive = false;
let gameTimer;
let gameScore = { gerberas: 0, tulips: 0 };
let gameTimeLeft = 60;

function startGame() {
    gameActive = true;
    gameScore = { gerberas: 0, tulips: 0 };
    gameTimeLeft = 60;
    updateGameStats();
    
    // Clear garden
    document.getElementById('garden').innerHTML = '';
    
    // Start spawning flowers
    spawnFlowers();
    
    // Start timer
    gameTimer = setInterval(() => {
        gameTimeLeft--;
        updateGameStats();
        
        if (gameTimeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function spawnFlowers() {
    if (!gameActive) return;
    
    const garden = document.getElementById('garden');
    const flowerTypes = ['gerbera', 'tulip'];
    const flowerEmojis = { gerbera: '🌼', tulip: '🌷' };
    
    // Spawn 1-3 flowers
    const flowerCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < flowerCount; i++) {
        const flower = document.createElement('div');
        const type = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        
        flower.className = `flower ${type}`;
        flower.innerHTML = flowerEmojis[type];
        flower.style.left = Math.random() * (garden.offsetWidth - 50) + 'px';
        flower.style.top = Math.random() * (garden.offsetHeight - 50) + 'px';
        flower.style.animationDelay = Math.random() * 2 + 's';
        
        flower.addEventListener('click', () => collectFlower(flower, type));
        
        garden.appendChild(flower);
        
        // Remove flower after 5 seconds if not collected
        setTimeout(() => {
            if (flower.parentNode) {
                flower.remove();
            }
        }, 5000);
    }
    
    // Schedule next spawn
    setTimeout(spawnFlowers, Math.random() * 2000 + 1000);
}

function collectFlower(flower, type) {
    if (!gameActive) return;
    
    flower.classList.add('collected');
    gameScore[type + 's']++;
    updateGameStats();
    
    // Save score to localStorage for celebration page
    localStorage.setItem('flowerScore', JSON.stringify(gameScore));
    
    setTimeout(() => {
        if (flower.parentNode) {
            flower.remove();
        }
    }, 500);
}

function updateGameStats() {
    document.getElementById('gerberaCount').textContent = gameScore.gerberas;
    document.getElementById('tulipCount').textContent = gameScore.tulips;
    document.getElementById('gameTime').textContent = gameTimeLeft;
    
    const progress = ((60 - gameTimeLeft) / 60) * 100;
    document.getElementById('gameProgress').style.width = progress + '%';
}

function endGame() {
    gameActive = false;
    clearInterval(gameTimer);
    
    // Clear remaining flowers
    document.getElementById('garden').innerHTML = '';
    
    // Save score to localStorage for celebration page
    localStorage.setItem('flowerScore', JSON.stringify(gameScore));
    
    // Show game completion message
    const totalFlowers = gameScore.gerberas + gameScore.tulips;
    let message = `Game Over! You collected ${totalFlowers} flowers!`;
    
    if (totalFlowers >= 20) {
        message += " 🌟 Amazing! You're a flower collection master!";
    } else if (totalFlowers >= 10) {
        message += " 🌸 Great job! You have a green thumb!";
    } else {
        message += " 🌱 Good effort! Keep practicing!";
    }
    
    // Create custom alert
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b9d, #c44569);
        color: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 1000;
        text-align: center;
        font-size: 1.2rem;
        max-width: 400px;
    `;
    alertDiv.innerHTML = `
        <h3>🎮 Game Complete!</h3>
        <p>${message}</p>
        <button onclick="this.parentElement.remove()" style="
            background: white;
            color: #ff6b9d;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            margin-top: 15px;
            cursor: pointer;
            font-weight: bold;
        ">Continue</button>
    `;
    document.body.appendChild(alertDiv);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Auto-start a gentle game
    setTimeout(() => {
        if (!gameActive) {
            startGame();
        }
    }, 1000);
});