/**
 * Subject Page Generator
 * This script dynamically populates subject pages with data from the master-subject-data.json file
 */

class SubjectPageGenerator {
    constructor() {
        this.subjectData = null;
        this.currentSubject = null;
        this.init();
    }

    async init() {
        try {
            // Load the master subject data
            await this.loadSubjectData();
            
            // Get the current subject ID from the page
            const subjectId = this.getCurrentSubjectId();
            if (subjectId) {
                this.currentSubject = this.findSubjectById(subjectId);
                if (this.currentSubject) {
                    this.populatePage();
                } else {
                    console.error('Subject not found:', subjectId);
                }
            }
        } catch (error) {
            console.error('Error initializing subject page generator:', error);
        }
    }

    async loadSubjectData() {
        try {
            const response = await fetch('../js/master-subject-data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.subjectData = await response.json();
        } catch (error) {
            console.error('Error loading subject data:', error);
            throw error;
        }
    }

    getCurrentSubjectId() {
        // Try to get subject ID from URL parameters first
        const urlParams = new URLSearchParams(window.location.search);
        let subjectId = urlParams.get('subject');
        
        // If no URL parameter, try to get from the hidden data container
        if (!subjectId) {
            const dataContainer = document.getElementById('subject-data');
            if (dataContainer) {
                subjectId = dataContainer.dataset.subjectId;
            }
        }
        
        // If still no subject ID, try to extract from the current page URL
        if (!subjectId) {
            const pathParts = window.location.pathname.split('/');
            const fileName = pathParts[pathParts.length - 1];
            // Remove .html extension and try to match with subject IDs
            const fileNameWithoutExt = fileName.replace('.html', '');
            if (this.subjectData && this.subjectData.subjects) {
                const foundSubject = this.subjectData.subjects.find(subject => 
                    subject.id === fileNameWithoutExt || 
                    subject.link === fileName
                );
                if (foundSubject) {
                    subjectId = foundSubject.id;
                }
            }
        }
        
        return subjectId;
    }

    findSubjectById(subjectId) {
        if (!this.subjectData || !this.subjectData.subjects) {
            return null;
        }
        return this.subjectData.subjects.find(subject => subject.id === subjectId);
    }

    populatePage() {
        if (!this.currentSubject) return;

        // Update page title
        document.title = `${this.currentSubject.name} | Bright Future Academy`;

        // Replace all placeholders in the HTML
        this.replacePlaceholders();
        
        // Generate curriculum table
        this.generateCurriculumTable();
        
        // Generate learning objectives
        this.generateLearningObjectives();
        
        // Update schedule description
        this.updateScheduleDescription();
    }

    replacePlaceholders() {
        const replacements = {
            '{{SUBJECT_NAME}}': this.currentSubject.name,
            '{{SUBJECT_CATEGORY}}': this.currentSubject.category,
            '{{SUBJECT_DESCRIPTION_SHORT}}': this.currentSubject.description.substring(0, 100) + '...',
            '{{SUBJECT_DESCRIPTION}}': this.currentSubject.description,
            '{{SUBJECT_ID}}': this.currentSubject.id,
            '{{CATEGORY_NAME}}': this.currentSubject.category,
            '{{CATEGORY_LINK}}': this.getCategoryLink(this.currentSubject.category),
            '{{GDC_REQUIREMENT}}': this.currentSubject.requirements.gdc,
            '{{CLASS_STRUCTURE_PLAN}}': this.currentSubject.classStructure.plan,
            '{{ADDITIONAL_INFO}}': 'Classes are designed to support your school curriculum',
            '{{PRICE}}': this.currentSubject.pricing.price,
            '{{GRADE}}': this.currentSubject.grade,
            '{{FORMAT}}': this.currentSubject.schedule.format,
            '{{CONTACT_EMAIL}}': this.currentSubject.contact.email,
            '{{CONTACT_PHONE}}': this.currentSubject.contact.phone,
            '{{CONTACT_LOCATION}}': this.currentSubject.contact.location,
            '{{SPECIAL_FEATURES_FLEXIBILITY}}': this.currentSubject.specialFeatures.flexibility,
            '{{LEARNING_OBJECTIVES_DESCRIPTION}}': this.currentSubject.learningObjectives.description
        };

        // Replace all placeholders in the document
        Object.entries(replacements).forEach(([placeholder, value]) => {
            this.replaceAllOccurrences(placeholder, value);
        });
    }

    getCategoryLink(category) {
        const categoryMap = {
            'Mathematics': 'maths',
            'Physics': 'physics',
            'Chemistry': 'chemistry',
            'Economics': 'economics',
            'Business': 'business'
        };
        return categoryMap[category] || category.toLowerCase();
    }

    replaceAllOccurrences(search, replace) {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        textNodes.forEach(textNode => {
            if (textNode.textContent.includes(search)) {
                textNode.textContent = textNode.textContent.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
            }
        });
    }

    generateCurriculumTable() {
        const table = document.getElementById('topics');
        if (!table || !this.currentSubject.curriculum.topics) return;

        // Generate headers based on subject level
        const headersRow = table.querySelector('.class-title');
        if (headersRow) {
            const headers = headersRow.querySelectorAll('td');
            if (headers.length >= 3) {
                if (this.currentSubject.level === 'HL') {
                    headers[1].textContent = this.currentSubject.name;
                    headers[2].textContent = this.currentSubject.name.replace(' HL', ' SL');
                } else {
                    headers[1].textContent = this.currentSubject.name;
                    headers[2].textContent = this.currentSubject.name.replace(' SL', ' HL');
                }
            }
        }

        // Generate topic rows
        const tbody = table.querySelector('tbody') || table;
        const existingRows = tbody.querySelectorAll('tr:not(.class-title)');
        existingRows.forEach(row => row.remove());

        this.currentSubject.curriculum.topics.forEach(topic => {
            const row = document.createElement('tr');
            
            // Topic name cell
            const topicCell = document.createElement('td');
            topicCell.className = 'topic';
            topicCell.textContent = `Topic ${topic.topicNumber}: ${topic.topicName}`;
            row.appendChild(topicCell);

            // HL content cell (if applicable)
            const hlCell = document.createElement('td');
            if (topic.hlContent && this.currentSubject.level === 'HL') {
                topic.hlContent.forEach(item => {
                    const p = document.createElement('p');
                    p.className = item.difficulty;
                    p.textContent = item.content;
                    hlCell.appendChild(p);
                });
            }
            row.appendChild(hlCell);

            // SL content cell
            const slCell = document.createElement('td');
            if (topic.slContent) {
                topic.slContent.forEach(item => {
                    const p = document.createElement('p');
                    p.className = item.difficulty;
                    p.textContent = item.content;
                    slCell.appendChild(p);
                });
            }
            row.appendChild(slCell);

            tbody.appendChild(row);
        });
    }

    generateLearningObjectives() {
        const table = document.querySelector('.learning-objectives table');
        if (!table || !this.currentSubject.learningObjectives.objectives) return;

        // Clear existing rows
        const existingRows = table.querySelectorAll('tr');
        existingRows.forEach(row => row.remove());

        // Generate new rows
        this.currentSubject.learningObjectives.objectives.forEach(objective => {
            const row = document.createElement('tr');
            
            const iconCell = document.createElement('td');
            const icon = document.createElement('img');
            icon.className = 'icon';
            icon.src = '../../icons/tick.png';
            icon.alt = '';
            iconCell.appendChild(icon);
            
            const textCell = document.createElement('td');
            textCell.textContent = objective;
            
            row.appendChild(iconCell);
            row.appendChild(textCell);
            table.appendChild(row);
        });
    }

    updateScheduleDescription() {
        const scheduleSection = document.querySelector('#date .header-text p');
        if (scheduleSection && this.currentSubject.schedule) {
            const schedule = this.currentSubject.schedule;
            scheduleSection.innerHTML = `The classes for ${this.currentSubject.name}, for ${this.currentSubject.grade}, will be held ${schedule.format.toLowerCase()} at the academy, every <span>${schedule.day} ${schedule.time}</span>.`;
        }
    }
}

// Initialize the generator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SubjectPageGenerator();
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SubjectPageGenerator;
}
