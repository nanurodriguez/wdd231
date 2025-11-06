const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

// Fetch the JSON data and display the prophets
async function getProphetsData() {
    const response = await fetch(url);
    const data = await response.json();
    //console.table(data.prophets);
    displayProphets(data.prophets);
}
getProphetsData();

/*
  displayProphets - Render an array of prophet objects into the page.
  Each prophet is appended as a <section> with a heading and portrait image.
*/
const displayProphets = (prophets) => {
    // Clear any existing content
    cards.innerHTML = '';

    prophets.forEach((prophet) => {
        // Create elements
        const card = document.createElement('section');
        card.className = 'prophet-card';

        const fullName = document.createElement('h2');
        fullName.textContent = `${prophet.name} ${prophet.lastname}` || `${prophet.firstName || ''} ${prophet.lastName || ''}`;

        const details = document.createElement('p');
        // Example: birthdate and birthplace if present
        details.textContent = `${prophet.birthdate || ''} — ${prophet.birthplace || ''}`;

        const portrait = document.createElement('img');
        // Use a safe src (fallback if imageUrl missing)
        portrait.src = prophet.imageurl || prophet.imageUrl || 'images/default-portrait.jpg';
        portrait.alt = `Portrait of ${prophet.name || prophet.firstName} ${prophet.lastname || prophet.lastName}`;
        portrait.loading = 'lazy';
        portrait.width = 300;
        portrait.height = 400;
        portrait.className = 'prophet-portrait';

        // Append elements to the card
        card.appendChild(fullName);
        card.appendChild(details);
        card.appendChild(portrait);

        // Append the card to the container
        cards.appendChild(card);
    });
};