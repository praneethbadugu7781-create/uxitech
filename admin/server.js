const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

const DATA_FILE = path.join(__dirname, '..', 'data', 'projects.json');
const WORK_HTML = path.join(__dirname, '..', 'work.html');
const DIST_WORK_HTML = path.join(__dirname, '..', 'dist', 'work.html');
const DIST_DIR = path.join(__dirname, '..', 'dist');

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://praneethbadugu1530_db_user:XR7v7kMqULIjQFOa@cluster0.qzsnr1a.mongodb.net/uxi_portfolio?appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas successfully.');
        seedProjects();
    })
    .catch(err => console.error('MongoDB connection error:', err));

const ProjectSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    desc: { type: String, required: true },
    year: { type: String, required: true },
    type: { type: String, required: true },
    url: { type: String, required: true },
    gradient: { type: String, required: true },
    shape: { type: String, required: true }
});

const Project = mongoose.model('Project', ProjectSchema);

// Seed function to migrate local projects.json data to MongoDB Atlas on startup
async function seedProjects() {
    try {
        const count = await Project.countDocuments();
        if (count === 0 && fs.existsSync(DATA_FILE)) {
            console.log('MongoDB is empty. Seeding initial projects from projects.json...');
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            const projects = JSON.parse(data);
            await Project.insertMany(projects);
            console.log('Seeding completed successfully!');
        }
    } catch (err) {
        console.error('Error seeding database:', err);
    }
}

// Generate HTML for all projects and update files
async function generateHTML() {
    try {
        const projects = await Project.find({});
        
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
        
        // Write the data to local projects.json file as backup
        fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2), 'utf8');
        
        // Copy to dist folder
        const distDataDir = path.join(DIST_DIR, 'data');
        if (!fs.existsSync(distDataDir)) {
            fs.mkdirSync(distDataDir, { recursive: true });
        }
        fs.copyFileSync(DATA_FILE, path.join(distDataDir, 'projects.json'));
        
        return rootUpdated && distUpdated;
    } catch (err) {
        console.error('Error generating HTML:', err);
        return false;
    }
}

// API Routes
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/projects', async (req, res) => {
    try {
        const id = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const newProject = new Project({ id, ...req.body });
        await newProject.save();
        await generateHTML();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    try {
        const updated = await Project.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ error: 'Project not found' });
        }
        await generateHTML();
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/projects/:id', async (req, res) => {
    try {
        const deleted = await Project.findOneAndDelete({ id: req.params.id });
        if (!deleted) {
            return res.status(404).json({ error: 'Project not found' });
        }
        await generateHTML();
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Git Publish route
app.post('/api/git/publish', (req, res) => {
    const commitMsg = req.body.message || 'chore: update portfolio works details from admin panel';
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
