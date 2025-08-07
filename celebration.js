function updateFinalScreen() {
    // Get flower score from localStorage
    const flowerScore = JSON.parse(localStorage.getItem('flowerScore')) || { gerberas: 0, tulips: 0 };
    document.getElementById('finalGerberas').textContent = flowerScore.gerberas;
    document.getElementById('finalTulips').textContent = flowerScore.tulips;
    
    const totalFlowers = flowerScore.gerberas + flowerScore.tulips;
    const gameMessage = document.getElementById('gameMessage');
    
    if (totalFlowers > 0) {
        gameMessage.textContent = `You collected ${totalFlowers} beautiful flowers in your garden adventure!`;
        gameMessage.style.color = '#28a745';
        gameMessage.style.fontWeight = 'bold';
    }
}

function createConfetti() {
    const colors = ['#ff6b9d', '#a8e6cf', '#ffeaa7', '#74b9ff', '#fd79a8'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 50);
    }
}

function playBirthdayMusic() {
    // Create a simple birthday melody using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const notes = [
        {freq: 261.63, duration: 0.5}, // C
        {freq: 261.63, duration: 0.5}, // C
        {freq: 293.66, duration: 1},   // D
        {freq: 261.63, duration: 1},   // C
        {freq: 349.23, duration: 1},   // F
        {freq: 329.63, duration: 2},   // E
    ];
    
    let currentTime = audioContext.currentTime;
    
    notes.forEach(note => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = note.freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + note.duration);
        
        oscillator.start(currentTime);
        oscillator.stop(currentTime + note.duration);
        
        currentTime += note.duration;
    });
    
    // Show music playing notification
    const musicNote = document.createElement('div');
    musicNote.innerHTML = '🎵 Birthday music playing!';
    musicNote.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #4ecdc4, #44a08d);
        color: white;
        padding: 15px 20px;
        border-radius: 25px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-size: 1.1rem;
        animation: slideIn 0.5s ease-out;
    `;
    document.body.appendChild(musicNote);
    
    setTimeout(() => {
        musicNote.remove();
    }, 3000);
}

function lightCandles() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.classList.add('lit');
    });
    
    // Show notification
    const notification = document.createElement('div');
    notification.innerHTML = '🎉 Make a wish!';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b9d, #c44569);
        color: white;
        padding: 15px 20px;
        border-radius: 25px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        font-size: 1.1rem;
        animation: slideIn 0.5s ease-out;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function popBalloon(balloon) {
    balloon.style.transform = 'scale(0)';
    balloon.style.opacity = '0';
    
    // Create pop effect
    const pop = document.createElement('div');
    pop.innerHTML = '💥';
    pop.style.cssText = `
        position: absolute;
        font-size: 2rem;
        left: ${balloon.offsetLeft}px;
        top: ${balloon.offsetTop}px;
        animation: popEffect 0.5s ease-out forwards;
    `;
    balloon.parentNode.appendChild(pop);
    
    setTimeout(() => {
        pop.remove();
    }, 500);
}

function createBalloons() {
    const colors = ['🎈', '🎈', '🎈', '🎈', '🎈'];
    const balloonColors = ['#ff6b9d', '#74b9ff', '#ffeaa7', '#a8e6cf', '#d63384'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'floating-balloon';
            balloon.innerHTML = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.left = Math.random() * 100 + 'vw';
            balloon.style.bottom = '-50px';
            balloon.style.color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            document.body.appendChild(balloon);
            
            setTimeout(() => {
                balloon.remove();
            }, 5000);
        }, i * 300);
    }
}

// Add slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes popEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateFinalScreen();
    
    // Auto-create some confetti on page load
    setTimeout(() => {
        createConfetti();
    }, 1000);
});