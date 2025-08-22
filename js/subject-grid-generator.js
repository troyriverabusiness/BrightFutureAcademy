// Subject Grid Generator
// This script dynamically generates the subject grid using the subject cards data

// Group subjects by category
function groupSubjectsByCategory(subjects) {
    const categories = {};
    
    subjects.forEach(subject => {
        // Extract category from subject name
        let category = 'Other';
        
        if (subject.name.includes('Mathematics') || subject.name.includes('Math')) {
            category = 'Mathematics';
        } else if (subject.name.includes('Physics')) {
            category = 'Physics';
        } else if (subject.name.includes('Chemistry')) {
            category = 'Chemistry';
        } else if (subject.name.includes('Biology')) {
            category = 'Biology';
        } else if (subject.name.includes('Economics')) {
            category = 'Economics';
        } else if (subject.name.includes('Business Management')) {
            category = 'Business Management';
        } else if (subject.name.includes('Design Technology')) {
            category = 'Design Technology';
        }
        
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push(subject);
    });
    
    return categories;
}

// Generate a single subject card HTML
function generateSubjectCard(subject) {
    // Determine image based on subject name
    let imageSrc = '../images/placeholder.webp';
    
    if (subject.name.includes('Physics')) {
        imageSrc = subject.level === 'HL' ? '../images/physicshl.jpg' : '../images/physicssl.jpg';
    } else if (subject.name.includes('Math Analysis and Approaches')) {
        imageSrc = subject.level === 'HL' ? '../images/mathaahl.jpg' : '../images/mathaasl.jpg';
    } else if (subject.name.includes('Math Application and Interpretation')) {
        imageSrc = subject.level === 'HL' ? '../images/mathaihl.jpg' : '../images/mathaisl.jpg';
    }
    
    return `
        <li class="card">
            <a class="product-link" href="${subject.link}">
                <img src="${imageSrc}" alt="class img" class="product-image">
                <div class="badges">
                    <span class="badge">${subject.grade}</span>
                    <span class="badge">${subject.level}</span>
                </div>
                <h4 class="product-title">${subject.name}</h4>
                <p class="go-to-link">Go to Class &gt;</p>
            </a>
        </li>
    `;
}

// Generate a subject category section
function generateCategorySection(categoryName, subjects) {
    const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
    
    return `
        <h3 id="${categoryId}">${categoryName}</h3>
        <div class="slider">
            <div class="container">
                <div class="card-wrapper">
                    <ul class="card-list">
                        ${subjects.map(subject => generateSubjectCard(subject)).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Generate the complete subjects grid
function generateSubjectsGrid() {
    const gridContainer = document.getElementById('subjects-grid');
    if (!gridContainer) {
        console.error('Subjects grid container not found');
        return;
    }
    
    // Check if subjectData is available
    if (typeof subjectData === 'undefined') {
        console.error('Subject data not found');
        gridContainer.innerHTML = '<p>Subject data not available</p>';
        return;
    }
    
    // Group subjects by category
    const categories = groupSubjectsByCategory(subjectData);
    
    // Generate HTML for each category
    let gridHTML = '';
    
    // Define the order we want to display categories
    const categoryOrder = [
        'Physics',
        'Mathematics', 
        'Chemistry',
        'Biology',
        'Economics',
        'Business Management',
        'Design Technology'
    ];
    
    categoryOrder.forEach(category => {
        if (categories[category]) {
            gridHTML += generateCategorySection(category, categories[category]);
        }
    });
    
    // Add any remaining categories
    Object.keys(categories).forEach(category => {
        if (!categoryOrder.includes(category)) {
            gridHTML += generateCategorySection(category, categories[category]);
        }
    });
    
    gridContainer.innerHTML = gridHTML;
}

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', function() {
    generateSubjectsGrid();
});

// Export functions for use in other scripts
window.SubjectGridGenerator = {
    generateSubjectsGrid,
    generateCategorySection,
    generateSubjectCard,
    groupSubjectsByCategory
};
