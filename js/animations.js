// js/animations.js
function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn("GSAP not loaded.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Global settings
    ScrollTrigger.defaults({
        toggleActions: "play none none reverse",
    });

    // Animate sections appearing
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        gsap.to(sec, {
            opacity: 1,
            duration: 1,
            scrollTrigger: {
                trigger: sec,
                start: "top 80%",
                toggleClass: "is-visible"
            }
        });
    });

    // About Section
    if (document.querySelector('.about-grid')) {
        gsap.from('.hologram-profile', {
            x: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '#about',
                start: "top 70%"
            }
        });

        gsap.from('.bio-content', {
            x: 100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '#about',
                start: "top 70%"
            }
        });
    }

    // Skills Terminal typing effect triggered on scroll
    if (document.querySelector('#skills')) {
        const skillsContainer = document.getElementById('skills-container');
        if(skillsContainer) {
            // Wait for skills to be injected by main.js
            setTimeout(() => {
                const modules = document.querySelectorAll('.skill-module');
                gsap.from(modules, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '#skills',
                        start: "top 60%"
                    }
                });
                
                // Animate bars
                const bars = document.querySelectorAll('.skill-bar-fill');
                bars.forEach(bar => {
                    gsap.to(bar, {
                        width: bar.getAttribute('data-width'),
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: '#skills',
                            start: "top 50%"
                        }
                    });
                });
            }, 500);
        }
    }

    // Projects (Holographic Pods)
    if (document.querySelector('.projects-grid')) {
        gsap.from('.project-pod', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '#projects',
                start: "top 70%"
            }
        });
    }

    // Experience Timeline
    if (document.querySelector('.timeline')) {
        gsap.from('.timeline-entry', {
            x: index => index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.3,
            scrollTrigger: {
                trigger: '#experience',
                start: "top 60%"
            }
        });
    }

    // Contact
    if (document.querySelector('.contact-container')) {
        gsap.from('.contact-item', {
            x: -50,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
                trigger: '#contact',
                start: "top 70%"
            }
        });
        
        gsap.from('#contact .glass-panel', {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '#contact',
                start: "top 70%"
            }
        });
    }
}

window.Animations = { init: initAnimations };
