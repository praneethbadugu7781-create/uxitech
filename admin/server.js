const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

const DATA_FILE = path.join(__dirname, '..', 'data', 'projects.json');
const WORK_HTML = path.join(__dirname, '..', 'work.html');
const DIST_WORK_HTML = path.join(__dirname, '..', 'dist', 'work.html');
const DIST_DIR = path.join(__dirname, '..', 'dist');

// Read projects
function readProjects() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            return [];
        }
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading projects:', err);
        return [];
    }
}

// Write projects
function writeProjects(projects) {
    try {
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Error writing projects:', err);
        return false;
    }
}

// Generate HTML for all projects and update files
function generateHTML() {
    const projects = readProjects();
    
    let htmlContent = '\n';
    
    projects.forEach(project => {
        let shapeHtml = '';
        let patternClass = 'pattern-1';
        
        if (project.shape === 'sphere') {
            shapeHtml = `
                                    <div class="floating-sphere-wrap">
                                        <div class="sphere-outer"></div>
                                        <div class="sphere-inner"></div>
                                    </div>`;
            patternClass = 'pattern-2';
        } else if (project.shape === 'cube') {
            shapeHtml = `
                                    <div class="floating-cube">
                                        <div class="cube-face front"></div>
                                        <div class="cube-face back"></div>
                                        <div class="cube-face top"></div>
                                        <div class="cube-face bottom"></div>
                                        <div class="cube-face left"></div>
                                        <div class="cube-face right"></div>
                                    </div>`;
            patternClass = 'pattern-1';
        } else if (project.shape === 'ring') {
            shapeHtml = `
                                    <div class="floating-ring-wrap">
                                        <div class="ring ring-1"></div>
                                        <div class="ring ring-2"></div>
                                        <div class="ring ring-3"></div>
                                    </div>`;
            patternClass = 'pattern-3';
        }
        
        htmlContent += `                <!-- Project: ${project.title} -->
                <article class="portfolio-item" data-category="${project.category}" data-reveal>
                    <a href="${project.url}" target="_blank" rel="noopener" class="portfolio-card-link">
                        <div class="portfolio-card">
                            <div class="portfolio-visual">
                                <div class="portfolio-gradient ${project.gradient}"></div>
                                <div class="portfolio-3d">${shapeHtml}
                                </div>
                                <div class="portfolio-pattern ${patternClass}"></div>
                            </div>
                            <div class="portfolio-overlay">
                                <div class="portfolio-info">
                                    <span class="portfolio-category">${project.subCategory}</span>
                                    <h3 class="portfolio-title">${project.title}</h3>
                                    <p class="portfolio-desc">${project.desc}</p>
                                    <div class="portfolio-meta">
                                        <span class="meta-item">${project.year}</span>
                                        <span class="meta-divider">•</span>
                                        <span class="meta-item">${project.type}</span>
                                    </div>
                                    <span class="portfolio-link">View Project</span>
                                </div>
                            </div>
                            <div class="portfolio-glow"></div>
                        </div>
                    </a>
                </article>\n\n`;
    });
    
    // Helper to update a target HTML file between markers
    function updateHTMLFile(filePath) {
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return false;
        }
        
        let content = fs.readFileSync(filePath, 'utf8');
        const startMarker = '<!-- PORTFOLIO_ITEMS_START -->';
        const endMarker = '<!-- PORTFOLIO_ITEMS_END -->';
        
        const startIndex = content.indexOf(startMarker);
        const endIndex = content.indexOf(endMarker);
        
        if (startIndex === -1 || endIndex === -1) {
            console.error(`Markers not found in: ${filePath}`);
            return false;
        }
        
        const before = content.substring(0, startIndex + startMarker.length);
        const after = content.substring(endIndex);
        
        const newContent = before + htmlContent + '                ' + after;
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated: ${filePath}`);
        return true;
    }
    
    const rootUpdated = updateHTMLFile(WORK_HTML);
    const distUpdated = updateHTMLFile(DIST_WORK_HTML);
    
    // Also copy updated projects.json to dist/data/projects.json if dist directory exists
    const distDataDir = path.join(DIST_DIR, 'data');
    if (!fs.existsSync(distDataDir)) {
        fs.mkdirSync(distDataDir, { recursive: true });
    }
    fs.copyFileSync(DATA_FILE, path.join(distDataDir, 'projects.json'));
    
    return rootUpdated && distUpdated;
}

// API Routes
app.get('/api/projects', (req, res) => {
    res.json(readProjects());
});

app.post('/api/projects', (req, res) => {
    const projects = readProjects();
    const newProject = {
        id: req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        ...req.body
    };
    
    projects.push(newProject);
    if (writeProjects(projects)) {
        generateHTML();
        res.status(201).json(newProject);
    } else {
        res.status(500).json({ error: 'Failed to write projects' });
    }
});

app.put('/api/projects/:id', (req, res) => {
    const projects = readProjects();
    const index = projects.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Project not found' });
    }
    
    projects[index] = { ...projects[index], ...req.body };
    
    if (writeProjects(projects)) {
        generateHTML();
        res.json(projects[index]);
    } else {
        res.status(500).json({ error: 'Failed to update projects' });
    }
});

app.delete('/api/projects/:id', (req, res) => {
    let projects = readProjects();
    const index = projects.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
        return res.status(404).json({ error: 'Project not found' });
    }
    
    projects = projects.filter(p => p.id !== req.params.id);
    
    if (writeProjects(projects)) {
        generateHTML();
        res.json({ message: 'Project deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// Git Publish route
app.post('/api/git/publish', (req, res) => {
    // Stage all changes (work.html, dist/work.html, data/projects.json)
    // We should copy any other file if they edited elsewhere
    // Then commit and push
    
    const commitMsg = req.body.message || 'chore: update portfolio works details from admin panel';
    
    // Command sequence
    const cmd = `git add -A && git commit -m "${commitMsg.replace(/"/g, '\\"')}" && git push`;
    
    exec(cmd, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Git error: ${error.message}`);
            return res.status(500).json({ error: error.message, details: stderr });
        }
        res.json({ success: true, stdout, stderr });
    });
});

app.listen(PORT, () => {
    console.log(`UXI Admin Server running at http://localhost:${PORT}`);
});
