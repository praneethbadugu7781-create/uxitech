/* ========================================
   UXI — Main JavaScript
   Multi-page Premium Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Navigation.init();
    MobileMenu.init();
    ScrollReveal.init();
    ParallaxEffect.init();
    ContactForm.init();
    SmoothScroll.init();
    PortfolioFilter.init();
});

/* ----------------------------------------
   Navigation
   ---------------------------------------- */
const Navigation = {
    nav: null,
    lastScroll: 0,
    
    init() {
        this.nav = document.getElementById('nav');
        if (!this.nav) return;
        
        this.bindEvents();
        this.handleScroll(); // Initial check
    },
    
    bindEvents() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    },
    
    handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
        
        this.lastScroll = currentScroll;
    }
};

/* ----------------------------------------
   Mobile Menu
   ---------------------------------------- */
const MobileMenu = {
    toggle: null,
    menu: null,
    
    init() {
        this.toggle = document.getElementById('navToggle');
        this.menu = document.getElementById('mobileMenu');
        
        if (!this.toggle || !this.menu) return;
        
        this.bindEvents();
    },
    
    bindEvents() {
        this.toggle.addEventListener('click', () => this.toggleMenu());
        
        // Close on link click
        const links = this.menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMenu();
        });
    },
    
    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.menu.classList.toggle('active');
        document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
    },
    
    closeMenu() {
        this.toggle.classList.remove('active');
        this.menu.classList.remove('active');
        document.body.style.overflow = '';
    }
};

/* ----------------------------------------
   Scroll Reveal Animation
   ---------------------------------------- */
const ScrollReveal = {
    elements: [],
    
    init() {
        this.elements = document.querySelectorAll('[data-reveal]');
        if (!this.elements.length) return;
        
        const observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            {
                root: null,
                rootMargin: '0px 0px -80px 0px',
                threshold: 0.1
            }
        );
        
        this.elements.forEach(el => observer.observe(el));
    },
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }
};

/* ----------------------------------------
   Parallax Effect
   ---------------------------------------- */
const ParallaxEffect = {
    elements: [],
    
    init() {
        this.elements = document.querySelectorAll('[data-parallax]');
        if (!this.elements.length) return;
        
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        this.handleScroll();
    },
    
    handleScroll() {
        const scrollY = window.pageYOffset;
        
        this.elements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.1;
            const rect = el.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const viewportHeight = window.innerHeight;
            
            if (scrollY + viewportHeight > elementTop && scrollY < elementTop + rect.height + viewportHeight) {
                const offset = (scrollY - elementTop + viewportHeight) * speed;
                el.style.transform = `translateY(${offset}px)`;
            }
        });
    }
};

/* ----------------------------------------
   Contact Form Handler
   ---------------------------------------- */
const ContactForm = {
    form: null,
    submitBtn: null,
    successMessage: null,
    
    init() {
        this.form = document.getElementById('contactForm');
        this.successMessage = document.getElementById('formSuccess');
        this.resetBtn = document.getElementById('resetForm');
        
        if (!this.form) return;
        
        this.submitBtn = this.form.querySelector('.btn-submit');
        this.bindEvents();
    },
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => this.resetForm());
        }
        
        // Input focus effects
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    },
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) return;
        
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            await this.sendEmail(data);
            
            this.submitBtn.classList.remove('loading');
            this.submitBtn.classList.add('success');
            
            setTimeout(() => {
                this.form.style.display = 'none';
                this.successMessage.classList.add('show');
            }, 1000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
            alert('There was an error sending your message. Please try again or email us directly at uxitech.in@gmail.com');
        }
    },
    
    validateForm() {
        const inputs = this.form.querySelectorAll('[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            const group = input.closest('.form-group');
            
            if (!input.value.trim()) {
                isValid = false;
                group?.classList.add('error');
            } else {
                group?.classList.remove('error');
            }
            
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    group?.classList.add('error');
                }
            }
        });
        
        return isValid;
    },
    
    async sendEmail(data) {
        // Web3Forms - sends email directly to uxitech.in@gmail.com
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: '109ad77f-c469-4947-b0f4-b12cc9741bc9',
                subject: `New Booking Request - ${data.service || 'General'}`,
                from_name: 'UXI Website Contact Form',
                name: data.name,
                email: data.email,
                company: data.company || 'Not provided',
                service: data.service,
                budget: data.budget || 'Not specified',
                message: data.message,
                botcheck: ''
            })
        });
        
        const result = await response.json();
        
        if (!result.success) {
            throw new Error(result.message || 'Form submission failed');
        }
        
        return result;
    },
    
    resetForm() {
        this.form.reset();
        this.form.style.display = 'flex';
        this.successMessage.classList.remove('show');
        this.submitBtn.classList.remove('success');
        this.submitBtn.disabled = false;
    }
};

/* ----------------------------------------
   Smooth Scroll
   ---------------------------------------- */
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleClick(e, anchor));
        });
    },
    
    handleClick(e, anchor) {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

/* ----------------------------------------
   Portfolio Filter
   ---------------------------------------- */
const PortfolioFilter = {
    buttons: null,
    items: null,
    
    init() {
        this.buttons = document.querySelectorAll('.filter-btn');
        this.items = document.querySelectorAll('.portfolio-item');
        
        if (!this.buttons.length || !this.items.length) return;
        
        this.bindEvents();
    },
    
    bindEvents() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => this.filter(btn));
        });
    },
    
    filter(activeBtn) {
        const filter = activeBtn.dataset.filter;
        
        // Update active state
        this.buttons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
        
        // Filter items
        this.items.forEach(item => {
            const category = item.dataset.category;
            
            if (filter === 'all' || category === filter) {
                item.style.display = '';
                item.classList.add('revealed');
            } else {
                item.style.display = 'none';
            }
        });
    }
};

/* ----------------------------------------
   Performance Utilities
   ---------------------------------------- */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/* ----------------------------------------
   Preload & Performance
   ---------------------------------------- */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    if ('fonts' in document) {
        document.fonts.ready.then(() => {
            document.body.classList.add('fonts-loaded');
        });
    }
});

/* ----------------------------------------
   Intersection Observer Polyfill Check
   ---------------------------------------- */
if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach(el => {
        el.classList.add('revealed');
    });
}

/* ----------------------------------------
   Service Worker Registration (Optional)
   ---------------------------------------- */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js');
    });
}
