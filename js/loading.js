// js/loading.js
const bootSequence = [
    { text: "INITIALIZING KATHIRVEL.SYS...", delay: 200 },
    { text: "LOADING NEURAL NETWORK...", delay: 200 },
    { text: "CONNECTING QUANTUM CORE...", delay: 200 },
    { text: "[OK] Core connected successfully.", delay: 100 },
    { text: "SCANNING VISITOR...", delay: 300 },
    { text: "[WARNING] Unregistered signature detected.", delay: 200, color: "#ff5f56" },
    { text: "Bypassing security protocols...", delay: 300 },
    { text: "ACCESS GRANTED", delay: 200, color: "#27c93f", glow: true }
];

const loaderContainer = document.getElementById('terminal-loader');
const loadingScreen = document.getElementById('loading-screen');

async function typeText(element, text, delay) {
    element.style.opacity = 1;
    let currentText = '';
    
    return new Promise(resolve => {
        let i = 0;
        const interval = setInterval(() => {
            currentText += text.charAt(i);
            element.innerText = currentText + (i < text.length - 1 ? '█' : '');
            i++;
            
            if (i >= text.length) {
                clearInterval(interval);
                element.innerText = currentText; // Remove cursor
                setTimeout(resolve, delay);
            }
        }, 10); // Typing speed
    });
}

async function runBootSequence(onComplete) {
    if (window.MatrixEffect) window.MatrixEffect.start();

    // Create progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-bar-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);
    loaderContainer.appendChild(progressContainer);

    // Let UI render
    await new Promise(r => setTimeout(r, 500));
    progressContainer.style.opacity = 1;

    let progress = 0;
    const updateProgress = setInterval(() => {
        progress += Math.random() * 5;
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
    }, 100);

    for (let i = 0; i < bootSequence.length; i++) {
        const step = bootSequence[i];
        const line = document.createElement('div');
        line.className = 'terminal-line';
        if (step.color) line.style.color = step.color;
        if (step.glow) line.style.textShadow = `0 0 10px ${step.color}`;
        
        // Insert before progress bar
        loaderContainer.insertBefore(line, progressContainer);
        
        await typeText(line, step.text, step.delay);
    }

    clearInterval(updateProgress);
    progressBar.style.width = '100%';

    // Wait a moment after ACCESS GRANTED before transitioning
    await new Promise(r => setTimeout(r, 400));
    
    // Trigger black hole transition
    if (window.BlackHole) {
        window.BlackHole.startTransition(() => {
            // Fade out matrix and loading screen entirely
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1,
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                    if (window.MatrixEffect) window.MatrixEffect.stop();
                    if (onComplete) onComplete();
                }
            });
        });
    } else {
        // Fallback if no blackhole effect
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                loadingScreen.style.display = 'none';
                if (window.MatrixEffect) window.MatrixEffect.stop();
                if (onComplete) onComplete();
            }
        });
    }
}

window.BootSequence = { run: runBootSequence };
