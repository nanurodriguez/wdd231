//This code will be used to display the chamber members on the chamber directory page. It will async fetch and toggle view of these members in the DIRECTORY page.
const url = 'data/members.json';

const container = document.querySelector('#membersContainer');
const gridBtn = document.querySelector('#gridView');
const listBtn = document.querySelector('#listView');

// Fetch and display members
async function loadMembers() {
  try {
    const response = await fetch(url);
    const members = await response.json();
    renderMemberCards(members);
  } catch (error) {
    console.error('Error loading members:', error);
    container.innerHTML = '<p>Unable to load member data.</p>';
  }
}

// Render member cards
function renderMemberCards(members) {
  container.innerHTML = ''; // Clear existing content

  members.forEach(member => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('member-card');

    const html = `
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    cardElement.innerHTML = html;

    // Add image only in grid view
    if (container.classList.contains('grid')) {
      const imageElement = document.createElement('img');
      imageElement.src = `images/${member.image}`;
      imageElement.alt = `${member.name} logo`;
      imageElement.loading = 'lazy';
      cardElement.prepend(imageElement);
    }

    container.appendChild(cardElement);
  });
}

// Toggle view buttons
gridBtn.addEventListener('click', () => {
  container.classList.add('grid');
  container.classList.remove('list');
  loadMembers();
});

listBtn.addEventListener('click', () => {
  container.classList.add('list');
  container.classList.remove('grid');
  loadMembers();
});

// Initial load
loadMembers();