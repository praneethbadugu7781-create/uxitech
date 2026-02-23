/* ========================================
   UXI — Admin Panel JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    AdminPanel.init();
});

const AdminPanel = {
    works: [],
    
    init() {
        this.cacheElements();
        this.bindEvents();
        this.checkAuth();
    },
    
    cacheElements() {
        // Sections
        this.loginSection = document.getElementById('loginSection');
        this.dashboardSection = document.getElementById('dashboardSection');
        
        // Forms
        this.loginForm = document.getElementById('loginForm');
        this.addWorkForm = document.getElementById('addWorkForm');
        this.editWorkForm = document.getElementById('editWorkForm');
        
        // Buttons
        this.logoutBtn = document.getElementById('logoutBtn');
        this.refreshWorksBtn = document.getElementById('refreshWorksBtn');
        
        // Lists & Containers
        this.worksList = document.getElementById('worksList');
        this.toastContainer = document.getElementById('toastContainer');
        
        // Stats
        this.totalWorksEl = document.getElementById('totalWorks');
        this.webDesignCountEl = document.getElementById('webDesignCount');
        this.businessCountEl = document.getElementById('businessCount');
        this.educationCountEl = document.getElementById('educationCount');
        
        // Modals
        this.editModal = document.getElementById('editModal');
        this.deleteModal = document.getElementById('deleteModal');
        
        // Error displays
        this.loginError = document.getElementById('loginError');
    },
    
    bindEvents() {
        // Login form
        this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        
        // Logout button
        this.logoutBtn.addEventListener('click', () => this.handleLogout());
        
        // Add work form
        this.addWorkForm.addEventListener('submit', (e) => this.handleAddWork(e));
        
        // Edit work form
        this.editWorkForm.addEventListener('submit', (e) => this.handleEditWork(e));
        
        // Refresh works
        this.refreshWorksBtn.addEventListener('click', () => this.loadWorks());
        
        // Modal close buttons
        document.getElementById('closeModal').addEventListener('click', () => this.closeEditModal());
        document.getElementById('modalBackdrop').addEventListener('click', () => this.closeEditModal());
        document.getElementById('cancelEditBtn').addEventListener('click', () => this.closeEditModal());
        
        document.getElementById('closeDeleteModal').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('deleteBackdrop').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('cancelDeleteBtn').addEventListener('click', () => this.closeDeleteModal());
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => this.confirmDelete());
    },
    
    checkAuth() {
        onAuthStateChanged((user) => {
            if (user) {
                this.showDashboard();
                this.loadWorks();
            } else {
                this.showLogin();
            }
        });
    },
    
    showLogin() {
        this.loginSection.style.display = 'flex';
        this.dashboardSection.style.display = 'none';
    },
    
    showDashboard() {
        this.loginSection.style.display = 'none';
        this.dashboardSection.style.display = 'block';
    },
    
    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginBtn = document.getElementById('loginBtn');
        
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<span class="btn-text">Signing in...</span>';
        
        const result = await signIn(email, password);
        
        if (result.success) {
            this.loginError.textContent = '';
            this.showToast('Welcome back!', 'success');
        } else {
            this.loginError.textContent = result.error;
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<span class="btn-text">Sign In</span>';
        }
    },
    
    async handleLogout() {
        const result = await signOut();
        if (result.success) {
            this.showToast('Logged out successfully', 'success');
        }
    },
    
    async loadWorks() {
        this.worksList.innerHTML = '<div class="loading-state">Loading works...</div>';
        
        this.works = await getAllWorks();
        this.updateStats();
        this.renderWorksList();
    },
    
    updateStats() {
        this.totalWorksEl.textContent = this.works.length;
        this.webDesignCountEl.textContent = this.works.filter(w => w.category === 'web').length;
        this.businessCountEl.textContent = this.works.filter(w => w.category === 'business').length;
        this.educationCountEl.textContent = this.works.filter(w => w.category === 'education').length;
    },
    
    renderWorksList() {
        if (this.works.length === 0) {
            this.worksList.innerHTML = '<div class="empty-state">No works added yet. Add your first project above!</div>';
            return;
        }
        
        const html = this.works.map(work => `
            <div class="work-item" data-id="${work.id}">
                <div class="work-info">
                    <h4 class="work-title">${work.title}</h4>
                    <span class="work-category category-${work.category}">${this.getCategoryLabel(work.category)}</span>
                    <a href="${work.link}" class="work-link" target="_blank">${work.link}</a>
                </div>
                <div class="work-actions">
                    <button class="btn btn-sm btn-outline edit-btn" data-id="${work.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${work.id}" data-title="${work.title}">Delete</button>
                </div>
            </div>
        `).join('');
        
        this.worksList.innerHTML = html;
        
        // Bind edit buttons
        this.worksList.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => this.openEditModal(btn.dataset.id));
        });
        
        // Bind delete buttons
        this.worksList.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => this.openDeleteModal(btn.dataset.id, btn.dataset.title));
        });
    },
    
    getCategoryLabel(category) {
        const labels = {
            'web': 'Web Design',
            'business': 'Business',
            'education': 'Education',
            'entertainment': 'Entertainment'
        };
        return labels[category] || category;
    },
    
    async handleAddWork(e) {
        e.preventDefault();
        
        const addBtn = document.getElementById('addWorkBtn');
        addBtn.disabled = true;
        addBtn.innerHTML = '<span class="btn-text">Adding...</span>';
        
        const workData = {
            title: document.getElementById('workTitle').value.trim(),
            link: document.getElementById('workLink').value.trim(),
            category: document.getElementById('workCategory').value,
            type: document.getElementById('workType').value.trim() || `${this.getCategoryLabel(document.getElementById('workCategory').value)} • Website`,
            year: document.getElementById('workYear').value || '2026',
            metaType: document.getElementById('workMeta').value.trim() || 'Website',
            description: document.getElementById('workDescription').value.trim(),
            visual: document.getElementById('workVisual').value,
            gradient: document.getElementById('workGradient').value
        };
        
        const result = await addWork(workData);
        
        if (result.success) {
            this.showToast('Work added successfully!', 'success');
            this.addWorkForm.reset();
            document.getElementById('workYear').value = '2026';
            this.loadWorks();
        } else {
            this.showToast('Error adding work: ' + result.error, 'error');
        }
        
        addBtn.disabled = false;
        addBtn.innerHTML = '<span class="btn-text">Add Work</span>';
    },
    
    async openEditModal(workId) {
        const work = this.works.find(w => w.id === workId);
        if (!work) return;
        
        document.getElementById('editWorkId').value = work.id;
        document.getElementById('editTitle').value = work.title;
        document.getElementById('editLink').value = work.link;
        document.getElementById('editCategory').value = work.category;
        document.getElementById('editType').value = work.type || '';
        document.getElementById('editYear').value = work.year || '2026';
        document.getElementById('editMeta').value = work.metaType || '';
        document.getElementById('editDescription').value = work.description;
        document.getElementById('editVisual').value = work.visual || 'cube';
        document.getElementById('editGradient').value = work.gradient || '1';
        
        this.editModal.style.display = 'flex';
    },
    
    closeEditModal() {
        this.editModal.style.display = 'none';
    },
    
    async handleEditWork(e) {
        e.preventDefault();
        
        const workId = document.getElementById('editWorkId').value;
        
        const workData = {
            title: document.getElementById('editTitle').value.trim(),
            link: document.getElementById('editLink').value.trim(),
            category: document.getElementById('editCategory').value,
            type: document.getElementById('editType').value.trim(),
            year: document.getElementById('editYear').value,
            metaType: document.getElementById('editMeta').value.trim(),
            description: document.getElementById('editDescription').value.trim(),
            visual: document.getElementById('editVisual').value,
            gradient: document.getElementById('editGradient').value
        };
        
        const result = await updateWork(workId, workData);
        
        if (result.success) {
            this.showToast('Work updated successfully!', 'success');
            this.closeEditModal();
            this.loadWorks();
        } else {
            this.showToast('Error updating work: ' + result.error, 'error');
        }
    },
    
    openDeleteModal(workId, workTitle) {
        document.getElementById('deleteWorkId').value = workId;
        document.getElementById('deleteWorkTitle').textContent = workTitle;
        this.deleteModal.style.display = 'flex';
    },
    
    closeDeleteModal() {
        this.deleteModal.style.display = 'none';
    },
    
    async confirmDelete() {
        const workId = document.getElementById('deleteWorkId').value;
        
        const result = await deleteWork(workId);
        
        if (result.success) {
            this.showToast('Work deleted successfully!', 'success');
            this.closeDeleteModal();
            this.loadWorks();
        } else {
            this.showToast('Error deleting work: ' + result.error, 'error');
        }
    },
    
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <span class="toast-message">${message}</span>
            <button class="toast-close">&times;</button>
        `;
        
        this.toastContainer.appendChild(toast);
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
        
        // Close on click
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.add('toast-exit');
            setTimeout(() => toast.remove(), 300);
        });
    }
};
