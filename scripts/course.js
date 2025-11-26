// Course data array

const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, description: 'Intro to programming.', completed: true , certificate: "Web & Computer Programming", technology: ["HTML", "CSS", "JavaScript"] },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, description: 'Web fundamentals.', completed: true, certificate:"Web & Computer Programming", technology: ["HTML", "CSS"] },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, description: 'Functions and modular programming.', completed: true, certificate:"Web & Computer Programming", technology: ["HTML", "CSS", "JavaScript"] },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, description: 'Intro to OOP.', completed: true , certificate:"Web & Computer Programming", technology: ["HTML", "CSS", "JavaScript"] },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, description: 'Dynamic web with JS.', completed: true, certificate:"Web & Computer Programming", technology: ["HTML", "CSS", "JavaScript"] },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, description: 'Frontend fundamentals and accessibility.', completed: false , certificate:"Web & Computer Programming", technology: ["HTML", "CSS", "JavaScript"] }
];

// DOM elements

const courseCardsContainer = document.querySelector('#course-cards');
const allBtn = document.querySelector('#allCourses');
const wddBtn = document.querySelector('#wddCourses');
const cseBtn = document.querySelector('#cseCourses');
const creditsSum = document.querySelector('#credits-completed');

// Utility functions
function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, (s) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[s]));
}

// Main display function (it will make the course cards appear when called)

function displayCourses(list) {

    courseCardsContainer.innerHTML = '';

    // Calculate total credits for completed courses in a single, robust pass.
    // Guard against missing or non-numeric credits values.
    const total = list.reduce((sum, c) => {
        const credits = Number(c.credits) || 0;
        return sum + (c.completed ? credits : 0);
    }, 0);

    if (creditsSum) creditsSum.textContent = total;

        list.forEach(course => {
        const article = document.createElement('article');
        article.className = 'course-card';
        if (course.completed) article.classList.add('completed');

        const header = document.createElement('div');
        header.className = 'course-card-header';
        const title = document.createElement('h3');
        title.className = 'course-title';
        title.innerHTML = `${escapeHtml(course.subject)} ${escapeHtml(course.number)}`;
        header.appendChild(title);


        const meta = document.createElement('div');
        meta.className = 'course-meta';
        article.appendChild(header);
        article.appendChild(meta);
        

        // Event listener for modal display
        article.addEventListener('click', () => displayCourseDetails(course));

        courseCardsContainer.appendChild(article);
    });
}

// Event listeners

if (allBtn) allBtn.addEventListener('click', () => displayCourses(courses));
if (wddBtn) wddBtn.addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'WDD')));
if (cseBtn) cseBtn.addEventListener('click', () => displayCourses(courses.filter(c => c.subject === 'CSE')));

displayCourses(courses);


//Adding MODALS
const courseDetails = document.querySelector("#course-details");

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="close-modal">❌</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Certificate:</strong> ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
    `;

    courseDetails.showModal();

    document.querySelector("#close-modal").addEventListener("click", () => {
        courseDetails.close();
    });

    // Close when clicking outside
    courseDetails.addEventListener("click", (event) => {
        const rect = courseDetails.getBoundingClientRect();
        const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!inside) {
            courseDetails.close();
        }
    });
}

