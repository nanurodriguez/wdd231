//This will import the places data from discover.mjs

import { places } from '../data/discover.mjs';

//grab  a reference to the divition where we display the items
const showAll = document.querySelector('#show-all');

//loop through the places array and create a card for each one

function displayItems(places) {
    
    places.forEach(x => {
        let card = document.createElement('section');
        let title = document.createElement('h2');

        let img = document.createElement('img');
        img.src= 'images/${x.photo_url}';
        img.alt = x.name;
        
        let p = document.createElement('p');
        let a = document.createElement('a');

        title.innerText = x.name;
        img.setAttribute('src', x.image);
        img.setAttribute('alt', x.name);
        p.textContent = x.description;
        a.setAttribute('href', x.website);
        a.setAttribute('target', '_blank');
        a.textContent = x.website;

        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(p);
        card.appendChild(a);
        showAll.appendChild(card);
    });
}

displayItems(places);