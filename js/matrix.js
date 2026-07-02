// js/matrix.js
const matrixCanvas = document.getElementById('matrix-canvas');
const mCtx = matrixCanvas.getContext('2d');

let matrixInterval;
let mWidth, mHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const charArray = chars.split('');
const fontSize = 16;
let columns = [];
let drops = [];

function initMatrix() {
    mWidth = matrixCanvas.width = window.innerWidth;
    mHeight = matrixCanvas.height = window.innerHeight;
    
    columns = Math.floor(mWidth / fontSize);
    drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * -100; // Start offscreen
    }
}

function drawMatrix() {
    mCtx.fillStyle = 'rgba(5, 5, 5, 0.1)'; // Fade effect
    mCtx.fillRect(0, 0, mWidth, mHeight);
    
    mCtx.fillStyle = '#0F0'; // Neon Green
    mCtx.font = fontSize + 'px "JetBrains Mono", monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        mCtx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > mHeight && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

function startMatrix() {
    initMatrix();
    matrixInterval = setInterval(drawMatrix, 33); // ~30fps
}

function stopMatrix() {
    clearInterval(matrixInterval);
    mCtx.clearRect(0, 0, mWidth, mHeight);
}

window.addEventListener('resize', () => {
    if (matrixInterval) initMatrix();
});

// Export functions for use in main.js
window.MatrixEffect = { start: startMatrix, stop: stopMatrix };
