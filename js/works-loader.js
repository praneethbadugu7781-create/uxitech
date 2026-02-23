/* ========================================
   UXI — Dynamic Works Loader
   Loads works from Firebase for public display
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    WorksLoader.init();
});

const WorksLoader = {
    portfolioGrid: null,
    filterBtns: null,
    allWorks: [],
    
    init() {
        this.portfolioGrid = document.getElementById('dynamicPortfolioGrid');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        
        if (this.portfolioGrid) {
            this.loadWorks();
            this.bindFilters();
        }
    },
    
    async loadWorks() {
        try {
            // Show loading state
            this.portfolioGrid.innerHTML = '<div class="loading-works">Loading projects...</div>';
            
            // Fetch works from Firebase
            this.allWorks = await getAllWorks();
            
            if (this.allWorks.length === 0) {
                // If no works in Firebase, keep static content (fallback)
                this.portfolioGrid.innerHTML = '<div class="no-works">No projects available.</div>';
                return;
            }
            
            // Render works
            this.renderWorks(this.allWorks);
            
            // Re-initialize reveal animations
            this.initRevealAnimations();
            
        } catch (error) {
            console.error('Error loading works:', error);
            // Keep existing static content on error
        }
    },
    
    renderWorks(works) {
        const html = works.map((work, index) => this.createWorkCard(work, index)).join('');
        this.portfolioGrid.innerHTML = html;
    },
    
    createWorkCard(work, index) {
        const visualHTML = this.getVisualHTML(work.visual || 'cube');
        const gradientClass = `gradient-${work.gradient || ((index % 6) + 1)}`;
        const patternClass = `pattern-${((index % 3) + 1)}`;
        
        return `
            <article class="portfolio-item" data-category="${work.category}" data-reveal>
                <a href="${work.link}" target="_blank" rel="noopener" class="portfolio-card-link">
                    <div class="portfolio-card">
                        <div class="portfolio-visual">
                            <div class="portfolio-gradient ${gradientClass}"></div>
                            <div class="portfolio-3d">
                                ${visualHTML}
                            </div>
                            <div class="portfolio-pattern ${patternClass}"></div>
                        </div>
                        <div class="portfolio-overlay">
                            <div class="portfolio-info">
                                <span class="portfolio-category">${work.type || work.category}</span>
                                <h3 class="portfolio-title">${work.title}</h3>
                                <p class="portfolio-desc">${work.description}</p>
                                <div class="portfolio-meta">
                                    <span class="meta-item">${work.year || '2026'}</span>
                                    <span class="meta-divider">•</span>
                                    <span class="meta-item">${work.metaType || 'Website'}</span>
                                </div>
                                <span class="portfolio-link">View Project</span>
                            </div>
                        </div>
                        <div class="portfolio-glow"></div>
                    </div>
                </a>
            </article>
        `;
    },
    
    getVisualHTML(visual) {
        switch (visual) {
            case 'sphere':
                return `
                    <div class="floating-sphere-wrap">
                        <div class="sphere-outer"></div>
                        <div class="sphere-inner"></div>
                    </div>
                `;
            case 'ring':
                return `
                    <div class="floating-ring-wrap">
                        <div class="ring ring-1"></div>
                        <div class="ring ring-2"></div>
                        <div class="ring ring-3"></div>
                    </div>
                `;
            case 'cube':
            default:
                return `
                    <div class="floating-cube">
                        <div class="cube-face front"></div>
                        <div class="cube-face back"></div>
                        <div class="cube-face top"></div>
                        <div class="cube-face bottom"></div>
                        <div class="cube-face left"></div>
                        <div class="cube-face right"></div>
                    </div>
                `;
        }
    },
    
    bindFilters() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter works
                const filter = btn.dataset.filter;
                this.filterWorks(filter);
            });
        });
    },
    
    filterWorks(category) {
        const items = this.portfolioGrid.querySelectorAll('.portfolio-item');
        
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = '';
                item.classList.add('revealed');
            } else {
                item.style.display = 'none';
            }
        });
    },
    
    initRevealAnimations() {
        const items = this.portfolioGrid.querySelectorAll('[data-reveal]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        items.forEach(item => observer.observe(item));
    }
};
