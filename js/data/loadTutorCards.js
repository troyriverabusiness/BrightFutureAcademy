


class TutorPageGenerator {
    constructor() {
        this.tutors = null;
        this.init();
    }
    
    async init() {
        try {
            await this.loadTutorData();
            this.displayTutorCards();
        } catch (error) {
            console.error("Error loading tutor information:", error);
        }
    }

    async loadTutorData() {
        try {
            const response = await fetch('../js/data/tutors.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.tutors = await response.json();
        } catch (error) {
            console.error("Error loading tutor information:", error);
            throw error;
        }
    }

    displayTutorCards() {
        if (!this.tutors || !this.tutors.tutors) {
            console.error("No tutor data available");
            return;
        }

        // Find the existing team container
        const teamContainer = document.querySelector('.team-container');
        
        if (teamContainer) {
            // Clear existing content and populate with tutor data
            teamContainer.innerHTML = '';
            this.tutors.tutors.forEach(tutor => {
                const tutorCard = this.createTutorCard(tutor);
                teamContainer.appendChild(tutorCard);
            });
        } else {
            // Try to find the container by other means
            const meetOurTeam = document.querySelector('.meet-our-team');
            if (meetOurTeam) {
                const newTeamContainer = document.createElement('ul');
                newTeamContainer.classList.add('team-container');
                meetOurTeam.appendChild(newTeamContainer);
                
                // Now populate it
                this.tutors.tutors.forEach(tutor => {
                    const tutorCard = this.createTutorCard(tutor);
                    newTeamContainer.appendChild(tutorCard);
                });
            }
        }
    }

    createTutorCard(tutor) {
        // Create the exact same structure as in the HTML
        const listItem = document.createElement('li');
        const teamMember = document.createElement('div');
        teamMember.classList.add('team-member');

        // Profile picture - use appropriate image based on tutor name
        const profilePic = document.createElement('img');
        profilePic.classList.add('profile-pic');
        
        // Set profile picture based on tutor name
        if (tutor.name === 'Rawad Sabra') {
            profilePic.src = '../images/ceo.jpeg';
        } else if (tutor.name === 'Troy Rivera') {
            profilePic.src = '../images/troyprofile.jpeg';
        } else {
            profilePic.src = '../images/placeholder.webp';
        }
        
        profilePic.alt = '';
        teamMember.appendChild(profilePic);

        // Name section
        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        
        const name = document.createElement('p');
        name.classList.add('student-name');
        name.textContent = tutor.name;
        nameDiv.appendChild(name);
        
        const role = document.createElement('p');
        role.innerHTML = '<i>' + tutor.role + '</i>';
        nameDiv.appendChild(role);
        
        teamMember.appendChild(nameDiv);
        teamMember.appendChild(document.createElement('br'));

        // Description
        const description = document.createElement('p');
        description.classList.add('desc');
        description.textContent = tutor.description;
        teamMember.appendChild(description);
        
        teamMember.appendChild(document.createElement('br'));

        // LinkedIn link
        const linkedin = document.createElement('a');
        linkedin.href = tutor.linkedin !== '#' ? tutor.linkedin : '#';
        linkedin.setAttribute('aria-label', `LinkedIn profile for ${tutor.name}`);
        
        const linkedinIcon = document.createElement('img');
        linkedinIcon.src = '../icons/linkedin.png';
        linkedinIcon.alt = 'LinkedIn icon';
        
        linkedin.appendChild(linkedinIcon);
        teamMember.appendChild(linkedin);

        listItem.appendChild(teamMember);
        return listItem;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TutorPageGenerator();
});

// Also try immediate initialization as backup
if (document.readyState !== 'loading') {
    new TutorPageGenerator();
}