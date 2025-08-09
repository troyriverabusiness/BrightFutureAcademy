// Subject Grid Renderer
// This script dynamically renders the subject grid using the centralized subject data

// Component loader function
async function loadComponent(componentPath, variables = {}) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${response.statusText}`);
        }
        
        let html = await response.text();
        
        // Replace all template variables
        Object.keys(variables).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            html = html.replace(regex, variables[key] || '');
        });
        
        return html;
    } catch (error) {
        console.error('Error loading component:', error);
        return `<div class="error">Failed to load component</div>`;
    }
}

// Render a single subject card
async function renderSubjectCard(subject, container) {
    try {
        const html = await loadComponent('../components/subject-card.html', {
            SUBJECT_ID: subject.id,
            SUBJECT_NAME: subject.name,
            SUBJECT_IMAGE: subject.image || 'placeholder.webp'
        });
        
        // Create a temporary container to parse the HTML
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = html;
        const card = tempContainer.firstElementChild;
        
        // Make the card clickable by wrapping it in a link
        const link = document.createElement('a');
        link.href = subject.link;
        link.className = 'product-link';
        
        // Move the card content into the link
        while (card.firstChild) {
            link.appendChild(card.firstChild);
        }
        
        // Add the link to the container
        container.appendChild(link);
        
    } catch (error) {
        console.error('Error rendering subject card:', error);
    }
}

// Render the entire subject grid
async function renderSubjectGrid(containerId, subjects = null) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found`);
        return;
    }
    
    // Clear existing content
    container.innerHTML = '';
    
    // Use provided subjects or get all subjects
    const subjectsToRender = subjects || getAllSubjects();
    
    // Render each subject card
    for (const subject of subjectsToRender) {
        await renderSubjectCard(subject, container);
    }
}

// Render subjects by category
async function renderSubjectsByCategory(containerId, category) {
    const subjects = getSubjectsByCategory(category);
    await renderSubjectGrid(containerId, subjects);
}

// Initialize the subject grid when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Auto-detect and render subject grids
    const subjectGrids = document.querySelectorAll('[id*="subject"], [id*="grid"]');
    
    subjectGrids.forEach(grid => {
        if (grid.id.includes('subject') || grid.id.includes('grid')) {
            renderSubjectGrid(grid.id);
        }
    });
});

// Export functions for use in other scripts
window.SubjectGrid = {
    renderSubjectGrid,
    renderSubjectsByCategory,
    renderSubjectCard,
    getAllSubjects,
    getSubjectsByCategory,
    getSubjectById
};
