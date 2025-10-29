
// adding event listener to the hamburger button
const navButton = document.querySelector('#ham-button');
const navLinks = document.querySelector('#nav-bar');
navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    // toggling the navigation bar visibility;
    navLinks.classList.toggle('show');
}); 
// when the button is clicked, it will add or remove the 'show' class
// to both the button and the navigation links, allowing for CSS styling
// to show or hide the navigation menu.