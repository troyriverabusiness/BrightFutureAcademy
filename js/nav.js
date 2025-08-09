// Combined Navigation Script
// This script handles both navbar inclusion and scroll-based hiding/showing

document.addEventListener('DOMContentLoaded', function() {
    // Navbar Include Functionality
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    
    if (navbarPlaceholder) {
        // Load the navbar component
        fetch('../components/navbar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load navbar component');
                }
                return response.text();
            })
            .then(html => {
                navbarPlaceholder.innerHTML = html;
                
                // Highlight current page in navigation
                highlightCurrentPage();
                
                // Initialize scroll functionality after navbar is loaded
                initScrollNavbar();
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
                // Fallback: show a simple navigation if component fails to load
                navbarPlaceholder.innerHTML = `
                    <nav>
                        <div id="left">
                            <a id="logo-link" href="index.html">
                                <img id="logo" src="https://media.licdn.com/dms/image/D4D3DAQGejYrVFvFwWA/image-scale_191_1128/0/1719933016095/brightfuturespain_cover?e=2147483647&v=beta&t=IKKIX0B5dCWML9JAyDXwll54sY9-Q3yNU8DlYKT09_o" alt="logo">
                            </a>
                        </div>
                        <div id="right">
                            <a href="AboutUsPage.html">About Us</a>
                            <a href="SubjectsPage.html">Classes</a>
                            <a href="ContactPage.html">Contact</a>
                            <a class="CTA button-style" href="GridViewSubjects.html">All Subjects</a>
                        </div>
                    </nav>
                `;
                
                // Initialize scroll functionality with fallback navbar
                initScrollNavbar();
            });
    } else {
        // If no placeholder, initialize scroll functionality for existing navbar
        initScrollNavbar();
    }
});

function highlightCurrentPage() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Find navigation links
    const navLinks = document.querySelectorAll('#right a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('current-page');
        }
    });
}

function initScrollNavbar() {
    const navbar = document.querySelector("header");
    
    if (navbar) {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currScrollY = window.scrollY;

            if (currScrollY <= lastScrollY || currScrollY < 50) {
                navbar.classList.remove('hidden');
            } else {
                // User has scrolled down
                navbar.classList.add('hidden');
            }
            lastScrollY = currScrollY; // Update the last scroll position
        });
    }
}
