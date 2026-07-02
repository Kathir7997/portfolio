// js/dyson-sphere.js
// Uses Three.js which must be loaded globally
let scene, camera, renderer, sphere;
const container = document.getElementById('dyson-container');

function initDysonSphere() {
    if (typeof THREE === 'undefined') {
        console.warn("Three.js not loaded yet.");
        return;
    }

    // Scene setup
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30; // Push back to act as background

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // The Sphere
    const geometry = new THREE.IcosahedronGeometry(10, 2);
    
    // Wireframe material (holographic look)
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00FF88, 
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Inner Core (glow)
    const innerGeo = new THREE.IcosahedronGeometry(8, 1);
    const innerMat = new THREE.MeshBasicMaterial({
        color: 0xA855F7,
        transparent: true,
        opacity: 0.1
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerSphere);

    // Particles orbiting
    const particlesGeo = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 40;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMat = new THREE.PointsMaterial({
        size: 0.1,
        color: 0x00E5FF,
        transparent: true,
        opacity: 0.5
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particlesMesh);

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        sphere.rotation.x += 0.001;
        sphere.rotation.y += 0.002;
        
        innerSphere.rotation.x -= 0.002;
        innerSphere.rotation.y -= 0.001;
        
        particlesMesh.rotation.y += 0.0005;

        // Interactive mouse movement (subtle)
        if (window.mouseX) {
            sphere.rotation.x += window.mouseY * 0.0001;
            sphere.rotation.y += window.mouseX * 0.0001;
        }

        renderer.render(scene, camera);
    }

    animate();
}

// Track mouse for subtle 3D interaction
window.addEventListener('mousemove', (event) => {
    window.mouseX = (event.clientX - window.innerWidth / 2);
    window.mouseY = (event.clientY - window.innerHeight / 2);
});

window.addEventListener('resize', () => {
    if(camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

window.DysonSphere = { init: initDysonSphere };
