
// CHAMBER HAMBURGER BUTTON:

const navButton = document.querySelector('#ham-button');
const navLinks = document.querySelector('#nav-bar');
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    // toggling the navigation bar visibility;
    navLinks.classList.toggle('show');
}); 
