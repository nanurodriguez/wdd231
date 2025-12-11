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


export function displayTeacherCards(teachers) {
    const teachersContainer = document.querySelector("#teachers-container");
    if (!teachersContainer) return;

    const cardsHTML = teachers.map((teacher) => {
        const imagePath = teacher.profileImage;
        
        return `
            <div class="teacher-card">
                <img src="${imagePath}" alt="Profile image of ${teacher.name}" loading="lazy" class="teacher-profile-img">
                <div class="teacher-info">
                    <h3>${teacher.name}</h3>
                    <p class="teacher-role"><strong>Role:</strong> ${teacher.role}</p>
                    <button class="modal-trigger" data-teacher-id="${teacher.id}">View Full Bio</button>
                </div>
            </div>
        `;
    }).join('');

    teachersContainer.innerHTML = cardsHTML;

    setupModalListeners(teachers);
}


const modal = document.querySelector('#teacher-modal');
const modalProfileContent = document.querySelector('#modal-profile-content');
const closeModalButton = document.querySelector('#close-modal');


function populateModal(teacher) {
    if (!modalProfileContent || !teacher) return;
        
    const fullBioHTML = `
        <img src="${teacher.profileImage}" alt="Profile image of ${teacher.name}">
        <h3>${teacher.name}</h3>
        <p class="teacher-role"><strong>Role:</strong> ${teacher.role}</p>
        <p class="teacher-exp">Years of Experience: ${teacher.yearsExperience}</p>
        
        <h4>Full Bio:</h4>
        <p>${teacher.bioSnippet}</p>
    `;
    
    modalProfileContent.innerHTML = fullBioHTML;
    modal.showModal();
}


function setupModalListeners(teachersData) {
    const container = document.querySelector('#teachers-container');

    container.addEventListener('click', (event) => {
        const button = event.target.closest('.modal-trigger');
        if (button) {
            const teacherId = parseInt(button.dataset.teacherId);
            const teacher = teachersData.find(t => t.id === teacherId); 

            if (teacher) {
                populateModal(teacher);
            }
        }
    });

    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => modal.close());
    }
    
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}