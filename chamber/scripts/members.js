//This code will be used to display the chamber members on the chamber directory page. It will async fetch and toggle view of these members in the DIRECTORY page.

async function loadMembers() {
  const response = await fetch('data/chamber-members.json');
  const members = await response.json();
  displayMembers(members);
}

function displayMembers(members) {
  const container = document.querySelector('.members-container');
  container.innerHTML = members.map(member => `
    <div class="member-card">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    </div>
  `).join('');
}

document.querySelector('#toggleView').addEventListener('click', () => {
  document.querySelector('.members-container').classList.toggle('list');
  document.querySelector('.members-container').classList.toggle('grid');
});

loadMembers();