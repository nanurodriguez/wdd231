

// General site functionality and Local Storage implementation

document.addEventListener('DOMContentLoaded', () => {
    
    // date and time

    const now = new Date();
    const lastModifiedElement = document.getElementById('lastModified');
    const currentYearElement = document.getElementById('currentYear');
    
    // year
    if (currentYearElement) {
        currentYearElement.textContent = `© ${now.getFullYear()} | Sunnyside Preschool | `;
    }

    //last modified
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }

    // local storage
    
    const lastVisitElement = document.getElementById('last-visit');
    
    if (lastVisitElement) {
        const LAST_VISIT_KEY = 'ss_lastVisit';
        
        const lastVisitTimestamp = localStorage.getItem(LAST_VISIT_KEY);
        
        const currentTimestamp = Date.now();
        
        if (lastVisitTimestamp) {
            const lastVisitTime = parseInt(lastVisitTimestamp);
            
            const MS_PER_DAY = 1000 * 60 * 60 * 24;
            const daysSinceLastVisit = Math.floor((currentTimestamp - lastVisitTime) / MS_PER_DAY);

            let message = "Welcome Back!";
            
            if (daysSinceLastVisit === 0) {
                message = "Welcome Back! Good to see you today.";
            } else if (daysSinceLastVisit === 1) {
                message = "Welcome Back! You visited yesterday.";
            } else {
                message = `Welcome Back! It has been ${daysSinceLastVisit} days since your last visit.`;
            }
            
            lastVisitElement.textContent = message;

        } else {
            lastVisitElement.textContent = "Welcome to Sunnyside Preschool!";
        }

        localStorage.setItem(LAST_VISIT_KEY, currentTimestamp);
    }
    
    // navigation    
    const hamButton = document.querySelector('#ham-button');
    const navigation = document.querySelector('#nav-bar');

    if (hamButton && navigation) {
        hamButton.addEventListener('click', () => {
            navigation.classList.toggle('open');
            hamButton.classList.toggle('open');
        });
    }
});