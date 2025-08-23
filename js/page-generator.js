/**
 * Page Generator Utility
 * This script can be used to generate individual subject pages from the template
 * Run this in Node.js environment to generate static HTML pages
 */

const fs = require('fs');
const path = require('path');

class PageGenerator {
    constructor() {
        this.templatePath = '../Pages/subject-template.html';
        this.outputDir = '../Pages/generated/';
        this.dataPath = './data/available_subjects.json';
    }

    async generateAllPages() {
        try {
            // Load the master subject data
            const subjectData = await this.loadSubjectData();

            // Create output directory if it doesn't exist
            if (!fs.existsSync(this.outputDir)) {
                fs.mkdirSync(this.outputDir, { recursive: true });
            }

            // Generate a page for each subject
            for (const subject of subjectData.subjects) {
                await this.generateSubjectPage(subject);
            }

            console.log(`Generated ${subjectData.subjects.length} subject pages`);
        } catch (error) {
            console.error('Error generating pages:', error);
        }
    }

    async loadSubjectData() {
        try {
            const data = fs.readFileSync(this.dataPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error loading subject data:', error);
            throw error;
        }
    }

    async generateSubjectPage(subject) {
        try {
            // Load the template
            const template = fs.readFileSync(this.templatePath, 'utf8');
            
            // Generate the HTML content
            const htmlContent = this.populateTemplate(template, subject);
            
            // Create filename
            const filename = `${subject.id}.html`;
            const outputPath = path.join(this.outputDir, filename);
            
            // Write the file
            fs.writeFileSync(outputPath, htmlContent);
            
            console.log(`Generated: ${filename}`);
        } catch (error) {
            console.error(`Error generating page for ${subject.id}:`, error);
        }
    }

    populateTemplate(template, subject) {
        let html = template;

        // Replace all placeholders
        const replacements = {
            '{{SUBJECT_NAME}}': subject.name,
            '{{SUBJECT_CATEGORY}}': subject.category,
            '{{SUBJECT_DESCRIPTION_SHORT}}': subject.description.substring(0, 100) + '...',
            '{{SUBJECT_DESCRIPTION}}': subject.description,
            '{{SUBJECT_ID}}': subject.id,
            '{{CATEGORY_NAME}}': subject.category,
            '{{CATEGORY_LINK}}': this.getCategoryLink(subject.category),
            '{{GDC_REQUIREMENT}}': 'GDC (Graphical Display Calculator) is required for all the sessions',
            '{{CLASS_STRUCTURE_PLAN}}': 'Classes follow a flexible plan, ensuring the topics covered at BFA support the topics taught at their school',
            '{{ADDITIONAL_INFO}}': 'Classes are designed to support your school curriculum',
            '{{PRICE}}': '280€',
            '{{GRADE}}': subject.grade,
            '{{FORMAT}}': subject.schedule.format,
            '{{CONTACT_EMAIL}}': 'rawad@brightfuture.es',
            '{{CONTACT_PHONE}}': '+34 632 220 679',
            '{{CONTACT_LOCATION}}': 'Alcobendas, Madrid',
            '{{SPECIAL_FEATURES_FLEXIBILITY}}': 'Looking for a flexible and convenient class schedule? At Bright Future Academy, we offer a variety of classes on different days and times to accommodate our students\' busy schedules. Whether you\'re looking for after-school classes or weekend sessions, we have options for you. Join us and unlock your full potential today!',
            '{{LEARNING_OBJECTIVES_DESCRIPTION}}': 'Students will develop comprehensive understanding and skills in this subject area.',
            '{{LEARNING_OBJECTIVES_LIST}}': this.generateLearningObjectivesHTML(subject),
            '{{CURRICULUM_HEADERS}}': this.generateCurriculumHeadersHTML(subject),
            '{{CURRICULUM_TOPICS}}': this.generateCurriculumTopicsHTML(subject),
            '{{SCHEDULE_DESCRIPTION}}': this.generateScheduleDescriptionHTML(subject)
        };

        // Replace all placeholders
        Object.entries(replacements).forEach(([placeholder, value]) => {
            html = html.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
        });

        // Fix paths due to the generated pages being in different directory
        html = html.replace(/href="\.\.\//g, 'href="../../');
        html = html.replace(/src="\.\.\//g, 'src="../../');
        // Fix the tick icon paths specifically to be correct
        html = html.replace(/src="\.\.\.\.\.\.\/icons\/tick\.png"/g, 'src="../../icons/tick.png"');
        // Navigation links need to go up 1 level to Pages directory
        html = html.replace(/href="([^"]*\.html)"/g, 'href="../$1"');

        return html;
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

    generateLearningObjectivesHTML(subject) {
        let html = '';
        subject.learningObjectives.forEach(objective => {
            html += `
            <tr>
               <td><img class="icon" src="../icons/tick.png" alt=""></td>
               <td>${objective}</td>
            </tr>`;
        });
        return html;
    }

    generateCurriculumHeadersHTML(subject) {
        if (subject.level === 'HL') {
            return `<td>${subject.name}</td><td>${subject.name.replace(' HL', ' SL')}</td>`;
        } else {
            return `<td>${subject.name}</td><td>${subject.name.replace(' SL', ' HL')}</td>`;
        }
    }

    generateCurriculumTopicsHTML(subject) {
        let html = '';
        subject.curriculum.topics.forEach(topic => {
            html += `
            <tr>
               <td class="topic">Topic ${topic.topicNumber}: ${topic.topicName}</td>`;
            
            // HL content cell
            if (topic.hlContent && subject.level === 'HL') {
                html += `<td>`;
                topic.hlContent.forEach(item => {
                    html += `<p class="${item.difficulty}">${item.content}</p>`;
                });
                html += `</td>`;
            } else {
                html += `<td></td>`;
            }
            
            // SL content cell
            html += `<td>`;
            if (topic.slContent) {
                topic.slContent.forEach(item => {
                    html += `<p class="${item.difficulty}">${item.content}</p>`;
                });
            }
            html += `</td>
            </tr>`;
        });
        return html;
    }

    generateScheduleDescriptionHTML(subject) {
        const schedule = subject.schedule;
        return `The classes for ${subject.name}, for ${subject.grade}, will be held ${schedule.format.toLowerCase()} at the academy, every <span>${schedule.day} ${schedule.time}</span>.`;
    }
}

// If running directly, generate all pages
if (require.main === module) {
    const generator = new PageGenerator();
    generator.generateAllPages().then(() => {
        console.log('Page generation complete!');
    }).catch(error => {
        console.error('Page generation failed:', error);
    });
}

module.exports = PageGenerator;
