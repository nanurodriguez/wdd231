//set last modified date
const lastModified = new Date(document.lastModified);
const options = { year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('lastModified').textContent = lastModified.toLocaleDateString('en-US', options);

// Set current year in footer
const currentYear = new Date().getFullYear();
document.getElementById('currentYear').textContent = `© ${currentYear} All Rights Reserved`;  