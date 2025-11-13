//This code will be used to display the chamber members on the chamber directory page. It will async fetch and toggle view of these members in the DIRECTORY page.

const container = document.getElementById('#membersContainer');
const gridBtn = document.getElementById('#gridView');
const listBtn = document.getElementById('#listView');

// Fetch and display members
async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error('Error loading members:', error);
    container.innerHTML = '<p>Unable to load member data.</p>';
  }
}

// Render member cards
function displayMembers(members) {
  container.innerHTML = ''; // Clear existing content

  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;

    // Add image only in grid view
    if (container.classList.contains('grid')) {
      const img = document.createElement('img');
      img.src = `images/${member.image}`;
      img.alt = `${member.name} logo`;
      img.loading = 'lazy';
      card.prepend(img);
    }

    container.appendChild(card);
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