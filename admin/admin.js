document.addEventListener('DOMContentLoaded', () => {
    // State
    let projects = [];
    let isEditing = false;

    // DOM Elements
    const projectsContainer = document.getElementById('projectsContainer');
    const searchBox = document.getElementById('searchBox');
    const btnAddProject = document.getElementById('btnAddProject');
    
    // Stats
    const statTotal = document.getElementById('statTotal');
    const statWeb = document.getElementById('statWeb');
    const statBusiness = document.getElementById('statBusiness');
    const statOthers = document.getElementById('statOthers');

    // Modal
    const projectModal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const projectForm = document.getElementById('projectForm');
    const projectIdInput = document.getElementById('projectId');
    const btnModalClose = document.getElementById('btnModalClose');
    const btnCancel = document.getElementById('btnCancel');

    // Publish drawer
    const btnPublishToggle = document.getElementById('btnPublishToggle');
    const publishDrawer = document.getElementById('publishDrawer');
    const btnPublishClose = document.getElementById('btnPublishClose');
    const commitMessage = document.getElementById('commitMessage');
    const btnConfirmPublish = document.getElementById('btnConfirmPublish');
    const terminalLogs = document.getElementById('terminalLogs');
    const logsArea = document.getElementById('logsArea');

    // ----------------------------------------
    // API Calls
    // ----------------------------------------
    async function loadProjects() {
        showLoading();
        try {
            const res = await fetch('/api/projects');
            if (!res.ok) throw new Error('Failed to fetch projects');
            projects = await res.json();
            renderProjects(projects);
            updateStats();
        } catch (err) {
            console.error(err);
            showToast('Error loading projects. Make sure server is running.', 'error');
            projectsContainer.innerHTML = `<div class="empty-state"><p>Error loading projects. Make sure backend server is running.</p></div>`;
        }
    }

    async function saveProject(data, id = null) {
        const url = id ? `/api/projects/${id}` : '/api/projects';
        const method = id ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error('Failed to save project');
            
            showToast(id ? 'Project updated successfully!' : 'Project added successfully!', 'success');
            closeModal();
            loadProjects();
        } catch (err) {
            console.error(err);
            showToast('Error saving project.', 'error');
        }
    }

    async function deleteProject(id) {
        if (!confirm('Are you sure you want to delete this project? This will rebuild work.html immediately.')) return;

        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete project');
            
            showToast('Project deleted successfully!', 'success');
            loadProjects();
        } catch (err) {
            console.error(err);
            showToast('Error deleting project.', 'error');
        }
    }

    async function publishToGit() {
        const msg = commitMessage.value.trim() || 'chore: update portfolio works details from admin panel';
        
        btnConfirmPublish.disabled = true;
        btnConfirmPublish.querySelector('.btn-text').textContent = 'Publishing...';
        btnConfirmPublish.querySelector('.spinner').classList.remove('hidden');
        terminalLogs.classList.remove('hidden');
        logsArea.textContent = 'Staging files, committing and pushing changes...\n';

        try {
            const res = await fetch('/api/git/publish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msg })
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.error || 'Failed to publish');
            }

            logsArea.textContent += `\nSuccess!\nStdout:\n${result.stdout}\n`;
            if (result.stderr) {
                logsArea.textContent += `Stderr:\n${result.stderr}\n`;
            }
            showToast('Published successfully to live repository!', 'success');
            commitMessage.value = '';
        } catch (err) {
            console.error(err);
            logsArea.textContent += `\nError:\n${err.message || err}\n`;
            if (err.details) {
                logsArea.textContent += `Details:\n${err.details}\n`;
            }
            showToast('Failed to publish. Check logs below.', 'error');
        } finally {
            btnConfirmPublish.disabled = false;
            btnConfirmPublish.querySelector('.btn-text').textContent = 'Push Changes Live';
            btnConfirmPublish.querySelector('.spinner').classList.add('hidden');
        }
    }

    // ----------------------------------------
    // UI Rendering & Helpers
    // ----------------------------------------
    function showLoading() {
        projectsContainer.innerHTML = `
            <div class="loading-state">
                <span class="spinner"></span>
                <p>Loading projects...</p>
            </div>`;
    }

    function renderProjects(list) {
        if (list.length === 0) {
            projectsContainer.innerHTML = `
                <div class="empty-state">
                    <p>No projects found. Add one to get started!</p>
                </div>`;
            return;
        }

        projectsContainer.innerHTML = '';
        list.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card-admin card';
            card.innerHTML = `
                <div>
                    <div class="project-card-header">
                        <h3 class="project-admin-title">${project.title}</h3>
                        <span class="project-admin-category">${project.category}</span>
                    </div>
                    <p class="project-admin-desc">${project.desc}</p>
                    <div class="project-admin-metadata">
                        <span>Year: <strong>${project.year}</strong></span>
                        <span>Type: <strong>${project.type}</strong></span>
                        <span>Shape: <strong>${project.shape}</strong></span>
                    </div>
                </div>
                <div class="project-admin-actions">
                    <button class="btn btn-secondary btn-edit" data-id="${project.id}">Edit</button>
                    <button class="btn btn-danger btn-delete" data-id="${project.id}">Delete</button>
                </div>
            `;
            
            // Event Listeners for actions
            card.querySelector('.btn-edit').addEventListener('click', () => openEditModal(project));
            card.querySelector('.btn-delete').addEventListener('click', () => deleteProject(project.id));
            
            projectsContainer.appendChild(card);
        });
    }

    function updateStats() {
        statTotal.textContent = projects.length;
        
        const webCount = projects.filter(p => p.category === 'web').length;
        const bizCount = projects.filter(p => p.category === 'business').length;
        const othersCount = projects.length - webCount - bizCount;

        statWeb.textContent = webCount;
        statBusiness.textContent = bizCount;
        statOthers.textContent = othersCount;
    }

    // Modal Control
    function openAddModal() {
        isEditing = false;
        modalTitle.textContent = 'Add Project';
        projectForm.reset();
        projectIdInput.value = '';
        projectModal.classList.remove('hidden');
    }

    function openEditModal(project) {
        isEditing = true;
        modalTitle.textContent = 'Edit Project';
        
        projectIdInput.value = project.id;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectCategory').value = project.category;
        document.getElementById('projectSubCategory').value = project.subCategory;
        document.getElementById('projectURL').value = project.url;
        document.getElementById('projectYear').value = project.year;
        document.getElementById('projectType').value = project.type;
        document.getElementById('projectGradient').value = project.gradient;
        document.getElementById('projectShape').value = project.shape;
        document.getElementById('projectDesc').value = project.desc;

        projectModal.classList.remove('hidden');
    }

    function closeModal() {
        projectModal.classList.add('hidden');
    }

    // Search filter
    searchBox.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = projects.filter(p => 
            p.title.toLowerCase().includes(query) ||
            p.desc.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.subCategory.toLowerCase().includes(query)
        );
        renderProjects(filtered);
    });

    // Form Submit
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const data = {
            title: document.getElementById('projectTitle').value.trim(),
            category: document.getElementById('projectCategory').value,
            subCategory: document.getElementById('projectSubCategory').value.trim(),
            url: document.getElementById('projectURL').value.trim(),
            year: document.getElementById('projectYear').value.trim(),
            type: document.getElementById('projectType').value.trim(),
            gradient: document.getElementById('projectGradient').value,
            shape: document.getElementById('projectShape').value,
            desc: document.getElementById('projectDesc').value.trim()
        };

        const id = projectIdInput.value;
        saveProject(data, id || null);
    });

    // Event Bindings
    btnAddProject.addEventListener('click', openAddModal);
    btnModalClose.addEventListener('click', closeModal);
    btnCancel.addEventListener('click', closeModal);

    btnPublishToggle.addEventListener('click', () => {
        publishDrawer.classList.toggle('hidden');
    });
    btnPublishClose.addEventListener('click', () => {
        publishDrawer.classList.add('hidden');
    });

    btnConfirmPublish.addEventListener('click', publishToGit);

    // Toast Notifications
    function showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        let icon = '';
        if (type === 'success') {
            icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else if (type === 'error') {
            icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
        } else {
            icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
        }

        toast.innerHTML = `${icon}<span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'none';
            toast.offsetHeight; /* trigger reflow */
            toast.style.animation = 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) reverse forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // Init
    loadProjects();
});
