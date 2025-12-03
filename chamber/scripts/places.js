//This will import the places data from discover.mjs

import { places } from '../data/discover.mjs';

//Selecting my HTML elements
const showAll = document.querySelector('#show-all');
const messageElement = document.querySelector('#visit-message');

// Displaying cards function
function displayItems(places) {
    places.forEach(x => {
        //creating elements for my card
        let card = document.createElement('section');
        card.className = 'card'; // Add class for styling
        
        let title = document.createElement('h2');
        title.textContent = x.name;

        let img = document.createElement('img');

        img.setAttribute('src', x.photo_url); 
        img.setAttribute('alt', x.name);
        img.setAttribute('width', '300');
        img.setAttribute('height', '200');
        img.setAttribute('loading', 'lazy');

        let address = document.createElement('address');
        address.textContent = x.address;

        let p = document.createElement('p');
        p.textContent = x.description;

        //Creating button "Learn More" for each card :

        let button = document.createElement('button');
        button.textContent = "Learn More";

        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(address);
        card.appendChild(p);
        card.appendChild(button);
        
        showAll.appendChild(card);
    });
}

// Function to handle visit message- last visit
function handleVisitMessage() {
    const msToDays = 84600000; // Milliseconds in a day
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    
    // Check if visit exists
    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDiff = now - parseInt(lastVisit);
        
        if (timeDiff < msToDays) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else {
            const days = Math.floor(timeDiff / msToDays);
            const dayText = days === 1 ? "day" : "days";
            messageElement.textContent = `You last visited ${days} ${dayText} ago.`;
        }
    }
    
    // Store new date
    localStorage.setItem('lastVisit', now);
}

// Run functions
displayItems(places);
handleVisitMessage();