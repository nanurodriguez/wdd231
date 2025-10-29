
// adding event listener to the hamburger button
const hamButton = document.getElementById('ham-button');
hamButton.addEventListener('click', () => {
    hamButton.classList.toggle('show');
}); 