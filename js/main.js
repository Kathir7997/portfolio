// js/main.js
document.addEventListener('DOMContentLoaded', () => {
    
    // Inject Skills Data
    const skillsData = [
        { name: "React.js", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 85 },
        { name: "MongoDB", level: 80 },
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "HTML5/CSS3", level: 95 },
        { name: "Git & GitHub", level: 85 },
        { name: "Video Editing", level: 80 }
    ];

    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skillsData.forEach(skill => {
            const html = `
                <div class="skill-module">
                    <div class="skill-line">
                        <span>> ${skill.name} Loaded</span>
                        <span>[OK]</span>
                    </div>
                    <div class="skill-bar-bg">
                        <div class="skill-bar-fill" data-width="${skill.level}%"></div>
                    </div>
                </div>
            `;
            skillsContainer.insertAdjacentHTML('beforeend', html);
        });
    }

    // Initialize Cursor (if on desktop)
    if (window.CustomCursor) window.CustomCursor.init();

    // Setup Boot Sequence & App Initialization
    if (window.BootSequence) {
        window.BootSequence.run(() => {
            // This callback runs after the black hole transition finishes
            
            // 1. Show main content
            const mainContent = document.getElementById('main-content');
            mainContent.style.display = 'block';
            
            // 2. Fade in main content & Nav
            gsap.to(mainContent, { opacity: 1, duration: 1 });
            gsap.to('#main-nav', { opacity: 1, top: '20px', duration: 1, delay: 0.5 });
            
            // 3. Initialize background systems
            if (window.DysonSphere) {
                window.DysonSphere.init();
                gsap.to('#dyson-container', { opacity: 1, duration: 2 });
            }
            if (window.Cityscape) window.Cityscape.init();
            if (window.Particles) window.Particles.init();
            
            // 4. Initialize GSAP Scroll animations
            if (window.Animations) window.Animations.init();
        });
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Update active state
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            this.classList.add('active');

            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if(target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: target, offsetY: 0 },
                    ease: "power3.inOut"
                });
            }
        });
    });

    // Highlight nav on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

});
