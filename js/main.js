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

    // Contact Form Transmission Logic
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            const btn = document.getElementById('transmit-btn');
            const log = document.getElementById('transmission-log');
            
            if (!name || !email || !message) {
                showLogMessage('[ERROR] FIELD INPUTS INCOMPLETE. CANNOT DISPATCH PAYLOAD.', 'var(--neon-pink)');
                return;
            }
            
            // Disable inputs
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.textContent = 'TRANSMITTING...';
            document.getElementById('contact-name').disabled = true;
            document.getElementById('contact-email').disabled = true;
            document.getElementById('contact-message').disabled = true;
            
            log.style.display = 'block';
            log.innerHTML = '';
            
            const logs = [
                { text: '> SECURING UPLINK CONNECTION...', delay: 300, color: 'var(--electric-cyan)' },
                { text: '> COMPRESSING DATA PAYLOAD...', delay: 600, color: 'var(--electric-cyan)' },
                { text: '> UPLINK ESTABLISHED SUCCESSFULLY [OK]', delay: 900, color: 'var(--neon-green)' },
                { text: '> DISPATCHING TRANSMISSION TO CENTRAL HUB...', delay: 1200, color: 'var(--electric-cyan)' },
                { text: '> SUCCESS: TRANSMISSION COMPLETE.', delay: 1500, color: 'var(--neon-green)' }
            ];
            
            logs.forEach(step => {
                setTimeout(() => {
                    const line = document.createElement('div');
                    line.style.color = step.color;
                    line.textContent = step.text;
                    log.appendChild(line);
                    
                    if (step.text.includes('SUCCESS')) {
                        // Open mail client after a small delay
                        setTimeout(() => {
                            const mailtoUrl = `mailto:kathirveld641659@gmail.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(name)}&body=Sender:%20${encodeURIComponent(name)}%20%3C${encodeURIComponent(email)}%3E%0A%0AMessage:%0A${encodeURIComponent(message)}`;
                            window.location.href = mailtoUrl;
                            
                            // Reset form after transmission
                            setTimeout(() => {
                                btn.disabled = false;
                                btn.style.opacity = '1';
                                btn.textContent = 'Transmit';
                                document.getElementById('contact-name').disabled = false;
                                document.getElementById('contact-email').disabled = false;
                                document.getElementById('contact-message').disabled = false;
                                contactForm.reset();
                                log.style.display = 'none';
                            }, 1000);
                        }, 500);
                    }
                }, step.delay);
            });
            
            function showLogMessage(text, color) {
                log.style.display = 'block';
                log.innerHTML = `<div style="color: ${color}">${text}</div>`;
            }
        });
    }

});
