// js/particles.js
const pCanvas = document.getElementById('particles-canvas');
const pCtx = pCanvas.getContext('2d');

let pWidth, pHeight;
let particlesArray = [];
let mouse = { x: null, y: null, radius: 150 };

function initParticles() {
    pWidth = pCanvas.width = window.innerWidth;
    pHeight = pCanvas.height = window.innerHeight;
    particlesArray = [];
    
    // Reduce particles on mobile for performance
    const numberOfParticles = (pWidth < 768) ? 40 : 100;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 3) + 1;
        const x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        const y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        const directionX = (Math.random() * 1) - 0.5;
        const directionY = (Math.random() * 1) - 0.5;
        const color = Math.random() > 0.5 ? '#00FF88' : '#00E5FF';
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    
    draw() {
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        pCtx.fillStyle = this.color;
        pCtx.fill();
        pCtx.shadowBlur = 10;
        pCtx.shadowColor = this.color;
    }
    
    update() {
        if (this.x > pWidth || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > pHeight || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        // Mouse interaction
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < mouse.radius) {
            if (mouse.x < this.x && this.x < pWidth - this.size * 10) {
                this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 2;
            }
            if (mouse.y < this.y && this.y < pHeight - this.size * 10) {
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 2;
            }
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
        
        this.draw();
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (pWidth/7) * (pHeight/7)) {
                opacityValue = 1 - (distance/20000);
                pCtx.strokeStyle = `rgba(0, 255, 136, ${opacityValue})`;
                pCtx.lineWidth = 1;
                pCtx.beginPath();
                pCtx.moveTo(particlesArray[a].x, particlesArray[a].y);
                pCtx.lineTo(particlesArray[b].x, particlesArray[b].y);
                pCtx.stroke();
            }
        }
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    pCtx.clearRect(0, 0, pWidth, pHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', () => {
    initParticles();
});

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

// Expose
window.Particles = {
    init: () => {
        initParticles();
        animateParticles();
    }
};
