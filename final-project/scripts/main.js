

// Mobile Navigation Toggle
const navButton = document.querySelector('#ham-button');
const navLinks = document.querySelector('#nav-bar');

if (navButton && navLinks) {
    navButton.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        navButton.classList.toggle('show');

        const isExpanded = navButton.getAttribute('aria-expanded') === 'true' || false;
        navButton.setAttribute('aria-expanded', !isExpanded);
    });
}

// dates in footer
const currentYearElement = document.getElementById('currentYear');
if (currentYearElement) {
    currentYearElement.textContent = `© ${new Date().getFullYear()} All Rights Reserved`; 
}

// last modified
const lastModifiedElement = document.getElementById('lastModified');
if (lastModifiedElement) {
    const lastModified = new Date(document.lastModified);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    lastModifiedElement.textContent = `Last Modified: ${lastModified.toLocaleDateString('en-US', options)}`;
}


//STORAGE
const lastVisitElement = document.getElementById('last-visit'); 
const lastVisitTimestamp = localStorage.getItem('sunnysideLastVisit');
const now = Date.now();

if (lastVisitElement) {
    if (lastVisitTimestamp) {
        // Calculate days since last visit
        const days = Math.floor((now - lastVisitTimestamp) / (1000 * 60 * 60 * 24));
        
        if (days === 0) {
            lastVisitElement.textContent = "Welcome back! You visited earlier today.";
        } else {
            lastVisitElement.textContent = `Welcome back! It's been ${days} day(s) since your last visit.`;
        }
    } else {
        lastVisitElement.textContent = "Welcome to Sunnyside Preschool! Your first visit is now recorded.";
    }

    // Update the last visit time for the next session
    localStorage.setItem('sunnysideLastVisit', now);
}