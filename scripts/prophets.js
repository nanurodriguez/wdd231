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

/*If you see the URL log, the function was called
If you see the status 200, the fetch was successful
If you see the number of prophets, the JSON parsing worked
If you see the table, the data structure is correct
If you see the first prophet details, the data is accessible for use*/


const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Create elements to add to the document
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        fullName.innerText = `${prophet.firstName} ${prophet.lastName}`;
        //Also: fullName.textContent = `${prophet.firstName} ${prophet.lastName}`;

        portrait.setAttribute('src', prophet.imageUrl);
        portrait.setAttribute('alt',`Portrait of ${prophet.firstName} $ss{prophet.lastName}`);
        portrait.setAttribute('loading','lazy');
        portrait.setAttribute('width', 300);
        portrait.setAttribute('height', 400);

        // Append the elements to the card
        card.appendChild(fullName);
        card.appendChild(portrait);
        cards.appendChild(card);        
    });
};