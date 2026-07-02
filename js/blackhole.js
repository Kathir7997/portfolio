// js/blackhole.js
const bhCanvas = document.getElementById('blackhole-canvas');
const bCtx = bhCanvas.getContext('2d');

let bhWidth, bhHeight;
let bhAnimation;
let particles = [];
let portalActive = false;
let transitionPhase = 0; // 0 = idle, 1 = growing, 2 = absorbing, 3 = entering
let portalRadius = 0;
let maxRadius = 0;
let time = 0;

function initBlackHole() {
    bhWidth = bhCanvas.width = window.innerWidth;
    bhHeight = bhCanvas.height = window.innerHeight;
    maxRadius = Math.min(bhWidth, bhHeight) * 1.5; // Enough to cover screen
}

class PortalParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.max(bhWidth, bhHeight) + Math.random() * 500; // Start way outside
        this.speed = Math.random() * 2 + 1;
        this.size = Math.random() * 3 + 1;
        this.color = Math.random() > 0.5 ? '#A855F7' : '#00FF88'; // Purple or Green
    }

    update() {
        if (!portalActive) return;

        // Spiral inwards
        this.radius -= this.speed * (transitionPhase > 1 ? 3 : 1); 
        this.angle += 0.05;

        // Accelerate as it gets closer
        this.speed += 0.05;

        if (this.radius < portalRadius * 0.5) {
            this.reset();
        }
    }

    draw() {
        if (!portalActive) return;

        const x = bhWidth / 2 + Math.cos(this.angle) * this.radius;
        const y = bhHeight / 2 + Math.sin(this.angle) * this.radius;

        bCtx.beginPath();
        bCtx.arc(x, y, this.size, 0, Math.PI * 2);
        bCtx.fillStyle = this.color;
        bCtx.fill();
        bCtx.shadowBlur = 15;
        bCtx.shadowColor = this.color;
    }
}

function drawPortal() {
    bCtx.clearRect(0, 0, bhWidth, bhHeight);
    
    if (!portalActive) return;

    time += 0.05;

    // Draw Event Horizon (Black center)
    bCtx.beginPath();
    bCtx.arc(bhWidth / 2, bhHeight / 2, portalRadius, 0, Math.PI * 2);
    bCtx.fillStyle = '#000';
    bCtx.fill();
    
    // Draw Accretion Disk (Energy rings)
    if (portalRadius > 0) {
        for(let i=0; i<3; i++) {
            bCtx.beginPath();
            // Wobble effect
            const offsetRadius = portalRadius + 20 + i * 30 + Math.sin(time + i) * 20;
            bCtx.ellipse(
                bhWidth / 2, 
                bhHeight / 2, 
                offsetRadius, 
                offsetRadius * 0.4, // squished for perspective
                time * 0.2 + i, // rotation
                0, Math.PI * 2
            );
            bCtx.strokeStyle = i % 2 === 0 ? 'rgba(168, 85, 247, 0.5)' : 'rgba(0, 255, 136, 0.5)';
            bCtx.lineWidth = 5 - i;
            bCtx.shadowBlur = 20;
            bCtx.shadowColor = bCtx.strokeStyle;
            bCtx.stroke();
        }
    }

    // Draw Particles
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    bhAnimation = requestAnimationFrame(drawPortal);
}

function startTransition(onComplete) {
    initBlackHole();
    
    for (let i = 0; i < 200; i++) {
        particles.push(new PortalParticle());
    }

    portalActive = true;
    transitionPhase = 1;
    bhCanvas.style.zIndex = 9999; // Above everything

    drawPortal();

    // GSAP Timeline for cinematic black hole effect
    const tl = gsap.timeline({
        onComplete: () => {
            portalActive = false;
            cancelAnimationFrame(bhAnimation);
            bCtx.clearRect(0, 0, bhWidth, bhHeight);
            bhCanvas.style.zIndex = -1;
            if (onComplete) onComplete();
        }
    });

    // 1. Black hole opens
    tl.to({}, {
        duration: 2,
        onUpdate: function() {
            portalRadius = this.progress() * 150; // Grow to 150px
        }
    });

    // 2. Absorb phase (particles speed up, matrix gets sucked in)
    tl.add(() => { transitionPhase = 2; }, "+=0");
    
    // Suck in the loading screen text
    tl.to('#terminal-loader', {
        scale: 0,
        opacity: 0,
        rotate: 720,
        duration: 1.5,
        ease: "power2.in"
    }, "<");

    // 3. Camera enters black hole (Screen goes black)
    tl.add(() => { transitionPhase = 3; }, "+=0.5");
    tl.to({}, {
        duration: 1.5,
        ease: "power4.in",
        onUpdate: function() {
            portalRadius = 150 + this.progress() * maxRadius;
        }
    });
}

window.addEventListener('resize', () => {
    if (portalActive) initBlackHole();
});

window.BlackHole = { startTransition };
