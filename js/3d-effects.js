/* ========================================
   UXI — 3D Effects & WebGL
   Three.js Particle System & Animations
   ======================================== */

// Check if Three.js is available
const hasThreeJS = typeof THREE !== 'undefined';

/* ----------------------------------------
   WebGL Particle Background
   ---------------------------------------- */
class ParticleBackground {
    constructor() {
        this.canvas = document.getElementById('webgl-canvas');
        if (!this.canvas || !hasThreeJS) return;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            alpha: true,
            antialias: true 
        });
        
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
    }
    
    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        this.camera.position.z = 50;
        
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    createParticles() {
        const particleCount = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 50;
            
            // Electric blue with variations
            colors[i] = 0 + Math.random() * 0.2;
            colors[i + 1] = 0.4 + Math.random() * 0.2;
            colors[i + 2] = 1;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.onResize());
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    onMouseMove(e) {
        this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.particles) {
            this.particles.rotation.x += 0.0003;
            this.particles.rotation.y += 0.0005;
            
            // Mouse interaction
            this.particles.rotation.x += this.mouseY * 0.0002;
            this.particles.rotation.y += this.mouseX * 0.0002;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

/* ----------------------------------------
   Fallback CSS Particle System
   ---------------------------------------- */
class CSSParticles {
    constructor(container) {
        this.container = container;
        if (!this.container) return;
        
        this.createParticles();
    }
    
    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'css-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: var(--color-accent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: particleFloat ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * -10}s;
            `;
            this.container.appendChild(particle);
        }
    }
}

/* ----------------------------------------
   Advanced Tilt Effect
   ---------------------------------------- */
class TiltEffect3D {
    constructor() {
        this.elements = document.querySelectorAll('[data-tilt], [data-tilt-heavy]');
        if (!this.elements.length) return;
        
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            const isHeavy = el.hasAttribute('data-tilt-heavy');
            const maxTilt = isHeavy ? 15 : 8;
            
            el.addEventListener('mousemove', (e) => this.handleMove(e, el, maxTilt));
            el.addEventListener('mouseleave', () => this.handleLeave(el));
        });
    }
    
    handleMove(e, el, maxTilt) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        
        el.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateZ(10px)
            scale3d(1.02, 1.02, 1.02)
        `;
        
        // Update glow position
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        el.style.setProperty('--mouse-x', `${percentX}%`);
        el.style.setProperty('--mouse-y', `${percentY}%`);
    }
    
    handleLeave(el) {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
    }
}

/* ----------------------------------------
   Magnetic Button Effect
   ---------------------------------------- */
class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.btn-magnetic');
        if (!this.buttons.length) return;
        
        this.init();
    }
    
    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => this.handleMove(e, btn));
            btn.addEventListener('mouseleave', () => this.handleLeave(btn));
        });
    }
    
    handleMove(e, btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        
        const inner = btn.querySelector('.btn-text, span');
        if (inner) {
            inner.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        }
    }
    
    handleLeave(btn) {
        btn.style.transform = 'translate(0, 0)';
        const inner = btn.querySelector('.btn-text, span');
        if (inner) {
            inner.style.transform = 'translate(0, 0)';
        }
    }
}

/* ----------------------------------------
   Advanced Cursor
   ---------------------------------------- */
class AdvancedCursor {
    constructor() {
        this.dot = document.getElementById('cursorDot');
        this.ring = document.getElementById('cursorRing');
        this.glow = document.getElementById('cursorGlow');
        
        if (window.matchMedia('(pointer: coarse)').matches) {
            this.hide();
            return;
        }
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.dotX = 0;
        this.dotY = 0;
        this.ringX = 0;
        this.ringY = 0;
        
        this.init();
    }
    
    hide() {
        if (this.dot) this.dot.style.display = 'none';
        if (this.ring) this.ring.style.display = 'none';
        if (this.glow) this.glow.style.display = 'none';
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Hover states
        const hoverElements = document.querySelectorAll('a, button, [data-tilt], input, textarea, select');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.ring?.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.ring?.classList.remove('hover'));
        });
        
        // Click state
        document.addEventListener('mousedown', () => this.ring?.classList.add('click'));
        document.addEventListener('mouseup', () => this.ring?.classList.remove('click'));
        
        this.animate();
    }
    
    animate() {
        // Dot follows exactly
        this.dotX += (this.mouseX - this.dotX) * 0.5;
        this.dotY += (this.mouseY - this.dotY) * 0.5;
        
        // Ring follows with delay
        this.ringX += (this.mouseX - this.ringX) * 0.15;
        this.ringY += (this.mouseY - this.ringY) * 0.15;
        
        if (this.dot) {
            this.dot.style.left = `${this.dotX}px`;
            this.dot.style.top = `${this.dotY}px`;
        }
        
        if (this.ring) {
            this.ring.style.left = `${this.ringX}px`;
            this.ring.style.top = `${this.ringY}px`;
        }
        
        if (this.glow) {
            this.glow.style.left = `${this.ringX}px`;
            this.glow.style.top = `${this.ringY}px`;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

/* ----------------------------------------
   Page Transitions
   ---------------------------------------- */
class PageTransitions {
    constructor() {
        this.links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto"]):not([href^="tel"])');
        
        // Show page on load
        document.body.classList.add('loading');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
            }, 800);
        });
        
        // Handle link clicks
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e, link));
        });
    }
    
    handleClick(e, link) {
        const href = link.getAttribute('href');
        if (!href || href === window.location.pathname) return;
        
        e.preventDefault();
        
        document.body.classList.remove('loaded');
        document.body.classList.add('loading');
        
        setTimeout(() => {
            window.location.href = href;
        }, 900);
    }
}

/* ----------------------------------------
   Counter Animation
   ---------------------------------------- */
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('[data-count]');
        if (!this.counters.length) return;
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.counters.forEach(counter => observer.observe(counter));
    }
    
    animate(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
}

/* ----------------------------------------
   Initialize 3D Effects
   ---------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    // WebGL Background (only if Three.js is loaded)
    if (hasThreeJS) {
        new ParticleBackground();
    }
    
    // CSS Fallback Particles
    const ctaParticles = document.getElementById('ctaParticles');
    if (ctaParticles) {
        new CSSParticles(ctaParticles);
    }
    
    // Initialize effects
    new TiltEffect3D();
    new MagneticButtons();
    new AdvancedCursor();
    new PageTransitions();
    new CounterAnimation();
});

/* ----------------------------------------
   Add CSS Particle Animation
   ---------------------------------------- */
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
        }
        25% {
            transform: translateY(-30px) translateX(10px);
            opacity: 0.5;
        }
        50% {
            transform: translateY(-60px) translateX(-10px);
            opacity: 0.3;
        }
        75% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);
