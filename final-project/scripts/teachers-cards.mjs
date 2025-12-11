//fetching the data from the teachers.mjs file and displaying it on the page



async function fetchAndDisplayTeachers() {
    try {
        const dataModule = await import('../data/teachers.mjs');
        const teachersData = dataModule.teachers;

        displayTeacherCards(teachersData);

    } catch (error) {
        console.error('Failed to load or display teacher data:', error);
        const container = document.querySelector('#teachers-container');
        if (container) {
            container.innerHTML = '<p class="error">Sorry, we couldn\'t load the teacher profiles right now. Please try again later.</p>';
        }
    }
}


fetchAndDisplayTeachers();


// scripts/teacher-cards.mjs (Handles card generation)

export function displayTeacherCards(teachers) {
    const teachersContainer = document.querySelector("#teachers-container");
    if (!teachersContainer) return; // Exit if container doesn't exist

    teachersContainer.innerHTML = ''; 

    teachers.forEach((teacher) => {
        const imagePath = teacher.profileImage; 
        
        const cardHTML = `
            <div class="teacher-card">
                <img src="${imagePath}" alt="Profile image of ${teacher.name}" loading="lazy" class="teacher-profile-img">
                <div class="teacher-info">
                    <h3>${teacher.name}</h3>
                    
                    <p class="teacher-role"><strong>Role:</strong> ${teacher.role}</p>
                    <p class="teacher-exp"><strong>Experience:</strong> ${teacher.yearsExperience} years</p>
                    <p class="teacher-bio-snippet">${teacher.bioSnippet}</p>
                    
                    <button class="modal-trigger" data-teacher-id="${teacher.id}">View Full Bio</button>
                </div>
            </div>
        `;
        teachersContainer.innerHTML += cardHTML;
    });
}

//