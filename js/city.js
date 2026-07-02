// js/city.js
const cityCanvas = document.getElementById('city-canvas');
const cCtx = cityCanvas.getContext('2d');

let cWidth, cHeight;
let buildings = [];
let flyingCars = [];

class Building {
    constructor(x) {
        this.x = x;
        this.width = Math.random() * 60 + 40;
        this.height = Math.random() * (cHeight * 0.7) + (cHeight * 0.2);
        this.y = cHeight - this.height;
        this.color = `rgba(${Math.floor(Math.random()*10)}, ${Math.floor(Math.random()*20)}, ${Math.floor(Math.random()*30)}, 0.8)`;
        this.windows = [];
        
        // Generate windows
        const rows = Math.floor(this.height / 15);
        const cols = Math.floor(this.width / 10);
        for(let r=0; r<rows; r++) {
            for(let c=0; c<cols; c++) {
                if(Math.random() > 0.6) { // 40% chance of light on
                    this.windows.push({
                        x: this.x + c * 10 + 2,
                        y: this.y + r * 15 + 2,
                        color: Math.random() > 0.8 ? '#00FF88' : (Math.random() > 0.5 ? '#00E5FF' : '#A855F7')
                    });
                }
            }
        }
    }

    draw() {
        // Building body
        cCtx.fillStyle = this.color;
        cCtx.fillRect(this.x, this.y, this.width, this.height);
        
        // Windows
        this.windows.forEach(w => {
            if(Math.random() > 0.99) { // Flicker effect
                cCtx.fillStyle = '#000';
            } else {
                cCtx.fillStyle = w.color;
                cCtx.shadowBlur = 5;
                cCtx.shadowColor = w.color;
            }
            cCtx.fillRect(w.x, w.y, 6, 10);
            cCtx.shadowBlur = 0; // Reset
        });
    }
}

class FlyingCar {
    constructor() {
        this.reset();
        this.x = Math.random() * cWidth; // Start random x
    }

    reset() {
        this.y = Math.random() * (cHeight * 0.6);
        this.x = Math.random() > 0.5 ? -10 : cWidth + 10;
        this.speed = (Math.random() * 3 + 2) * (this.x < 0 ? 1 : -1);
        this.color = Math.random() > 0.5 ? '#00E5FF' : '#ff5f56';
    }

    update() {
        this.x += this.speed;
        if (this.speed > 0 && this.x > cWidth + 50) this.reset();
        if (this.speed < 0 && this.x < -50) this.reset();
    }

    draw() {
        cCtx.fillStyle = '#fff';
        cCtx.fillRect(this.x, this.y, 15, 3);
        
        // Light trail
        cCtx.beginPath();
        cCtx.moveTo(this.x + (this.speed > 0 ? 0 : 15), this.y + 1);
        cCtx.lineTo(this.x - this.speed * 10, this.y + 1);
        cCtx.strokeStyle = this.color;
        cCtx.lineWidth = 2;
        cCtx.shadowBlur = 10;
        cCtx.shadowColor = this.color;
        cCtx.stroke();
        cCtx.shadowBlur = 0;
    }
}

function initCity() {
    cWidth = cityCanvas.width = window.innerWidth;
    cHeight = cityCanvas.height = window.innerHeight;
    
    buildings = [];
    let currentX = 0;
    while(currentX < cWidth) {
        let b = new Building(currentX);
        buildings.push(b);
        currentX += b.width + Math.random() * 10;
    }

    flyingCars = [];
    for(let i=0; i<15; i++) {
        flyingCars.push(new FlyingCar());
    }
}

function drawCity() {
    // Atmospheric gradient
    let gradient = cCtx.createLinearGradient(0, 0, 0, cHeight);
    gradient.addColorStop(0, '#020205');
    gradient.addColorStop(1, '#0a1526');
    cCtx.fillStyle = gradient;
    cCtx.fillRect(0, 0, cWidth, cHeight);

    // Draw Buildings
    buildings.forEach(b => b.draw());
    
    // Fog overlay
    cCtx.fillStyle = 'rgba(11, 15, 20, 0.4)';
    cCtx.fillRect(0, cHeight*0.4, cWidth, cHeight*0.6);

    // Draw Cars
    flyingCars.forEach(c => {
        c.update();
        c.draw();
    });

    requestAnimationFrame(drawCity);
}

window.addEventListener('resize', initCity);

window.Cityscape = {
    init: () => {
        initCity();
        drawCity();
    }
};
