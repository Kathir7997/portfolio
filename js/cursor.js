// js/cursor.js
const cursor = document.getElementById('custom-cursor');

function initCursor() {
    // Disable on mobile/touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }

    // Follow mouse
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cyber-btn, .project-pod, .glass-panel, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Ensure dynamically added elements get cursor events
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            initCursor(); // Rebind
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

window.CustomCursor = { init: initCursor };
